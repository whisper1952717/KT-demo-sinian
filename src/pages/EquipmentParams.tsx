import { Card, Col, Descriptions, Row, Select, Space, Statistic, Tag } from "antd";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { BaseChart } from "@/components/charts/BaseChart";
import { mockEquipment } from "@/mock/equipment";

const excludedTypes = new Set(["water_treatment", "makeup_water", "sensor"]);
const runnableEquipment = mockEquipment.filter((item) => !excludedTypes.has(item.type));

const paramLabelMap: Record<string, string> = {
  supplyTemp: "供水温度(℃)",
  returnTemp: "回水温度(℃)",
  flow: "流量(m³/h)",
  maxFlow: "最大流量(m³/h)",
  pressure: "压力(MPa)",
  cop: "COP",
  frequency: "频率(Hz)",
  vibration: "振动(mm/s)",
  loadRate: "负荷率(%)",
  coolingCapacity: "制冷量(kW)",
  approachTemp: "逼近温度(℃)",
  conductivity: "电导率(μS/cm)",
  phValue: "pH值",
};

const statusLabelMap: Record<string, string> = {
  running: "运行中",
  stopped: "停机",
  fault: "故障",
  maintenance: "维护中",
};

const systemLabelMap: Record<string, string> = {
  original: "原系统",
  new: "新系统",
  shared: "共用系统",
};

const statusColorMap: Record<string, string> = {
  running: "green",
  stopped: "default",
  fault: "red",
  maintenance: "gold",
};

const systemColorMap: Record<string, string> = {
  original: "blue",
  new: "cyan",
  shared: "purple",
};

const EquipmentParams = () => {
  const [id, setId] = useState(runnableEquipment[0]?.id ?? "");
  const current = useMemo(
    () => runnableEquipment.find((item) => item.id === id) ?? runnableEquipment[0],
    [id],
  );

  if (!current) {
    return (
      <Space direction="vertical" size={12} style={{ width: "100%" }}>
        <PageHeader title="运行参数" subtitle="单设备详情、参数趋势与健康状态" />
      </Space>
    );
  }

  const paramRows = Object.entries(current.params)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => ({
      key,
      label: paramLabelMap[key] ?? key,
      value,
    }));

  const trendData = [
    Number((current.currentPower * 0.86).toFixed(1)),
    Number((current.currentPower * 0.84).toFixed(1)),
    Number((current.currentPower * 0.83).toFixed(1)),
    Number((current.currentPower * 0.85).toFixed(1)),
    Number((current.currentPower * 0.88).toFixed(1)),
    Number((current.currentPower * 0.93).toFixed(1)),
    current.currentPower,
  ];

  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <PageHeader title="运行参数" subtitle="单设备详情、参数趋势与健康状态" />

      <Select
        value={id}
        onChange={setId}
        options={runnableEquipment.map((item) => ({ value: item.id, label: `${item.id} ${item.name}` }))}
      />

      <Row gutter={12}>
        <Col span={8}>
          <Card className="glass-card" size="small">
            <Statistic title="当前功率" value={current.currentPower} suffix="kW" />
          </Card>
        </Col>
        <Col span={8}>
          <Card className="glass-card" size="small">
            <Statistic title="额定功率" value={current.ratedPower} suffix="kW" />
          </Card>
        </Col>
        <Col span={8}>
          <Card className="glass-card" size="small">
            <Statistic title="健康度" value={current.healthScore} suffix="/100" />
          </Card>
        </Col>
      </Row>

      <Card className="glass-card" size="small" title="核心参数">
        <Descriptions bordered size="small" column={2}>
          {paramRows.map((entry) => (
            <Descriptions.Item key={entry.key} label={entry.label}>
              {entry.value as string | number}
            </Descriptions.Item>
          ))}
          <Descriptions.Item label="运行状态">
            <Tag color={statusColorMap[current.status] ?? "default"}>
              {statusLabelMap[current.status] ?? current.status}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="系统归属">
            <Tag color={systemColorMap[current.systemId] ?? "default"}>
              {systemLabelMap[current.systemId] ?? current.systemId}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card className="glass-card" size="small" title="参数趋势(示例)">
        <BaseChart
          height={280}
          option={{
            tooltip: { trigger: "axis" },
            legend: { data: ["参数值"] },
            xAxis: {
              type: "category",
              data: ["6小时前", "5小时前", "4小时前", "3小时前", "2小时前", "1小时前", "当前"],
            },
            yAxis: { type: "value" },
            series: [
              {
                name: "参数值",
                type: "line",
                smooth: true,
                data: trendData,
              },
            ],
          }}
        />
      </Card>
    </Space>
  );
};

export default EquipmentParams;
