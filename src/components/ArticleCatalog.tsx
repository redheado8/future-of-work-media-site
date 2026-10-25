"use client";

import React, { useState, useMemo } from "react";
import { ArticleCard } from "./ArticleCard";
import { ParsedArticle } from "@/lib/articles";
import { Filter, SlidersHorizontal, Sparkles, BookOpen } from "lucide-react";

interface ArticleCatalogProps {
  articles: ParsedArticle[];
  initialCategory?: string;
  showFilters?: boolean;
}

export function ArticleCatalog({
  articles,
  initialCategory = "all",
  showFilters = true,
}: ArticleCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<"newest" | "readTime" | "views">("newest");

  const categories = [
    { key: "all", label: "همه مطالب" },
    { key: "ai", label: "هوش مصنوعی" },
    { key: "hr", label: "منابع انسانی" },
    { key: "learning", label: "یادگیری و توسعه" },
    { key: "future-work", label: "آینده کار" },
    { key: "analysis", label: "تحلیل و دیدگاه" },
  ];

  const filteredArticles = useMemo(() => {
    let list = [...articles];

    if (selectedCategory !== "all") {
      list = list.filter((a) => a.category === selectedCategory);
    }

    if (sortBy === "readTime") {
      list.sort((a, b) => b.readTime - a.readTime);
    } else if (sortBy === "views") {
      list.sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0));
    } else {
      // newest by id
      list.sort((a, b) => b.id - a.id);
    }

    return list;
  }, [articles, selectedCategory, sortBy]);

  return (
    <div className="space-y-8">
      {showFilters && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs sm:text-sm">
            {categories.map((cat) => {
              const active = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3.5 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all duration-150 ${
                    active
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Sort selection */}
          <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500">مرتب‌سازی:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-medium focus:outline-none focus:border-teal-500 cursor-pointer"
            >
              <option value="newest">تازه‌ترین انتشار</option>
              <option value="readTime">عمیق‌ترین (بیشترین زمان مطالعه)</option>
              <option value="views">پربازدیدترین</option>
            </select>
          </div>
        </div>
      )}

      {/* Grid of Articles */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
          <BookOpen className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <p className="text-base font-bold text-slate-700">مقاله‌ای در این دسته‌بندی یافت نشد.</p>
          <button
            onClick={() => setSelectedCategory("all")}
            className="mt-3 text-xs font-bold text-teal-700 hover:underline"
          >
            مشاهده تمام مقالات
          </button>
        </div>
      )}
    </div>
  );
}
