import type { SupportRequest } from "../types/types";

//Searches through support requests based on a search term.
// It matches the term against title, description, and requester name.
export function searchRequests(
  requests: SupportRequest[],
  searchTerm: string
): SupportRequest[] {

  // Convert search term to lowercase for case-insensitive matching
  const term = searchTerm.toLowerCase();
  
  if (!term) return requests;

  // Filter requests that match the search term in any of the fields
  return requests.filter((request) => {
    return (
      request.title.toLowerCase().includes(term) ||
      request.description.toLowerCase().includes(term) ||
      request.requesterName.toLowerCase().includes(term)
    );
  });
}