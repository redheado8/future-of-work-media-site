"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Bookmark,
  Menu,
  X,
  Sparkles,
  Wrench,
  Info,
  ChevronDown,
  Layers,
  ArrowUpLeft
} from "lucide-react";
import { useBookmarks } from "./BookmarkContext";
import { SearchModal } from "./SearchModal";
import { ParsedArticle } from "@/lib/articles";

interface HeaderProps {
  articlesForSearch?: ParsedArticle[];
}

export function Header({ articlesForSearch = [] }: HeaderProps) {
  const pathname = usePathname();
  const { count: bookmarkCount } = useBookmarks();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "صفحه اصلی" },
    {
      href: "/recruitment-ai",
      label: "هوش مصنوعی در استخدام",
      highlight: true,
      badge: "پرونده ویژه",
    },
    { href: "/topics/ai", label: "هوش مصنوعی" },
    { href: "/topics/hr", label: "منابع انسانی" },
    { href: "/topics/learning", label: "یادگیری و توسعه" },
    { href: "/topics/future-work", label: "آینده کار" },
    { href: "/topics/analysis", label: "تحلیل و دیدگاه" },
    { href: "/toolbox", label: "جعبه‌ابزار کاربردی", icon: Wrench },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? "bg-slate-900/95 backdrop-blur-md shadow-md py-2.5 border-b border-slate-800"
            : "bg-[#0B132B] py-3.5 border-b border-slate-800/80"
        } text-white`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none"
              title="فردای کار - WorkTomorrow"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 via-cyan-500 to-emerald-400 p-[2px] shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform duration-200">
                <div className="w-full h-full bg-[#0B132B] rounded-[10px] flex items-center justify-center">
                  <span className="font-black text-xl tracking-tighter bg-gradient-to-r from-teal-300 via-cyan-200 to-white bg-clip-text text-transparent">
                    فک
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-teal-300 transition-colors">
                    فردای کار
                  </span>
                  <span className="hidden sm:inline-block text-[10px] font-mono tracking-wider px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20">
                    WorkTomorrow
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 hidden md:block">
                  رسانه تخصصی هوش مصنوعی، منابع انسانی و تحول کار
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors duration-150 flex items-center gap-1.5 ${
                    isActive
                      ? "text-teal-300 bg-slate-800/80 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/40"
                  }`}
                >
                  {link.icon && <link.icon className="w-3.5 h-3.5 text-teal-400" />}
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[10px] bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold px-1.5 py-0.2 rounded-full shadow-sm">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute -bottom-[14px] left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-teal-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Utility Tools & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/60 transition text-xs"
              title="جست‌وجو در مطالب"
              aria-label="جست‌وجوی مطالب"
            >
              <Search className="w-4 h-4 text-teal-400" />
              <span className="hidden sm:inline">جست‌وجو</span>
              <kbd className="hidden md:inline-block text-[10px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-400 font-mono">
                /
              </kbd>
            </button>

            {/* Bookmarks / Saved Reading List */}
            <Link
              href="/bookmarks"
              className="relative p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/60 transition"
              title="نشانک‌ها و فهرست مطالعه"
              aria-label="فهرست مطالعه ذخیره‌شده"
            >
              <Bookmark className="w-4 h-4 text-teal-400" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {bookmarkCount}
                </span>
              )}
            </Link>

            {/* About / Portfolio note */}
            <Link
              href="/about"
              className="hidden md:flex items-center gap-1 p-2 rounded-xl bg-slate-800/50 hover:bg-slate-700/70 text-slate-400 hover:text-white border border-slate-800 transition text-xs"
              title="درباره رسانه و این پروژه"
            >
              <Info className="w-4 h-4" />
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 focus:outline-none"
              aria-label="منوی موبایل"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile slide-over drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#0B132B] border-b border-slate-800 px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                      isActive
                        ? "bg-teal-500/10 text-teal-300 font-bold border border-teal-500/30"
                        : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {link.icon && <link.icon className="w-4 h-4 text-teal-400" />}
                      <span>{link.label}</span>
                    </div>
                    {link.badge && (
                      <span className="text-[10px] bg-teal-400 text-slate-950 font-bold px-2 py-0.5 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
              <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <Link
                  href="/about"
                  className="flex items-center gap-1.5 hover:text-teal-300 transition"
                >
                  <Info className="w-4 h-4" />
                  <span>درباره پروژه و بیانیه رسانه</span>
                </Link>
                <Link
                  href="/bookmarks"
                  className="flex items-center gap-1.5 hover:text-teal-300 transition"
                >
                  <Bookmark className="w-4 h-4" />
                  <span>نشانک‌ها ({bookmarkCount})</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        allArticles={articlesForSearch}
      />
    </>
  );
}
