import { useEffect } from "react";
import { REFRESH_INTERVAL } from "@/utils/constants";
import { useAppStore } from "@/store/useAppStore";

export const useRealtimeData = (): void => {
  const refreshRealtime = useAppStore((state) => state.refreshRealtime);

  useEffect(() => {
    const timer = window.setInterval(() => {
      refreshRealtime();
    }, REFRESH_INTERVAL);

    return () => window.clearInterval(timer);
  }, [refreshRealtime]);
};

