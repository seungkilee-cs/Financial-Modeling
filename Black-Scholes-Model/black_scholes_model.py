import math


class BlackScholesModel:
    @staticmethod
    def approx_norm_cdf(x: float) -> float:
        """
        Abramowitz & Stegun approximation for the cumulative distribution function (CDF)
        of the standard normal distribution. This is a polynomial approximation used
        to avoid external libraries like SciPy for the normal CDF (N(x)).

        Math: The approximation computes N(x) ≈ 1 - (1/√(2π)) * e^(-x²/2) * Σ coefficients * t^k,
        where t = 1 / (1 + 0.2316419 * x). It's accurate for most practical x values in option pricing.

        Reference: For the full Black-Scholes formula and role of N(x), see
        https://en.wikipedia.org/wiki/Black–Scholes_model#The_Black–Scholes_formula.

        Args:
            x (float): Input value.

        Returns:
            float: Approximated CDF value.
        """
        if x < 0:
            return 1 - BlackScholesModel.approx_norm_cdf(-x)
        t = 1 / (1 + 0.2316419 * x)
        return 1 - (1 / math.sqrt(2 * math.pi)) * math.exp(-0.5 * x**2) * (
            0.319381530 * t
            - 0.356563782 * t**2
            + 1.781477937 * t**3
            - 1.821255978 * t**4
            + 1.330274429 * t**5
        )

    @staticmethod
    def call_price(S: float, K: float, t: float, r: float, sigma: float) -> float:
        """
        Calculate the Black-Scholes price for a European call option.

        Math: C = S * N(d1) - K * e^(-r t) * N(d2),
        where d1 = [ln(S/K) + (r + σ²/2) t] / (σ √t),
        d2 = d1 - σ √t, and N is the standard normal CDF.
        This assumes no dividends, constant volatility, and lognormal stock price distribution.

        Reference: Detailed derivation and assumptions at
        https://en.wikipedia.org/wiki/Black–Scholes_model#Black–Scholes_formula.

        Args:
            S (float): Current stock price.
            K (float): Strike price.
            t (float): Time to expiration in years.
            r (float): Risk-free interest rate (annualized).
            sigma (float): Volatility (annualized standard deviation).

        Returns:
            float: Call option price.
        """
        if t == 0:
            return max(S - K, 0)
        d1 = (math.log(S / K) + (r + 0.5 * sigma**2) * t) / (sigma * math.sqrt(t))
        d2 = d1 - sigma * math.sqrt(t)
        return S * BlackScholesModel.approx_norm_cdf(d1) - K * math.exp(
            -r * t
        ) * BlackScholesModel.approx_norm_cdf(d2)

    @staticmethod
    def put_price(S: float, K: float, t: float, r: float, sigma: float) -> float:
        """
        Calculate the Black-Scholes price for a European put option.

        Math: P = K * e^(-r t) * N(-d2) - S * N(-d1),
        using the same d1 and d2 as for the call. This is derived from call-put parity:
        C - P = S - K * e^(-r t).

        Reference: See the put formula and parity explanation at
        https://en.wikipedia.org/wiki/Black–Scholes_model#Black–Scholes_formula.

        Args:
            S (float): Current stock price.
            K (float): Strike price.
            t (float): Time to expiration in years.
            r (float): Risk-free interest rate (annualized).
            sigma (float): Volatility (annualized standard deviation).

        Returns:
            float: Put option price.
        """
        if t == 0:
            return max(K - S, 0)
        d1 = (math.log(S / K) + (r + 0.5 * sigma**2) * t) / (sigma * math.sqrt(t))
        d2 = d1 - sigma * math.sqrt(t)
        return K * math.exp(-r * t) * BlackScholesModel.approx_norm_cdf(
            -d2
        ) - S * BlackScholesModel.approx_norm_cdf(-d1)


if __name__ == "__main__":
    # Sample test data
    S = 100.0  # Current stock price
    K = 100.0  # Strike price
    t = 1.0  # Time to expiration (years)
    r = 0.05  # Risk-free rate
    sigma = 0.2  # Volatility Assumption

    call = BlackScholesModel.call_price(S, K, t, r, sigma)
    put = BlackScholesModel.put_price(S, K, t, r, sigma)

    print(f"Call Option Price: {call:.2f}")
    print(f"Put Option Price: {put:.2f}")
