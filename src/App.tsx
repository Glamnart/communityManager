import { useState } from 'react';
import './App.css';
import type { SupportRequest, RequestStatus } from "./types/types";
import RequestCard from './components/RequestCard';
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

  // ✅ Uses util function
  const handleStatusUpdate = (id: string, status: RequestStatus) => {
    setRequests((prev) =>
      updateRequestStatus(prev, id, status)
    );
  };

  // ✅ Uses util function
  const handleDelete = (id: string) => {
    setRequests((prev) =>
      deleteRequest(prev, id)
    );
  };

  return (
    <div>
      <h1>Community Support Desk</h1>

      {requests.length === 0 ? (
        <p>No requests available</p>
      ) : (
        requests.map((req) => (
          <RequestCard
            key={req.id}
            request={req}
            onDelete={handleDelete}
            onUpdateStatus={handleStatusUpdate}
          />
        ))
      )}
    </div>
  );
}

export default App;