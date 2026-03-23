import { Alert, Empty, Space, Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { SystemTag } from "@/components/common/SystemTag";
import { api } from "@/api";

const EquipmentList = () => {
  const { data = [], isLoading, isError } = useQuery({ queryKey: ["equipment"], queryFn: api.getEquipment });

  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <PageHeader title="设备列表" subtitle="双冷源设备运行状态总览" />
      {isError ? <Alert type="error" showIcon message="设备数据加载失败" /> : null}
      <Table
        locale={{ emptyText: <Empty description="暂无设备数据" /> }}
        loading={isLoading}
        size="small"
        rowKey="id"
        dataSource={data}
        columns={[
          { title: "设备ID", dataIndex: "id" },
          { title: "设备名称", dataIndex: "name" },
          { title: "系统", render: (_, row) => <SystemTag systemId={row.systemId} /> },
          { title: "状态", render: (_, row) => <StatusBadge status={row.status} /> },
          { title: "功率(kW)", dataIndex: "currentPower" },
          { title: "健康度", dataIndex: "healthScore" },
        ]}
      />
    </Space>
  );
};

export default EquipmentList;