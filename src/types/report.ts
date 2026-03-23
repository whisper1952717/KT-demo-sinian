export interface DualSystemEnergyDaily {
  date: string;
  original: {
    chiller: number;
    chilledPump: number;
    coolingPump: number;
    coolingTower: number;
    subtotal: number;
  };
  newSystem: {
    chiller: number;
    chilledPump: number;
    coolingPump: number;
    coolingTower: number;
    subtotal: number;
  };
  shared: {
    waterTreatment: number;
    makeupWater: number;
    subtotal: number;
  };
  total: number;
  baseline: number;
  saving: number;
  savingRate: number;
  outdoorTemp: number;
  outdoorHumidity: number;
  systemCop: number;
  coolingLoad: number;
}

export interface SavingAttribution {
  period: string;
  totalSaving: number;
  breakdown: {
    category: string;
    saving: number;
    percentage: number;
  }[];
  savingAmount: number;
  electricityPrice: number;
}

export interface HourlyDualPower {
  hour: number;
  originalPower: number;
  newSystemPower: number;
  sharedPower: number;
  totalPower: number;
  systemCop: number;
  outdoorTemp: number;
  coolingLoad: number;
  zone1Temp: number;
  zone2Temp: number;
  zone3Temp: number;
}

