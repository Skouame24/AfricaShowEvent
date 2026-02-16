"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const quickTags = [
  "Musiciens",
  "Mannequins",
  "Influenceurs",
  "Réalisateurs",
  "Danseurs",
  "Producteurs",
];

const ease = [0.25, 0.4, 0.25, 1] as const;

export function HeroSection() {
  const [query, setQuery] = useState("");

  return (
    <section className="relative flex min-h-[94vh] flex-col items-center justify-center overflow-hidden">
      {/* ---- Background scène concert ---- */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease }}
      >
        <div className="absolute -left-40 top-0 h-[700px] w-[600px] rounded-full bg-purple-700/25 blur-[140px]" />
        <div className="absolute left-1/2 top-[10%] h-[500px] w-[350px] -translate-x-1/2 bg-amber-500/15 blur-[120px]" />
        <div className="absolute -right-40 top-0 h-[700px] w-[600px] rounded-full bg-purple-700/25 blur-[140px]" />
        <div className="absolute left-1/2 top-0 h-[300px] w-[2px] -translate-x-1/2 bg-gradient-to-b from-amber-400/50 to-transparent" />
        <div className="absolute left-[20%] top-0 h-[400px] w-[1px] origin-top rotate-[15deg] bg-gradient-to-b from-purple-400/20 to-transparent" />
        <div className="absolute right-[20%] top-0 h-[400px] w-[1px] origin-top -rotate-[15deg] bg-gradient-to-b from-purple-400/20 to-transparent" />
        {/* Particules animées */}
        {[
          { left: "12%", top: "8%", size: "1.5", color: "amber-300/50", delay: 0 },
          { left: "85%", top: "6%", size: "1", color: "purple-300/40", delay: 0.5 },
          { left: "55%", top: "12%", size: "1", color: "amber-200/30", delay: 1 },
          { left: "30%", top: "18%", size: "1", color: "purple-400/30", delay: 1.5 },
          { left: "92%", top: "15%", size: "1.5", color: "amber-400/40", delay: 0.8 },
          { left: "8%", top: "25%", size: "1", color: "amber-300/25", delay: 1.2 },
          { left: "70%", top: "22%", size: "1", color: "purple-300/25", delay: 0.3 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className={`absolute h-${p.size} w-${p.size} rounded-full bg-${p.color}`}
            style={{ left: p.left, top: p.top }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: [0, 1.2, 1] }}
            transition={{ duration: 0.8, delay: 0.6 + p.delay, ease }}
          />
        ))}
      </motion.div>

      {/* ---- Contenu ---- */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Badge */}
        <motion.div
          className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/5 px-5 py-2.5 backdrop-blur-sm"
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            L&apos;écosystème #1 du Showbiz Africain
          </span>
        </motion.div>

        {/* Titre — chaque ligne arrive en cascade */}
        <motion.h1
          className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease }}
          >
            Connectez-vous aux
          </motion.span>
          <br />
          <motion.span
            className="inline-block bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
          >
            Talents &amp; Marques
          </motion.span>
          <br />
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease }}
          >
            d&apos;Afrique
          </motion.span>
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease }}
        >
          La plateforme premium qui connecte artistes, mannequins, influenceurs
          et créatifs africains avec les opportunités mondiales et les grandes
          marques.
        </motion.p>

        {/* Barre de recherche */}
        <motion.div
          className="mx-auto mt-10 flex max-w-xl items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease }}
        >
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-neutral-700/60 bg-neutral-900/50 px-4 py-3.5 backdrop-blur-sm transition-colors focus-within:border-amber-400/40">
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
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher talents, marques, projets..."
              className="w-full bg-transparent text-sm text-neutral-200 placeholder-neutral-500 outline-none"
            />
          </div>
          <motion.button
            className="flex-shrink-0 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-3.5 text-sm font-semibold text-black"
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(245,158,11,0.3)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            Rechercher
          </motion.button>
        </motion.div>

        {/* Tags rapides */}
        <motion.div
          className="mt-6 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          {quickTags.map((tag, i) => (
            <motion.button
              key={tag}
              onClick={() => setQuery(tag)}
              className="rounded-full border border-neutral-800 bg-white/[0.02] px-3.5 py-1.5 text-xs text-neutral-500 transition-all hover:border-amber-400/30 hover:bg-amber-400/5 hover:text-amber-400"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 1.3 + i * 0.06, ease }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              {tag}
            </motion.button>
          ))}
        </motion.div>

        {/* Trusted */}
        <motion.p
          className="mt-16 text-[11px] font-medium uppercase tracking-[0.3em] text-neutral-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          Approuvé par des marques internationales
        </motion.p>
      </div>
    </section>
  );
}
