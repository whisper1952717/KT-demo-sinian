import { Tag } from "antd";

const colorMap: Record<string, string> = {
  running: "success",
  stopped: "default",
  fault: "error",
  maintenance: "warning",
  suggested: "processing",
  pending_confirmation: "warning",
  confirmed: "processing",
  executing: "cyan",
  completed: "success",
  rejected: "error",
  rolled_back: "magenta",
  expired: "default",
};

const labelMap: Record<string, string> = {
  running: "运行中",
  stopped: "停机",
  fault: "故障",
  maintenance: "维护",
  suggested: "已建议",
  pending_confirmation: "待确认",
  confirmed: "已确认",
  executing: "执行中",
  completed: "已完成",
  rejected: "已驳回",
  rolled_back: "已回滚",
  expired: "已过期",
};

export const StatusBadge = ({ status }: { status: string }) => (
  <Tag color={colorMap[status] ?? "default"}>{labelMap[status] ?? status}</Tag>
);

