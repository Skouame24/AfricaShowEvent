"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArticleCard } from "./ArticleCard";
import type { Article } from "@/lib/data/articles";

interface EditorialGridProps {
  articles: Article[];
}

export function EditorialGrid({ articles }: EditorialGridProps) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <AnimatePresence mode="wait">
        {articles.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-800/50">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7 text-neutral-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
              </svg>
            </div>
            <p className="mt-4 text-sm font-medium text-neutral-400">
              Aucun article dans cette catégorie
            </p>
            <p className="mt-1 text-xs text-neutral-600">
              Explorez d&apos;autres types de contenu
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.08 },
              },
            }}
          >
            {articles.map((article) => (
              <motion.div
                key={article.slug}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                layout
              >
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
