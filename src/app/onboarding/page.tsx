"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

/* ─── Data ─── */
const SKILL_OPTIONS = [
  { label: "Chant", icon: "🎤" },
  { label: "Rap", icon: "🎙️" },
  { label: "Danse", icon: "💃" },
  { label: "Guitare", icon: "🎸" },
  { label: "Piano", icon: "🎹" },
  { label: "DJ", icon: "🎧" },
  { label: "Composition", icon: "🎼" },
  { label: "Beat Making", icon: "🥁" },
  { label: "Acting", icon: "🎭" },
  { label: "Mannequinat", icon: "👗" },
  { label: "Comédie", icon: "😂" },
  { label: "Réalisation", icon: "🎬" },
  { label: "Photographie", icon: "📸" },
  { label: "Stylisme", icon: "✂️" },
  { label: "Design graphique", icon: "🎨" },
  { label: "Écriture", icon: "✍️" },
  { label: "Voice-over", icon: "🗣️" },
  { label: "Direction artistique", icon: "🌟" },
  { label: "Production musicale", icon: "🔊" },
  { label: "Production vidéo", icon: "📹" },
  { label: "Influence digitale", icon: "📱" },
  { label: "Marketing", icon: "📊" },
  { label: "Management", icon: "💼" },
  { label: "Consulting", icon: "🧠" },
];

