import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllArticles } from "@/lib/articles";
import { TOPICS } from "@/db/seed-data";
import { ArticleCatalog } from "@/components/ArticleCatalog";
import { Sparkles, ArrowRight, Layers, Compass, BookOpen } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = TOPICS.find((t) => t.slug === slug);
  if (!topic) return { title: "موضوع یافت نشد | فردای کار" };

  return {
    title: `${topic.title} | فردای کار`,
    description: topic.description,
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = TOPICS.find((t) => t.slug === slug);

  if (!topic) {
    notFound();
  }

  const articles = await getAllArticles({ category: slug });

  return (
    <main className="min-h-screen pb-24 pt-8 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-teal-700 transition">
            صفحه اصلی
          </Link>
          <span>/</span>
          <span className="text-slate-400">موضوعات</span>
          <span>/</span>
          <span className="text-teal-800 font-bold">{topic.title}</span>
        </div>

        {/* Hero banner for this topic */}
        <header className="relative bg-[#0B132B] text-white rounded-3xl p-8 sm:p-12 mb-12 overflow-hidden shadow-xl border border-slate-800">
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono font-bold tracking-wider px-2.5 py-1 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                {topic.enTitle}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-300">{articles.length} مقاله تخصصی</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight mb-4">
              {topic.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              {topic.description}
            </p>

            <div className="inline-flex items-center gap-2 text-xs text-teal-400 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
              <Compass className="w-4 h-4" />
              <span>{topic.stats}</span>
            </div>
          </div>
        </header>

        {/* Articles List */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              مقالات منتشرشده در این حوزه
            </h2>
            <span className="text-xs text-slate-500">
              مرتب‌شده بر اساس تازه‌ترین دیدگاه‌ها
            </span>
          </div>

          <ArticleCatalog articles={articles} initialCategory={slug} showFilters={false} />
        </div>

        {/* Other topics navigation */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <h3 className="text-base font-extrabold text-slate-800 mb-6">
            سایر موضوعات تخصصی فردای کار:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOPICS.filter((t) => t.slug !== slug).map((t) => (
              <Link
                key={t.slug}
                href={`/topics/${t.slug}`}
                className="group p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-teal-300 shadow-sm transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-slate-400">{t.enTitle}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 transition" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition">
                  {t.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                  {t.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
