"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

const MOCK_CONTACTS = [
  {
    id: "1", talentName: "Kofi Mensah", talentTitle: "Chanteur Afro-pop", talentAvatar: "from-amber-400 to-orange-500",
    project: "Campagne publicitaire Africa Music Fest",
    message: "Nous souhaitons collaborer avec vous pour notre prochaine campagne publicitaire.",
    date: "Il y a 3 heures", status: "pending" as const,
  },
  {
    id: "2", talentName: "Fatou Diop", talentTitle: "Danseuse contemporaine", talentAvatar: "from-pink-400 to-rose-500",
    project: "Clip musical - Nouveau single",
    message: "Votre talent en danse contemporaine serait parfait pour notre prochain clip.",
    date: "Il y a 2 jours", status: "pending" as const,
  },
  {
    id: "3", talentName: "Nkechi Okafor", talentTitle: "Mannequin international", talentAvatar: "from-violet-400 to-purple-500",
    project: "Défilé de mode Lagos Fashion Week",
    message: "Nous aimerions vous avoir pour notre défilé lors de la Lagos Fashion Week.",
    date: "Il y a 1 semaine", status: "accepted" as const,
  },
  {
    id: "4", talentName: "Amara Touré", talentTitle: "DJ & Producteur", talentAvatar: "from-blue-400 to-indigo-500",
    project: "Festival BeatsOfAfrica",
    message: "Collaboration pour notre festival de musique.",
    date: "Il y a 2 semaines", status: "declined" as const,
  },
];

type ContactStatus = "pending" | "accepted" | "declined";

export default function ContactsPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [filter, setFilter] = useState<"all" | ContactStatus>("all");

  useEffect(() => {
    if (!isLoading && !user) router.push("/auth/login");
    if (!isLoading && user && user.role !== "brand") router.push("/profile");
  }, [isLoading, user, router]);

  if (isLoading || !user || user.role !== "brand") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-emerald-400/20 border-t-emerald-400" />
      </div>
    );
  }

  const filtered = filter === "all" ? MOCK_CONTACTS : MOCK_CONTACTS.filter((c) => c.status === filter);

  const statusConfig: Record<ContactStatus, { label: string; color: string; bg: string }> = {
    pending: { label: "En attente ASR", color: "text-amber-400", bg: "bg-amber-400/10" },
    accepted: { label: "Validée", color: "text-emerald-400", bg: "bg-emerald-400/10" },
    declined: { label: "Refusée", color: "text-red-400", bg: "bg-red-400/10" },
  };

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.03] blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8">
          <Link href="/profile" className="mb-3 inline-flex items-center gap-2 text-xs text-neutral-600 transition hover:text-emerald-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3 w-3"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
            Retour au profil
          </Link>
          <h1 className="text-3xl font-bold text-white">Mes demandes de contact</h1>
          <p className="mt-1 text-sm text-neutral-500">Suivez vos demandes de collaboration avec les talents. Chaque demande est validée par l&apos;équipe ASR.</p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          {[
            { label: "En attente", value: MOCK_CONTACTS.filter((c) => c.status === "pending").length.toString(), color: "text-amber-400", icon: "⏳" },
            { label: "Validées", value: MOCK_CONTACTS.filter((c) => c.status === "accepted").length.toString(), color: "text-emerald-400", icon: "✅" },
            { label: "Total", value: MOCK_CONTACTS.length.toString(), color: "text-white", icon: "📊" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-neutral-800/40 bg-neutral-900/20 p-5 text-center">
              <p className="text-xl">{s.icon}</p>
              <p className={`mt-1 text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-[10px] text-neutral-600">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filtres */}
        <div className="mb-6 flex items-center gap-2">
          {(["all", "pending", "accepted", "declined"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                filter === f
                  ? "bg-emerald-400/10 text-emerald-400"
                  : "text-neutral-500 hover:bg-white/5 hover:text-neutral-300"
              }`}
            >
              {f === "all" ? "Toutes" : statusConfig[f].label}
            </button>
          ))}
        </div>

        {/* Liste */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-800/50 bg-neutral-950/30 py-16 text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-800/30 text-2xl">📭</div>
              <p className="text-sm text-neutral-600">Aucune demande de contact</p>
              <Link href="/talents" className="mt-3 inline-block text-xs font-semibold text-emerald-400 transition hover:text-emerald-300">
                Parcourir les talents →
              </Link>
            </div>
          ) : (
            filtered.map((contact) => {
              const sc = statusConfig[contact.status];
              return (
                <div key={contact.id} className="group rounded-2xl border border-neutral-800/40 bg-neutral-900/20 p-6 transition-all hover:border-emerald-400/20 hover:bg-neutral-900/30">
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${contact.talentAvatar} text-lg font-bold text-white`}>
                      {contact.talentName.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-sm font-bold text-white">{contact.talentName}</h3>
                        <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${sc.bg} ${sc.color}`}>{sc.label}</span>
                      </div>
                      <p className="text-[11px] text-emerald-400">{contact.talentTitle}</p>
                      <div className="mt-2 rounded-lg bg-neutral-800/20 px-3 py-2">
                        <p className="text-[10px] font-semibold text-neutral-400">📋 Projet : {contact.project}</p>
                      </div>
                      <p className="mt-2 text-xs text-neutral-400">{contact.message}</p>
                      <p className="mt-2 text-[10px] text-neutral-700">{contact.date}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
