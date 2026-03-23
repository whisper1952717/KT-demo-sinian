import { create } from "zustand";
import dayjs from "dayjs";
import { mockStrategies, mockTransitions } from "@/mock/strategy";
import type { Strategy, StrategyStatus, StrategyTransition } from "@/types/strategy";
import { canTransition } from "@/utils/strategy-helpers";

interface StrategyState {
  strategies: Strategy[];
  activeStrategy: Strategy | null;
  transitions: StrategyTransition[];
  addStrategy: (strategy: Strategy) => void;
  setActiveStrategy: (strategyId: string) => void;
  updateStrategyStatus: (strategyId: string, toStatus: StrategyStatus, operator: string, remark?: string) => void;
  rollbackStrategy: (strategyId: string, reason: string, operator: string) => void;
}

const now = Date.now();

const appendTransition = (
  state: StrategyState,
  strategyId: string,
  fromStatus: StrategyStatus,
  toStatus: StrategyStatus,
  operator: string,
  remark?: string,
): StrategyTransition[] => [
  {
    id: `${strategyId}-${now}-${Math.random().toString(16).slice(2, 8)}`,
    strategyId,
    fromStatus,
    toStatus,
    timestamp: Date.now(),
    operator,
    remark,
  },
  ...state.transitions,
];

export const useStrategyStore = create<StrategyState>((set, get) => ({
  strategies: mockStrategies,
  activeStrategy: mockStrategies.find((item) => ["executing", "pending_confirmation", "suggested"].includes(item.status)) ?? mockStrategies[0],
  transitions: mockTransitions,
  addStrategy: (strategy) =>
    set((state) => ({
      strategies: [strategy, ...state.strategies],
      activeStrategy: strategy,
    })),
  setActiveStrategy: (strategyId) =>
    set((state) => ({
      activeStrategy: state.strategies.find((item) => item.id === strategyId) ?? state.activeStrategy,
    })),
  updateStrategyStatus: (strategyId, toStatus, operator, remark) =>
    set((state) => {
      const origin = state.strategies.find((item) => item.id === strategyId);
      if (!origin) {
        return state;
      }

      if (!canTransition(origin.status, toStatus) && origin.status !== toStatus) {
        return state;
      }

      const nowTs = dayjs().valueOf();

      const strategies = state.strategies.map((item) => {
        if (item.id !== strategyId) {
          return item;
        }
        return {
          ...item,
          status: toStatus,
          updatedAt: nowTs,
          confirmedAt: toStatus === "confirmed" ? nowTs : item.confirmedAt,
          confirmedBy: toStatus === "confirmed" ? operator : item.confirmedBy,
          executedAt: toStatus === "executing" ? nowTs : item.executedAt,
          completedAt: toStatus === "completed" ? nowTs : item.completedAt,
          actualSaving:
            toStatus === "completed"
              ? {
                  power: Math.max(0, item.expectedSaving.power - 6),
                  percentage: Math.max(0, item.expectedSaving.percentage - 0.5),
                  dailyEnergy: Math.max(0, item.expectedSaving.dailyEnergy - 48),
                }
              : item.actualSaving,
        };
      });

      return {
        strategies,
        activeStrategy: strategies.find((item) => item.id === strategyId) ?? state.activeStrategy,
        transitions: appendTransition(state, strategyId, origin.status, toStatus, operator, remark),
      };
    }),
  rollbackStrategy: (strategyId, reason, operator) => {
    const active = get().strategies.find((item) => item.id === strategyId);
    if (!active) {
      return;
    }

    if (active.status === "executing") {
      get().updateStrategyStatus(strategyId, "rolled_back", operator, reason);
    }

    set((state) => ({
      strategies: state.strategies.map((item) =>
        item.id === strategyId
          ? {
              ...item,
              status: "rolled_back",
              rollbackReason: reason,
              rollbackBy: operator,
              rollbackAt: Date.now(),
              updatedAt: Date.now(),
            }
          : item,
      ),
    }));
  },
}));