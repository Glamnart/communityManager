import type { SupportRequest, RequestStatus } from "../types/types";
import RequestCard from "./RequestCard";

type Props = {
  requests: SupportRequest[];
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, status: RequestStatus) => void;
};

export default function RequestList({
  requests,
  onDelete,
  onUpdateStatus,
}: Props) {
  return (
    <div>
      {requests.map((req) => (
        <RequestCard
          key={req.id}
          request={req}
          onDelete={onDelete}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  );
}