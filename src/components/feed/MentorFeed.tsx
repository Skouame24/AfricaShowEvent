"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { AnimateIn, Stagger, StaggerItem, fadeUp, fadeLeft, fadeRight, scaleUp } from "@/components/ui/AnimateIn";

const ease = [0.25, 0.4, 0.25, 1] as const;

/* ── Mock data ── */
const PENDING_REQUESTS = [
  {
    id: "1",
    name: "Amara Diallo",
    title: "Chanteuse & Auteure",
    avatar: "from-purple-600 to-pink-500",
    message: "J'aimerais bénéficier de vos conseils en direction artistique pour mon prochain album.",
    date: "Il y a 2h",
    domain: "Direction artistique",
    location: "Dakar, Sénégal",
  },
  {
    id: "2",
    name: "Kofi Mensah",
    title: "Réalisateur",
    avatar: "from-amber-600 to-red-500",
    message: "Je cherche un mentor pour me guider dans la production de documentaires sur la culture africaine.",
    date: "Il y a 6h",
    domain: "Production",
    location: "Accra, Ghana",
  },
  {
    id: "3",
    name: "Fatou Keita",
    title: "Mannequin",
    avatar: "from-emerald-600 to-teal-500",
    message: "Conseils pour développer ma carrière de mannequin à l'international.",
    date: "Hier",
    domain: "Carrière internationale",
    location: "Abidjan, Côte d'Ivoire",
  },
];

const MY_MENTEES = [
  {
    name: "Yemi Adebayo",
    title: "Producteur Musical",
    avatar: "from-blue-600 to-violet-500",
    progress: 65,
    lastActive: "Actif il y a 1h",
    sessions: 4,
    gradient: "from-blue-600 to-violet-800",
  },
  {
    name: "Chioma Eze",
    title: "Danseuse & Chorégraphe",
    avatar: "from-pink-500 to-rose-400",
    progress: 40,
    lastActive: "Actif il y a 3h",
    sessions: 2,
    gradient: "from-pink-600 to-rose-800",
  },
];

const MEDIA_FEED = [
  { id: "1", type: "Guide", title: "Le mentorat dans l'industrie musicale africaine : état des lieux", source: "ASR Éditorial", time: "3h", image: "from-purple-700 to-indigo-900", readTime: "10 min" },
  { id: "2", type: "Conseil", title: "Comment encadrer un talent émergent : guide du mentor", source: "ASR Guide", time: "8h", image: "from-emerald-700 to-teal-900", readTime: "7 min" },
  { id: "3", type: "Reportage", title: "Success story : de mentoré à star continentale", source: "ASR Portrait", time: "1j", image: "from-amber-700 to-red-900", readTime: "5 min" },
];

