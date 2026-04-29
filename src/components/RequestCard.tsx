import type { SupportRequest, RequestStatus } from "../types/types";

type Props = {
  request: SupportRequest;
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, status: RequestStatus) => void;
};

export default function RequestCard({
  request,
  onDelete,
  onUpdateStatus,
}: Props) {
  return (
    <div style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
      <h3>{request.title}</h3>
      <p>{request.description}</p>

      <p>Status: {request.status}</p>

      <select
        value={request.status}
        onChange={(e) =>
          onUpdateStatus(request.id, e.target.value as RequestStatus)
        }
      >
        <option value="open">Open</option>
        <option value="in-progress">In Progress</option>
        <option value="resolved">Resolved</option>
        <option value="rejected">Rejected</option>
      </select>

      <button onClick={() => onDelete(request.id)}>
        Delete
      </button>
    </div>
  );
}
