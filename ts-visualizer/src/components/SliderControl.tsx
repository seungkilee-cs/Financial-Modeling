import type { ControlDescriptor } from "../models/types.ts";

interface SliderControlProps {
  descriptor: ControlDescriptor;
  sliderValue: number;
  displayValue: string;
  onChange: (value: number) => void;
}

export function SliderControl({ descriptor, sliderValue, displayValue, onChange }: SliderControlProps) {
  return (
    <div className="control">
      <label>
        <span className="label-text">{descriptor.label}</span>
        <span className="info-badge" aria-label={descriptor.hint} role="tooltip">
          ?
          <span className="tooltip">{descriptor.hint}</span>
        </span>
        <strong>{displayValue}</strong>
      </label>
      <input
        type="range"
        min={descriptor.slider?.min ?? descriptor.min}
        max={descriptor.slider?.max ?? descriptor.max}
        step={descriptor.slider?.step ?? descriptor.step}
        value={sliderValue}
        onChange={(event) => onChange(parseFloat(event.target.value))}
      />
    </div>
  );
}
