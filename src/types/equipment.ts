export type EquipmentType =
  | "screw_chiller"
  | "chiller"
  | "chilled_water_pump"
  | "cooling_water_pump"
  | "cooling_tower"
  | "water_treatment"
  | "makeup_water"
  | "sensor";

export type EquipmentStatus = "running" | "stopped" | "fault" | "maintenance";
export type SystemId = "original" | "new" | "shared";

export interface EquipmentParams {
  supplyTemp?: number;
  returnTemp?: number;
  flow?: number;
  maxFlow?: number;
  pressure?: number;
  cop?: number;
  coolingCapacity?: number;
  frequency?: number;
  vibration?: number;
  loadRate?: number;
  approachTemp?: number;
  conductivity?: number;
  phValue?: number;
}

export interface Equipment {
  id: string;
  name: string;
  type: EquipmentType;
  systemId: SystemId;
  status: EquipmentStatus;
  currentPower: number;
  ratedPower: number;
  healthScore: number;
  params: EquipmentParams;
}

