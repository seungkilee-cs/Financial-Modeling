import type { ComponentType } from "react";

export type ModelParams = Record<string, number>;

export interface ControlDescriptor {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  hint: string;
  formatValue?: (value: number) => string;
  transform?: {
    toSlider: (value: number) => number;
    fromSlider: (sliderValue: number) => number;
  };
  slider?: {
    min: number;
    max: number;
    step: number;
  };
}

export interface MetricDescriptor {
  label: string;
  value: string;
  description?: string;
}

export interface VisualizationProps {
  params: ModelParams;
}

export interface FinancialModelDefinition {
  id: string;
  name: string;
  description: string;
  controls: ControlDescriptor[];
  metrics?: (params: ModelParams) => MetricDescriptor[];
  Visualization: ComponentType<VisualizationProps>;
}