export function MentorFeed() {
  const { user } = useAuth();
  if (!user) return null;

  const firstName = user.fullName.split(" ")[0];

  return (
    <div className="relative">
      {/* ── Background ambiance ── */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -left-40 top-0 h-[700px] w-[600px] rounded-full bg-purple-600/[0.05] blur-[160px]" />
        <div className="absolute right-0 top-[20%] h-[500px] w-[400px] rounded-full bg-amber-600/[0.04] blur-[140px]" />
        <div className="absolute left-1/3 bottom-0 h-[400px] w-[500px] rounded-full bg-purple-500/[0.03] blur-[120px]" />
      </div>

      {/* ═══════════════ HERO WELCOME ═══════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[200px] w-[2px] -translate-x-1/2 bg-gradient-to-b from-purple-400/30 to-transparent" />
          <div className="absolute left-[20%] top-0 h-[150px] w-[1px] origin-top rotate-[15deg] bg-gradient-to-b from-amber-400/10 to-transparent" />
          <div className="absolute right-[20%] top-0 h-[150px] w-[1px] origin-top -rotate-[15deg] bg-gradient-to-b from-amber-400/10 to-transparent" />
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
                  Bonjour,{" "}
                  <span className="bg-gradient-to-r from-purple-300 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                    {firstName}
                  </span>
                </motion.h1>
                <motion.p
                  className="mt-1 text-sm text-neutral-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  Vos mentorés et demandes de mentorat
                </motion.p>
              </div>
            </div>

            {/* Stats rapides */}
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease }}
            >
              {[
                { value: PENDING_REQUESTS.length, label: "Nouvelles demandes", color: "purple" },
                { value: MY_MENTEES.length, label: "Mentorés actifs", color: "emerald" },
                { value: "4.9", label: "Note moyenne", color: "amber" },
              ].map((stat) => (
                <div key={stat.label} className={`rounded-xl border border-neutral-800/50 bg-neutral-900/30 px-5 py-3 text-center`}>
                  <p className={`text-xl font-black text-${stat.color}-400`}>{stat.value}</p>
                  <p className="text-[8px] font-medium uppercase tracking-wider text-neutral-600">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ CONTENU PRINCIPAL ═══════════════ */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-8 lg:grid-cols-3">

          {/* ───── COLONNE PRINCIPALE (2/3) ───── */}
          <div className="space-y-20 lg:col-span-2">

            {/* ── SECTION : Demandes de mentorat ── */}
            <section>
              <AnimateIn>
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400">
                      Nouvelles demandes
                    </span>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
                      Talents qui vous sollicitent
                    </h2>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-neutral-400">
                      Ces talents souhaitent bénéficier de votre expertise et accompagnement.
                    </p>
                  </div>
                  <Link href="/profile/requests" className="group flex items-center gap-2 text-sm font-medium text-purple-400 transition-colors hover:text-purple-300">
                    Voir tout
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-500/20 text-[10px] font-bold text-purple-400">{PENDING_REQUESTS.length}</span>
                  </Link>
                </div>
              </AnimateIn>

              <Stagger className="mt-8 space-y-4">
                {PENDING_REQUESTS.map((req, i) => (
                  <StaggerItem key={req.id} variants={fadeUp}>
                    <motion.div
                      className="group relative overflow-hidden rounded-2xl border border-neutral-800/50 bg-neutral-900/30 transition-all duration-500 hover:border-purple-400/20 hover:shadow-2xl hover:shadow-purple-900/10"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Accent line gauche */}
                      <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-purple-400/60 via-purple-400/20 to-transparent" />

                      <div className="p-6 pl-7">
                        <div className="flex items-start gap-4">
                          {/* Avatar */}
                          <div className="relative flex-shrink-0">
                            <div className={`absolute -inset-0.5 rounded-xl bg-gradient-to-br ${req.avatar} opacity-0 blur-sm transition-opacity group-hover:opacity-40`} />
                            <div className={`relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${req.avatar} text-sm font-bold text-white shadow-lg`}>
                              {req.name.charAt(0)}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-sm font-bold text-white">{req.name}</h3>
                              <span className="rounded-full bg-neutral-800/60 px-2 py-0.5 text-[9px] font-medium text-neutral-400">{req.title}</span>
                            </div>
                            <p className="mt-1.5 text-xs leading-relaxed text-neutral-400 line-clamp-2">
                              &ldquo;{req.message}&rdquo;
                            </p>
                            <div className="mt-3 flex flex-wrap items-center gap-3">
                              <span className="flex items-center gap-1 text-[9px] text-neutral-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-2.5 w-2.5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                                {req.location}
                              </span>
                              <span className="rounded-full bg-purple-400/5 px-2 py-0.5 text-[9px] text-purple-400/60">{req.domain}</span>
                              <span className="text-[9px] text-neutral-700">{req.date}</span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-shrink-0 flex-col gap-2">
                            <motion.button
                              className="rounded-xl bg-gradient-to-r from-purple-500 to-violet-500 px-4 py-2 text-[10px] font-bold text-white shadow-lg shadow-purple-500/10 transition-all hover:shadow-purple-500/20"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.97 }}
                            >
                              Accepter
                            </motion.button>
                            <button className="rounded-xl border border-neutral-800 bg-neutral-900/40 px-4 py-2 text-[10px] font-medium text-neutral-500 transition-all hover:border-neutral-700 hover:text-neutral-300">
                              Voir profil
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </Stagger>
            </section>

            {/* ── SECTION : Mes mentorés ── */}
            <section>
              <AnimateIn>
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                      Suivi actif
                    </span>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
                      Vos mentorés
                    </h2>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-neutral-400">
                      Suivez la progression et planifiez vos prochaines sessions.
                    </p>
                  </div>
                  <Link href="/profile/mentees" className="group flex items-center gap-2 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300">
                    Tout voir
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4 transition-transform group-hover:translate-x-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </AnimateIn>

              <Stagger className="mt-8 grid gap-6 md:grid-cols-2">
                {MY_MENTEES.map((mentee) => (
                  <StaggerItem key={mentee.name} variants={scaleUp}>
                    <motion.div
                      className="group relative overflow-hidden rounded-2xl border border-neutral-800/50 bg-neutral-900/30 transition-all duration-500 hover:border-emerald-400/20 hover:shadow-2xl hover:shadow-emerald-900/10"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Header gradient */}
                      <div className="relative h-24 overflow-hidden">
                        <div className={`h-full w-full bg-gradient-to-br ${mentee.gradient} transition-transform duration-700 group-hover:scale-110`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 to-transparent" />
                        <div className="absolute bottom-3 left-4 flex items-center gap-3">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${mentee.avatar} text-xs font-bold text-white shadow-lg ring-2 ring-black`}>
                            {mentee.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{mentee.name}</p>
                            <p className="text-[10px] text-neutral-400">{mentee.title}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-5">
                        {/* Progression */}
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-medium uppercase tracking-wider text-neutral-500">Progression</span>
                          <span className="font-bold text-emerald-400">{mentee.progress}%</span>
                        </div>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-800/60">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${mentee.progress}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease }}
                          />
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-3 text-[9px] text-neutral-600">
                            <span className="flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                              {mentee.lastActive}
                            </span>
                            <span>{mentee.sessions} sessions</span>
                          </div>
                          <button className="rounded-lg border border-neutral-700 bg-neutral-800/40 px-3 py-1.5 text-[9px] font-semibold text-neutral-300 transition-all hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-emerald-400">
                            Planifier
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
                      Éditorial &amp; Ressources
                    </span>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
                      Pour enrichir votre pratique
                    </h2>
                  </div>
                  <Link href="/editorial" className="group flex items-center gap-2 text-sm font-medium text-amber-400 transition-colors hover:text-amber-300">
                    Média Hub
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4 transition-transform group-hover:translate-x-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </AnimateIn>

              <Stagger className="mt-8 grid gap-6 md:grid-cols-3">
                {MEDIA_FEED.map((article) => (
                  <StaggerItem key={article.id} variants={fadeUp}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link href="/editorial" className="group relative block overflow-hidden rounded-2xl border border-neutral-800/50 bg-neutral-900/30 transition-all duration-500 hover:border-neutral-700 hover:shadow-2xl hover:shadow-amber-900/10">
                        <div className="relative h-36 overflow-hidden">
                          <div className={`h-full w-full bg-gradient-to-br ${article.image} transition-transform duration-700 group-hover:scale-110`} />
                          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent" />
                          <div className="absolute bottom-3 left-3 flex items-center gap-2">
                            <span className="rounded-full bg-amber-400/20 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-amber-400 backdrop-blur-sm">{article.type}</span>
                            <span className="text-[9px] text-neutral-400">{article.readTime}</span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="text-xs font-bold leading-snug text-white transition-colors group-hover:text-amber-400">{article.title}</h3>
                          <p className="mt-2 text-[9px] text-neutral-600">{article.source} · Il y a {article.time}</p>
                        </div>
                      </Link>
                    </motion.div>
                  </StaggerItem>
                ))}
              </Stagger>
            </section>
          </div>

          {/* ───── SIDEBAR (1/3) ───── */}
          <div className="space-y-8">

            {/* ── Disponibilité ── */}
            <AnimateIn variants={scaleUp} delay={0.2}>
              <div className="relative overflow-hidden rounded-2xl border border-neutral-800/50 bg-neutral-900/30 p-6">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-400/[0.05] blur-2xl" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-white">
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-400/10 text-[9px]">📅</span>
                      Ma disponibilité
                    </h3>
                    <Link href="/profile/availability" className="text-[10px] font-medium text-purple-400 transition hover:text-purple-300">Modifier →</Link>
                  </div>

                  <div className="mt-4 flex items-center gap-3 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.03] p-4">
                    <div className="relative">
                      <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400/30" />
                      <div className="relative h-3 w-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/30" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-emerald-400">Disponible</p>
                      <p className="text-[9px] text-neutral-500">Prêt à accepter de nouveaux mentorés</p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2.5">
                    {[
                      { day: "Lundi", hours: "14h — 18h" },
                      { day: "Mercredi", hours: "10h — 12h" },
                      { day: "Vendredi", hours: "14h — 17h" },
                    ].map((slot) => (
                      <div key={slot.day} className="flex items-center justify-between rounded-lg bg-neutral-800/10 px-3 py-2">
                        <span className="text-[10px] font-medium text-neutral-400">{slot.day}</span>
                        <span className="text-[10px] font-semibold text-neutral-300">{slot.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimateIn>

            {/* ── Statistiques ── */}
            <AnimateIn variants={scaleUp} delay={0.35}>
              <div className="relative overflow-hidden rounded-2xl border border-neutral-800/50 bg-neutral-900/30 p-6">
                <div className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-purple-400/[0.05] blur-2xl" />
                <div className="relative">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-white">
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-amber-400/10 text-[9px]">📊</span>
                    Vos performances
                  </h3>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {[
                      { label: "Mentorés total", value: "8", gradient: "from-purple-500 to-violet-500" },
                      { label: "Sessions ce mois", value: "12", gradient: "from-emerald-500 to-teal-500" },
                      { label: "Taux acceptation", value: "85%", gradient: "from-amber-500 to-orange-500" },
                      { label: "Note moyenne", value: "4.9", gradient: "from-blue-500 to-indigo-500" },
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

            {/* ── Événements ── */}
            <AnimateIn variants={scaleUp} delay={0.5}>
              <div className="relative overflow-hidden rounded-2xl border border-neutral-800/50 bg-neutral-900/30 p-6">
                <div className="absolute -right-8 -bottom-8 h-24 w-24 rounded-full bg-amber-400/[0.05] blur-2xl" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-white">
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-amber-400/10 text-[9px]">🎤</span>
                      Événements
                    </h3>
                    <Link href="/events" className="text-[10px] font-medium text-amber-400 transition hover:text-amber-300">Tous →</Link>
                  </div>
                  <div className="mt-5 space-y-3">
                    {[
                      { title: "Workshop Mentorat ASR", date: "20 Mars", gradient: "from-purple-600 to-indigo-800" },
                      { title: "Panel : Industrie Musicale", date: "28 Mars", gradient: "from-amber-600 to-orange-800" },
                      { title: "AfroVibes Festival", date: "15 Avril", gradient: "from-emerald-600 to-teal-800" },
                    ].map((event) => (
                      <motion.div key={event.title} whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                        <Link href="/events" className="group flex items-center gap-3 rounded-xl border border-neutral-800/30 bg-neutral-900/20 p-3 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/50">
                          <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg">
                            <div className={`absolute inset-0 bg-gradient-to-br ${event.gradient} transition-transform duration-500 group-hover:scale-110`} />
                            <span className="relative text-[10px] font-black text-white">{event.date.split(" ")[0]}</span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-semibold text-white transition-colors group-hover:text-amber-400">{event.title}</p>
                            <p className="text-[9px] text-neutral-500">{event.date}</p>
                          </div>
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
