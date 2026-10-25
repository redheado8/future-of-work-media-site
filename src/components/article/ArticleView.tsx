"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Calendar,
  Bookmark,
  Share2,
  CheckCircle2,
  BookOpen,
  User,
  Sparkles,
  ExternalLink,
  ChevronLeft
} from "lucide-react";
import { ParsedArticle } from "@/lib/articles";
import { ReadingProgressBar } from "./ReadingProgressBar";
import { TableOfContents } from "./TableOfContents";
import { ShareButtons } from "./ShareButtons";
import { TextSizeAdjuster } from "./TextSizeAdjuster";
import { ArticleFeedback } from "./ArticleFeedback";
import { useBookmarks } from "../BookmarkContext";
import { ArticleCard } from "../ArticleCard";

interface ArticleViewProps {
  article: ParsedArticle;
  relatedArticles: ParsedArticle[];
}

export function ArticleView({ article, relatedArticles }: ArticleViewProps) {
  const [textSize, setTextSize] = useState<"normal" | "large" | "xlarge">("normal");
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(article.slug);

  const textSizeClass = {
    normal: "text-base sm:text-lg leading-[2.1]",
    large: "text-lg sm:text-xl leading-[2.25]",
    xlarge: "text-xl sm:text-2xl leading-[2.4]",
  }[textSize];

  return (
    <>
      <ReadingProgressBar />

      <main className="min-h-screen pb-20 pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-xs text-slate-500 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Link href="/" className="hover:text-teal-700 transition">
                صفحه اصلی
              </Link>
              <span>/</span>
              <Link
                href={`/topics/${article.category}`}
                className="hover:text-teal-700 transition font-medium"
              >
                {article.categoryLabel}
              </Link>
              <span>/</span>
              <span className="text-slate-800 font-semibold line-clamp-1 max-w-[240px] sm:max-w-md">
                {article.title}
              </span>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-teal-700 transition"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>بازگشت به همه مقالات</span>
            </Link>
          </div>

          {/* Article Header */}
          <div className="max-w-4xl mx-auto mb-10">
            {/* Category badge & Read time */}
            <div className="flex items-center gap-3 mb-4">
              <Link
                href={`/topics/${article.category}`}
                className="text-xs font-bold px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 transition"
              >
                {article.categoryLabel}
              </Link>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                زمان مطالعه: {article.readTime} دقیقه
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                مقالهٔ تحلیلی
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.3] mb-5 tracking-tight">
              {article.title}
            </h1>

            {/* Subtitle / Executive Summary */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 font-medium leading-relaxed mb-6">
              {article.subtitle}
            </p>

            {/* Author bar & Utilities */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
              {/* Author Info */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-sm font-bold text-base">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">محتوای نمونه</h4>
                  <p className="text-xs text-slate-500">تحریریهٔ فردای کار</p>
                </div>
              </div>

              {/* Utility Tools */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Font Size Adjuster */}
                <TextSizeAdjuster size={textSize} onChangeSize={setTextSize} />

                {/* Bookmark Toggle */}
                <button
                  onClick={() => toggleBookmark(article.slug)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
                    bookmarked
                      ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                  title={bookmarked ? "حذف از نشانک‌ها" : "نشانک‌گذاری مقاله"}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? "fill-current" : ""}`} />
                  <span>{bookmarked ? "نشانک شد" : "ذخیره"}</span>
                </button>

                {/* Share Dropdown */}
                <ShareButtons title={article.title} slug={article.slug} />
              </div>
            </div>
          </div>

          {/* Featured Cover Image */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 aspect-[16/9] max-h-[500px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/api/image?url=${encodeURIComponent(article.slug === "ai-transforming-recruitment" ? "https://images.pexels.com/photos/5668863/pexels-photo-5668863.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1600" : article.coverImage)}`}
                alt={article.title}
                className="w-full h-full object-cover"
                onError={(event) => {
                  const image = event.currentTarget;
                  if (!image.dataset.fallbackApplied) {
                    image.dataset.fallbackApplied = "true";
                    image.src = "/api/image?url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F3184465%2Fpexels-photo-3184465.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26fit%3Dcrop%26w%3D1600";
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
            </div>
          </div>

          {/* Key Takeaways Box (نکات کلیدی مقاله) */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-gradient-to-br from-teal-50 via-cyan-50/40 to-slate-50 border border-teal-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-2 text-teal-900 font-extrabold text-base sm:text-lg mb-4">
                  <Sparkles className="w-5 h-5 text-teal-600" />
                  <span>چکیده مدیریتی و نکات کلیدی (Key Takeaways)</span>
                </div>
                <ul className="space-y-3">
                  {article.keyTakeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-800 text-sm sm:text-base leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-1" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Main Layout: Sticky Sidebar (TOC) + Article Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-5xl mx-auto">
            {/* Table of contents sidebar on large screens */}
            <aside className="lg:col-span-4 order-2 lg:order-1">
              <TableOfContents items={article.tableOfContents} />
            </aside>

            {/* Article Body */}
            <article className="lg:col-span-8 order-1 lg:order-2">
              <div
                className={`article-prose ${textSizeClass} text-slate-800`}
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Tags list */}
              {article.tags && article.tags.length > 0 && (
                <div className="mt-12 pt-6 border-t border-slate-200">
                  <span className="text-xs text-slate-500 font-bold block mb-3">
                    موضوعات و برچسب‌های مرتبط:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, i) => (
                      <Link
                        key={i}
                        href={`/search?q=${encodeURIComponent(tag)}`}
                        className="text-xs bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-800 px-3 py-1.5 rounded-xl border border-slate-200/80 transition"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Scientific Sources & References */}
              {article.references && article.references.length > 0 && (
                <div className="mt-10 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-teal-600" />
                    <span>منابع، مراجع علمی و گزارش‌های مرجع:</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {article.references.map((ref, idx) => (
                      <li key={idx} className="flex items-center justify-between">
                        <span className="font-medium text-slate-800">{ref.title}</span>
                        <span className="text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {ref.source}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Reader Feedback */}
              <ArticleFeedback slug={article.slug} />
            </article>
          </div>

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <div className="mt-20 pt-12 border-t border-slate-200">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    مطالب مرتبط که پیشنهاد می‌کنیم بخوانید
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    بینش‌ها و راهنماهای مکمل درباره آینده کار و فناوری‌های نوین
                  </p>
                </div>
                <Link
                  href={`/topics/${article.category}`}
                  className="hidden sm:flex items-center gap-1 text-xs font-bold text-teal-700 hover:underline"
                >
                  <span>بیشتر در این حوزه</span>
                  <ChevronLeft className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((rel) => (
                  <ArticleCard key={rel.slug} article={rel} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
