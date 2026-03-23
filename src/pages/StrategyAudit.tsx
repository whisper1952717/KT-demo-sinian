import { Space } from "antd";
import { PageHeader } from "@/components/common/PageHeader";
import { GlassCard } from "@/components/common/GlassCard";
import { BaseChart } from "@/components/charts/BaseChart";
import { mockStrategies } from "@/mock/strategy";

const StrategyAudit = () => {
  const completed = mockStrategies.filter((item) => item.actualSaving);

  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <PageHeader title="策略审计" subtitle="预期收益与实际收益偏差分析" />
      <GlassCard title="预期 vs 实际节能散点图">
        <BaseChart
          option={{
            tooltip: { trigger: "item" },
            xAxis: { type: "value", name: "预期(kWh)" },
            yAxis: { type: "value", name: "实际(kWh)" },
            series: [
              {
                type: "scatter",
                data: completed.map((item) => [item.expectedSaving.dailyEnergy, item.actualSaving?.dailyEnergy]),
              },
            ],
          }}
          height={320}
        />
      </GlassCard>
    </Space>
  );
};

export default StrategyAudit;

