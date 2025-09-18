# Black-Scholes Model

## 01. Understanding the Black-Scholes Formula

The Black-Shocles model calculates the price of a call or put option. For a **European call option** (which can only be exercised at expiration):

$$ C = S \cdot N(d_1) - K \cdot e^{-r t} \cdot N(d_2) $$

For a **put option**:

$$ P = K \cdot e^{-r t} \cdot N(-d_2) - S \cdot N(-d_1) $$

Where:

- $$ S $$: Current stock price
- $$ K $$: Strike price
- $$ r $$: Risk-free interest rate (annualized)
- $$ t $$: Time to expiration (in years)
- $$ \sigma $$: Volatility (annualized standard deviation of stock returns)
- $$ N(x) $$: Cumulative distribution function (CDF) of the standard normal distribution
- $$ d_1 = \frac{\ln(S/K) + (r + \sigma^2/2) t}{\sigma \sqrt{t}} $$
- $$ d_2 = d_1 - \sigma \sqrt{t} $$

The put price can be derived from call-put parity, but I'll implement both for completeness.

## 02. Key Assumptions and Inputs

- This is for non-dividend-paying stocks.
- Inputs are straightforward: You'll need values for S, K, r, t, and σ.
- For simulation, I'll use sample data like: S=100, K=100, r=0.05, t=1 year, σ=0.2 (20%).

## 03. Implementation Details to Note

Turns out, Cumulative distribution function is standardly implemented using `scipy.stats.norm.cdf`. I will first implement the full model using scipy library then build a module from scratch. Later.

## 04. Simulation Using the Model
