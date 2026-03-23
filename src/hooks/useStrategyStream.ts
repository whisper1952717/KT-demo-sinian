import { useMemo } from "react";
import { useStrategyStore } from "@/store/useStrategyStore";

export const useStrategyStream = () => {
  const transitions = useStrategyStore((state) => state.transitions);
  return useMemo(() => transitions.slice(0, 20), [transitions]);
};

