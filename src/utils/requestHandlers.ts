import type { SupportRequest, RequestStatus } from "../types/types";

export const updateRequestStatus = (
  requests: SupportRequest[],
  id: string,
  status: RequestStatus
): SupportRequest[] => {
  return requests.map((req) =>
    req.id === id ? { ...req, status } : req
  );
};

export const deleteRequest = (
  requests: SupportRequest[],
  id: string
): SupportRequest[] => {
  return requests.filter((req) => req.id !== id);
};