"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Article } from "@/lib/data/articles";
import { articleTypeConfig } from "@/lib/data/articles";

const ease = [0.25, 0.4, 0.25, 1] as const;

interface ArticleHeroProps {
  article: Article;
}

export function ArticleHero({ article }: ArticleHeroProps) {
  const typeConf = articleTypeConfig[article.type];

  return (
    <section className="relative">
      {/* Couverture pleine largeur */}
      <div className="relative h-72 overflow-hidden md:h-[420px]">
        <div
          className={`h-full w-full bg-gradient-to-br ${article.coverImage}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />

        {/* Retour */}
        <Link
          href="/editorial"
          className="absolute left-6 top-6 z-10 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 text-xs text-neutral-300 backdrop-blur-md transition-colors hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Retour
        </Link>

        {/* Badge type */}
        <div className="absolute right-6 top-6">
          <span
            className={`inline-flex items-center rounded-full bg-gradient-to-r ${typeConf.gradient} px-3.5 py-1.5 text-xs font-bold text-white shadow-lg`}
          >
            {typeConf.label}
          </span>
        </div>

        {/* Titre superposé en bas */}
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <h1 className="text-2xl font-bold leading-tight text-white md:text-3xl lg:text-4xl">
                {article.title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-300 line-clamp-3 md:text-base">
                {article.excerpt}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Méta sous la couverture */}
      <motion.div
        className="mx-auto max-w-3xl px-6 pt-6"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease }}
      >
        <div className="flex flex-wrap items-center gap-4 border-b border-neutral-800/60 pb-6">
          {/* Auteur */}
          <div className="flex items-center gap-3">
            <div
              className={`h-10 w-10 rounded-full bg-gradient-to-br ${article.author.avatar} ring-2 ring-neutral-800`}
            />
            <div>
              <p className="text-sm font-semibold text-white">{article.author.name}</p>
              <p className="text-[11px] text-neutral-500">{article.author.role}</p>
            </div>
          </div>

          <div className="hidden h-5 w-px bg-neutral-800 md:block" />

          {/* Date */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3.5 w-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            {article.publishedAt}
          </div>

          {/* Temps de lecture */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3.5 w-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {article.readingTime} de lecture
          </div>

          {/* Tags */}
          <div className="ml-auto flex gap-1.5">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-neutral-800 bg-neutral-800/40 px-2.5 py-0.5 text-[10px] text-neutral-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
