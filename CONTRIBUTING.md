# Contribution Guide

Thank you for wanting to contribute to the project! The steps below are prepared to maintain standards within the team.

1. Opening an Issue
    - Use the appropriate template for bug/feature.
    - Keep the title short and descriptive.
    - Open issues that focus on a single goal.

2. Branch Naming
    - `feature/<short-description>`
    - `fix/<short-description>`
    - `chore/<short-description>`

3. Coding Standards
    - Python: Black + isort
    - Linting: flake8 (optional, used in CI)
    - Add tests: Use pytest; unit tests are mandatory for critical logic.

4. Commit Messages
    - Be short and descriptive. Example: "feature: add ingredient parser for parentheses"
    - Avoid multiple concepts in a single PR.

5. Pull Request
    - Link the relevant issue number (e.g., Fixes #12).
    - Add a brief summary of changes and the testing steps.
    - Write reviewer suggestions in the PR description.

6. Code Ownership and Review
    - Review is assigned according to the `CODEOWNERS` file.
    - At least 1 approval is required; 2 approvals may be needed for critical changes.

7. Data and Models
    - Raw data is not added to the repository. Small sample data can be inside `dataset/sample/`.
    - Model checkpoints must be stored externally; do not push large files to the repository.

8. Security
    - Do not commit API keys or secrets to the repository.
    - Use `.env.example`.

Thank you!
