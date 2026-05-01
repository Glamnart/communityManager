import type {
  ResourceOffer,
  SupportRequest,
  VolunteerAction,
} from "../types/types";

const REQUESTS_KEY = "requests";
const RESOURCE_OFFERS_KEY = "resourceOffers";
const VOLUNTEER_ACTIONS_KEY = "volunteerActions";


// get data from localstorage
function readFromStorage(key: string): unknown {
  const storedValue = window.localStorage.getItem(key);

  if (!storedValue) {
    return null;
  }

  try {
    return JSON.parse(storedValue);
  } catch {
    return null;
  }
}

function saveToStorage<T>(key: string, data: T[]): void {
  window.localStorage.setItem(key, JSON.stringify(data));
}

// Function to validate Support Request
function isSupportRequest(item: unknown): item is SupportRequest {
  if (typeof item !== "object" || item === null) {
    return false;
  }

  const request = item as Record<string, unknown>;

  return (
    typeof request.id === "string" &&
    typeof request.title === "string" &&
    typeof request.description === "string" &&
    typeof request.category === "string" &&
    typeof request.urgency === "string" &&
    typeof request.status === "string" &&
    typeof request.requesterName === "string" &&
    typeof request.contactMethod === "string" &&
    typeof request.contactValue === "string" &&
    typeof request.createdAt === "string" &&
    typeof request.updatedAt === "string"
  );
}

// Function to validate Resource Offer
function isResourceOffer(item: unknown): item is ResourceOffer {
  if (typeof item !== "object" || item === null) {
    return false;
  }

  const offer = item as Record<string, unknown>;

  return (
    typeof offer.id === "string" &&
    typeof offer.title === "string" &&
    typeof offer.description === "string" &&
    typeof offer.resourceType === "string" &&
    typeof offer.offeredBy === "string" &&
    typeof offer.contactMethod === "string" &&
    typeof offer.contactValue === "string" &&
    typeof offer.isAvailable === "boolean" &&
    typeof offer.createdAt === "string"
  );
}


// Function to validate VOlunteer Action
function isVolunteerAction(item: unknown): item is VolunteerAction {
  if (typeof item !== "object" || item === null) {
    return false;
  }

  const action = item as Record<string, unknown>;

  return (
    typeof action.id === "string" &&
    typeof action.requestId === "string" &&
    typeof action.volunteerName === "string" &&
    typeof action.role === "string" &&
    typeof action.note === "string" &&
    typeof action.createdAt === "string"
  );
}

function loadList<T>(
  key: string,
  fallback: T[],
  isValidItem: (item: unknown) => item is T
): T[] {

  // get data from stoarage
  const parsedData = readFromStorage(key);

  if (!Array.isArray(parsedData)) {
    return fallback;
  }

  // check if all items are valid
  return parsedData.every(isValidItem) ? parsedData : fallback;
}


// Load Requests form LocalStorage
export function loadRequests(fallback: SupportRequest[] = []): SupportRequest[] {
  return loadList(REQUESTS_KEY, fallback, isSupportRequest);
}

// Save Requests to LocalStorage
export function saveRequests(requests: SupportRequest[]): void {
  saveToStorage(REQUESTS_KEY, requests);
}

// Load Requests form LocalStorage
export function loadResourceOffers(
  fallback: ResourceOffer[] = []
): ResourceOffer[] {
  return loadList(RESOURCE_OFFERS_KEY, fallback, isResourceOffer);
}

// Save Resource Offers to LocalStorage
export function saveResourceOffers(offers: ResourceOffer[]): void {
  saveToStorage(RESOURCE_OFFERS_KEY, offers);
}

// Load Volunteer Actions form LocalStorage
export function loadVolunteerActions(
  fallback: VolunteerAction[] = []
): VolunteerAction[] {
  return loadList(VOLUNTEER_ACTIONS_KEY, fallback, isVolunteerAction);
}

// Save Volunteer Actions to LocalStorage
export function saveVolunteerActions(actions: VolunteerAction[]): void {
  saveToStorage(VOLUNTEER_ACTIONS_KEY, actions);
}
