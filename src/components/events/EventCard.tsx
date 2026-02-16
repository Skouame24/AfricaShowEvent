"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { AppEvent } from "@/lib/data/events";
import { eventTypeConfig } from "@/lib/data/events";

interface EventCardProps {
  event: AppEvent;
}

export function EventCard({ event }: EventCardProps) {
  const typeConf = eventTypeConfig[event.type];
  const isPast = event.status === "past";
  const almostFull = event.spotsLeft > 0 && event.spotsLeft <= 10;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <Link
        href={`/events/${event.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-800/60 bg-neutral-900/40 transition-colors duration-500 hover:border-neutral-700 hover:bg-neutral-900/80"
      >
        {/* Cover */}
        <div className="relative h-48 overflow-hidden">
          <div
            className={`h-full w-full bg-gradient-to-br ${event.image} transition-transform duration-700 group-hover:scale-110 ${isPast ? "opacity-60 grayscale-[30%]" : ""}`}
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-neutral-900 to-transparent" />

          {/* Date flottante */}
          <div className="absolute left-3 top-3 flex flex-col items-center rounded-xl bg-black/70 px-3 py-2 backdrop-blur-md">
            <span className="text-lg font-bold leading-none text-white">
              {event.date.split(" ")[0]}
            </span>
            <span className="mt-0.5 text-[10px] font-semibold uppercase text-amber-400">
              {event.date.split(" ")[1]}
            </span>
          </div>

          {/* Badge type */}
          <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 backdrop-blur-md">
            <span className="text-xs">{typeConf.icon}</span>
            <span className="text-[10px] font-semibold text-white">
              {typeConf.label}
            </span>
          </div>

          {/* Badge invitation */}
          {event.invitationOnly && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-amber-400/90 px-2.5 py-1 text-[10px] font-bold text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-3 w-3"
              >
                <path
                  fillRule="evenodd"
                  d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                  clipRule="evenodd"
                />
              </svg>
              Sur invitation
            </div>
          )}

          {/* Badge passé */}
          {isPast && (
            <div className="absolute bottom-3 right-3 rounded-full bg-neutral-600/80 px-2.5 py-1 text-[10px] font-semibold text-neutral-200 backdrop-blur-sm">
              Terminé
            </div>
          )}

          {/* Alerte places limitées */}
          {almostFull && !isPast && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-red-500/90 px-2.5 py-1 text-[10px] font-bold text-white">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              {event.spotsLeft} place{event.spotsLeft > 1 ? "s" : ""} restante{event.spotsLeft > 1 ? "s" : ""}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-sm font-semibold text-white transition-colors group-hover:text-amber-400">
            {event.title}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-neutral-500 line-clamp-2">
            {event.subtitle}
          </p>

          {/* Têtes d'affiche */}
          {event.headliners.length > 0 && (
            <div className="mt-3 rounded-xl border border-amber-400/10 bg-amber-400/5 px-3 py-2.5">
              <p className="mb-2 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-amber-400/80">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                Têtes d&apos;affiche
              </p>
              <div className="flex flex-col gap-2">
                {event.headliners.slice(0, 3).map((star, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div
                      className={`h-8 w-8 flex-shrink-0 rounded-lg bg-gradient-to-br ${star.avatar} ring-1 ring-amber-400/20`}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-white">
                        {star.name}
                      </p>
                      <p className="truncate text-[10px] text-neutral-500">
                        {star.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lieu & heure */}
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-3 w-3 flex-shrink-0"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              {event.location}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-3 w-3 flex-shrink-0"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {event.time}
            </div>
          </div>

          {/* Participants preview */}
          <div className="mt-auto pt-4">
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {event.participants.slice(0, 4).map((p, idx) => (
                  <div
                    key={idx}
                    className={`h-7 w-7 rounded-full bg-gradient-to-br ${p.avatar} ring-2 ring-neutral-900`}
                    title={p.name}
                  />
                ))}
                {event.participants.length > 4 && (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-800 text-[9px] font-semibold text-neutral-400 ring-2 ring-neutral-900">
                    +{event.participants.length - 4}
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex gap-1">
                {event.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-neutral-800 bg-neutral-800/40 px-2 py-0.5 text-[9px] text-neutral-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
