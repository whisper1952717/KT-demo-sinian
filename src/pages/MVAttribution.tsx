import { Space, Statistic } from "antd";
import { PageHeader } from "@/components/common/PageHeader";
import { GlassCard } from "@/components/common/GlassCard";
import { WaterfallChart } from "@/components/charts/WaterfallChart";
import { mockAttribution } from "@/mock/attribution";

const MVAttribution = () => (
  <Space direction="vertical" size={12} style={{ width: "100%" }}>
    <PageHeader title="节能归因" subtitle="节能贡献来源分解" />
    <GlassCard title="节能归因瀑布图">
      <WaterfallChart
        categories={mockAttribution.breakdown.map((item) => item.category)}
        values={mockAttribution.breakdown.map((item) => item.saving)}
      />
    </GlassCard>
    <GlassCard title="AI贡献对比">
      <Statistic title="AI贡献占比" value={68.2} suffix="%" />
    </GlassCard>
  </Space>
);

export default MVAttribution;

