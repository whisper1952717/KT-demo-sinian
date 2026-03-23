import { Card, Typography } from "antd";

export const SystemArchDiagram = () => (
  <Card className="glass-card" size="small">
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
      <Card size="small" title="云端AI">策略生成、解释、M&V归因</Card>
      <Card size="small" title="边缘计算">实时计算、策略下发、告警联动</Card>
      <Card size="small" title="本地PLC/DDC">执行控制、联锁保护、兜底回滚</Card>
    </div>
    <Typography.Paragraph style={{ marginTop: 12, marginBottom: 0 }}>
      AI负责上层优化建议，PLC/DDC负责安全执行与保护。
    </Typography.Paragraph>
  </Card>
);

