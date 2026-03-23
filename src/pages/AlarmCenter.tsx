import { Space, Table } from "antd";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockAlarms } from "@/mock/alarms";

const AlarmCenter = () => (
  <Space direction="vertical" size={12} style={{ width: "100%" }}>
    <PageHeader title="告警中心" subtitle="策略与设备告警统一视图" />
    <Table
      size="small"
      rowKey="id"
      dataSource={mockAlarms}
      columns={[
        { title: "时间", render: (_, row) => new Date(row.timestamp).toLocaleString() },
        { title: "级别", dataIndex: "level" },
        { title: "类型", dataIndex: "source" },
        { title: "标题", dataIndex: "title" },
        { title: "详情", dataIndex: "detail" },
        { title: "状态", render: (_, row) => <StatusBadge status={row.status} /> },
      ]}
    />
  </Space>
);

export default AlarmCenter;

