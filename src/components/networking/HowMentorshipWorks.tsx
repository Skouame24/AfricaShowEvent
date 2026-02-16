"use client";

import { motion } from "framer-motion";
import { connectionSteps } from "@/lib/data/mentors";

const ease = [0.25, 0.4, 0.25, 1] as const;

const stepIcons: Record<string, React.ReactNode> = {
  search: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  ),
  send: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
  ),
  shield: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  chat: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
    </svg>
  ),
};

export function HowMentorshipWorks() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="text-center"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
          Comment ça marche
        </span>
        <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
          Un processus de mise en relation <span className="text-amber-400">qualifié</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-400">
          Chaque connexion est vérifiée et validée par notre équipe pour garantir des
          échanges pertinents et respectueux.
        </p>
      </motion.div>

      <div className="relative mt-12 grid gap-6 md:grid-cols-4">
        {/* Ligne de connexion entre les étapes (desktop) */}
        <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent md:block" />

        {connectionSteps.map((step, idx) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + idx * 0.1, ease }}
            className="group relative"
          >
            <div className="flex h-full flex-col items-center rounded-2xl border border-neutral-800/50 bg-neutral-900/30 p-6 text-center transition-all duration-500 hover:border-amber-400/20 hover:bg-neutral-900/60">
              {/* Numéro */}
              <div className="absolute -top-3 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-bold text-neutral-600 ring-1 ring-neutral-800">
                {step.step}
              </div>

              {/* Icône */}
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
              >
                {stepIcons[step.icon]}
              </div>

              <h3 className="mt-4 text-sm font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-neutral-500">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
