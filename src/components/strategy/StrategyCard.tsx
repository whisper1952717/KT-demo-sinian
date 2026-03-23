import { Descriptions, Progress, Space, Typography } from "antd";
import type { Strategy } from "@/types/strategy";
import { toRiskLabel } from "@/utils/constants";

export const StrategyCard = ({ strategy }: { strategy: Strategy }) => (
  <Space direction="vertical" size={8} style={{ width: "100%" }}>
    <Typography.Title level={5} style={{ margin: 0 }}>{strategy.title}</Typography.Title>
    <Typography.Text type="secondary">{strategy.description}</Typography.Text>
    <Progress percent={strategy.confidence} size="small" status={strategy.confidence > 85 ? "success" : "normal"} />
    <Descriptions size="small" column={2} bordered>
      <Descriptions.Item label="预期节能(kWh)">{strategy.expectedSaving.dailyEnergy}</Descriptions.Item>
      <Descriptions.Item label="风险级别">{toRiskLabel(strategy.riskLevel)}</Descriptions.Item>
      <Descriptions.Item label="功率收益(kW)">{strategy.expectedSaving.power}</Descriptions.Item>
      <Descriptions.Item label="节能率(%)">{strategy.expectedSaving.percentage.toFixed(1)}</Descriptions.Item>
    </Descriptions>
  </Space>
);