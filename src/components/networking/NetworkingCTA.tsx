"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.25, 0.4, 0.25, 1] as const;

export function NetworkingCTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16 pt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="relative overflow-hidden rounded-3xl border border-amber-400/20"
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 via-neutral-900 to-purple-600/5" />
        <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-amber-400/10 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-purple-600/10 blur-[80px]" />

        <div className="relative flex flex-col items-center px-6 py-16 text-center md:px-12">
          <span className="rounded-full bg-amber-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-amber-400">
            Devenir mentor
          </span>

          <h2 className="mt-4 text-2xl font-bold text-white md:text-3xl">
            Vous êtes un professionnel confirmé ?
          </h2>

          <p className="mt-3 max-w-lg text-sm text-neutral-400">
            Rejoignez notre réseau de mentors vérifiés et accompagnez la prochaine
            génération de talents africains. Chaque mise en relation est qualifiée
            par notre équipe.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/auth/login"
              className="group relative overflow-hidden rounded-full bg-amber-400 px-8 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/20"
            >
              Devenir mentor
            </Link>
            <Link
              href="/talents"
              className="rounded-full border border-neutral-700 px-8 py-3 text-sm font-semibold text-neutral-300 transition-all duration-300 hover:border-neutral-500 hover:text-white"
            >
              Explorer les talents
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[10px] text-neutral-600">
            <span className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3.5 w-3.5 text-amber-400/60">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Profils vérifiés
            </span>
            <span className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3.5 w-3.5 text-amber-400/60">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              Échanges confidentiels
            </span>
            <span className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3.5 w-3.5 text-amber-400/60">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Validation sous 48h
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
