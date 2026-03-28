def test_packages_list(client):
    resp = client.get("/api/packages")
    assert resp.status_code == 200
    assert isinstance(resp.get_json(), list)


def test_guides_list(client):
    resp = client.get("/api/guides")
    assert resp.status_code == 200
    assert isinstance(resp.get_json(), list)


def test_contact_missing_fields(client):
    resp = client.post("/api/contact", json={})
    assert resp.status_code == 422


def test_contact_success(client):
    resp = client.post(
        "/api/contact",
        json={
            "name": "Test User",
            "email": "test@example.com",
            "message": "Hello from tests",
        },
    )
    assert resp.status_code == 201


def test_submission_form_not_found(client):
    resp = client.get("/submit/nonexistent_form")
    assert resp.status_code == 404


def test_submission_form_renders(client):
    resp = client.get("/submit/contact_inquiry")
    assert resp.status_code == 200
    assert b"Contact Inquiry" in resp.data


def test_submission_validation_error(client):
    resp = client.post("/submit/contact_inquiry", data={})
    assert resp.status_code == 200
    assert b"required" in resp.data.lower()


def test_api_submission(client):
    resp = client.post(
        "/api/submit/newsletter_signup",
        json={"email": "newsletter@example.com"},
    )
    assert resp.status_code == 201
