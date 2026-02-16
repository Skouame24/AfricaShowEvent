"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimateIn, fadeLeft, fadeRight } from "@/components/ui/AnimateIn";

const articles = [
  {
    type: "Portrait",
    title: "Burna Boy : L'ascension d'un géant de l'Afrobeats",
    excerpt:
      "Retour sur le parcours exceptionnel de l'artiste nigérian qui a conquis la scène mondiale.",
    image: "from-amber-700 to-red-900",
    readTime: "8 min",
    date: "12 Fév 2026",
  },
  {
    type: "Interview",
    title: "Tiwa Savage parle de l'avenir de la musique africaine",
    excerpt:
      "Une conversation exclusive sur les collaborations internationales et l'industrie musicale du continent.",
    image: "from-purple-700 to-indigo-900",
    readTime: "6 min",
    date: "10 Fév 2026",
  },
  {
    type: "Reportage",
    title: "Fashion Week de Lagos : Les créateurs qui redéfinissent le luxe",
    excerpt:
      "Immersion dans les coulisses de l'événement mode le plus influent d'Afrique de l'Ouest.",
    image: "from-emerald-700 to-teal-900",
    readTime: "12 min",
    date: "8 Fév 2026",
  },
];

const impactStory = {
  type: "Page Impact",
  title: "Comment le divertissement africain transforme l'économie créative mondiale",
  excerpt:
    "De Nollywood aux plateformes de streaming, analyse d'un marché en pleine explosion qui attire les investisseurs du monde entier.",
  image: "from-amber-600 via-purple-700 to-blue-900",
  readTime: "15 min",
};

export function EditorialPreview() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      {/* En-tête */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            Éditorial &amp; Média Hub
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Histoires qui comptent
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-neutral-400">
            Portraits, interviews, reportages et pages Impact qui racontent
            les nouvelles narratives de l&apos;entertainment africain.
          </p>
        </div>
        <Link
          href="/editorial"
          className="group flex items-center gap-2 text-sm font-medium text-amber-400 transition-colors hover:text-amber-300"
        >
          Tout le média hub
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

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {/* Article principal (Page Impact) */}
        <AnimateIn variants={fadeLeft}>
        <motion.div
          className="group relative overflow-hidden rounded-2xl border border-neutral-800/50 bg-neutral-900/30 transition-all duration-500 hover:border-neutral-700 hover:shadow-2xl hover:shadow-purple-900/10"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative h-64 overflow-hidden lg:h-full lg:min-h-[360px]">
            <div
              className={`h-full w-full bg-gradient-to-br ${impactStory.image} transition-transform duration-700 group-hover:scale-105`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Contenu sur l'image */}
            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="rounded-full bg-amber-400/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-400 backdrop-blur-sm">
                  {impactStory.type}
                </span>
                <span className="text-[11px] text-neutral-400">
                  {impactStory.readTime} de lecture
                </span>
              </div>
              <h3 className="text-xl font-bold leading-tight text-white md:text-2xl">
                {impactStory.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                {impactStory.excerpt}
              </p>
              <Link
                href="/editorial/impact"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-amber-400 transition-colors hover:text-amber-300"
              >
                Lire l&apos;article
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>
        </AnimateIn>

        {/* Liste des articles secondaires */}
        <AnimateIn variants={fadeRight} className="flex flex-col gap-4">
          {articles.map((article, i) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 * i, ease: [0.25, 0.4, 0.25, 1] }}
              whileHover={{ x: 4 }}
            >
            <Link
              href="/editorial"
              key={article.title}
              href="/editorial"
              className="group flex gap-4 rounded-2xl border border-neutral-800/50 bg-neutral-900/30 p-4 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/60"
            >
              {/* Miniature */}
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl">
                <div
                  className={`h-full w-full bg-gradient-to-br ${article.image} transition-transform duration-500 group-hover:scale-110`}
                />
              </div>

              {/* Texte */}
              <div className="flex flex-1 flex-col justify-center">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                    {article.type}
                  </span>
                  <span className="text-neutral-700">·</span>
                  <span className="text-[10px] text-neutral-500">
                    {article.readTime}
                  </span>
                </div>
                <h3 className="mt-1 text-sm font-semibold leading-snug text-white transition-colors group-hover:text-amber-400">
                  {article.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-neutral-500">
                  {article.excerpt}
                </p>
              </div>
            </Link>
            </motion.div>
          ))}
        </AnimateIn>
      </div>
    </section>
  );
}
