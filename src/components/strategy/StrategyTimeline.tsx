import { Timeline } from "antd";
import type { StrategyTransition } from "@/types/strategy";
import { formatDateTime } from "@/utils/format";
import { toOperatorLabel, toStatusLabel } from "@/utils/constants";

export const StrategyTimeline = ({ transitions }: { transitions: StrategyTransition[] }) => (
  <Timeline
    items={transitions.slice(0, 20).map((item) => ({
      children: `${formatDateTime(item.timestamp)} ${toStatusLabel(item.fromStatus)} → ${toStatusLabel(item.toStatus)}（${toOperatorLabel(item.operator)}）`,
    }))}
  />
);