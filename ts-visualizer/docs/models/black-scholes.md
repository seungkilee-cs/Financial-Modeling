# Black Scholes Model Reference

## Purpose

The Black Scholes model estimates the fair value of European call and put options under log-normal price dynamics. This documentation links the theory, the Python prototype used for validation, and the production TypeScript visualizer implementation.

## Conceptual Summary

The model assumes a frictionless market with continuous trading, constant risk-free rate, and log-normal stock returns. It delivers closed-form pricing formulas for call and put options. The implementation focuses on scenario exploration by letting users vary inputs that influence those analytical solutions.

## Prototype and Validation

Rapid experiments live in `python-model/Black-Scholes-Model/black_scholes_model.py`. That script exposes helper functions for call and put valuation and can be used to sanity-check numeric results against the TypeScript port.

Suggested validation workflow:

1. Choose a small grid of input tuples `(S, K, t, r, sigma)`
2. Evaluate the Python helpers for ground truth
3. Compare with outputs from the browser visualizer by entering the same values

Maintaining a shared CSV or notebook with these comparisons helps detect regressions when revising logic or styles.

## TypeScript Implementation Map

`src/models/BlackScholes.tsx` defines the full `FinancialModelDefinition` consumed by `ModelVisualizer`.

Key sections:

- `controls`: Slider descriptors for stock price `S`, strike price `K`, time to expiration `t`, risk-free rate `r`, and volatility `sigma`
- `metrics`: Displays current call and put prices formatted as currency
- `Visualization`: React component that renders three Plotly charts (volatility sweep, stock price sweep, and call price surface)
- `BlackScholesModel.ts`: Houses the mathematical helpers mirroring the Python version

## UI Behavior in `ModelVisualizer`

When the user selects Black Scholes, the shared `ModelVisualizer` constructs state from the `controls` array and renders `SliderControl` instances. Adjusting a slider updates the `params` record, which in turn re-computes metrics and re-renders the visualization component. This keeps all presentation concerns centralized while allowing the model definition to stay focused on domain logic.

## Extension Notes

- To tailor visual styling for Black Scholes charts, extend CSS classes referenced in `BlackScholes.tsx` (for example `plot-card`).
- For additional metrics (such as option Greeks), add entries to the `metrics` callback; titles and descriptions will appear automatically in the metrics panel.
- If you plan to support American options or dividend adjustments, consider splitting alternative formulas into dedicated helper files within `src/models/` and exposing them via new controls or tabs.

## Further Reading

Primary references include the original 1973 Black and Scholes paper, Hull's Options, Futures, and Other Derivatives, and the corresponding Wikipedia article. Aligning the visualizer wording with those sources helps learners see the bridge between academic notation and interactive exploration.
