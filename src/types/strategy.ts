export type StrategyStatus =
  | "suggested"
  | "pending_confirmation"
  | "confirmed"
  | "executing"
  | "completed"
  | "rejected"
  | "rolled_back"
  | "expired";

export type StrategyModule =
  | "chiller_optimization"
  | "pump_optimization"
  | "tower_optimization"
  | "load_dispatch"
  | "temp_setpoint"
  | "fdd";

export type RiskLevel = "low" | "medium" | "high";

export interface StrategyParamChange {
  paramName: string;
  equipmentId: string;
  equipmentName: string;
  before: number;
  after: number;
  unit: string;
}

export interface InfluenceFactor {
  name: string;
  weight: number;
  currentValue: string;
  impact: "positive" | "negative" | "neutral";
}

export interface ReasoningStep {
  step: number;
  title: string;
  description: string;
  keyData: Record<string, string | number>;
  conclusion: string;
}

export interface SavingMetric {
  power: number;
  percentage: number;
  dailyEnergy: number;
}

export interface Strategy {
  id: string;
  createdAt: number;
  updatedAt: number;
  module: StrategyModule;
  title: string;
  description: string;
  status: StrategyStatus;
  confidence: number;
  riskLevel: RiskLevel;
  riskDescription?: string;
  influenceFactors: InfluenceFactor[];
  reasoningChain: ReasoningStep[];
  paramChanges: StrategyParamChange[];
  expectedSaving: SavingMetric;
  confirmedBy?: string;
  confirmedAt?: number;
  executedAt?: number;
  completedAt?: number;
  rollbackReason?: string;
  rollbackBy?: string;
  rollbackAt?: number;
  actualSaving?: SavingMetric;
  validFrom: number;
  validUntil: number;
}

export interface StrategyTransition {
  id: string;
  strategyId: string;
  fromStatus: StrategyStatus;
  toStatus: StrategyStatus;
  timestamp: number;
  operator: string;
  remark?: string;
}

