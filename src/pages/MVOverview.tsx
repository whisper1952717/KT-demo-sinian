import { Space, Statistic, Table } from "antd";
import { PageHeader } from "@/components/common/PageHeader";
import { GlassCard } from "@/components/common/GlassCard";
import { BaseChart } from "@/components/charts/BaseChart";
import { dailyEnergy } from "@/mock/energy";

const MVOverview = () => {
  const data = dailyEnergy.slice(-14);
  const totalSaving = data.reduce((sum, item) => sum + item.saving, 0);
  const totalAmount = totalSaving * 0.85;

  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <PageHeader title="M&V 总览" subtitle="基准线对比、节能累计与金额核算" />
      <Space size={12} style={{ width: "100%" }}>
        <GlassCard title="累计节能量"><Statistic value={Math.round(totalSaving)} suffix="kWh" /></GlassCard>
        <GlassCard title="累计节能金额"><Statistic value={Math.round(totalAmount)} suffix="元" /></GlassCard>
        <GlassCard title="节能率 KPI"><Statistic value={12.8} suffix="%" precision={1} /></GlassCard>
      </Space>

      <GlassCard title="基准线 vs 实际能耗">
        <BaseChart
          option={{
            tooltip: { trigger: "axis" },
            legend: { data: ["基准线", "实际"], textStyle: { color: "#b8cadb" } },
            xAxis: { type: "category", data: data.map((item) => item.date.slice(5)), axisLabel: { color: "#9db2c7" } },
            yAxis: { type: "value", axisLabel: { color: "#9db2c7" } },
            series: [
              { name: "基准线", type: "line", data: data.map((item) => item.baseline) },
              { name: "实际", type: "line", data: data.map((item) => item.total) },
            ],
          }}
          height={320}
        />
      </GlassCard>

      <GlassCard title="月度节能汇总表">
        <Table
          size="small"
          pagination={false}
          rowKey="date"
          dataSource={data.slice(-7)}
          columns={[
            { title: "日期", dataIndex: "date" },
            { title: "Baseline", dataIndex: "baseline" },
            { title: "Actual", dataIndex: "total" },
            { title: "Saving", dataIndex: "saving" },
            { title: "Rate", render: (_, row) => `${row.savingRate}%` },
            { title: "金额", render: (_, row) => `¥${(row.saving * 0.85).toFixed(0)}` },
          ]}
        />
      </GlassCard>
    </Space>
  );
};

export default MVOverview;