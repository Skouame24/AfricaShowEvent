"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import { talents } from "@/lib/data/talents";
import { ProfileHero } from "@/components/talents/profile/ProfileHero";
import { ProfileBio } from "@/components/talents/profile/ProfileBio";
import { ProfileSkills } from "@/components/talents/profile/ProfileSkills";
import { ProfileGallery } from "@/components/talents/profile/ProfileGallery";
import { ProfileSidebar } from "@/components/talents/profile/ProfileSidebar";
import { SimilarTalents } from "@/components/talents/profile/SimilarTalents";
import Link from "next/link";

export default function TalentProfilePage() {
  const params = useParams();
  const slug = params.slug as string;

  const talent = useMemo(
    () => talents.find((t) => t.slug === slug),
    [slug]
  );

  const similar = useMemo(() => {
    if (!talent) return [];
    return talents.filter(
      (t) => t.slug !== talent.slug && t.category === talent.category
    );
  }, [talent]);

  if (!talent) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-neutral-400">Talent introuvable</p>
          <Link
            href="/talents"
            className="mt-4 inline-block rounded-xl bg-amber-400 px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-amber-300"
          >
            Retour aux talents
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-20">
      <ProfileHero talent={talent} />

      <div className="mx-auto mt-10 max-w-5xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Colonne principale */}
          <div className="space-y-10">
            <ProfileBio bio={talent.bio} />
            <ProfileSkills skills={talent.skills} />
            <ProfileGallery gallery={talent.gallery} />
          </div>

          {/* Sidebar */}
          <ProfileSidebar talent={talent} />
        </div>
      </div>

      <SimilarTalents talents={similar} />
    </main>
  );
}
