"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Wrench,
  Copy,
  Check,
  Sparkles,
  AlertCircle,
  Clock,
  ArrowRight,
  BookOpen,
  Filter,
  Sliders,
  Send,
  HelpCircle,
  FileText
} from "lucide-react";
import { TOOLBOX_GUIDES } from "@/db/seed-data";

export default function ToolboxPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Interactive Prompt Generator state
  const [generatorJobTitle, setGeneratorJobTitle] = useState("کارشناس ارشد تجربه کارکنان");
  const [generatorGoal, setGeneratorGoal] = useState("طراحی نظرسنجی نبض فصلی برای سنجش فرسودگی شغلی");
  const [generatorTone, setGeneratorTone] = useState("حرفه‌ای و همدلانه");
  const [copiedPlayground, setCopiedPlayground] = useState(false);

  const categories = [
    { key: "all", label: "همه راهنماها" },
    { key: "تولید محتوا و ارتباطات", label: "تولید محتوا و ارتباطات" },
    { key: "جذب و استخدام", label: "جذب و استخدام" },
    { key: "یادگیری و توسعه", label: "یادگیری و توسعه" },
    { key: "پژوهش و تحلیل", label: "پژوهش و تحلیل" },
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  const filteredGuides = TOOLBOX_GUIDES.filter(
    (g) => selectedCategory === "all" || g.category === selectedCategory
  );

  const generatedCustomPrompt = `نقش: متخصص ارشد استراتژی منابع انسانی و رفتار سازمانی.
زمینه وظیفه: من به‌عنوان [${generatorJobTitle || "مدیر سرمایه انسانی"}] نیاز دارم تا [${generatorGoal || "موضوع را وارد کنید"}].
دستورالعمل:
۱. خروجی را با لحن ${generatorTone} و بر پایه متدولوژی‌های استاندارد جهانی ارائه بده.
۲. چارچوب گام‌به‌گام و عملیاتی باشد و از توضیحات مقدماتی طولانی پرهیز کن.
۳. در انتهای خروجی، یک چک‌لیست ۳ موردی برای سنجش ریسک‌های اجرایی و نکات حفظ حریم خصوصی اضافه کن.`;

  return (
    <main className="min-h-screen pb-24 pt-8 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-teal-700 transition">
            صفحه اصلی
          </Link>
          <span>/</span>
          <span className="text-teal-800 font-bold">جعبه‌ابزار فردای کار</span>
        </div>

        {/* Hero Header */}
        <header className="relative bg-[#0B132B] text-white rounded-3xl p-8 sm:p-12 mb-12 overflow-hidden shadow-xl border border-slate-800">
          <div className="absolute top-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold mb-4 border border-teal-500/30">
              <Wrench className="w-3.5 h-3.5" />
              <span>جعبه‌ابزار تخصصی و کاربردی هوش مصنوعی</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
              جعبه‌ابزار فردای کار:
              <br />
              <span className="bg-gradient-to-r from-teal-300 via-cyan-200 to-white bg-clip-text text-transparent">
                پرامپت‌ها و متدولوژی‌های کاربردی برای مدیران و متخصصان
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              راهنماهای گام‌به‌گام برای به‌کارگیری هدفمند ابزارهای هوش مصنوعی در تولید محتوای منابع انسانی،
              طراحی آگهی و مصاحبه استخدامی، خلاصه‌سازی اسناد و یادگیری سازمانی، به همراه سنجه‌های ارزیابی و
              هشدارهای اخلاقی.
            </p>

            <a
              href="#custom-generator"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm transition shadow-lg shadow-teal-500/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>استفاده از سازنده تعاملی پرامپت اختصاصی</span>
            </a>
          </div>
        </header>

        {/* Filter categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
                selectedCategory === cat.key
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Guides Grid */}
        <div className="space-y-8 mb-16">
          {filteredGuides.map((guide, idx) => {
            const isCopied = copiedId === guide.id;

            return (
              <div
                key={guide.id}
                className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm hover:border-teal-300 transition-all duration-200"
              >
                {/* Top badge line */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-teal-50 text-teal-800 font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div>
                      <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                        {guide.category}
                      </span>
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                        {guide.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      زمان تخمینی: {guide.estimatedTime}
                    </span>
                    <span>•</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                      سطح: {guide.difficulty}
                    </span>
                  </div>
                </div>

                {/* Goal */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-slate-500 mb-1">هدف و ارزش کاربردی:</h4>
                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                    {guide.goal}
                  </p>
                </div>

                {/* Execution Steps */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-slate-500 mb-2">مراحل استفاده گام‌به‌گام:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                    {guide.steps.map((st, sidx) => (
                      <div
                        key={sidx}
                        className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100"
                      >
                        <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                          {sidx + 1}
                        </span>
                        <span className="leading-relaxed">{st}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prompt Template Box */}
                <div className="mb-6 bg-slate-900 rounded-2xl p-4 sm:p-5 text-slate-100 relative">
                  <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2 text-xs text-teal-400 font-bold">
                      <Sparkles className="w-4 h-4" />
                      <span>قالب پرامپت مهندسی‌شده (آماده استفاده):</span>
                    </div>

                    <button
                      onClick={() => handleCopy(guide.id, guide.promptTemplate)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        isCopied
                          ? "bg-teal-500 text-slate-950"
                          : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                      }`}
                      title="کپی کردن متن پرامپت"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>کپی شد!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-teal-400" />
                          <span>کپی پرامپت</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="text-xs sm:text-sm text-slate-200 whitespace-pre-wrap font-sans leading-relaxed select-all">
                    {guide.promptTemplate}
                  </pre>
                </div>

                {/* Sample Output */}
                <div className="mb-4 p-4 rounded-2xl bg-teal-50/50 border border-teal-100 text-xs sm:text-sm text-teal-950">
                  <span className="font-bold block text-teal-900 mb-1">خروجی نمونه واقعی:</span>
                  <div className="whitespace-pre-wrap text-teal-900/90 leading-relaxed">
                    {guide.sampleOutput}
                  </div>
                </div>

                {/* Limitations and Ethical note */}
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block mb-0.5 font-bold">محدودیت‌ها و هشدارهای ابزار:</strong>
                    <span>{guide.limitations}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section: Interactive Custom Prompt Generator Playground */}
        <section id="custom-generator" className="bg-[#0B132B] text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>سازنده تعاملی پرامپت اختصاصی (Live Playground)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              پرامپت سفارشی خود را در چند ثانیه بسازید
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              پارامترهای زیر را مطابق نیاز شغلی خود تغییر دهید تا پرامپت بهینه‌سازی‌شده را بلافاصله دریافت کنید.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Inputs (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  عنوان شغلی / نقش شما:
                </label>
                <input
                  type="text"
                  value={generatorJobTitle}
                  onChange={(e) => setGeneratorJobTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-teal-400"
                  placeholder="مثلاً مدیر جذب استعداد"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  هدف دقیق یا وظیفه مدنظر:
                </label>
                <textarea
                  rows={3}
                  value={generatorGoal}
                  onChange={(e) => setGeneratorGoal(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-teal-400"
                  placeholder="مثلاً تدوین سوالات مصاحبه برای سنجش کار تیمی"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  لحن مورد انتظار:
                </label>
                <select
                  value={generatorTone}
                  onChange={(e) => setGeneratorTone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-teal-400 cursor-pointer"
                >
                  <option value="حرفه‌ای، ساختاریافته و همدلانه">حرفه‌ای، ساختاریافته و همدلانه</option>
                  <option value="صمیمی، مدرن و الهام‌بخش">صمیمی، مدرن و الهام‌بخش</option>
                  <option value="تحلیلی، داده‌محور و بریف اجرایی">تحلیلی، داده‌محور و بریف اجرایی</option>
                  <option value="آموزشی، ساده و گام‌به‌گام">آموزشی، ساده و گام‌به‌گام</option>
                </select>
              </div>
            </div>

            {/* Generated output box (7 cols) */}
            <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl p-5 border border-slate-700 relative flex flex-col justify-between min-h-[260px]">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                  <span className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>پیش‌نمایش پرامپت نهایی</span>
                  </span>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedCustomPrompt).then(() => {
                        setCopiedPlayground(true);
                        setTimeout(() => setCopiedPlayground(false), 2500);
                      });
                    }}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      copiedPlayground
                        ? "bg-teal-500 text-slate-950"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                    }`}
                  >
                    {copiedPlayground ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>کپی شد!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-teal-400" />
                        <span>کپی پرامپت</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="text-xs sm:text-sm text-slate-200 whitespace-pre-wrap font-sans leading-relaxed select-all">
                  {generatedCustomPrompt}
                </pre>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 text-[11px] text-slate-400">
                این پرامپت را کپی کرده و در هر یک از مدل‌های زبانی (مانند ChatGPT، Claude، یا Copilot) اجرا نمایید.
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
