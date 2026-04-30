import { useState } from 'react';
import './App.css';
import type { SupportRequest, RequestStatus } from "./types/types";
import RequestList from "./components/RequestList";
import { updateRequestStatus, deleteRequest } from "./utils/requestHandlers";

function App() {
  const [requests, setRequests] = useState<SupportRequest[]>([]);

  const handleStatusUpdate = (id: string, status: RequestStatus) => {
    setRequests((prev) =>
      updateRequestStatus(prev, id, status)
    );
  };

  const handleDelete = (id: string) => {
    setRequests((prev) =>
      deleteRequest(prev, id)
    );
  };

  return (
    <div>
      <RequestList
        requests={requests}
        onDelete={handleDelete}
        onUpdateStatus={handleStatusUpdate}
      />
    </div>
  );
}

export default App;