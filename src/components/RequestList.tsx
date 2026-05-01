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

  const [filters, setFilters] = useState<RequestFiltersType>({
    category: "all",
    urgency: "all",
    status: "all",
  });

  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    let result = filterRequests(
      requests,
      filters.category,
      filters.urgency,
      filters.status
    );

    result = searchRequests(result, searchTerm);

    setFiltered(result);
  }, [requests, filters, searchTerm]);

  const handleFilter = (newFilters: RequestFiltersType): void => {
    setFilters(newFilters);
  };

  const handleSearch = (query: string): void => {
    setSearchTerm(query);
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
    localStorage.setItem("requests", JSON.stringify(updated));
  };

  const handleDelete = (id: string): void => {
  const updated: SupportRequest[] = requests.map((req) =>
    req.id === id
      ? { ...req, status: "rejected", updatedAt: new Date().toISOString() }
      : req
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