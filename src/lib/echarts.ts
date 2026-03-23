import * as echarts from "echarts/core";
import { LineChart, BarChart, PieChart, GaugeChart, ScatterChart, RadarChart } from "echarts/charts";
import { GridComponent, TooltipComponent, LegendComponent, DatasetComponent, TitleComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  LineChart,
  BarChart,
  PieChart,
  GaugeChart,
  ScatterChart,
  RadarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DatasetComponent,
  TitleComponent,
  CanvasRenderer,
]);

export { echarts };

