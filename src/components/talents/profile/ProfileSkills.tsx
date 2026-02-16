"use client";

import { motion } from "framer-motion";

interface ProfileSkillsProps {
  skills: string[];
}

export function ProfileSkills({ skills }: ProfileSkillsProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-amber-400">
        <span className="h-px w-4 bg-amber-400" />
        Compétences clés
      </h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 + idx * 0.06 }}
            className="rounded-full border border-neutral-700/60 bg-neutral-800/40 px-3.5 py-1.5 text-xs text-neutral-300 transition-colors hover:border-amber-400/30 hover:text-amber-400"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.section>
  );
}
