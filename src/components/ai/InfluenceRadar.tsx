import type { EChartsOption } from "echarts";
import { BaseChart } from "@/components/charts/BaseChart";
import type { InfluenceFactor } from "@/types/strategy";

export const InfluenceRadar = ({ factors }: { factors: InfluenceFactor[] }) => {
  const option: EChartsOption = {
    radar: {
      indicator: factors.map((item) => ({ name: item.name, max: 1 })),
      axisName: { color: "#b8cadb" },
    },
    series: [
      {
        type: "radar",
        data: [{ value: factors.map((item) => item.weight), name: "权重" }],
        areaStyle: { color: "rgba(24,144,255,0.3)" },
      },
    ],
  };

  return <BaseChart option={option} height={260} />;
};

