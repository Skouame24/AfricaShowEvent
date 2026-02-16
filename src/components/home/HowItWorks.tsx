"use client";

import { motion } from "framer-motion";
import { AnimateIn, Stagger, StaggerItem, scaleUp } from "@/components/ui/AnimateIn";

const steps = [
  {
    number: "01",
    title: "Créez votre profil premium",
    description:
      "Présentez votre univers avec une bio éditorialisée, une galerie photo/vidéo et vos compétences clés. Notre équipe valide et optimise chaque profil.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    ),
    gradient: "from-amber-400 to-amber-600",
  },
  {
    number: "02",
    title: "Connectez-vous aux bonnes opportunités",
    description:
      "Recevez des demandes de collaboration qualifiées. Chaque mise en relation est validée par notre équipe pour garantir la pertinence.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
      />
    ),
    gradient: "from-purple-400 to-purple-600",
  },
  {
    number: "03",
    title: "Développez votre carrière",
    description:
      "Accédez aux événements privés, bénéficiez d'une visibilité éditoriale et construisez un réseau professionnel de haut niveau.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
      />
    ),
    gradient: "from-emerald-400 to-emerald-600",
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-neutral-950/80 py-24">
      {/* Décor de fond */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/[0.03] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* En-tête */}
        <AnimateIn className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            Networking Qualifié
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Comment ça marche ?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-neutral-400">
            Un processus simple, humain et qualitatif pour des collaborations
            qui ont du sens.
          </p>
        </AnimateIn>

        {/* Étapes */}
        <Stagger slow className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <StaggerItem key={step.number} variants={scaleUp}>
            <motion.div className="group relative" whileHover={{ y: -5 }} transition={{ duration: 0.25 }}>
              {/* Ligne de connexion (entre les cartes) */}
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-16 hidden h-[1px] w-8 translate-x-full bg-gradient-to-r from-neutral-700 to-transparent md:block" />
              )}

              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-800/50 bg-neutral-900/30 p-8 transition-all duration-500 hover:border-neutral-700 hover:bg-neutral-900/60">
                {/* Numéro en fond */}
                <span className="absolute -right-2 -top-4 text-[80px] font-black leading-none text-white/[0.03]">
                  {step.number}
                </span>

                {/* Icône */}
                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${step.gradient} shadow-lg`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6 text-white"
                  >
                    {step.icon}
                  </svg>
                </div>

                {/* Numéro visible */}
                <span className="text-xs font-bold text-neutral-600">
                  ÉTAPE {step.number}
                </span>

                <h3 className="mt-2 text-lg font-bold text-white">
                  {step.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-400">
                  {step.description}
                </p>
              </div>
            </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
