"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { AppEvent } from "@/lib/data/events";
import { eventTypeConfig } from "@/lib/data/events";

const ease = [0.25, 0.4, 0.25, 1] as const;

interface EventDetailHeroProps {
  event: AppEvent;
}

export function EventDetailHero({ event }: EventDetailHeroProps) {
  const typeConf = eventTypeConfig[event.type];
  const isPast = event.status === "past";

  return (
    <section className="relative">
      {/* Couverture */}
      <div className="relative h-64 overflow-hidden md:h-80">
        <div
          className={`h-full w-full bg-gradient-to-br ${event.image} ${isPast ? "opacity-50 grayscale-[20%]" : "opacity-70"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Retour */}
        <Link
          href="/events"
          className="absolute left-6 top-6 z-10 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 text-xs text-neutral-300 backdrop-blur-md transition-colors hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Retour
        </Link>

        {/* Badge type en haut à droite */}
        <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 backdrop-blur-md">
          <span className="text-sm">{typeConf.icon}</span>
          <span className="text-xs font-semibold text-white">{typeConf.label}</span>
        </div>
      </div>

      {/* Infos superposées */}
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="-mt-24 flex flex-col gap-6 md:flex-row md:items-end md:gap-8">
          {/* Date card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease }}
            className="flex h-24 w-24 flex-col items-center justify-center rounded-2xl bg-neutral-900 ring-4 ring-black md:h-28 md:w-28"
          >
            <span className="text-3xl font-bold text-white md:text-4xl">
              {event.date.split(" ")[0]}
            </span>
            <span className="text-xs font-semibold uppercase text-amber-400">
              {event.date.split(" ")[1]}
            </span>
            <span className="text-[10px] text-neutral-500">
              {event.date.split(" ")[2]}
            </span>
          </motion.div>

          {/* Titre */}
          <motion.div
            className="flex-1 pb-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease }}
          >
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                {event.title}
              </h1>
              {event.invitationOnly && (
                <span className="flex items-center gap-1.5 rounded-full bg-amber-400/10 px-3 py-1 text-[11px] font-semibold text-amber-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
                    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                  </svg>
                  Sur invitation
                </span>
              )}
              {isPast && (
                <span className="rounded-full bg-neutral-700/60 px-3 py-1 text-[11px] font-semibold text-neutral-300">
                  Terminé
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-neutral-400">{event.subtitle}</p>
          </motion.div>
        </div>

        {/* Méta infos rapides */}
        <motion.div
          className="mt-6 flex flex-wrap gap-5 border-b border-neutral-800/60 pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {[
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              ),
              text: event.location,
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              text: event.time,
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              ),
              text: `${event.capacity} places · ${event.spotsLeft > 0 ? `${event.spotsLeft} restantes` : "Complet"}`,
            },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-neutral-400">
              <span className="text-neutral-600">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
