"use client";

import { motion } from "framer-motion";

const brands = [
  "Universal Music Africa",
  "Canal+",
  "Orange",
  "MTV Base",
  "Trace TV",
  "Coca-Cola Africa",
  "Nike Africa",
  "YouTube Music",
];

export function TrustedBrands() {
  return (
    <motion.section
      className="relative border-y border-neutral-800/50 bg-neutral-950/50 py-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="overflow-hidden">
        <div className="flex animate-[scroll_25s_linear_infinite] items-center gap-16 whitespace-nowrap">
          {[...brands, ...brands].map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="flex-shrink-0 text-sm font-medium tracking-wider text-neutral-600 transition-colors hover:text-neutral-400"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-neutral-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-neutral-950 to-transparent" />
    </motion.section>
  );
}
