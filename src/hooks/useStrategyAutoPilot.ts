import { useEffect } from "react";
import { useStrategyStore } from "@/store/useStrategyStore";

interface UseStrategyAutoPilotOptions {
  enabled: boolean;
  intervalMs?: number;
}

const nextStatusMap = {
  suggested: "pending_confirmation",
  pending_confirmation: "confirmed",
  confirmed: "executing",
  executing: "completed",
} as const;

export const useStrategyAutoPilot = ({ enabled, intervalMs = 5000 }: UseStrategyAutoPilotOptions) => {
  const active = useStrategyStore((state) => state.activeStrategy);
  const strategies = useStrategyStore((state) => state.strategies);
  const update = useStrategyStore((state) => state.updateStrategyStatus);
  const setActive = useStrategyStore((state) => state.setActiveStrategy);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const timer = window.setInterval(() => {
      const current = useStrategyStore.getState().activeStrategy;
      const all = useStrategyStore.getState().strategies;

      if (!current) {
        const fallback = all.find((item) => ["suggested", "pending_confirmation", "confirmed", "executing"].includes(item.status));
        if (fallback) {
          setActive(fallback.id);
        }
        return;
      }

      if (current.status === "rejected" || current.status === "rolled_back" || current.status === "completed" || current.status === "expired") {
        const next = all.find((item) => ["suggested", "pending_confirmation", "confirmed", "executing"].includes(item.status) && item.id !== current.id);
        if (next) {
          setActive(next.id);
        }
        return;
      }

      const target = nextStatusMap[current.status as keyof typeof nextStatusMap];
      if (target) {
        update(current.id, target, "AutoPilot", "Auto transition");
      }
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [active?.id, enabled, intervalMs, setActive, strategies, update]);
};