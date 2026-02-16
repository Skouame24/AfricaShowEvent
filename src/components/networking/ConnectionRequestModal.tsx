"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Mentor } from "@/lib/data/mentors";

interface ConnectionRequestModalProps {
  mentor: Mentor | null;
  onClose: () => void;
}

const ease = [0.25, 0.4, 0.25, 1] as const;

export function ConnectionRequestModal({
  mentor,
  onClose,
}: ConnectionRequestModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    projectDescription: "",
    expectations: "",
  });

  if (!mentor) return null;

  const handleSubmit = () => {
    // Future : appel API
    setStep(3);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900"
        >
          {/* Header */}
          <div className="relative flex items-center gap-4 border-b border-neutral-800/50 bg-neutral-900/50 px-6 py-5">
            <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${mentor.avatar} flex-shrink-0`} />
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-bold text-white">
                Mise en relation avec {mentor.name}
              </h3>
              <p className="truncate text-[11px] text-neutral-500">
                {mentor.title}
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-white/5 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Stepper */}
          <div className="flex items-center gap-2 px-6 pt-5">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-1 items-center gap-2">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold transition-all ${
                    s <= step
                      ? "bg-amber-400 text-black"
                      : "bg-neutral-800 text-neutral-600"
                  }`}
                >
                  {s === 3 && step === 3 ? "✓" : s}
                </div>
                {s < 3 && (
                  <div
                    className={`hidden h-px flex-1 sm:block ${
                      s < step ? "bg-amber-400" : "bg-neutral-800"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form content */}
          <div className="px-6 py-5">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <p className="text-xs text-neutral-400">
                  Présentez-vous brièvement pour que notre équipe puisse valider votre demande.
                </p>
                <div>
                  <label className="text-[11px] font-medium text-neutral-500">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="mt-1 w-full rounded-xl border border-neutral-800 bg-neutral-800/30 px-4 py-2.5 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-amber-400/40"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-neutral-500">
                    Email professionnel
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="mt-1 w-full rounded-xl border border-neutral-800 bg-neutral-800/30 px-4 py-2.5 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-amber-400/40"
                    placeholder="mail@exemple.com"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-neutral-500">
                    Votre rôle / activité
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="mt-1 w-full rounded-xl border border-neutral-800 bg-neutral-800/30 px-4 py-2.5 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-amber-400/40"
                    placeholder="ex: Artiste musique, Mannequin, Réalisateur..."
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <p className="text-xs text-neutral-400">
                  Décrivez votre projet et ce que vous attendez de cette mise en relation.
                </p>
                <div>
                  <label className="text-[11px] font-medium text-neutral-500">
                    Décrivez votre projet
                  </label>
                  <textarea
                    value={formData.projectDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        projectDescription: e.target.value,
                      })
                    }
                    rows={3}
                    className="mt-1 w-full resize-none rounded-xl border border-neutral-800 bg-neutral-800/30 px-4 py-2.5 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-amber-400/40"
                    placeholder="En quoi consiste votre projet actuel ?"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-neutral-500">
                    Vos attentes vis-à-vis du mentor
                  </label>
                  <textarea
                    value={formData.expectations}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        expectations: e.target.value,
                      })
                    }
                    rows={3}
                    className="mt-1 w-full resize-none rounded-xl border border-neutral-800 bg-neutral-800/30 px-4 py-2.5 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-amber-400/40"
                    placeholder="Quels conseils ou accompagnements recherchez-vous ?"
                  />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-6 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-8 w-8 text-emerald-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h4 className="mt-4 text-lg font-bold text-white">
                  Demande envoyée !
                </h4>
                <p className="mt-2 max-w-xs text-xs leading-relaxed text-neutral-400">
                  Notre équipe va examiner votre demande sous <strong className="text-white">48h</strong>.
                  Vous recevrez une notification dès que la mise en relation sera validée.
                </p>
                <div className="mt-4 flex items-center gap-2 rounded-full bg-amber-400/10 px-3 py-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3.5 w-3.5 text-amber-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                  <span className="text-[10px] font-semibold text-amber-400">
                    Validé par l&apos;équipe AfricaShowbizRoom
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer actions */}
          {step < 3 && (
            <div className="flex items-center justify-between border-t border-neutral-800/50 px-6 py-4">
              {step > 1 ? (
                <button
                  onClick={() => setStep((s) => Math.max(1, s - 1) as 1 | 2)}
                  className="text-xs text-neutral-400 transition-colors hover:text-white"
                >
                  ← Retour
                </button>
              ) : (
                <span />
              )}
              <button
                onClick={() =>
                  step === 1 ? setStep(2) : handleSubmit()
                }
                className="rounded-xl bg-amber-400 px-6 py-2 text-xs font-semibold text-black transition-all hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/20"
              >
                {step === 1 ? "Suivant →" : "Envoyer ma demande"}
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="flex justify-center border-t border-neutral-800/50 px-6 py-4">
              <button
                onClick={onClose}
                className="rounded-xl bg-neutral-800 px-6 py-2 text-xs font-semibold text-neutral-300 transition-colors hover:bg-neutral-700"
              >
                Fermer
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
