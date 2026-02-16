"use client";

import { useState } from "react";

type ContentStatus = "pending" | "approved" | "rejected";
type ContentType = "article" | "photo" | "video";

interface MockContent {
  id: string;
  title: string;
  type: ContentType;
  author: string;
  authorAvatar: string;
  submittedAt: string;
  status: ContentStatus;
  preview: string;
  category: string;
}

const mockContent: MockContent[] = [
  { id: "1", title: "L'Afrobeats en 2026 : tendances et révélations", type: "article", author: "Yemi Adebayo", authorAvatar: "from-blue-500 to-violet-400", submittedAt: "Il y a 34 min", status: "pending", preview: "Un tour d'horizon des nouvelles tendances afrobeats qui bouleversent l'industrie musicale africaine...", category: "Musique" },
  { id: "2", title: "Shooting Fashion Week Dakar", type: "photo", author: "Samuel Osei", authorAvatar: "from-red-500 to-pink-400", submittedAt: "Il y a 2h", status: "pending", preview: "15 photos du défilé principal de la Fashion Week de Dakar 2026.", category: "Mode" },
  { id: "3", title: "Interview exclusive : Grace Mwangi", type: "video", author: "Kofi Mensah", authorAvatar: "from-amber-500 to-red-400", submittedAt: "Il y a 4h", status: "pending", preview: "Vidéo de 12 min — Interview avec Grace Mwangi sur son parcours d'entrepreneuse.", category: "Portrait" },
  { id: "4", title: "Les 10 créateurs digitaux africains à suivre", type: "article", author: "Omar Benali", authorAvatar: "from-violet-500 to-purple-400", submittedAt: "Hier", status: "approved", preview: "Sélection éditoriale des créateurs de contenu les plus influents du continent.", category: "Digital" },
  { id: "5", title: "Backstage Afrobeats Night Lagos", type: "photo", author: "Fatou Keita", authorAvatar: "from-emerald-500 to-teal-400", submittedAt: "Hier", status: "approved", preview: "8 photos exclusives des coulisses de l'événement.", category: "Événement" },
  { id: "6", title: "Photo non conforme — Galerie #4521", type: "photo", author: "Utilisateur anonyme", authorAvatar: "from-neutral-500 to-neutral-400", submittedAt: "Il y a 2j", status: "rejected", preview: "Image ne respectant pas les guidelines de qualité.", category: "Non classé" },
];

const typeIcons: Record<ContentType, React.ReactNode> = {
  article: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  photo: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M2.25 18V6a2.25 2.25 0 012.25-2.25h15A2.25 2.25 0 0121.75 6v12A2.25 2.25 0 0119.5 20.25H4.5A2.25 2.25 0 012.25 18z" />
    </svg>
  ),
  video: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
    </svg>
  ),
};

const typeColors: Record<ContentType, string> = {
  article: "bg-blue-500/10 text-blue-400",
  photo: "bg-pink-500/10 text-pink-400",
  video: "bg-purple-500/10 text-purple-400",
};

export default function DashboardContentPage() {
  const [content, setContent] = useState(mockContent);
  const [filter, setFilter] = useState<"all" | ContentStatus>("all");
  const [typeFilter, setTypeFilter] = useState<"all" | ContentType>("all");

  const filtered = content.filter((c) => {
    const matchStatus = filter === "all" || c.status === filter;
    const matchType = typeFilter === "all" || c.type === typeFilter;
    return matchStatus && matchType;
  });

  const updateStatus = (id: string, status: ContentStatus) => {
    setContent((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white">Modération des contenus</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Examinez les articles, photos et vidéos soumis avant publication.
        </p>
      </div>

      {/* Filtres */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {(["all", "pending", "approved", "rejected"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                filter === f ? "bg-amber-400/10 text-amber-400" : "text-neutral-500 hover:bg-neutral-800/40 hover:text-neutral-300"
              }`}
            >
              {f === "all" ? "Tous" : f === "pending" ? "En attente" : f === "approved" ? "Publiés" : "Rejetés"}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {(["all", "article", "photo", "video"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                typeFilter === t ? "bg-neutral-800 text-white" : "text-neutral-600 hover:text-neutral-400"
              }`}
            >
              {t !== "all" && typeIcons[t]}
              {t === "all" ? "Tout type" : t === "article" ? "Articles" : t === "photo" ? "Photos" : "Vidéos"}
            </button>
          ))}
        </div>
      </div>

      {/* Liste */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-neutral-800/50 bg-neutral-900/20 transition-all hover:border-neutral-700/50"
          >
            <div className="flex items-start gap-4 px-5 py-4">
              {/* Type icon */}
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${typeColors[item.type]}`}>
                {typeIcons[item.type]}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <span className="rounded-full bg-neutral-800/60 px-2 py-0.5 text-[9px] text-neutral-500">
                    {item.category}
                  </span>
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-neutral-600 line-clamp-1">
                  {item.preview}
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className={`h-5 w-5 rounded-full bg-gradient-to-br ${item.authorAvatar}`} />
                    <span className="text-[10px] text-neutral-500">{item.author}</span>
                  </div>
                  <span className="text-[10px] text-neutral-700">{item.submittedAt}</span>
                </div>
              </div>

              {/* Status + Actions */}
              <div className="flex flex-shrink-0 items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                    item.status === "pending"
                      ? "bg-amber-400/10 text-amber-400"
                      : item.status === "approved"
                        ? "bg-emerald-400/10 text-emerald-400"
                        : "bg-red-400/10 text-red-400"
                  }`}
                >
                  {item.status === "pending" ? "En attente" : item.status === "approved" ? "Publié" : "Rejeté"}
                </span>
                {item.status === "pending" && (
                  <div className="flex gap-1">
                    <button
                      onClick={() => updateStatus(item.id, "approved")}
                      className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400 transition-colors hover:bg-emerald-500/20"
                      title="Publier"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </button>
                    <button
                      onClick={() => updateStatus(item.id, "rejected")}
                      className="rounded-lg bg-red-500/10 p-2 text-red-400 transition-colors hover:bg-red-500/20"
                      title="Rejeter"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-800/30">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="h-6 w-6 text-neutral-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
            </svg>
          </div>
          <p className="mt-3 text-sm text-neutral-500">Aucun contenu avec ces filtres</p>
        </div>
      )}
    </div>
  );
}
