import { Space } from "antd";
import { PageHeader } from "@/components/common/PageHeader";
import { SystemArchDiagram } from "@/components/diagrams/SystemArchDiagram";

const SystemArch = () => (
  <Space direction="vertical" size={12} style={{ width: "100%" }}>
    <PageHeader title="系统架构" subtitle="云端AI-边缘计算-本地PLC/DDC三层架构" />
    <SystemArchDiagram />
  </Space>
);

export default SystemArch;

