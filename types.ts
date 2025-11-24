export type PillarId = 'R' | 'I' | 'D' | 'E';

export interface SubParameter {
  id: string;
  name: string;
  description: string;
  weight: number;
  checklist: string[];
  positiveIndicators: string[];
  negativeIndicators: string[];
}

export interface RidePillar {
  id: PillarId;
  name: string;
  meaning: string;
  purpose: string;
  color: string;
  subParameters: SubParameter[];
}

export interface ScoringCriteria {
  score: number;
  label: string;
  description: string;
  genericExample: string;
}

export interface DecisionNode {
  id: string;
  question: string;
  yesNext?: string;
  noNext?: string;
  outcomeScore?: number;
  outcomeText?: string;
}

export interface DecisionTree {
  subParameterId: string;
  nodes: Record<string, DecisionNode>;
  startNodeId: string;
}