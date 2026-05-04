import React, { useState } from "react";
import type { RequestStatus } from "../types/types";
import type { SupportCategory, UrgencyLevel } from "../types/types";

export interface RequestFiltersType {
  category: SupportCategory | "all";
  urgency: UrgencyLevel | "all";
  status: RequestStatus | "all";
}

interface Props {
  onFilterChange: (filters: RequestFiltersType) => void;
  onSearch: (query: string) => void;
}

export const RequestFilters: React.FC<Props> = ({
  onFilterChange,
  onSearch,
}) => {
  const [filters, setFilters] = useState<RequestFiltersType>({
    category: "all",
    urgency: "all",
    status: "all",
  });

  const handleChange = (key: keyof RequestFiltersType, value: string) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange(updated);
  };

  return (
    <div>
      <input
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
      />

      <select onChange={(e) => handleChange("category", e.target.value as SupportCategory | "all")}>
        <option value="all">All Categories</option>
        <option value="food">food</option>
        <option value="health">health</option>
      </select>

      <select onChange={(e) => handleChange("urgency", e.target.value as UrgencyLevel | "all")}>
        <option value="all">All Urgency</option>
        <option value="low">low</option>
        <option value="high">high</option>
      </select>

      <select onChange={(e) => handleChange("status", e.target.value as RequestStatus | "all")}>
        <option value="all">All Status</option>
        <option value="open">open</option>
        <option value="resolved">resolved</option>
      </select>
    </div>
  );
};