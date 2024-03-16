"use client";

import { Button, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { EventType, OrgType, formatEvents, formatOrgs } from "./helpers";
import { fetchOrgs } from "./helpers/fetchOrgs";
import { fetchEvents } from "./helpers/fetchEvent";

export default function Home() {
  const [orgs, setOrgs] = useState<OrgType | null>(null);
  const [events, setEvents] = useState<EventType | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);

  useEffect(() => {
    fetchOrgs(setOrgs);
  }, []);

  useEffect(() => {
    if (selectedOrg) {
      setEvents(null);
      fetchEvents(selectedOrg, setEvents);
    }
  }, [selectedOrg]);

  console.log({ events });

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="flex  p-4 flex-row items-center gap-4">
        <p>Step 1</p>
        {orgs && (
          <Select
            value={selectedOrg}
            onChange={setSelectedOrg}
            placeholder="Select Org"
            data={formatOrgs(orgs)}
            searchable
          />
        )}
      </div>

      <div className="flex  p-4 flex-row items-center gap-4">
        {selectedOrg && events && (
          <>
            <p>Step 2</p>
            <Select
              placeholder="Select series"
              value={selectedEvent}
              onChange={setSelectedEvent}
              data={formatEvents(events)}
              searchable
            />
          </>
        )}
      </div>

      <div className="flex   p-4 flex-row items-center gap-4">
        <p>Step 3</p>
        <Select placeholder="Select class" />
      </div>
      <div className="flex p-4 flex-row items-center gap-4">
        <Button variant="outline">Show latest round results</Button>
      </div>
      <div className="flex  p-4 flex-row items-center gap-4">
        <Button variant="outline">Show combined round leaders</Button>
      </div>
    </main>
  );
}
