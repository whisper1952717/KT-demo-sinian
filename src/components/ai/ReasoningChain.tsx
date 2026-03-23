import { Collapse, Steps } from "antd";
import type { ReasoningStep } from "@/types/strategy";

export const ReasoningChain = ({ steps }: { steps: ReasoningStep[] }) => (
  <Collapse
    defaultActiveKey={["chain"]}
    items={[
      {
        key: "chain",
        label: "推理链",
        children: (
          <Steps
            direction="vertical"
            items={steps.map((item) => ({
              title: item.title,
              description: `${item.description} | ${item.conclusion}`,
            }))}
          />
        ),
      },
    ]}
  />
);

