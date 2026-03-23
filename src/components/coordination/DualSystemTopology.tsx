import { Background, Controls, MarkerType, ReactFlow, type Edge, type Node, Position } from "@xyflow/react";

interface DualSystemTopologyProps {
  originalCooling: number;
  newCooling: number;
  totalCooling: number;
  originalRatio: number;
  newRatio: number;
}

const nodeStyleBase = {
  color: "#d6e4f0",
  borderRadius: 10,
  textAlign: "center" as const,
  padding: 8,
};

const edgeLabelStyle = {
  fill: "#d6e4f0",
  fontSize: 12,
  fontWeight: 500,
};

const edgeLabelBg = {
  fill: "rgba(10, 25, 41, 0.88)",
  stroke: "rgba(120,170,210,0.35)",
};

export const DualSystemTopology = ({
  originalCooling,
  newCooling,
  totalCooling,
  originalRatio,
  newRatio,
}: DualSystemTopologyProps) => {
  const nodes: Node[] = [
    {
      id: "ori-chiller",
      position: { x: 40, y: 90 },
      data: { label: "原系统冷机组" },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      style: { ...nodeStyleBase, width: 210, background: "#1890ff22", border: "1px solid #1890ff" },
    },
    {
      id: "new-chiller",
      position: { x: 40, y: 300 },
      data: { label: "新系统冷机组" },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      style: { ...nodeStyleBase, width: 210, background: "#13c2c222", border: "1px solid #13c2c2" },
    },
    {
      id: "shared",
      position: { x: 40, y: 470 },
      data: { label: "共用设备\n(水处理/补水)" },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      style: {
        ...nodeStyleBase,
        width: 210,
        background: "#722ed122",
        border: "1px solid #722ed1",
        whiteSpace: "pre-line",
      },
    },
    {
      id: "distribution",
      position: { x: 420, y: 220 },
      data: { label: `冷量分配汇流\n实时总冷量 ${totalCooling.toFixed(1)} kW` },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      style: {
        ...nodeStyleBase,
        width: 260,
        background: "#20364f",
        border: "1px solid #8ba6bf",
        whiteSpace: "pre-line",
      },
    },
    {
      id: "load",
      position: { x: 810, y: 220 },
      data: { label: "厂房负荷端" },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      style: { ...nodeStyleBase, width: 240, background: "#2a4058", border: "1px solid #8ba6bf" },
    },
    {
      id: "ori-contrib",
      position: { x: 420, y: 80 },
      data: { label: `原系统贡献\n${originalCooling.toFixed(1)} kW · ${originalRatio.toFixed(1)}%` },
      style: {
        ...nodeStyleBase,
        width: 210,
        background: "#1890ff18",
        border: "1px dashed #1890ff",
        whiteSpace: "pre-line",
      },
    },
    {
      id: "new-contrib",
      position: { x: 420, y: 400 },
      data: { label: `新系统贡献\n${newCooling.toFixed(1)} kW · ${newRatio.toFixed(1)}%` },
      style: {
        ...nodeStyleBase,
        width: 210,
        background: "#13c2c218",
        border: "1px dashed #13c2c2",
        whiteSpace: "pre-line",
      },
    },
  ];

  const edgeCommon = {
    type: "smoothstep",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16 },
    labelStyle: edgeLabelStyle,
    labelShowBg: true,
    labelBgStyle: edgeLabelBg,
    labelBgPadding: [8, 5] as [number, number],
    labelBgBorderRadius: 6,
  } as const;

  const edges: Edge[] = [
    {
      id: "e-ori-main",
      source: "ori-chiller",
      target: "distribution",
      label: `实时供冷 ${originalCooling.toFixed(1)}kW（${originalRatio.toFixed(1)}%）`,
      style: { stroke: "#1890ff", strokeWidth: 2.2 },
      ...edgeCommon,
    },
    {
      id: "e-new-main",
      source: "new-chiller",
      target: "distribution",
      label: `实时供冷 ${newCooling.toFixed(1)}kW（${newRatio.toFixed(1)}%）`,
      style: { stroke: "#13c2c2", strokeWidth: 2.2 },
      ...edgeCommon,
    },
    {
      id: "e-shared-support",
      source: "shared",
      target: "distribution",
      label: "水处理/补水支撑",
      style: { stroke: "#722ed1", strokeWidth: 1.8, strokeDasharray: "8 6" },
      ...edgeCommon,
    },
    {
      id: "e-to-load",
      source: "distribution",
      target: "load",
      label: `分配后供冷 ${totalCooling.toFixed(1)}kW`,
      style: { stroke: "#8ba6bf", strokeWidth: 2.4 },
      ...edgeCommon,
    },
    {
      id: "e-ori-tag",
      source: "ori-contrib",
      target: "distribution",
      style: { stroke: "#1890ff", strokeWidth: 1.2, strokeDasharray: "5 5" },
      animated: false,
      markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12 },
      type: "straight",
    },
    {
      id: "e-new-tag",
      source: "new-contrib",
      target: "distribution",
      style: { stroke: "#13c2c2", strokeWidth: 1.2, strokeDasharray: "5 5" },
      animated: false,
      markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12 },
      type: "straight",
    },
  ];

  return (
    <div style={{ height: 620 }} className="flow-grid-bg">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.1 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={22} size={1} color="rgba(120,170,210,0.22)" />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
};
