import { Col, Empty, Row, Space, Switch, Typography } from "antd";
import { useState } from "react";
import { GlassCard } from "@/components/common/GlassCard";
import { PageHeader } from "@/components/common/PageHeader";
import { StrategyStateMachine } from "@/components/strategy/StrategyStateMachine";
import { StrategyCard } from "@/components/strategy/StrategyCard";
import { StrategyActions } from "@/components/strategy/StrategyActions";
import { StrategyTimeline } from "@/components/strategy/StrategyTimeline";
import { useStrategyStore } from "@/store/useStrategyStore";
import { useStrategyAutoPilot } from "@/hooks/useStrategyAutoPilot";

const StrategyFlow = () => {
  const [autoPilot, setAutoPilot] = useState(true);
  useStrategyAutoPilot({ enabled: autoPilot, intervalMs: 4500 });

  const activeStrategy = useStrategyStore((state) => state.activeStrategy);
  const transitions = useStrategyStore((state) => state.transitions);
  const update = useStrategyStore((state) => state.updateStrategyStatus);
  const rollback = useStrategyStore((state) => state.rollbackStrategy);

  if (!activeStrategy) {
    return <Empty description="暂无活跃策略" />;
  }

  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <PageHeader title="策略流转" subtitle="策略全生命周期：建议→审批→执行→回滚" />
      <GlassCard title="状态机可视化">
        <Space direction="vertical" size={8} style={{ width: "100%" }}>
          <Space>
            <Typography.Text>演示自动推进</Typography.Text>
            <Switch checked={autoPilot} onChange={setAutoPilot} />
            <Typography.Text type="secondary">开启后每 4.5 秒自动推进状态机</Typography.Text>
          </Space>
          <StrategyStateMachine activeStatus={activeStrategy.status} />
        </Space>
      </GlassCard>

      <Row gutter={12}>
        <Col span={12}>
          <GlassCard title="当前活跃策略详情">
            <Space direction="vertical" size={12} style={{ width: "100%" }}>
              <StrategyCard strategy={activeStrategy} />
              <StrategyActions
                onConfirm={() => update(activeStrategy.id, "confirmed", "值班工程师", "人工确认")}
                onReject={() => update(activeStrategy.id, "rejected", "值班工程师", "人工驳回")}
                onRollback={() => rollback(activeStrategy.id, "区域舒适度偏差超阈值", "值班工程师")}
              />
            </Space>
          </GlassCard>
        </Col>
        <Col span={12}>
          <GlassCard title="最近20条策略流转记录">
            {transitions.length > 0 ? <StrategyTimeline transitions={transitions} /> : <Empty description="暂无流转记录" />}
          </GlassCard>
        </Col>
      </Row>
    </Space>
  );
};

export default StrategyFlow;