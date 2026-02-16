"use client";

import { motion } from "framer-motion";

const ease = [0.25, 0.4, 0.25, 1] as const;

interface TalentHeroProps {
  query: string;
  onQueryChange: (value: string) => void;
  totalResults: number;
}

export function TalentHero({ query, onQueryChange, totalResults }: TalentHeroProps) {
  return (
    <section className="relative overflow-hidden pb-10 pt-8">
      {/* Décor de fond */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-[400px] w-[400px] rounded-full bg-purple-700/15 blur-[120px]" />
        <div className="absolute -right-32 top-0 h-[400px] w-[400px] rounded-full bg-amber-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Badge + titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            Profils Premium
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            Découvrez nos <span className="text-amber-400">talents</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-400 md:text-base">
            Une sélection éditorialisée de créatifs africains, vérifiés et mis
            en avant par l&apos;équipe AfricaShowbizRoom.
          </p>
        </motion.div>

        {/* Barre de recherche */}
        <motion.div
          className="mt-8 flex max-w-xl items-center gap-3"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
        >
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-neutral-700/60 bg-neutral-900/50 px-4 py-3 backdrop-blur-sm transition-colors focus-within:border-amber-400/40">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5 flex-shrink-0 text-neutral-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Rechercher un talent, une compétence..."
              className="w-full bg-transparent text-sm text-neutral-200 placeholder-neutral-500 outline-none"
            />
            {query && (
              <button
                onClick={() => onQueryChange("")}
                className="text-neutral-500 transition-colors hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </motion.div>

        {/* Nombre de résultats */}
        <motion.p
          className="mt-4 text-xs text-neutral-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          {totalResults} talent{totalResults > 1 ? "s" : ""} disponible{totalResults > 1 ? "s" : ""}
        </motion.p>
      </div>
    </section>
  );
}
