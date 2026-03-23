import { Card, Descriptions, Typography } from "antd";
import type { Strategy } from "@/types/strategy";

export const ExplainPanel = ({ strategy }: { strategy: Strategy }) => (
  <Card size="small" className="glass-card" title={strategy.title}>
    <Typography.Paragraph>{strategy.description}</Typography.Paragraph>
    <Descriptions size="small" column={1}>
      <Descriptions.Item label="策略模块">{strategy.module}</Descriptions.Item>
      <Descriptions.Item label="风险说明">{strategy.riskDescription ?? "-"}</Descriptions.Item>
      <Descriptions.Item label="预期节能">{strategy.expectedSaving.dailyEnergy} kWh/日</Descriptions.Item>
    </Descriptions>
  </Card>
);

