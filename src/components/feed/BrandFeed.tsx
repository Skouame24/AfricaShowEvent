"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { AnimateIn, Stagger, StaggerItem, fadeUp, fadeLeft, fadeRight, scaleUp } from "@/components/ui/AnimateIn";

const ease = [0.25, 0.4, 0.25, 1] as const;

/* ── Mock data ── */
const FEATURED_TALENTS = [
  {
    id: "1",
    name: "Amara Diallo",
    title: "Chanteuse & Auteure",
    avatar: "from-purple-600 to-pink-500",
    location: "Dakar, Sénégal",
    match: 95,
    skills: ["Afrobeats", "Soul", "Composition"],
    curated: true,
  },
  {
    id: "2",
    name: "Kofi Mensah",
    title: "Réalisateur & Photographe",
    avatar: "from-amber-600 to-red-500",
    location: "Accra, Ghana",
    match: 88,
    skills: ["Clip vidéo", "Mode", "Documentaire"],
    curated: true,
  },
  {
    id: "3",
    name: "Fatou Keita",
    title: "Mannequin & Influenceuse",
    avatar: "from-emerald-600 to-teal-500",
    location: "Abidjan, Côte d'Ivoire",
    match: 82,
    skills: ["Haute couture", "Campagne digitale"],
    curated: false,
  },
  {
    id: "4",
    name: "Yemi Adebayo",
    title: "Producteur Musical",
    avatar: "from-blue-600 to-violet-500",
    location: "Lagos, Nigeria",
    match: 78,
    skills: ["Afrobeats", "Amapiano"],
    curated: false,
  },
];

const TRENDS = [
  { id: "1", type: "Analyse", title: "L'Afrobeats domine les charts mondiaux pour le 3e trimestre consécutif", source: "ASR Business", time: "2h", image: "from-amber-700 to-red-900", readTime: "8 min", hot: true },
  { id: "2", type: "Marché", title: "La mode africaine : un marché à $31 milliards en 2026", source: "ASR Analyse", time: "5h", image: "from-blue-700 to-indigo-900", readTime: "12 min", hot: true },
  { id: "3", type: "Stratégie", title: "Nollywood sur Netflix : pourquoi les marques doivent s'y intéresser", source: "ASR Éditorial", time: "8h", image: "from-purple-700 to-violet-900", readTime: "6 min", hot: false },
];

const SPONSORABLE_EVENTS = [
  { title: "AfroVibes Festival 2026", date: "15 Mars", location: "Dakar", attendees: "5 000+", type: "Festival", gradient: "from-amber-600 to-orange-800", exclusive: true },
  { title: "Lagos Fashion Week", date: "22 Mars", location: "Lagos", attendees: "3 000+", type: "Mode", gradient: "from-purple-600 to-indigo-800", exclusive: false },
  { title: "Creative Africa Summit", date: "5 Avril", location: "Nairobi", attendees: "2 000+", type: "Business", gradient: "from-emerald-600 to-teal-800", exclusive: true },
];

