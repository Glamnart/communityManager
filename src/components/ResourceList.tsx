// import React, { useState } from "react";  

import type { ResourceType } from "../types/types";

type ResourceFormData = {
  name: string;
  quantity: number;
  type: ResourceType;
};

type ResourceListProps = {
  lists: ResourceFormData[];
};

const ResourceList: React.FC<ResourceListProps> = ({ lists }) => {
  return (
    <div>
      {lists.map((item) => (
        <div key={item.name} style={{ marginTop: "20px" }}>
          <h3>Submitted Resource</h3>

          <p>
            <strong>Name:</strong> {item.name}
          </p>

          <p>
            <strong>Quantity:</strong> {item.quantity}
          </p>

          <p>
            <strong>Type:</strong> {item.type}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ResourceList;