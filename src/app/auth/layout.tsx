"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/auth/login";

  return (
    <div className="fixed inset-0 z-[70] flex min-h-screen bg-black">
      {/* ============= CÔTÉ GAUCHE : Branding & Visuel ============= */}
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        {/* Gradient background qui simule une image */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950" />

        {/* Circles décoratifs animés */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-1/4 h-[500px] w-[500px] rounded-full bg-amber-500/8 blur-[120px] animate-pulse" />
          <div className="absolute -right-20 bottom-1/4 h-[400px] w-[400px] rounded-full bg-purple-600/8 blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute left-1/3 top-2/3 h-[300px] w-[300px] rounded-full bg-emerald-500/5 blur-[80px] animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        {/* Pattern de grille subtil */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Contenu branding */}
        <div className="relative flex h-full flex-col justify-between px-12 py-10">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-md transition-all group-hover:bg-amber-400/40" />
              <Image
                src="/logo.png"
                alt="AfricaShowbizRoom"
                width={40}
                height={40}
                className="relative h-10 w-10 rounded-full object-contain"
                priority
              />
            </div>
            <span className="text-lg font-bold tracking-wide text-white">
              AFRICASHOWBIZ
              <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                ROOM
              </span>
            </span>
          </Link>

          {/* Contenu central */}
          <div className="space-y-8">
            {/* Illustration abstraite - Formes géométriques premium */}
            <div className="relative mx-auto h-64 w-64">
              {/* Cercle principal */}
              <div className="absolute inset-4 rounded-full border border-amber-400/20" />
              <div className="absolute inset-10 rounded-full border border-amber-400/10" />
              <div className="absolute inset-16 rounded-full bg-gradient-to-br from-amber-400/20 to-purple-500/20 backdrop-blur-sm" />
              
              {/* Satellites */}
              <div className="absolute -right-2 top-8 h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 opacity-80 shadow-lg shadow-amber-400/20" style={{ animation: "float 6s ease-in-out infinite" }} />
              <div className="absolute -left-4 bottom-12 h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 opacity-70 shadow-lg shadow-purple-500/20" style={{ animation: "float 6s ease-in-out infinite 1s" }} />
              <div className="absolute bottom-2 right-8 h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 opacity-60 shadow-lg shadow-emerald-400/20" style={{ animation: "float 6s ease-in-out infinite 2s" }} />
              
              {/* Icône centrale */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-neutral-900/80 backdrop-blur-xl ring-1 ring-neutral-800">
                  {isLogin ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-amber-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-amber-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM3 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 019.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                    </svg>
                  )}
                </div>
              </div>
            </div>

            {/* Texte */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">
                {isLogin
                  ? "Bon retour parmi nous"
                  : "Rejoignez l'élite créative africaine"}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                {isLogin
                  ? "Connectez-vous pour retrouver votre réseau, vos mentors et vos opportunités."
                  : "Créez votre profil premium et accédez à un réseau qualifié de talents et de professionnels."}
              </p>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-8">
              {[
                { value: "2 500+", label: "Talents" },
                { value: "120+", label: "Mentors" },
                { value: "95%", label: "Satisfaction" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-lg font-bold text-amber-400">{stat.value}</p>
                  <p className="text-[10px] uppercase tracking-wider text-neutral-600">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer gauche */}
          <div className="space-y-4">
            {/* Témoignage */}
            <div className="rounded-xl border border-neutral-800/50 bg-neutral-900/40 p-4 backdrop-blur-sm">
              <p className="text-xs italic leading-relaxed text-neutral-400">
                &ldquo;AfricaShowbizRoom m&apos;a permis de trouver les bons mentors et de
                lancer ma carrière internationale. La curation fait toute la
                différence.&rdquo;
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500" />
                <div>
                  <p className="text-[11px] font-semibold text-white">Amara Diallo</p>
                  <p className="text-[10px] text-neutral-600">Artiste, Dakar</p>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-neutral-700">
              © {new Date().getFullYear()} AfricaShowbizRoom — Tous droits réservés
            </p>
          </div>
        </div>
      </div>

      {/* ============= CÔTÉ DROIT : Formulaire ============= */}
      <div className="flex w-full flex-col lg:w-1/2">
        {/* Barre top mobile */}
        <div className="flex items-center justify-between px-6 py-4 lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="AfricaShowbizRoom"
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-contain"
              priority
            />
            <span className="text-sm font-bold text-white">
              ASR
            </span>
          </Link>
          <Link
            href="/"
            className="text-xs text-neutral-500 transition-colors hover:text-white"
          >
            ← Retour au site
          </Link>
        </div>

        {/* Formulaire centré */}
        <div className="flex flex-1 items-center justify-center px-6 py-8 sm:px-12 lg:px-16">
          <div className="w-full max-w-md">{children}</div>
        </div>

        {/* Lien retour (desktop) */}
        <div className="hidden items-center justify-center pb-6 lg:flex">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-neutral-600 transition-colors hover:text-amber-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3.5 w-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Retour au site
          </Link>
        </div>
      </div>

      {/* CSS inline pour l'animation float */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </div>
  );
}
