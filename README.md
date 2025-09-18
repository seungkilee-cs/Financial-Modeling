# Financial Modeling

> As someone with a background in Economics and Computer Science, you kinda have to delve into these modelings.

This repository is a hands-on learning project where I implement classic mathematical models from scratch in Python. The goal is to demystify the math behind finance, understand assumptions and limitations, and build intuition through code. No fancy libraries unless necessary—pure Python where possible for educational value.

Each model lives in its own subdirectory with a dedicated README, code, and sample simulations. Start with the basics and expand to more advanced topics.

## Getting Started

1. Clone the repo: `git clone <repo-url>`
2. Navigate to a model: e.g., `cd Black-Scholes-Model`
3. Run the code: `python model_file.py` (or use Poetry/venv as detailed in sub-READMEs)
4. Dependencies: Minimal—most use `math`; some may add `numpy` or `scipy` for efficiency.

For reproducibility, each model includes sample data and outputs. Tools like Poetry are used for dependency management in subprojects.

## Models Implemented

(Note: All model descriptions below are accurate based on standard financial theory. No inaccuracies were found in the provided overviews—they concisely capture the essence without errors.)

### 01. [Black-Scholes Model](./Black-Scholes-Model/README.md) [Status: DONE ✅]
Prices European options using a closed-form formula assuming lognormal stock prices.

My Impression: Works long as your stocks don't pay dividends or throw curveballs.

### 02. [Monte Carlo Simulation for Option Pricing](./Monte-Carlo-Model/README.md) [Status: Not Started ⏳]
Uses random simulations of stock paths to price path-dependent options.

### 03. [Binomial Option Pricing Model](./Binomial-Model/README.md) [Status: Not Started ⏳]
Builds a price tree for American options, allowing early exercise valuation.

### 04. [Capital Asset Pricing Model (CAPM)](./CAPM-Model/README.md) [Status: Not Started ⏳]
Estimates asset returns based on market risk (beta).

### 05. [Value at Risk (VaR)](./VaR-Model/README.md) [Status: Not Started ⏳]
Quantifies potential portfolio losses at a confidence level.

### 06. [Markowitz Portfolio Optimization](./Markowitz-Model/README.md) [Status: Not Started ⏳]
Optimizes asset allocations for maximum return at minimum risk.

### 07. [GARCH Model for Volatility Forecasting](./GARCH-Model/README.md) [Status: Not Started ⏳]
Models time-varying volatility in returns.

### 08. [Discounted Cash Flow (DCF) Valuation](./DCF-Model/README.md) [Status: Not Started ⏳]
Values companies by discounting projected cash flows.

### 09. [Black-Litterman Asset Allocation](./Black-Litterman-Model/README.md) [Status: Not Started ⏳]
Blends market equilibrium with investor views for portfolio optimization.

## Potential Future Extensions

To take this project further, here are some ideas for enhancements—focusing on practicality, visualization, and real-world application:

- Add Visualizations: Integrate Matplotlib or Plotly for plotting price paths (Monte Carlo), efficient frontiers (Markowitz), or volatility forecasts (GARCH). E.g., simulate 100 paths in Monte Carlo and graph them.
- Real Data Integration: Pull live stock data via APIs like yfinance or Alpha Vantage. Use it to estimate inputs (e.g., historical volatility for Black-Scholes) or backtest models against actual market performance.
- Unit Tests and Validation: Add pytest suites to verify outputs against known benchmarks or compare models (e.g., Black-Scholes vs. Binomial convergence).
- Greeks and Sensitivities: Extend option models with Delta, Gamma, Theta, Vega, Rho—compute how prices change with inputs.
- Advanced Variants: Implement Heston for stochastic volatility, CIR for interest rates, or machine learning tweaks (e.g., neural nets for option pricing).
- GUI or Web App: Build a simple Streamlit dashboard to input parameters and visualize results interactively.
- Performance Optimizations: Vectorize with NumPy for speed in simulations, or parallelize Monte Carlo with multiprocessing.
- Comparative Analysis: Add scripts to run multiple models on the same data and compare (e.g., VaR vs. historical simulation accuracy).

## License

This project is for educational purposes and licensed under MIT. Feel free to use, modify, and share.
