"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/auth";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/talents", label: "Talents" },
  { href: "/events", label: "Opportunités" },
  { href: "/editorial", label: "Média Hub" },
  { href: "/networking", label: "Mentorat" },
];

/* ─── Menu items par rôle ─── */
type MenuItem = { href: string; label: string; badge?: string; badgeColor?: string; icon: React.ReactNode };

function getDropdownItems(role: string) {
  const common: MenuItem[] = [
    {
      href: "/profile",
      label: "Mon profil",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 text-neutral-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
    },
    {
      href: "/profile/edit",
      label: "Modifier le profil",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 text-neutral-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      ),
    },
  ];

  const roleItems: Record<string, { href: string; label: string; badge?: string; badgeColor?: string; icon: React.ReactNode }[]> = {
    admin: [
      {
        href: "/dashboard",
        label: "Dashboard admin",
        badge: "ADMIN",
        badgeColor: "bg-red-500/10 text-red-400",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 text-neutral-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
          </svg>
        ),
      },
    ],
    mentor: [
      {
        href: "/profile/requests",
        label: "Demandes reçues",
        badge: "3",
        badgeColor: "bg-purple-500/10 text-purple-400",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 text-neutral-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.981l7.5-4.039a2.25 2.25 0 012.134 0l7.5 4.039a2.25 2.25 0 011.183 1.98V19.5z" />
          </svg>
        ),
      },
      {
        href: "/profile/mentees",
        label: "Mes mentorés",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 text-neutral-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
          </svg>
        ),
      },
      {
        href: "/profile/availability",
        label: "Ma disponibilité",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 text-neutral-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
        ),
      },
    ],
    talent: [
      {
        href: "/profile/requests",
        label: "Mes demandes de mentorat",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 text-neutral-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.981l7.5-4.039a2.25 2.25 0 012.134 0l7.5 4.039a2.25 2.25 0 011.183 1.98V19.5z" />
          </svg>
        ),
      },
    ],
    brand: [
      {
        href: "/profile/contacts",
        label: "Mes demandes de contact",
        badge: "2",
        badgeColor: "bg-emerald-500/10 text-emerald-400",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 text-neutral-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        ),
      },
      {
        href: "/profile/searches",
        label: "Mes recherches talents",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 text-neutral-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        ),
      },
    ],
  };

  return [...common, ...(roleItems[role] || [])];
}

function getRoleBadge(role: string) {
  const config: Record<string, { label: string; color: string }> = {
    admin: { label: "Admin", color: "bg-red-500/10 text-red-400" },
    mentor: { label: "Mentor", color: "bg-purple-500/10 text-purple-400" },
    talent: { label: "Talent", color: "bg-amber-400/10 text-amber-400" },
    brand: { label: "Marque", color: "bg-emerald-500/10 text-emerald-400" },
  };
  return config[role] || config.talent;
}

