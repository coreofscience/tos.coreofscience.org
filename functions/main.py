import logging
from datetime import UTC, datetime
from functools import reduce
from io import StringIO
from typing import Any, Dict, List

from google.cloud.firestore import DocumentSnapshot
import networkx as nx
from bibx import Sap, read_any, Collection
from firebase_admin import firestore, initialize_app, storage, auth
from firebase_functions.core import Change
from firebase_functions.firestore_fn import (
    Event,
    on_document_created,
    on_document_written,
)
from firebase_functions.options import MemoryOption
from firebase_functions.scheduler_fn import on_schedule, ScheduledEvent

logging.basicConfig(level=logging.INFO)

initialize_app()


ROOT = "root"
TRUNK = "trunk"
BRANCH = "branch"
LEAF = "leaf"


def set_analysis_property(collection: Collection, ref) -> None:
    cited = {str(key): value for key, value in collection.cited_by_year().items()}
    published = {
        str(key): value for key, value in collection.published_by_year().items()
    }
    _analysis = {
        "cited": cited,
        "published": published,
    }
    ref.update({"_analysis": _analysis})


def tree_from_strings(strings: List[str], ref) -> nx.DiGraph:
    """Creates a ToS tree from a list of strings."""
    collections = [read_any(StringIO(text)) for text in strings]
    collection = reduce(lambda x, y: x.merge(y), collections)
    set_analysis_property(collection, ref)
    sap = Sap()
    graph = sap.create_graph(collection)
    graph = sap.clean_graph(graph)
    return sap.tree(graph)


def convert_tos_to_json(tree: nx.DiGraph) -> Dict[str, List[Dict]]:
    """
    Converts a ToS graph in the default format to be processed by the frontend.
    """
    output = {}
    sections = [ROOT, TRUNK, BRANCH, LEAF]
    for section in sections:
        data = sorted(
            [
                {
                    "label": node,
                    **{
                        key: val
                        for key, val in data.items()
                        if not key.startswith("_") and key != "extra"
                    },
                }
                for node, data in tree.nodes.items()
                if tree.nodes[node][section] > 0
            ],
            key=lambda article: article.get(section, 0),
            reverse=True,
        )
        output[section] = data

    if BRANCH in output:
        for i in [1, 2, 3]:
            output[f"{BRANCH}_{i}"] = sorted(
                [data for data in output[BRANCH] if data.get(BRANCH) == i],
                key=lambda article: article.get("year", 0),
                reverse=True,
            )
        del output[BRANCH]

    if LEAF in output:
        output[LEAF] = sorted(
            output[LEAF],
            key=lambda article: article.get("year", 0),
            reverse=True,
        )

    return output


def get_contents(
    document_data: Dict[str, Any], max_size_megabytes=10
) -> Dict[str, str]:
    """Get the contents for the files in order to create the graph."""
    names = [f"isi-files/{name}" for name in document_data["files"]]
    logging.info("Reading source files", extra={"names": names})
    blobs = list(filter(None, [storage.bucket().get_blob(name) for name in names]))

    size = 0
    output = {}
    for blob in blobs:
        if blob is None:
            continue
        size += blob.size or 0
        if (size / 1e6) > max_size_megabytes:
            break
        output[blob.name] = blob.download_as_text()
    return output


def get_int_utcnow() -> int:
    return int(datetime.now(UTC).timestamp())


def create_tree_v2(
    event: Event[DocumentSnapshot | None],
    max_size_megabytes=10,
    plan_id: str | None = None,
) -> None:
    if event.data is None or (data := event.data.to_dict()) is None:
        return
    logging.info(f"handling new created tree {data}")

    start = datetime.now()

    client = firestore.client()
    ref = client.document(event.document)
    if plan_id is not None:
        ref = (
            client.collection("users")
            .document(event.params["userId"])
            .collection("trees")
            .document(event.params["treeId"])
        )
    ref.update({"startedDate": get_int_utcnow()})
    logging.info("Tree process started")

    try:
        contents = get_contents(data, max_size_megabytes=max_size_megabytes)
        tos = tree_from_strings(list(contents.values()), ref)
        result = convert_tos_to_json(tos)
        end = datetime.now()
        ref.update(
            {
                "version": "2",
                "result": result,
                "error": None,
                "finishedDate": get_int_utcnow(),
                "totalTimeMillis": (end - start).total_seconds() * 1000,
            }
        )
        logging.info("Tree process finished")
    except Exception as error:
        logging.exception("Tree process failed")
        end = datetime.now()
        ref.update(
            {
                "version": "2",
                "result": None,
                "error": str(error),
                "finishedDate": get_int_utcnow(),
                "totalTimeMillis": (end - start).total_seconds() * 1000,
            }
        )


