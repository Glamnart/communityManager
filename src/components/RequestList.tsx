import React, { useState, useEffect } from "react";
import { RequestCard } from "./RequestCard";
import { RequestFilters } from "./RequestFilters";
import type { RequestFiltersType } from "./RequestFilters";
import { filterRequests } from "../utils/RequestFilters";
import { searchRequests } from "../utils/RequestSearch";
// import { calculateRequestCounts } from "../utils/RequestCount";
// the comment above is for the counts feature which is currently not implemented in the UI, but the logic is there in case we want to add it later.

import type {
  SupportRequest,
  RequestStatus,
} from "../types/types";

interface RequestListProps {
  requests: SupportRequest[];
  setRequests: React.Dispatch<React.SetStateAction<SupportRequest[]>>;
}

export const RequestList: React.FC<RequestListProps> = ({
  requests,
  setRequests,
}) => {
  const [filtered, setFiltered] = useState<SupportRequest[]>([]);

  useEffect(() => {
    setFiltered(requests);
  }, [requests]);

  const handleFilter = (filters: RequestFiltersType): void => {
    setFiltered(
      filterRequests(
        requests,
        filters.category,
        filters.urgency,
        filters.status
      )
    );
  };

  const handleSearch = (query: string): void => {
    setFiltered(searchRequests(requests, query));
  };

  const handleStatusChange = (
    id: string,
    status: RequestStatus
  ): void => {
    const updated: SupportRequest[] = requests.map((req) =>
      req.id === id
        ? { ...req, status, updatedAt: new Date().toISOString() }
        : req
    );

    setRequests(updated);
    setFiltered(updated);
    localStorage.setItem("requests", JSON.stringify(updated));
  };

  const handleDelete = (id: string): void => {
    const updated: SupportRequest[] = requests.filter(
      (req) => req.id !== id
    );

    setRequests(updated);
    setFiltered(updated);
    localStorage.setItem("requests", JSON.stringify(updated));
  };
  // const counts = calculateRequestCounts(filtered);

  return (
    <div>
      <RequestFilters
        onFilterChange={handleFilter}
        onSearch={handleSearch}
      />

      {/* <div className="mb-4 p-3 border rounded">
        <p>Total: {counts.total}</p>
        <p>Open: {counts.open}</p>
        <p>In Progress: {counts.inProgress}</p>
        <p>Resolved: {counts.resolved}</p>
        <p>Rejected: {counts.rejected}</p>
        <p>Critical: {counts.critical}</p>
      </div> */}

      {filtered.map((req) => (
        <RequestCard
          key={req.id}
          request={req}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};