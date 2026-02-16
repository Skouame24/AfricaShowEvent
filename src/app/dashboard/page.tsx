"use client";

import Link from "next/link";

const stats = [
  { label: "Profils en attente", value: "5", change: "+2 aujourd'hui", color: "text-amber-400", bg: "bg-amber-400/10", icon: "users" },
  { label: "Contenus à modérer", value: "3", change: "+1 ce matin", color: "text-red-400", bg: "bg-red-400/10", icon: "content" },
  { label: "Événements actifs", value: "4", change: "2 cette semaine", color: "text-emerald-400", bg: "bg-emerald-400/10", icon: "events" },
  { label: "Mises en relation", value: "12", change: "+3 cette semaine", color: "text-blue-400", bg: "bg-blue-400/10", icon: "connections" },
];

const recentActivity = [
  { type: "profile", action: "Nouveau profil soumis", detail: "Kemi Olatunji — Artiste Afrobeats, Lagos", time: "Il y a 12 min", status: "pending" },
  { type: "content", action: "Article soumis", detail: "\"L'Afrobeats en 2026\" par Yemi Adebayo", time: "Il y a 34 min", status: "pending" },
  { type: "event", action: "Événement créé", detail: "Afrobeats Night Lagos — 15 Mars 2026", time: "Il y a 1h", status: "approved" },
  { type: "profile", action: "Profil approuvé", detail: "Fatou Keita — Mannequin, Abidjan", time: "Il y a 2h", status: "approved" },
  { type: "connection", action: "Mise en relation validée", detail: "Omar Benali ↔ Yasmine El Idrissi", time: "Il y a 3h", status: "approved" },
  { type: "content", action: "Contenu rejeté", detail: "Photo non conforme — galerie #4521", time: "Il y a 4h", status: "rejected" },
  { type: "profile", action: "Nouveau profil soumis", detail: "David Oyelowo — Directeur artistique", time: "Il y a 5h", status: "pending" },
  { type: "event", action: "RSVP reçu", detail: "Grace Mwangi → Creative Workshop Accra", time: "Il y a 6h", status: "approved" },
];

const pendingProfiles = [
  { name: "Kemi Olatunji", role: "Artiste Afrobeats", location: "Lagos", avatar: "from-pink-500 to-rose-400", submitted: "12 min" },
  { name: "Amadou Traoré", role: "Réalisateur", location: "Bamako", avatar: "from-blue-500 to-cyan-400", submitted: "1h" },
  { name: "Nala Mbeki", role: "Mannequin", location: "Johannesburg", avatar: "from-purple-500 to-violet-400", submitted: "3h" },
];

function StatIcon({ type }: { type: string }) {
  switch (type) {
    case "users":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      );
    case "content":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
        </svg>
      );
    case "events":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>
      );
  }
}

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white">Vue d&apos;ensemble</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Bienvenue sur le back-office AfricaShowbizRoom. Voici un résumé de l&apos;activité.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group rounded-xl border border-neutral-800/50 bg-neutral-900/30 p-5 transition-all duration-300 hover:border-neutral-700"
          >
            <div className="flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}>
                <StatIcon type={stat.icon} />
              </div>
              <span className="text-2xl font-bold text-white">{stat.value}</span>
            </div>
            <p className="mt-3 text-xs font-medium text-neutral-400">{stat.label}</p>
            <p className="mt-0.5 text-[10px] text-neutral-600">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Activité récente */}
        <div className="xl:col-span-2">
          <div className="rounded-xl border border-neutral-800/50 bg-neutral-900/20">
            <div className="flex items-center justify-between border-b border-neutral-800/30 px-5 py-4">
              <h2 className="text-sm font-semibold text-white">Activité récente</h2>
              <span className="text-[10px] text-neutral-600">Dernières 24h</span>
            </div>
            <div className="divide-y divide-neutral-800/20">
              {recentActivity.map((activity, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-neutral-800/10"
                >
                  {/* Status dot */}
                  <div
                    className={`h-2 w-2 flex-shrink-0 rounded-full ${
                      activity.status === "pending"
                        ? "bg-amber-400"
                        : activity.status === "approved"
                          ? "bg-emerald-400"
                          : "bg-red-400"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-neutral-300">
                      {activity.action}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] text-neutral-600">
                      {activity.detail}
                    </p>
                  </div>
                  <span className="flex-shrink-0 text-[10px] text-neutral-700">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profils en attente */}
        <div>
          <div className="rounded-xl border border-neutral-800/50 bg-neutral-900/20">
            <div className="flex items-center justify-between border-b border-neutral-800/30 px-5 py-4">
              <h2 className="text-sm font-semibold text-white">En attente</h2>
              <Link
                href="/dashboard/profiles"
                className="text-[10px] font-semibold text-amber-400 transition-colors hover:text-amber-300"
              >
                Voir tout →
              </Link>
            </div>
            <div className="divide-y divide-neutral-800/20">
              {pendingProfiles.map((profile) => (
                <div key={profile.name} className="flex items-center gap-3 px-5 py-3.5">
                  <div className={`h-9 w-9 flex-shrink-0 rounded-lg bg-gradient-to-br ${profile.avatar}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-white">{profile.name}</p>
                    <p className="text-[10px] text-neutral-600">
                      {profile.role} · {profile.location}
                    </p>
                  </div>
                  <div className="flex gap-1.5">
                    <button className="rounded-lg bg-emerald-500/10 p-1.5 text-emerald-400 transition-colors hover:bg-emerald-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </button>
                    <button className="rounded-lg bg-red-500/10 p-1.5 text-red-400 transition-colors hover:bg-red-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="border-t border-neutral-800/30 p-4">
              <p className="mb-2 text-[9px] font-semibold uppercase tracking-widest text-neutral-600">
                Actions rapides
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/dashboard/profiles"
                  className="rounded-lg bg-neutral-800/30 px-3 py-2 text-center text-[10px] font-medium text-neutral-400 transition-colors hover:bg-neutral-800/60 hover:text-white"
                >
                  Valider profils
                </Link>
                <Link
                  href="/dashboard/content"
                  className="rounded-lg bg-neutral-800/30 px-3 py-2 text-center text-[10px] font-medium text-neutral-400 transition-colors hover:bg-neutral-800/60 hover:text-white"
                >
                  Modérer contenus
                </Link>
                <Link
                  href="/dashboard/editorial"
                  className="rounded-lg bg-neutral-800/30 px-3 py-2 text-center text-[10px] font-medium text-neutral-400 transition-colors hover:bg-neutral-800/60 hover:text-white"
                >
                  Mise en avant
                </Link>
                <Link
                  href="/dashboard/events"
                  className="rounded-lg bg-neutral-800/30 px-3 py-2 text-center text-[10px] font-medium text-neutral-400 transition-colors hover:bg-neutral-800/60 hover:text-white"
                >
                  Gérer events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
