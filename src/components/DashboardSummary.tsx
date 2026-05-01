import React from "react";
import type { SupportRequest } from "../types/types";
import { calculateRequestCounts } from "../utils/RequestCount";

interface DashboardSummaryProps {
  requests: SupportRequest[];
}

const DashboardSummary: React.FC<DashboardSummaryProps> = ({ requests }) => {
  const counts = calculateRequestCounts(requests);

  return (
    <section className="mb-8">
      <h2>Dashboard Summary</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "12px",
          marginTop: "16px",
        }}
      >
        <SummaryCard label="Total Requests" value={counts.total} />
        <SummaryCard label="Open" value={counts.open} />
        <SummaryCard label="In Progress" value={counts.inProgress} />
        <SummaryCard label="Resolved" value={counts.resolved} />
        <SummaryCard label="Rejected" value={counts.rejected} />
        <SummaryCard label="Critical" value={counts.critical} />
      </div>
    </section>
  );
};

interface SummaryCardProps {
  label: string;
  value: number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ label, value }) => {
  return (
    <article
      style={{
        border: "1px solid #d1d5db",
        borderRadius: "12px",
        padding: "16px",
        backgroundColor: "#f8fafc",
      }}
    >
      <p style={{ fontSize: "0.95rem", marginBottom: "8px" }}>{label}</p>
      <p style={{ fontSize: "1.8rem", fontWeight: 700, color: "#111827" }}>
        {value}
      </p>
    </article>
  );
};

export default DashboardSummary;
