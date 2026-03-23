import dayjs from "dayjs";
import type { SystemEvent } from "@/types/event";

export const mockEvents: SystemEvent[] = [
  {
    id: "EV-01",
    timestamp: dayjs().subtract(10, "minute").valueOf(),
    type: "strategy_confirmed",
    title: "策略确认",
    detail: "ST-0007 已人工确认",
    relatedId: "ST-0007",
    operator: "值班工程师",
  },
  {
    id: "EV-02",
    timestamp: dayjs().subtract(8, "minute").valueOf(),
    type: "strategy_executed",
    title: "策略执行",
    detail: "冷机供水温度上调至 8.8°C",
    relatedId: "ST-0007",
    operator: "控制系统",
  },
  {
    id: "EV-03",
    timestamp: dayjs().subtract(2, "hour").valueOf(),
    type: "strategy_rolled_back",
    title: "策略回滚",
    detail: "ST-0005 已回滚并恢复原参数",
    relatedId: "ST-0005",
    operator: "运维主管",
  },
];

