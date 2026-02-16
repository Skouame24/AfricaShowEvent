"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

/* ── Mock data ── */
const MOCK_MENTOR_REQUESTS = [
  { id: "1", talentName: "Kofi Mensah", talentTitle: "Chanteur Afro-pop", talentAvatar: "from-amber-400 to-orange-500", message: "Bonjour, j'aimerais beaucoup bénéficier de votre expertise en direction artistique pour développer ma carrière.", date: "Il y a 2 heures", status: "pending" as const },
  { id: "2", talentName: "Fatou Diop", talentTitle: "Danseuse contemporaine", talentAvatar: "from-pink-400 to-rose-500", message: "Votre parcours m'inspire énormément. Je cherche un mentor pour m'aider à structurer mes projets.", date: "Il y a 1 jour", status: "pending" as const },
  { id: "3", talentName: "Amara Touré", talentTitle: "DJ & Producteur", talentAvatar: "from-blue-400 to-indigo-500", message: "J'ai besoin de conseils pour la production de mon premier album.", date: "Il y a 3 jours", status: "pending" as const },
  { id: "4", talentName: "Nkechi Okafor", talentTitle: "Mannequin", talentAvatar: "from-violet-400 to-purple-500", message: "Merci pour votre mentorat !", date: "Il y a 1 semaine", status: "accepted" as const },
  { id: "5", talentName: "Yannick Mbele", talentTitle: "Acteur", talentAvatar: "from-teal-400 to-cyan-500", message: "Demande de mentorat pour mon projet de court-métrage.", date: "Il y a 2 semaines", status: "declined" as const },
];

const MOCK_TALENT_REQUESTS = [
  { id: "1", mentorName: "Aminata Diallo", mentorTitle: "Directrice Artistique", mentorAvatar: "from-purple-500 to-violet-400", message: "Demande de mentorat envoyée", date: "Il y a 1 jour", status: "pending" as const },
  { id: "2", mentorName: "Jean-Paul Ndongo", mentorTitle: "Producteur Musical", mentorAvatar: "from-blue-500 to-indigo-400", message: "Demande de mentorat en production", date: "Il y a 5 jours", status: "accepted" as const },
];

type RequestStatus = "pending" | "accepted" | "declined";

export default function RequestsPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [filter, setFilter] = useState<"all" | RequestStatus>("all");

  useEffect(() => {
    if (!isLoading && !user) router.push("/auth/login");
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-amber-400/20 border-t-amber-400" />
      </div>
    );
  }

  const isMentor = user.role === "mentor";
  const requests = isMentor ? MOCK_MENTOR_REQUESTS : MOCK_TALENT_REQUESTS;
  const filteredRequests = filter === "all" ? requests : requests.filter((r) => r.status === filter);

  const statusConfig: Record<RequestStatus, { label: string; color: string; bg: string }> = {
    pending: { label: "En attente", color: "text-amber-400", bg: "bg-amber-400/10" },
    accepted: { label: "Acceptée", color: "text-emerald-400", bg: "bg-emerald-400/10" },
    declined: { label: "Refusée", color: "text-red-400", bg: "bg-red-400/10" },
  };

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-purple-500/[0.03] blur-[150px]" />
        <div className="absolute -right-40 bottom-20 h-[400px] w-[400px] rounded-full bg-amber-600/[0.03] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <Link href="/profile" className="mb-3 inline-flex items-center gap-2 text-xs text-neutral-600 transition hover:text-amber-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3 w-3"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
            Retour au profil
          </Link>
          <h1 className="text-3xl font-bold text-white">
            {isMentor ? "Demandes reçues" : "Mes demandes de mentorat"}
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            {isMentor
              ? "Gérez les demandes de mentorat des talents"
              : "Suivez le statut de vos demandes auprès des mentors"}
          </p>
        </div>

        {/* Filtres */}
        <div className="mb-6 flex items-center gap-2">
          {(["all", "pending", "accepted", "declined"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                filter === f
                  ? "bg-amber-400/10 text-amber-400 shadow-md shadow-amber-400/5"
                  : "text-neutral-500 hover:bg-white/5 hover:text-neutral-300"
              }`}
            >
              {f === "all" ? "Toutes" : statusConfig[f].label}
              <span className="ml-1.5 text-[10px] opacity-60">
                ({f === "all" ? requests.length : requests.filter((r) => r.status === f).length})
              </span>
            </button>
          ))}
        </div>

        {/* Liste des demandes */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-800/50 bg-neutral-950/30 py-16 text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-800/30 text-2xl">📭</div>
              <p className="text-sm text-neutral-600">Aucune demande {filter !== "all" ? statusConfig[filter as RequestStatus].label.toLowerCase() : ""}</p>
            </div>
          ) : (
            filteredRequests.map((req) => {
              const name = isMentor ? ("talentName" in req ? req.talentName : "") : ("mentorName" in req ? req.mentorName : "");
              const title = isMentor ? ("talentTitle" in req ? req.talentTitle : "") : ("mentorTitle" in req ? req.mentorTitle : "");
              const avatar = isMentor ? ("talentAvatar" in req ? req.talentAvatar : "") : ("mentorAvatar" in req ? req.mentorAvatar : "");
              const sc = statusConfig[req.status];

              return (
                <div
                  key={req.id}
                  className="group relative overflow-hidden rounded-2xl border border-neutral-800/40 bg-neutral-900/20 p-6 transition-all hover:border-neutral-700/50 hover:bg-neutral-900/30"
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${avatar} text-lg font-bold text-white`}>
                      {name.charAt(0)}
                    </div>

                    {/* Contenu */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-sm font-bold text-white">{name}</h3>
                        <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${sc.bg} ${sc.color}`}>
                          {sc.label}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500">{title}</p>
                      <p className="mt-2 text-xs leading-relaxed text-neutral-400">{req.message}</p>
                      <p className="mt-2 text-[10px] text-neutral-700">{req.date}</p>
                    </div>

                    {/* Actions (uniquement pour mentor et demandes en attente) */}
                    {isMentor && req.status === "pending" && (
                      <div className="flex flex-shrink-0 items-center gap-2">
                        <button className="rounded-xl bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-500/20">
                          Accepter
                        </button>
                        <button className="rounded-xl bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-500/20">
                          Refuser
                        </button>
                      </div>
                    )}
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
