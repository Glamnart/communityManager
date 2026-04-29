// import React from 'react'




// function ResourceForm() {
//   return (
//     <div>ResourceForm</div>
//   )
// }

// export default ResourceForm;


import React, { useState } from "react";

// Your union type
type ResourceType =
  | "food-item"
  | "medicine"
  | "clothing"
  | "book"
  | "equipment"
  | "money"
  | "service"
  | "other";

// Form data type
type ResourceFormData = {
  name: string;
  quantity: number;
  type: ResourceType;
};

const ResourceForm: React.FC = () => {  
  const [formData, setFormData] = useState<ResourceFormData>({
    name: "",
    quantity: 0,
    type: "other",
  });

  const [submitted, setSubmitted] = useState<ResourceFormData | null>(null);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  // Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(formData);

    // Reset form
    setFormData({
      name: "",
      quantity: 0,
      type: "other",
    });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>Resource Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Resource Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="food-item">Food Item</option>
          <option value="medicine">Medicine</option>
          <option value="clothing">Clothing</option>
          <option value="book">Book</option>
          <option value="equipment">Equipment</option>
          <option value="money">Money</option>
          <option value="service">Service</option>
          <option value="other">Other</option>
        </select>

        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <div style={{ marginTop: "20px" }}>
          <h3>Submitted Resource</h3>
          <p><strong>Name:</strong> {submitted.name}</p>
          <p><strong>Quantity:</strong> {submitted.quantity}</p>
          <p><strong>Type:</strong> {submitted.type}</p>
        </div>
      )}
    </div>
  );
};

export default ResourceForm;