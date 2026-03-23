import { useMemo } from "react";
import { Background, Controls, ReactFlow, type Edge, type Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { StrategyStatus } from "@/types/strategy";

const order: StrategyStatus[] = ["suggested", "pending_confirmation", "confirmed", "executing", "completed", "rejected", "rolled_back"];
const labels: Record<StrategyStatus, string> = {
  suggested: "已建议",
  pending_confirmation: "待确认",
  confirmed: "已确认",
  executing: "执行中",
  completed: "已完成",
  rejected: "已驳回",
  rolled_back: "已回滚",
  expired: "已过期",
};

export const StrategyStateMachine = ({ activeStatus }: { activeStatus: StrategyStatus }) => {
  const nodes = useMemo<Node[]>(
    () =>
      order.map((status, index) => ({
        id: status,
        position: { x: index * 160, y: status === "rejected" || status === "rolled_back" ? 120 : 0 },
        data: { label: labels[status] },
        style: {
          width: 120,
          borderRadius: 10,
          textAlign: "center",
          color: "#d6e4f0",
          background: status === activeStatus ? "rgba(250,173,20,0.2)" : "rgba(24,42,62,0.9)",
          border: status === activeStatus ? "1px solid #faad14" : "1px solid rgba(120,170,210,0.25)",
        },
        className: status === "pending_confirmation" && activeStatus === status ? "pending-pulse" : undefined,
      })),
    [activeStatus],
  );

  const edges = useMemo<Edge[]>(
    () => [
      { id: "e1", source: "suggested", target: "pending_confirmation", animated: true },
      { id: "e2", source: "pending_confirmation", target: "confirmed", animated: true },
      { id: "e3", source: "confirmed", target: "executing", animated: true },
      { id: "e4", source: "executing", target: "completed", animated: true },
      { id: "e5", source: "pending_confirmation", target: "rejected", animated: true },
      { id: "e6", source: "executing", target: "rolled_back", animated: true },
    ],
    [],
  );

  return (
    <div style={{ height: 260 }} className="flow-grid-bg">
      <ReactFlow nodes={nodes} edges={edges} fitView nodesDraggable={false} nodesConnectable={false} elementsSelectable={false}>
        <Background />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
};

