"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, AlertCircle, Loader2, Sparkles, ShieldCheck } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("لطفاً یک آدرس ایمیل معتبر وارد کنید.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setMessage(data.message || "عضویت شما با موفقیت ثبت شد!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "خطایی رخ داد. لطفاً دوباره امتحان کنید.");
      }
    } catch {
      setStatus("error");
      setMessage("ارتباط با سرور برقرار نشد. لطفاً بعداً تلاش فرمایید.");
    }
  };

  return (
    <section className="my-16 bg-gradient-to-br from-slate-900 via-[#0B132B] to-slate-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-800 relative overflow-hidden shadow-xl">
      {/* Visual background accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold mb-4">
          <Mail className="w-3.5 h-3.5" />
          <span>خبرنامه تخصصی فردای کار</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-4">
          از تغییرات دنیای کار عقب نمانید.
        </h2>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 max-w-xl mx-auto">
          خلاصه‌ای از ایده‌ها، ابزارها و تحلیل‌های تازه دربارهٔ فناوری و منابع انسانی را به صورت دوره‌ای دریافت کنید.
        </p>

        {/* Subscribe Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ایمیل کاری یا شخصی شما (example@domain.com)"
                disabled={status === "loading" || status === "success"}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-800/90 text-white placeholder-slate-400 border border-slate-700 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 text-sm transition"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>در حال ثبت...</span>
                </>
              ) : status === "success" ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ثبت شد</span>
                </>
              ) : (
                <>
                  <span>عضویت در خبرنامه</span>
                </>
              )}
            </button>
          </div>

          {/* Feedback message */}
          {message && (
            <div
              className={`p-3 rounded-xl text-xs flex items-center justify-center gap-2 transition ${
                status === "success"
                  ? "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                  : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
              }`}
            >
              {status === "success" ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{message}</span>
            </div>
          )}

          {/* Transparent note about demonstration */}
          <div className="pt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>ایمیل شما ذخیره می‌شود؛ بدون ارسال هرزنامه و کاملاً محرمانه.</span>
          </div>
        </form>
      </div>
    </section>
  );
}
