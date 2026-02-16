"use client";

import { motion } from "framer-motion";
import type { ArticleContentBlock } from "@/lib/data/articles";

interface ArticleContentProps {
  content: ArticleContentBlock[];
}

export function ArticleContent({ content }: ArticleContentProps) {
  return (
    <motion.article
      className="prose-invert max-w-none space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {content.map((block, idx) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={idx}
                className="text-sm leading-[1.85] text-neutral-300 md:text-base"
              >
                {block.text}
              </p>
            );

          case "heading":
            return (
              <h2
                key={idx}
                className="flex items-center gap-2 pt-4 text-lg font-bold text-white md:text-xl"
              >
                <span className="h-px w-5 bg-amber-400" />
                {block.text}
              </h2>
            );

          case "quote":
            return (
              <blockquote
                key={idx}
                className="relative my-8 rounded-2xl border-l-2 border-amber-400 bg-amber-400/5 py-6 pl-6 pr-5"
              >
                <svg
                  className="absolute -left-1 -top-3 h-8 w-8 text-amber-400/20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="relative text-sm italic leading-relaxed text-neutral-200 md:text-base">
                  {block.text}
                </p>
                <p className="mt-3 text-xs font-semibold text-amber-400">
                  — {block.author}
                </p>
              </blockquote>
            );

          case "image":
            return (
              <figure key={idx} className="my-8 overflow-hidden rounded-2xl">
                <div
                  className={`aspect-video w-full bg-gradient-to-br ${block.gradient}`}
                />
                <figcaption className="mt-2 text-center text-xs text-neutral-600">
                  {block.caption}
                </figcaption>
              </figure>
            );

          default:
            return null;
        }
      })}
    </motion.article>
  );
}
