"use client";

import { motion } from "framer-motion";
import { TalentCard } from "../TalentCard";
import type { Talent } from "@/lib/data/talents";

interface SimilarTalentsProps {
  talents: Talent[];
}

export function SimilarTalents({ talents }: SimilarTalentsProps) {
  if (talents.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="mt-16 border-t border-neutral-800/40 pt-12"
    >
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-amber-400">
          <span className="h-px w-4 bg-amber-400" />
          Talents similaires
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {talents.slice(0, 3).map((talent) => (
            <TalentCard key={talent.slug} talent={talent} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
