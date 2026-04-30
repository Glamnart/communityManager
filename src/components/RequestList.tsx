import React, { useState, useEffect } from "react";
import { RequestCard } from "./RequestCard";
import { RequestFilters } from "./RequestFilters";
import type { RequestFiltersType } from "./RequestFilters";
import { filterRequests } from "../utils/RequestFilters";
import { searchRequests } from "../utils/RequestSearch";
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

  return (
    <div>
      <RequestFilters
        onFilterChange={handleFilter}
        onSearch={handleSearch}
      />

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