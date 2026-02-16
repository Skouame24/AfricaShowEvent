"use client";

import { mentorDomains } from "@/lib/data/mentors";

interface MentorFiltersProps {
  selectedDomain: string;
  onDomainChange: (domain: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

const statuses = [
  { value: "all", label: "Tous" },
  { value: "available", label: "Disponibles" },
  { value: "limited", label: "Places limitées" },
];

export function MentorFilters({
  selectedDomain,
  onDomainChange,
  selectedStatus,
  onStatusChange,
}: MentorFiltersProps) {
  return (
    <div className="mx-auto max-w-7xl px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Status pills */}
        <div className="flex flex-wrap gap-2">
          {statuses.map((s) => (
            <button
              key={s.value}
              onClick={() => onStatusChange(s.value)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${
                selectedStatus === s.value
                  ? "bg-amber-400 text-black shadow-lg shadow-amber-400/20"
                  : "border border-neutral-800 bg-transparent text-neutral-400 hover:border-amber-400/40 hover:text-amber-400"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Domain select */}
        <select
          value={selectedDomain}
          onChange={(e) => onDomainChange(e.target.value)}
          className="rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-2 text-xs text-neutral-400 outline-none transition-colors duration-300 hover:border-neutral-700 focus:border-amber-400/40"
        >
          {mentorDomains.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
