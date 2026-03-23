import type { ZoneTemperature } from "@/types/measurement";

export const mockZoneTemperatures: ZoneTemperature[] = [
  { zoneId: "zone-1", zoneName: "车间东侧", currentTemp: 16.2, targetTemp: 16, deviation: 0.2, trend: "stable" },
  { zoneId: "zone-2", zoneName: "车间中部", currentTemp: 15.8, targetTemp: 16, deviation: -0.2, trend: "falling" },
  { zoneId: "zone-3", zoneName: "车间西侧", currentTemp: 16.4, targetTemp: 16, deviation: 0.4, trend: "rising" },
];

