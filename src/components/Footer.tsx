import React from "react";
import Link from "next/link";
import { Sparkles, ArrowUpLeft, ShieldCheck, FileText, Compass, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0B132B] text-slate-300 border-t border-slate-800/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1 & 2: Brand Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 via-cyan-500 to-emerald-400 p-[2px] shadow-lg">
                <div className="w-full h-full bg-[#0B132B] rounded-[10px] flex items-center justify-center">
                  <span className="font-black text-xl bg-gradient-to-r from-teal-300 to-white bg-clip-text text-transparent">
                    فک
                  </span>
                </div>
              </div>
              <div>
                <span className="font-extrabold text-xl text-white block">
                  فردای کار | WorkTomorrow
                </span>
                <span className="text-xs text-teal-400 font-medium">
                  ایده‌های تازه برای دنیای در حال تغییر کار
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              رسانه مستقل تخصصی درباره فناوری‌های نوین در محیط کار، مدیریت سرمایه انسانی،
              هوش مصنوعی، یادگیری سازمانی و تحول دیجیتال. رسالت ما پیوند دادن پژوهش‌های
              علمی با عملکردهای ملموس مدیریتی در راستای ساخت محیط‌های کاری پویاتر، عادلانه‌تر
              و انسانی‌تر است.
            </p>

            {/* Conceptual Portfolio Badge */}
            <div className="inline-flex items-center gap-2 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
              <span>
                این رسانه یک پروژه مفهومی و نمونه‌کار تخصصی تولید محتوا، استراتژی رسانه‌ای و تجربه کاربری وب است.
              </span>
            </div>
          </div>

          {/* Column 3: Topics */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white border-r-2 border-teal-500 pr-2">
              دسته‌بندی‌های محتوایی
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="/topics/ai"
                  className="hover:text-teal-300 transition-colors flex items-center justify-between"
                >
                  <span>هوش مصنوعی در کار</span>
                  <ArrowUpLeft className="w-3.5 h-3.5 text-slate-600 hover:text-teal-300" />
                </Link>
              </li>
              <li>
                <Link
                  href="/topics/hr"
                  className="hover:text-teal-300 transition-colors flex items-center justify-between"
                >
                  <span>منابع انسانی هوشمند</span>
                  <ArrowUpLeft className="w-3.5 h-3.5 text-slate-600 hover:text-teal-300" />
                </Link>
              </li>
              <li>
                <Link
                  href="/topics/learning"
                  className="hover:text-teal-300 transition-colors flex items-center justify-between"
                >
                  <span>یادگیری و توسعه کارکنان</span>
                  <ArrowUpLeft className="w-3.5 h-3.5 text-slate-600 hover:text-teal-300" />
                </Link>
              </li>
              <li>
                <Link
                  href="/topics/future-work"
                  className="hover:text-teal-300 transition-colors flex items-center justify-between"
                >
                  <span>آینده مشاغل و مهارت‌ها</span>
                  <ArrowUpLeft className="w-3.5 h-3.5 text-slate-600 hover:text-teal-300" />
                </Link>
              </li>
              <li>
                <Link
                  href="/topics/analysis"
                  className="hover:text-teal-300 transition-colors flex items-center justify-between"
                >
                  <span>تحلیل و دیدگاه</span>
                  <ArrowUpLeft className="w-3.5 h-3.5 text-slate-600 hover:text-teal-300" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Special Sections */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white border-r-2 border-cyan-500 pr-2">
              بخش‌های تعاملی و ویژه
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="/recruitment-ai"
                  className="text-teal-300 font-semibold hover:text-white transition flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  <span>پرونده هوش مصنوعی در استخدام</span>
                </Link>
              </li>
              <li>
                <Link href="/toolbox" className="hover:text-teal-300 transition">
                  جعبه‌ابزار کاربردی مدیران (پرامپت‌ها)
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-teal-300 transition">
                  آرشیو و جست‌وجوی هوشمند مقالات
                </Link>
              </li>
              <li>
                <Link href="/bookmarks" className="hover:text-teal-300 transition">
                  فهرست مطالعه و مقالات نشانک‌شده
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-teal-300 transition">
                  درباره فلسفه و روش‌شناسی رسانه
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Editorial Standards & Project note */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white border-r-2 border-emerald-500 pr-2">
              استانداردهای نشر
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              تمام متون با تکیه بر پژوهش‌های علمی بین‌المللی و تجربیات میدانی تدوین شده‌اند. از
              ادعاهای اغراق‌آمیز درباره جایگزینی انسان‌ها یا تضمین‌های غیرواقعی ابزارهای هوش مصنوعی
              پرهیز شده است.
            </p>
            <div className="pt-2">
              <span className="text-[11px] text-slate-500 font-mono block">
                توسعه‌یافته با Next.js 16 • Tailwind CSS • Drizzle ORM
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} فردای کار (WorkTomorrow) — تمامی حقوق محتوا برای نمونه‌کار محفوظ است.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>طراحی شده با دقت و رویکرد محتوامحور</span>
            <span>•</span>
            <Link href="/about" className="hover:text-slate-300 transition">
              شناسنامه پروژه
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
