import type { FinancialModelDefinition } from "./types";
import { blackScholesDefinition } from "./BlackScholes";

const definitions = [blackScholesDefinition] satisfies FinancialModelDefinition[];

type Definition = (typeof definitions)[number];

export type ModelId = Definition["id"];

export interface ModelListEntry {
  id: ModelId;
  name: string;
  description: string;
}

export const modelList: ModelListEntry[] = definitions.map((definition) => ({
  id: definition.id,
  name: definition.name,
  description: definition.description,
}));

export const modelMap: Record<ModelId, Definition> = definitions.reduce(
  (acc, definition) => {
    acc[definition.id] = definition;
    return acc;
  },
  {} as Record<ModelId, Definition>,
);

export const models = definitions;
