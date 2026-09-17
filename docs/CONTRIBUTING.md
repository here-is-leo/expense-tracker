# Contributing Guide

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Stable, protected. Only via PR. |
| `develop` | Integration branch. |
| `feature/<name>` | New feature. |
| `fix/<name>` | Bug fix. |

## Workflow

1. Start from `develop`:
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature
2. Commit with conventional messages.
3. Push and open a PR to `develop`.
4. Wait for 1 approval.
5. Squash & merge (branch auto-deletes).

## Commit Convention

Format: `<type>: <short description>`

- `feat:` new feature
- `fix:` bug fix
- `refactor:` code change without behavior change
- `docs:` documentation
- `test:` tests
- `chore:` tooling / deps / config

Examples:
- `feat: add user registration endpoint`
- `fix: prevent cross-user transaction access`
- `test: add IDOR authorization test`

## Golden Rules

- Never push directly to `main` or `develop`.
- Keep PRs small (< 400 lines changed).
- Do not commit secrets. Use user-secrets or .env.
- Update `docs/API.md` when the API contract changes.
- Backend changes require tests for critical paths.

## Ownership

| Area | Owner |
|------|-------|
| Backend (API, DB, Auth) | @here-is-leo |
| Frontend (UI, integration) | @<teammate-github> |
| API Contract | Shared — agree before implementation |
