import React, { useState } from "react";
import type { RequestStatus, SupportCategory, UrgencyLevel } from "../types/types";

const supportCategories : SupportCategory[] = ["food","health","education","transport","employment","emergency","shelter","clothing","other"];
const urgencyLevels : UrgencyLevel[] = ["low","medium","high","critical"];
const requestStatuses : RequestStatus[] = ["open","in-progress","resolved","rejected"];

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
        {supportCategories.map((category)=><option value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>)}
      </select>

      <select onChange={(e) => handleChange("urgency", e.target.value as UrgencyLevel | "all")}>
        <option value="all">All Urgency</option>
        {urgencyLevels.map((level)=><option value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>)}
      </select>

      <select onChange={(e) => handleChange("status", e.target.value as RequestStatus | "all")}>
        <option value="all">All Status</option>
        {requestStatuses.map((status)=><option value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>)}
      </select>
    </div>
  );
};