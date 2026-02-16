"use client";

import { useMemo, useState } from "react";
import { articles } from "@/lib/data/articles";
import { EditorialHero } from "@/components/editorial/EditorialHero";
import { EditorialFeatured } from "@/components/editorial/EditorialFeatured";
import { EditorialFilters } from "@/components/editorial/EditorialFilters";
import { EditorialGrid } from "@/components/editorial/EditorialGrid";

export default function EditorialPage() {
  const [selectedType, setSelectedType] = useState("all");

  const featured = useMemo(
    () => articles.filter((a) => a.featured),
    []
  );

  const filtered = useMemo(() => {
    const nonFeatured = articles.filter((a) => !a.featured);
    if (selectedType === "all") return nonFeatured;
    return nonFeatured.filter((a) => a.type === selectedType);
  }, [selectedType]);

  return (
    <main className="min-h-screen">
      <EditorialHero totalArticles={articles.length} />
      <EditorialFeatured articles={featured} />
      <EditorialFilters
        selectedType={selectedType}
        onTypeChange={setSelectedType}
      />
      <EditorialGrid articles={filtered} />
    </main>
  );
}
