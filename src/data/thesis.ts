import content from "../../content/thesis.json";

export type ThesisResult = {
  model: string;
  accuracy: string;
  macroF1?: string;
  note?: string;
};

export type ThesisPhase = {
  title: string;
  body: string;
};

export type Thesis = {
  title: string;
  kind: string;
  institution: string;
  period: string;
  repo: string;
  app: {
    title: string;
    url: string;
    description: string;
  };
  shortSummary: string;
  summary: string;
  variables: ThesisPhase[];
  results: ThesisResult[];
  statusNote: string;
  limitations: string[];
};

export const thesis: Thesis = content as Thesis;
