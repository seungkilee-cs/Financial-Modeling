import { useMemo } from "react";
import Plot from "react-plotly.js";
import { BlackScholesModel } from "./BlackScholesModel.ts";
import type {
  ControlDescriptor,
  FinancialModelDefinition,
  ModelParams,
  VisualizationProps,
} from "./types.ts";

const callValue = (params: ModelParams) =>
  BlackScholesModel.callPrice(params.S, params.K, params.t, params.r, params.sigma);

const putValue = (params: ModelParams) =>
  BlackScholesModel.putPrice(params.S, params.K, params.t, params.r, params.sigma);

const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

const controls: ControlDescriptor[] = [
  {
    key: "S",
    label: "Stock Price (S)",
    min: 50,
    max: 150,
    step: 1,
    defaultValue: 100,
    hint: "Current price of the underlying asset in dollars.",
    formatValue: (value) => `$${value.toFixed(0)}`,
  },
  {
    key: "K",
    label: "Strike Price (K)",
    min: 80,
    max: 120,
    step: 5,
    defaultValue: 100,
    hint: "Exercise price agreed upon in the option contract.",
    formatValue: (value) => `$${value.toFixed(0)}`,
  },
  {
    key: "t",
    label: "Time to Expiration (t, years)",
    min: 0.1,
    max: 2,
    step: 0.1,
    defaultValue: 1,
    hint: "Remaining lifespan of the option measured in years.",
    formatValue: (value) => `${value.toFixed(1)}y`,
  },
  {
    key: "r",
    label: "Risk-free Rate (r, %)",
    min: 0,
    max: 0.1,
    step: 0.005,
    defaultValue: 0.05,
    hint: "Continuously compounded annual risk-free rate used for discounting.",
    formatValue: (value) => `${(value * 100).toFixed(1)}%`,
    transform: {
      toSlider: (value) => value * 100,
      fromSlider: (sliderValue) => sliderValue / 100,
    },
    slider: {
      min: 0,
      max: 10,
      step: 0.5,
    },
  },
  {
    key: "sigma",
    label: "Volatility (σ, %)",
    min: 0.05,
    max: 0.5,
    step: 0.01,
    defaultValue: 0.2,
    hint: "Annualized standard deviation of log returns, representing uncertainty.",
    formatValue: (value) => `${(value * 100).toFixed(0)}%`,
    transform: {
      toSlider: (value) => value * 100,
      fromSlider: (sliderValue) => sliderValue / 100,
    },
    slider: {
      min: 5,
      max: 50,
      step: 1,
    },
  },
];

const BlackScholesVisualization = ({ params }: VisualizationProps) => {
  const volData = useMemo(() => {
    const xs: number[] = [];
    const callYs: number[] = [];
    const putYs: number[] = [];
    for (let raw = 0.05; raw <= 0.6; raw += 0.01) {
      const volatility = Number(raw.toFixed(2));
      xs.push(volatility);
      callYs.push(BlackScholesModel.callPrice(params.S, params.K, params.t, params.r, volatility));
      putYs.push(BlackScholesModel.putPrice(params.S, params.K, params.t, params.r, volatility));
    }
    return { xs, callYs, putYs };
  }, [params.S, params.K, params.t, params.r]);

  const stockData = useMemo(() => {
    const xs: number[] = [];
    const callYs: number[] = [];
    const putYs: number[] = [];
    for (let stock = 50; stock <= 150; stock += 2) {
      xs.push(stock);
      callYs.push(BlackScholesModel.callPrice(stock, params.K, params.t, params.r, params.sigma));
      putYs.push(BlackScholesModel.putPrice(stock, params.K, params.t, params.r, params.sigma));
    }
    return { xs, callYs, putYs };
  }, [params.K, params.t, params.r, params.sigma]);

  const surface = useMemo(() => {
    const strikes: number[] = [];
    const vols: number[] = [];
    const z: number[][] = [];
    for (let strike = 80; strike <= 120; strike += 5) strikes.push(strike);
    for (let raw = 0.1; raw <= 0.5; raw += 0.02) {
      const volatility = Number(raw.toFixed(2));
      vols.push(volatility);
      const row: number[] = strikes.map((strike) =>
        BlackScholesModel.callPrice(params.S, strike, params.t, params.r, volatility),
      );
      z.push(row);
    }
    return { strikes, vols, z };
  }, [params.S, params.t, params.r]);

  return (
    <>
      <div className="plot-card">
        <h3>Volatility Impact on Option Prices</h3>
        <Plot
          data={[
            {
              x: volData.xs,
              y: volData.callYs,
              type: "scatter",
              mode: "lines",
              name: "Call",
              line: { color: "#2E86C1" },
            },
            {
              x: volData.xs,
              y: volData.putYs,
              type: "scatter",
              mode: "lines",
              name: "Put",
              line: { color: "#E74C3C" },
            },
          ]}
          layout={{
            title: "Pricing vs. Volatility",
            margin: { t: 50, r: 30, b: 60, l: 55 },
            xaxis: { title: { text: "Volatility σ" } },
            yaxis: { title: { text: "Option Price" } },
          }}
          style={{ width: "100%", height: 420 }}
          config={{ responsive: true }}
        />
      </div>

      <div className="plot-card">
        <h3>Underlying Price Impact on Option Prices</h3>
        <Plot
          data={[
            {
              x: stockData.xs,
              y: stockData.callYs,
              type: "scatter",
              mode: "lines",
              name: "Call",
              line: { color: "#2E86C1" },
            },
            {
              x: stockData.xs,
              y: stockData.putYs,
              type: "scatter",
              mode: "lines",
              name: "Put",
              line: { color: "#E74C3C" },
            },
          ]}
          layout={{
            title: "Pricing vs. Underlying Stock",
            margin: { t: 50, r: 30, b: 60, l: 55 },
            xaxis: { title: { text: "Stock Price S" } },
            yaxis: { title: { text: "Option Price" } },
          }}
          style={{ width: "100%", height: 420 }}
          config={{ responsive: true }}
        />
      </div>

      <div className="plot-card">
        <h3>Strike & Volatility Surface for Call Prices</h3>
        <Plot
          data={[
            {
              z: surface.z,
              x: surface.strikes,
              y: surface.vols,
              type: "surface",
              colorscale: "Viridis",
            } as any,
          ]}
          layout={{
            title: "Call Price Surface",
            margin: { t: 60, r: 40, b: 40, l: 40 },
            scene: {
              xaxis: { title: { text: "Strike Price K" } },
              yaxis: { title: { text: "Volatility σ" } },
              zaxis: { title: { text: "Call Price" } },
            },
          }}
          style={{ width: "100%", height: 520 }}
          config={{ responsive: true }}
        />
      </div>
    </>
  );
};

export const blackScholesDefinition: FinancialModelDefinition = {
  id: "black-scholes",
  name: "Black–Scholes",
  description: "European option pricing under the Black–Scholes model.",
  controls,
  metrics: (params) => [
    {
      label: "Call Option Price",
      value: formatCurrency(callValue(params)),
      description: "Present value of the right to buy the asset at strike.",
    },
    {
      label: "Put Option Price",
      value: formatCurrency(putValue(params)),
      description: "Present value of the right to sell the asset at strike.",
    },
  ],
  Visualization: BlackScholesVisualization,
};
