import { useState } from "react";
import { ModelVisualizer } from "./components/ModelVisualizer";
import { modelList, modelMap } from "./models/registry.ts";
import type { ModelId, ModelListEntry } from "./models/registry.ts";
import "./App.css";

export default function App() {
  const [modelId, setModelId] = useState<ModelId>(modelList[0].id);
  const model = modelMap[modelId];

  return (
    <div className="container">
      <h1>Financial Modeling Visualizer</h1>
      <div className="model-header">
        <div className="model-meta">
          <h2>{model.name}</h2>
          <p className="model-description">{model.description}</p>
        </div>
        <div className="model-picker">
          <label htmlFor="model-select">Select Model</label>
          <select
            id="model-select"
            value={modelId}
            onChange={(event) => setModelId(event.target.value as ModelId)}
          >
            {modelList.map((entry: ModelListEntry) => (
              <option key={entry.id} value={entry.id}>
                {entry.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ModelVisualizer model={model} />
    </div>
  );
}
