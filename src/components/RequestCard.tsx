import type {
  SupportRequest,
  RequestStatus,
} from "../types/types";

interface RequestCardProps {
  request: SupportRequest;
  onStatusChange: (id: string, status: RequestStatus) => void;
  onDelete: (id: string) => void;
}

export const RequestCard: React.FC<RequestCardProps> = ({
  request,
  onStatusChange,
  onDelete,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as RequestStatus;
    onStatusChange(request.id, value);
  };

  return (
    <div className="border p-4 rounded-2xl shadow-sm mb-3">
      <h3 className="text-lg font-semibold">{request.title}</h3>
      <p className="text-sm text-gray-600">{request.description}</p>

      <div className="text-sm mt-2">
        <span>Category: {request.category}</span> |{" "}
        <span>Urgency: {request.urgency}</span> |{" "}
        <span>Status: {request.status}</span>
      </div>

      <div className="mt-2 text-sm">
        <p>Requester: {request.requesterName}</p>
        <p>
          Contact: {request.contactMethod} - {request.contactValue}
        </p>
      </div>

      <div className="mt-3 flex gap-2">
        <select
          value={request.status}
          onChange={handleChange}
          className="border p-1 rounded"
        >
          <option value="open">open</option>
          <option value="in-progress">in-progress</option>
          <option value="resolved">resolved</option>
          <option value="rejected">rejected</option>
        </select>

        <button
          onClick={() => onDelete(request.id)}
          className="bg-red-500 text-white px-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};