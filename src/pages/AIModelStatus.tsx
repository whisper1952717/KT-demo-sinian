import { Card, Col, Progress, Row, Space, Statistic, Table, Tag } from "antd";
import { PageHeader } from "@/components/common/PageHeader";
import { BaseChart } from "@/components/charts/BaseChart";

const modelRows = [
  { id: "m1", name: "冷机优化模型", status: "RUNNING", latency: 126, accuracy: 94.1, drift: 2.1, lastTrain: "2026-03-22 21:30" },
  { id: "m2", name: "水泵优化模型", status: "RUNNING", latency: 103, accuracy: 92.8, drift: 2.8, lastTrain: "2026-03-22 20:00" },
  { id: "m3", name: "冷却塔优化模型", status: "RUNNING", latency: 116, accuracy: 91.2, drift: 3.4, lastTrain: "2026-03-21 23:10" },
  { id: "m4", name: "负荷预测模型", status: "WARNING", latency: 164, accuracy: 88.4, drift: 5.9, lastTrain: "2026-03-20 19:40" },
  { id: "m5", name: "FDD 诊断模型", status: "RUNNING", latency: 97, accuracy: 90.6, drift: 2.5, lastTrain: "2026-03-22 22:10" },
];

const AIModelStatus = () => {
  const avgAccuracy = modelRows.reduce((sum, row) => sum + row.accuracy, 0) / modelRows.length;
  const avgLatency = modelRows.reduce((sum, row) => sum + row.latency, 0) / modelRows.length;

  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <PageHeader title="模型状态" subtitle="在线健康度、延迟、漂移与训练时间" />

      <Row gutter={12}>
        <Col span={8}><Card className="glass-card" size="small"><Statistic title="平均精度" value={avgAccuracy} precision={1} suffix="%" /></Card></Col>
        <Col span={8}><Card className="glass-card" size="small"><Statistic title="平均延迟" value={avgLatency} precision={0} suffix="ms" /></Card></Col>
        <Col span={8}><Card className="glass-card" size="small"><Statistic title="预警模型数" value={modelRows.filter((m) => m.status !== "RUNNING").length} /></Card></Col>
      </Row>

      <Card className="glass-card" size="small" title="模型精度趋势(7天)">
        <BaseChart
          height={280}
          option={{
            tooltip: { trigger: "axis" },
            legend: { data: ["冷机优化", "水泵优化", "负荷预测"] },
            xAxis: { type: "category", data: ["D-6", "D-5", "D-4", "D-3", "D-2", "D-1", "今天"] },
            yAxis: { type: "value", min: 80, max: 100 },
            series: [
              { name: "冷机优化", type: "line", smooth: true, data: [92.1, 92.4, 93.2, 93.5, 93.7, 93.8, 94.1] },
              { name: "水泵优化", type: "line", smooth: true, data: [90.8, 91.0, 91.2, 91.8, 92.1, 92.3, 92.8] },
              { name: "负荷预测", type: "line", smooth: true, data: [89.4, 89.0, 88.7, 88.3, 88.5, 88.2, 88.4] },
            ],
          }}
        />
      </Card>

      <Card className="glass-card" size="small" title="在线模型注册表">
        <Table
          rowKey="id"
          size="small"
          pagination={false}
          dataSource={modelRows}
          columns={[
            { title: "模型", dataIndex: "name" },
            {
              title: "状态",
              dataIndex: "status",
              render: (value: string) => <Tag color={value === "RUNNING" ? "green" : "orange"}>{value}</Tag>,
            },
            { title: "延迟(ms)", dataIndex: "latency" },
            { title: "精度(%)", dataIndex: "accuracy" },
            {
              title: "漂移",
              dataIndex: "drift",
              render: (value: number) => <Progress percent={Math.min(100, value * 10)} size="small" />,
            },
            { title: "最近训练", dataIndex: "lastTrain" },
          ]}
        />
      </Card>
    </Space>
  );
};

export default AIModelStatus;