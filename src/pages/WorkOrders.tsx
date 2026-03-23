import { Button, Card, Select, Space, Table, Tag } from "antd";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { mockWorkOrders } from "@/mock/workorders";

const WorkOrders = () => {
  const [status, setStatus] = useState<string>("all");

  const rows = useMemo(
    () => (status === "all" ? mockWorkOrders : mockWorkOrders.filter((item) => item.status === status)),
    [status],
  );

  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <PageHeader title="工单审批" subtitle="运维工单的审批与分派流程" />

      <Card className="glass-card" size="small">
        <Space>
          <Select
            value={status}
            style={{ width: 220 }}
            onChange={setStatus}
            options={[
              { value: "all", label: "全部状态" },
              { value: "pending", label: "待处理" },
              { value: "approved", label: "已通过" },
              { value: "rejected", label: "已驳回" },
              { value: "completed", label: "已完成" },
            ]}
          />
          <Button type="primary">新建工单</Button>
        </Space>
      </Card>

      <Card className="glass-card" size="small" title="审批列表">
        <Table
          rowKey="id"
          size="small"
          dataSource={rows}
          pagination={false}
          columns={[
            { title: "工单号", dataIndex: "id" },
            { title: "标题", dataIndex: "title" },
            { title: "责任人", dataIndex: "assignee" },
            { title: "优先级", dataIndex: "priority", render: (value: string) => <Tag color={value === "high" ? "red" : value === "medium" ? "gold" : "default"}>{value}</Tag> },
            { title: "状态", dataIndex: "status", render: (value: string) => <Tag color={value === "approved" ? "green" : value === "pending" ? "blue" : "default"}>{value}</Tag> },
          ]}
        />
      </Card>
    </Space>
  );
};

export default WorkOrders;