"use client";

import { motion } from "framer-motion";
import { talentCategories, talentLocations } from "@/lib/data/talents";

interface TalentFiltersProps {
  selectedCategory: string;
  selectedLocation: string;
  onCategoryChange: (cat: string) => void;
  onLocationChange: (loc: string) => void;
}

export function TalentFilters({
  selectedCategory,
  selectedLocation,
  onCategoryChange,
  onLocationChange,
}: TalentFiltersProps) {
  return (
    <motion.div
      className="mx-auto max-w-7xl px-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex flex-col gap-4 rounded-2xl border border-neutral-800/50 bg-neutral-900/30 p-5 backdrop-blur-sm md:flex-row md:items-center md:justify-between">
        {/* Catégories (pills) */}
        <div className="flex flex-wrap gap-2">
          {talentCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-amber-400 text-black shadow-md shadow-amber-400/20"
                  : "border border-neutral-700 text-neutral-400 hover:border-amber-400/30 hover:text-amber-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Select localisation */}
        <div className="flex-shrink-0">
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-2 text-xs text-neutral-300 outline-none transition-colors focus:border-amber-400/40"
          >
            {talentLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>
    </motion.div>
  );
}
