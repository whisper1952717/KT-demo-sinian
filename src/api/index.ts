import { mockEquipment } from "@/mock/equipment";
import { mockStrategies } from "@/mock/strategy";
import { dailyEnergy, hourlyPower } from "@/mock/energy";
import { mockZoneTemperatures } from "@/mock/zones";
import { mockAlarms } from "@/mock/alarms";
import { mockEvents } from "@/mock/events";
import { mockAttribution } from "@/mock/attribution";
import { mockWorkOrders } from "@/mock/workorders";

export const api = {
  getEquipment: async () => mockEquipment,
  getStrategies: async (params?: { status?: string }) =>
    params?.status ? mockStrategies.filter((item) => item.status === params.status) : mockStrategies,
  getEnergyDaily: async () => dailyEnergy,
  getHourlyPower: async () => hourlyPower,
  getZones: async () => mockZoneTemperatures,
  getAlarms: async () => mockAlarms,
  getEvents: async () => mockEvents,
  getAttribution: async () => mockAttribution,
  getWorkOrders: async () => mockWorkOrders,
};

