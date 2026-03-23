import type { SystemId } from "./equipment";

export type MeasurementCategory =
  | "temperature"
  | "pressure"
  | "flow"
  | "power"
  | "humidity"
  | "vibration";

export interface MeasurementPoint {
  id: string;
  name: string;
  category: MeasurementCategory;
  equipmentId?: string;
  systemId: SystemId;
  unit: string;
  currentValue: number;
  targetValue?: number;
  upperLimit?: number;
  lowerLimit?: number;
  isAlarm: boolean;
  updatedAt: number;
}

export interface ZoneTemperature {
  zoneId: string;
  zoneName: string;
  currentTemp: number;
  targetTemp: number;
  deviation: number;
  trend: "rising" | "falling" | "stable";
}

