export class BlackScholesModel {
  static approxNormCdf(x: number): number {
    if (x < 0) return 1 - BlackScholesModel.approxNormCdf(-x);
    const t = 1 / (1 + 0.2316419 * x);
    return (
      1 -
      (1 / Math.sqrt(2 * Math.PI)) *
        Math.exp(-0.5 * x * x) *
        (0.31938153 * t -
          0.356563782 * t * t +
          1.781477937 * t * t * t -
          1.821255978 * t * t * t * t +
          1.330274429 * t * t * t * t * t)
    );
  }

  private static d1d2(
    S: number,
    K: number,
    t: number,
    r: number,
    sigma: number,
  ): [number, number] {
    if (t <= 0 || sigma <= 0 || S <= 0 || K <= 0) return [NaN, NaN];
    const d1 =
      (Math.log(S / K) + (r + 0.5 * sigma * sigma) * t) /
      (sigma * Math.sqrt(t));
    const d2 = d1 - sigma * Math.sqrt(t);
    return [d1, d2];
  }

  static callPrice(
    S: number,
    K: number,
    t: number,
    r: number,
    sigma: number,
  ): number {
    if (t <= 0) return Math.max(S - K, 0);
    const [d1, d2] = this.d1d2(S, K, t, r, sigma);
    return (
      S * this.approxNormCdf(d1) - K * Math.exp(-r * t) * this.approxNormCdf(d2)
    );
  }

  static putPrice(
    S: number,
    K: number,
    t: number,
    r: number,
    sigma: number,
  ): number {
    if (t <= 0) return Math.max(K - S, 0);
    const [d1, d2] = this.d1d2(S, K, t, r, sigma);
    return (
      K * Math.exp(-r * t) * this.approxNormCdf(-d2) -
      S * this.approxNormCdf(-d1)
    );
  }

  static parityDiff(
    S: number,
    K: number,
    t: number,
    r: number,
    call: number,
    put: number,
  ): number {
    return call - put - (S - K * Math.exp(-r * t));
  }
}
