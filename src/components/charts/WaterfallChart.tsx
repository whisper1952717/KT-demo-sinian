import type { EChartsOption } from "echarts";
import { BaseChart } from "./BaseChart";

export const WaterfallChart = ({ categories, values }: { categories: string[]; values: number[] }) => {
  const option: EChartsOption = {
    tooltip: { trigger: "axis" },
    grid: { left: 40, right: 20, top: 20, bottom: 30 },
    xAxis: { type: "category", data: categories, axisLabel: { color: "#9db2c7" } },
    yAxis: { type: "value", axisLabel: { color: "#9db2c7" } },
    series: [
      {
        type: "bar",
        data: values,
        itemStyle: { color: "#13c2c2" },
      },
    ],
  };

  return <BaseChart option={option} height={320} />;
};

