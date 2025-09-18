# Poetry Setup for Each Financial Model

## 1. Poetry Setup per Model

Repeat this for every model directory. Poetry will create a virtual env automatically in a shared location (not in the project dir, to keep things tidy), but it's tied to the project's `pyproject.toml`.

1. Navigate to the model directory (e.g., for Black-Scholes):

   ```
   cd financial-modeling/Black-Scholes-Model
   ```

2. Initialize a new Poetry project:

   ```
   poetry init
   ```

   - This interactive command asks for details like package name (e.g., "black-scholes-model"), version (default 0.1.0), author, etc. You can press Enter for defaults or customize.
   - It creates a `pyproject.toml` file. No `setup.py` needed—Poetry handles it.

3. Add dependencies (e.g., SciPy for your Black-Scholes script):

   ```
   poetry add scipy
   ```

   - This installs SciPy and updates `pyproject.toml` and `poetry.lock`.
   - For development deps (e.g., pytest for testing), use `poetry add --group dev pytest`.
   - Add more as needed, like `poetry add numpy matplotlib` for extensions.

4. Install all dependencies (creates the virtual env if it doesn't exist):
   ```
   poetry install
   ```
   - Run this anytime you add/remove deps or switch machines.

## 2. Manage, Activate, and Run for Each Model

Poetry doesn't require manual activation like traditional venvs. Instead, use `poetry run` for commands or `poetry shell` for an interactive session. Everything is scoped to the current project's directory (via `pyproject.toml`).

- **Activate and work interactively**:

  ```
  poetry shell
  ```

  - This spawns a shell with the project's virtual env activated (prompt changes to show it).
  - Now run your script: `python black_scholes_model.py`.
  - Install packages or run other commands here.
  - Exit with `exit` (deactivates automatically).

- **Run scripts without shell** (quick for one-offs):

  ```
  poetry run python black_scholes_model.py
  ```

  - Prefix any command with `poetry run` to execute it in the project's env.

- **Add or update dependencies**:

  - Add: `poetry add package-name` (e.g., `poetry add pandas`).
  - Update: `poetry update` (updates all to latest compatible versions).
  - Remove: `poetry remove package-name`.
  - Always follow with `poetry install` if needed.

- **Export requirements** (for sharing or CI):

  ```
  poetry export -f requirements.txt -o requirements.txt
  ```

  - This generates a pip-compatible file.

- **Build and package** (if you want to distribute a model):

  ```
  poetry build
  ```

  - Creates wheel/tarball files.

- **Switch between models**: Just `cd` to another model's directory (e.g., `cd ../Monte-Carlo-Model`), and run `poetry shell` or `poetry run`—Poetry detects the local `pyproject.toml` and uses the correct env.

## ()Alternative) Single Poetry Project for All Models

If you want maximum efficiency (shared deps across models), set up one Poetry project at the root:

1. `cd financial-modeling`
2. `poetry init` (name it "financial-models-suite").
3. Add deps like `poetry add scipy`.
4. Treat subdirs as modules (e.g., import from `Black-Scholes-Model/` in other scripts).
5. Use `poetry shell` at the root— it applies to all subdirs.

This reduces duplication but couples the models. Choose based on how integrated they are.
