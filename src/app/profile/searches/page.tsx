"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

const MOCK_SEARCHES = [
  {
    id: "1", name: "Chanteurs Afro-pop Lagos", filters: ["Chant", "Lagos", "Disponible"],
    results: 12, created: "Il y a 2 jours",
  },
  {
    id: "2", name: "Mannequins pour Fashion Week", filters: ["Mannequinat", "International", "Curated"],
    results: 8, created: "Il y a 1 semaine",
  },
  {
    id: "3", name: "DJs et producteurs Dakar", filters: ["DJ", "Production musicale", "Dakar"],
    results: 5, created: "Il y a 2 semaines",
  },
];

const SUGGESTED_TALENTS = [
  { name: "Kofi Mensah", title: "Chanteur Afro-pop", avatar: "from-amber-400 to-orange-500", match: 95 },
  { name: "Fatou Diop", title: "Danseuse contemporaine", avatar: "from-pink-400 to-rose-500", match: 88 },
  { name: "Nkechi Okafor", title: "Mannequin international", avatar: "from-violet-400 to-purple-500", match: 82 },
  { name: "Amara Touré", title: "DJ & Producteur", avatar: "from-blue-400 to-indigo-500", match: 76 },
];

export default function SearchesPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

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

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.03] blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8">
          <Link href="/profile" className="mb-3 inline-flex items-center gap-2 text-xs text-neutral-600 transition hover:text-emerald-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3 w-3"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
            Retour au profil
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Mes recherches talents</h1>
              <p className="mt-1 text-sm text-neutral-500">Retrouvez et gérez vos recherches sauvegardées</p>
            </div>
            <Link
              href="/talents"
              className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-5 py-2.5 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-500/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
              Nouvelle recherche
            </Link>
          </div>
        </div>

        {/* Recherches sauvegardées */}
        <section className="mb-10">
          <h2 className="mb-4 text-base font-bold text-white">Recherches sauvegardées</h2>
          <div className="space-y-3">
            {MOCK_SEARCHES.map((search) => (
              <div key={search.id} className="group flex items-center gap-4 rounded-2xl border border-neutral-800/40 bg-neutral-900/20 p-5 transition-all hover:border-emerald-400/20 hover:bg-neutral-900/30">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-lg">
                  🔍
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-white">{search.name}</h3>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {search.filters.map((f) => (
                      <span key={f} className="rounded-full bg-emerald-400/5 px-2 py-0.5 text-[9px] text-emerald-400/60">{f}</span>
                    ))}
                  </div>
                  <p className="mt-1.5 text-[10px] text-neutral-700">{search.created}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-emerald-400">{search.results}</p>
                  <p className="text-[9px] text-neutral-600">résultats</p>
                </div>
                <Link href="/talents" className="rounded-lg bg-white/5 px-3 py-2 text-[10px] font-semibold text-neutral-400 transition hover:bg-white/10 hover:text-white">
                  Voir →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Talents suggérés */}
        <section>
          <h2 className="mb-4 text-base font-bold text-white">
            Talents suggérés pour vous
            <span className="ml-2 text-[10px] font-normal text-neutral-600">basé sur vos recherches</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {SUGGESTED_TALENTS.map((talent) => (
              <div key={talent.name} className="group rounded-2xl border border-neutral-800/40 bg-neutral-900/20 p-5 transition-all hover:border-emerald-400/20">
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${talent.avatar} text-lg font-bold text-white`}>
                    {talent.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-white">{talent.name}</h3>
                    <p className="text-[11px] text-neutral-500">{talent.title}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${talent.match >= 90 ? "text-emerald-400" : talent.match >= 80 ? "text-amber-400" : "text-neutral-400"}`}>
                      {talent.match}%
                    </p>
                    <p className="text-[8px] text-neutral-600">match</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 rounded-lg bg-emerald-500/10 py-2 text-[10px] font-semibold text-emerald-400 transition hover:bg-emerald-500/20">
                    Contacter via ASR
                  </button>
                  <Link href="/talents" className="rounded-lg bg-white/5 px-3 py-2 text-[10px] text-neutral-400 transition hover:bg-white/10 hover:text-white">
                    Profil
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
