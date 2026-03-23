import { Col, Progress, Row, Space, Statistic } from "antd";
import { PageHeader } from "@/components/common/PageHeader";
import { GlassCard } from "@/components/common/GlassCard";
import { DualSystemTopology } from "@/components/coordination/DualSystemTopology";
import { mockEquipment } from "@/mock/equipment";

const toOneDecimal = (value: number) => Number(value.toFixed(1));

const CoordinationTopology = () => {
  const activeChillers = mockEquipment.filter(
    (item) => (item.type === "screw_chiller" || item.type === "chiller") && item.status === "running",
  );

  const originalCooling = toOneDecimal(
    activeChillers
      .filter((item) => item.systemId === "original")
      .reduce((sum, item) => sum + item.currentPower * (item.params.cop ?? 4), 0),
  );
  const newCooling = toOneDecimal(
    activeChillers
      .filter((item) => item.systemId === "new")
      .reduce((sum, item) => sum + item.currentPower * (item.params.cop ?? 4), 0),
  );
  const totalCooling = toOneDecimal(originalCooling + newCooling);
  const originalRatio = totalCooling > 0 ? toOneDecimal((originalCooling / totalCooling) * 100) : 0;
  const newRatio = totalCooling > 0 ? toOneDecimal((newCooling / totalCooling) * 100) : 0;

  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <PageHeader title="双冷源协调 - 系统拓扑" subtitle="优化线路布局并突出实时供冷贡献/占比" />

      <Row gutter={12}>
        <Col span={8}>
          <GlassCard title="原系统实时贡献">
            <Statistic value={originalCooling} suffix="kW" precision={1} />
            <Progress percent={originalRatio} strokeColor="#1890ff" />
          </GlassCard>
        </Col>
        <Col span={8}>
          <GlassCard title="新系统实时贡献">
            <Statistic value={newCooling} suffix="kW" precision={1} />
            <Progress percent={newRatio} strokeColor="#13c2c2" />
          </GlassCard>
        </Col>
        <Col span={8}>
          <GlassCard title="实时总供冷量">
            <Statistic value={totalCooling} suffix="kW" precision={1} />
            <Progress percent={100} strokeColor="#8ba6bf" />
          </GlassCard>
        </Col>
      </Row>

      <GlassCard title="双系统拓扑图（实时分配主线）">
        <DualSystemTopology
          originalCooling={originalCooling}
          newCooling={newCooling}
          totalCooling={totalCooling}
          originalRatio={originalRatio}
          newRatio={newRatio}
        />
      </GlassCard>
    </Space>
  );
};

export default CoordinationTopology;
