import { SupportRequest } from "../types";

// Filters support requests based on category, urgency, and status.
export function filterRequests(
  requests: SupportRequest[],
  category: string,
  urgency: string,
  status: string
): SupportRequest[] {
  return requests.filter((request) => {

      // Loop through all requests and return only those that match filters
    return (
        // Category filter: allow all OR match selected category
      (category === "all" || request.category === category) &&
      // Urgency filter: allow all OR match selected urgency
      (urgency === "all" || request.urgency === urgency) &&
       // Status filter: allow all OR match selected status
      (status === "all" || request.status === status)
    );
  });
}