import { Alert, Button, Card, Divider, Input, Space, Table, Tag, Typography } from "antd";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";

interface SceneMessage {
  time: string;
  direction: "outbound" | "inbound";
  type: string;
  payload: string;
}

const sampleProtocol = [
  { type: "scene:init", desc: "初始化场景同步" },
  { type: "scene:camera", desc: "同步摄像机位置" },
  { type: "scene:focus-equipment", desc: "高亮指定设备" },
  { type: "scene:strategy-progress", desc: "同步策略流转状态" },
];

const Scene3DPlaceholder = () => {
  const [targetOrigin, setTargetOrigin] = useState("*");
  const [outboundType, setOutboundType] = useState("scene:init");
  const [outboundPayload, setOutboundPayload] = useState('{"source":"dashboard","ts":0}');
  const [logs, setLogs] = useState<SceneMessage[]>([]);

  const pushLog = (log: SceneMessage) => {
    setLogs((prev) => [log, ...prev].slice(0, 20));
  };

  const sendMessage = () => {
    const payload = outboundPayload.trim() || "{}";
    window.postMessage({ type: outboundType, payload }, targetOrigin || "*");
    pushLog({
      time: new Date().toLocaleTimeString(),
      direction: "outbound",
      type: outboundType,
      payload,
    });
  };

  const protocolColumns = useMemo(
    () => [
      { title: "消息类型", dataIndex: "type" },
      { title: "说明", dataIndex: "desc" },
    ],
    [],
  );

  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <PageHeader title="3D 场景占位" subtitle="iframe + postMessage 协议桥接" />

      <Card className="glass-card" size="small" title="场景容器">
        <iframe
          title="3D scene placeholder"
          src="about:blank"
          style={{ width: "100%", height: 420, border: "1px dashed rgba(120,170,210,0.35)" }}
        />
        <Alert
          style={{ marginTop: 12 }}
          type="info"
          showIcon
          message="当前为协议占位页，用于保证后续三维系统集成时接口稳定。"
        />
      </Card>

      <Card className="glass-card" size="small" title="postMessage 协议">
        <Table size="small" pagination={false} rowKey="type" dataSource={sampleProtocol} columns={protocolColumns} />
      </Card>

      <Card className="glass-card" size="small" title="消息调试台">
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input addonBefore="目标 Origin" value={targetOrigin} onChange={(event) => setTargetOrigin(event.target.value)} />
          <Input addonBefore="消息类型" value={outboundType} onChange={(event) => setOutboundType(event.target.value)} />
          <Input.TextArea rows={3} value={outboundPayload} onChange={(event) => setOutboundPayload(event.target.value)} />
          <Button type="primary" onClick={sendMessage}>发送测试消息</Button>
          <Divider style={{ margin: "8px 0" }} />
          <Space direction="vertical" size={6} style={{ width: "100%" }}>
            {logs.map((log, idx) => (
              <Typography.Text key={`${log.time}-${idx}`}>
                <Tag color={log.direction === "outbound" ? "blue" : "cyan"}>{log.direction}</Tag>
                [{log.time}] {log.type} {log.payload}
              </Typography.Text>
            ))}
          </Space>
        </Space>
      </Card>
    </Space>
  );
};

export default Scene3DPlaceholder;