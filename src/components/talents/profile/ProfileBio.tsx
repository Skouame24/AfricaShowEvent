"use client";

import { motion } from "framer-motion";

interface ProfileBioProps {
  bio: string;
}

export function ProfileBio({ bio }: ProfileBioProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-amber-400">
        <span className="h-px w-4 bg-amber-400" />
        Biographie
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-neutral-300">
        {bio}
      </p>
    </motion.section>
  );
}
