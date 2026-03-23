import { COPGauge } from "@/components/charts/COPGauge";

export const ConfidenceGauge = ({ value }: { value: number }) => <COPGauge value={value / 12.5} title={`置信度 ${value}%`} />;

