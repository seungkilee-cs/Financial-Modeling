# Financial Modeling

Hands-on exploration of quantitative finance models through two complementary tracks:

- Python prototypes under `python-model/` for rapid experimentation and mathematical validation
- A TypeScript visualizer in `ts-visualizer/` that turns validated models into interactive dashboards

The goal is to understand theory, document assumptions, and present results with polished visuals that are easy to share.

## Repository Layout

- `python-model/` contains per-model Python implementations and write-ups
- `ts-visualizer/` hosts the React + TypeScript application and related documentation
- `docs/` (if present within directories) provides model-specific notes, derivations, or usage tips

## Getting Started

### Python prototypes

1. Install Python 3.11+ and create a virtual environment
2. Navigate to a model directory under `python-model/`
3. Follow the local README for dependencies (most rely on the standard library, some use NumPy or SciPy)
4. Run the scripts or notebooks to reproduce calculations and sample scenarios

### TypeScript visualizer

1. Navigate to `ts-visualizer/`
2. Install dependencies with `npm install`
3. Start the dev server via `npm run dev`
4. For production builds use `npm run build` and refer to `ts-visualizer/docs/start-new-visualizer.md` for GitHub Pages deployment details

## Documentation

- `ts-visualizer/README.md` describes the app shell, feature set, and scripts
- `ts-visualizer/docs/adding-model.md` outlines how to register additional models
- `ts-visualizer/docs/models/{MODEL_NAME}.md` captures background, validation, and UI behavior for the my model implementation

## Model Roadmap

| ID | Model | Python prototype | Visualizer implementation | Notes |
| -- | ----- | ---------------- | ------------------------- | ----- |
| 01 | [Black-Scholes](./python-model/Black-Scholes-Model/README.md) | Complete | Live in `ts-visualizer` | Includes documentation and Plotly charts |
| 02 | Monte Carlo option pricing | Planned | Planned | Random path simulations for path-dependent derivatives |
| 03 | Binomial option pricing | Planned | Planned | Tree-based pricing foundation for American options |
| 04 | CAPM | Planned | Planned | Factor model for expected returns |
| 05 | Value at Risk | Planned | Planned | Risk measurement via distribution tails |
| 06 | Markowitz portfolio optimization | Planned | Planned | Mean-variance allocation with efficient frontier |
| 07 | GARCH volatility forecasting | Planned | Planned | Time-varying variance model |
| 08 | Discounted cash flow valuation | Planned | Planned | Cash flow projection and discounting |
| 09 | Black-Litterman asset allocation | Planned | Planned | Combines equilibrium with investor views |

## Workflow Overview

1. Prototype new models in Python to internalize theory and verify calculations
2. Capture findings, assumptions, and validation notes in per-model documentation
3. Port the model into `ts-visualizer/` using the shared `FinancialModelDefinition` contract
4. Register the model so it appears in the UI and document the visualization steps
5. Optionally extract reusable pieces into `portable/` for other analytics dashboards

## Future Extensions

- Expand the model set across asset classes and risk methodologies
- Integrate historical market data pulls for calibration and backtesting
- Add automated tests comparing Python outputs with the visualizer implementation
- Explore deployment of the visualizer toolkit to economics or statistics domains using the `portable/` package

## License

This repository is licensed under MIT. Use, modify, and share freely.