export function MainHeader() {
  const pathname = usePathname();
  const { user, logout, isLoading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Détecte le scroll pour l'effet glassmorphism
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer le dropdown quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
  };

  const roleBadge = user ? getRoleBadge(user.role) : null;
  const menuItems = user ? getDropdownItems(user.role) : [];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/70 shadow-lg shadow-black/30 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        {/* Ligne accent dorée en haut */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60" />

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* ---- Logo ---- */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-md transition-all duration-300 group-hover:bg-amber-400/40 group-hover:blur-lg" />
              <Image
                src="/logo.png"
                alt="AfricaShowbizRoom"
                width={36}
                height={36}
                className="relative h-9 w-9 rounded-full object-contain"
                priority
              />
            </div>
            <span className="text-base font-bold tracking-wide text-white transition-colors duration-300 group-hover:text-amber-50">
              AFRICASHOWBIZ
              <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                ROOM
              </span>
            </span>
          </Link>

          {/* ---- Navigation desktop ---- */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-amber-400"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-300 ${
                      isActive ? "w-3/4" : "w-0 group-hover:w-3/4"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* ---- Actions droite ---- */}
          <div className="hidden items-center gap-2 md:flex">
            {/* Recherche */}
            <button
              aria-label="Rechercher"
              onClick={() => setSearchOpen(true)}
              className="relative rounded-full p-2.5 text-neutral-400 transition-all duration-300 hover:bg-white/5 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-[18px] w-[18px]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>

            {/* Notifications (seulement si connecté) */}
            {user && (
              <button
                aria-label="Notifications"
                className="relative rounded-full p-2.5 text-neutral-400 transition-all duration-300 hover:bg-white/5 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-[18px] w-[18px]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
                <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
                  <span className="animate-notification-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
                </span>
              </button>
            )}

            <div className="mx-1 h-6 w-px bg-neutral-800" />

            {/* ===== CONNECTÉ : Avatar + Dropdown ===== */}
            {!isLoading && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="group relative flex items-center gap-2.5 rounded-full p-1 transition-all duration-300 hover:bg-white/5"
                >
                  {/* Avatar */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 via-purple-500 to-amber-400 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-60" />
                    <div className={`relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br ${user.avatar} ring-2 ring-neutral-700 transition-all duration-300 group-hover:ring-amber-400/50`}>
                      {/* Initiale */}
                      <div className="flex h-full w-full items-center justify-center text-xs font-bold text-white">
                        {user.fullName.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    {/* Dot de statut en ligne */}
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-black bg-emerald-400" />
                  </div>

                  {/* Nom (desktop) */}
                  <div className="hidden items-center gap-1.5 lg:flex">
                    <span className="max-w-[100px] truncate text-xs font-medium text-neutral-300">
                      {user.fullName}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className={`h-3 w-3 text-neutral-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </button>

                {/* ===== DROPDOWN MENU ===== */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-neutral-800/60 bg-neutral-900/95 shadow-2xl shadow-black/40 backdrop-blur-xl">
                    {/* Header du dropdown */}
                    <div className="border-b border-neutral-800/40 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${user.avatar}`}>
                          <span className="text-sm font-bold text-white">
                            {user.fullName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-white">
                            {user.fullName}
                          </p>
                          <p className="truncate text-[10px] text-neutral-500">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      {/* Badges rôle */}
                      <div className="mt-2 flex items-center gap-2">
                        {roleBadge && (
                          <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${roleBadge.color}`}>
                            {roleBadge.label}
                          </span>
                        )}
                        {user.verified && (
                          <span className="flex items-center gap-1 text-[9px] text-blue-400">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
                              <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.307 4.491 4.491 0 01-1.307-3.497A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307z" clipRule="evenodd" />
                            </svg>
                            Vérifié
                          </span>
                        )}
                        {user.curated && (
                          <span className="flex items-center gap-1 text-[9px] text-amber-400">
                            ✦ Curated
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Menu items dynamiques par rôle */}
                    <div className="py-1.5">
                      {menuItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
                        >
                          {item.icon}
                          <span className="flex-1">{item.label}</span>
                          {item.badge && (
                            <span className={`rounded px-1.5 py-0.5 text-[8px] font-bold ${item.badgeColor || "bg-neutral-800 text-neutral-400"}`}>
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>

                    {/* Séparateur + Déconnexion */}
                    <div className="border-t border-neutral-800/40 py-1.5">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-400/70 transition-colors hover:bg-red-500/5 hover:text-red-400"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>
                        Déconnexion
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : !isLoading ? (
              /* ===== DÉCONNECTÉ : Bouton Rejoindre ===== */
              <Link
                href="/auth/register"
                className="group relative overflow-hidden rounded-full px-5 py-2 text-sm font-semibold text-black transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 transition-all duration-300 group-hover:from-amber-300 group-hover:via-yellow-200 group-hover:to-amber-300" />
                <div className="absolute inset-0 rounded-full opacity-0 shadow-lg shadow-amber-400/30 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative z-10">Rejoindre</span>
              </Link>
            ) : null}
          </div>

          {/* ---- Burger mobile ---- */}
          <button
            className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/5 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <div className="flex h-5 w-5 flex-col items-center justify-center gap-1.5">
              <span
                className={`block h-[1.5px] w-5 rounded-full bg-white transition-all duration-300 ${
                  mobileOpen ? "translate-y-[4.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] w-5 rounded-full bg-white transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] w-5 rounded-full bg-white transition-all duration-300 ${
                  mobileOpen ? "-translate-y-[4.5px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* ---- Menu mobile plein écran ---- */}
      {mobileOpen && (
        <div className="animate-fade-in-down fixed inset-0 z-40 flex flex-col bg-black/95 pt-20 backdrop-blur-xl md:hidden">
          <nav className="flex flex-1 flex-col items-center justify-center gap-8">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-2xl font-semibold transition-colors hover:text-amber-400 ${
                    isActive ? "text-amber-400" : "text-neutral-300"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex flex-col items-center gap-4 pb-12">
            {user ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-full border border-neutral-700 px-6 py-3 text-base font-semibold text-white transition-all hover:border-amber-400/40"
                >
                  <div className={`h-7 w-7 rounded-full bg-gradient-to-br ${user.avatar}`} />
                  {user.fullName}
                </Link>
                {/* Mobile role-specific links */}
                <div className="flex flex-wrap justify-center gap-2">
                  {menuItems.slice(2).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-full border border-neutral-800 px-4 py-2 text-xs text-neutral-400 transition hover:border-amber-400/30 hover:text-amber-400"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <button
                  onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="text-sm text-red-400/70 transition-colors hover:text-red-400"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                href="/auth/register"
                onClick={() => setMobileOpen(false)}
                className="rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-8 py-3 text-base font-semibold text-black transition-all hover:from-amber-300 hover:to-amber-400"
              >
                Rejoindre
              </Link>
            )}
            <p className="text-xs text-neutral-600">
              © {new Date().getFullYear()} AfricaShowbizRoom
            </p>
          </div>
        </div>
      )}

      {/* ---- Overlay de recherche ---- */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/80 pt-28 backdrop-blur-md"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="animate-fade-in-down mx-6 w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 rounded-2xl border border-neutral-700/50 bg-neutral-900/90 px-5 py-4 shadow-2xl shadow-amber-900/10 backdrop-blur-xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 flex-shrink-0 text-amber-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                placeholder="Rechercher talents, mentors, événements, articles..."
                className="w-full bg-transparent text-base text-neutral-200 placeholder-neutral-500 outline-none"
                autoFocus
              />
              <kbd className="hidden rounded-md border border-neutral-700 px-2 py-0.5 text-[10px] font-medium text-neutral-500 sm:inline-block">
                ESC
              </kbd>
            </div>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {["Musiciens", "Mannequins", "Influenceurs", "Réalisateurs", "Mode"].map(
                (tag) => (
                  <button
                    key={tag}
                    className="rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1 text-xs text-neutral-400 transition-all hover:border-amber-400/40 hover:text-amber-400"
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
