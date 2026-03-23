import { Card } from "antd";
import type { PropsWithChildren } from "react";

interface GlassCardProps extends PropsWithChildren {
  title?: string;
}

export const GlassCard = ({ title, children }: GlassCardProps) => (
  <Card title={title} className="glass-card" size="small">
    {children}
  </Card>
);

