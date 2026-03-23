import { Alert, Empty, Space, Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { api } from "@/api";

const StrategyList = () => {
  const { data = [], isLoading, isError } = useQuery({ queryKey: ["strategies"], queryFn: () => api.getStrategies() });

  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <PageHeader title="策略列表" subtitle="全量策略记录与参数变更追溯" />
      {isError ? <Alert type="error" showIcon message="策略数据加载失败" /> : null}
      <Table
        locale={{ emptyText: <Empty description="暂无策略数据" /> }}
        loading={isLoading}
        size="small"
        rowKey="id"
        dataSource={data}
        columns={[
          { title: "时间", render: (_, row) => new Date(row.createdAt).toLocaleString() },
          { title: "模块", dataIndex: "module" },
          { title: "策略标题", dataIndex: "title" },
          { title: "状态", render: (_, row) => <StatusBadge status={row.status} /> },
          { title: "置信度", dataIndex: "confidence" },
          { title: "预期节能(kWh)", render: (_, row) => row.expectedSaving.dailyEnergy },
          { title: "操作人", render: (_, row) => row.confirmedBy ?? "AI" },
        ]}
        expandable={{
          expandedRowRender: (row) => (
            <div>
              {row.paramChanges.map((change) => (
                <div key={`${row.id}-${change.paramName}`}>
                  {change.equipmentName} {change.paramName}: {change.before} → {change.after} {change.unit}
                </div>
              ))}
            </div>
          ),
        }}
      />
    </Space>
  );
};

export default StrategyList;