import { Space } from "antd";
import { PageHeader } from "@/components/common/PageHeader";
import { GlassCard } from "@/components/common/GlassCard";
import { BaseChart } from "@/components/charts/BaseChart";
import { dailyEnergy } from "@/mock/energy";

const EnergyAnalysis = () => {
  const data = dailyEnergy.slice(-14);
  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <PageHeader title="能耗分析" subtitle="双系统能耗分项与趋势对比" />
      <GlassCard title="总能耗趋势">
        <BaseChart
          option={{
            tooltip: { trigger: "axis" },
            legend: { data: ["原系统", "新系统", "共用"] },
            xAxis: { type: "category", data: data.map((item) => item.date.slice(5)) },
            yAxis: { type: "value" },
            series: [
              { name: "原系统", type: "bar", stack: "total", data: data.map((item) => item.original.subtotal) },
              { name: "新系统", type: "bar", stack: "total", data: data.map((item) => item.newSystem.subtotal) },
              { name: "共用", type: "bar", stack: "total", data: data.map((item) => item.shared.subtotal) },
            ],
          }}
          height={320}
        />
      </GlassCard>
    </Space>
  );
};

export default EnergyAnalysis;

