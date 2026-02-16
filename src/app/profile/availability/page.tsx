"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

type AvailabilityStatus = "available" | "limited" | "unavailable";

export default function AvailabilityPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [status, setStatus] = useState<AvailabilityStatus>("available");
  const [maxMentees, setMaxMentees] = useState(5);
  const [saved, setSaved] = useState(false);

  const [days, setDays] = useState({
    lundi: true, mardi: true, mercredi: false, jeudi: true, vendredi: true, samedi: false, dimanche: false,
  });

  useEffect(() => {
    if (!isLoading && !user) router.push("/auth/login");
    if (!isLoading && user && user.role !== "mentor") router.push("/profile");
  }, [isLoading, user, router]);

  if (isLoading || !user || user.role !== "mentor") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-purple-400/20 border-t-purple-400" />
      </div>
    );
  }

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const statusConfig: Record<AvailabilityStatus, { label: string; desc: string; color: string; bg: string; ring: string }> = {
    available: { label: "Disponible", desc: "Prêt·e à accueillir de nouveaux talents", color: "text-emerald-400", bg: "bg-emerald-400/10", ring: "ring-emerald-400/30" },
    limited: { label: "Limité", desc: "Places limitées, demandes sélectionnées", color: "text-amber-400", bg: "bg-amber-400/10", ring: "ring-amber-400/30" },
    unavailable: { label: "Indisponible", desc: "Pas de nouvelles prises en charge", color: "text-red-400", bg: "bg-red-400/10", ring: "ring-red-400/30" },
  };

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-purple-500/[0.03] blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-10">
        <div className="mb-8">
          <Link href="/profile" className="mb-3 inline-flex items-center gap-2 text-xs text-neutral-600 transition hover:text-purple-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3 w-3"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
            Retour au profil
          </Link>
          <h1 className="text-3xl font-bold text-white">Ma disponibilité</h1>
          <p className="mt-1 text-sm text-neutral-500">Configurez votre statut et vos créneaux de mentorat</p>
        </div>

        {/* Statut */}
        <section className="mb-8 rounded-2xl border border-neutral-800/40 bg-neutral-900/20 p-8">
          <h2 className="mb-5 flex items-center gap-2 text-base font-bold text-white">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-400/10 text-[11px]">🔔</span>
            Statut de disponibilité
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {(Object.keys(statusConfig) as AvailabilityStatus[]).map((key) => {
              const cfg = statusConfig[key];
              const isSelected = status === key;
              return (
                <button
                  key={key}
                  onClick={() => setStatus(key)}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-5 text-center transition-all ${
                    isSelected ? `${cfg.bg} border-transparent ring-2 ${cfg.ring}` : "border-neutral-800/40 hover:border-neutral-700"
                  }`}
                >
                  <div className={`h-3 w-3 rounded-full ${
                    key === "available" ? "bg-emerald-400" : key === "limited" ? "bg-amber-400" : "bg-red-400"
                  } ${isSelected ? "shadow-lg" : "opacity-40"}`} />
                  <p className={`text-sm font-bold ${isSelected ? cfg.color : "text-neutral-400"}`}>{cfg.label}</p>
                  <p className="text-[10px] text-neutral-600">{cfg.desc}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Nombre max de mentorés */}
        <section className="mb-8 rounded-2xl border border-neutral-800/40 bg-neutral-900/20 p-8">
          <h2 className="mb-5 flex items-center gap-2 text-base font-bold text-white">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-400/10 text-[11px]">👥</span>
            Capacité d&apos;accueil
          </h2>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMaxMentees(Math.max(1, maxMentees - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-800 text-neutral-400 transition hover:bg-white/5 hover:text-white"
              >−</button>
              <span className="w-12 text-center text-2xl font-bold text-amber-400">{maxMentees}</span>
              <button
                onClick={() => setMaxMentees(Math.min(20, maxMentees + 1))}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-800 text-neutral-400 transition hover:bg-white/5 hover:text-white"
              >+</button>
            </div>
            <p className="text-xs text-neutral-500">mentorés maximum en simultané</p>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-800">
              <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-violet-400" style={{ width: `${(3 / maxMentees) * 100}%` }} />
            </div>
            <span className="text-[10px] text-neutral-500">3/{maxMentees} places occupées</span>
          </div>
        </section>

        {/* Jours disponibles */}
        <section className="mb-8 rounded-2xl border border-neutral-800/40 bg-neutral-900/20 p-8">
          <h2 className="mb-5 flex items-center gap-2 text-base font-bold text-white">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-400/10 text-[11px]">📅</span>
            Jours de disponibilité
          </h2>
          <div className="grid grid-cols-7 gap-2">
            {Object.entries(days).map(([day, active]) => (
              <button
                key={day}
                onClick={() => setDays({ ...days, [day]: !active })}
                className={`flex flex-col items-center gap-1 rounded-xl border py-4 text-center transition-all ${
                  active
                    ? "border-purple-400/30 bg-purple-400/10 text-purple-400"
                    : "border-neutral-800/40 text-neutral-600 hover:border-neutral-700"
                }`}
              >
                <span className="text-[10px] font-bold uppercase">{day.slice(0, 3)}</span>
                <div className={`h-2 w-2 rounded-full ${active ? "bg-purple-400" : "bg-neutral-700"}`} />
              </button>
            ))}
          </div>
        </section>

        {/* Bouton sauvegarder */}
        <div className="flex items-center justify-between rounded-2xl border border-neutral-800/30 bg-neutral-900/20 p-5">
          {saved && (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
              Paramètres sauvegardés !
            </span>
          )}
          {!saved && <span />}
          <button
            onClick={handleSave}
            className="rounded-xl bg-gradient-to-r from-purple-500 to-violet-500 px-7 py-3 text-sm font-bold text-white transition-all hover:from-purple-400 hover:to-violet-400 hover:shadow-lg hover:shadow-purple-400/20"
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
}
