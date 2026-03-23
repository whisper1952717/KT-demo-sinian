import type { SavingAttribution } from "@/types/report";

export const mockAttribution: SavingAttribution = {
  period: "2026-03",
  totalSaving: 18240,
  savingAmount: 15504,
  electricityPrice: 0.85,
  breakdown: [
    { category: "冷机优化", saving: 7020, percentage: 38.5 },
    { category: "水泵优化", saving: 4180, percentage: 22.9 },
    { category: "冷却塔优化", saving: 3120, percentage: 17.1 },
    { category: "负荷调度", saving: 3920, percentage: 21.5 },
  ],
};

