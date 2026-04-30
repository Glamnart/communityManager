import { useState } from 'react';
import type { SupportRequest, RequestStatus } from "./types/types";
import RequestList from "./components/RequestList";
import { updateRequestStatus, deleteRequest } from "./utils/requestHandlers";

function App() {
  const [requests, setRequests] = useState<SupportRequest[]>([
  {
    id: "1",
    title: "Need food support",
    description: "I need help with food supplies",
    category: "food",
    urgency: "high",
    status: "open",
    requesterName: "John",
    contactMethod: "phone",
    contactValue: "123456789",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]);
  const handleStatusUpdate = (id: string, status: RequestStatus) => {
    setRequests(prev => updateRequestStatus(prev, id, status));
  };

  const handleDelete = (id: string) => {
    setRequests(prev => deleteRequest(prev, id));
  };

  return (
    <RequestList
      requests={requests}
      onDelete={handleDelete}
      onUpdateStatus={handleStatusUpdate}
    />
  );
}

export default App;