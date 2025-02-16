import logging
from datetime import UTC, datetime, timedelta
from decimal import Decimal
from enum import Enum
from functools import reduce
from io import StringIO
from typing import Any, Dict, List, cast

import arrow
import networkx as nx
from bibx import Collection, EnrichReferences, Sap, query_openalex, read_any
from firebase_admin import auth, firestore, initialize_app, storage
from firebase_functions import logger
from firebase_functions.core import Change
from firebase_functions.firestore_fn import (
    Event,
    on_document_created,
    on_document_written,
)
from firebase_functions.options import MemoryOption
from firebase_functions.scheduler_fn import ScheduledEvent, on_schedule
from google.cloud.firestore import DocumentReference, DocumentSnapshot
from google.cloud.storage.client import Blob
from pydantic import BaseModel, ValidationError

initialize_app()
logging.basicConfig(level=logging.INFO)


ROOT = "root"
TRUNK = "trunk"
BRANCH = "branch"
LEAF = "leaf"

INVOICING_LEEWAY_HOURS = 6


def set_analysis_property(collection: Collection, ref: DocumentReference) -> None:
    cited = {str(key): value for key, value in collection.cited_by_year().items()}
    published = {
        str(key): value for key, value in collection.published_by_year().items()
    }
    _analysis = {
        "cited": cited,
        "published": published,
    }
    ref.update({"_analysis": _analysis})


def tree_from_strings(strings: List[str], ref: DocumentReference) -> nx.DiGraph:
    """Creates a ToS tree from a list of strings."""
    collections = [read_any(StringIO(text)) for text in strings]
    collection = reduce(lambda x, y: x.merge(y), collections)
    set_analysis_property(collection, ref)
    sap = Sap()
    graph = sap.create_graph(collection)
    graph = sap.clean_graph(graph)
    return sap.tree(graph)


def tree_from_queries(
    queries: list[dict], ref: DocumentReference, plan_id: str | None
) -> nx.DiGraph:
    """Creates a ToS tree from a list of queries."""
    collections = []
    for query in queries:
        engine = query["engine"]
        search = query["search"]
        enrich = EnrichReferences.MOST if plan_id == "pro" else EnrichReferences.COMMON
        if engine == "openalex":
            collection = query_openalex(search, enrich=enrich)
            collections.append(collection)
        else:
            raise ValueError(f"Unknown engine: {engine}")
    collection = reduce(Collection.merge, collections)
    set_analysis_property(collection, ref)
    sap = Sap()
    graph = sap.create_graph(collection)
    graph = sap.clean_graph(graph)
    return sap.tree(graph)


def _round_to_signed_64bit(num: int):
    min_int64 = -(2**63)
    max_int64 = 2**63 - 1
    if num < min_int64:
        return min_int64
    elif num > max_int64:
        return max_int64
    else:
        return int(round(num))


def _clear_datum(datum: dict) -> dict:
    clear = {
        key: val
        for key, val in datum.items()
        if not key.startswith("_") and key != "extra"
    }
    clear[ROOT] = _round_to_signed_64bit(clear.get(ROOT, 0))
    clear[TRUNK] = _round_to_signed_64bit(clear.get(TRUNK, 0))
    clear[LEAF] = _round_to_signed_64bit(clear.get(LEAF, 0))
    return clear


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
                    **_clear_datum(data),
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
    logger.info("Reading source files", extra={"names": names})
    bucket = storage.bucket()
    blobs: list[Blob] = cast(
        list[Blob],
        list(filter(None, [bucket.get_blob(blob_name=name) for name in names])),  # type: ignore
    )

    size = 0
    output = {}
    for blob in blobs:
        if blob is None:
            continue
        size += blob.size or 0
        if (size / 1e6) > max_size_megabytes:
            break
        output[blob.name] = blob.download_as_text()  # type: ignore
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
    logger.info(f"handling new created tree {data}")

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
    logger.info("Tree process started")

    try:
        if "files" in data:
            contents = get_contents(data, max_size_megabytes=max_size_megabytes)
            tos = tree_from_strings(list(contents.values()), ref)
        elif "queries" in data:
            tos = tree_from_queries(data["queries"], ref, plan_id)
        else:
            raise ValueError("No files or queries found in the tree data")
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
        logger.info("Tree process finished")
    except Exception as error:
        logger.error("Tree process failed", error)
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
    logger.info("Running create_tree_with_initial_info")
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
    logger.info("create_tree_with_initial_info finished")


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
    logger.info("Running add_custom_claim_for_the_plan")
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
    logger.info("Running update_user_plan")
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


