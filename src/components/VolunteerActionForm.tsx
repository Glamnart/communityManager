import React, { useState } from "react";
import type { VolunteerAction, VolunteerRole, SupportRequest } from "../types/types";

interface VolunteerActionFormProps {
  requests: SupportRequest[];
  onAddAction: (action: VolunteerAction) => void;
}

const VolunteerActionForm: React.FC<VolunteerActionFormProps> = ({ requests, onAddAction }) => {
  const [formData, setFormData] = useState({
    requestId: "",
    volunteerName: "",
    role: "general" as VolunteerRole,
    note: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.requestId) {
      alert("Please select a support request to link this action to.");
      return;
    }

    const newAction: VolunteerAction = {
      id: crypto.randomUUID(),
      requestId: formData.requestId,
      volunteerName: formData.volunteerName,
      role: formData.role,
      note: formData.note,
      createdAt: new Date().toISOString(),
    };

    onAddAction(newAction);

    setFormData({
      requestId: "",
      volunteerName: "",
      role: "general",
      note: "",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 text-gray-800">
      <h2 className="text-xl font-bold mb-4">Add Volunteer Action</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Link to Support Request</label>
          <select
            name="requestId"
            value={formData.requestId}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          >
            <option value="" disabled>Select a request...</option>
            {requests.map(req => (
              <option key={req.id} value={req.id}>
                {req.title} ({req.status})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Volunteer Name</label>
            <input
              type="text"
              name="volunteerName"
              required
              value={formData.volunteerName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            >
              <option value="coordinator">Coordinator</option>
              <option value="driver">Driver</option>
              <option value="tutor">Tutor</option>
              <option value="medic">Medic</option>
              <option value="counselor">Counselor</option>
              <option value="donor">Donor</option>
              <option value="general">General</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Note</label>
          <textarea
            name="note"
            required
            value={formData.note}
            onChange={handleChange}
            placeholder="Details of the action..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Submit Volunteer Action
        </button>
      </form>
    </div>
  );
};

export default VolunteerActionForm;
