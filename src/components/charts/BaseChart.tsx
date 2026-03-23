import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import "@/lib/echarts";

interface BaseChartProps {
  option: EChartsOption;
  height?: number;
}

export const BaseChart = ({ option, height = 300 }: BaseChartProps) => (
  <ReactECharts option={option} style={{ height }} notMerge lazyUpdate />
);

