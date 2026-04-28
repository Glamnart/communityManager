import React, { useState } from "react";
import { SupportCategory, UrgencyLevel } from "../types";

type RequestFormState = {
  title: string;
  description: string;
  category: SupportCategory;
  urgency: UrgencyLevel;
  requesterName: string;
  contactMethod: "phone" | "whatsapp" | "email" | "in-person";
  contactValue: string;
};

const RequestForm = () => {
  const [form, setForm] = useState<RequestFormState>({
    title: "",
    description: "",
    category: "food",
    urgency: "low",
    requesterName: "",
    contactMethod: "phone",
    contactValue: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form>
      {/* Title */}
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
      </div>

  
      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </div>

     
      <div>
        <label>Requester Name</label>
        <input
          type="text"
          name="requesterName"
          value={form.requesterName}
          onChange={handleChange}
        />
      </div>

    
      <div>
        <label>Contact Method</label>
        <select
          name="contactMethod"
          value={form.contactMethod}
          onChange={handleChange}
        >
          <option value="phone">Phone</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="email">Email</option>
          <option value="in-person">In-person</option>
        </select>
      </div>

   
      <div>
        <label>Contact Value</label>
        <input
          type="text"
          name="contactValue"
          value={form.contactValue}
          onChange={handleChange}
        />
      </div>

      
      <div>
        <label>Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option value="food">Food</option>
          <option value="health">Health</option>
          <option value="education">Education</option>
          <option value="transport">Transport</option>
          <option value="employment">Employment</option>
          <option value="emergency">Emergency</option>
          <option value="other">Other</option>
        </select>
      </div>

  
      <div>
        <label>Urgency</label>
        <select
          name="urgency"
          value={form.urgency}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      <button type="submit">Submit Request</button>
    </form>
  );
};

export default RequestForm;