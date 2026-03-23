import { useMemo } from "react";
import { Col, Empty, Row, Space, Table } from "antd";
import { ExplainPanel } from "@/components/ai/ExplainPanel";
import { InfluenceRadar } from "@/components/ai/InfluenceRadar";
import { ConfidenceGauge } from "@/components/ai/ConfidenceGauge";
import { ReasoningChain } from "@/components/ai/ReasoningChain";
import { PageHeader } from "@/components/common/PageHeader";
import { GlassCard } from "@/components/common/GlassCard";
import { useStrategyStore } from "@/store/useStrategyStore";

const AIExplain = () => {
  const activeStrategy = useStrategyStore((state) => state.activeStrategy);
  const strategies = useStrategyStore((state) => state.strategies);

  const strategy = activeStrategy ?? strategies[0];
  const history = useMemo(() => strategies.slice(0, 6), [strategies]);

  if (!strategy) {
    return <Empty description="暂无可解释策略" />;
  }

  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <PageHeader title="决策解释" subtitle="结构化展示 AI 推理过程、置信度和风险" />
      <Row gutter={12}>
        <Col span={12}>
          <Space direction="vertical" size={12} style={{ width: "100%" }}>
            <ExplainPanel strategy={strategy} />
            <GlassCard title="影响因素权重">
              <InfluenceRadar factors={strategy.influenceFactors} />
            </GlassCard>
            <GlassCard title="置信度仪表盘">
              <ConfidenceGauge value={strategy.confidence} />
            </GlassCard>
          </Space>
        </Col>
        <Col span={12}>
          <GlassCard title="推理链">
            <ReasoningChain steps={strategy.reasoningChain} />
          </GlassCard>
        </Col>
      </Row>

      <GlassCard title="同类历史决策对比">
        <Table
          size="small"
          rowKey="id"
          pagination={false}
          dataSource={history}
          columns={[
            { title: "策略", dataIndex: "title" },
            { title: "状态", dataIndex: "status" },
            { title: "置信度", dataIndex: "confidence" },
            { title: "预期节能(kWh)", render: (_, row) => row.expectedSaving.dailyEnergy },
          ]}
        />
      </GlassCard>
    </Space>
  );
};

export default AIExplain;