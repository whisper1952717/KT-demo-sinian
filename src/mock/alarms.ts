import dayjs from "dayjs";
import type { Alarm } from "@/types/alarm";

export const mockAlarms: Alarm[] = [
  {
    id: "ALM-1001",
    timestamp: dayjs().subtract(12, "minute").valueOf(),
    level: "major",
    status: "active",
    source: "strategy_timeout",
    title: "策略确认超时",
    detail: "策略 ST-0008 超过等待窗口未确认",
    relatedId: "ST-0008",
  },
  {
    id: "ALM-1002",
    timestamp: dayjs().subtract(30, "minute").valueOf(),
    level: "minor",
    status: "acknowledged",
    source: "zone_temp_deviation",
    title: "区域温度偏差",
    detail: "车间西侧温度偏高 0.6°C",
  },
  {
    id: "ALM-1003",
    timestamp: dayjs().subtract(2, "hour").valueOf(),
    level: "warning",
    status: "cleared",
    source: "strategy_rollback",
    title: "策略已回滚",
    detail: "ST-0005 因舒适度风险执行回滚",
    relatedId: "ST-0005",
  },
];

