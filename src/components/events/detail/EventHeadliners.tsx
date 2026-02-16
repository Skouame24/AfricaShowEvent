"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { EventHeadliner } from "@/lib/data/events";

const ease = [0.25, 0.4, 0.25, 1] as const;

interface EventHeadlinersProps {
  headliners: EventHeadliner[];
}

export function EventHeadliners({ headliners }: EventHeadlinersProps) {
  if (headliners.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-amber-400">
        <span className="h-px w-4 bg-amber-400" />
        Têtes d&apos;affiche
        <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400/10 text-[10px]">
          ⭐
        </span>
      </h2>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {headliners.map((star, idx) => {
          const Wrapper = star.talentSlug ? Link : "div";
          const wrapperProps = star.talentSlug
            ? { href: `/talents/${star.talentSlug}` }
            : {};

          return (
            <motion.div
              key={star.name}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 + idx * 0.1, ease }}
            >
              {/* @ts-expect-error dynamic wrapper */}
              <Wrapper
                {...wrapperProps}
                className="group relative block overflow-hidden rounded-2xl border border-neutral-800/60 bg-neutral-900/40 transition-all duration-500 hover:border-amber-400/30 hover:shadow-lg hover:shadow-amber-400/5"
              >
                {/* Cover image */}
                <div className="relative h-40 overflow-hidden">
                  <div
                    className={`h-full w-full bg-gradient-to-br ${star.coverImage} transition-transform duration-700 group-hover:scale-110`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />

                  {/* Star badge */}
                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-amber-400/90 px-2 py-0.5 text-[10px] font-bold text-black shadow-lg shadow-amber-400/20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-3 w-3"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Tête d&apos;affiche
                  </div>

                  {/* Avatar flottant en bas à gauche */}
                  <div className="absolute -bottom-6 left-4">
                    <div
                      className={`h-14 w-14 rounded-xl bg-gradient-to-br ${star.avatar} ring-4 ring-neutral-900 transition-transform duration-300 group-hover:scale-105`}
                    />
                  </div>
                </div>

                {/* Infos */}
                <div className="px-4 pb-4 pt-8">
                  <h3 className="text-base font-bold text-white transition-colors group-hover:text-amber-400">
                    {star.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-neutral-400">{star.title}</p>

                  {star.socials && (
                    <p className="mt-2 text-[11px] text-neutral-600">{star.socials}</p>
                  )}

                  {/* Indicateur profil lié */}
                  {star.talentSlug && (
                    <div className="mt-3 flex items-center gap-1.5 text-[10px] font-medium text-amber-400/70 transition-colors group-hover:text-amber-400">
                      <span className="h-1 w-1 rounded-full bg-amber-400" />
                      Voir le profil complet
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </div>
                  )}
                </div>
              </Wrapper>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
