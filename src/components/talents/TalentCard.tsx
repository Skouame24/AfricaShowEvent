"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Talent } from "@/lib/data/talents";

interface TalentCardProps {
  talent: Talent;
}

export function TalentCard({ talent }: TalentCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <Link
        href={`/talents/${talent.slug}`}
        className="group relative block overflow-hidden rounded-2xl border border-neutral-800/60 bg-neutral-900/40 transition-colors duration-500 hover:border-neutral-700 hover:bg-neutral-900/80"
      >
        {/* Image de profil */}
        <div className="relative h-56 overflow-hidden">
          <div
            className={`h-full w-full bg-gradient-to-br ${talent.image} transition-transform duration-700 group-hover:scale-110`}
          />
          {/* Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-neutral-900 to-transparent" />

          {/* Badge Curated */}
          {talent.curated && (
            <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span className="text-[10px] font-semibold text-amber-400">
                Curated
              </span>
            </div>
          )}

          {/* Badge Vérifié */}
          {talent.verified && (
            <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 backdrop-blur-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-3 w-3 text-blue-400"
              >
                <path
                  fillRule="evenodd"
                  d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.307 4.491 4.491 0 01-1.307-3.497A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}

          {/* Bouton contact flottant */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-amber-400/90 px-3 py-1.5 text-[11px] font-semibold text-black opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-3 w-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            Contacter
          </div>

          {/* Catégorie en bas à gauche */}
          <span className="absolute bottom-3 left-3 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-medium text-neutral-300 backdrop-blur-md">
            {talent.category}
          </span>
        </div>

        {/* Infos */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-white transition-colors group-hover:text-amber-400">
            {talent.name}
          </h3>
          <p className="mt-0.5 text-xs text-neutral-400">{talent.role}</p>

          {/* Localisation */}
          <div className="mt-2 flex items-center gap-1 text-[11px] text-neutral-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-3 w-3"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {talent.location}
          </div>

          {/* Compétences */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {talent.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-neutral-800 bg-neutral-800/40 px-2 py-0.5 text-[10px] text-neutral-400"
              >
                {skill}
              </span>
            ))}
            {talent.skills.length > 3 && (
              <span className="rounded-full border border-neutral-800 bg-neutral-800/40 px-2 py-0.5 text-[10px] text-neutral-500">
                +{talent.skills.length - 3}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
