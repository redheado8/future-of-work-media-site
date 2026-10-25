"use client";

import React, { useState, useEffect } from "react";
import { ListOrdered, ChevronDown, ChevronUp } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0.1,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsMobileOpen(false);
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <>
      {/* Mobile collapsible TOC */}
      <div className="lg:hidden mb-8 bg-slate-50 border border-slate-200/90 rounded-2xl p-4">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-full flex items-center justify-between text-slate-800 font-bold text-sm"
        >
          <div className="flex items-center gap-2">
            <ListOrdered className="w-4 h-4 text-teal-600" />
            <span>فهرست عناوین مقاله ({items.length} بخش)</span>
          </div>
          {isMobileOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isMobileOpen && (
          <ul className="mt-3 pt-3 border-t border-slate-200 space-y-2 text-xs">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`text-right w-full py-1 px-2 rounded-lg transition ${
                    activeId === item.id
                      ? "text-teal-700 bg-teal-50 font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {item.text}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Desktop sticky TOC */}
      <div className="hidden lg:block sticky top-24 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 p-5 shadow-sm">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-4 pb-3 border-b border-slate-100">
          <ListOrdered className="w-4 h-4 text-teal-600" />
          <span>سرفصل‌های مقاله</span>
        </div>

        <nav>
          <ul className="space-y-1.5 text-xs">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`text-right w-full py-1.5 px-3 rounded-lg transition text-[13px] flex items-center justify-between ${
                      isActive
                        ? "text-teal-700 font-bold bg-teal-50/80 border-r-2 border-teal-600"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <span className="line-clamp-1">{item.text}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
