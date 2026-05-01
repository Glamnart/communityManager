
import React, { useState } from "react";  
// import type { ResourceType } from "../types/types";
// import ResourceList from "./ResourceList";
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

  const [lists, setLists] = useState<ResourceOffer[]>([]);

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

    // add to local list
    setLists((prev) => [...prev, newOffer]);

    // send to parent
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
    <form className="m-4 flex" onSubmit={handleSubmit}>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
      />

      <textarea
        className="mx-4"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
      />

      <input
        name="offeredBy"
        value={form.offeredBy}
        onChange={handleChange}
        placeholder="Your Name"
      />

      <input
        className="mx-4 my-4"
        name="contactValue"
        value={form.contactValue}
        onChange={handleChange}
        placeholder="Contact"
      />

      <select
        className="mx-4"
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
        className="mx-4"
        name="contactMethod"
        value={form.contactMethod}
        onChange={handleChange}
      >
        <option value="phone">Phone</option>
        <option value="email">Email</option>
      </select>

      <label>
        Available:
        <input
          className="mx-2"
          type="checkbox"
          name="isAvailable"
          checked={form.isAvailable}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Add Offer</button>

      {/* Display list */}
      {lists.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p>{item.offeredBy}</p>
          <p>{item.contactValue}</p>
        </div>
      ))}
    </form>
  );
};


export default ResourceOfferForm;



