"use client";

import { motion } from "framer-motion";

const ease = [0.25, 0.4, 0.25, 1] as const;

export function NetworkingHero() {
  return (
    <section className="relative overflow-hidden pb-6 pt-8">
      {/* Décor */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-[400px] w-[400px] rounded-full bg-amber-500/10 blur-[120px]" />
        <div className="absolute -right-32 top-10 h-[350px] w-[350px] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-emerald-500/6 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
              Networking & Mentorat
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Qualifié & Vérifié
            </span>
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            Connectez-vous avec les <span className="text-amber-400">meilleurs mentors</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-400 md:text-base">
            Des mises en relation vérifiées et validées par notre équipe. Pas de spam,
            pas d&apos;algorithmes — juste des connexions humaines de qualité entre
            talents émergents et professionnels confirmés.
          </p>
        </motion.div>

        {/* 3 metrics */}
        <motion.div
          className="mt-8 flex flex-wrap gap-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
        >
          {[
            { value: "95%", label: "taux de réponse", icon: "💬" },
            { value: "48h", label: "délai de validation", icon: "⚡" },
            { value: "100%", label: "connexions vérifiées", icon: "🛡️" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span className="text-xl">{stat.icon}</span>
              <div>
                <span className="text-xl font-bold text-white">{stat.value}</span>
                <p className="text-[11px] text-neutral-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
