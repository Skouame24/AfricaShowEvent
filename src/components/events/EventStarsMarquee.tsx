"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { AppEvent, EventHeadliner } from "@/lib/data/events";

interface EventStarsMarqueeProps {
  events: AppEvent[];
}

interface StarWithEvent extends EventHeadliner {
  eventTitle: string;
  eventSlug: string;
}

export function EventStarsMarquee({ events }: EventStarsMarqueeProps) {
  // Récupérer toutes les stars uniques des événements à venir
  const allStars: StarWithEvent[] = [];
  const seenNames = new Set<string>();

  events
    .filter((e) => e.status === "upcoming")
    .forEach((e) => {
      e.headliners.forEach((h) => {
        if (!seenNames.has(h.name)) {
          seenNames.add(h.name);
          allStars.push({ ...h, eventTitle: e.title, eventSlug: e.slug });
        }
      });
    });

  if (allStars.length === 0) return null;

  return (
    <motion.section
      className="mx-auto max-w-7xl px-6 pb-4"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
    >
      <div className="overflow-hidden rounded-2xl border border-amber-400/10 bg-gradient-to-r from-amber-400/5 via-neutral-900/50 to-amber-400/5 p-5">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            Stars attendues aux prochains événements
          </h2>
          <span className="text-[10px] text-neutral-600">
            {allStars.length} artiste{allStars.length > 1 ? "s" : ""}
          </span>
        </div>

        {/* Scroll horizontal des stars */}
        <div className="mt-4 flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {allStars.map((star, idx) => (
            <motion.div
              key={star.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 + idx * 0.07 }}
              className="flex-shrink-0"
            >
              <Link
                href={star.talentSlug ? `/talents/${star.talentSlug}` : `/events/${star.eventSlug}`}
                className="group flex w-36 flex-col items-center gap-3 rounded-xl border border-neutral-800/40 bg-neutral-900/40 p-4 transition-all duration-300 hover:border-amber-400/20 hover:bg-neutral-900/80"
              >
                {/* Avatar */}
                <div className="relative">
                  <div
                    className={`h-16 w-16 rounded-full bg-gradient-to-br ${star.avatar} ring-2 ring-amber-400/20 transition-all duration-300 group-hover:ring-amber-400/50 group-hover:shadow-lg group-hover:shadow-amber-400/10`}
                  />
                  <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[8px] shadow-lg shadow-amber-400/30">
                    ⭐
                  </div>
                </div>

                {/* Nom */}
                <div className="w-full text-center">
                  <p className="truncate text-xs font-semibold text-white transition-colors group-hover:text-amber-400">
                    {star.name}
                  </p>
                  <p className="mt-0.5 truncate text-[10px] text-neutral-500">
                    {star.title}
                  </p>
                  <p className="mt-1.5 truncate rounded-full bg-neutral-800/60 px-2 py-0.5 text-[9px] text-neutral-400">
                    {star.eventTitle}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
