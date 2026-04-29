import React, { useState } from "react";
import { generateId, validateRequestForm, type RequestFormData } from "./utils/validation";
import type { ContactMethod, SupportCategory, SupportRequest, UrgencyLevel } from "./types/types";

interface RequestFormProps {
  onSubmit: (newRequest: SupportRequest) => void;
}

const initialFormState: RequestFormData = {
  title: "",
  description: "",
  category: "",
  urgency: "",
  requesterName: "",
  contactMethod: "",
  contactValue: "",
};

const RequestForm = ({ onSubmit }: RequestFormProps) => {
  const [formData, setFormData] = useState<RequestFormData>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof RequestFormData, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the specific error once the user starts typing
    if (errors[name as keyof RequestFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Run plain TS validation logic
    const validationErrors = validateRequestForm(formData);

    // 2. If errors exist, update UI and stop submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // 3. Create the strictly typed SupportRequest object
    const newRequest: SupportRequest = {
      id: generateId(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category as SupportCategory,
      urgency: formData.urgency as UrgencyLevel,
      status: "open", // All new requests start as 'open'
      requesterName: formData.requesterName.trim(),
      contactMethod: formData.contactMethod as ContactMethod,
      contactValue: formData.contactValue.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 4. Pass to parent
    onSubmit(newRequest);

    // 5. Reset form
    setFormData(initialFormState);
  };

  return (
    <form onSubmit={handleSubmit} className="request-form">
     
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>

  
      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && <span className="error">{errors.description}</span>}
      </div>

     
      <div className="form-group">
        <label>Requester Name</label>
        <input
          type="text"
          name="requesterName"
          value={formData.requesterName}
          onChange={handleChange}
        />
        {errors.requesterName && <span className="error">{errors.requesterName}</span>}
      </div>

    
      <div className="form-group">
        <label>Contact Method</label>
        <select className="form-input" name="contactMethod"
          value={formData.contactMethod}
          onChange={handleChange}>
          <option value="phone">Phone</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="email">Email</option>
          <option value="in-person">In-person</option>
        </select>
        {errors.contactMethod && <span className="error">{errors.contactMethod}</span>}
      </div>

   
      <div className="form-group">
        <label>Contact Value</label>
        <input type="text"
          name="contactValue"
          value={formData.contactValue}
          onChange={handleChange} />
        {errors.contactValue && <span className="error">{errors.contactValue}</span>}
      </div>

      <div className="form-group">
        <label>Category</label>
        <select className="form-input"
          name="category"
          value={formData.category}
          onChange={handleChange}>
          <option value="food">Food</option>
          <option value="health">Health</option>
          <option value="education">Education</option>
          <option value="transport">Transport</option>
          <option value="employment">Employment</option>
          <option value="emergency">Emergency</option>
          <option value="other">Other</option>
        </select>
        {errors.category && <span className="error">{errors.category}</span>}
      </div>

      <div className="form-group">
        <label>Urgency</label>
        <select className="form-input"
          name="urgency"
          value={formData.urgency}
          onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
        {errors.urgency && <span className="error">{errors.urgency}</span>}
      </div>

      <button type="submit">Submit Request</button>
    </form>
  );
};

export default RequestForm;