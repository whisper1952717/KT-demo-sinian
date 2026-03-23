import { Card, Col, Row, Space, Statistic, Table, Tag, Timeline } from "antd";
import { PageHeader } from "@/components/common/PageHeader";
import { mockStrategies } from "@/mock/strategy";

const RollbackHistory = () => {
  const rows = mockStrategies.filter((item) => item.status === "rolled_back").slice(0, 10);

  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <PageHeader title="回滚记录" subtitle="回滚事件、原因与影响分析" />

      <Row gutter={12}>
        <Col span={8}><Card className="glass-card" size="small"><Statistic title="回滚次数" value={rows.length} /></Card></Col>
        <Col span={8}><Card className="glass-card" size="small"><Statistic title="平均恢复时长" value={7.6} suffix="min" /></Card></Col>
        <Col span={8}><Card className="glass-card" size="small"><Statistic title="回滚后稳定率" value={98.1} suffix="%" /></Card></Col>
      </Row>

      <Card className="glass-card" size="small" title="回滚时间线">
        <Timeline
          items={rows.map((item) => ({
            children: `${new Date(item.rollbackAt ?? item.updatedAt).toLocaleString()} | ${item.title} | 原因: ${item.rollbackReason ?? "无"}`,
          }))}
        />
      </Card>

      <Card className="glass-card" size="small" title="回滚影响表">
        <Table
          rowKey="id"
          size="small"
          pagination={false}
          dataSource={rows}
          columns={[
            { title: "策略", dataIndex: "title" },
            { title: "操作人", render: (_, row) => row.rollbackBy ?? "值班工程师" },
            { title: "回滚原因", render: (_, row) => row.rollbackReason ?? "无" },
            { title: "回滚前(kW)", render: (_, row) => row.expectedSaving.power + 120 },
            { title: "回滚后(kW)", render: (_, row) => row.expectedSaving.power + 138 },
            { title: "影响", render: () => <Tag color="volcano">+18 kW</Tag> },
          ]}
        />
      </Card>
    </Space>
  );
};

export default RollbackHistory;