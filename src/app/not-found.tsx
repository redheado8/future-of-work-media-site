import React from "react";
import Link from "next/link";
import { Compass, ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 text-center shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-6">
          <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: "12s" }} />
        </div>

        <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
          خطای ۴۰۴
        </span>

        <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-3 mb-2">
          صفحه مورد نظر یافت نشد
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
          مطلبی که به دنبال آن هستید ممکن است منتقل شده باشد یا آدرس وارد شده نادرست باشد.
        </p>

        <div className="flex flex-col gap-2.5">
          <Link
            href="/"
            className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>بازگشت به صفحه اصلی</span>
          </Link>

          <Link
            href="/search"
            className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>جست‌وجو در مقالات</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
