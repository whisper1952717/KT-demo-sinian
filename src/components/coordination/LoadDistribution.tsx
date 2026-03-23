import type { EChartsOption } from "echarts";
import { BaseChart } from "@/components/charts/BaseChart";

export const LoadDistribution = ({ original, next }: { original: number; next: number }) => {
  const option: EChartsOption = {
    tooltip: { trigger: "item" },
    series: [
      {
        type: "pie",
        radius: ["45%", "70%"],
        data: [
          { value: original, name: "原系统" },
          { value: next, name: "新系统" },
        ],
      },
    ],
  };

  return <BaseChart option={option} height={280} />;
};

