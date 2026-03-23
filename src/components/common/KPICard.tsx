import { Card, Statistic } from "antd";
import type { ReactNode } from "react";

interface KPICardProps {
  title: string;
  value: number | string;
  suffix?: string;
  precision?: number;
  prefix?: ReactNode;
}

export const KPICard = ({ title, value, suffix, precision, prefix }: KPICardProps) => (
  <Card size="small" className="glass-card">
    <Statistic title={title} value={value} suffix={suffix} precision={precision} prefix={prefix} />
  </Card>
);

