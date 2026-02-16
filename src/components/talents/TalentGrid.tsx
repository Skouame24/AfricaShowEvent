"use client";

import { motion, AnimatePresence } from "framer-motion";
import { TalentCard } from "./TalentCard";
import type { Talent } from "@/lib/data/talents";

interface TalentGridProps {
  talents: Talent[];
}

export function TalentGrid({ talents }: TalentGridProps) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <AnimatePresence mode="wait">
        {talents.length === 0 ? (
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
                  d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                />
              </svg>
            </div>
            <p className="mt-4 text-sm font-medium text-neutral-400">
              Aucun talent ne correspond à vos critères
            </p>
            <p className="mt-1 text-xs text-neutral-600">
              Essayez de modifier vos filtres ou votre recherche
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.08 },
              },
            }}
          >
            {talents.map((talent) => (
              <motion.div
                key={talent.slug}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                layout
              >
                <TalentCard talent={talent} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
