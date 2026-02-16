"use client";

import { motion } from "framer-motion";
import { eventTypes, eventStatuses } from "@/lib/data/events";

interface EventsFiltersProps {
  selectedType: string;
  selectedStatus: string;
  onTypeChange: (val: string) => void;
  onStatusChange: (val: string) => void;
}

export function EventsFilters({
  selectedType,
  selectedStatus,
  onTypeChange,
  onStatusChange,
}: EventsFiltersProps) {
  return (
    <motion.div
      className="mx-auto max-w-7xl px-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex flex-col gap-4 rounded-2xl border border-neutral-800/50 bg-neutral-900/30 p-5 backdrop-blur-sm md:flex-row md:items-center md:justify-between">
        {/* Status tabs */}
        <div className="flex gap-1.5">
          {eventStatuses.map((s) => (
            <button
              key={s.value}
              onClick={() => onStatusChange(s.value)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                selectedStatus === s.value
                  ? "bg-amber-400 text-black shadow-md shadow-amber-400/20"
                  : "border border-neutral-700 text-neutral-400 hover:border-amber-400/30 hover:text-amber-400"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Select type */}
        <select
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
          className="rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-2 text-xs text-neutral-300 outline-none transition-colors focus:border-amber-400/40"
        >
          {eventTypes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>
    </motion.div>
  );
}
