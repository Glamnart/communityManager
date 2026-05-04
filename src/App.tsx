import React, { useState } from "react";
import { RequestList } from "./components/RequestList";
import Header from "./components/Header"
// import type { SupportRequest } from "./types/types";
import {RequestsSampleData} from "./data/sample.js"
import './App.css'
import RequestForm from './RequestForm'
import type { SupportRequest } from './types/types'

const App: React.FC = () => {
  const [requests, setRequests] = useState<SupportRequest[]>([...RequestsSampleData]);

  return (
    <div>
      <Header/>
      {/* <RequestForm onSubmit={(newRequest) => setRequests((prev) => [newRequest, ...prev])} /> */}
      <RequestList
        requests={requests}
        setRequests={setRequests}
      />
    </div>
  );
};

export default App;
