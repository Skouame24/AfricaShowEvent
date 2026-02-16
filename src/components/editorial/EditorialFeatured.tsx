"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Article } from "@/lib/data/articles";
import { articleTypeConfig } from "@/lib/data/articles";

const ease = [0.25, 0.4, 0.25, 1] as const;

interface EditorialFeaturedProps {
  articles: Article[];
}

export function EditorialFeatured({ articles }: EditorialFeaturedProps) {
  if (articles.length === 0) return null;

  const main = articles[0];
  const secondary = articles.slice(1, 3);

  return (
    <section className="mx-auto max-w-7xl px-6 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease }}
      >
        <h2 className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
          <span className="h-px w-4 bg-amber-400" />
          À la une
        </h2>

        <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          {/* Article principal */}
          <Link
            href={`/editorial/${main.slug}`}
            className="group relative flex min-h-[380px] flex-col justify-end overflow-hidden rounded-2xl border border-neutral-800/60 transition-colors duration-500 hover:border-neutral-700"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${main.coverImage} transition-transform duration-700 group-hover:scale-105`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            {/* Badge type */}
            <div className="absolute left-4 top-4">
              <span
                className={`inline-flex items-center rounded-full bg-gradient-to-r ${articleTypeConfig[main.type].gradient} px-3 py-1 text-[10px] font-bold text-white shadow-lg`}
              >
                {articleTypeConfig[main.type].label}
              </span>
            </div>

            {/* Temps de lecture */}
            <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-[10px] text-neutral-300 backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3 w-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {main.readingTime}
            </div>

            <div className="relative p-6">
              <h3 className="text-xl font-bold leading-snug text-white transition-colors group-hover:text-amber-400 md:text-2xl lg:text-3xl">
                {main.title}
              </h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-neutral-300 line-clamp-2">
                {main.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div
                  className={`h-8 w-8 rounded-full bg-gradient-to-br ${main.author.avatar}`}
                />
                <div>
                  <p className="text-xs font-semibold text-white">{main.author.name}</p>
                  <p className="text-[10px] text-neutral-500">{main.publishedAt}</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Articles secondaires */}
          <div className="flex flex-col gap-5">
            {secondary.map((article, idx) => (
              <Link
                key={article.slug}
                href={`/editorial/${article.slug}`}
                className="group relative flex flex-1 flex-col justify-end overflow-hidden rounded-2xl border border-neutral-800/60 transition-colors duration-500 hover:border-neutral-700"
              >
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 + idx * 0.1, ease }}
                  className="flex h-full flex-col"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${article.coverImage} transition-transform duration-700 group-hover:scale-105`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                  {/* Badge type */}
                  <div className="absolute left-3 top-3">
                    <span
                      className={`inline-flex items-center rounded-full bg-gradient-to-r ${articleTypeConfig[article.type].gradient} px-2.5 py-0.5 text-[9px] font-bold text-white`}
                    >
                      {articleTypeConfig[article.type].label}
                    </span>
                  </div>

                  <div className="relative mt-auto p-4">
                    <h3 className="text-sm font-bold text-white transition-colors group-hover:text-amber-400 line-clamp-2">
                      {article.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-2 text-[10px] text-neutral-400">
                      <span>{article.author.name}</span>
                      <span>·</span>
                      <span>{article.readingTime}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
