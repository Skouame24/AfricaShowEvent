"use client";

import { motion } from "framer-motion";

const ease = [0.25, 0.4, 0.25, 1] as const;

interface EditorialHeroProps {
  totalArticles: number;
}

export function EditorialHero({ totalArticles }: EditorialHeroProps) {
  return (
    <section className="relative overflow-hidden pb-6 pt-8">
      {/* Décor de fond */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-[350px] w-[350px] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute -right-32 top-10 h-[400px] w-[400px] rounded-full bg-rose-500/8 blur-[120px]" />
        <div className="absolute left-1/3 top-0 h-[250px] w-[250px] rounded-full bg-amber-500/6 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            Editorial & Media Hub
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            Histoires qui <span className="text-amber-400">inspirent</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-400 md:text-base">
            Portraits, interviews, reportages et pages Impact — le cœur éditorial
            d&apos;AfricaShowbizRoom. Des récits qui célèbrent les créatifs africains.
          </p>
          <p className="mt-3 text-xs text-neutral-600">
            {totalArticles} article{totalArticles > 1 ? "s" : ""} publiés
          </p>
        </motion.div>
      </div>
    </section>
  );
}