class Period(Enum):
    month = "month"
    year = "year"


class Invoice(BaseModel):
    plan_id: str
    period: Period
    price: Decimal
    currency: str
    start_date: datetime
    end_date: datetime

    def to_firebase(self):
        return {
            **self.model_dump(),
            "period": self.period.value,
            "price": str(self.price),
        }


class Subscription(BaseModel):
    plan_id: str
    period: Period
    price: Decimal
    currency: str
    start_date: datetime | None = None
    end_date: datetime | None = None
    canceled: bool = False

    def prorate(self, start_date: datetime) -> Decimal:
        """Pro rate the price for the given period with a given start date"""
        prorate_start = arrow.get(start_date)
        start, end = prorate_start.span(self.period.value)
        days_to_charge = (end - prorate_start).days
        days_in_period = (end - start).days
        return self.price * Decimal(days_to_charge) / Decimal(days_in_period)

    def invoice(self, start_date: datetime) -> Invoice:
        """Create an invoice for the given period"""
        prorate_start = arrow.get(start_date)
        start, end = prorate_start.span(self.period.value)
        if prorate_start - start < timedelta(hours=INVOICING_LEEWAY_HOURS):
            return Invoice(
                plan_id=self.plan_id,
                period=self.period,
                price=self.price,
                currency=self.currency,
                start_date=start.datetime,
                end_date=end.datetime,
            )
        return Invoice(
            plan_id=self.plan_id,
            period=self.period,
            price=self.prorate(start_date),
            currency=self.currency,
            start_date=start_date,
            end_date=end.datetime,
        )


def _process_subscription(
    subscription: Subscription,
    processing_time: datetime,
    user_id: str,
) -> None:
    if subscription.canceled:
        logger.info("subscription %s is canceled", user_id)
        return
    if subscription.end_date and subscription.end_date < processing_time:
        logger.info("subscription %s is expired", user_id)
        return
    if subscription.start_date is None or processing_time < subscription.start_date:
        logger.info("subscription %s hasn't started yet", user_id)
        return
    client = firestore.client()
    transaction = client.transaction()
    # Create invoice
    invoice = subscription.invoice(processing_time)
    transaction.create(
        client.collection("users").document(user_id).collection("invoices").document(),
        invoice.to_firebase(),
    )
    # Update plan
    transaction.set(
        client.collection("plans").document(user_id),
        {
            # Give some leeway for the invoicing process
            "endDate": invoice.end_date + timedelta(hours=INVOICING_LEEWAY_HOURS),
        },
    )
    transaction.commit()


@on_document_written(document="subscriptions/{subscriptionId}")
def create_subscription_plan(event: Event[Change[DocumentSnapshot | None]]) -> None:
    """
    When a new subscription is created, add it to the plans collection.
    """
    logger.info("running create_subscription_plan")
    if (
        event.data is None
        or event.data.after is None
        or (data := event.data.after.to_dict()) is None
    ):
        return

    try:
        subscription = Subscription.model_validate(data)
    except ValidationError:
        logger.error("invalid subscription data")
        return
    if subscription.start_date is None:
        logger.info("subscription start date is not set")
        event.data.after.reference.update({"start_date": datetime.now(UTC)})
        return
    _process_subscription(
        subscription,
        subscription.start_date,
        event.data.after.id,
    )
    logger.info("create_subscription_plan finished successfully")


def _renew_subscriptions(period: Period, renew_time: datetime) -> None:
    client = firestore.client()
    snapshot: DocumentSnapshot
    for snapshot in (
        client.collection("subscriptions").where("period", "==", period.value).stream()
    ):
        data = snapshot.to_dict()
        if not data:
            logger.info("skipping subscription %s without data", snapshot.id)
            continue
        try:
            subscription = Subscription.model_validate(data)
        except ValidationError:
            logger.error("invalid subscription data for subscription %s", snapshot.id)
            continue
        _process_subscription(
            subscription,
            renew_time,
            snapshot.id,
        )


@on_schedule(schedule="0 0 1 1 *")
def renew_annual_subscriptions(event: ScheduledEvent):
    logger.info("running renew_annual_subscriptions")
    _renew_subscriptions(Period.year, event.schedule_time)
    logger.info("renew_annual_subscriptions finished")


@on_schedule(schedule="0 0 1 * *")
def renew_monthly_subscriptions(event: ScheduledEvent):
    logger.info("running renew_monthly_subscriptions")
    _renew_subscriptions(Period.month, event.schedule_time)
    logger.info("renew_monthly_subscriptions finished")
