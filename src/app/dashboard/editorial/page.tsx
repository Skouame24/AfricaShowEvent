"use client";

import { useState } from "react";

interface FeaturedItem {
  id: string;
  title: string;
  type: "talent" | "article" | "event";
  image: string;
  featured: boolean;
  position: "hero" | "sidebar" | "grid" | "none";
  startDate?: string;
  endDate?: string;
}

const mockFeatured: FeaturedItem[] = [
  { id: "1", title: "Amara Diallo — Teranga Soul", type: "article", image: "from-amber-500 to-orange-600", featured: true, position: "hero", startDate: "2026-02-10", endDate: "2026-02-20" },
  { id: "2", title: "Fatou Keita", type: "talent", image: "from-emerald-500 to-teal-600", featured: true, position: "sidebar" },
  { id: "3", title: "Afrobeats Night Lagos", type: "event", image: "from-purple-500 to-violet-600", featured: true, position: "grid" },
  { id: "4", title: "Yemi Adebayo", type: "talent", image: "from-blue-500 to-cyan-600", featured: true, position: "grid" },
  { id: "5", title: "L'Afrobeats en 2026", type: "article", image: "from-red-500 to-pink-600", featured: false, position: "none" },
  { id: "6", title: "Grace Mwangi", type: "talent", image: "from-yellow-500 to-amber-600", featured: false, position: "none" },
  { id: "7", title: "Creative Workshop Accra", type: "event", image: "from-teal-500 to-green-600", featured: false, position: "none" },
  { id: "8", title: "Omar Benali", type: "talent", image: "from-violet-500 to-indigo-600", featured: false, position: "none" },
];

const positionLabels: Record<string, { label: string; color: string }> = {
  hero: { label: "Hero", color: "bg-amber-400/10 text-amber-400" },
  sidebar: { label: "Sidebar", color: "bg-blue-400/10 text-blue-400" },
  grid: { label: "Grille", color: "bg-purple-400/10 text-purple-400" },
  none: { label: "Non affiché", color: "bg-neutral-800 text-neutral-600" },
};

const typeLabels: Record<string, { label: string; color: string }> = {
  talent: { label: "Talent", color: "bg-emerald-500/10 text-emerald-400" },
  article: { label: "Article", color: "bg-blue-500/10 text-blue-400" },
  event: { label: "Événement", color: "bg-purple-500/10 text-purple-400" },
};

