# Food Content Analysis - Team Project

This repository is a team project that reads the content/texts on packaging using OCR, parses the list of contents, and, if necessary, utilizes AI assistance to present this data to users. The project is managed collaboratively.

> Important note: This repository is maintained by multiple developers. Please read the `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md` rules.

## Quick Start

1. Create a virtual environment:

    ```bash
    python -m venv .venv
    source .venv/bin/activate  # Windows: .venv\Scripts\activate
    ```

2. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

3. Run the backend (development):

    ```bash
    uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000
    ```

## Development

1. Install development dependencies:

    ```bash
    python -m pip install --upgrade pip
    pip install -r requirements.txt
    pip install -r requirements-dev.txt
    pip install -r backend/requirements.txt
    ```

2. Set up pre-commit (first time):

    ```bash
    pre-commit install
    ```

3. To locally run code formatting/lint checks:

    ```bash
    black .
    isort -rc .
    flake8
    ```

4. Run backend:

    ```bash
    uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000
    ```

## Branch & PR Policy
- `main`: production-ready (protected)
- `develop`: development integration
- `feature/*`: new feature branches
- `fix/*`: bugfix branches
- `release/*`: release preparations

## Pull Request checklist (summary)
- Related issue is linked
- Code style (Black, isort) compliance
- Unit test added/updated
- Passed CI

## Roles and Ownership
- Team code owners are specified in the `CODEOWNERS` file.
- Tasks are assigned in issues; major changes should be discussed before opening a design/DB schema PR.

## Communication & Meetings
- Daily or weekly sync meetings (per team decision)
- Major data/meeting notes should be stored under `docs/`

## Data, Models, and Security
- Raw data is kept under `dataset/`, but sensitive/personal data should NOT be pushed to the repository.
- If model checkpoints are large, use external storage (S3, GDrive, DVC remote).
- `.env` files are not added to the repo; `.env.example` is included.

For more information, see the `CONTRIBUTING.md`, `.github/` folder, and the `docs/` directory.
