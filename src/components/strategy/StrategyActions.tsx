import { Button, Space } from "antd";

interface StrategyActionsProps {
  onConfirm: () => void;
  onReject: () => void;
  onRollback: () => void;
}

export const StrategyActions = ({ onConfirm, onReject, onRollback }: StrategyActionsProps) => (
  <Space>
    <Button type="primary" onClick={onConfirm}>确认执行</Button>
    <Button danger onClick={onReject}>驳回</Button>
    <Button onClick={onRollback}>回滚</Button>
  </Space>
);

