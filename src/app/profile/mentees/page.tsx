"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

const MOCK_MENTEES = [
  {
    id: "1", name: "Nkechi Okafor", title: "Mannequin international", avatar: "from-violet-400 to-purple-500",
    since: "Depuis 3 mois", progress: 75,
    lastActivity: "Session complétée il y a 2 jours",
    skills: ["Mannequinat", "Photographie", "Influence digitale"],
  },
  {
    id: "2", name: "Kofi Mensah", title: "Chanteur Afro-pop", avatar: "from-amber-400 to-orange-500",
    since: "Depuis 1 mois", progress: 40,
    lastActivity: "Message il y a 5 jours",
    skills: ["Chant", "Composition", "Production musicale"],
  },
  {
    id: "3", name: "Aisha Bello", title: "Réalisatrice", avatar: "from-teal-400 to-cyan-500",
    since: "Depuis 2 semaines", progress: 20,
    lastActivity: "Objectifs définis il y a 1 semaine",
    skills: ["Réalisation", "Écriture", "Direction artistique"],
  },
];

export default function MenteesPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

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

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-purple-500/[0.03] blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8">
          <Link href="/profile" className="mb-3 inline-flex items-center gap-2 text-xs text-neutral-600 transition hover:text-purple-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3 w-3"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
            Retour au profil
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Mes mentorés</h1>
              <p className="mt-1 text-sm text-neutral-500">{MOCK_MENTEES.length} talent{MOCK_MENTEES.length > 1 ? "s" : ""} en cours d&apos;accompagnement</p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 text-2xl">
              🎓
            </div>
          </div>
        </div>

        {/* Stats rapides */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          {[
            { label: "Mentorés actifs", value: "3", icon: "👥", color: "text-purple-400" },
            { label: "Sessions ce mois", value: "7", icon: "📅", color: "text-amber-400" },
            { label: "Progression moy.", value: "45%", icon: "📈", color: "text-emerald-400" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-neutral-800/40 bg-neutral-900/20 p-5 text-center">
              <p className="text-xl">{stat.icon}</p>
              <p className={`mt-1 text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-[10px] text-neutral-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Liste des mentorés */}
        <div className="space-y-4">
          {MOCK_MENTEES.map((mentee) => (
            <div
              key={mentee.id}
              className="group relative overflow-hidden rounded-2xl border border-neutral-800/40 bg-neutral-900/20 p-6 transition-all hover:border-purple-400/20 hover:bg-neutral-900/30"
            >
              <div className="flex items-start gap-5">
                <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${mentee.avatar} text-xl font-bold text-white shadow-lg`}>
                  {mentee.name.charAt(0)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">{mentee.name}</h3>
                      <p className="text-xs text-purple-400">{mentee.title}</p>
                    </div>
                    <span className="text-[10px] text-neutral-600">{mentee.since}</span>
                  </div>

                  {/* Barre de progression */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-neutral-500">Progression</span>
                      <span className={`font-bold ${mentee.progress >= 70 ? "text-emerald-400" : mentee.progress >= 40 ? "text-amber-400" : "text-neutral-400"}`}>
                        {mentee.progress}%
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-neutral-800">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          mentee.progress >= 70 ? "bg-gradient-to-r from-emerald-500 to-emerald-400" : mentee.progress >= 40 ? "bg-gradient-to-r from-amber-500 to-amber-400" : "bg-gradient-to-r from-neutral-600 to-neutral-500"
                        }`}
                        style={{ width: `${mentee.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {mentee.skills.map((skill) => (
                      <span key={skill} className="rounded-full bg-purple-400/5 px-2.5 py-1 text-[10px] text-purple-400/60">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className="mt-3 text-[10px] text-neutral-700">{mentee.lastActivity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
