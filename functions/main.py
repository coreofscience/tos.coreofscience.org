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

MAX_SIZE = 10  # MB

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


def get_contents(document_data: Dict[str, Any]) -> Dict[str, str]:
    """Get the contents for the files in order to create the graph."""
    names = [
        f'isi-files/{name["stringValue"]}'
        for name in document_data["files"]["arrayValue"]["values"]
    ]
    logging.info("Reading source files", extra={"names": names})
    blobs = list(filter(None, [storage.bucket().get_blob(name) for name in names]))

    size = 0
    output = {}
    for blob in blobs:
        if blob is None:
            continue
        size += blob.size or 0
        if (size / 1e6) > MAX_SIZE:
            break
        output[blob.name] = blob.download_as_text()
    return output


def get_int_utcnow() -> int:
    return int(datetime.utcnow().timestamp())


def create_tree_v2(event, context):
    """Handles new created documents in firestore with path `trees/{treeId}`"""
    tree_id = context.resource.split("/").pop()

    logging.info(f"Handling new created tree {event} {context} {tree_id}")

    client = firestore.client()
    document_reference = client.collection("trees").document(tree_id)
    document_reference.update({"startedDate": get_int_utcnow()})

    try:
        logging.info("Tree process started")
        contents = get_contents(event["value"]["fields"])
        tos = tree_from_strings(list(contents.values()))
        result = convert_tos_to_json(tos)
        document_reference.update(
            {
                "version": "2",
                "result": result,
                "error": None,
                "finishedDate": get_int_utcnow(),
            }
        )
        logging.info("Tree process finished")
    except Exception as error:
        logging.exception("Tree process failed")
        document_reference.update(
            {
                "version": "2",
                "result": None,
                "error": str(error),
                "finishedDate": get_int_utcnow(),
            }
        )


@on_document_created(document="users/{userId}/trees/{treeId}")
def process_user_tree(event: Event[DocumentSnapshot | None]) -> None:
    if event.data is None or (data := event.data.to_dict()) is None:
        return
    logging.info(f"handling new created tree {event} {event.data.to_dict()}")

    client = firestore.client()
    ref = client.document(event.document)
    ref.update({"startedDate": get_int_utcnow()})

    try:
        logging.info("Tree process started")
        contents = get_contents(data)
        tos = tree_from_strings(list(contents.values()))
        result = convert_tos_to_json(tos)
        ref.update(
            {
                "version": "2",
                "result": result,
                "error": None,
                "finishedDate": get_int_utcnow(),
            }
        )
        logging.info("Tree process finished")
    except Exception as error:
        logging.exception("Tree process failed")
        ref.update(
            {
                "version": "2",
                "result": None,
                "error": str(error),
                "finishedDate": get_int_utcnow(),
            }
        )
