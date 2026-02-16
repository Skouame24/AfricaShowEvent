"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const user = await login(email, password);

      if (user.role === "admin") {
        router.push("/dashboard");
      } else if (!user.onboardingComplete) {
        router.push("/onboarding");
      } else {
        // Talent, Mentor, Brand → même site, page d'accueil
        router.push("/");
      }
    } catch {
      setError("Email ou mot de passe incorrect.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Connexion
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Accédez à votre espace talent, mentor, marque ou administration.
        </p>
      </div>

      {/* Social login */}
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/40 px-4 py-2.5 text-xs font-medium text-neutral-300 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-800/60">
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Google
        </button>
        <button className="flex items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/40 px-4 py-2.5 text-xs font-medium text-neutral-300 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-800/60">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-neutral-800" />
        <span className="text-[10px] uppercase tracking-wider text-neutral-600">ou par email</span>
        <div className="h-px flex-1 bg-neutral-800" />
      </div>

      {/* Erreur */}
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-xs text-red-400">
          {error}
        </div>
      )}

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-neutral-500">
            Email professionnel
          </label>
          <div className="group relative">
            <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600 transition-colors group-focus-within:text-amber-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900/50 py-3 pl-10 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-neutral-600 focus:border-amber-400/50 focus:bg-neutral-900/80 focus:ring-1 focus:ring-amber-400/20"
              placeholder="votre@email.com"
              required
            />
          </div>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-500">
              Mot de passe
            </label>
            <Link href="/auth/forgot-password" className="text-[11px] text-amber-400/70 transition-colors hover:text-amber-400">
              Mot de passe oublié ?
            </Link>
          </div>
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
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900/50 py-3 pl-10 pr-11 text-sm text-white outline-none transition-all duration-300 placeholder:text-neutral-600 focus:border-amber-400/50 focus:bg-neutral-900/80 focus:ring-1 focus:ring-amber-400/20"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-600 transition-colors hover:text-neutral-400"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="remember" className="h-3.5 w-3.5 rounded border-neutral-700 bg-neutral-900 text-amber-400 focus:ring-amber-400/30" />
          <label htmlFor="remember" className="text-xs text-neutral-500 select-none">Se souvenir de moi</label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 py-3 text-sm font-semibold text-black transition-all duration-300 hover:from-amber-300 hover:to-amber-400 hover:shadow-lg hover:shadow-amber-400/20 disabled:opacity-50"
        >
          <span className={isLoading ? "invisible" : ""}>Se connecter</span>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-black/30 border-t-black" />
            </div>
          )}
        </button>
      </form>

      <p className="text-center text-sm text-neutral-500">
        Pas encore de compte ?{" "}
        <Link href="/auth/register" className="font-semibold text-amber-400 transition-colors hover:text-amber-300">
          Créer un compte
        </Link>
      </p>

      {/* Hints de connexion pour chaque rôle */}
      <div className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-700">Comptes de démonstration</p>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => { setEmail("admin@africashowbizroom.com"); setPassword("demo"); }}
            className="group flex items-center gap-2.5 rounded-xl border border-neutral-800/30 bg-neutral-900/20 px-3 py-2.5 text-left transition-all hover:border-red-400/30 hover:bg-red-400/5"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/10 text-xs">🔑</div>
            <div>
              <p className="text-[10px] font-semibold text-red-400">Admin</p>
              <p className="text-[9px] text-neutral-600">Tableau de bord</p>
            </div>
          </button>
          <button
            type="button"
            onClick={() => { setEmail("mentor@africashowbizroom.com"); setPassword("demo"); }}
            className="group flex items-center gap-2.5 rounded-xl border border-neutral-800/30 bg-neutral-900/20 px-3 py-2.5 text-left transition-all hover:border-purple-400/30 hover:bg-purple-400/5"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/10 text-xs">🎓</div>
            <div>
              <p className="text-[10px] font-semibold text-purple-400">Mentor</p>
              <p className="text-[9px] text-neutral-600">Espace mentorat</p>
            </div>
          </button>
          <button
            type="button"
            onClick={() => { setEmail("brand@africashowbizroom.com"); setPassword("demo"); }}
            className="group flex items-center gap-2.5 rounded-xl border border-neutral-800/30 bg-neutral-900/20 px-3 py-2.5 text-left transition-all hover:border-emerald-400/30 hover:bg-emerald-400/5"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-xs">🏢</div>
            <div>
              <p className="text-[10px] font-semibold text-emerald-400">Marque</p>
              <p className="text-[9px] text-neutral-600">Espace entreprise</p>
            </div>
          </button>
          <button
            type="button"
            onClick={() => { setEmail("talent@test.com"); setPassword("demo"); }}
            className="group flex items-center gap-2.5 rounded-xl border border-neutral-800/30 bg-neutral-900/20 px-3 py-2.5 text-left transition-all hover:border-amber-400/30 hover:bg-amber-400/5"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400/10 text-xs">⭐</div>
            <div>
              <p className="text-[10px] font-semibold text-amber-400">Talent</p>
              <p className="text-[9px] text-neutral-600">Nouveau talent</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
