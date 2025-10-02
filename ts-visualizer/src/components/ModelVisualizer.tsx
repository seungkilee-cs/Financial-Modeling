import { useEffect, useMemo, useState } from "react";
import type { FinancialModelDefinition, ModelParams, MetricDescriptor } from "../models/types.ts";
import { SliderControl } from "./SliderControl.tsx";

interface ModelVisualizerProps {
  model: FinancialModelDefinition;
}

const buildInitialParams = (model: FinancialModelDefinition): ModelParams => {
  const entries = model.controls.map((control) => [control.key, control.defaultValue] as const);
  return Object.fromEntries(entries);
};

export function ModelVisualizer({ model }: ModelVisualizerProps) {
  const [params, setParams] = useState<ModelParams>(() => buildInitialParams(model));

  useEffect(() => {
    setParams(buildInitialParams(model));
  }, [model]);

  const metrics = useMemo<MetricDescriptor[]>(() => model.metrics?.(params) ?? [], [model, params]);

  return (
    <div>
      <div className="controls">
        {model.controls.map((control) => {
          const rawValue = params[control.key];
          const sliderValue = control.transform?.toSlider
            ? control.transform.toSlider(rawValue)
            : rawValue;
          const displayValue = control.formatValue
            ? control.formatValue(rawValue)
            : rawValue.toString();

          return (
            <SliderControl
              key={control.key}
              descriptor={control}
              sliderValue={sliderValue}
              displayValue={displayValue}
              onChange={(nextSliderValue: number) => {
                const nextValue = control.transform?.fromSlider
                  ? control.transform.fromSlider(nextSliderValue)
                  : nextSliderValue;
                setParams((prev) => ({ ...prev, [control.key]: nextValue }));
              }}
            />
          );
        })}
      </div>

      {metrics.length > 0 && (
        <div className="results">
          {metrics.map((metric) => (
            <div className="result-card" key={metric.label}>
              <h3>{metric.label}</h3>
              <div className="price">{metric.value}</div>
              {metric.description && <p className="metric-desc">{metric.description}</p>}
            </div>
          ))}
        </div>
      )}

      <div className="charts">
        <model.Visualization params={params} />
      </div>
    </div>
  );
}
