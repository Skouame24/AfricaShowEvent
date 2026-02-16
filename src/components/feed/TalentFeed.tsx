"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { AnimateIn, Stagger, StaggerItem, fadeUp, fadeLeft, fadeRight, scaleUp } from "@/components/ui/AnimateIn";

const ease = [0.25, 0.4, 0.25, 1] as const;

/* ── Mock data ── */
const OPPORTUNITIES = [
  {
    id: "1",
    title: "Casting vocal — Nouvelle série Netflix Afrique",
    type: "Casting",
    deadline: "3 jours",
    tags: ["Chant", "Acting"],
    gradient: "from-red-600 to-orange-800",
    hot: true,
  },
  {
    id: "2",
    title: "Campagne Orange Africa — Visages 2026",
    type: "Campagne",
    deadline: "1 semaine",
    tags: ["Mannequinat", "Influence"],
    gradient: "from-amber-600 to-yellow-800",
    hot: true,
  },
  {
    id: "3",
    title: "Festival Amapiano Dakar — Artistes recherchés",
    type: "Événement",
    deadline: "2 semaines",
    tags: ["DJ", "Production"],
    gradient: "from-purple-600 to-indigo-800",
    hot: false,
  },
];

const MEDIA_FEED = [
  {
    id: "1",
    type: "Portrait",
    title: "Comment Burna Boy a révolutionné l'Afrobeats mondial",
    source: "ASR Éditorial",
    time: "2h",
    image: "from-amber-700 to-red-900",
    readTime: "8 min",
  },
  {
    id: "2",
    type: "Tendance",
    title: "Lagos Fashion Week 2026 : les tendances à retenir",
    source: "ASR Mode",
    time: "5h",
    image: "from-purple-700 to-indigo-900",
    readTime: "6 min",
  },
  {
    id: "3",
    type: "News",
    title: "Aminata Diallo rejoint le panel de mentors ASR",
    source: "ASR Networking",
    time: "8h",
    image: "from-emerald-700 to-teal-900",
    readTime: "3 min",
  },
];

const SUGGESTED_MENTORS = [
  { name: "Aminata Diallo", title: "Directrice Artistique", avatar: "from-purple-500 to-violet-400", location: "Dakar, Sénégal" },
  { name: "Jean-Paul Ndongo", title: "Producteur Musical", avatar: "from-blue-500 to-indigo-400", location: "Lagos, Nigeria" },
  { name: "Grace Okonkwo", title: "Agent de talents", avatar: "from-pink-500 to-rose-400", location: "Accra, Ghana" },
];

const UPCOMING_EVENTS = [
  { title: "AfroVibes Festival", date: "15 Mars", location: "Dakar", gradient: "from-amber-600 to-orange-800", exclusive: true },
  { title: "Creative Africa Summit", date: "22 Mars", location: "Lagos", gradient: "from-purple-600 to-indigo-800", exclusive: false },
  { title: "Mode Africaine Expo", date: "5 Avril", location: "Abidjan", gradient: "from-emerald-600 to-teal-800", exclusive: true },
];