const STEPS = [
  { num: 1, label: "Identité", desc: "Votre titre pro", icon: "✦" },
  { num: 2, label: "Histoire", desc: "Votre bio", icon: "📝" },
  { num: 3, label: "Talents", desc: "Vos compétences", icon: "⚡" },
  { num: 4, label: "Médias", desc: "Galerie & réseaux", icon: "🌍" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user, updateProfile, isLoading } = useAuth();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [animating, setAnimating] = useState(false);

  /* ─── Champs ─── */
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [galleryUrls, setGalleryUrls] = useState<string[]>([""]);
  const [socialPlatform, setSocialPlatform] = useState("instagram");
  const [socialUrl, setSocialUrl] = useState("");
  const [socials, setSocials] = useState<{ platform: string; url: string }[]>([]);

  /* ─── Redirect ─── */
  useEffect(() => {
    if (!isLoading && !user) router.push("/auth/login");
  }, [isLoading, user, router]);

  /* ─── Navigation ─── */
  const goTo = useCallback((target: number) => {
    setDirection(target > step ? "forward" : "back");
    setAnimating(true);
    setTimeout(() => {
      setStep(target);
      setAnimating(false);
    }, 250);
  }, [step]);

  const toggleSkill = (s: string) =>
    setSelectedSkills((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const addSocial = () => {
    if (socialUrl.trim()) {
      setSocials([...socials, { platform: socialPlatform, url: socialUrl.trim() }]);
      setSocialUrl("");
    }
  };

  const handleFinish = () => {
    updateProfile({
      title,
      bio,
      skills: selectedSkills,
      gallery: galleryUrls
        .filter((u) => u.trim())
        .map((url) => ({ type: "photo" as const, url, caption: "" })),
      socials,
      onboardingComplete: true,
    });
    router.push("/profile");
  };

  const canNext = () => {
    if (step === 1) return title.trim().length > 2;
    if (step === 2) return bio.trim().length >= 20;
    if (step === 3) return selectedSkills.length >= 1;
    return true;
  };

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="relative">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-amber-400/20 border-t-amber-400" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-5 w-5 rounded-full bg-amber-400/20 animate-pulse-ring" />
          </div>
        </div>
      </div>
    );
  }

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="relative flex min-h-screen bg-black">
      {/* ══════ Background effects ══════ */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -left-40 top-1/4 h-[600px] w-[600px] rounded-full bg-amber-500/[0.04] blur-[150px] animate-float" />
        <div className="absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/[0.04] blur-[120px] animate-float-delayed" />
        <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-emerald-500/[0.02] blur-[100px]" />
        {/* Grille subtile */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* ══════ Sidebar gauche (desktop) ══════ */}
      <div className="relative z-10 hidden w-80 flex-shrink-0 border-r border-neutral-800/50 lg:flex lg:flex-col">
        <div className="flex flex-1 flex-col justify-between px-8 py-10">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-md" />
              <div className="animate-glow-pulse relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600">
                <span className="text-sm font-black text-black">A</span>
              </div>
            </div>
            <span className="text-sm font-bold tracking-wide text-white">
              AFRICASHOWBIZ<span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">ROOM</span>
            </span>
          </Link>

          {/* Steps verticaux */}
          <nav className="my-auto space-y-2">
            {STEPS.map((s, i) => {
              const isActive = step === s.num;
              const isDone = step > s.num;
              return (
                <button
                  key={s.num}
                  onClick={() => isDone && goTo(s.num)}
                  disabled={!isDone && !isActive}
                  className={`group flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left transition-all duration-300 ${
                    isActive
                      ? "bg-amber-400/10 shadow-lg shadow-amber-400/5"
                      : isDone
                        ? "cursor-pointer hover:bg-white/[0.03]"
                        : "cursor-default opacity-40"
                  }`}
                >
                  {/* Numéro / Check */}
                  <div
                    className={`relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-all duration-500 ${
                      isDone
                        ? "bg-emerald-500/20 text-emerald-400"
                        : isActive
                          ? "bg-amber-400/20 text-amber-400 shadow-md shadow-amber-400/10"
                          : "bg-neutral-800/50 text-neutral-600"
                    }`}
                  >
                    {isDone ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="h-4 w-4 animate-bounce-in">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : isActive ? (
                      <>
                        <span>{s.icon}</span>
                        <div className="absolute inset-0 animate-pulse-ring rounded-xl border border-amber-400/30" />
                      </>
                    ) : (
                      <span className="text-xs">{s.num}</span>
                    )}
                  </div>
                  {/* Label */}
                  <div>
                    <p className={`text-sm font-semibold transition-colors ${isActive ? "text-amber-400" : isDone ? "text-neutral-300" : "text-neutral-600"}`}>
                      {s.label}
                    </p>
                    <p className="text-[10px] text-neutral-600">{s.desc}</p>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Aide / skip */}
          <div className="space-y-4">
            <div className="rounded-xl border border-neutral-800/30 bg-neutral-900/30 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-400/60">💡 Astuce</p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-neutral-500">
                {step === 1 && "Un bon titre est concis et percutant. Il apparaîtra partout sur votre profil public."}
                {step === 2 && "Racontez votre histoire avec authenticité. Notre équipe éditorialise chaque bio pour un rendu premium."}
                {step === 3 && "Choisissez vos points forts principaux. Vous pourrez toujours en ajouter plus tard."}
                {step === 4 && "La galerie et les réseaux sociaux renforcent votre crédibilité. Mais vous pouvez les compléter après."}
              </p>
            </div>
            <button
              onClick={handleFinish}
              className="w-full text-center text-[10px] text-neutral-700 transition-colors hover:text-neutral-400"
            >
              Compléter plus tard →
            </button>
          </div>
        </div>
      </div>

      {/* ══════ Contenu principal ══════ */}
      <div className="relative z-10 flex flex-1 flex-col">
        {/* ── Topbar mobile ── */}
        <div className="flex items-center justify-between border-b border-neutral-800/30 px-6 py-4 lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600">
              <span className="text-[9px] font-black text-black">A</span>
            </div>
            <span className="text-xs font-bold text-white">ASR</span>
          </Link>
          <button onClick={handleFinish} className="text-[10px] text-neutral-600">Plus tard →</button>
        </div>

        {/* ── Progress mobile ── */}
        <div className="px-6 py-4 lg:hidden">
          <div className="flex items-center justify-between text-[10px] text-neutral-500">
            <span>Étape {step}/{STEPS.length}</span>
            <span>{STEPS[step - 1].label}</span>
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-neutral-800">
            <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-700 ease-out" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* ── Header ── */}
        <div className="px-6 pt-8 lg:px-16 lg:pt-12">
          {/* Progress bar desktop */}
          <div className="mb-10 hidden lg:block">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-600">
                  Étape {step} sur {STEPS.length}
                </p>
                <h1 className="mt-1 text-3xl font-bold text-white animate-slide-up">
                  {step === 1 && "Comment voulez-vous être présenté ?"}
                  {step === 2 && "Racontez votre histoire"}
                  {step === 3 && "Quels sont vos super-pouvoirs ?"}
                  {step === 4 && "Enrichissez votre univers"}
                </h1>
                <p className="mt-2 text-sm text-neutral-500 animate-slide-up delay-100">
                  {step === 1 && "Un titre percutant qui capte l'attention des marques et mentors."}
                  {step === 2 && "Votre parcours unique en quelques lignes. L'équipe ASR éditorialisera votre bio."}
                  {step === 3 && "Sélectionnez les compétences qui vous définissent le mieux."}
                  {step === 4 && "Galerie, réseaux sociaux — montrez votre univers créatif."}
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="relative flex h-16 w-16 items-center justify-center">
                  <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="#262626" strokeWidth="3" />
                    <circle
                      cx="32" cy="32" r="28" fill="none"
                      stroke="url(#progressGrad)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 28}`}
                      strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                      className="transition-all duration-700 ease-out"
                    />
                    <defs>
                      <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#f97316" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="absolute text-lg font-bold text-amber-400">{Math.round(progress)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Steps content ── */}
        <div className="flex-1 overflow-y-auto px-6 pb-40 lg:px-16">
          <div
            className={`transition-all duration-300 ${
              animating
                ? direction === "forward"
                  ? "translate-x-8 opacity-0"
                  : "-translate-x-8 opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          >
            {/* ════ STEP 1 : Titre ════ */}
            {step === 1 && (
              <div className="space-y-6 animate-slide-up">
                <div className="relative overflow-hidden rounded-2xl border border-neutral-800/50 bg-neutral-900/20 p-8 backdrop-blur-sm">
                  {/* Decorative */}
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber-400/5 blur-2xl" />

                  <div className="relative">
                    <label className="mb-3 flex items-center gap-2 text-xs font-semibold text-white">
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-amber-400/10 text-[10px] text-amber-400">✦</span>
                      Titre professionnel
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder={user.role === "talent" ? "ex: Chanteur Afro-pop & Compositeur" : "ex: Directrice artistique & Consultante"}
                      className="w-full rounded-xl border border-neutral-800/50 bg-black/40 py-4 px-5 text-lg text-white outline-none transition-all duration-300 placeholder:text-neutral-700 focus:border-amber-400/40 focus:shadow-lg focus:shadow-amber-400/5 focus:ring-1 focus:ring-amber-400/10"
                      autoFocus
                    />
                    {title.length > 0 && (
                      <div className="mt-3 flex items-center gap-2 animate-fade-in">
                        <div className={`h-1.5 w-1.5 rounded-full ${title.length > 2 ? "bg-emerald-400" : "bg-amber-400"}`} />
                        <span className={`text-[10px] ${title.length > 2 ? "text-emerald-400" : "text-amber-400"}`}>
                          {title.length > 2 ? "Parfait !" : "Encore un peu..."}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Suggestions */}
                <div className="animate-slide-up delay-200">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-neutral-600">💡 Suggestions populaires</p>
                  <div className="flex flex-wrap gap-2">
                    {(user.role === "talent"
                      ? ["Chanteur·se Afro-pop", "Danseur·se contemporain·e", "DJ & Producteur", "Mannequin international", "Acteur·trice", "Réalisateur·trice", "Photographe", "Styliste & Créateur"]
                      : ["Directeur·trice artistique", "Manager d'artistes", "Consultant·e en stratégie", "Producteur·trice exécutif", "Agent de talents"]
                    ).map((sug, i) => (
                      <button
                        key={sug}
                        onClick={() => setTitle(sug)}
                        className="animate-scale-in rounded-full border border-neutral-800/50 bg-neutral-900/40 px-4 py-2 text-xs text-neutral-400 transition-all duration-300 hover:border-amber-400/30 hover:bg-amber-400/5 hover:text-amber-400 hover:shadow-md hover:shadow-amber-400/5"
                        style={{ animationDelay: `${i * 60}ms` }}
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                {title.trim() && (
                  <div className="animate-scale-in rounded-2xl border border-amber-400/10 bg-amber-400/[0.02] p-6">
                    <p className="mb-2 text-[9px] font-bold uppercase tracking-wider text-amber-400/40">Aperçu de votre carte profil</p>
                    <div className="flex items-center gap-4">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${user.avatar} text-xl font-black text-white shadow-lg`}>
                        {user.fullName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-base font-bold text-white">{user.fullName}</p>
                        <p className="text-sm text-amber-400">{title}</p>
                        {user.location && <p className="mt-0.5 text-[10px] text-neutral-600">📍 {user.location}</p>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ════ STEP 2 : Bio ════ */}
            {step === 2 && (
              <div className="space-y-6 animate-slide-up">
                <div className="relative overflow-hidden rounded-2xl border border-neutral-800/50 bg-neutral-900/20 p-8 backdrop-blur-sm">
                  <div className="absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-purple-400/5 blur-2xl" />

                  <div className="relative">
                    <label className="mb-3 flex items-center gap-2 text-xs font-semibold text-white">
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-purple-400/10 text-[10px] text-purple-400">📝</span>
                      Biographie professionnelle
                    </label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={6}
                      placeholder="Racontez votre parcours, vos réalisations marquantes et ce qui vous rend unique dans l'industrie du divertissement africain..."
                      className="w-full rounded-xl border border-neutral-800/50 bg-black/40 py-4 px-5 text-sm leading-relaxed text-white outline-none transition-all duration-300 placeholder:text-neutral-700 focus:border-amber-400/40 focus:shadow-lg focus:shadow-amber-400/5 focus:ring-1 focus:ring-amber-400/10 resize-none"
                      autoFocus
                    />
                    {/* Compteur + Indicateur */}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-800" style={{ width: "120px" }}>
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              bio.length >= 100 ? "bg-emerald-500" : bio.length >= 20 ? "bg-amber-400" : "bg-neutral-600"
                            }`}
                            style={{ width: `${Math.min(100, (bio.length / 100) * 100)}%` }}
                          />
                        </div>
                        <span className={`text-[10px] font-medium ${bio.length >= 20 ? "text-emerald-400" : "text-neutral-600"}`}>
                          {bio.length}/100+ caractères {bio.length >= 20 && "✓"}
                        </span>
                      </div>
                      <span className="text-[9px] text-neutral-700">
                        ✨ Bio éditorialisée par l&apos;équipe ASR
                      </span>
                    </div>
                  </div>
                </div>

                {/* Conseils */}
                <div className="grid gap-3 animate-slide-up delay-200 sm:grid-cols-3">
                  {[
                    { icon: "🎯", title: "Soyez précis", text: "Mentionnez vos réalisations clés" },
                    { icon: "💎", title: "Soyez authentique", text: "Votre voix unique compte" },
                    { icon: "🚀", title: "Projetez-vous", text: "Parlez de vos ambitions" },
                  ].map((tip, i) => (
                    <div
                      key={tip.title}
                      className="animate-scale-in rounded-xl border border-neutral-800/30 bg-neutral-900/20 p-4 text-center"
                      style={{ animationDelay: `${300 + i * 100}ms` }}
                    >
                      <p className="text-lg">{tip.icon}</p>
                      <p className="mt-1 text-[11px] font-semibold text-white">{tip.title}</p>
                      <p className="mt-0.5 text-[9px] text-neutral-600">{tip.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ════ STEP 3 : Compétences ════ */}
            {step === 3 && (
              <div className="space-y-6 animate-slide-up">
                <div className="relative overflow-hidden rounded-2xl border border-neutral-800/50 bg-neutral-900/20 p-8 backdrop-blur-sm">
                  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-amber-400/5 blur-3xl" />

                  {/* Compteur animé */}
                  <div className="relative mb-6 flex items-center justify-between">
                    <p className="text-xs text-neutral-500">
                      Sélectionnez vos compétences
                    </p>
                    <div className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold transition-all duration-300 ${
                      selectedSkills.length >= 3
                        ? "bg-emerald-500/10 text-emerald-400"
                        : selectedSkills.length >= 1
                          ? "bg-amber-400/10 text-amber-400"
                          : "bg-neutral-800/50 text-neutral-600"
                    }`}>
                      <span className="text-sm">{selectedSkills.length}</span>
                      sélectionnée{selectedSkills.length > 1 ? "s" : ""}
                      {selectedSkills.length >= 3 && <span className="animate-bounce-in">🔥</span>}
                    </div>
                  </div>

                  {/* Grille de compétences */}
                  <div className="relative grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                    {SKILL_OPTIONS.map((skill, i) => {
                      const sel = selectedSkills.includes(skill.label);
                      return (
                        <button
                          key={skill.label}
                          onClick={() => toggleSkill(skill.label)}
                          className={`animate-scale-in group flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left transition-all duration-300 ${
                            sel
                              ? "border-amber-400/40 bg-amber-400/10 shadow-md shadow-amber-400/5"
                              : "border-neutral-800/40 bg-neutral-900/30 hover:border-neutral-700 hover:bg-neutral-800/30"
                          }`}
                          style={{ animationDelay: `${i * 30}ms` }}
                        >
                          <span className={`text-sm transition-transform duration-300 ${sel ? "scale-110" : "group-hover:scale-105"}`}>
                            {skill.icon}
                          </span>
                          <span className={`text-xs font-medium transition-colors ${sel ? "text-amber-400" : "text-neutral-400 group-hover:text-neutral-200"}`}>
                            {skill.label}
                          </span>
                          {sel && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ml-auto h-3.5 w-3.5 flex-shrink-0 text-amber-400 animate-bounce-in">
                              <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Preview tags */}
                {selectedSkills.length > 0 && (
                  <div className="animate-scale-in rounded-2xl border border-amber-400/10 bg-amber-400/[0.02] p-5">
                    <p className="mb-3 text-[9px] font-bold uppercase tracking-wider text-amber-400/40">Vos compétences sur votre profil</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSkills.map((s, i) => (
                        <span
                          key={s}
                          className="animate-bounce-in rounded-full bg-gradient-to-r from-amber-400/10 to-orange-400/10 px-3 py-1.5 text-[11px] font-medium text-amber-400"
                          style={{ animationDelay: `${i * 50}ms` }}
                        >
                          {SKILL_OPTIONS.find((sk) => sk.label === s)?.icon} {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ════ STEP 4 : Galerie & Réseaux ════ */}
            {step === 4 && (
              <div className="space-y-6 animate-slide-up">
                {/* Galerie */}
                <div className="relative overflow-hidden rounded-2xl border border-neutral-800/50 bg-neutral-900/20 p-8 backdrop-blur-sm">
                  <div className="absolute -left-10 -bottom-10 h-36 w-36 rounded-full bg-emerald-400/5 blur-3xl" />

                  <div className="relative">
                    <label className="mb-4 flex items-center gap-2 text-xs font-semibold text-white">
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-400/10 text-[10px] text-emerald-400">📸</span>
                      Galerie photo / vidéo
                      <span className="text-[9px] text-neutral-600">(optionnel)</span>
                    </label>
                    {galleryUrls.map((url, idx) => (
                      <div key={idx} className="animate-scale-in mb-3 flex items-center gap-2" style={{ animationDelay: `${idx * 80}ms` }}>
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-800/50 text-xs text-neutral-500">
                          {idx + 1}
                        </div>
                        <input
                          type="url"
                          value={url}
                          onChange={(e) => {
                            const copy = [...galleryUrls];
                            copy[idx] = e.target.value;
                            setGalleryUrls(copy);
                          }}
                          placeholder="https://votre-image-ou-video.com"
                          className="flex-1 rounded-xl border border-neutral-800/50 bg-black/40 py-2.5 px-4 text-xs text-white outline-none transition-all placeholder:text-neutral-700 focus:border-amber-400/40 focus:ring-1 focus:ring-amber-400/10"
                        />
                        {galleryUrls.length > 1 && (
                          <button onClick={() => setGalleryUrls(galleryUrls.filter((_, i) => i !== idx))} className="rounded-lg p-2 text-neutral-700 transition hover:bg-red-500/10 hover:text-red-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        )}
                      </div>
                    ))}
                    <button onClick={() => setGalleryUrls([...galleryUrls, ""])} className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-amber-400/70 transition hover:text-amber-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3 w-3"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                      Ajouter un média
                    </button>
                  </div>
                </div>

                {/* Réseaux sociaux */}
                <div className="relative overflow-hidden rounded-2xl border border-neutral-800/50 bg-neutral-900/20 p-8 backdrop-blur-sm animate-slide-up delay-200">
                  <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-blue-400/5 blur-3xl" />

                  <div className="relative">
                    <label className="mb-4 flex items-center gap-2 text-xs font-semibold text-white">
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-400/10 text-[10px] text-blue-400">🌐</span>
                      Réseaux sociaux
                      <span className="text-[9px] text-neutral-600">(optionnel)</span>
                    </label>
                    <div className="mb-3 flex items-stretch gap-2">
                      <select
                        value={socialPlatform}
                        onChange={(e) => setSocialPlatform(e.target.value)}
                        className="rounded-xl border border-neutral-800/50 bg-black/40 py-2 px-3 text-xs text-white outline-none focus:border-amber-400/40"
                      >
                        <option value="instagram">📷 Instagram</option>
                        <option value="tiktok">🎵 TikTok</option>
                        <option value="youtube">▶️ YouTube</option>
                        <option value="twitter">𝕏 X / Twitter</option>
                        <option value="linkedin">💼 LinkedIn</option>
                        <option value="spotify">🎧 Spotify</option>
                      </select>
                      <input
                        type="url"
                        value={socialUrl}
                        onChange={(e) => setSocialUrl(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSocial())}
                        placeholder="Lien vers votre profil"
                        className="flex-1 rounded-xl border border-neutral-800/50 bg-black/40 py-2 px-4 text-xs text-white outline-none transition-all placeholder:text-neutral-700 focus:border-amber-400/40"
                      />
                      <button onClick={addSocial} disabled={!socialUrl.trim()} className="rounded-xl bg-amber-400/10 px-4 text-xs font-semibold text-amber-400 transition hover:bg-amber-400/20 disabled:opacity-20">
                        +
                      </button>
                    </div>
                    {socials.length > 0 && (
                      <div className="space-y-2">
                        {socials.map((s, i) => (
                          <div key={i} className="animate-slide-right flex items-center justify-between rounded-xl bg-neutral-800/20 px-4 py-2.5" style={{ animationDelay: `${i * 60}ms` }}>
                            <span className="text-xs text-neutral-300">
                              <span className="font-semibold capitalize text-white">{s.platform}</span>
                              <span className="mx-2 text-neutral-700">·</span>
                              <span className="text-neutral-500">{s.url}</span>
                            </span>
                            <button onClick={() => setSocials(socials.filter((_, j) => j !== i))} className="text-neutral-700 transition hover:text-red-400">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3.5 w-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ══════ Barre de navigation bas ══════ */}
        <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-neutral-800/30 bg-black/80 px-6 py-4 backdrop-blur-xl lg:left-80">
          <div className="mx-auto flex max-w-3xl items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => goTo(step - 1)}
                className="group flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/40 px-5 py-3 text-xs font-medium text-neutral-400 transition-all duration-300 hover:border-neutral-700 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Retour
              </button>
            ) : (
              <div />
            )}
            {step < STEPS.length ? (
              <button
                onClick={() => canNext() && goTo(step + 1)}
                disabled={!canNext()}
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-7 py-3 text-sm font-bold text-black transition-all duration-300 hover:from-amber-300 hover:to-amber-400 hover:shadow-lg hover:shadow-amber-400/20 disabled:opacity-20 disabled:hover:shadow-none"
              >
                Continuer
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:from-emerald-400 hover:to-emerald-500 hover:shadow-emerald-500/30"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                Voir mon profil
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
