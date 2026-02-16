"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Talent } from "@/lib/data/talents";

const ease = [0.25, 0.4, 0.25, 1] as const;

interface ProfileHeroProps {
  talent: Talent;
}

export function ProfileHero({ talent }: ProfileHeroProps) {
  return (
    <section className="relative">
      {/* Couverture */}
      <div className="relative h-52 overflow-hidden md:h-72">
        <div
          className={`h-full w-full bg-gradient-to-br ${talent.image} opacity-60`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Retour */}
        <Link
          href="/talents"
          className="absolute left-6 top-6 z-10 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 text-xs text-neutral-300 backdrop-blur-md transition-colors hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-3.5 w-3.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Retour
        </Link>
      </div>

      {/* Profil info superposé */}
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="-mt-20 flex flex-col items-start gap-5 md:flex-row md:items-end md:gap-6">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease }}
            className="relative"
          >
            <div
              className={`h-32 w-32 rounded-2xl bg-gradient-to-br ${talent.avatar} ring-4 ring-black md:h-36 md:w-36`}
            />
            {talent.verified && (
              <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-black ring-2 ring-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 text-blue-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.307 4.491 4.491 0 01-1.307-3.497A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </motion.div>

          {/* Nom + Rôle */}
          <motion.div
            className="flex-1 pb-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease }}
          >
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-white md:text-3xl">
                {talent.name}
              </h1>
              {talent.curated && (
                <span className="flex items-center gap-1.5 rounded-full bg-amber-400/10 px-3 py-1 text-[11px] font-semibold text-amber-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  Curated by AfricaShowbizRoom
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-neutral-400">{talent.role}</p>
            <div className="mt-2 flex items-center gap-1 text-xs text-neutral-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-3.5 w-3.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              {talent.location}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="flex gap-3 pb-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
          >
            <button className="flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              Contact via ASR
            </button>
            <button className="rounded-xl border border-neutral-700 px-4 py-2.5 text-sm text-neutral-300 transition-all duration-300 hover:border-neutral-500 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                />
              </svg>
            </button>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="mt-6 flex gap-6 border-b border-neutral-800/60 pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {talent.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-lg font-bold text-white md:text-xl">{stat.value}</p>
              <p className="text-[11px] text-neutral-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
