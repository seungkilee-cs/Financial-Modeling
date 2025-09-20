import { useEffect, useMemo, useState } from "react";
import Plot from "react-plotly.js";
import { BlackScholesModel } from "./models/BlackScholesModel";
import "./App.css";

type BSParams = { S: number; K: number; t: number; r: number; sigma: number };

export default function App() {
  const [params, setParams] = useState<BSParams>({
    S: 100,
    K: 100,
    t: 1.0,
    r: 0.05,
    sigma: 0.2,
  });

  const call = useMemo(
    () =>
      BlackScholesModel.callPrice(
        params.S,
        params.K,
        params.t,
        params.r,
        params.sigma,
      ),
    [params],
  );
  const put = useMemo(
    () =>
      BlackScholesModel.putPrice(
        params.S,
        params.K,
        params.t,
        params.r,
        params.sigma,
      ),
    [params],
  );

  const volData = useMemo(() => {
    const xs: number[] = [],
      callYs: number[] = [],
      putYs: number[] = [];
    for (let s = 0.05; s <= 0.6; s += 0.01) {
      xs.push(+s.toFixed(2));
      callYs.push(
        BlackScholesModel.callPrice(params.S, params.K, params.t, params.r, s),
      );
      putYs.push(
        BlackScholesModel.putPrice(params.S, params.K, params.t, params.r, s),
      );
    }
    return { xs, callYs, putYs };
  }, [params.S, params.K, params.t, params.r]);

  const stockData = useMemo(() => {
    const xs: number[] = [],
      callYs: number[] = [],
      putYs: number[] = [];
    for (let S = 50; S <= 150; S += 2) {
      xs.push(S);
      callYs.push(
        BlackScholesModel.callPrice(
          S,
          params.K,
          params.t,
          params.r,
          params.sigma,
        ),
      );
      putYs.push(
        BlackScholesModel.putPrice(
          S,
          params.K,
          params.t,
          params.r,
          params.sigma,
        ),
      );
    }
    return { xs, callYs, putYs };
  }, [params.K, params.t, params.r, params.sigma]);

  const surface = useMemo(() => {
    const strikes: number[] = [];
    const vols: number[] = [];
    const z: number[][] = [];
    for (let K = 80; K <= 120; K += 5) strikes.push(K);
    for (let s = 0.1; s <= 0.5; s += 0.02) vols.push(+s.toFixed(2));
    vols.forEach((s) => {
      const row: number[] = [];
      strikes.forEach((K) =>
        row.push(
          BlackScholesModel.callPrice(params.S, K, params.t, params.r, s),
        ),
      );
      z.push(row);
    });
    return { strikes, vols, z };
  }, [params.S, params.t, params.r]);

  useEffect(() => {
    // basic parity sanity check in console for demo
    const diff = BlackScholesModel.parityDiff(
      params.S,
      params.K,
      params.t,
      params.r,
      call,
      put,
    );
    // eslint-disable-next-line no-console
    console.log("Parity diff ~ 0 =>", diff);
  }, [params, call, put]);

  return (
    <div className="container">
      <h1>Financial Modeling Visualizer</h1>
      <h2>Black–Scholes Option Pricing</h2>

      <div className="controls">
        <Slider
          label="Stock Price (S)"
          min={50}
          max={150}
          step={1}
          value={params.S}
          onChange={(v) => setParams((p) => ({ ...p, S: v }))}
        />
        <Slider
          label="Strike Price (K)"
          min={80}
          max={120}
          step={5}
          value={params.K}
          onChange={(v) => setParams((p) => ({ ...p, K: v }))}
        />
        <Slider
          label="Time to Expiration (t, years)"
          min={0.1}
          max={2}
          step={0.1}
          value={params.t}
          onChange={(v) => setParams((p) => ({ ...p, t: v }))}
        />
        <Slider
          label="Risk-free Rate (r, %)"
          min={0}
          max={10}
          step={0.5}
          value={params.r * 100}
          onChange={(v) => setParams((p) => ({ ...p, r: v / 100 }))}
        />
        <Slider
          label="Volatility (σ, %)"
          min={5}
          max={50}
          step={1}
          value={params.sigma * 100}
          onChange={(v) => setParams((p) => ({ ...p, sigma: v / 100 }))}
        />
      </div>

      <div className="results">
        <div className="result-card">
          <h3>Call Option Price</h3>
          <div className="price">${call.toFixed(2)}</div>
        </div>
        <div className="result-card">
          <h3>Put Option Price</h3>
          <div className="price">${put.toFixed(2)}</div>
        </div>
      </div>

      <div className="charts">
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
            title: "Prices vs Volatility",
            xaxis: { title: "σ" },
            yaxis: { title: "Price" },
          }}
          style={{ width: "100%", height: 420 }}
          config={{ responsive: true }}
        />
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
            title: "Prices vs Stock Price",
            xaxis: { title: "S" },
            yaxis: { title: "Price" },
          }}
          style={{ width: "100%", height: 420 }}
          config={{ responsive: true }}
        />
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
            scene: {
              xaxis: { title: "K" },
              yaxis: { title: "σ" },
              zaxis: { title: "Call" },
            },
          }}
          style={{ width: "100%", height: 520 }}
          config={{ responsive: true }}
        />
      </div>
    </div>
  );
}

function Slider(props: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="control">
      <label>
        {props.label}: <strong>{props.value}</strong>
      </label>
      <input
        type="range"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={(e) => props.onChange(parseFloat(e.target.value))}
      />
    </div>
  );
}
