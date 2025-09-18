import math
# from scipy.stats import norm  # For cumulative normal distribution


def approx_norm_cdf(x: float) -> float:
    # Abramowitz & Stegun approximation for CDF
    if x < 0:
        return 1 - approx_norm_cdf(x=-x)
    t = 1 / (1 + 0.2316419 * x)
    return 1 - (1 / math.sqrt(2 * math.pi)) * math.exp(-0.5 * x**2) * (
        0.319381530 * t
        - 0.356563782 * t**2
        + 1.781477937 * t**3
        - 1.821255978 * t**4
        + 1.330274429 * t**5
    )


def black_scholes_call(S: float, K: float, t: float, r: float, sigma: float) -> float:
    """
    Calculate the Black-Scholes price for a European call option.

    Parameters:
    S (float): Current stock price
    K (float): Strike price
    t (float): Time to expiration in years
    r (float): Risk-free interest rate
    sigma (float): Volatility (standard deviation of stock returns)

    Returns:
    float: Call option price
    """
    if t == 0:
        return max(S - K, 0)

    d1 = (math.log(S / K) + (r + 0.5 * sigma**2) * t) / (sigma * math.sqrt(t))
    d2 = d1 - sigma * math.sqrt(t)

    # call_price = S * norm.cdf(d1) - K * math.exp(-r * t) * norm.cdf(d2)
    call_price = S * approx_norm_cdf(x=d1) - K * math.exp(-r * t) * approx_norm_cdf(
        x=d2
    )
    return call_price


def black_scholes_put(S: float, K: float, t: float, r: float, sigma: float) -> float:
    """
    Calculate the Black-Scholes price for a European put option.
    """
    if t == 0:
        return max(K - S, 0)

    d1 = (math.log(S / K) + (r + 0.5 * sigma**2) * t) / (sigma * math.sqrt(t))
    d2 = d1 - sigma * math.sqrt(t)

    # put_price = K * math.exp(-r * t) * norm.cdf(-d2) - S * norm.cdf(-d1)
    put_price = K * math.exp(-r * t) * approx_norm_cdf(x=-d2) - S * approx_norm_cdf(
        x=-d1
    )
    return put_price


# Sample data
S = 100  # Current stock price
K = 100  # Strike price
t = 1  # Time to expiration (1 year)
r = 0.05  # Risk-free rate (5%)
sigma = 0.2  # Volatility (20%) Assumption

call_price = black_scholes_call(S, K, t, r, sigma)
put_price = black_scholes_put(S, K, t, r, sigma)

print(f"Call Option Price: {call_price:.2f}")
print(f"Put Option Price: {put_price:.2f}")
