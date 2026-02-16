"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimateIn, Stagger, StaggerItem, fadeUp } from "@/components/ui/AnimateIn";

const events = [
  {
    title: "AfricaShowbiz Networking Dinner",
    date: "28 Mars 2026",
    time: "19h00",
    location: "Hôtel Sofitel, Abidjan",
    type: "Dîner privé",
    spots: "30 places",
    gradient: "from-amber-600 to-orange-800",
    exclusive: true,
  },
  {
    title: "Creative Showcase — Saison 3",
    date: "15 Avril 2026",
    time: "18h00",
    location: "The Eko Hotel, Lagos",
    type: "Showcase",
    spots: "120 places",
    gradient: "from-purple-600 to-indigo-800",
    exclusive: false,
  },
  {
    title: "Rencontre Marques × Talents : Mode & Beauté",
    date: "5 Mai 2026",
    time: "14h00",
    location: "Radisson Blu, Dakar",
    type: "Rencontre B2B",
    spots: "50 places",
    gradient: "from-emerald-600 to-teal-800",
    exclusive: true,
  },
];

export function UpcomingEvents() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      {/* En-tête */}
      <AnimateIn>
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            Événements &amp; Opportunités
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Prochains événements
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-neutral-400">
            Des rencontres exclusives sur invitation, pensées pour connecter
            talents et marques dans des cadres d&apos;exception.
          </p>
        </div>
        <Link
          href="/events"
          className="group flex items-center gap-2 text-sm font-medium text-amber-400 transition-colors hover:text-amber-300"
        >
          Tous les événements
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </Link>
      </div>
      </AnimateIn>

      {/* Grille événements */}
      <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
        {events.map((event) => (
          <StaggerItem key={event.title} variants={fadeUp}>
          <motion.div
            className="group relative overflow-hidden rounded-2xl border border-neutral-800/50 bg-neutral-900/30 transition-all duration-500 hover:border-neutral-700 hover:shadow-2xl hover:shadow-amber-900/10"
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
          >
            {/* Image header de l'événement */}
            <div className="relative h-40 overflow-hidden">
              <div
                className={`h-full w-full bg-gradient-to-br ${event.gradient} transition-transform duration-700 group-hover:scale-110`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent" />

              {/* Badge exclusif */}
              {event.exclusive && (
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 backdrop-blur-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-3 w-3 text-amber-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                  <span className="text-[10px] font-semibold text-amber-400">
                    Sur invitation
                  </span>
                </div>
              )}

              {/* Date flottante */}
              <div className="absolute bottom-3 left-3 rounded-xl bg-black/60 px-3 py-2 text-center backdrop-blur-md">
                <p className="text-[10px] font-bold uppercase text-amber-400">
                  {event.date.split(" ")[1]}
                </p>
                <p className="text-lg font-black leading-none text-white">
                  {event.date.split(" ")[0]}
                </p>
              </div>
            </div>

            {/* Infos */}
            <div className="p-5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400/70">
                {event.type}
              </span>
              <h3 className="mt-1 text-sm font-bold leading-snug text-white">
                {event.title}
              </h3>

              <div className="mt-4 space-y-2">
                {/* Heure */}
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-3.5 w-3.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {event.time}
                </div>
                {/* Lieu */}
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-3.5 w-3.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  {event.location}
                </div>
                {/* Places */}
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-3.5 w-3.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                    />
                  </svg>
                  {event.spots}
                </div>
              </div>

              {/* CTA */}
              <button className="mt-5 w-full rounded-xl border border-neutral-700 bg-neutral-800/40 py-2.5 text-xs font-semibold text-neutral-300 transition-all hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-amber-400">
                Demander une invitation
              </button>
            </div>
          </motion.div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
