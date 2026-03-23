export const APP_TITLE = "郑州思念三厂-双冷源耦合能源站-节能控制中台";
export const TARGET_ZONE_TEMP = 16;
export const REFRESH_INTERVAL = 3000;

export const COLORS = {
  bg: "#0a1929",
  panel: "rgba(18, 38, 58, 0.72)",
  text: "#d6e4f0",
  border: "rgba(120, 170, 210, 0.25)",
  primary: "#1890ff",
  original: "#1890ff",
  newSystem: "#13c2c2",
  shared: "#722ed1",
  running: "#52c41a",
  stopped: "#8ba6bf",
  fault: "#ff4d4f",
  maintenance: "#faad14",
} as const;

export const STRATEGY_STATUS_LABEL: Record<string, string> = {
  suggested: "已建议",
  pending_confirmation: "待确认",
  confirmed: "已确认",
  executing: "执行中",
  completed: "已完成",
  rejected: "已驳回",
  rolled_back: "已回滚",
  expired: "已过期",
};

export const RISK_LEVEL_LABEL: Record<string, string> = {
  low: "低",
  medium: "中",
  high: "高",
};

export const OPERATOR_LABEL: Record<string, string> = {
  AutoPilot: "自动策略引擎",
  Operator: "值班工程师",
};

export const toStatusLabel = (value: string): string => STRATEGY_STATUS_LABEL[value] ?? value;
export const toRiskLabel = (value: string): string => RISK_LEVEL_LABEL[value] ?? value;
export const toOperatorLabel = (value: string): string => OPERATOR_LABEL[value] ?? value;
