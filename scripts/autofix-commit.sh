#!/usr/bin/env bash

set -euo pipefail

if [[ $# -lt 1 ]]; then
  printf 'Usage: %s "commit message"\n' "$(basename "$0")" >&2
  exit 1
fi

commit_message="$1"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  printf 'Error: not inside a git repository.\n' >&2
  exit 1
fi

repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"

precommit_config="backend-flask/.pre-commit-config.yaml"

if [[ ! -f "$precommit_config" ]]; then
  printf 'Error: pre-commit config not found at %s\n' "$precommit_config" >&2
  exit 1
fi

if ! command -v pre-commit >/dev/null 2>&1; then
  printf 'Error: pre-commit is not installed.\n' >&2
  exit 1
fi

if ! command -v uv >/dev/null 2>&1; then
  printf 'Error: uv is not installed.\n' >&2
  exit 1
fi

printf 'Running pre-commit (pass 1, allowing auto-fixes)...\n'
set +e
pre-commit run --all-files --config "$precommit_config"
first_pass_status=$?
set -e

if [[ $first_pass_status -ne 0 ]]; then
  printf 'Pre-commit made fixes or found issues. Re-staging all changes...\n'
  git add -A
fi

printf 'Running pre-commit (pass 2, must pass)...\n'
pre-commit run --all-files --config "$precommit_config"

git add -A

printf 'Creating commit...\n'
git commit -m "$commit_message"

printf 'Commit completed successfully.\n'
