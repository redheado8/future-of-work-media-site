import React from "react";
import { getAllArticles } from "@/lib/articles";
import { ArticleCatalog } from "@/components/ArticleCatalog";
import Link from "next/link";
import { Search, Compass } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "جست‌وجو و آرشیو مقالات | فردای کار",
  description: "کاوش در تمام مقالات، تحلیل‌ها و راهنماهای رسانه فردای کار",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q = "", category = "all" } = await searchParams;
  const allArticles = await getAllArticles({ search: q, category });

  return (
    <main className="min-h-screen pb-24 pt-8 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-teal-700 transition">
            صفحه اصلی
          </Link>
          <span>/</span>
          <span className="text-teal-800 font-bold">جست‌وجو و آرشیو</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs text-teal-700 font-bold mb-2">
            <Search className="w-4 h-4" />
            <span>آرشیو جامع مقالات و تحلیل‌ها</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {q ? `نتایج جست‌وجو برای: «${q}»` : "کاوش در مقالات فردای کار"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            دسترسی به تمام مطالب بر اساس دسته‌بندی موضوعی و شایستگی‌ها ({allArticles.length} مورد یافت شد)
          </p>
        </div>

        {/* Catalog */}
        <ArticleCatalog articles={allArticles} initialCategory={category} />
      </div>
    </main>
  );
}
