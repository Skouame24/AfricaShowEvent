"use client";

import { motion } from "framer-motion";
import type { AppEvent } from "@/lib/data/events";

interface EventSidebarProps {
  event: AppEvent;
}

export function EventSidebar({ event }: EventSidebarProps) {
  const isPast = event.status === "past";
  const isFull = event.spotsLeft === 0;
  const almostFull = event.spotsLeft > 0 && event.spotsLeft <= 10;

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="space-y-6"
    >
      {/* RSVP Card */}
      <div className="overflow-hidden rounded-2xl border border-neutral-800/60 bg-neutral-900/40">
        <div className="p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Réservation
          </h3>

          {/* Jauge de places */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-500">Places disponibles</span>
              <span className={`font-semibold ${almostFull ? "text-red-400" : isFull ? "text-neutral-600" : "text-emerald-400"}`}>
                {event.spotsLeft}/{event.capacity}
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-800">
              <motion.div
                className={`h-full rounded-full ${
                  almostFull
                    ? "bg-gradient-to-r from-red-500 to-orange-500"
                    : isFull
                      ? "bg-neutral-600"
                      : "bg-gradient-to-r from-amber-400 to-emerald-400"
                }`}
                initial={{ width: 0 }}
                animate={{
                  width: `${((event.capacity - event.spotsLeft) / event.capacity) * 100}%`,
                }}
                transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              />
            </div>
          </div>

          {/* CTA */}
          <div className="mt-5">
            {isPast ? (
              <button
                disabled
                className="w-full rounded-xl bg-neutral-800 py-3 text-sm font-semibold text-neutral-500"
              >
                Événement terminé
              </button>
            ) : isFull ? (
              <button
                disabled
                className="w-full rounded-xl bg-neutral-800 py-3 text-sm font-semibold text-neutral-500"
              >
                Complet
              </button>
            ) : event.invitationOnly ? (
              <button className="group relative w-full overflow-hidden rounded-xl bg-amber-400 py-3 text-sm font-semibold text-black transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/20">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                  </svg>
                  Demander une invitation
                </span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </button>
            ) : (
              <button className="group relative w-full overflow-hidden rounded-xl bg-amber-400 py-3 text-sm font-semibold text-black transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/20">
                <span className="relative z-10">Réserver ma place</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </button>
            )}
          </div>

          {almostFull && !isPast && (
            <p className="mt-2 flex items-center justify-center gap-1 text-[11px] text-red-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-400" />
              </span>
              Places limitées — réservez vite
            </p>
          )}
        </div>
      </div>

      {/* Détails pratiques */}
      <div className="rounded-2xl border border-neutral-800/60 bg-neutral-900/40 p-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Détails pratiques
        </h3>
        <div className="mt-4 space-y-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-neutral-600">Lieu</p>
            <p className="mt-0.5 text-sm text-neutral-300">{event.venue}</p>
            <p className="text-xs text-neutral-500">{event.city}, {event.country}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-neutral-600">Date & heure</p>
            <p className="mt-0.5 text-sm text-neutral-300">{event.date}</p>
            <p className="text-xs text-neutral-500">{event.time}</p>
          </div>
          {event.dresscode && (
            <div>
              <p className="text-[10px] uppercase tracking-wider text-neutral-600">Dress code</p>
              <p className="mt-0.5 text-sm text-neutral-300">{event.dresscode}</p>
            </div>
          )}
          <div>
            <p className="text-[10px] uppercase tracking-wider text-neutral-600">Organisé par</p>
            <p className="mt-0.5 text-sm text-neutral-300">{event.organizer}</p>
          </div>
        </div>
      </div>

      {/* Partage */}
      <div className="rounded-2xl border border-neutral-800/60 bg-neutral-900/40 p-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Partager
        </h3>
        <div className="mt-4 flex gap-2">
          {["Twitter", "LinkedIn", "WhatsApp", "Copier"].map((platform) => (
            <button
              key={platform}
              className="flex-1 rounded-xl border border-neutral-800 bg-neutral-800/40 py-2 text-[10px] font-medium text-neutral-400 transition-all hover:border-amber-400/30 hover:text-amber-400"
            >
              {platform}
            </button>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}