export default function DashboardEditorialPage() {
  const [items, setItems] = useState(mockFeatured);
  const [dragItem, setDragItem] = useState<string | null>(null);

  const toggleFeatured = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, featured: !item.featured, position: item.featured ? "none" as const : "grid" as const }
          : item
      )
    );
  };

  const changePosition = (id: string, position: "hero" | "sidebar" | "grid" | "none") => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, position, featured: position !== "none" } : item
      )
    );
  };

  const featuredItems = items.filter((i) => i.featured);
  const availableItems = items.filter((i) => !i.featured);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white">Mise en avant éditoriale</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Gérez les éléments mis en avant sur la page d&apos;accueil et les sections éditorialisées.
        </p>
      </div>

      {/* Prévisualisation layout */}
      <div className="rounded-xl border border-neutral-800/50 bg-neutral-900/20 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Prévisualisation de la page d&apos;accueil</h2>
          <span className="text-[10px] text-neutral-600">{featuredItems.length} éléments en avant</span>
        </div>

        <div className="grid gap-3 lg:grid-cols-4">
          {/* Hero slot */}
          <div className="lg:col-span-3">
            <div className="rounded-lg border border-dashed border-neutral-800 p-1.5">
              <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-widest text-neutral-700">Hero (principal)</p>
              {items.find((i) => i.position === "hero") ? (
                <div className={`flex h-28 items-end rounded-lg bg-gradient-to-br ${items.find((i) => i.position === "hero")!.image} p-3`}>
                  <div>
                    <span className={`rounded px-1.5 py-0.5 text-[8px] font-bold ${typeLabels[items.find((i) => i.position === "hero")!.type].color}`}>
                      {typeLabels[items.find((i) => i.position === "hero")!.type].label}
                    </span>
                    <p className="mt-1 text-xs font-bold text-white">{items.find((i) => i.position === "hero")!.title}</p>
                  </div>
                </div>
              ) : (
                <div className="flex h-28 items-center justify-center rounded-lg bg-neutral-800/20 text-[10px] text-neutral-700">
                  Glissez un élément ici
                </div>
              )}
            </div>
          </div>

          {/* Sidebar slot */}
          <div>
            <div className="rounded-lg border border-dashed border-neutral-800 p-1.5">
              <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-widest text-neutral-700">Sidebar</p>
              {items.find((i) => i.position === "sidebar") ? (
                <div className={`flex h-28 items-end rounded-lg bg-gradient-to-br ${items.find((i) => i.position === "sidebar")!.image} p-3`}>
                  <p className="text-[10px] font-bold text-white">{items.find((i) => i.position === "sidebar")!.title}</p>
                </div>
              ) : (
                <div className="flex h-28 items-center justify-center rounded-lg bg-neutral-800/20 text-[10px] text-neutral-700">
                  Vide
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Grid slots */}
        <div className="mt-3 rounded-lg border border-dashed border-neutral-800 p-1.5">
          <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-widest text-neutral-700">Grille secondaire</p>
          <div className="grid gap-2 sm:grid-cols-3">
            {items.filter((i) => i.position === "grid").map((item) => (
              <div key={item.id} className={`flex h-16 items-end rounded-lg bg-gradient-to-br ${item.image} p-2`}>
                <p className="text-[9px] font-bold text-white">{item.title}</p>
              </div>
            ))}
            {items.filter((i) => i.position === "grid").length === 0 && (
              <div className="col-span-3 flex h-16 items-center justify-center rounded-lg bg-neutral-800/20 text-[10px] text-neutral-700">
                Aucun élément dans la grille
              </div>
            )}
          </div>
        </div>
      </div>

      {/* En avant — liste éditable */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Éléments en avant */}
        <div className="rounded-xl border border-neutral-800/50 bg-neutral-900/20">
          <div className="border-b border-neutral-800/30 px-5 py-4">
            <h2 className="text-sm font-semibold text-white">
              En avant <span className="ml-1 text-neutral-600">({featuredItems.length})</span>
            </h2>
          </div>
          <div className="divide-y divide-neutral-800/20">
            {featuredItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 px-5 py-3"
                draggable
                onDragStart={() => setDragItem(item.id)}
                onDragEnd={() => setDragItem(null)}
              >
                <div className="cursor-grab text-neutral-700 active:cursor-grabbing">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                  </svg>
                </div>
                <div className={`h-8 w-8 flex-shrink-0 rounded-lg bg-gradient-to-br ${item.image}`} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-white">{item.title}</p>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <span className={`rounded px-1.5 py-0.5 text-[8px] font-bold ${typeLabels[item.type].color}`}>
                      {typeLabels[item.type].label}
                    </span>
                    <span className={`rounded px-1.5 py-0.5 text-[8px] font-bold ${positionLabels[item.position].color}`}>
                      {positionLabels[item.position].label}
                    </span>
                  </div>
                </div>
                <select
                  value={item.position}
                  onChange={(e) => changePosition(item.id, e.target.value as "hero" | "sidebar" | "grid" | "none")}
                  className="rounded-lg border border-neutral-800 bg-neutral-900 px-2 py-1 text-[10px] text-neutral-400 outline-none"
                >
                  <option value="hero">Hero</option>
                  <option value="sidebar">Sidebar</option>
                  <option value="grid">Grille</option>
                  <option value="none">Retirer</option>
                </select>
                <button
                  onClick={() => toggleFeatured(item.id)}
                  className="rounded-lg p-1.5 text-red-400/60 transition-colors hover:bg-red-500/10 hover:text-red-400"
                  title="Retirer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3.5 w-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Disponibles */}
        <div className="rounded-xl border border-neutral-800/50 bg-neutral-900/20">
          <div className="border-b border-neutral-800/30 px-5 py-4">
            <h2 className="text-sm font-semibold text-white">
              Disponibles <span className="ml-1 text-neutral-600">({availableItems.length})</span>
            </h2>
          </div>
          <div className="divide-y divide-neutral-800/20">
            {availableItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 px-5 py-3">
                <div className={`h-8 w-8 flex-shrink-0 rounded-lg bg-gradient-to-br ${item.image}`} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-white">{item.title}</p>
                  <span className={`rounded px-1.5 py-0.5 text-[8px] font-bold ${typeLabels[item.type].color}`}>
                    {typeLabels[item.type].label}
                  </span>
                </div>
                <button
                  onClick={() => toggleFeatured(item.id)}
                  className="rounded-lg bg-amber-400/10 px-3 py-1.5 text-[10px] font-semibold text-amber-400 transition-colors hover:bg-amber-400/20"
                >
                  Mettre en avant
                </button>
              </div>
            ))}
            {availableItems.length === 0 && (
              <div className="px-5 py-8 text-center text-[10px] text-neutral-600">
                Tous les éléments sont en avant
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
