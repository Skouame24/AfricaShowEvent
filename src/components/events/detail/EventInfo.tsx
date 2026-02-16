"use client";

import { motion } from "framer-motion";
import type { AppEvent } from "@/lib/data/events";

interface EventInfoProps {
  event: AppEvent;
}

export function EventInfo({ event }: EventInfoProps) {
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Description */}
      <section>
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-amber-400">
          <span className="h-px w-4 bg-amber-400" />
          À propos
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-neutral-300">
          {event.description}
        </p>
      </section>

      {/* Points forts */}
      <section>
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-amber-400">
          <span className="h-px w-4 bg-amber-400" />
          Points forts
        </h2>
        <ul className="mt-4 space-y-3">
          {event.highlights.map((h, idx) => (
            <motion.li
              key={idx}
              className="flex items-start gap-3 text-sm text-neutral-300"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + idx * 0.07 }}
            >
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-400/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-3 w-3 text-amber-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              {h}
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Tags */}
      <section>
        <div className="flex flex-wrap gap-2">
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-neutral-800 bg-neutral-800/40 px-3 py-1 text-[11px] text-neutral-400"
            >
              #{tag}
            </span>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
