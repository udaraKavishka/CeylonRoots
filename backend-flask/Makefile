.PHONY: dev run upgrade seed test email autofix-commit

dev:
	flask run -p 5001

run:
	flask run -p 5001 --host=0.0.0.0

upgrade:
	flask db upgrade

initdb:
	flask initdb

seed:
	python seed.py

email:
	mailpit

test:
	pytest

# After model changes: create migration then apply
migrate:
	flask db migrate -m "$(msg)"
	flask db upgrade

# Bootstrap admin user interactively
admin:
	flask create-admin

# Reload submissions.json definitions
reload-forms:
	flask generate-submission-meta

# Auto-fix files with pre-commit and commit in one command
autofix-commit:
	@if [ -z "$(msg)" ]; then echo "Usage: make autofix-commit msg=\"your commit message\""; exit 1; fi
	../scripts/autofix-commit.sh "$(msg)"
