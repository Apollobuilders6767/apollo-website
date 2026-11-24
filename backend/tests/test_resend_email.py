
"""Isolated tests for Apollo Builders direct Resend email integration.

No live API requests, MongoDB connections, or real emails.
"""

import ast
import asyncio
import json
from pathlib import Path
from unittest.mock import AsyncMock, patch

import httpx
import pytest


SERVER_FILE = Path(__file__).resolve().parents[1] / "server.py"
SOURCE = SERVER_FILE.read_text(encoding="utf-8")
TREE = ast.parse(SOURCE)

FUNCTION = next(
    node for node in TREE.body
    if isinstance(node, ast.AsyncFunctionDef)
    and node.name == "_send_notification_email"
)

# Compile only the email function, avoiding server.py startup,
# environment loading, and MongoDB initialization.
FUNCTION.decorator_list = []
MODULE = ast.fix_missing_locations(
    ast.Module(body=[FUNCTION], type_ignores=[])
)

NAMESPACE = {
    "Enquiry": object,
    "RESEND_API_URL": "https://api.resend.com/emails",
    "RESEND_API_KEY": "re_mock_test_key",
    "RESEND_FROM_EMAIL": "Apollo Builders <notifications@apollobuilders.com.au>",
    "ENQUIRY_RECIPIENT_EMAIL": "info@apollobuilders.com.au",
    "EMAIL_FROM_NAME": "Apollo Builders Website",
    "_build_email_html": lambda enquiry: "<p>Test enquiry</p>",
    "httpx": httpx,
    "logging": __import__("logging"),
}

exec(compile(MODULE, str(SERVER_FILE), "exec"), NAMESPACE)

send_email = NAMESPACE["_send_notification_email"]


class FakeEnquiry:
    name = "Test Customer"
    email = "customer@example.com"
    project_type = "Home Renovation"


def make_response(status):
    return httpx.Response(
        status,
        request=httpx.Request(
            "POST", "https://api.resend.com/emails"
        ),
        json={"id": "mock-email-id"} if status < 400 else {
            "message": "Mock provider error"
        },
    )


def mock_client(response):
    client = AsyncMock()
    client.post.return_value = response

    manager = AsyncMock()
    manager.__aenter__.return_value = client
    manager.__aexit__.return_value = False

    return manager, client


def test_resend_success():
    manager, client = mock_client(make_response(200))

    with patch.object(httpx, "AsyncClient", return_value=manager):
        result = asyncio.run(send_email(FakeEnquiry()))

    assert result is True
    client.post.assert_awaited_once()


@pytest.mark.parametrize("status", [403, 422, 500])
def test_resend_http_failure(status):
    manager, _ = mock_client(make_response(status))

    with patch.object(httpx, "AsyncClient", return_value=manager):
        result = asyncio.run(send_email(FakeEnquiry()))

    assert result is False


def test_resend_missing_api_key():
    original = NAMESPACE["RESEND_API_KEY"]

    try:
        NAMESPACE["RESEND_API_KEY"] = ""
        result = asyncio.run(send_email(FakeEnquiry()))
        assert result is False
    finally:
        NAMESPACE["RESEND_API_KEY"] = original


def test_resend_request_payload():
    manager, client = mock_client(make_response(200))

    with patch.object(httpx, "AsyncClient", return_value=manager):
        result = asyncio.run(send_email(FakeEnquiry()))

    assert result is True

    args, kwargs = client.post.await_args

    assert args[0] == "https://api.resend.com/emails"

    payload = kwargs["json"]
    assert payload["to"] == ["info@apollobuilders.com.au"]
    assert payload["reply_to"] == "customer@example.com"
    assert payload["from"] == (
        "Apollo Builders <notifications@apollobuilders.com.au>"
    )
    assert payload["html"] == "<p>Test enquiry</p>"
    assert "Home Renovation" in payload["subject"]

    assert kwargs["headers"]["Authorization"] == (
        "Bearer re_mock_test_key"
    )


def test_default_recipient_and_click_ids_are_in_the_api():
    """Enquiry mail goes to info@ unless ENQUIRY_RECIPIENT_EMAIL overrides it,
    and click ids are accepted on the payload that is stored and emailed."""
    assert "info@apollobuilders.com.au" in SOURCE
    assert "ENQUIRY_RECIPIENT_EMAIL" in SOURCE
    for key in (
        "gclid",
        "gbraid",
        "wbraid",
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_term",
        "utm_content",
        "form_name",
    ):
        assert f"{key}:" in SOURCE or f'"{key}"' in SOURCE
    assert "Resend email dispatch failed" in SOURCE
