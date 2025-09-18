# Black-Scholes Model

The Black-Scholes model is a foundational mathematical framework for pricing options contracts. Developed in 1973 by economists Fischer Black and Myron Scholes, with significant contributions from Robert Merton (who extended it to include dividends and other factors), it revolutionized financial markets by providing a closed-form solution for option pricing. Black and Scholes published their seminal paper "The Pricing of Options and Corporate Liabilities" in the Journal of Political Economy, while Merton's work appeared shortly after. In 1997, Scholes and Merton were awarded the Nobel Prize in Economics for this breakthrough (Black had passed away in 1995).

The model gained immense popularity because it offered a theoretically sound, computationally efficient way to value options, enabling the explosive growth of derivatives trading (e.g., on the Chicago Board Options Exchange, which opened in 1973). It remains a standard tool in finance for risk management, hedging, and valuation, despite its simplifying assumptions. However, it's primarily designed for **European options** (exercisable only at expiration). For **American options** (exercisable anytime before expiration), early exercise possibilities require more complex models like binomial trees or finite difference methods, as the Black-Scholes formula doesn't account for optimal early exercise. Note that "European" and "American" refer to exercise styles, not geographic regions—options traded in Europe can be American-style, and vice versa. For **Asian options** (common in Asia but not geographically limited), which depend on the average price path, entirely different models (e.g., Monte Carlo simulations) are needed due to path dependency.

## 01. Understanding the Black-Scholes Formula

The Black-Scholes model derives the fair price of European call and put options assuming a lognormal distribution of stock prices and risk-neutral valuation. It solves a partial differential equation (PDE) that describes the option's value over time, analogous to the heat equation in physics. The derivation involves stochastic calculus (Itô's lemma), hedging a portfolio to eliminate risk, and assuming continuous trading in an efficient market. Under risk-neutral measure, the expected return equals the risk-free rate, leading to the closed-form formulas.

For a **European call option** (exercisable only at expiration):

$$
C = S \cdot N(d_1) - K \cdot e^{-r t} \cdot N(d_2)
$$

For a **European put option**:

$$
P = K \cdot e^{-r t} \cdot N(-d_2) - S \cdot N(-d_1)
$$

Where:

$S$: Current stock price
$K$: Strike price
$r$: Risk-free interest rate (annualized, continuous compounding)
$t$: Time to expiration (in years)
$\sigma$: Volatility (annualized standard deviation of the stock's log returns)
$N(x)$: Cumulative distribution function (CDF) of the standard normal distribution
$d_1 = \frac{\ln(S/K) + (r + \sigma^2/2) t}{\sigma \sqrt{t}}$ (measures how much the option is in-the-money, adjusted for growth)
$$ d_2 = d_1 - \sigma \sqrt{t}$ (risk-neutral probability that the option finishes in-the-money)

The put price can also be derived from call-put parity: $C - P = S - K e^{-r t}$, ensuring no-arbitrage consistency.

For more details on the derivation, see the Wikipedia page: [Black–Scholes model](https://en.wikipedia.org/wiki/Black–Scholes_model).

## 02. Key Assumptions and Inputs

The model's elegance comes from its simplifying assumptions, which can limit real-world applicability (e.g., during market crashes when volatility spikes). Key assumptions include:

- **No dividends**: Assumes the underlying stock pays no dividends during the option's life. Extensions (e.g., Black-Scholes-Merton) handle dividends.
- **Constant volatility and interest rates**: Volatility (σ) and risk-free rate (r) are assumed constant, ignoring real-world fluctuations.
- **Lognormal stock prices**: Stock prices follow a geometric Brownian motion (random walk with drift), implying continuous price changes and no jumps.
- **Efficient markets**: No transaction costs, taxes, or arbitrage opportunities; unlimited borrowing/lending at the risk-free rate.
- **European exercise only**: No early exercise, making it unsuitable for American options without modifications.
- **Continuous trading**: Assumes markets are always open for hedging.

Inputs are straightforward and include:

- S: Current stock price
- K: Strike price
- r: Risk-free interest rate
- t: Time to expiration (in years)
- σ: Volatility (often estimated from historical data or implied from market prices)

For simulation, sample data like S=100, K=100, r=0.05, t=1 year, σ=0.2 (20%) yields a call price of ~10.45 and put price of ~5.57, satisfying call-put parity.

## 03. Implementation Details to Note

This implementation uses pure Python with an approximation for the normal CDF (Abramowitz & Stegun method) to avoid dependencies like SciPy. It's encapsulated in a `BlackScholesModel` class with static methods for call and put pricing. The code handles edge cases (e.g., t=0 returns intrinsic value) and includes type hints and docstrings for clarity.

If using SciPy, replace `approx_norm_cdf` with `scipy.stats.norm.cdf` for exact precision. The model is for educational purposes. For any real-world use should consider extensions for dividends, stochastic volatility (e.g., Heston model), or jumps. (Also don't write your functions in Python.)

## 04. Simulation Using the Model

To run a simulation:

1. Save the code in `black_scholes_model.py`.
2. Execute `python black_scholes_model.py` for sample output:
3. Modify inputs in the `__main__` block to test scenarios, e.g., increase σ to 0.3 for higher prices (call ~13.53, put ~8.66).

## 05. Future Iterations

This setup allows easy extension, such as adding Greeks (Delta, Gamma) for sensitivity analysis. So if I ever want to simulate this further, I will first rewrite this in C, and extend this.
