// import ResourceForm from "./ResourceForm";

export type SupportCategory = "food"
  | "health"
  | "education"
  | "transport"
  | "employment"
  | "emergency"
  | "shelter"
  | "clothing"
  | "other";

export type UrgencyLevel = "low" | "medium" | "high" | "critical";

export type RequestStatus = "open" | "in-progress" | "resolved" | "rejected";

export type ResourceType = "food-item"
    | "medicine"
    | "clothing"
    | "book"
    | "equipment"
    | "money"
    | "service"
    | "other";

export type VolunteerRole = "coordinator"
    | "driver"
    | "tutor"
    | "medic"
    | "counselor"
    | "donor"
    | "general";
export type ContactMethod = "phone" | "whatsapp" | "email" | "in-person";

export interface SupportRequest {
  id: string;
  title: string;
  description: string;
  category: SupportCategory;
  urgency: UrgencyLevel;
  status: RequestStatus;
  requesterName: string;
  contactMethod: ContactMethod;
  contactValue: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResourceOffer {
  id: string;
  title: string;
  description: string;
  resourceType: ResourceType;
  offeredBy: string;
  contactMethod: ContactMethod;
  contactValue: string;
  isAvailable: boolean;
  createdAt: string;
}

export interface VolunteerAction {
  id: string;
  requestId: string; // links to SupportRequest.id
  volunteerName: string;
  role: VolunteerRole;
  note: string;
  createdAt: string;
}
