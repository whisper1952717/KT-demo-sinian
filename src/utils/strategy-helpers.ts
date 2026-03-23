import type { StrategyStatus } from "@/types/strategy";

const transitions: Record<StrategyStatus, StrategyStatus[]> = {
  suggested: ["pending_confirmation", "expired"],
  pending_confirmation: ["confirmed", "rejected", "expired"],
  confirmed: ["executing", "rolled_back"],
  executing: ["completed", "rolled_back"],
  completed: [],
  rejected: [],
  rolled_back: [],
  expired: [],
};

export const canTransition = (from: StrategyStatus, to: StrategyStatus): boolean => transitions[from].includes(to);

