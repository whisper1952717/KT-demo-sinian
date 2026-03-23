import dayjs from "dayjs";
import type { Strategy, StrategyModule, StrategyStatus, StrategyTransition } from "@/types/strategy";

const moduleTitles: Record<StrategyModule, string> = {
  chiller_optimization: "冷机效率优化",
  pump_optimization: "泵组频率优化",
  tower_optimization: "冷却塔逼近温度优化",
  load_dispatch: "双系统负荷调度",
  temp_setpoint: "供水温度设定优化",
  fdd: "异常检测与规避",
};

const statuses: StrategyStatus[] = [
  "completed",
  "completed",
  "completed",
  "rejected",
  "rolled_back",
  "expired",
  "executing",
  "pending_confirmation",
  "suggested",
];

const modules: StrategyModule[] = [
  "load_dispatch",
  "temp_setpoint",
  "chiller_optimization",
  "pump_optimization",
  "tower_optimization",
  "fdd",
];

export const createStrategy = (index: number): Strategy => {
  const module = modules[index % modules.length];
  const status = statuses[index % statuses.length];
  const createdAt = dayjs().subtract(index * 3, "hour").valueOf();
  const confidence = 62 + ((index * 7) % 35);

  return {
    id: `ST-${String(index + 1).padStart(4, "0")}`,
    createdAt,
    updatedAt: createdAt + 300000,
    module,
    title: `${moduleTitles[module]}策略 #${index + 1}`,
    description: `根据负荷预测与设备健康度调整${moduleTitles[module]}参数。`,
    status,
    confidence,
    riskLevel: confidence > 85 ? "low" : confidence > 70 ? "medium" : "high",
    riskDescription: confidence > 70 ? "风险可控，建议执行" : "建议人工确认后执行",
    influenceFactors: [
      { name: "室外温度", weight: 0.3, currentValue: "29.5°C", impact: "negative" },
      { name: "负荷预测", weight: 0.25, currentValue: "-15%", impact: "positive" },
      { name: "设备效率", weight: 0.2, currentValue: "COP 4.8", impact: "positive" },
      { name: "电价", weight: 0.15, currentValue: "0.86元/kWh", impact: "negative" },
      { name: "历史模式", weight: 0.1, currentValue: "相似度87%", impact: "neutral" },
    ],
    reasoningChain: [
      {
        step: 1,
        title: "观测数据",
        description: "采集最近15分钟工况数据",
        keyData: { load: "78%", temp: "16.1°C", cop: 4.75 },
        conclusion: "当前工况稳定，可尝试优化",
      },
      {
        step: 2,
        title: "模型推理",
        description: "综合预测未来两小时负荷",
        keyData: { trend: "下降", forecast: "-15%" },
        conclusion: "适合降低能耗策略",
      },
      {
        step: 3,
        title: "约束校验",
        description: "校验温度、压力与告警阈值",
        keyData: { tempLimit: "16°C", pressure: "0.41MPa" },
        conclusion: "满足约束，不触发风险",
      },
      {
        step: 4,
        title: "输出建议",
        description: "生成参数变更建议",
        keyData: { deltaTemp: "+0.8°C", deltaFreq: "-3Hz" },
        conclusion: "预计每日节能 820kWh",
      },
    ],
    paramChanges: [
      {
        paramName: "供水温度",
        equipmentId: "CH-NEW-01",
        equipmentName: "新系统高效冷机",
        before: 8,
        after: 8.8,
        unit: "°C",
      },
      {
        paramName: "泵频率",
        equipmentId: "CWP-NEW-01",
        equipmentName: "新系统冷冻泵1",
        before: 45,
        after: 42,
        unit: "Hz",
      },
    ],
    expectedSaving: {
      power: 95 + (index % 4) * 8,
      percentage: 7.8 + (index % 4) * 0.6,
      dailyEnergy: 760 + (index % 5) * 45,
    },
    actualSaving:
      status === "completed"
        ? {
            power: 88 + (index % 3) * 7,
            percentage: 7.1 + (index % 3) * 0.5,
            dailyEnergy: 710 + (index % 4) * 42,
          }
        : undefined,
    confirmedBy: status === "pending_confirmation" || status === "suggested" ? undefined : "值班工程师",
    confirmedAt: status === "pending_confirmation" || status === "suggested" ? undefined : createdAt + 180000,
    executedAt: status === "suggested" || status === "pending_confirmation" || status === "rejected" ? undefined : createdAt + 300000,
    completedAt: status === "completed" ? createdAt + 1200000 : undefined,
    rollbackAt: status === "rolled_back" ? createdAt + 900000 : undefined,
    rollbackBy: status === "rolled_back" ? "运维主管" : undefined,
    rollbackReason: status === "rolled_back" ? "区域温度波动超限" : undefined,
    validFrom: createdAt,
    validUntil: dayjs(createdAt).add(2, "hour").valueOf(),
  };
};

export const mockStrategies: Strategy[] = Array.from({ length: 34 }).map((_, index) => createStrategy(index));

export const mockTransitions: StrategyTransition[] = mockStrategies.flatMap((item) => {
  const transitions: StrategyTransition[] = [
    {
      id: `${item.id}-t1`,
      strategyId: item.id,
      fromStatus: "suggested",
      toStatus: "pending_confirmation",
      timestamp: item.createdAt + 90000,
      operator: "AI引擎",
      remark: "策略已生成",
    },
  ];

  if (item.status === "rejected") {
    transitions.push({
      id: `${item.id}-t2`,
      strategyId: item.id,
      fromStatus: "pending_confirmation",
      toStatus: "rejected",
      timestamp: item.createdAt + 240000,
      operator: "值班工程师",
      remark: "人工驳回",
    });
  } else if (item.status === "pending_confirmation" || item.status === "suggested") {
    // no-op
  } else {
    transitions.push({
      id: `${item.id}-t2`,
      strategyId: item.id,
      fromStatus: "pending_confirmation",
      toStatus: "confirmed",
      timestamp: item.createdAt + 240000,
      operator: "值班工程师",
    });
    transitions.push({
      id: `${item.id}-t3`,
      strategyId: item.id,
      fromStatus: "confirmed",
      toStatus: item.status === "rolled_back" ? "executing" : item.status,
      timestamp: item.createdAt + 420000,
      operator: "控制系统",
    });
    if (item.status === "rolled_back") {
      transitions.push({
        id: `${item.id}-t4`,
        strategyId: item.id,
        fromStatus: "executing",
        toStatus: "rolled_back",
        timestamp: item.createdAt + 760000,
        operator: "运维主管",
      });
    }
  }

  return transitions;
});

