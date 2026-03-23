import dayjs from "dayjs";
import type { WorkOrder } from "@/types/workorder";

export const mockWorkOrders: WorkOrder[] = [
  {
    id: "WO-1001",
    title: "策略回滚审批",
    description: "ST-0005 触发舒适度风险，申请回滚",
    createdAt: dayjs().subtract(2, "hour").valueOf(),
    assignee: "运维主管",
    status: "approved",
    priority: "high",
  },
  {
    id: "WO-1002",
    title: "冷却塔维护窗口确认",
    description: "确认周末维护时间并暂停自动优化",
    createdAt: dayjs().subtract(1, "day").valueOf(),
    assignee: "设备工程师",
    status: "pending",
    priority: "medium",
  },
];

