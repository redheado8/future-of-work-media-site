"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X, BookOpen, Clock, Tag, ArrowLeft } from "lucide-react";
import { ParsedArticle } from "@/lib/articles";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  allArticles: ParsedArticle[];
}

export function SearchModal({ isOpen, onClose, allArticles }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
      setSelectedCategory("all");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = [
    { key: "all", label: "همه موضوعات" },
    { key: "ai", label: "هوش مصنوعی" },
    { key: "hr", label: "منابع انسانی" },
    { key: "learning", label: "یادگیری و توسعه" },
    { key: "future-work", label: "آینده کار" },
    { key: "analysis", label: "تحلیل و دیدگاه" },
  ];

  const filtered = allArticles.filter((art) => {
    const matchesCategory = selectedCategory === "all" || art.category === selectedCategory;
    const q = query.trim().toLowerCase();
    if (!q) return matchesCategory;

    const matchesQuery =
      art.title.toLowerCase().includes(q) ||
      art.subtitle.toLowerCase().includes(q) ||
      art.summary.toLowerCase().includes(q) ||
      art.tags.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[82vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top search bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-teal-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جست‌وجوی مقاله‌ها، کلمات کلیدی، نویسندگان یا موضوعات..."
            className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              title="پاک کردن"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-medium px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md transition"
          >
            بستن (Esc)
          </button>
        </div>

        {/* Categories filter pills */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition ${
                selectedCategory === cat.key
                  ? "bg-teal-700 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results list */}
        <div className="overflow-y-auto p-4 flex-1 divide-y divide-slate-100 space-y-3">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <Link
                key={item.slug}
                href={`/articles/${item.slug}`}
                onClick={onClose}
                className="group block pt-3 first:pt-0 hover:bg-slate-50/80 p-2.5 rounded-xl transition"
              >
                <div className="flex items-center gap-2 text-xs text-teal-700 mb-1 font-medium">
                  <span className="bg-teal-50 border border-teal-100 px-2 py-0.5 rounded">
                    {item.categoryLabel}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <Clock className="w-3 h-3" />
                    {item.readTime} دقیقه مطالعه
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                  {item.summary}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  {item.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded flex items-center gap-1"
                    >
                      <Tag className="w-2.5 h-2.5 text-slate-400" />
                      {tag}
                    </span>
                  ))}
                  <div className="mr-auto text-xs text-teal-600 font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                    <span>مطالعه</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-12 text-slate-500">
              <BookOpen className="w-10 h-10 mx-auto text-slate-300 mb-3" />
              <p className="text-sm font-medium">موردی متناسب با جست‌وجوی شما یافت نشد.</p>
              <p className="text-xs text-slate-400 mt-1">
                کلمات کلیدی دیگری مانند «استخدام»، «یادگیری» یا «هوش مصنوعی» را امتحان کنید.
              </p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex justify-between items-center">
          <span>نتایج یافته‌شده: {filtered.length} مقاله</span>
          <Link
            href="/search"
            onClick={onClose}
            className="text-teal-700 hover:underline font-medium"
          >
            صفحه پیشرفته آرشیو و فیلتر →
          </Link>
        </div>
      </div>
    </div>
  );
}
