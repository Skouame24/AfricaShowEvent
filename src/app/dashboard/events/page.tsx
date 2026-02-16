"use client";

import { useState } from "react";

type EventStatus = "draft" | "published" | "ongoing" | "finished";

interface MockDashEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  type: string;
  status: EventStatus;
  capacity: number;
  registered: number;
  invitation: boolean;
  image: string;
}

const mockEvents: MockDashEvent[] = [
  { id: "1", title: "Afrobeats Night Lagos", date: "15 Mars 2026", location: "Lagos, Nigeria", type: "Concert", status: "published", capacity: 500, registered: 342, invitation: true, image: "from-purple-600 to-violet-500" },
  { id: "2", title: "Fashion Week Dakar", date: "22 Avril 2026", location: "Dakar, Sénégal", type: "Défilé", status: "draft", capacity: 200, registered: 0, invitation: true, image: "from-amber-500 to-orange-500" },
  { id: "3", title: "Creative Workshop Accra", date: "8 Février 2026", location: "Accra, Ghana", type: "Workshop", status: "ongoing", capacity: 30, registered: 28, invitation: false, image: "from-emerald-500 to-teal-500" },
  { id: "4", title: "Afro Digital Festival", date: "10 Mai 2026", location: "Nairobi, Kenya", type: "Festival", status: "published", capacity: 1000, registered: 567, invitation: false, image: "from-blue-500 to-cyan-500" },
  { id: "5", title: "Nollywood Awards Gala", date: "20 Janvier 2026", location: "Lagos, Nigeria", type: "Gala", status: "finished", capacity: 300, registered: 298, invitation: true, image: "from-red-500 to-pink-500" },
  { id: "6", title: "Mentor Connect Session", date: "28 Février 2026", location: "En ligne", type: "Networking", status: "published", capacity: 50, registered: 35, invitation: false, image: "from-indigo-500 to-violet-500" },
];

const statusConfig: Record<EventStatus, { label: string; color: string }> = {
  draft: { label: "Brouillon", color: "bg-neutral-800 text-neutral-400" },
  published: { label: "Publié", color: "bg-emerald-500/10 text-emerald-400" },
  ongoing: { label: "En cours", color: "bg-blue-500/10 text-blue-400" },
  finished: { label: "Terminé", color: "bg-neutral-800/60 text-neutral-500" },
};

