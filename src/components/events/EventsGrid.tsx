"use client";

import { motion, AnimatePresence } from "framer-motion";
import { EventCard } from "./EventCard";
import type { AppEvent } from "@/lib/data/events";

interface EventsGridProps {
  events: AppEvent[];
}

export function EventsGrid({ events }: EventsGridProps) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <AnimatePresence mode="wait">
        {events.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-800/50">
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
            <p className="mt-4 text-sm font-medium text-neutral-400">
              Aucun événement ne correspond à vos critères
            </p>
            <p className="mt-1 text-xs text-neutral-600">
              Essayez de modifier vos filtres
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {events.map((event) => (
              <motion.div
                key={event.slug}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                layout
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
