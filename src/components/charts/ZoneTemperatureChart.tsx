import type { EChartsOption } from "echarts";
import { BaseChart } from "./BaseChart";

interface ZoneTemperatureChartProps {
  hours: string[];
  zone1: number[];
  zone2: number[];
  zone3: number[];
  target?: number;
}

export const ZoneTemperatureChart = ({ hours, zone1, zone2, zone3, target = 16 }: ZoneTemperatureChartProps) => {
  const option: EChartsOption = {
    tooltip: { trigger: "axis" },
    legend: { data: ["东侧", "中部", "西侧", "目标"], textStyle: { color: "#b8cadb" } },
    xAxis: { type: "category", data: hours, axisLabel: { color: "#9db2c7" } },
    yAxis: { type: "value", axisLabel: { color: "#9db2c7" } },
    series: [
      { name: "东侧", type: "line", smooth: true, data: zone1 },
      { name: "中部", type: "line", smooth: true, data: zone2 },
      { name: "西侧", type: "line", smooth: true, data: zone3 },
      { name: "目标", type: "line", data: hours.map(() => target), lineStyle: { type: "dashed", color: "#faad14" } },
    ],
  };

  return <BaseChart option={option} height={300} />;
};

