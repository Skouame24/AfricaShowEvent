"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Article } from "@/lib/data/articles";
import { articleTypeConfig } from "@/lib/data/articles";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const typeConf = articleTypeConfig[article.type];

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <Link
        href={`/editorial/${article.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-800/60 bg-neutral-900/40 transition-colors duration-500 hover:border-neutral-700 hover:bg-neutral-900/80"
      >
        {/* Cover */}
        <div className="relative h-48 overflow-hidden">
          <div
            className={`h-full w-full bg-gradient-to-br ${article.coverImage} transition-transform duration-700 group-hover:scale-110`}
          />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-neutral-900 to-transparent" />

          {/* Badge type */}
          <div className="absolute left-3 top-3">
            <span
              className={`inline-flex items-center rounded-full bg-gradient-to-r ${typeConf.gradient} px-2.5 py-1 text-[10px] font-bold text-white shadow-lg`}
            >
              {typeConf.label}
            </span>
          </div>

          {/* Temps de lecture */}
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-[10px] text-neutral-300 backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3 w-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {article.readingTime}
          </div>

          {/* Vidéo indicator */}
          {article.video && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-[10px] text-white backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 text-red-400">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
              </svg>
              Vidéo
            </div>
          )}

          {/* Galerie count */}
          {article.gallery.length > 0 && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-[10px] text-neutral-300 backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3 w-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v14.25a1.5 1.5 0 001.5 1.5z" />
              </svg>
              {article.gallery.length}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-sm font-bold leading-snug text-white transition-colors group-hover:text-amber-400 line-clamp-2">
            {article.title}
          </h3>
          <p className="mt-2 flex-1 text-xs leading-relaxed text-neutral-500 line-clamp-3">
            {article.excerpt}
          </p>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-1">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-neutral-800 bg-neutral-800/40 px-2 py-0.5 text-[9px] text-neutral-500"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Auteur + date */}
          <div className="mt-3 flex items-center gap-2.5 border-t border-neutral-800/40 pt-3">
            <div
              className={`h-7 w-7 flex-shrink-0 rounded-full bg-gradient-to-br ${article.author.avatar}`}
            />
            <div className="min-w-0">
              <p className="truncate text-[11px] font-semibold text-neutral-300">
                {article.author.name}
              </p>
              <p className="text-[10px] text-neutral-600">{article.publishedAt}</p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
