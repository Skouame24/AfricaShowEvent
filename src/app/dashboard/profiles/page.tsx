"use client";

import { useState } from "react";

type ProfileStatus = "pending" | "approved" | "rejected";

interface MockProfile {
  id: string;
  name: string;
  role: string;
  type: "talent" | "mentor";
  location: string;
  email: string;
  avatar: string;
  bio: string;
  skills: string[];
  submittedAt: string;
  status: ProfileStatus;
}

const mockProfiles: MockProfile[] = [
  { id: "1", name: "Kemi Olatunji", role: "Artiste Afrobeats", type: "talent", location: "Lagos, Nigeria", email: "kemi@example.com", avatar: "from-pink-500 to-rose-400", bio: "Chanteuse et compositrice afrobeats avec 3 ans d'expérience scénique.", skills: ["Chant", "Composition", "Scène"], submittedAt: "Il y a 12 min", status: "pending" },
  { id: "2", name: "Amadou Traoré", role: "Réalisateur", type: "talent", location: "Bamako, Mali", email: "amadou@example.com", avatar: "from-blue-500 to-cyan-400", bio: "Réalisateur de clips vidéo et documentaires, primé au FESPACO.", skills: ["Réalisation", "Post-production", "Écriture"], submittedAt: "Il y a 1h", status: "pending" },
  { id: "3", name: "Nala Mbeki", role: "Mannequin", type: "talent", location: "Johannesburg, ZA", email: "nala@example.com", avatar: "from-purple-500 to-violet-400", bio: "Mannequin haute couture, 5 Fashion Weeks internationales.", skills: ["Mannequinat", "Photo", "Défilé"], submittedAt: "Il y a 3h", status: "pending" },
  { id: "4", name: "Ibrahim Koné", role: "Producteur musical", type: "mentor", location: "Abidjan, CI", email: "ibrahim@example.com", avatar: "from-emerald-500 to-teal-400", bio: "Producteur avec 200+ tracks produits et collaborations internationales.", skills: ["Production", "Mix", "A&R"], submittedAt: "Il y a 5h", status: "pending" },
  { id: "5", name: "Aisha Mohamed", role: "Créatrice digitale", type: "talent", location: "Casablanca, Maroc", email: "aisha@example.com", avatar: "from-amber-500 to-orange-400", bio: "Créatrice lifestyle et beauté, 450K abonnés sur Instagram.", skills: ["Contenu digital", "Photo", "Partenariats"], submittedAt: "Il y a 8h", status: "pending" },
  { id: "6", name: "Samuel Osei", role: "Photographe", type: "talent", location: "Accra, Ghana", email: "samuel@example.com", avatar: "from-red-500 to-pink-400", bio: "Photographe portrait et mode, publié dans Vogue Africa.", skills: ["Photographie", "Retouche", "Direction photo"], submittedAt: "Hier", status: "approved" },
  { id: "7", name: "Awa Diop", role: "Styliste", type: "talent", location: "Dakar, Sénégal", email: "awa@example.com", avatar: "from-yellow-500 to-amber-400", bio: "Styliste de renom, habille les célébrités africaines.", skills: ["Stylisme", "Mode", "Direction artistique"], submittedAt: "Hier", status: "rejected" },
];

