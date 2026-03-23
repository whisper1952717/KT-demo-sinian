import { Card, Space } from "antd";
import type { ReactNode } from "react";
import { PageHeader } from "./PageHeader";

interface PageScaffoldProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export const PageScaffold = ({ title, subtitle, children }: PageScaffoldProps) => (
  <Space direction="vertical" size={12} style={{ width: "100%" }}>
    <PageHeader title={title} subtitle={subtitle} />
    <Card className="glass-card" size="small">
      {children}
    </Card>
  </Space>
);