export function TalentFeed() {
  const { user } = useAuth();
  if (!user) return null;

  const firstName = user.fullName.split(" ")[0];

  const completionItems = [
    { label: "Titre professionnel", done: !!user.title },
    { label: "Biographie", done: !!user.bio },
    { label: "Compétences", done: (user.skills?.length ?? 0) > 0 },
    { label: "Galerie média", done: (user.gallery?.length ?? 0) > 0 },
    { label: "Réseaux sociaux", done: (user.socials?.length ?? 0) > 0 },
    { label: "Localisation", done: !!user.location },
  ];
  const completionPct = Math.round((completionItems.filter((i) => i.done).length / completionItems.length) * 100);

  return (
    <div className="relative">
      {/* ── Background ambiance ── */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -left-40 top-0 h-[700px] w-[600px] rounded-full bg-amber-600/[0.04] blur-[160px]" />
        <div className="absolute right-0 top-[20%] h-[500px] w-[400px] rounded-full bg-purple-600/[0.04] blur-[140px]" />
        <div className="absolute left-1/3 bottom-0 h-[400px] w-[500px] rounded-full bg-amber-500/[0.03] blur-[120px]" />
      </div>

      {/* ═══════════════ HERO WELCOME ═══════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[200px] w-[2px] -translate-x-1/2 bg-gradient-to-b from-amber-400/30 to-transparent" />
          {[
            { left: "15%", top: "12%", color: "amber-300/30" },
            { left: "82%", top: "8%", color: "purple-300/20" },
            { left: "45%", top: "25%", color: "amber-200/20" },
          ].map((p, i) => (
            <motion.div
              key={i}
              className={`absolute h-1.5 w-1.5 rounded-full bg-${p.color}`}
              style={{ left: p.left, top: p.top }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: [0, 1.3, 1] }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.2, ease }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-10 pt-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-center gap-5">
              <motion.div
                className="relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease }}
              >
                <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${user.avatar} opacity-40 blur-lg`} />
                <div className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${user.avatar} text-2xl font-black text-white shadow-2xl ring-2 ring-black`}>
                  {firstName.charAt(0)}
                </div>
              </motion.div>
              <div>
                <motion.h1
                  className="text-3xl font-bold tracking-tight text-white md:text-4xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease }}
                >
                  Bienvenue,{" "}
                  <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                    {firstName}
                  </span>
                </motion.h1>
                <motion.p
                  className="mt-1 text-sm text-neutral-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  Voici ce qui se passe dans le showbiz africain aujourd&apos;hui
                </motion.p>
              </div>
            </div>

            {/* Quick actions */}
            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease }}
            >
              <Link
                href="/profile/edit"
                className="group flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/40 px-5 py-2.5 text-xs font-medium text-neutral-300 transition-all duration-300 hover:border-amber-400/30 hover:bg-neutral-900/70 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3.5 w-3.5 text-neutral-500 transition-colors group-hover:text-amber-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                </svg>
                Mon profil
              </Link>
              <Link
                href="/networking"
                className="group flex items-center gap-2 rounded-xl border border-purple-400/20 bg-purple-400/5 px-5 py-2.5 text-xs font-medium text-purple-300 transition-all duration-300 hover:border-purple-400/40 hover:bg-purple-400/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3.5 w-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                </svg>
                Trouver un mentor
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ CONTENU PRINCIPAL ═══════════════ */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-8 lg:grid-cols-3">

          {/* ───── COLONNE PRINCIPALE (2/3) ───── */}
          <div className="space-y-20 lg:col-span-2">

            {/* ── SECTION : Opportunités à la une ── */}
            <section>
              <AnimateIn>
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                      Pour vous
                    </span>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
                      Opportunités à la une
                    </h2>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-neutral-400">
                      Les castings, campagnes et collaborations sélectionnés pour votre profil.
                    </p>
                  </div>
                  <Link href="/events" className="group flex items-center gap-2 text-sm font-medium text-amber-400 transition-colors hover:text-amber-300">
                    Tout voir
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4 transition-transform group-hover:translate-x-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </AnimateIn>

              <Stagger className="mt-8 grid gap-6 md:grid-cols-3">
                {OPPORTUNITIES.map((opp) => (
                  <StaggerItem key={opp.id} variants={fadeUp}>
                    <motion.div
                      className="group relative overflow-hidden rounded-2xl border border-neutral-800/50 bg-neutral-900/30 transition-all duration-500 hover:border-neutral-700 hover:shadow-2xl hover:shadow-amber-900/10"
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Gradient header */}
                      <div className="relative h-32 overflow-hidden">
                        <div className={`h-full w-full bg-gradient-to-br ${opp.gradient} transition-transform duration-700 group-hover:scale-110`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 to-transparent" />
                        {opp.hot && (
                          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 backdrop-blur-md">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />
                            <span className="text-[9px] font-bold text-red-400">HOT</span>
                          </div>
                        )}
                        <div className="absolute bottom-3 left-3">
                          <span className="rounded-full bg-amber-400/20 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-amber-400 backdrop-blur-sm">
                            {opp.type}
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="text-sm font-bold leading-snug text-white">
                          {opp.title}
                        </h3>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {opp.tags.map((tag) => (
                            <span key={tag} className="rounded-full border border-neutral-800 bg-white/[0.02] px-2.5 py-1 text-[9px] text-neutral-500">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="flex items-center gap-1 text-[10px] text-neutral-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3 w-3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {opp.deadline}
                          </span>
                          <button className="rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-1.5 text-[10px] font-bold text-black transition-all hover:from-amber-300 hover:to-amber-400 hover:shadow-lg hover:shadow-amber-400/20">
                            Postuler
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </Stagger>
            </section>

            {/* ── SECTION : Fil Média ── */}
            <section>
              <AnimateIn>
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                      Éditorial &amp; Tendances
                    </span>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
                      Votre fil d&apos;actualité
                    </h2>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-neutral-400">
                      Les histoires, portraits et tendances qui comptent dans l&apos;industrie.
                    </p>
                  </div>
                  <Link href="/editorial" className="group flex items-center gap-2 text-sm font-medium text-amber-400 transition-colors hover:text-amber-300">
                    Média Hub
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4 transition-transform group-hover:translate-x-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </AnimateIn>

              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                {/* Article principal */}
                <AnimateIn variants={fadeLeft}>
                  <motion.div
                    className="group relative overflow-hidden rounded-2xl border border-neutral-800/50 bg-neutral-900/30 transition-all duration-500 hover:border-neutral-700 hover:shadow-2xl hover:shadow-purple-900/10"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative h-full min-h-[280px] overflow-hidden">
                      <div className={`h-full w-full bg-gradient-to-br ${MEDIA_FEED[0].image} transition-transform duration-700 group-hover:scale-105`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <div className="mb-3 flex items-center gap-3">
                          <span className="rounded-full bg-amber-400/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-400 backdrop-blur-sm">
                            {MEDIA_FEED[0].type}
                          </span>
                          <span className="text-[11px] text-neutral-400">{MEDIA_FEED[0].readTime}</span>
                        </div>
                        <h3 className="text-lg font-bold leading-tight text-white md:text-xl">{MEDIA_FEED[0].title}</h3>
                        <p className="mt-2 text-xs text-neutral-400">{MEDIA_FEED[0].source} · Il y a {MEDIA_FEED[0].time}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimateIn>

                {/* Articles secondaires */}
                <AnimateIn variants={fadeRight} className="flex flex-col gap-4">
                  {MEDIA_FEED.slice(1).map((article, i) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.15 * i, ease }}
                      whileHover={{ x: 4 }}
                    >
                      <Link
                        href="/editorial"
                        className="group flex gap-4 rounded-2xl border border-neutral-800/50 bg-neutral-900/30 p-4 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/60"
                      >
                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl">
                          <div className={`h-full w-full bg-gradient-to-br ${article.image} transition-transform duration-500 group-hover:scale-110`} />
                        </div>
                        <div className="flex flex-1 flex-col justify-center">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">{article.type}</span>
                            <span className="text-neutral-700">·</span>
                            <span className="text-[10px] text-neutral-500">{article.readTime}</span>
                          </div>
                          <h3 className="mt-1 text-sm font-semibold leading-snug text-white transition-colors group-hover:text-amber-400">
                            {article.title}
                          </h3>
                          <p className="mt-1 text-[10px] text-neutral-600">{article.source} · Il y a {article.time}</p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimateIn>
              </div>
            </section>
          </div>

          {/* ───── SIDEBAR (1/3) ───── */}
          <div className="space-y-8">

            {/* ── Profil completion ── */}
            <AnimateIn variants={scaleUp} delay={0.2}>
              <div className="relative overflow-hidden rounded-2xl border border-neutral-800/50 bg-neutral-900/30 p-6">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-400/[0.05] blur-2xl" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-white">
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-amber-400/10 text-[9px]">✦</span>
                      Mon profil
                    </h3>
                    <Link href="/profile" className="text-[10px] font-medium text-amber-400 transition hover:text-amber-300">Voir →</Link>
                  </div>

                  {/* Gauge circulaire */}
                  <div className="my-5 flex items-center justify-center">
                    <div className="relative">
                      <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="5" />
                        <circle
                          cx="50" cy="50" r="42" fill="none"
                          stroke={completionPct === 100 ? "#10b981" : "#f59e0b"}
                          strokeWidth="5" strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 42}`}
                          strokeDashoffset={`${2 * Math.PI * 42 * (1 - completionPct / 100)}`}
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-black text-white">{completionPct}%</span>
                        <span className="text-[8px] text-neutral-500">complété</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {completionItems.map((item) => (
                      <div key={item.label} className="flex items-center justify-between">
                        <span className="text-[10px] text-neutral-500">{item.label}</span>
                        {item.done ? (
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400/10 text-[8px] text-emerald-400">✓</span>
                        ) : (
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-neutral-800/40 text-[8px] text-neutral-600">—</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {completionPct < 100 && (
                    <Link
                      href="/profile/edit"
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 py-2.5 text-[11px] font-bold text-black transition-all hover:from-amber-300 hover:to-amber-400 hover:shadow-lg hover:shadow-amber-400/20"
                    >
                      Compléter mon profil
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3 w-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </AnimateIn>

            {/* ── Mentors suggérés ── */}
            <AnimateIn variants={scaleUp} delay={0.35}>
              <div className="relative overflow-hidden rounded-2xl border border-neutral-800/50 bg-neutral-900/30 p-6">
                <div className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-purple-400/[0.05] blur-2xl" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-white">
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-purple-400/10 text-[9px]">🎓</span>
                      Mentors pour vous
                    </h3>
                    <Link href="/networking" className="text-[10px] font-medium text-purple-400 transition hover:text-purple-300">Voir tout →</Link>
                  </div>

                  <div className="mt-5 space-y-3">
                    {SUGGESTED_MENTORS.map((mentor, i) => (
                      <motion.div
                        key={mentor.name}
                        className="group flex items-center gap-3 rounded-xl border border-neutral-800/30 bg-neutral-900/20 p-3 transition-all duration-300 hover:border-purple-400/20 hover:bg-neutral-900/50"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="relative">
                          <div className={`absolute -inset-0.5 rounded-xl bg-gradient-to-br ${mentor.avatar} opacity-0 blur-sm transition-opacity group-hover:opacity-50`} />
                          <div className={`relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${mentor.avatar} text-xs font-bold text-white`}>
                            {mentor.name.charAt(0)}
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-semibold text-white">{mentor.name}</p>
                          <p className="flex items-center gap-1 truncate text-[9px] text-neutral-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-2.5 w-2.5 flex-shrink-0">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            {mentor.location}
                          </p>
                        </div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                          <Link href="/networking" className="rounded-lg border border-purple-400/20 bg-purple-400/5 px-3 py-1.5 text-[9px] font-semibold text-purple-400 transition-all hover:border-purple-400/40 hover:bg-purple-400/10">
                            Voir
                          </Link>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimateIn>

            {/* ── Événements à venir ── */}
            <AnimateIn variants={scaleUp} delay={0.5}>
              <div className="relative overflow-hidden rounded-2xl border border-neutral-800/50 bg-neutral-900/30 p-6">
                <div className="absolute -right-8 -bottom-8 h-24 w-24 rounded-full bg-emerald-400/[0.05] blur-2xl" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-white">
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-400/10 text-[9px]">📅</span>
                      Prochains événements
                    </h3>
                    <Link href="/events" className="text-[10px] font-medium text-amber-400 transition hover:text-amber-300">Tous →</Link>
                  </div>

                  <div className="mt-5 space-y-3">
                    {UPCOMING_EVENTS.map((event) => (
                      <motion.div
                        key={event.title}
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link href="/events" className="group flex items-center gap-3 rounded-xl border border-neutral-800/30 bg-neutral-900/20 p-3 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/50">
                          <div className={`relative flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl`}>
                            <div className={`absolute inset-0 bg-gradient-to-br ${event.gradient} transition-transform duration-500 group-hover:scale-110`} />
                            <div className="relative text-center">
                              <p className="text-[8px] font-bold uppercase text-amber-200/80">{event.date.split(" ")[1]}</p>
                              <p className="text-sm font-black leading-none text-white">{event.date.split(" ")[0]}</p>
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-semibold text-white transition-colors group-hover:text-amber-400">{event.title}</p>
                            <p className="flex items-center gap-1 text-[9px] text-neutral-500">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-2.5 w-2.5 flex-shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                              </svg>
                              {event.location}
                            </p>
                          </div>
                          {event.exclusive && (
                            <div className="flex items-center gap-1 rounded-full bg-amber-400/10 px-2 py-0.5">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-2.5 w-2.5 text-amber-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                              </svg>
                              <span className="text-[7px] font-bold text-amber-400">VIP</span>
                            </div>
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimateIn>

          </div>
        </div>
      </div>
    </div>
  );
}
