"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimateIn, Stagger, StaggerItem, fadeUp } from "@/components/ui/AnimateIn";

const talents = [
  {
    name: "Amara Diallo",
    role: "Chanteuse & Auteure",
    location: "Dakar, Sénégal",
    image: "from-purple-600 to-pink-500",
    skills: ["Afrobeats", "Soul", "Composition"],
    curated: true,
  },
  {
    name: "Kofi Mensah",
    role: "Réalisateur & Photographe",
    location: "Accra, Ghana",
    image: "from-amber-600 to-red-500",
    skills: ["Clip vidéo", "Mode", "Documentaire"],
    curated: true,
  },
  {
    name: "Fatou Keita",
    role: "Mannequin & Influenceuse",
    location: "Abidjan, Côte d'Ivoire",
    image: "from-emerald-600 to-teal-500",
    skills: ["Haute couture", "Campagne digitale", "Lifestyle"],
    curated: true,
  },
  {
    name: "Yemi Adebayo",
    role: "Producteur Musical",
    location: "Lagos, Nigeria",
    image: "from-blue-600 to-violet-500",
    skills: ["Afrobeats", "Amapiano", "Mix & Master"],
    curated: false,
  },
];

export function FeaturedTalents() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      {/* En-tête de section */}
      <AnimateIn>
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
              Profils Premium
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Talents en vedette
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-neutral-400">
              Une sélection éditorialisée de talents créatifs africains, validés
              et mis en avant par l&apos;équipe AfricaShowbizRoom.
            </p>
          </div>
          <Link
            href="/talents"
            className="group flex items-center gap-2 text-sm font-medium text-amber-400 transition-colors hover:text-amber-300"
          >
            Voir tous les talents
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </AnimateIn>

      {/* Grille de cartes talents */}
      <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {talents.map((talent) => (
          <StaggerItem key={talent.name} variants={fadeUp}>
            <motion.div
              className="group relative overflow-hidden rounded-2xl border border-neutral-800/60 bg-neutral-900/40 transition-colors duration-500 hover:border-neutral-700 hover:bg-neutral-900/80"
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              {/* Image de profil (gradient placeholder) */}
              <div className="relative h-56 overflow-hidden">
                <div
                  className={`h-full w-full bg-gradient-to-br ${talent.image} transition-transform duration-700 group-hover:scale-110`}
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-neutral-900 to-transparent" />

                {talent.curated && (
                  <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    <span className="text-[10px] font-semibold text-amber-400">
                      Curated
                    </span>
                  </div>
                )}

                <button className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-amber-400/90 px-3 py-1.5 text-[11px] font-semibold text-black opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-amber-300 group-hover:opacity-100">
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
                </button>
              </div>

              <div className="p-4">
                <h3 className="text-sm font-semibold text-white">{talent.name}</h3>
                <p className="mt-0.5 text-xs text-neutral-400">{talent.role}</p>

                <div className="mt-2 flex items-center gap-1 text-[11px] text-neutral-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-3 w-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  {talent.location}
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {talent.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-neutral-800 bg-neutral-800/40 px-2 py-0.5 text-[10px] text-neutral-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
