import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  Clock,
  Calendar,
  Layers,
  Users,
  Brain,
  GraduationCap,
  Compass,
  ArrowUpLeft,
  ChevronLeft,
  BookOpen,
  Wrench,
  CheckCircle2,
  TrendingUp,
  BarChart3
} from "lucide-react";
import { getAllArticles, getFeaturedArticle } from "@/lib/articles";
import { TOPICS } from "@/db/seed-data";
import { ArticleCard } from "@/components/ArticleCard";
import { ArticleCatalog } from "@/components/ArticleCatalog";
import { SkillsDataSection } from "@/components/SkillsDataSection";
import { NewsletterSection } from "@/components/NewsletterSection";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const allArticles = await getAllArticles();
  const featured = (await getFeaturedArticle()) || allArticles[0];
  const regularArticles = allArticles.filter((a) => a.slug !== featured?.slug);

  return (
    <main className="min-h-screen pb-20">
      {/* SECTION 1: HERO SECTION */}
      <section className="relative bg-[#0B132B] text-white overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28 border-b border-slate-800">
        {/* Background glow effects */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left/Right Text in RTL */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>رسانه تخصصی آینده کار و منابع انسانی هوشمند</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.25]">
                دنیای کار در حال تغییر است.
                <br />
                <span className="bg-gradient-to-r from-teal-300 via-cyan-200 to-white bg-clip-text text-transparent">
                  شما چقدر آماده‌اید؟
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                از هوش مصنوعی تا تجربهٔ کارکنان؛ ایده‌ها، ابزارها و دیدگاه‌هایی برای درک بهتر آیندهٔ سازمان‌ها.
                رسانه‌ای مستقل برای حرفه‌ای‌هایی که به دنبال بینش‌های علمی، عمیق و کاربردی هستند.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#latest-articles"
                  className="px-6 py-3.5 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-all duration-150 shadow-lg shadow-teal-500/25 flex items-center gap-2"
                >
                  <span>مطالعهٔ تازه‌ترین مطالب</span>
                  <ArrowLeft className="w-4 h-4" />
                </a>

                <a
                  href="#curated-topics"
                  className="px-6 py-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold text-sm transition-all duration-150 border border-slate-700/80 flex items-center gap-2"
                >
                  <span>کاوش در موضوعات</span>
                </a>
              </div>

              {/* Quick Verified Highlights */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-xs">
                <div>
                  <span className="text-xl sm:text-2xl font-black font-mono text-teal-400 block">
                    ۴۴٪
                  </span>
                  <span className="text-slate-400 leading-snug block">
                    تحول مهارت‌های شغلی تا ۲۰۲۸
                  </span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-black font-mono text-cyan-400 block">
                    ۸۵M
                  </span>
                  <span className="text-slate-400 leading-snug block">
                    شغل در مسیر بازتعریف با AI
                  </span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-black font-mono text-emerald-400 block">
                    ۷۲٪
                  </span>
                  <span className="text-slate-400 leading-snug block">
                    اولویت تجربه کارکنان (EX)
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Graphic */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden border border-slate-700 shadow-2xl shadow-teal-950/50 aspect-[4/3] sm:aspect-[16/11]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1600"
                    alt="ارتباط انسان، فناوری و آینده کار"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/80 via-transparent to-transparent" />
                </div>

                {/* Floating pill badges */}
                <div className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 bg-slate-900/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700 text-xs shadow-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center">
                    <Brain className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">هوش مصنوعی مولد</span>
                    <span className="text-slate-400 text-[10px]">دستیار تحلیلی تصمیم‌گیران</span>
                  </div>
                </div>

                <div className="absolute -top-4 -left-4 sm:-top-5 sm:-left-5 bg-slate-900/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700 text-xs shadow-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">همدلی و اصالت انسانی</span>
                    <span className="text-slate-400 text-[10px]">قلب فرهنگ سازمانی</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION 2: FEATURED ARTICLE BANNER */}
        {featured && (
          <section className="my-14 sm:my-20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
                <h2 className="text-sm font-bold text-teal-800 uppercase tracking-wider">
                  گزارش ویژه تحریریه
                </h2>
              </div>
              <Link
                href="/recruitment-ai"
                className="text-xs font-bold text-teal-700 hover:text-teal-900 transition flex items-center gap-1"
              >
                <span>مشاهده پرونده کامل استخدام هوشمند</span>
                <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-hidden hover:border-teal-300 transition-all duration-200">
              <ArticleCard article={featured} featured={true} />
            </div>
          </section>
        )}

        {/* SECTION 3: CURATED TOPICS (موضوعات منتخب) */}
        <section id="curated-topics" className="my-16 sm:my-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold mb-3 border border-teal-200">
              <Layers className="w-3.5 h-3.5" />
              <span>چهارچوب‌های محتوایی</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              کاوش در موضوعات منتخب
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              دیدگاه‌ها، مقاله‌ها و مطالعات موردی تفکیک‌شده بر اساس چهار سرفصل کلیدی رسانه
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOPICS.slice(0, 4).map((topic, idx) => {
              const icons = [Brain, Users, GraduationCap, Compass];
              const IconComp = icons[idx] || Sparkles;

              return (
                <Link
                  key={topic.slug}
                  href={`/topics/${topic.slug}`}
                  className="group relative bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-teal-300 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-teal-50 group-hover:bg-teal-600 group-hover:text-white text-teal-700 transition-colors duration-200 flex items-center justify-center shadow-inner">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 group-hover:text-teal-700 transition">
                        ۰{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors mb-2">
                      {topic.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                      {topic.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-teal-700 font-bold group-hover:translate-x-[-2px] transition-transform">
                    <span>مشاهده مقالات این بخش</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: LATEST ARTICLES (تازه‌ترین مقالات) */}
        <section id="latest-articles" className="my-16 sm:my-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
                <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                <span>بروزرسانی هفتگی</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                تازه‌ترین مقالات و یادداشت‌های تحلیلی
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                بررسی موشکافانه تحولات روز با قلم کارشناسان و پژوهشگران سرمایه انسانی
              </p>
            </div>

            <Link
              href="/search"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-900 transition self-start sm:self-auto"
            >
              <span>مشاهده آرشیو کامل مقالات</span>
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>

          {/* Interactive Catalog with Filter Pills */}
          <ArticleCatalog articles={regularArticles} />
        </section>

        {/* SECTION 5: DATA-DRIVEN INFOGRAPHIC & LIVE POLL */}
        <SkillsDataSection />

        {/* SECTION 6: TOOLBOX TEASER BANNER */}
        <section className="my-16 bg-gradient-to-r from-teal-900 via-slate-900 to-[#0B132B] text-white rounded-3xl p-8 sm:p-12 border border-teal-800/40 relative overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
                <Wrench className="w-3.5 h-3.5" />
                <span>جعبه‌ابزار دنیای کار</span>
              </div>

              <h2 className="text-xl sm:text-3xl font-black text-white leading-snug">
                پرامپت‌ها و راهنماهای کاربردی هوش مصنوعی برای مدیران و متخصصان منابع انسانی
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                شامل راهنماهای گام‌به‌گام برای ایده‌پردازی محتوا، تدوین پیش‌نویس آگهی شغلی، طراحی مصاحبه‌های شایسته‌محور،
                خلاصه‌سازی گزارش‌ها و نبض‌سنجی کارکنان به همراه سنجه‌های ارزیابی خروجی.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Link
                href="/toolbox"
                className="px-6 py-3.5 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm transition shadow-lg shadow-teal-500/20 flex items-center gap-2"
              >
                <span>ورود به جعبه‌ابزار کاربردی</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 7: NEWSLETTER SUBSCRIBE */}
        <NewsletterSection />
      </div>
    </main>
  );
}