export default function DashboardProfilesPage() {
  const [profiles, setProfiles] = useState(mockProfiles);
  const [filter, setFilter] = useState<"all" | ProfileStatus>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredProfiles = profiles.filter(
    (p) => filter === "all" || p.status === filter
  );

  const counts = {
    all: profiles.length,
    pending: profiles.filter((p) => p.status === "pending").length,
    approved: profiles.filter((p) => p.status === "approved").length,
    rejected: profiles.filter((p) => p.status === "rejected").length,
  };

  const updateStatus = (id: string, status: ProfileStatus) => {
    setProfiles((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Validation des profils</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Examinez et validez les demandes de profils professionnels.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-amber-400/10 px-3 py-1 text-[10px] font-bold text-amber-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
            </span>
            {counts.pending} en attente
          </span>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex gap-2">
        {(["all", "pending", "approved", "rejected"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              filter === f
                ? "bg-amber-400/10 text-amber-400"
                : "text-neutral-500 hover:bg-neutral-800/40 hover:text-neutral-300"
            }`}
          >
            {f === "all" && `Tous (${counts.all})`}
            {f === "pending" && `En attente (${counts.pending})`}
            {f === "approved" && `Approuvés (${counts.approved})`}
            {f === "rejected" && `Rejetés (${counts.rejected})`}
          </button>
        ))}
      </div>

      {/* Liste des profils */}
      <div className="space-y-3">
        {filteredProfiles.map((profile) => (
          <div
            key={profile.id}
            className="rounded-xl border border-neutral-800/50 bg-neutral-900/20 transition-all hover:border-neutral-700/50"
          >
            {/* Row principal */}
            <div className="flex items-center gap-4 px-5 py-4">
              {/* Avatar */}
              <div className={`h-11 w-11 flex-shrink-0 rounded-xl bg-gradient-to-br ${profile.avatar}`} />

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-white">{profile.name}</p>
                  <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                    profile.type === "mentor"
                      ? "bg-purple-500/10 text-purple-400"
                      : "bg-blue-500/10 text-blue-400"
                  }`}>
                    {profile.type === "mentor" ? "Mentor" : "Talent"}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500">
                  {profile.role} · {profile.location}
                </p>
              </div>

              {/* Status */}
              <span
                className={`flex-shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                  profile.status === "pending"
                    ? "bg-amber-400/10 text-amber-400"
                    : profile.status === "approved"
                      ? "bg-emerald-400/10 text-emerald-400"
                      : "bg-red-400/10 text-red-400"
                }`}
              >
                {profile.status === "pending" ? "En attente" : profile.status === "approved" ? "Approuvé" : "Rejeté"}
              </span>

              {/* Soumis */}
              <span className="hidden flex-shrink-0 text-[10px] text-neutral-700 sm:block">
                {profile.submittedAt}
              </span>

              {/* Actions */}
              <div className="flex flex-shrink-0 items-center gap-1.5">
                {profile.status === "pending" && (
                  <>
                    <button
                      onClick={() => updateStatus(profile.id, "approved")}
                      className="rounded-lg bg-emerald-500/10 px-3 py-1.5 text-[10px] font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/20"
                    >
                      Approuver
                    </button>
                    <button
                      onClick={() => updateStatus(profile.id, "rejected")}
                      className="rounded-lg bg-red-500/10 px-3 py-1.5 text-[10px] font-semibold text-red-400 transition-colors hover:bg-red-500/20"
                    >
                      Rejeter
                    </button>
                  </>
                )}
                <button
                  onClick={() => setExpandedId(expandedId === profile.id ? null : profile.id)}
                  className="rounded-lg p-1.5 text-neutral-600 transition-colors hover:bg-neutral-800/40 hover:text-neutral-400"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`h-4 w-4 transition-transform ${expandedId === profile.id ? "rotate-180" : ""}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Détail expandé */}
            {expandedId === profile.id && (
              <div className="border-t border-neutral-800/30 px-5 py-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-600">Bio</p>
                    <p className="mt-1 text-xs text-neutral-400">{profile.bio}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-600">Compétences</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {profile.skills.map((s) => (
                        <span key={s} className="rounded-full bg-neutral-800/50 px-2 py-0.5 text-[10px] text-neutral-400">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-600">Contact</p>
                    <p className="mt-1 text-xs text-neutral-400">{profile.email}</p>
                    <p className="text-[10px] text-neutral-600">{profile.location}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredProfiles.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-800/30">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="h-6 w-6 text-neutral-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <p className="mt-3 text-sm text-neutral-500">Aucun profil avec ce filtre</p>
        </div>
      )}
    </div>
  );
}
