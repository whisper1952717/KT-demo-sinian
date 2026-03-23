import { Card, Col, Row, Space, Statistic } from "antd";
import { PageHeader } from "@/components/common/PageHeader";
import { BaseChart } from "@/components/charts/BaseChart";
import { hourlyPower } from "@/mock/energy";

const CoolingAnalysis = () => (
  <Space direction="vertical" size={12} style={{ width: "100%" }}>
    <PageHeader title="冷量分析" subtitle="总供冷量、双系统分担与温度达标" />

    <Row gutter={12}>
      <Col span={8}><Card className="glass-card" size="small"><Statistic title="今日总供冷量" value={23240} suffix="kWh" /></Card></Col>
      <Col span={8}><Card className="glass-card" size="small"><Statistic title="区域达标率" value={96.8} suffix="%" /></Card></Col>
      <Col span={8}><Card className="glass-card" size="small"><Statistic title="峰值冷量" value={Math.max(...hourlyPower.map((h) => h.coolingLoad)).toFixed(0)} suffix="kW" /></Card></Col>
    </Row>

    <Card className="glass-card" size="small" title="总供冷量时序">
      <BaseChart
        option={{
          tooltip: { trigger: "axis" },
          xAxis: { type: "category", data: hourlyPower.map((item) => `${item.hour}:00`) },
          yAxis: { type: "value" },
          series: [{ type: "line", data: hourlyPower.map((item) => item.coolingLoad), smooth: true, areaStyle: {} }],
        }}
      />
    </Card>

    <Card className="glass-card" size="small" title="双系统冷量占比">
      <BaseChart
        option={{
          tooltip: { trigger: "item" },
          legend: { orient: "vertical", right: 0, top: "center" },
          series: [
            {
              type: "pie",
              radius: ["45%", "72%"],
              data: [
                { name: "原系统", value: 58 },
                { name: "新系统", value: 42 },
              ],
            },
          ],
        }}
        height={300}
      />
    </Card>
  </Space>
);

export default CoolingAnalysis;