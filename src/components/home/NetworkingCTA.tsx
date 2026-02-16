"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimateIn, fadeLeft, fadeRight } from "@/components/ui/AnimateIn";

export function NetworkingCTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="relative overflow-hidden rounded-3xl border border-neutral-800/50">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-neutral-900 to-purple-900/20" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-0 h-[400px] w-[400px] rounded-full bg-amber-500/10 blur-[100px]" />
          <div className="absolute -right-20 bottom-0 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[100px]" />
        </div>

        <div className="relative grid gap-10 p-10 md:grid-cols-2 md:p-16">
          {/* Colonne talents */}
          <AnimateIn variants={fadeLeft} className="space-y-5">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-4 w-4 text-amber-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                  />
                </svg>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                Vous êtes un talent
              </span>
            </div>

            <h3 className="text-2xl font-bold leading-tight text-white md:text-3xl">
              Faites-vous remarquer par les plus grandes marques
            </h3>

            <p className="text-sm leading-relaxed text-neutral-400">
              Rejoignez une communauté sélectionnée de créatifs africains.
              Bénéficiez d&apos;une visibilité premium, d&apos;un accompagnement
              éditorial et d&apos;un accès aux opportunités exclusives.
            </p>

            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-3 text-sm font-semibold text-black transition-all hover:from-amber-300 hover:to-amber-400 hover:shadow-lg hover:shadow-amber-500/20"
            >
              Créer mon profil talent
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
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </AnimateIn>

          {/* Séparateur */}
          <div className="absolute left-1/2 top-10 hidden h-[calc(100%-80px)] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-neutral-700 to-transparent md:block" />

          {/* Colonne marques */}
          <AnimateIn variants={fadeRight} className="space-y-5">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-400/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-4 w-4 text-purple-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                  />
                </svg>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                Vous êtes une marque
              </span>
            </div>

            <h3 className="text-2xl font-bold leading-tight text-white md:text-3xl">
              Trouvez les talents parfaits pour vos campagnes
            </h3>

            <p className="text-sm leading-relaxed text-neutral-400">
              Accédez à un vivier de talents vérifiés et éditorialisés.
              Chaque mise en relation est qualifiée par notre équipe pour
              garantir des collaborations impactantes.
            </p>

            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-400/10 px-6 py-3 text-sm font-semibold text-purple-300 transition-all hover:border-purple-400/60 hover:bg-purple-400/20 hover:text-purple-200"
            >
              Inscrire ma marque
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
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
