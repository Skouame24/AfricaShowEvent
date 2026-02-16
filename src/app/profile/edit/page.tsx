"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

const SKILL_OPTIONS = [
  { label: "Chant", icon: "🎤" }, { label: "Rap", icon: "🎙️" }, { label: "Danse", icon: "💃" },
  { label: "Guitare", icon: "🎸" }, { label: "Piano", icon: "🎹" }, { label: "DJ", icon: "🎧" },
  { label: "Composition", icon: "🎼" }, { label: "Beat Making", icon: "🥁" }, { label: "Acting", icon: "🎭" },
  { label: "Mannequinat", icon: "👗" }, { label: "Comédie", icon: "😂" }, { label: "Réalisation", icon: "🎬" },
  { label: "Photographie", icon: "📸" }, { label: "Stylisme", icon: "✂️" }, { label: "Design graphique", icon: "🎨" },
  { label: "Écriture", icon: "✍️" }, { label: "Voice-over", icon: "🗣️" }, { label: "Direction artistique", icon: "🌟" },
  { label: "Production musicale", icon: "🔊" }, { label: "Production vidéo", icon: "📹" },
  { label: "Influence digitale", icon: "📱" }, { label: "Marketing", icon: "📊" },
  { label: "Management", icon: "💼" }, { label: "Consulting", icon: "🧠" },
];

