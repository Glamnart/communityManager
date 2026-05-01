import React, { useEffect, useState } from "react";
import DashboardSummary from "./components/DashboardSummary";
import { RequestList } from "./components/RequestList";
import ResourceOfferForm from "./components/ResourceOfferForm";
import ResourceOfferList from "./components/ResourceOfferList";
import VolunteerActionForm from "./components/VolunteerActionForm";
import Header from "./components/Header";
import type {
  ResourceOffer,
  SupportRequest,
  VolunteerAction,
} from "./types/types";
import { RequestsSampleData } from "./data/sample.js";
import {
  loadRequests,
  loadResourceOffers,
  loadVolunteerActions,
  saveRequests,
  saveResourceOffers,
  saveVolunteerActions,
} from "./utils/storage";
import "./App.css";

const App: React.FC = () => {
  const [requests, setRequests] = useState<SupportRequest[]>(() =>
    loadRequests([...RequestsSampleData])
  );
  const [resourceOffers, setResourceOffers] = useState<ResourceOffer[]>(() =>
    loadResourceOffers([])
  );
  const [volunteerActions, setVolunteerActions] = useState<VolunteerAction[]>(() =>
    loadVolunteerActions([])
  );

  useEffect(() => {
    saveRequests(requests);
  }, [requests]);

  useEffect(() => {
    saveResourceOffers(resourceOffers);
  }, [resourceOffers]);

  useEffect(() => {
    saveVolunteerActions(volunteerActions);
  }, [volunteerActions]);

  const handleAddOffer = (offer: ResourceOffer): void => {
    setResourceOffers((currentOffers) => [offer, ...currentOffers]);
  };

  const handleToggleAvailability = (id: string): void => {
    setResourceOffers((currentOffers) =>
      currentOffers.map((offer) =>
        offer.id === id
          ? { ...offer, isAvailable: !offer.isAvailable }
          : offer
      )
    );
  };

  const handleAddVolunteerAction = (action: VolunteerAction): void => {
    setVolunteerActions((currentActions) => [action, ...currentActions]);
  };

  return (
    <div style={{ padding: "24px" }}>
      <Header />
      <DashboardSummary requests={requests} />
      <RequestList
        requests={requests}
        setRequests={setRequests}
      />
      <div style={{ marginTop: "32px" }}>
        <ResourceOfferForm onAdd={handleAddOffer} />
        <ResourceOfferList
          offers={resourceOffers}
          onToggleAvailability={handleToggleAvailability}
        />
      </div>
      <div style={{ marginTop: "32px" }}>
        <VolunteerActionForm
          requests={requests}
          onAddAction={handleAddVolunteerAction}
        />
        <p style={{ textAlign: "left" }}>
          Volunteer actions recorded: {volunteerActions.length}
        </p>
      </div>
    </div>
  );
};

export default App;
