# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

import logging
from datetime import datetime
from functools import reduce
from io import StringIO
from typing import Any, Dict, List

import networkx as nx
from bibx import Sap, read_any
from firebase_admin import firestore, initialize_app, storage
from firebase_functions.firestore_fn import DocumentSnapshot, Event, on_document_created
from firebase_functions.options import MemoryOption

logging.basicConfig(level=logging.INFO)

initialize_app()


def tree_from_strings(strings: List[str]) -> nx.DiGraph:
    """Creates a ToS tree from a list of strings."""
    collections = [read_any(StringIO(text)) for text in strings]
    collection = reduce(lambda x, y: x.merge(y), collections)
    sap = Sap()
    graph = sap.create_graph(collection)
    graph = sap.clean_graph(graph)
    return sap.tree(graph)


def convert_tos_to_json(tree: nx.DiGraph) -> Dict[str, List[Dict]]:
    """
    Converts a ToS graph in the default format to be processed by the frontend.
    """
    output = {}
    sections = ["root", "trunk", "leaf"]
    for section in sections:
        data = sorted(
            [
                {
                    key: val
                    for key, val in data.items()
                    if not key.startswith("_") and key != "extra"
                }
                for node, data in tree.nodes.items()
                if tree.nodes[node][section] > 0
            ],
            key=lambda article: article.get(section, 0),
            reverse=True,
        )
        output[section] = data

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
    return int(datetime.utcnow().timestamp())


def create_tree_v2(
    event: Event[DocumentSnapshot | None], max_size_megabytes=10
) -> None:
    if event.data is None or (data := event.data.to_dict()) is None:
        return
    logging.info(f"handling new created tree {event} {event.data.to_dict()}")

    start = datetime.now()

    client = firestore.client()
    ref = client.document(event.document)
    ref.update({"startedDate": get_int_utcnow()})
    logging.info("Tree process started")

    try:
        contents = get_contents(data, max_size_megabytes=max_size_megabytes)
        tos = tree_from_strings(list(contents.values()))
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


@on_document_created(
    document="users/{userId}/trees/{treeId}",
    memory=MemoryOption.MB_512,
)
def process_user_tree(event: Event[DocumentSnapshot | None]) -> None:
    create_tree_v2(event, max_size_megabytes=20)


@on_document_created(
    document="trees/{treeId}",
    memory=MemoryOption.MB_256,
)
def process_anonymous_tree(event: Event[DocumentSnapshot | None]) -> None:
    create_tree_v2(event, max_size_megabytes=10)
