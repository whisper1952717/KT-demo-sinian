import { Space } from "antd";
import { PageHeader } from "@/components/common/PageHeader";
import { GlassCard } from "@/components/common/GlassCard";
import { BaseChart } from "@/components/charts/BaseChart";
import { hourlyPower } from "@/mock/energy";

const COPTrends = () => (
  <Space direction="vertical" size={12} style={{ width: "100%" }}>
    <PageHeader title="COP/效率趋势" subtitle="冷机COP与负荷、外温关联分析" />
    <GlassCard title="系统综合COP时序">
      <BaseChart
        option={{
          xAxis: { type: "category", data: hourlyPower.map((item) => `${item.hour}:00`) },
          yAxis: { type: "value" },
          series: [{ type: "line", smooth: true, data: hourlyPower.map((item) => item.systemCop) }],
        }}
      />
    </GlassCard>
  </Space>
);

export default COPTrends;