export default function EditProfilePage() {
  const router = useRouter();
  const { user, updateProfile, isLoading } = useAuth();

  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [galleryUrls, setGalleryUrls] = useState<string[]>([""]);
  const [socialPlatform, setSocialPlatform] = useState("instagram");
  const [socialUrl, setSocialUrl] = useState("");
  const [socials, setSocials] = useState<{ platform: string; url: string }[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState("general");

  useEffect(() => {
    if (!isLoading && !user) router.push("/auth/login");
    if (user) {
      setFullName(user.fullName || "");
      setTitle(user.title || "");
      setLocation(user.location || "");
      setBio(user.bio || "");
      setSelectedSkills(user.skills || []);
      setGalleryUrls(user.gallery && user.gallery.length > 0 ? user.gallery.map((g) => g.url) : [""]);
      setSocials(user.socials || []);
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-amber-400/20 border-t-amber-400" />
      </div>
    );
  }

  const toggleSkill = (s: string) =>
    setSelectedSkills((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const addSocial = () => {
    if (socialUrl.trim()) {
      setSocials([...socials, { platform: socialPlatform, url: socialUrl.trim() }]);
      setSocialUrl("");
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      updateProfile({
        fullName, title, location, bio,
        skills: selectedSkills,
        gallery: galleryUrls.filter((u) => u.trim()).map((url) => ({ type: "photo" as const, url, caption: "" })),
        socials,
        onboardingComplete: true,
      });
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 600);
  };

  const SECTIONS = [
    { key: "general", label: "Général", icon: "✦" },
    { key: "bio", label: "Biographie", icon: "📝" },
    { key: "skills", label: "Compétences", icon: "⚡" },
    { key: "gallery", label: "Galerie", icon: "📸" },
    { key: "socials", label: "Réseaux", icon: "🌐" },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-amber-500/[0.03] blur-[150px]" />
        <div className="absolute -right-40 bottom-20 h-[400px] w-[400px] rounded-full bg-purple-600/[0.03] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-10">
        {/* ── Header ── */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="animate-slide-up">
            <Link href="/profile" className="mb-3 inline-flex items-center gap-2 text-xs text-neutral-600 transition hover:text-amber-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3 w-3"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
              Retour au profil
            </Link>
            <h1 className="text-3xl font-bold text-white">Modifier le profil</h1>
            <p className="mt-1 text-sm text-neutral-600">Mettez à jour vos informations professionnelles</p>
          </div>
          <div className="animate-slide-up delay-100 flex items-center gap-3">
            {saved && (
              <span className="animate-bounce-in flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                Sauvegardé !
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-2.5 text-sm font-bold text-black transition-all hover:from-amber-300 hover:to-amber-400 hover:shadow-lg hover:shadow-amber-400/20 disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full transition-transform duration-700 group-hover:translate-x-full" />
              <span className={`relative flex items-center gap-2 ${isSaving ? "invisible" : ""}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                Sauvegarder
              </span>
              {isSaving && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                </div>
              )}
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* ── Navigation latérale ── */}
          <div className="animate-slide-up delay-200 lg:col-span-1">
            <nav className="sticky top-24 space-y-1">
              {SECTIONS.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setActiveSection(s.key)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-300 ${
                    activeSection === s.key
                      ? "bg-amber-400/10 text-amber-400 shadow-md shadow-amber-400/5"
                      : "text-neutral-500 hover:bg-white/[0.02] hover:text-neutral-300"
                  }`}
                >
                  <span>{s.icon}</span>
                  {s.label}
                </button>
              ))}
              {/* Preview card */}
              <div className="mt-6 rounded-xl border border-neutral-800/30 bg-neutral-900/20 p-4">
                <p className="mb-2 text-[9px] font-bold uppercase tracking-wider text-neutral-700">Aperçu carte</p>
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${user.avatar} text-sm font-bold text-white`}>
                    {(fullName || user.fullName).charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-white">{fullName || "Nom"}</p>
                    <p className="truncate text-[10px] text-amber-400">{title || "Titre"}</p>
                    <p className="truncate text-[9px] text-neutral-600">{location || "Localisation"}</p>
                  </div>
                </div>
                {selectedSkills.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {selectedSkills.slice(0, 3).map((s) => (
                      <span key={s} className="rounded-full bg-amber-400/5 px-2 py-0.5 text-[8px] text-amber-400/60">{s}</span>
                    ))}
                    {selectedSkills.length > 3 && (
                      <span className="text-[8px] text-neutral-600">+{selectedSkills.length - 3}</span>
                    )}
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* ── Contenu ── */}
          <div className="space-y-8 lg:col-span-3">
            {/* GÉNÉRAL */}
            {activeSection === "general" && (
              <section className="animate-fade-in relative overflow-hidden rounded-2xl border border-neutral-800/40 bg-neutral-900/20 p-8">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-400/[0.03] blur-2xl" />
                <div className="relative space-y-6">
                  <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400/10 text-xs">✦</span>
                    Informations générales
                  </h2>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                        <span className="text-amber-400">*</span> Nom complet
                      </label>
                      <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
                        className="w-full rounded-xl border border-neutral-800/50 bg-black/40 py-3.5 px-4 text-sm text-white outline-none transition-all placeholder:text-neutral-700 focus:border-amber-400/40 focus:shadow-lg focus:shadow-amber-400/5 focus:ring-1 focus:ring-amber-400/10" />
                    </div>
                    <div>
                      <label className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                        <span className="text-amber-400">*</span> Titre professionnel
                      </label>
                      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                        placeholder="ex: Chanteur Afro-pop & Compositeur"
                        className="w-full rounded-xl border border-neutral-800/50 bg-black/40 py-3.5 px-4 text-sm text-white outline-none transition-all placeholder:text-neutral-700 focus:border-amber-400/40 focus:shadow-lg focus:shadow-amber-400/5 focus:ring-1 focus:ring-amber-400/10" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-neutral-500">Localisation</label>
                      <div className="group relative">
                        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-700 transition-colors group-focus-within:text-amber-400">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                        </div>
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}
                          placeholder="ex: Dakar, Sénégal"
                          className="w-full rounded-xl border border-neutral-800/50 bg-black/40 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-neutral-700 focus:border-amber-400/40 focus:shadow-lg focus:shadow-amber-400/5 focus:ring-1 focus:ring-amber-400/10" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* BIO */}
            {activeSection === "bio" && (
              <section className="animate-fade-in relative overflow-hidden rounded-2xl border border-neutral-800/40 bg-neutral-900/20 p-8">
                <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-purple-400/[0.03] blur-2xl" />
                <div className="relative space-y-5">
                  <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-400/10 text-xs">📝</span>
                    Biographie professionnelle
                  </h2>
                  <p className="text-xs text-neutral-600">Votre bio sera relue et éditorialisée par l&apos;équipe ASR pour un rendu premium ✨</p>
                  <textarea
                    value={bio} onChange={(e) => setBio(e.target.value)}
                    rows={7}
                    placeholder="Racontez votre parcours, vos réalisations et ce qui vous rend unique..."
                    className="w-full rounded-xl border border-neutral-800/50 bg-black/40 py-4 px-5 text-sm leading-relaxed text-white outline-none transition-all placeholder:text-neutral-700 focus:border-amber-400/40 focus:shadow-lg focus:shadow-amber-400/5 focus:ring-1 focus:ring-amber-400/10 resize-none" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 overflow-hidden rounded-full bg-neutral-800" style={{ width: "100px" }}>
                        <div className={`h-full rounded-full transition-all duration-500 ${bio.length >= 100 ? "bg-emerald-500" : bio.length >= 20 ? "bg-amber-400" : "bg-neutral-600"}`}
                          style={{ width: `${Math.min(100, (bio.length / 100) * 100)}%` }} />
                      </div>
                      <span className={`text-[10px] font-medium ${bio.length >= 20 ? "text-emerald-400" : "text-neutral-600"}`}>
                        {bio.length} caractères
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* SKILLS */}
            {activeSection === "skills" && (
              <section className="animate-fade-in relative overflow-hidden rounded-2xl border border-neutral-800/40 bg-neutral-900/20 p-8">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-400/[0.03] blur-2xl" />
                <div className="relative space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400/10 text-xs">⚡</span>
                      Compétences clés
                    </h2>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                      selectedSkills.length >= 3 ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-400/10 text-amber-400"
                    }`}>
                      {selectedSkills.length} sélectionnée{selectedSkills.length > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                    {SKILL_OPTIONS.map((skill, i) => {
                      const sel = selectedSkills.includes(skill.label);
                      return (
                        <button key={skill.label} onClick={() => toggleSkill(skill.label)}
                          className={`animate-scale-in group flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition-all duration-300 ${
                            sel ? "border-amber-400/40 bg-amber-400/10 shadow-md shadow-amber-400/5" : "border-neutral-800/40 bg-neutral-900/30 hover:border-neutral-700 hover:bg-neutral-800/30"
                          }`}
                          style={{ animationDelay: `${i * 20}ms` }}>
                          <span className="text-sm">{skill.icon}</span>
                          <span className={`text-[11px] font-medium ${sel ? "text-amber-400" : "text-neutral-400"}`}>{skill.label}</span>
                          {sel && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ml-auto h-3 w-3 flex-shrink-0 text-amber-400 animate-bounce-in">
                              <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}

            {/* GALLERY */}
            {activeSection === "gallery" && (
              <section className="animate-fade-in relative overflow-hidden rounded-2xl border border-neutral-800/40 bg-neutral-900/20 p-8">
                <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-emerald-400/[0.03] blur-2xl" />
                <div className="relative space-y-5">
                  <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-400/10 text-xs">📸</span>
                    Galerie photo / vidéo
                  </h2>
                  <p className="text-xs text-neutral-600">Ajoutez des liens vers vos photos ou vidéos pour illustrer votre talent</p>
                  {galleryUrls.map((url, idx) => (
                    <div key={idx} className="animate-scale-in flex items-center gap-3" style={{ animationDelay: `${idx * 60}ms` }}>
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-neutral-800/40 text-sm text-neutral-600">{idx + 1}</div>
                      <input type="url" value={url}
                        onChange={(e) => { const c = [...galleryUrls]; c[idx] = e.target.value; setGalleryUrls(c); }}
                        placeholder="https://votre-media.com/image.jpg"
                        className="flex-1 rounded-xl border border-neutral-800/50 bg-black/40 py-3 px-4 text-xs text-white outline-none transition-all placeholder:text-neutral-700 focus:border-amber-400/40 focus:ring-1 focus:ring-amber-400/10" />
                      {galleryUrls.length > 1 && (
                        <button onClick={() => setGalleryUrls(galleryUrls.filter((_, i) => i !== idx))}
                          className="rounded-xl p-2.5 text-neutral-700 transition hover:bg-red-500/10 hover:text-red-400">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      )}
                    </div>
                  ))}
                  <button onClick={() => setGalleryUrls([...galleryUrls, ""])}
                    className="flex items-center gap-2 rounded-xl border border-dashed border-neutral-800/40 px-5 py-3 text-xs font-medium text-amber-400/60 transition hover:border-amber-400/30 hover:bg-amber-400/[0.02] hover:text-amber-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                    Ajouter un média
                  </button>
                </div>
              </section>
            )}

            {/* SOCIALS */}
            {activeSection === "socials" && (
              <section className="animate-fade-in relative overflow-hidden rounded-2xl border border-neutral-800/40 bg-neutral-900/20 p-8">
                <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-blue-400/[0.03] blur-2xl" />
                <div className="relative space-y-5">
                  <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-400/10 text-xs">🌐</span>
                    Réseaux sociaux
                  </h2>
                  <div className="flex items-stretch gap-2">
                    <select value={socialPlatform} onChange={(e) => setSocialPlatform(e.target.value)}
                      className="rounded-xl border border-neutral-800/50 bg-black/40 py-2.5 px-4 text-xs text-white outline-none focus:border-amber-400/40">
                      <option value="instagram">📷 Instagram</option>
                      <option value="tiktok">🎵 TikTok</option>
                      <option value="youtube">▶️ YouTube</option>
                      <option value="twitter">𝕏 X / Twitter</option>
                      <option value="linkedin">💼 LinkedIn</option>
                      <option value="spotify">🎧 Spotify</option>
                    </select>
                    <input type="url" value={socialUrl} onChange={(e) => setSocialUrl(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSocial())}
                      placeholder="Lien vers votre profil"
                      className="flex-1 rounded-xl border border-neutral-800/50 bg-black/40 py-2.5 px-4 text-xs text-white outline-none transition-all placeholder:text-neutral-700 focus:border-amber-400/40" />
                    <button onClick={addSocial} disabled={!socialUrl.trim()}
                      className="rounded-xl bg-amber-400/10 px-5 text-xs font-bold text-amber-400 transition hover:bg-amber-400/20 disabled:opacity-20">+</button>
                  </div>
                  {socials.length > 0 && (
                    <div className="space-y-2">
                      {socials.map((s, i) => (
                        <div key={i} className="animate-slide-right flex items-center justify-between rounded-xl border border-neutral-800/20 bg-neutral-900/30 px-4 py-3" style={{ animationDelay: `${i * 60}ms` }}>
                          <div className="flex items-center gap-3">
                            <span className="text-lg">
                              {s.platform === "instagram" && "📷"}{s.platform === "tiktok" && "🎵"}{s.platform === "youtube" && "▶️"}{s.platform === "twitter" && "𝕏"}{s.platform === "linkedin" && "💼"}{s.platform === "spotify" && "🎧"}
                            </span>
                            <div>
                              <p className="text-xs font-semibold capitalize text-white">{s.platform}</p>
                              <p className="max-w-[250px] truncate text-[10px] text-neutral-500">{s.url}</p>
                            </div>
                          </div>
                          <button onClick={() => setSocials(socials.filter((_, j) => j !== i))}
                            className="rounded-lg p-2 text-neutral-700 transition hover:bg-red-500/10 hover:text-red-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Save bar bottom */}
            <div className="flex items-center justify-between rounded-2xl border border-neutral-800/30 bg-neutral-900/20 p-5">
              <Link href="/profile" className="text-xs text-neutral-600 transition hover:text-neutral-400">Annuler</Link>
              <button onClick={handleSave} disabled={isSaving}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-7 py-3 text-sm font-bold text-black transition-all hover:from-amber-300 hover:to-amber-400 hover:shadow-lg hover:shadow-amber-400/20 disabled:opacity-50">
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full transition-transform duration-700 group-hover:translate-x-full" />
                <span className={`relative ${isSaving ? "invisible" : ""}`}>
                  {saved ? "✓ Sauvegardé !" : "Sauvegarder les modifications"}
                </span>
                {isSaving && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
