import { create } from "zustand";
import { mockEquipment } from "@/mock/equipment";
import { mockAlarms } from "@/mock/alarms";
import { mockZoneTemperatures } from "@/mock/zones";
import { hourlyPower } from "@/mock/energy";
import type { Equipment } from "@/types/equipment";
import type { Alarm } from "@/types/alarm";
import type { ZoneTemperature } from "@/types/measurement";

interface SystemSummary {
  totalPower: number;
  systemCop: number;
  savingRate: number;
  savingToday: number;
  pendingStrategies: number;
}

interface AppState {
  equipment: Equipment[];
  alarms: Alarm[];
  zoneTemperatures: ZoneTemperature[];
  systemSummary: SystemSummary;
  tick: number;
  refreshRealtime: () => void;
}

const initialSummary: SystemSummary = {
  totalPower: 0,
  systemCop: 0,
  savingRate: 12.8,
  savingToday: 1840,
  pendingStrategies: 2,
};

export const useAppStore = create<AppState>((set) => ({
  equipment: mockEquipment,
  alarms: mockAlarms,
  zoneTemperatures: mockZoneTemperatures,
  systemSummary: initialSummary,
  tick: 0,
  refreshRealtime: () =>
    set((state) => {
      const nextTick = (state.tick + 1) % 24;
      const series = hourlyPower[nextTick];
      const zoneTemperatures = state.zoneTemperatures.map((zone, index) => {
        const nextTemp = [series.zone1Temp, series.zone2Temp, series.zone3Temp][index];
        const deviation = Number((nextTemp - zone.targetTemp).toFixed(1));
        const trend: ZoneTemperature["trend"] = deviation > 0.2 ? "rising" : deviation < -0.2 ? "falling" : "stable";
        return {
          ...zone,
          currentTemp: nextTemp,
          deviation,
          trend,
        };
      });

      return {
        tick: nextTick,
        zoneTemperatures,
        systemSummary: {
          totalPower: Math.round(series.totalPower),
          systemCop: series.systemCop,
          savingRate: 12.8,
          savingToday: 1840 + nextTick * 3,
          pendingStrategies: state.systemSummary.pendingStrategies,
        },
      };
    }),
}));

