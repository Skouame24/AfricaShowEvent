"use client";

import { motion } from "framer-motion";

const ease = [0.25, 0.4, 0.25, 1] as const;

interface EventsHeroProps {
  totalEvents: number;
  upcomingCount: number;
}

export function EventsHero({ totalEvents, upcomingCount }: EventsHeroProps) {
  return (
    <section className="relative overflow-hidden pb-10 pt-8">
      {/* Décor de fond */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-10 h-[350px] w-[350px] rounded-full bg-rose-600/10 blur-[120px]" />
        <div className="absolute -right-40 -top-10 h-[400px] w-[400px] rounded-full bg-amber-500/8 blur-[120px]" />
        <div className="absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-purple-600/8 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          {/* Badge */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
              Événements & Opportunités
            </span>
            {upcomingCount > 0 && (
              <span className="flex items-center gap-1.5 rounded-full bg-amber-400/10 px-2.5 py-0.5 text-[10px] font-semibold text-amber-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
                </span>
                {upcomingCount} à venir
              </span>
            )}
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            Des rencontres <span className="text-amber-400">exclusives</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-400 md:text-base">
            Dîners, showcases, premières et workshops — des événements pensés pour
            connecter talents et marques dans des cadres d&apos;exception.
          </p>
        </motion.div>

        {/* Stats rapides */}
        <motion.div
          className="mt-8 flex flex-wrap gap-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
        >
          {[
            { value: totalEvents, label: "événements" },
            { value: upcomingCount, label: "à venir" },
            { value: "6", label: "villes" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{stat.value}</span>
              <span className="text-xs text-neutral-500">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
