"use client";

import { motion } from "framer-motion";
import type { EventParticipant } from "@/lib/data/events";

interface EventParticipantsProps {
  participants: EventParticipant[];
}

export function EventParticipants({ participants }: EventParticipantsProps) {
  const confirmed = participants.filter((p) => p.confirmed);
  const pending = participants.filter((p) => !p.confirmed);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
    >
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-amber-400">
          <span className="h-px w-4 bg-amber-400" />
          Participants
        </h2>
        <span className="text-xs text-neutral-500">
          {confirmed.length} confirmé{confirmed.length > 1 ? "s" : ""}
          {pending.length > 0 && ` · ${pending.length} en attente`}
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {participants.map((p, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + idx * 0.06 }}
            className="flex items-center gap-3 rounded-xl border border-neutral-800/50 bg-neutral-900/30 px-4 py-3 transition-colors hover:border-neutral-700"
          >
            {/* Avatar */}
            <div
              className={`h-10 w-10 flex-shrink-0 rounded-xl bg-gradient-to-br ${p.avatar}`}
            />

            {/* Infos */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{p.name}</p>
              <p className="text-[11px] text-neutral-500">{p.role}</p>
            </div>

            {/* Status */}
            <div
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                p.confirmed
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-amber-500/10 text-amber-400"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  p.confirmed ? "bg-emerald-400" : "bg-amber-400"
                }`}
              />
              {p.confirmed ? "Confirmé" : "En attente"}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
