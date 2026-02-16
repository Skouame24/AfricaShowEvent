"use client";

import { motion } from "framer-motion";

const ease = [0.25, 0.4, 0.25, 1] as const;

const testimonials = [
  {
    text: "Grâce au mentorat d'AfricaShowbizRoom, j'ai structuré ma carrière musicale et signé avec un label en 6 mois. Le processus de validation m'a mis en confiance dès le départ.",
    author: "Kemi Olatunji",
    role: "Artiste Afrobeats, Lagos",
    avatar: "from-pink-500 to-rose-400",
  },
  {
    text: "La mise en relation avec Fatou a changé ma trajectoire. Ses conseils m'ont permis de décrocher mes premiers défilés internationaux. Tout ça en toute confidentialité.",
    author: "Aisata Coulibaly",
    role: "Mannequin, Abidjan",
    avatar: "from-violet-500 to-indigo-400",
  },
  {
    text: "Omar m'a appris à transformer mes contenus en véritable business. En 3 mois, j'ai signé mon premier partenariat marque à 5 chiffres.",
    author: "Yasmine El Idrissi",
    role: "Créatrice Digital, Casablanca",
    avatar: "from-emerald-500 to-teal-400",
  },
];

export function NetworkingTestimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="text-center"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
          Témoignages
        </span>
        <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
          Des <span className="text-amber-400">connexions</span> qui transforment des carrières
        </h2>
      </motion.div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, idx) => (
          <motion.div
            key={t.author}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + idx * 0.1, ease }}
            className="group relative rounded-2xl border border-neutral-800/50 bg-neutral-900/30 p-6 transition-all duration-500 hover:border-amber-400/20 hover:bg-neutral-900/60"
          >
            {/* Quote icon */}
            <div className="mb-4 text-amber-400/40">
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 32 32">
                <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
              </svg>
            </div>

            <p className="text-sm leading-relaxed text-neutral-300">
              {t.text}
            </p>

            <div className="mt-6 flex items-center gap-3 border-t border-neutral-800/30 pt-4">
              <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${t.avatar}`} />
              <div>
                <p className="text-xs font-semibold text-white">{t.author}</p>
                <p className="text-[10px] text-neutral-500">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
