import { Typography } from "antd";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => (
  <div style={{ marginBottom: 12 }}>
    <Typography.Title level={4} style={{ margin: 0 }}>{title}</Typography.Title>
    {subtitle ? <Typography.Text type="secondary">{subtitle}</Typography.Text> : null}
  </div>
);

