"use client";

import { motion } from "framer-motion";
import { articleTypes } from "@/lib/data/articles";

interface EditorialFiltersProps {
  selectedType: string;
  onTypeChange: (val: string) => void;
}

export function EditorialFilters({
  selectedType,
  onTypeChange,
}: EditorialFiltersProps) {
  return (
    <motion.div
      className="mx-auto max-w-7xl px-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {articleTypes.map((t) => (
          <button
            key={t.value}
            onClick={() => onTypeChange(t.value)}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 ${
              selectedType === t.value
                ? "bg-amber-400 text-black shadow-md shadow-amber-400/20"
                : "border border-neutral-700 text-neutral-400 hover:border-amber-400/30 hover:text-amber-400"
            }`}
          >
            {t.value !== "all" && (
              <span className={`h-1.5 w-1.5 rounded-full ${t.color}`} />
            )}
            {t.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
