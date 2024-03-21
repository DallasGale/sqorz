"use client";

import { Button, MultiSelect, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import {
  ClassType,
  ClassesType,
  EventsType,
  OrgType,
  SeriesType,
  formatClassData,
  formatEventData,
  formatOrgs,
  formatSeriesData,
  formatEventGroupedData,
  consolidateGroupedData,
} from "./helpers";
import { fetchOrgs } from "./helpers/fetchOrgs";
import { fetchEvents } from "./helpers/fetchEvent";
import { fetchClasses } from "./helpers/fetchClasses";
import SeriesResults from "./components/seriesResults";

export default function Home() {
  const [orgs, setOrgs] = useState<OrgType | null>(null);
  const [events, setEvents] = useState<EventsType | SeriesType | null>(null);
  const [series, setSeries] = useState<EventsType | null>(null);
  const [classes, setClasses] = useState<ClassesType | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
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
      setClasses(null);
      fetchClasses(selectedEvent, setClasses);
    }
  }, [selectedEvent]);

  const derivedEvents = formatEventData(events as EventsType);
  const derivedEventGroups = formatEventGroupedData(events as EventsType);
  const derivedClasses = formatClassData(classes as ClassesType);
  // console.log({ derivedEvents });
  // const derivedSeries = formatSeriesData(events as SeriesType) as [];

  // const mergedData = [...derivedEvents, ...derivedSeries];
  // console.log({ events });
  // console.log({ derivedEvents });
  // console.log({ derivedEventGroups });
  const [selectedRoundResults, setSelectedRoundResults] = useState<any>(null);

  const consolidated = consolidateGroupedData(
    events as EventsType,
    selectedRoundResults
  );

  const handleSelectedRoundResults = (raceClass: string) => {
    if (derivedClasses) {
      const classResults = derivedClasses
        .filter(({ value }) => value === raceClass)
        .map((item) => {
          return item;
        });

      setSelectedRoundResults(classResults);
    }
    console.log({ consolidated });
  };

  return (
    <main>
      <section className="flex  p-4 flex-row items-center gap-4">
        <div className="flex  p-4 flex-row items-center gap-4">
          {orgs && (
            <Select
              label="Step 1: Select Org"
              value={selectedOrg}
              onChange={setSelectedOrg}
              placeholder="Select Org"
              data={formatOrgs(orgs)}
              searchable
            />
          )}
        </div>

        <div className="flex  p-4 flex-row items-center gap-4">
          {selectedOrg && events && consolidated && (
            <Select
              label="Step 2: Series derived from 'event' data"
              placeholder="Select series A"
              value={selectedEvent}
              onChange={setSelectedEvent}
              data={consolidated}
              searchable
            />
          )}
        </div>

        <div className="flex   p-4 flex-row items-center gap-4">
          {selectedEvent && derivedClasses && (
            <Select
              label="Step 3: Select class derived from 'class' data"
              placeholder="Select class"
              value={selectedClass}
              onChange={setSelectedClass}
              data={derivedClasses}
              searchable
            />
          )}
        </div>

        <div className="flex   p-4 flex-row items-center gap-4">
          {selectedClass && (
            <Button
              variant="outline"
              onClick={() => handleSelectedRoundResults(selectedClass)}
            >
              Show selected round final results
            </Button>
          )}
        </div>
      </section>
      <div className="flex p-4 flex-row items-center gap-4">
        <h2>Selected Rnd Results</h2>
        {selectedRoundResults && (
          <SeriesResults results={selectedRoundResults[0].rank} />
        )}
        {selectedEvent && <h2>{selectedEvent}</h2>}
      </div>
      <div className="flex  p-4 flex-row items-center gap-4">
        <Button variant="outline">Show current series tally</Button>
      </div>
    </main>
  );
}
