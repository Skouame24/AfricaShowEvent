"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";

/* ── SaaS landing sections (visiteurs) ── */
import { HeroSection } from "@/components/home/HeroSection";
import { TrustedBrands } from "@/components/home/TrustedBrands";
import { FeaturedTalents } from "@/components/home/FeaturedTalents";
import { CategoryBrowse } from "@/components/home/CategoryBrowse";
import { EditorialPreview } from "@/components/home/EditorialPreview";
import { HowItWorks } from "@/components/home/HowItWorks";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { PlatformStats } from "@/components/home/PlatformStats";
import { NetworkingCTA } from "@/components/home/NetworkingCTA";

/* ── Feeds personnalisés (connectés) ── */
import { TalentFeed } from "@/components/feed/TalentFeed";
import { MentorFeed } from "@/components/feed/MentorFeed";
import { BrandFeed } from "@/components/feed/BrandFeed";

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Admin → redirect vers dashboard
  useEffect(() => {
    if (!isLoading && user?.role === "admin") {
      router.push("/dashboard");
    }
  }, [user, isLoading, router]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-400/20 border-t-amber-400" />
      </div>
    );
  }

  // Admin redirigé, on affiche rien pendant la redirection
  if (user?.role === "admin") {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-amber-400/20 border-t-amber-400" />
          <p className="mt-4 text-xs text-neutral-500">Redirection vers le dashboard...</p>
        </div>
      </div>
    );
  }

  // ═══ Connecté : feed personnalisé selon le rôle ═══
  if (user) {
    switch (user.role) {
      case "talent":
        return <TalentFeed />;
      case "mentor":
        return <MentorFeed />;
      case "brand":
        return <BrandFeed />;
      default:
        return <TalentFeed />;
    }
  }

  // ═══ Non connecté : page SaaS classique ═══
  return (
    <>
      {/* 1. Hero — Accroche principale + recherche */}
      <HeroSection />

      {/* 2. Bandeau marques partenaires (scroll infini) */}
      <TrustedBrands />

      {/* 3. Talents en vedette — Profils Premium */}
      <FeaturedTalents />

      {/* 4. Navigation par catégories */}
      <CategoryBrowse />

      {/* 5. Éditorial & Média Hub — Articles, portraits, interviews */}
      <EditorialPreview />

      {/* 6. Comment ça marche — Networking qualifié */}
      <HowItWorks />

      {/* 7. Événements privés à venir */}
      <UpcomingEvents />

      {/* 8. Statistiques de la plateforme (compteurs animés) */}
      <PlatformStats />

      {/* 9. Double CTA — Talents & Marques */}
      <NetworkingCTA />
    </>
  );
}
