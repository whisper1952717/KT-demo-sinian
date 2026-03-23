import { Tag } from "antd";
import type { SystemId } from "@/types/equipment";

const map: Record<SystemId, { label: string; color: string }> = {
  original: { label: "原系统", color: "blue" },
  new: { label: "新系统", color: "cyan" },
  shared: { label: "共用", color: "purple" },
};

export const SystemTag = ({ systemId }: { systemId: SystemId }) => <Tag color={map[systemId].color}>{map[systemId].label}</Tag>;

