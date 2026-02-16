"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth, type UserRole } from "@/lib/auth";

type AccountType = "talent" | "mentor" | "brand" | "";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [accountType, setAccountType] = useState<AccountType>("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await register({
        email,
        password,
        fullName,
        role: accountType as UserRole,
        location,
        companyName: accountType === "brand" ? companyName : undefined,
      });
      // Redirige vers l'onboarding pour compléter le profil
      router.push("/onboarding");
    } catch {
      // erreur
    } finally {
      setIsLoading(false);
    }
  };

  const roleConfig = {
    talent: {
      label: "Talent",
      desc: "Artiste, créateur, mannequin...",
      color: "amber",
      borderActive: "border-amber-400/50 bg-amber-400/5 ring-1 ring-amber-400/20",
      iconBg: "bg-amber-400/20 text-amber-400",
      textColor: "text-amber-400",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
      ),
    },
    mentor: {
      label: "Mentor / Pro",
      desc: "Professionnel, consultant...",
      color: "purple",
      borderActive: "border-purple-400/50 bg-purple-400/5 ring-1 ring-purple-400/20",
      iconBg: "bg-purple-400/20 text-purple-400",
      textColor: "text-purple-400",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
        </svg>
      ),
    },
    brand: {
      label: "Marque / Entreprise",
      desc: "Label, agence, sponsor...",
      color: "emerald",
      borderActive: "border-emerald-400/50 bg-emerald-400/5 ring-1 ring-emerald-400/20",
      iconBg: "bg-emerald-400/20 text-emerald-400",
      textColor: "text-emerald-400",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
        </svg>
      ),
    },
  };

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Créer un compte</h1>
        <p className="mt-2 text-sm text-neutral-500">Rejoignez la plateforme premium du showbiz africain.</p>
      </div>

      {step === 1 && (
        <>
          <div className="space-y-3">
            <p className="text-[11px] font-medium uppercase tracking-wider text-neutral-500">Quel profil vous correspond ?</p>
            <div className="grid grid-cols-3 gap-3">
              {(["talent", "mentor", "brand"] as const).map((type) => {
                const cfg = roleConfig[type];
                const isSelected = accountType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setAccountType(type)}
                    className={`group flex flex-col items-center gap-3 rounded-xl border p-5 text-center transition-all duration-300 ${
                      isSelected ? cfg.borderActive : "border-neutral-800 bg-neutral-900/30 hover:border-neutral-700"
                    }`}
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all ${isSelected ? cfg.iconBg : "bg-neutral-800/50 text-neutral-500 group-hover:text-neutral-400"}`}>
                      {cfg.icon}
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${isSelected ? cfg.textColor : "text-neutral-300"}`}>{cfg.label}</p>
                      <p className="mt-0.5 text-[10px] text-neutral-600">{cfg.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          <button
            onClick={() => accountType && setStep(2)}
            disabled={!accountType}
            className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 py-3 text-sm font-semibold text-black transition-all duration-300 hover:from-amber-300 hover:to-amber-400 disabled:cursor-not-allowed disabled:opacity-30"
          >
            Continuer →
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <button onClick={() => setStep(1)} className="flex items-center gap-2 text-xs text-neutral-500 transition-colors hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3 w-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Profil :{" "}
            <span className={`font-semibold ${accountType ? roleConfig[accountType as keyof typeof roleConfig].textColor : ""}`}>
              {accountType ? roleConfig[accountType as keyof typeof roleConfig].label : ""}
            </span>
          </button>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nom de l'entreprise (uniquement pour brand) */}
            {accountType === "brand" && (
              <div>
                <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-neutral-500">Nom de l&apos;entreprise</label>
                <div className="group relative">
                  <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600 transition-colors group-focus-within:text-emerald-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
                    </svg>
                  </div>
                  <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full rounded-xl border border-neutral-800 bg-neutral-900/50 py-3 pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-neutral-600 focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20" placeholder="Nom de votre label, agence..." required />
                </div>
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-neutral-500">
                {accountType === "brand" ? "Nom du responsable" : "Nom complet"}
              </label>
              <div className="group relative">
                <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600 transition-colors group-focus-within:text-amber-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full rounded-xl border border-neutral-800 bg-neutral-900/50 py-3 pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-neutral-600 focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20" placeholder="Votre nom complet" required />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-neutral-500">Email professionnel</label>
              <div className="group relative">
                <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600 transition-colors group-focus-within:text-amber-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-neutral-800 bg-neutral-900/50 py-3 pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-neutral-600 focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20" placeholder="votre@email.com" required />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-neutral-500">Localisation</label>
              <div className="group relative">
                <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600 transition-colors group-focus-within:text-amber-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full rounded-xl border border-neutral-800 bg-neutral-900/50 py-3 pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-neutral-600 focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20" placeholder="ex: Dakar, Sénégal" required />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-neutral-500">Mot de passe</label>
              <div className="group relative">
                <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600 transition-colors group-focus-within:text-amber-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900/50 py-3 pl-10 pr-11 text-sm text-white outline-none transition-all placeholder:text-neutral-600 focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20"
                  placeholder="Minimum 8 caractères"
                  required
                  minLength={8}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-600 transition-colors hover:text-neutral-400">
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  )}
                </button>
              </div>
              <div className="mt-2 flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full ${password.length >= i * 2 ? (password.length >= 8 ? "bg-emerald-500" : "bg-amber-400") : "bg-neutral-800"}`} />
                ))}
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" id="terms" className="mt-0.5 h-3.5 w-3.5 rounded border-neutral-700 bg-neutral-900 text-amber-400 focus:ring-amber-400/30" required />
              <label htmlFor="terms" className="text-[11px] leading-relaxed text-neutral-500 select-none">
                J&apos;accepte les{" "}
                <Link href="/legal/terms" className="text-amber-400/70 hover:text-amber-400">conditions d&apos;utilisation</Link>
                {" "}et la{" "}
                <Link href="/legal/privacy" className="text-amber-400/70 hover:text-amber-400">politique de confidentialité</Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 py-3 text-sm font-semibold text-black transition-all duration-300 hover:from-amber-300 hover:to-amber-400 hover:shadow-lg hover:shadow-amber-400/20 disabled:opacity-50"
            >
              <span className={isLoading ? "invisible" : ""}>Créer mon compte</span>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                </div>
              )}
            </button>
          </form>
        </>
      )}

      <p className="text-center text-sm text-neutral-500">
        Déjà un compte ?{" "}
        <Link href="/auth/login" className="font-semibold text-amber-400 transition-colors hover:text-amber-300">Se connecter</Link>
      </p>
    </div>
  );
}
