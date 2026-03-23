import { useMemo } from "react";
import { useAppStore } from "@/store/useAppStore";

export const useZoneTemperature = () => {
  const zones = useAppStore((state) => state.zoneTemperatures);
  return useMemo(() => zones, [zones]);
};

