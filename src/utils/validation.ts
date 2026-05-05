import type { SupportCategory, UrgencyLevel, ContactMethod } from "../types/types";

// A temporary interface strictly for form state, allowing empty strings before selection
export interface RequestFormData {
  title: string;
  description: string;
  category: SupportCategory | "";
  urgency: UrgencyLevel | "";
  requesterName: string;
  contactMethod: ContactMethod | "";
  contactValue: string;
}

// Returns an object containing error messages mapped to its field names.
export const validateRequestForm = (
  data: RequestFormData
): Partial<Record<keyof RequestFormData, string>> => {
  const errors: Partial<Record<keyof RequestFormData, string>> = {};

  if (!data.title.trim()) errors.title = "Title is required.";
  if (!data.description.trim()) errors.description = "Description is required.";
  if (!data.category) errors.category = "Please select a category.";
  if (!data.urgency) errors.urgency = "Please select an urgency level.";
  if (!data.requesterName.trim()) errors.requesterName = "Your name is required.";
  if (!data.contactMethod) errors.contactMethod = "Please select a contact method.";
  if (!data.contactValue.trim()) errors.contactValue = "Contact details are required.";

  // Email validation
  if (data.contactMethod === "email" && !/\S+@\S+\.\S+/.test(data.contactValue)) {
    errors.contactValue = "Please enter a valid email address.";
  }

  return errors;
};

// Generates a unique ID for new records.
export const generateId = (): string => {
  return crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();
};