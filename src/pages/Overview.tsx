import { useMemo } from "react";
import { Button, Col, List, Progress, Row, Space, Statistic, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { KPICard } from "@/components/common/KPICard";
import { GlassCard } from "@/components/common/GlassCard";
import { PageHeader } from "@/components/common/PageHeader";
import { DualSystemChart } from "@/components/charts/DualSystemChart";
import { useRealtimeData } from "@/hooks/useRealtimeData";
import { useAppStore } from "@/store/useAppStore";
import { hourlyPower } from "@/mock/energy";
import { useStrategyStore } from "@/store/useStrategyStore";
import { toStatusLabel } from "@/utils/constants";

const hourLabels = hourlyPower.map((item) => `${item.hour}:00`);

const copCards = [
  { id: "CH-ORI-01", name: "原系统冷机 1", cop: 4.2, score: 82, color: "#1890ff" },
  { id: "CH-ORI-02", name: "原系统冷机 2", cop: 4.1, score: 80, color: "#1890ff" },
  { id: "CH-NEW-01", name: "新系统冷机 1", cop: 5.3, score: 94, color: "#13c2c2" },
];

const Overview = () => {
  const navigate = useNavigate();
  useRealtimeData();

  const summary = useAppStore((state) => state.systemSummary);
  const zones = useAppStore((state) => state.zoneTemperatures);
  const alarms = useAppStore((state) => state.alarms.filter((item) => item.status === "active").length);
  const pending = useStrategyStore((state) => state.strategies.filter((item) => item.status === "pending_confirmation").length);
  const allTransitions = useStrategyStore((state) => state.transitions);
  const transitions = useMemo(() => allTransitions.slice(0, 5), [allTransitions]);

  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <PageHeader title="系统总览" subtitle="双冷源 AI 节能策略驾驶舱运行概览" />

      <GlassCard title="演示快捷路径">
        <Space wrap>
          <Button onClick={() => navigate("/coordination/topology")}>1. 双冷源拓扑</Button>
          <Button onClick={() => navigate("/strategy/flow")}>2. 策略流转</Button>
          <Button onClick={() => navigate("/ai/explain")}>3. 决策解释</Button>
          <Button onClick={() => navigate("/mv/overview")}>4. M&V 总览</Button>
          <Button onClick={() => navigate("/mv/attribution")}>5. 节能归因</Button>
          <Button onClick={() => navigate("/reports/cop")}>6. COP 趋势</Button>
          <Button onClick={() => navigate("/alarms/rollback")}>7. 回滚记录</Button>
          <Button onClick={() => navigate("/architecture")}>8. 系统架构</Button>
          <Button onClick={() => navigate("/scene3d")}>9. 3D 占位</Button>
        </Space>
      </GlassCard>

      <div className="kpi-grid">
        <KPICard title="系统总功率" value={summary.totalPower} suffix="kW" />
        <KPICard title="综合 COP" value={summary.systemCop} precision={2} />
        <KPICard title="今日节能率" value={summary.savingRate} suffix="%" precision={1} />
        <KPICard title="今日节能量" value={summary.savingToday} suffix="kWh" />
        <KPICard title="活动告警数" value={alarms} />
        <KPICard title="待审批策略数" value={pending} />
      </div>

      <Row gutter={12}>
        <Col span={16}>
          <GlassCard title="24h 双系统能耗对比">
            <DualSystemChart
              categories={hourLabels}
              original={hourlyPower.map((item) => item.originalPower)}
              newSystem={hourlyPower.map((item) => item.newSystemPower)}
            />
          </GlassCard>
        </Col>
        <Col span={8}>
          <GlassCard title="双系统状态概览">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Statistic title="原系统设备在线率" value={86.2} suffix="%" />
              <Progress percent={86.2} />
              <Statistic title="新系统设备在线率" value={93.5} suffix="%" />
              <Progress percent={93.5} strokeColor="#13c2c2" />
            </Space>
          </GlassCard>
        </Col>
      </Row>

      <Row gutter={12}>
        <Col span={12}>
          <GlassCard title="冷机 COP 概览">
            <Space direction="vertical" size={12} style={{ width: "100%" }}>
              {copCards.map((item) => (
                <div key={item.id} style={{ padding: "8px 10px", border: "1px solid rgba(120,170,210,0.22)", borderRadius: 8 }}>
                  <Row align="middle" justify="space-between">
                    <Col>
                      <Typography.Text style={{ color: "#d6e4f0" }}>{item.name}</Typography.Text>
                      <div style={{ color: "#8ba6bf", fontSize: 12 }}>{item.id}</div>
                    </Col>
                    <Col>
                      <Typography.Title level={3} style={{ margin: 0, color: "#d6e4f0" }}>{item.cop.toFixed(2)}</Typography.Title>
                    </Col>
                  </Row>
                  <Progress percent={item.score} showInfo={false} strokeColor={item.color} style={{ marginTop: 6, marginBottom: 0 }} />
                </div>
              ))}
            </Space>
          </GlassCard>
        </Col>
        <Col span={12}>
          <GlassCard title="最新策略事件流">
            <List
              size="small"
              dataSource={transitions}
              renderItem={(item) => (
                <List.Item>
                  {new Date(item.timestamp).toLocaleTimeString()} | {toStatusLabel(item.fromStatus)} → {toStatusLabel(item.toStatus)}
                </List.Item>
              )}
            />
          </GlassCard>
        </Col>
      </Row>

      <GlassCard title="区域温度监测">
        <Row gutter={12}>
          {zones.map((zone) => (
            <Col span={8} key={zone.zoneId}>
              <Statistic title={zone.zoneName} value={zone.currentTemp} suffix="°C" precision={1} />
              <Progress
                percent={Math.max(0, 100 - Math.abs(zone.deviation) * 25)}
                status={Math.abs(zone.deviation) > 0.5 ? "exception" : "normal"}
                format={() => `偏差 ${zone.deviation > 0 ? "+" : ""}${zone.deviation}°C`}
              />
            </Col>
          ))}
        </Row>
      </GlassCard>
    </Space>
  );
};

export default Overview;