export type EventType =
  | "strategy_created"
  | "strategy_confirmed"
  | "strategy_rejected"
  | "strategy_executed"
  | "strategy_completed"
  | "strategy_rolled_back"
  | "equipment_started"
  | "equipment_stopped"
  | "equipment_fault"
  | "alarm_triggered"
  | "alarm_cleared"
  | "manual_operation";

export interface SystemEvent {
  id: string;
  timestamp: number;
  type: EventType;
  title: string;
  detail: string;
  relatedId?: string;
  operator: string;
}

