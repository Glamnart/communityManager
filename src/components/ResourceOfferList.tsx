// import React, { useState } from "react";  
// import type { ResourceType } from "../types/types";
import type { ResourceOffer } from "../types/types";




interface ResourceOfferListProps {
  offers: ResourceOffer[];
  onToggleAvailability?: (id: string) => void;
}

const ResourceOfferList: React.FC<ResourceOfferListProps> = ({
  offers,
  onToggleAvailability,
}) => {
  if (offers.length === 0) {
    return <p>No resource offers available.</p>;
  }

  return (
    <div>
      {offers.map((offer) => (
        <div
          key={offer.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
          }}
        >
          <h3>{offer.title}</h3>
          <p>{offer.description}</p>

          <p>
            <strong>Type:</strong> {offer.resourceType}
          </p>
          <p>
            <strong>Offered By:</strong> {offer.offeredBy}
          </p>
          <p>
            <strong>Contact:</strong> {offer.contactMethod} -{" "}
            {offer.contactValue}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {offer.isAvailable ? "Available" : "Not Available"}
          </p>
          <p>
            <small>
              Created at: {new Date(offer.createdAt).toLocaleString()}
            </small>
          </p>

          {onToggleAvailability && (
            <button onClick={() => onToggleAvailability(offer.id)}>
              Toggle Availability
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResourceOfferList;





