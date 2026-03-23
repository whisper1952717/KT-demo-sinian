import type { EChartsOption } from "echarts";
import { BaseChart } from "./BaseChart";

interface DualSystemChartProps {
  categories: string[];
  original: number[];
  newSystem: number[];
  title?: string;
  height?: number;
}

export const DualSystemChart = ({ categories, original, newSystem, title, height = 300 }: DualSystemChartProps) => {
  const option: EChartsOption = {
    title: title
      ? {
          text: title,
          left: 8,
          top: 6,
          textStyle: { color: "#d6e4f0", fontSize: 13, fontWeight: 500 },
        }
      : undefined,
    tooltip: { trigger: "axis" },
    legend: {
      data: ["原系统", "新系统"],
      top: 8,
      right: 12,
      itemWidth: 18,
      itemHeight: 8,
      textStyle: { color: "#b8cadb" },
    },
    grid: { left: 44, right: 22, top: 54, bottom: 42 },
    xAxis: {
      type: "category",
      data: categories,
      axisLabel: { color: "#9db2c7" },
      axisLine: { lineStyle: { color: "rgba(255,255,255,0.2)" } },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: "#9db2c7" },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: "rgba(255,255,255,0.08)" } },
    },
    series: [
      {
        name: "原系统",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 6,
        data: original,
        lineStyle: { color: "#1890ff", width: 2 },
        itemStyle: { color: "#7db5ff", borderColor: "#d6e4f0", borderWidth: 1 },
      },
      {
        name: "新系统",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 6,
        data: newSystem,
        lineStyle: { color: "#13c2c2", width: 2 },
        itemStyle: { color: "#d5f96b", borderColor: "#d6e4f0", borderWidth: 1 },
      },
    ],
  };

  return <BaseChart option={option} height={height} />;
};