export type WorkOrderStatus = "pending" | "approved" | "rejected" | "completed";

export interface WorkOrder {
  id: string;
  title: string;
  description: string;
  createdAt: number;
  assignee: string;
  status: WorkOrderStatus;
  priority: "high" | "medium" | "low";
}

