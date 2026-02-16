"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { EventGalleryItem } from "@/lib/data/events";

const ease = [0.25, 0.4, 0.25, 1] as const;

interface EventGalleryProps {
  gallery: EventGalleryItem[];
}

export function EventGallery({ gallery }: EventGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  if (gallery.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-amber-400">
        <span className="h-px w-4 bg-amber-400" />
        Galerie post-événement
      </h2>

      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
        {gallery.map((item, idx) => (
          <motion.button
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.45 + idx * 0.06 }}
            onClick={() => setSelectedIdx(idx)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl"
          >
            <div
              className={`h-full w-full bg-gradient-to-br ${item.gradient} transition-transform duration-500 group-hover:scale-110`}
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30" />
            <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/80 to-transparent p-3 transition-transform duration-300 group-hover:translate-y-0">
              <p className="text-xs font-medium text-white">{item.caption}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedIdx(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className="relative mx-4 w-full max-w-2xl overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`aspect-video w-full bg-gradient-to-br ${gallery[selectedIdx]?.gradient}`}
              />
              <div className="bg-neutral-900 px-5 py-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white">
                    {gallery[selectedIdx]?.caption}
                  </p>
                  <button
                    onClick={() => setSelectedIdx(null)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-neutral-400 transition-colors hover:bg-neutral-700 hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Navigation */}
              {selectedIdx > 0 && (
                <button
                  onClick={() => setSelectedIdx(selectedIdx - 1)}
                  className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
              )}
              {selectedIdx < gallery.length - 1 && (
                <button
                  onClick={() => setSelectedIdx(selectedIdx + 1)}
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