export default function DashboardEventsPage() {
  const [events, setEvents] = useState(mockEvents);
  const [filter, setFilter] = useState<"all" | EventStatus>("all");

  const filtered = events.filter((e) => filter === "all" || e.status === filter);

  const updateStatus = (id: string, status: EventStatus) => {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Gestion des événements</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Créez, publiez et gérez les événements et opportunités.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-xs font-semibold text-black transition-all hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/20">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Nouvel événement
        </button>
      </div>

      {/* Stats rapides */}
      <div className="grid gap-3 sm:grid-cols-4">
        {[
          { label: "Total", value: events.length, color: "text-white" },
          { label: "Publiés", value: events.filter((e) => e.status === "published").length, color: "text-emerald-400" },
          { label: "En cours", value: events.filter((e) => e.status === "ongoing").length, color: "text-blue-400" },
          { label: "Brouillons", value: events.filter((e) => e.status === "draft").length, color: "text-neutral-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-neutral-800/30 bg-neutral-900/20 px-4 py-3">
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-neutral-600">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filtres */}
      <div className="flex gap-2">
        {(["all", "draft", "published", "ongoing", "finished"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              filter === f ? "bg-amber-400/10 text-amber-400" : "text-neutral-500 hover:bg-neutral-800/40 hover:text-neutral-300"
            }`}
          >
            {f === "all" ? "Tous" : statusConfig[f].label}
          </button>
        ))}
      </div>

      {/* Tableau */}
      <div className="overflow-hidden rounded-xl border border-neutral-800/50 bg-neutral-900/20">
        {/* Header tableau */}
        <div className="hidden border-b border-neutral-800/30 px-5 py-3 sm:grid sm:grid-cols-12 sm:gap-4">
          <p className="col-span-4 text-[9px] font-semibold uppercase tracking-widest text-neutral-700">Événement</p>
          <p className="col-span-2 text-[9px] font-semibold uppercase tracking-widest text-neutral-700">Date</p>
          <p className="col-span-2 text-[9px] font-semibold uppercase tracking-widest text-neutral-700">Inscriptions</p>
          <p className="col-span-1 text-[9px] font-semibold uppercase tracking-widest text-neutral-700">Statut</p>
          <p className="col-span-3 text-right text-[9px] font-semibold uppercase tracking-widest text-neutral-700">Actions</p>
        </div>

        {/* Rows */}
        <div className="divide-y divide-neutral-800/20">
          {filtered.map((event) => {
            const occupancy = event.capacity > 0 ? Math.round((event.registered / event.capacity) * 100) : 0;

            return (
              <div
                key={event.id}
                className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-neutral-800/10 sm:grid sm:grid-cols-12 sm:items-center sm:gap-4"
              >
                {/* Événement */}
                <div className="col-span-4 flex items-center gap-3">
                  <div className={`h-10 w-10 flex-shrink-0 rounded-lg bg-gradient-to-br ${event.image}`} />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-white">{event.title}</p>
                    <div className="flex items-center gap-2 text-[10px] text-neutral-600">
                      <span>{event.type}</span>
                      <span>·</span>
                      <span>{event.location}</span>
                      {event.invitation && (
                        <span className="rounded bg-amber-400/10 px-1 py-0.5 text-[8px] font-bold text-amber-400">
                          Invitation
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Date */}
                <div className="col-span-2">
                  <p className="text-xs text-neutral-400">{event.date}</p>
                </div>

                {/* Inscriptions */}
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-800">
                      <div
                        className={`h-full rounded-full transition-all ${
                          occupancy >= 90 ? "bg-red-500" : occupancy >= 60 ? "bg-amber-400" : "bg-emerald-500"
                        }`}
                        style={{ width: `${occupancy}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-neutral-500">
                      {event.registered}/{event.capacity}
                    </span>
                  </div>
                </div>

                {/* Statut */}
                <div className="col-span-1">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusConfig[event.status].color}`}>
                    {statusConfig[event.status].label}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-3 flex items-center justify-end gap-1.5">
                  {event.status === "draft" && (
                    <button
                      onClick={() => updateStatus(event.id, "published")}
                      className="rounded-lg bg-emerald-500/10 px-3 py-1.5 text-[10px] font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/20"
                    >
                      Publier
                    </button>
                  )}
                  {event.status === "published" && (
                    <button
                      onClick={() => updateStatus(event.id, "ongoing")}
                      className="rounded-lg bg-blue-500/10 px-3 py-1.5 text-[10px] font-semibold text-blue-400 transition-colors hover:bg-blue-500/20"
                    >
                      Démarrer
                    </button>
                  )}
                  {event.status === "ongoing" && (
                    <button
                      onClick={() => updateStatus(event.id, "finished")}
                      className="rounded-lg bg-neutral-800 px-3 py-1.5 text-[10px] font-semibold text-neutral-400 transition-colors hover:bg-neutral-700"
                    >
                      Terminer
                    </button>
                  )}
                  <button className="rounded-lg p-1.5 text-neutral-600 transition-colors hover:bg-neutral-800/50 hover:text-neutral-400" title="Modifier">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3.5 w-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </button>
                  <button className="rounded-lg p-1.5 text-neutral-600 transition-colors hover:bg-red-500/10 hover:text-red-400" title="Supprimer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3.5 w-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-sm text-neutral-500">Aucun événement avec ce filtre</p>
        </div>
      )}
    </div>
  );
}
