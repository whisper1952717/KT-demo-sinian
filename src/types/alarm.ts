export type AlarmLevel = "critical" | "major" | "minor" | "warning";
export type AlarmStatus = "active" | "acknowledged" | "cleared";
export type AlarmSource =
  | "equipment"
  | "strategy_rejected"
  | "strategy_rollback"
  | "strategy_timeout"
  | "zone_temp_deviation"
  | "system_anomaly";

export interface Alarm {
  id: string;
  timestamp: number;
  level: AlarmLevel;
  status: AlarmStatus;
  source: AlarmSource;
  title: string;
  detail: string;
  relatedId?: string;
  operator?: string;
}

