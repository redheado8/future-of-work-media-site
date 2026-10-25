"use client";

import React from "react";
import Link from "next/link";
import { Clock, Bookmark, ArrowLeft, Calendar, User } from "lucide-react";
import { ParsedArticle } from "@/lib/articles";
import { useBookmarks } from "./BookmarkContext";

interface ArticleCardProps {
  article: ParsedArticle;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(article.slug);

  const categoryColorMap: Record<string, string> = {
    ai: "bg-teal-50 text-teal-800 border-teal-200",
    hr: "bg-blue-50 text-blue-800 border-blue-200",
    learning: "bg-amber-50 text-amber-800 border-amber-200",
    "future-work": "bg-cyan-50 text-cyan-800 border-cyan-200",
    analysis: "bg-purple-50 text-purple-800 border-purple-200",
  };

  const badgeClass =
    categoryColorMap[article.category] || "bg-slate-50 text-slate-800 border-slate-200";

  return (
    <article
      className={`group relative bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-teal-200 transition-all duration-200 flex flex-col overflow-hidden ${
        featured ? "md:grid md:grid-cols-12 md:gap-6" : ""
      }`}
    >
      {/* Cover Image Container */}
      <div
        className={`relative overflow-hidden bg-slate-100 ${
          featured ? "md:col-span-6 h-64 sm:h-72 md:h-full min-h-[280px]" : "h-52 w-full"
        }`}
      >
        <Link href={`/articles/${article.slug}`} className="block w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/api/image?url=${encodeURIComponent(article.coverImage)}`}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(event) => {
              const image = event.currentTarget;
              if (!image.dataset.fallbackApplied) {
                image.dataset.fallbackApplied = "true";
                image.src = `/api/image?url=${encodeURIComponent("https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1600")}`;
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        </Link>

        {/* Category Badge overlay */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
          <Link
            href={`/topics/${article.category}`}
            className={`text-xs font-semibold px-2.5 py-1 rounded-full border shadow-sm backdrop-blur-md ${badgeClass} transition hover:opacity-90`}
          >
            {article.categoryLabel}
          </Link>
        </div>

        {/* Bookmark Action */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleBookmark(article.slug);
          }}
          className={`absolute top-3 left-3 z-10 p-2 rounded-full backdrop-blur-md shadow-sm transition ${
            bookmarked
              ? "bg-teal-600 text-white"
              : "bg-white/80 text-slate-700 hover:bg-white hover:text-teal-600"
          }`}
          title={bookmarked ? "حذف از نشانک‌ها" : "ذخیره در نشانک‌ها"}
          aria-label={bookmarked ? "حذف از نشانک‌ها" : "ذخیره در نشانک‌ها"}
        >
          <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Content */}
      <div
        className={`p-5 sm:p-6 flex flex-col justify-between flex-1 ${
          featured ? "md:col-span-6 md:p-8" : ""
        }`}
      >
        <div>
          {/* Meta Info */}
          <div className="flex items-center gap-3 text-xs text-slate-500 mb-2.5">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              مقالهٔ تحلیلی
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-medium text-slate-600">
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              {article.readTime.toLocaleString("fa-IR")} دقیقه مطالعه
            </span>
          </div>

          {/* Title */}
          <h3
            className={`font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors duration-150 leading-snug mb-2.5 ${
              featured ? "text-xl sm:text-2xl lg:text-3xl" : "text-lg sm:text-xl"
            }`}
          >
            <Link href={`/articles/${article.slug}`}>{article.title}</Link>
          </h3>

          {/* Subtitle / Summary */}
          <p
            className={`text-slate-600 leading-relaxed line-clamp-3 mb-4 ${
              featured ? "text-sm sm:text-base text-slate-700" : "text-xs sm:text-sm"
            }`}
          >
            {article.summary}
          </p>
        </div>

        {/* Footer: Author & Read CTA */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
              <User className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-800">محتوای نمونه</span>
              <span className="text-[10px] text-slate-400">تحریریهٔ فردای کار</span>
            </div>
          </div>

          <Link
            href={`/articles/${article.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-900 transition group/cta"
          >
            <span>مطالعه مقاله</span>
            <ArrowLeft className="w-3.5 h-3.5 group-hover/cta:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
