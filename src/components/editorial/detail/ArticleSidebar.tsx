"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Article } from "@/lib/data/articles";
import { articles as allArticles, articleTypeConfig } from "@/lib/data/articles";

interface ArticleSidebarProps {
  article: Article;
}

export function ArticleSidebar({ article }: ArticleSidebarProps) {
  // Articles liés
  const related = article.relatedSlugs
    .map((slug) => allArticles.find((a) => a.slug === slug))
    .filter(Boolean) as Article[];

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="space-y-6"
    >
      {/* Auteur */}
      <div className="rounded-2xl border border-neutral-800/60 bg-neutral-900/40 p-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          L&apos;auteur
        </h3>
        <div className="mt-4 flex items-center gap-3">
          <div
            className={`h-12 w-12 rounded-xl bg-gradient-to-br ${article.author.avatar}`}
          />
          <div>
            <p className="text-sm font-semibold text-white">{article.author.name}</p>
            <p className="text-[11px] text-neutral-500">{article.author.role}</p>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="rounded-2xl border border-neutral-800/60 bg-neutral-900/40 p-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Thèmes
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-neutral-700/60 bg-neutral-800/40 px-3 py-1 text-xs text-neutral-300 transition-colors hover:border-amber-400/30 hover:text-amber-400"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Articles liés */}
      {related.length > 0 && (
        <div className="rounded-2xl border border-neutral-800/60 bg-neutral-900/40 p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            À lire aussi
          </h3>
          <div className="mt-4 space-y-4">
            {related.map((rel) => {
              const typeConf = articleTypeConfig[rel.type];
              return (
                <Link
                  key={rel.slug}
                  href={`/editorial/${rel.slug}`}
                  className="group flex gap-3"
                >
                  <div
                    className={`h-16 w-16 flex-shrink-0 rounded-xl bg-gradient-to-br ${rel.coverImage} transition-transform duration-300 group-hover:scale-105`}
                  />
                  <div className="min-w-0">
                    <span
                      className={`inline-flex rounded-full bg-gradient-to-r ${typeConf.gradient} px-2 py-0.5 text-[8px] font-bold text-white`}
                    >
                      {typeConf.label}
                    </span>
                    <p className="mt-1 text-xs font-semibold leading-snug text-neutral-300 transition-colors group-hover:text-amber-400 line-clamp-2">
                      {rel.title}
                    </p>
                    <p className="mt-0.5 text-[10px] text-neutral-600">
                      {rel.readingTime}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Newsletter CTA */}
      <div className="overflow-hidden rounded-2xl border border-amber-400/10 bg-gradient-to-b from-amber-400/5 to-neutral-900/40 p-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400">
          Newsletter
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-neutral-400">
          Recevez nos meilleurs articles, portraits et reportages directement dans
          votre boîte mail.
        </p>
        <div className="mt-3 flex gap-2">
          <input
            type="email"
            placeholder="Votre email"
            className="flex-1 rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-neutral-300 placeholder-neutral-600 outline-none transition-colors focus:border-amber-400/40"
          />
          <button className="rounded-xl bg-amber-400 px-3 py-2 text-xs font-semibold text-black transition-all hover:bg-amber-300">
            OK
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
