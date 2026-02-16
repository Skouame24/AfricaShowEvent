"use client";

import { useState, useMemo } from "react";
import { mentors } from "@/lib/data/mentors";
import type { Mentor } from "@/lib/data/mentors";
import { NetworkingHero } from "@/components/networking/NetworkingHero";
import { HowMentorshipWorks } from "@/components/networking/HowMentorshipWorks";
import { MentorFilters } from "@/components/networking/MentorFilters";
import { MentorGrid } from "@/components/networking/MentorGrid";
import { NetworkingTestimonials } from "@/components/networking/NetworkingTestimonials";
import { NetworkingCTA } from "@/components/networking/NetworkingCTA";
import { ConnectionRequestModal } from "@/components/networking/ConnectionRequestModal";

export default function NetworkingPage() {
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

  const filteredMentors = useMemo(() => {
    return mentors.filter((m) => {
      const matchDomain = selectedDomain === "all" || m.domain === selectedDomain;
      const matchStatus =
        selectedStatus === "all" ||
        (selectedStatus === "available" && m.status === "available") ||
        (selectedStatus === "limited" && m.status === "limited");
      return matchDomain && matchStatus;
    });
  }, [selectedDomain, selectedStatus]);

  return (
    <main className="min-h-screen bg-black pt-20">
      <NetworkingHero />
      <HowMentorshipWorks />

      {/* Separator */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
      </div>

      {/* Section mentors */}
      <div className="pt-12">
        <div className="mx-auto max-w-7xl px-6 pb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white md:text-2xl">
              Nos mentors <span className="text-amber-400">vérifiés</span>
            </h2>
            <span className="rounded-full bg-neutral-800/60 px-2.5 py-0.5 text-[11px] font-semibold text-neutral-400">
              {filteredMentors.length} mentor{filteredMentors.length > 1 ? "s" : ""}
            </span>
          </div>
          <p className="mt-1 text-xs text-neutral-500">
            Chaque profil est vérifié et curé par notre équipe éditoriale
          </p>
        </div>

        <MentorFilters
          selectedDomain={selectedDomain}
          onDomainChange={setSelectedDomain}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />
        <MentorGrid
          mentors={filteredMentors}
          onRequestConnection={(mentor) => setSelectedMentor(mentor)}
        />
      </div>

      <NetworkingTestimonials />

      {/* Separator */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
      </div>

      <NetworkingCTA />

      {/* Modal de mise en relation */}
      {selectedMentor && (
        <ConnectionRequestModal
          mentor={selectedMentor}
          onClose={() => setSelectedMentor(null)}
        />
      )}
    </main>
  );
}
