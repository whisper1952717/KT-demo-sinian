import { Card, Select, Space, Table, Tag } from "antd";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { mockEvents } from "@/mock/events";

const EventLog = () => {
  const [filter, setFilter] = useState<string>("all");

  const rows = useMemo(
    () => (filter === "all" ? mockEvents : mockEvents.filter((item) => item.type === filter)),
    [filter],
  );

  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <PageHeader title="事件日志" subtitle="系统关键操作和策略事件" />

      <Card className="glass-card" size="small">
        <Select
          value={filter}
          style={{ width: 260 }}
          onChange={setFilter}
          options={[
            { value: "all", label: "全部事件类型" },
            ...Array.from(new Set(mockEvents.map((event) => event.type))).map((type) => ({ value: type, label: type })),
          ]}
        />
      </Card>

      <Card className="glass-card" size="small" title="事件流">
        <Table
          rowKey="id"
          size="small"
          pagination={false}
          dataSource={rows}
          columns={[
            { title: "时间", render: (_, row) => new Date(row.timestamp).toLocaleString() },
            { title: "类型", dataIndex: "type", render: (value: string) => <Tag color="blue">{value}</Tag> },
            { title: "标题", dataIndex: "title" },
            { title: "详情", dataIndex: "detail" },
            { title: "操作人", dataIndex: "operator" },
          ]}
        />
      </Card>
    </Space>
  );
};

export default EventLog;