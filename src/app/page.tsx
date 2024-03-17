"use client";

import { Button, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import {
  EventType,
  OrgType,
  SeriesType,
  formatEventData,
  formatOrgs,
  formatSeriesData,
} from "./helpers";
import { fetchOrgs } from "./helpers/fetchOrgs";
import { fetchEvents } from "./helpers/fetchEvent";
import { fetchClasses } from "./helpers/fetchClasses";

export default function Home() {
  const [orgs, setOrgs] = useState<OrgType | null>(null);
  const [events, setEvents] = useState<EventType | SeriesType | null>(null);
  const [series, setSeries] = useState<EventType | null>(null);
  const [classes, setClasses] = useState<EventType | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);

  useEffect(() => {
    fetchOrgs(setOrgs);
  }, []);

  useEffect(() => {
    if (selectedOrg) {
      setEvents(null);
      fetchEvents(selectedOrg, setEvents);
      fetchEvents(selectedOrg, setSeries);
    }
  }, [selectedOrg]);

  useEffect(() => {
    if (selectedEvent) {
      fetchClasses(selectedEvent, setClasses);
    }
  }, [selectedEvent]);

  console.log({ events });

  const derivedEvents = formatEventData(events as EventType) as [];
  // console.log({ derivedEvents });
  // const derivedSeries = formatSeriesData(events as SeriesType) as [];

  // const mergedData = [...derivedEvents, ...derivedSeries];
  console.log({ classes });

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
              label="Series derived from 'event' data"
              placeholder="Select series A"
              value={selectedEvent}
              onChange={setSelectedEvent}
              data={derivedEvents}
              searchable
            />
            {/* <Select
              label="Series derived from 'series' data"
              placeholder="Select series B"
              value={selectedEvent}
              onChange={setSelectedEvent}
              data={formatSeriesData(events as SeriesType)}
              searchable
            /> */}
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
