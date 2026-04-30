import React, { useState } from "react";
import { RequestList } from "./components/RequestList";
import Header from "./components/Header"
import type { SupportRequest } from "./types/types";
import './App.css'

const App: React.FC = () => {
  const [requests, setRequests] = useState<SupportRequest[]>([]);

  return (
    <div>
      <Header/>
      <RequestList
        requests={requests}
        setRequests={setRequests}
      />
    </div>
  );
};

export default App;
