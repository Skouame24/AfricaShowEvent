"use client";

import { useMemo, useState } from "react";
import { events } from "@/lib/data/events";
import { EventsHero } from "@/components/events/EventsHero";
import { EventStarsMarquee } from "@/components/events/EventStarsMarquee";
import { EventsFilters } from "@/components/events/EventsFilters";
import { EventsGrid } from "@/components/events/EventsGrid";

export default function EventsPage() {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filtered = useMemo(() => {
    return events.filter((e) => {
      if (selectedType !== "all" && e.type !== selectedType) return false;
      if (selectedStatus !== "all" && e.status !== selectedStatus) return false;
      return true;
    });
  }, [selectedType, selectedStatus]);

  const upcomingCount = events.filter((e) => e.status === "upcoming").length;

  return (
    <main className="min-h-screen">
      <EventsHero totalEvents={events.length} upcomingCount={upcomingCount} />
      <EventStarsMarquee events={events} />
      <EventsFilters
        selectedType={selectedType}
        selectedStatus={selectedStatus}
        onTypeChange={setSelectedType}
        onStatusChange={setSelectedStatus}
      />
      <EventsGrid events={filtered} />
    </main>
  );
}
