"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import Link from "next/link";
import { articles } from "@/lib/data/articles";
import { ArticleHero } from "@/components/editorial/detail/ArticleHero";
import { ArticleContent } from "@/components/editorial/detail/ArticleContent";
import { ArticleVideo } from "@/components/editorial/detail/ArticleVideo";
import { ArticleGallery } from "@/components/editorial/detail/ArticleGallery";
import { ArticleShare } from "@/components/editorial/detail/ArticleShare";
import { ArticleSidebar } from "@/components/editorial/detail/ArticleSidebar";

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const article = useMemo(
    () => articles.find((a) => a.slug === slug),
    [slug]
  );

  if (!article) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-800/50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7 text-neutral-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
            </svg>
          </div>
          <p className="mt-4 text-lg font-medium text-neutral-400">
            Article introuvable
          </p>
          <Link
            href="/editorial"
            className="mt-4 inline-block rounded-xl bg-amber-400 px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-amber-300"
          >
            Retour à l&apos;éditorial
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-20">
      <ArticleHero article={article} />

      <div className="mx-auto mt-10 max-w-5xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          {/* Colonne principale */}
          <div className="space-y-10">
            <ArticleContent content={article.content} />

            {article.video && <ArticleVideo video={article.video} />}

            {article.gallery.length > 0 && (
              <ArticleGallery gallery={article.gallery} />
            )}

            <ArticleShare title={article.title} slug={article.slug} />
          </div>

          {/* Sidebar */}
          <ArticleSidebar article={article} />
        </div>
      </div>
    </main>
  );
}
