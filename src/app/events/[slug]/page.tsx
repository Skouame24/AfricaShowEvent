"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import Link from "next/link";
import { events } from "@/lib/data/events";
import { EventDetailHero } from "@/components/events/detail/EventDetailHero";
import { EventHeadliners } from "@/components/events/detail/EventHeadliners";
import { EventInfo } from "@/components/events/detail/EventInfo";
import { EventParticipants } from "@/components/events/detail/EventParticipants";
import { EventGallery } from "@/components/events/detail/EventGallery";
import { EventSidebar } from "@/components/events/detail/EventSidebar";

export default function EventDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const event = useMemo(
    () => events.find((e) => e.slug === slug),
    [slug]
  );

  if (!event) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-800/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-7 w-7 text-neutral-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
          </div>
          <p className="mt-4 text-lg font-medium text-neutral-400">
            Événement introuvable
          </p>
          <Link
            href="/events"
            className="mt-4 inline-block rounded-xl bg-amber-400 px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-amber-300"
          >
            Retour aux événements
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-20">
      <EventDetailHero event={event} />

      <div className="mx-auto mt-10 max-w-5xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
          {/* Colonne principale */}
          <div className="space-y-10">
            {event.headliners.length > 0 && (
              <EventHeadliners headliners={event.headliners} />
            )}
            <EventInfo event={event} />
            <EventParticipants participants={event.participants} />
            {event.gallery.length > 0 && (
              <EventGallery gallery={event.gallery} />
            )}
          </div>

          {/* Sidebar */}
          <EventSidebar event={event} />
        </div>
      </div>
    </main>
  );
}
