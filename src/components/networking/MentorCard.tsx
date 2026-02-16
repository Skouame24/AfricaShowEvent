"use client";

import { motion } from "framer-motion";
import type { Mentor } from "@/lib/data/mentors";

interface MentorCardProps {
  mentor: Mentor;
  onRequestConnection: (mentor: Mentor) => void;
}

export function MentorCard({ mentor, onRequestConnection }: MentorCardProps) {
  const isFull = mentor.status === "full";
  const isLimited = mentor.status === "limited";

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-800/60 bg-neutral-900/40 transition-colors duration-500 hover:border-neutral-700 hover:bg-neutral-900/80"
    >
      {/* Cover + Avatar */}
      <div className="relative h-32 overflow-hidden">
        <div
          className={`h-full w-full bg-gradient-to-br ${mentor.coverImage} transition-transform duration-700 group-hover:scale-110`}
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-neutral-900 to-transparent" />

        {/* Status badge */}
        <div className="absolute right-3 top-3">
          <span
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold backdrop-blur-md ${
              isFull
                ? "bg-neutral-700/80 text-neutral-400"
                : isLimited
                  ? "bg-red-500/20 text-red-400"
                  : "bg-emerald-500/20 text-emerald-400"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isFull
                  ? "bg-neutral-500"
                  : isLimited
                    ? "bg-red-400"
                    : "bg-emerald-400"
              }`}
            />
            {isFull ? "Complet" : isLimited ? `${mentor.spotsLeft} place` : "Disponible"}
          </span>
        </div>

        {/* Curated badge */}
        {mentor.curated && (
          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span className="text-[9px] font-semibold text-amber-400">Curated</span>
          </div>
        )}

        {/* Avatar flottant */}
        <div className="absolute -bottom-6 left-4">
          <div
            className={`h-14 w-14 rounded-xl bg-gradient-to-br ${mentor.avatar} ring-4 ring-neutral-900`}
          />
          {mentor.verified && (
            <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-blue-400">
                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.307 4.491 4.491 0 01-1.307-3.497A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-4 pb-4 pt-8">
        <h3 className="text-sm font-bold text-white transition-colors group-hover:text-amber-400">
          {mentor.name}
        </h3>
        <p className="mt-0.5 text-[11px] text-neutral-500">{mentor.title}</p>

        {/* Location + Domain */}
        <div className="mt-2 flex items-center gap-3 text-[11px] text-neutral-600">
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3 w-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {mentor.location}
          </span>
          <span className="rounded-full bg-neutral-800/60 px-2 py-0.5 text-[10px]">
            {mentor.domain}
          </span>
        </div>

        {/* Expertise */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {mentor.expertise.slice(0, 3).map((exp) => (
            <span
              key={exp}
              className="rounded-full border border-neutral-800 bg-neutral-800/40 px-2 py-0.5 text-[10px] text-neutral-400"
            >
              {exp}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-3 flex gap-4 text-[10px]">
          <div>
            <span className="font-bold text-white">{mentor.totalMentees}</span>
            <span className="ml-1 text-neutral-600">mentorés</span>
          </div>
          <div>
            <span className="font-bold text-amber-400">{mentor.successStories}</span>
            <span className="ml-1 text-neutral-600">succès</span>
          </div>
        </div>

        {/* Testimonial */}
        {mentor.testimonial && (
          <div className="mt-3 rounded-xl border border-neutral-800/40 bg-neutral-800/20 p-3">
            <p className="text-[10px] italic leading-relaxed text-neutral-400 line-clamp-2">
              &ldquo;{mentor.testimonial.text}&rdquo;
            </p>
            <p className="mt-1 text-[9px] text-neutral-600">
              — {mentor.testimonial.author}, {mentor.testimonial.role}
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto pt-4">
          <button
            onClick={() => !isFull && onRequestConnection(mentor)}
            disabled={isFull}
            className={`w-full rounded-xl py-2.5 text-xs font-semibold transition-all duration-300 ${
              isFull
                ? "cursor-not-allowed bg-neutral-800 text-neutral-600"
                : "bg-amber-400 text-black hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/20"
            }`}
          >
            {isFull ? "Liste d'attente" : "Demander une mise en relation"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