export function BrandFeed() {
  const { user } = useAuth();
  if (!user) return null;

  const firstName = user.fullName.split(" ")[0];

  return (
    <div className="relative">
      {/* ── Background ambiance ── */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -left-40 top-0 h-[700px] w-[600px] rounded-full bg-blue-600/[0.04] blur-[160px]" />
        <div className="absolute right-0 top-[20%] h-[500px] w-[400px] rounded-full bg-cyan-600/[0.04] blur-[140px]" />
        <div className="absolute left-1/3 bottom-0 h-[400px] w-[500px] rounded-full bg-blue-500/[0.03] blur-[120px]" />
      </div>

      {/* ═══════════════ HERO WELCOME ═══════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[200px] w-[2px] -translate-x-1/2 bg-gradient-to-b from-blue-400/30 to-transparent" />
          <div className="absolute left-[25%] top-0 h-[120px] w-[1px] origin-top rotate-[12deg] bg-gradient-to-b from-cyan-400/10 to-transparent" />
          <div className="absolute right-[25%] top-0 h-[120px] w-[1px] origin-top -rotate-[12deg] bg-gradient-to-b from-cyan-400/10 to-transparent" />
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
                  <span className="bg-gradient-to-r from-blue-300 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {firstName}
                  </span>
                </motion.h1>
                <motion.p
                  className="mt-1 text-sm text-neutral-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  Découvrez les talents et tendances du showbiz africain
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
                href="/talents"
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-500/10 transition-all hover:shadow-blue-500/20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3.5 w-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                Explorer les talents
              </Link>
              <Link
                href="/events"
                className="group flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/40 px-5 py-2.5 text-xs font-medium text-neutral-300 transition-all duration-300 hover:border-cyan-400/30 hover:bg-neutral-900/70 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3.5 w-3.5 text-neutral-500 transition-colors group-hover:text-cyan-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                Événements
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

            {/* ── SECTION : Talents recommandés ── */}
            <section>
              <AnimateIn>
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                      Sélection pour vous
                    </span>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
                      Talents recommandés
                    </h2>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-neutral-400">
                      Profils créatifs sélectionnés en fonction de votre secteur et de vos recherches.
                    </p>
                  </div>
                  <Link href="/talents" className="group flex items-center gap-2 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300">
                    Tous les talents
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4 transition-transform group-hover:translate-x-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </AnimateIn>

              <Stagger className="mt-8 grid gap-6 sm:grid-cols-2">
                {FEATURED_TALENTS.map((talent) => (
                  <StaggerItem key={talent.id} variants={fadeUp}>
                    <motion.div
                      className="group relative overflow-hidden rounded-2xl border border-neutral-800/50 bg-neutral-900/30 transition-all duration-500 hover:border-blue-400/20 hover:shadow-2xl hover:shadow-blue-900/10"
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Header avec avatar */}
                      <div className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="relative">
                            <div className={`absolute -inset-1 rounded-xl bg-gradient-to-br ${talent.avatar} opacity-0 blur-md transition-opacity group-hover:opacity-40`} />
                            <div className={`relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${talent.avatar} text-lg font-bold text-white shadow-lg`}>
                              {talent.name.charAt(0)}
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-bold text-white">{talent.name}</h3>
                              {talent.curated && (
                                <span className="flex items-center gap-0.5 text-[8px] font-bold text-amber-400">✦ Curated</span>
                              )}
                            </div>
                            <p className="text-[11px] text-neutral-400">{talent.title}</p>
                            <p className="mt-1 flex items-center gap-1 text-[9px] text-neutral-600">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-2.5 w-2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                              </svg>
                              {talent.location}
                            </p>
                          </div>
                          {/* Match score */}
                          <div className="flex-shrink-0 text-center">
                            <div className="relative">
                              <svg className="h-12 w-12 -rotate-90" viewBox="0 0 48 48">
                                <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="3" />
                                <circle
                                  cx="24" cy="24" r="20" fill="none"
                                  stroke="#3b82f6"
                                  strokeWidth="3" strokeLinecap="round"
                                  strokeDasharray={`${2 * Math.PI * 20}`}
                                  strokeDashoffset={`${2 * Math.PI * 20 * (1 - talent.match / 100)}`}
                                />
                              </svg>
                              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-blue-400">{talent.match}%</span>
                            </div>
                            <p className="mt-0.5 text-[7px] uppercase tracking-wider text-neutral-600">match</p>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {talent.skills.map((skill) => (
                            <span key={skill} className="rounded-full border border-neutral-800 bg-white/[0.02] px-2.5 py-1 text-[9px] text-neutral-500 transition-all hover:border-blue-400/20 hover:text-blue-400">
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="mt-5 flex gap-2">
                          <motion.button
                            className="flex-1 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 py-2.5 text-[10px] font-bold text-white shadow-lg shadow-blue-500/10 transition-all hover:shadow-blue-500/20"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Contacter via ASR
                          </motion.button>
                          <button className="rounded-xl border border-neutral-700 bg-neutral-800/40 px-4 py-2.5 text-[10px] font-semibold text-neutral-300 transition-all hover:border-neutral-600 hover:text-white">
                            Profil
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </Stagger>
            </section>

            {/* ── SECTION : Tendances & Insights ── */}
            <section>
              <AnimateIn>
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                      Business &amp; Insights
                    </span>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
                      Tendances du marché
                    </h2>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-neutral-400">
                      Analyses et données pour guider vos décisions marketing sur le continent.
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
                    className="group relative overflow-hidden rounded-2xl border border-neutral-800/50 bg-neutral-900/30 transition-all duration-500 hover:border-neutral-700 hover:shadow-2xl hover:shadow-amber-900/10"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative h-full min-h-[280px] overflow-hidden">
                      <div className={`h-full w-full bg-gradient-to-br ${TRENDS[0].image} transition-transform duration-700 group-hover:scale-105`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                      {TRENDS[0].hot && (
                        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 backdrop-blur-md">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />
                          <span className="text-[9px] font-bold text-red-400">TRENDING</span>
                        </div>
                      )}
                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <div className="mb-3 flex items-center gap-3">
                          <span className="rounded-full bg-amber-400/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-400 backdrop-blur-sm">
                            {TRENDS[0].type}
                          </span>
                          <span className="text-[11px] text-neutral-400">{TRENDS[0].readTime}</span>
                        </div>
                        <h3 className="text-lg font-bold leading-tight text-white md:text-xl">{TRENDS[0].title}</h3>
                        <p className="mt-2 text-xs text-neutral-400">{TRENDS[0].source} · Il y a {TRENDS[0].time}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimateIn>

                {/* Articles secondaires */}
                <AnimateIn variants={fadeRight} className="flex flex-col gap-4">
                  {TRENDS.slice(1).map((article, i) => (
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
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl">
                          <div className={`h-full w-full bg-gradient-to-br ${article.image} transition-transform duration-500 group-hover:scale-110`} />
                          {article.hot && (
                            <div className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500/80">
                              <span className="text-[6px] font-black text-white">🔥</span>
                            </div>
                          )}
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

            {/* ── SECTION : Événements sponsorisables ── */}
            <section>
              <AnimateIn>
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                      Opportunités de sponsoring
                    </span>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
                      Événements à sponsoriser
                    </h2>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-neutral-400">
                      Les rendez-vous clés du showbiz africain ouverts au sponsoring.
                    </p>
                  </div>
                  <Link href="/events" className="group flex items-center gap-2 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300">
                    Tous les événements
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4 transition-transform group-hover:translate-x-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </AnimateIn>

              <Stagger className="mt-8 grid gap-6 md:grid-cols-3">
                {SPONSORABLE_EVENTS.map((event) => (
                  <StaggerItem key={event.title} variants={fadeUp}>
                    <motion.div
                      className="group relative overflow-hidden rounded-2xl border border-neutral-800/50 bg-neutral-900/30 transition-all duration-500 hover:border-neutral-700 hover:shadow-2xl hover:shadow-cyan-900/10"
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative h-36 overflow-hidden">
                        <div className={`h-full w-full bg-gradient-to-br ${event.gradient} transition-transform duration-700 group-hover:scale-110`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent" />
                        {event.exclusive && (
                          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 backdrop-blur-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3 w-3 text-amber-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                            </svg>
                            <span className="text-[9px] font-semibold text-amber-400">Premium</span>
                          </div>
                        )}
                        <div className="absolute bottom-3 left-3 rounded-xl bg-black/60 px-3 py-2 text-center backdrop-blur-md">
                          <p className="text-[9px] font-bold uppercase text-cyan-300">{event.date.split(" ")[1]}</p>
                          <p className="text-lg font-black leading-none text-white">{event.date.split(" ")[0]}</p>
                        </div>
                      </div>

                      <div className="p-5">
                        <span className="text-[9px] font-semibold uppercase tracking-wider text-cyan-400/70">{event.type}</span>
                        <h3 className="mt-1 text-sm font-bold leading-snug text-white">{event.title}</h3>
                        <div className="mt-3 space-y-1.5">
                          <div className="flex items-center gap-2 text-[10px] text-neutral-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3 w-3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            {event.location}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-neutral-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3 w-3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                            </svg>
                            {event.attendees} attendus
                          </div>
                        </div>
                        <button className="mt-4 w-full rounded-xl border border-neutral-700 bg-neutral-800/40 py-2.5 text-[10px] font-semibold text-neutral-300 transition-all hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-400">
                          Proposer un sponsoring
                        </button>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </Stagger>
            </section>
          </div>

          {/* ───── SIDEBAR (1/3) ───── */}
          <div className="space-y-8">

            {/* ── Demandes en cours ── */}
            <AnimateIn variants={scaleUp} delay={0.2}>
              <div className="relative overflow-hidden rounded-2xl border border-neutral-800/50 bg-neutral-900/30 p-6">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-400/[0.05] blur-2xl" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-white">
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-400/10 text-[9px]">📨</span>
                      Mes demandes
                    </h3>
                    <Link href="/profile/contacts" className="text-[10px] font-medium text-blue-400 transition hover:text-blue-300">Voir tout →</Link>
                  </div>
                  <div className="mt-5 space-y-3">
                    {[
                      { name: "Amara Diallo", status: "En attente", avatar: "from-purple-600 to-pink-500", date: "Il y a 1j" },
                      { name: "DJ Eclipse", status: "Accepté", avatar: "from-amber-600 to-red-500", date: "Il y a 3j" },
                      { name: "Fatou Keita", status: "En attente", avatar: "from-emerald-600 to-teal-500", date: "Il y a 5j" },
                    ].map((contact) => (
                      <div key={contact.name} className="flex items-center gap-3 rounded-xl border border-neutral-800/30 bg-neutral-900/20 p-3 transition-all hover:border-neutral-700">
                        <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${contact.avatar} text-[10px] font-bold text-white`}>
                          {contact.name.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[11px] font-semibold text-white">{contact.name}</p>
                          <p className="text-[8px] text-neutral-600">{contact.date}</p>
                        </div>
                        <span className={`rounded-full px-2 py-0.5 text-[8px] font-bold ${
                          contact.status === "Accepté"
                            ? "bg-emerald-400/10 text-emerald-400"
                            : "bg-amber-400/10 text-amber-400"
                        }`}>
                          {contact.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimateIn>

            {/* ── Statistiques ── */}
            <AnimateIn variants={scaleUp} delay={0.35}>
              <div className="relative overflow-hidden rounded-2xl border border-neutral-800/50 bg-neutral-900/30 p-6">
                <div className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-cyan-400/[0.05] blur-2xl" />
                <div className="relative">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-white">
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-amber-400/10 text-[9px]">📊</span>
                    En un coup d&apos;œil
                  </h3>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {[
                      { label: "Talents contactés", value: "14", gradient: "from-blue-500 to-cyan-500" },
                      { label: "Réponses reçues", value: "9", gradient: "from-emerald-500 to-teal-500" },
                      { label: "Événements suivis", value: "5", gradient: "from-amber-500 to-orange-500" },
                      { label: "Collaborations", value: "3", gradient: "from-purple-500 to-violet-500" },
                    ].map((stat) => (
                      <div key={stat.label} className="group relative overflow-hidden rounded-xl border border-neutral-800/30 bg-neutral-900/20 p-4 text-center transition-all hover:border-neutral-700">
                        <div className={`absolute -right-4 -top-4 h-12 w-12 rounded-full bg-gradient-to-br ${stat.gradient} opacity-0 blur-xl transition-opacity group-hover:opacity-10`} />
                        <p className="relative text-xl font-black text-white">{stat.value}</p>
                        <p className="relative mt-0.5 text-[8px] font-medium uppercase tracking-wider text-neutral-600">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimateIn>

            {/* ── CTA Premium ── */}
            <AnimateIn variants={scaleUp} delay={0.5}>
              <div className="relative overflow-hidden rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-900/20 via-neutral-900/40 to-cyan-900/20 p-6">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-400/10 blur-3xl" />
                <div className="relative text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-white">Accès Premium Marque</h3>
                  <p className="mt-2 text-[10px] leading-relaxed text-neutral-400">
                    Accédez aux profils vérifiés, aux analytics avancés et au matching IA pour vos campagnes.
                  </p>
                  <motion.button
                    className="mt-4 w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 py-2.5 text-[11px] font-bold text-white shadow-lg shadow-blue-500/10 transition-all hover:shadow-blue-500/20"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Découvrir Premium
                  </motion.button>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </div>
    </div>
  );
}
