import type { SupportRequest } from "../types/types";

export interface RequestCounts {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  rejected: number;
  critical: number;
}

export function calculateRequestCounts(
  requests: SupportRequest[]
): RequestCounts {
  return {
    total: requests.length,
    open: requests.filter((r) => r.status === "open").length,
    inProgress: requests.filter((r) => r.status === "in-progress").length,
    resolved: requests.filter((r) => r.status === "resolved").length,
    rejected: requests.filter((r) => r.status === "rejected").length,
    critical: requests.filter((r) => r.urgency === "critical").length,
  };
}