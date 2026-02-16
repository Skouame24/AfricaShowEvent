"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<"bio" | "gallery" | "socials">("bio");

  useEffect(() => {
    if (!isLoading && !user) router.push("/auth/login");
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="relative">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-amber-400/20 border-t-amber-400" />
        </div>
      </div>
    );
  }

  const completionItems = [
    { label: "Titre", done: !!user.title },
    { label: "Bio", done: !!user.bio },
    { label: "Compétences", done: (user.skills?.length ?? 0) > 0 },
    { label: "Galerie", done: (user.gallery?.length ?? 0) > 0 },
    { label: "Réseaux", done: (user.socials?.length ?? 0) > 0 },
    { label: "Localisation", done: !!user.location },
  ];
  const completionPct = Math.round(
    (completionItems.filter((i) => i.done).length / completionItems.length) * 100
  );

  return (
    <div className="relative min-h-screen">
      {/* ═══ Background ═══ */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-amber-500/[0.03] blur-[150px]" />
        <div className="absolute -right-40 bottom-20 h-[400px] w-[400px] rounded-full bg-purple-600/[0.03] blur-[120px]" />
      </div>

      {/* ═══ Hero Cover ═══ */}
      <div className="relative z-10">
        {/* Gradient cover */}
        <div className="relative h-56 overflow-hidden md:h-72">
          <div className={`absolute inset-0 bg-gradient-to-br ${user.avatar} opacity-20`} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />

          {/* Formes décoratives */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute right-[10%] top-[20%] h-40 w-40 rounded-full border border-white/[0.03] animate-float" />
            <div className="absolute left-[15%] bottom-[10%] h-24 w-24 rounded-full border border-amber-400/[0.06] animate-float-delayed" />
            <div className="absolute right-[30%] top-[40%] h-2 w-2 rounded-full bg-amber-400/30 animate-float" />
            <div className="absolute left-[40%] top-[25%] h-1.5 w-1.5 rounded-full bg-purple-400/30 animate-float-delayed" />
          </div>

          {/* Grille */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />

          {/* Actions top right */}
          <div className="absolute right-6 top-6 flex items-center gap-3">
            <Link
              href="/profile/edit"
              className="group flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-xs font-medium text-white backdrop-blur-md transition-all hover:border-amber-400/30 hover:bg-black/50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3.5 w-3.5 transition-transform group-hover:rotate-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
              Modifier
            </Link>
          </div>
        </div>

        {/* ═══ Profil header ═══ */}
        <div className="relative z-20 mx-auto max-w-5xl px-6 -mt-20 md:-mt-24">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:gap-8">
            {/* Avatar */}
            <div className="animate-scale-in relative flex-shrink-0">
              <div className="relative">
                {/* Glow */}
                <div className={`absolute -inset-2 rounded-3xl bg-gradient-to-br ${user.avatar} opacity-30 blur-xl`} />
                <div className={`relative flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br ${user.avatar} text-4xl font-black text-white shadow-2xl ring-4 ring-black md:h-36 md:w-36`}>
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                {/* Online dot */}
                <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-[3px] border-black bg-emerald-400 shadow-lg shadow-emerald-400/30" />
              </div>
            </div>

            {/* Info */}
            <div className="animate-slide-up flex-1 pb-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{user.fullName}</h1>
                {user.verified && (
                  <div className="animate-bounce-in delay-300 flex items-center gap-1 rounded-full bg-blue-500/10 px-2.5 py-1 text-[10px] font-semibold text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                      <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.307 4.491 4.491 0 01-1.307-3.497A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307z" clipRule="evenodd" />
                    </svg>
                    Vérifié
                  </div>
                )}
              </div>
              {user.title && (
                <p className="mt-1 text-base text-amber-400 animate-slide-up delay-100">{user.title}</p>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-3 animate-slide-up delay-200">
                {user.location && (
                  <span className="flex items-center gap-1.5 text-xs text-neutral-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3.5 w-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                    {user.location}
                  </span>
                )}
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                  user.role === "admin" ? "bg-red-500/10 text-red-400" : user.role === "mentor" ? "bg-purple-500/10 text-purple-400" : user.role === "brand" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-400/10 text-amber-400"
                }`}>
                  {user.role === "admin" ? "Admin" : user.role === "mentor" ? "Mentor" : user.role === "brand" ? "Marque" : "Talent"}
                </span>
                {user.curated && (
                  <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400/10 to-orange-400/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-400">
                    ✦ Curated by ASR
                  </span>
                )}
              </div>
            </div>

            {/* CTA contact */}
            <div className="animate-slide-up delay-300 flex-shrink-0 pb-2">
              <button className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-3 text-sm font-bold text-black shadow-lg shadow-amber-400/20 transition-all duration-300 hover:from-amber-300 hover:to-amber-400 hover:shadow-xl hover:shadow-amber-400/30">
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  Contact via ASR
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Contenu ═══ */}
      <div className="relative z-10 mx-auto mt-10 max-w-5xl px-6 pb-20">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* ─── Colonne principale ─── */}
          <div className="space-y-8 lg:col-span-2">
            {/* Tabs */}
            <div className="animate-slide-up delay-400 flex items-center gap-1 rounded-xl border border-neutral-800/40 bg-neutral-900/20 p-1">
              {([
                { key: "bio" as const, label: "Bio & Skills", icon: "✦" },
                { key: "gallery" as const, label: "Galerie", icon: "📸" },
                { key: "socials" as const, label: "Réseaux", icon: "🌐" },
              ]).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-semibold transition-all duration-300 ${
                    activeTab === tab.key
                      ? "bg-amber-400/10 text-amber-400 shadow-sm shadow-amber-400/10"
                      : "text-neutral-500 hover:text-neutral-300"
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* ── Tab : Bio ── */}
            {activeTab === "bio" && (
              <div className="space-y-8 animate-fade-in">
                {/* Bio */}
                <section className="relative overflow-hidden rounded-2xl border border-neutral-800/40 bg-neutral-900/20 p-7">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-400/[0.03] blur-2xl" />
                  <div className="relative">
                    <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-white">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-400/10 text-[11px]">📝</span>
                      Biographie
                    </h2>
                    {user.bio ? (
                      <p className="text-sm leading-[1.8] text-neutral-300">{user.bio}</p>
                    ) : (
                      <div className="rounded-xl border border-dashed border-neutral-800/50 bg-neutral-950/30 py-10 text-center">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-800/30 text-xl">📝</div>
                        <p className="text-sm text-neutral-600">Aucune bio ajoutée</p>
                        <Link href="/profile/edit" className="mt-2 inline-block text-xs font-semibold text-amber-400 transition hover:text-amber-300">
                          Ajouter votre histoire →
                        </Link>
                      </div>
                    )}
                  </div>
                </section>

                {/* Skills */}
                <section className="relative overflow-hidden rounded-2xl border border-neutral-800/40 bg-neutral-900/20 p-7">
                  <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-purple-400/[0.03] blur-2xl" />
                  <div className="relative">
                    <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-white">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-400/10 text-[11px]">⚡</span>
                      Compétences clés
                    </h2>
                    {user.skills && user.skills.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {user.skills.map((skill, i) => (
                          <span
                            key={skill}
                            className="animate-scale-in rounded-full border border-amber-400/20 bg-amber-400/5 px-4 py-2 text-xs font-medium text-amber-400 transition-all hover:bg-amber-400/10 hover:shadow-md hover:shadow-amber-400/5"
                            style={{ animationDelay: `${i * 50}ms` }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-xl border border-dashed border-neutral-800/50 bg-neutral-950/30 py-10 text-center">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-800/30 text-xl">⚡</div>
                        <p className="text-sm text-neutral-600">Aucune compétence ajoutée</p>
                        <Link href="/profile/edit" className="mt-2 inline-block text-xs font-semibold text-amber-400 transition hover:text-amber-300">
                          Ajouter des compétences →
                        </Link>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            )}

            {/* ── Tab : Gallery ── */}
            {activeTab === "gallery" && (
              <div className="animate-fade-in">
                <section className="relative overflow-hidden rounded-2xl border border-neutral-800/40 bg-neutral-900/20 p-7">
                  <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-emerald-400/[0.03] blur-2xl" />
                  <div className="relative">
                    <h2 className="mb-5 flex items-center gap-2 text-base font-bold text-white">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-400/10 text-[11px]">📸</span>
                      Galerie
                    </h2>
                    {user.gallery && user.gallery.length > 0 ? (
                      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                        {user.gallery.map((item, i) => (
                          <div
                            key={i}
                            className="animate-scale-in group relative aspect-square overflow-hidden rounded-xl border border-neutral-800/30 bg-neutral-900/30 transition-all duration-300 hover:border-amber-400/20 hover:shadow-lg"
                            style={{ animationDelay: `${i * 80}ms` }}
                          >
                            <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center">
                              <span className="text-2xl">{item.type === "photo" ? "📷" : "🎬"}</span>
                              <p className="text-[10px] text-neutral-600 break-all">{item.url || "Média"}</p>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                          </div>
                        ))}
                        <Link
                          href="/profile/edit"
                          className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-neutral-800/50 bg-neutral-950/20 transition-all hover:border-amber-400/30 hover:bg-amber-400/[0.02]"
                        >
                          <div className="text-center">
                            <span className="text-2xl text-neutral-700">+</span>
                            <p className="mt-1 text-[9px] text-neutral-600">Ajouter</p>
                          </div>
                        </Link>
                      </div>
                    ) : (
                      <div className="rounded-xl border border-dashed border-neutral-800/50 bg-neutral-950/30 py-14 text-center">
                        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-800/30 text-2xl">📸</div>
                        <p className="text-sm text-neutral-600">Aucun média dans votre galerie</p>
                        <p className="mt-1 text-[10px] text-neutral-700">Ajoutez des photos et vidéos pour impressionner</p>
                        <Link href="/profile/edit" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-400/10 px-5 py-2 text-xs font-semibold text-amber-400 transition hover:bg-amber-400/20">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                          Ajouter des médias
                        </Link>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            )}

            {/* ── Tab : Socials ── */}
            {activeTab === "socials" && (
              <div className="animate-fade-in">
                <section className="relative overflow-hidden rounded-2xl border border-neutral-800/40 bg-neutral-900/20 p-7">
                  <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-blue-400/[0.03] blur-2xl" />
                  <div className="relative">
                    <h2 className="mb-5 flex items-center gap-2 text-base font-bold text-white">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-400/10 text-[11px]">🌐</span>
                      Réseaux sociaux
                    </h2>
                    {user.socials && user.socials.length > 0 ? (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {user.socials.map((s, i) => (
                          <a
                            key={i}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="animate-slide-right group flex items-center gap-4 rounded-xl border border-neutral-800/30 bg-neutral-900/30 p-4 transition-all duration-300 hover:border-amber-400/20 hover:bg-neutral-800/30 hover:shadow-lg"
                            style={{ animationDelay: `${i * 80}ms` }}
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-800/50 text-lg transition-transform group-hover:scale-110">
                              {s.platform === "instagram" && "📷"}
                              {s.platform === "tiktok" && "🎵"}
                              {s.platform === "youtube" && "▶️"}
                              {s.platform === "twitter" && "𝕏"}
                              {s.platform === "linkedin" && "💼"}
                              {s.platform === "spotify" && "🎧"}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-semibold capitalize text-white">{s.platform}</p>
                              <p className="truncate text-[10px] text-neutral-500">{s.url}</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 flex-shrink-0 text-neutral-700 transition-all group-hover:translate-x-0.5 group-hover:text-amber-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-xl border border-dashed border-neutral-800/50 bg-neutral-950/30 py-14 text-center">
                        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-800/30 text-2xl">🌐</div>
                        <p className="text-sm text-neutral-600">Aucun réseau social connecté</p>
                        <Link href="/profile/edit" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-400/10 px-5 py-2 text-xs font-semibold text-amber-400 transition hover:bg-amber-400/20">
                          Connecter vos réseaux
                        </Link>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            )}
          </div>

          {/* ─── Sidebar ─── */}
          <div className="space-y-6 animate-slide-up delay-500">
            {/* Completion card */}
            <div className="relative overflow-hidden rounded-2xl border border-neutral-800/40 bg-neutral-900/20 p-6">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-amber-400/5 blur-xl" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">Profil complété</h3>
                  <span className={`text-sm font-bold ${completionPct === 100 ? "text-emerald-400" : "text-amber-400"}`}>{completionPct}%</span>
                </div>
                {/* Circular progress */}
                <div className="mx-auto my-5 flex h-24 w-24 items-center justify-center">
                  <svg className="h-24 w-24 -rotate-90" viewBox="0 0 96 96">
                    <circle cx="48" cy="48" r="40" fill="none" stroke="#1a1a1a" strokeWidth="5" />
                    <circle
                      cx="48" cy="48" r="40" fill="none"
                      stroke={completionPct === 100 ? "#10b981" : "#f59e0b"}
                      strokeWidth="5" strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - completionPct / 100)}`}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <span className="absolute text-lg font-bold text-white">{completionPct}%</span>
                </div>
                <div className="space-y-2">
                  {completionItems.map((item) => (
                    <div key={item.label} className="flex items-center justify-between text-[11px]">
                      <span className="text-neutral-500">{item.label}</span>
                      {item.done ? (
                        <span className="flex items-center gap-1 text-emerald-400">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3"><path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" /></svg>
                          Fait
                        </span>
                      ) : (
                        <Link href="/profile/edit" className="text-amber-400/60 hover:text-amber-400">Ajouter</Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact card */}
            <div className="rounded-2xl border border-neutral-800/40 bg-neutral-900/20 p-6">
              <h3 className="mb-3 text-sm font-bold text-white">Bouton contact</h3>
              <p className="mb-4 text-[10px] leading-relaxed text-neutral-600">
                Les marques et mentors peuvent vous contacter via la plateforme. Les messages sont validés par l&apos;équipe ASR.
              </p>
              <div className="rounded-xl border border-amber-400/10 bg-amber-400/[0.02] p-4 text-center">
                <p className="text-[9px] font-bold uppercase tracking-wider text-amber-400/40">Aperçu</p>
                <button className="mt-2 w-full rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 py-2.5 text-xs font-bold text-black">
                  📧 Contact via AfricaShowbizRoom
                </button>
              </div>
            </div>

            {/* Infos */}
            <div className="rounded-2xl border border-neutral-800/40 bg-neutral-900/20 p-6">
              <h3 className="mb-4 text-sm font-bold text-white">Informations</h3>
              <div className="space-y-3">
                {[
                  { label: "Email", value: user.email },
                  { label: "Rôle", value: user.role === "admin" ? "Administrateur" : user.role === "mentor" ? "Mentor" : user.role === "brand" ? "Marque / Entreprise" : "Talent" },
                  { label: "Localisation", value: user.location || "—" },
                ].map((info) => (
                  <div key={info.label} className="flex items-center justify-between border-b border-neutral-800/20 pb-2 last:border-0">
                    <span className="text-[11px] text-neutral-600">{info.label}</span>
                    <span className="max-w-[150px] truncate text-[11px] font-medium text-neutral-300">{info.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
