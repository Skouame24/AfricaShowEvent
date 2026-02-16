"use client";

import { motion } from "framer-motion";
import type { Mentor } from "@/lib/data/mentors";
import { MentorCard } from "./MentorCard";

interface MentorGridProps {
  mentors: Mentor[];
  onRequestConnection: (mentor: Mentor) => void;
}

const ease = [0.25, 0.4, 0.25, 1] as const;

export function MentorGrid({ mentors, onRequestConnection }: MentorGridProps) {
  if (mentors.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-800/30 bg-neutral-900/20 py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-800/30">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="h-8 w-8 text-neutral-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
          </div>
          <p className="mt-4 text-sm font-medium text-neutral-400">
            Aucun mentor trouvé avec ces critères
          </p>
          <p className="mt-1 text-xs text-neutral-600">
            Ajustez vos filtres pour voir plus de résultats
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mentors.map((mentor, idx) => (
          <motion.div
            key={mentor.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.08, ease }}
          >
            <MentorCard mentor={mentor} onRequestConnection={onRequestConnection} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
