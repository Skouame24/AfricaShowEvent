"use client";

import { useMemo, useState } from "react";
import { talents } from "@/lib/data/talents";
import { TalentHero } from "@/components/talents/TalentHero";
import { TalentFilters } from "@/components/talents/TalentFilters";
import { TalentGrid } from "@/components/talents/TalentGrid";

export default function TalentsPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedLocation, setSelectedLocation] = useState("Tous les pays");

  const filtered = useMemo(() => {
    return talents.filter((t) => {
      // Catégorie
      if (selectedCategory !== "Tous" && t.category !== selectedCategory) return false;
      // Localisation
      if (selectedLocation !== "Tous les pays" && t.country !== selectedLocation) return false;
      // Recherche texte
      if (query.trim()) {
        const q = query.toLowerCase();
        const haystack = `${t.name} ${t.role} ${t.skills.join(" ")} ${t.location} ${t.category}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [query, selectedCategory, selectedLocation]);

  return (
    <main className="min-h-screen">
      <TalentHero
        query={query}
        onQueryChange={setQuery}
        totalResults={filtered.length}
      />
      <TalentFilters
        selectedCategory={selectedCategory}
        selectedLocation={selectedLocation}
        onCategoryChange={setSelectedCategory}
        onLocationChange={setSelectedLocation}
      />
      <TalentGrid talents={filtered} />
    </main>
  );
}
