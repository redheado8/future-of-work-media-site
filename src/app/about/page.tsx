import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Compass,
  FileText,
  Target,
  Users,
  Layers,
  ArrowLeft,
  CheckCircle2,
  Code
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "درباره رسانه و شناسنامه پروژه | فردای کار (WorkTomorrow)",
  description: "شناسنامه، بیانیه تحریریه و رویکرد طراحی رسانه تخصصی آینده کار و منابع انسانی",
};

export default function AboutPage() {
  const pillars = [
    {
      title: "پژوهش علمی و مبتنی بر شواهد",
      desc: "تمام مقالات و تحلیل‌ها بر مبنای گزارش‌های سازمان‌های معتبر جهانی (مانند مجمع جهانی اقتصاد، هاروارد بیزنس ریویو، گارتنر و مک‌کینزی) تهیه شده‌اند و از ادعاهای اثبات‌نشده یا اخبار زرد فناوری پرهیز شده است.",
      icon: Target,
    },
    {
      title: "رویکرد انسان‌محور به هوش مصنوعی",
      desc: "ما هوش مصنوعی را ابزاری برای توانمندسازی انسان‌ها، کاهش کارهای فرساینده و شکوفایی پتانسیل شناختی می‌دانیم، نه عامل جایگزینی کور یا حذف ارتباطات عاطفی در محیط کار.",
      icon: Sparkles,
    },
    {
      title: "تجربه کاربری مدرن و متمرکز بر خوانایی",
      desc: "تایپوگرافی اختصاصی فارسی (وزیرمتن)، فاصله‌گذاری دقیق، نوار پیشرفت مطالعه، فهرست عناوین واکنش‌گرا و سرعت بارگذاری آنی، فضایی آرام برای مطالعه عمیق فراهم می‌آورد.",
      icon: Layers,
    },
    {
      title: "کاربردی بودن و پرهیز از تئوری‌های انتزاعی",
      desc: "در کنار مقالات تحلیلی، بخش «جعبه‌ابزار دنیای کار» پرامپت‌ها و روش‌های گام‌به‌گام را در اختیار مدیران قرار می‌دهد تا بلافاصله بتوانند بینش‌ها را در سازمان خود به کار گیرند.",
      icon: Code,
    },
  ];

  return (
    <main className="min-h-screen pb-24 pt-8 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-teal-700 transition">
            صفحه اصلی
          </Link>
          <span>/</span>
          <span className="text-teal-800 font-bold">درباره رسانه</span>
        </div>

        {/* Hero */}
        <header className="relative bg-[#0B132B] text-white rounded-3xl p-8 sm:p-12 mb-12 shadow-xl border border-slate-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold mb-4 border border-teal-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>بیانیه تحریریه و شناسنامه رسانه</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight mb-4">
            ایده‌های تازه برای دنیای در حال تغییر کار
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            «فردای کار» یک رسانه محتوایی تخصصی و مستقل است که با هدف رصد نوآوری‌های محیط کار،
            مدیریت سرمایه انسانی و کاربردهای اخلاقی هوش مصنوعی بنیان نهاده شده است.
          </p>
        </header>

        {/* Portfolio Context Statement Box */}
        <div className="bg-gradient-to-br from-teal-50 to-cyan-50/50 border border-teal-200 rounded-3xl p-6 sm:p-8 mb-12 shadow-sm">
          <div className="flex items-center gap-2 text-teal-900 font-extrabold text-base mb-2">
            <Compass className="w-5 h-5 text-teal-700" />
            <span>شناسنامه پروژه و اهداف طراحی</span>
          </div>
          <p className="text-xs sm:text-sm text-teal-950/90 leading-relaxed mb-4">
            این وب‌سایت یک <strong>پروژه مفهومی مستقل و نمونه‌کار تخصصی</strong> در حوزه‌های استراتژی محتوای
            دیجیتال، معماری اطلاعات، طراحی تجربه کاربری (UX) و کاربرد هوش مصنوعی مولد در رسانه‌های تخصصی است.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-teal-900 pt-2 border-t border-teal-200/60">
            <div>
              <strong className="block text-teal-950">تولید محتوای تخصصی:</strong>
              <span>مقالات تحلیلی، سناریوهای مهارتی و متون عمیق فارسی</span>
            </div>
            <div>
              <strong className="block text-teal-950">طراحی رابط و تجربه:</strong>
              <span>طراحی مینیمال، واکنش‌گرا و سازگار با رفتار مخاطب حرفه‌ای</span>
            </div>
            <div>
              <strong className="block text-teal-950">فناوری‌های مدرن:</strong>
              <span>Next.js 16 (App Router)، Tailwind CSS و دیتابیس PostgreSQL</span>
            </div>
          </div>
        </div>

        {/* Editorial Pillars */}
        <div className="mb-14">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">
            چهار ستون راهبردی رسانه فردای کار
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Topics Breakdown */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 mb-12 shadow-sm space-y-4">
          <h2 className="text-lg sm:text-xl font-black text-slate-900">
            قلمروهای موضوعی که پوشش می‌دهیم:
          </h2>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>
                <strong>هوش مصنوعی در محیط کار:</strong> مدل‌های زبان بزرگ، خودکارسازی وظایف روتین، ابزارهای تحلیلی و اخلاق الگوریتمی.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>
                <strong>منابع انسانی هوشمند:</strong> تجربه کارکنان (EX)، جذب شایسته‌محور، پیپل آنالیتیکس و سلامت روان سازمانی.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>
                <strong>یادگیری و توسعه (L&D):</strong> بازآموزی مهارت‌ها (Reskilling)، یادگیری در بستر کار و فرهنگ تاب‌آوری تیمی.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>
                <strong>آینده مشاغل و مهارت‌ها:</strong> کار ترکیبی، سازمان‌های غیرسلسله‌مراتبی و مهارت‌های برتر دهه آینده.
              </span>
            </li>
          </ul>
        </div>

        {/* CTA Back to home */}
        <div className="text-center pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm transition shadow-md shadow-teal-600/20"
          >
            <span>کاوش در مقالات و تحلیل‌های فردای کار</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
