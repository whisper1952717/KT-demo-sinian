import { Col, Row, Space } from "antd";
import { PageHeader } from "@/components/common/PageHeader";
import { GlassCard } from "@/components/common/GlassCard";
import { LoadDistribution } from "@/components/coordination/LoadDistribution";
import { ZoneTemperatureChart } from "@/components/charts/ZoneTemperatureChart";
import { hourlyPower } from "@/mock/energy";

const CoordinationLoad = () => {
  const hours = hourlyPower.map((item) => `${item.hour}:00`);

  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <PageHeader title="双冷源协调 - 负荷分配" subtitle="负荷占比、时序变化与调度说明" />
      <Row gutter={12}>
        <Col span={8}>
          <GlassCard title="当前负荷分配">
            <LoadDistribution original={58} next={42} />
          </GlassCard>
        </Col>
        <Col span={16}>
          <GlassCard title="24h区域温度时序">
            <ZoneTemperatureChart
              hours={hours}
              zone1={hourlyPower.map((item) => item.zone1Temp)}
              zone2={hourlyPower.map((item) => item.zone2Temp)}
              zone3={hourlyPower.map((item) => item.zone3Temp)}
            />
          </GlassCard>
        </Col>
      </Row>
    </Space>
  );
};

export default CoordinationLoad;

