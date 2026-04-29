import React, { useState } from "react";
import { RequestList } from "./components/RequestList";
import type { SupportRequest } from "./types/types";
import './App.css'

const App: React.FC = () => {
  const [requests, setRequests] = useState<SupportRequest[]>([]);

  return (
    <div>
      <h1>Community Support Desk</h1>

      <RequestList
        requests={requests}
        setRequests={setRequests}
      />
    </div>
  );
};

export default App;