@on_document_created(document="users/{userId}/trees/{treeId}")
def create_tree_with_initial_info(event: Event[DocumentSnapshot | None]) -> None:
    logging.info("Running create_tree_with_initial_info")
    if event.data is None or (data := event.data.to_dict()) is None:
        return
    if "planId" not in data:
        return
    plan_id = data["planId"]
    if plan_id != "pro" and plan_id != "basic":
        return
    client = firestore.client()
    if plan_id == "basic":
        (
            client.collection("users")
            .document(event.params["userId"])
            .collection("basicAnalysis")
            .document(event.params["treeId"])
            .set(data)
        )
    if plan_id == "pro":
        (
            client.collection("users")
            .document(event.params["userId"])
            .collection("proAnalysis")
            .document(event.params["treeId"])
            .set(data)
        )
    logging.info("create_tree_with_initial_info finished")


@on_document_created(
    document="users/{userId}/proAnalysis/{treeId}",
    memory=MemoryOption.GB_1,
)
def process_user_pro_tree(event: Event[DocumentSnapshot | None]) -> None:
    """
    Analyse data with pro settings, whatever that means.
    """
    create_tree_v2(event, max_size_megabytes=200, plan_id="pro")


@on_document_created(
    document="users/{userId}/basicAnalysis/{treeId}",
    memory=MemoryOption.MB_512,
)
def process_user_tree(event: Event[DocumentSnapshot | None]) -> None:
    """
    Analyse data with basic settings, whatever that means.
    """
    create_tree_v2(event, max_size_megabytes=20, plan_id="basic")


@on_document_created(
    document="trees/{treeId}",
    memory=MemoryOption.MB_256,
)
def process_anonymous_tree(event: Event[DocumentSnapshot | None]) -> None:
    """
    Analyse data for an anonymous user.
    """
    create_tree_v2(event, max_size_megabytes=10, plan_id=None)


@on_schedule(schedule="every 1 hours")
def add_custom_claim_for_the_plan(_: ScheduledEvent) -> None:
    """
    Check the plans collection and update each user's custom claims accordingly.
    """
    logging.info("Running add_custom_claim_for_the_plan")
    for plan in firestore.client().collection("plans").stream():
        try:
            auth.get_user(plan.id)
        except auth.UserNotFoundError:
            continue
        data = plan.to_dict()
        if data and (
            "endDate" not in data or int(data["endDate"].timestamp()) < get_int_utcnow()
        ):
            auth.set_custom_user_claims(plan.id, {"plan": "basic"})
        else:
            auth.set_custom_user_claims(plan.id, {"plan": "pro"})


@on_document_written(document="plans/{planId}")
def update_user_plan(event: Event[Change[DocumentSnapshot | None]]) -> None:
    """
    When a plan is updated, change the user's custom claims accordingly.
    """
    logging.info("Running update_user_plan")
    user_id = event.params["planId"]
    try:
        auth.get_user(user_id)
    except auth.UserNotFoundError:
        return
    if (
        event.data is None
        or event.data.after is None
        or (data := event.data.after.to_dict()) is None
    ):
        auth.set_custom_user_claims(user_id, {"plan": "basic"})
        return
    if "endDate" in data and int(data["endDate"].timestamp()) > get_int_utcnow():
        auth.set_custom_user_claims(user_id, {"plan": "pro"})
        return
    auth.set_custom_user_claims(user_id, {"plan": "basic"})
