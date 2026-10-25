"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, Trash2, ArrowLeft, BookOpen, Clock, Tag } from "lucide-react";
import { useBookmarks } from "@/components/BookmarkContext";
import { ParsedArticle } from "@/lib/articles";

export default function BookmarksPage() {
  const { bookmarks, toggleBookmark } = useBookmarks();
  const [articles, setArticles] = useState<ParsedArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok && Array.isArray(data.articles)) {
          setArticles(data.articles);
        }
      })
      .catch((e) => console.error("Error fetching articles:", e))
      .finally(() => setLoading(false));
  }, []);

  const savedArticles = articles.filter((a) => bookmarks.includes(a.slug));

  return (
    <main className="min-h-screen pb-24 pt-8 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-teal-700 transition">
            صفحه اصلی
          </Link>
          <span>/</span>
          <span className="text-teal-800 font-bold">فهرست مطالعه و نشانک‌ها</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-teal-700 font-bold mb-1">
              <Bookmark className="w-4 h-4 text-teal-600 fill-teal-600" />
              <span>فهرست مطالعه شخصی شما</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              مقالات نشانک‌شده ({savedArticles.length})
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              مطالبی که برای مطالعه بعدی ذخیره کرده‌اید؛ این فهرست در حافظه دستگاه شما محفوظ است.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition shadow-sm self-start sm:self-auto"
          >
            <span>کاوش مقالات بیشتر</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Content */}
        {savedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedArticles.map((item) => (
              <div
                key={item.slug}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between hover:border-teal-300 transition"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-teal-700 bg-teal-50 px-2 py-0.5 rounded font-semibold border border-teal-100">
                      {item.categoryLabel}
                    </span>
                    <button
                      onClick={() => toggleBookmark(item.slug)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition"
                      title="حذف از نشانک‌ها"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 hover:text-teal-700 transition leading-snug mb-2">
                    <Link href={`/articles/${item.slug}`}>{item.title}</Link>
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                    {item.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    {item.readTime} دقیقه مطالعه
                  </span>

                  <Link
                    href={`/articles/${item.slug}`}
                    className="font-bold text-teal-700 hover:underline flex items-center gap-1"
                  >
                    <span>مطالعه مقاله</span>
                    <ArrowLeft className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8">
            <BookOpen className="w-14 h-14 mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              هنوز مقاله‌ای به فهرست مطالعه اضافه نکرده‌اید
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
              هنگام مطالعه مقالات یا مرور صفحه اصلی، روی آیکون نشانک کلیک کنید تا در این بخش ذخیره شوند.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition shadow-sm"
            >
              <span>مشاهده مقالات صفحه اصلی</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
