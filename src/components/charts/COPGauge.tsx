import type { EChartsOption } from "echarts";
import { BaseChart } from "./BaseChart";

export const COPGauge = ({ value, title }: { value: number; title?: string }) => {
  const option: EChartsOption = {
    series: [
      {
        type: "gauge",
        min: 0,
        max: 8,
        progress: { show: true, width: 8 },
        axisLine: { lineStyle: { width: 8 } },
        detail: { valueAnimation: true, formatter: "{value}", color: "#d6e4f0" },
        data: [{ value: Number(value.toFixed(2)), name: title ?? "COP" }],
      },
    ],
  };

  return <BaseChart option={option} height={220} />;
};

