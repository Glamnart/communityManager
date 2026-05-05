
import React, { useState } from "react";
import type { ResourceOffer } from "../types/types";

interface FormProps {
  onAdd: (offer: ResourceOffer) => void;
}

const ResourceOfferForm: React.FC<FormProps> = ({ onAdd }) => {
  const [form, setForm] = useState<Omit<ResourceOffer, "id" | "createdAt">>({
    title: "",
    description: "",
    resourceType: "other",
    offeredBy: "",
    contactMethod: "phone",
    contactValue: "",
    isAvailable: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newOffer: ResourceOffer = {
      ...form,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    onAdd(newOffer);

    // reset form
    setForm({
      title: "",
      description: "",
      resourceType: "other",
      offeredBy: "",
      contactMethod: "phone",
      contactValue: "",
      isAvailable: true,
    });
  };

  return (
    <section
      style={{
        border: "1px solid #d1d5db",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "24px",
      }}
    >
      <h2>Add Resource Offer</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: "12px", marginTop: "16px" }}
      >
        <input
          className="border-2 border-black-500 p-2 rounded"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />

      <textarea
        className="border-2 border-black-500 p-2 rounded"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
      />

      <input
        className="border-2 border-black-500 p-2 rounded"
        name="offeredBy"
        value={form.offeredBy}
        onChange={handleChange}
        placeholder="Your Name"
      />

      <input
        className="border-2 border-black-500 p-2 rounded" 
        name="contactValue"
        value={form.contactValue}
        onChange={handleChange}
        placeholder="Contact"
      />

      <select
        className="border-2 border-black-500 p-2 rounded"
        name="resourceType"
        value={form.resourceType}
        onChange={handleChange}
      >
        <option value="food-item">Food</option>
        <option value="medicine">Medicine</option>
        <option value="clothing">Clothing</option>
        <option value="book">Book</option>
        <option value="equipment">Equipment</option>
        <option value="money">Money</option>
        <option value="service">Service</option>
        <option value="other">Other</option>
      </select>

        <select
          className="border-2 border-black-500 p-2 rounded"
          name="contactMethod"
          value={form.contactMethod}
          onChange={handleChange}
        >
          <option value="phone">Phone</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="email">Email</option>
          <option value="in-person">In Person</option>
        </select>

        <label style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <input
            type="checkbox"
            name="isAvailable"
            checked={form.isAvailable}
            onChange={handleChange}
          />
          Available now
        </label>

        <button type="submit" className="border-2 rounded-lg p-2 bg-blue-500 text-white cursor-pointer">Add Offer</button>
      </form>
    </section>
  );
};


export default ResourceOfferForm;



