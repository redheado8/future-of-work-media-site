"use client";

import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  Sparkles,
  BarChart2,
  CheckCircle2,
  ExternalLink,
  Award,
  Vote
} from "lucide-react";
import { SKILLS_RADAR_DATA } from "@/db/seed-data";

interface PollOption {
  optionKey: string;
  label: string;
  votes: number;
}

export function SkillsDataSection() {
  const [activeTab, setActiveTab] = useState<"growing" | "declining" | "model">("growing");
  const [pollData, setPollData] = useState<PollOption[]>([
    { optionKey: "ai-recruitment", label: "هوش مصنوعی و جذب استعداد", votes: 0 },
    { optionKey: "continuous-upskilling", label: "ارتقای مستمر مهارت‌ها و بازآموزی", votes: 0 },
    { optionKey: "employee-wellbeing", label: "تجربه و سلامت روانی کارکنان", votes: 0 },
    { optionKey: "remote-hybrid-culture", label: "فرهنگ تیم‌های ترکیبی و دورکاری", votes: 0 },
  ]);
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check local storage for poll vote status
    const voted = localStorage.getItem("wt_voted_poll_transformation");
    if (voted) {
      setHasVoted(true);
      setSelectedOption(voted);
    }

    // Fetch latest poll data
    fetch("/api/poll?pollKey=workplace-transformation")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok && Array.isArray(data.data) && data.data.length > 0) {
          setPollData(data.data);
        }
      })
      .catch((e) => console.error("Poll fetch failed", e));
  }, []);

  const totalVotes = pollData.reduce((acc, cur) => acc + cur.votes, 0);

  const handleVote = async (optionKey: string) => {
    if (hasVoted || isSubmitting) return;
    setIsSubmitting(true);
    setSelectedOption(optionKey);

    try {
      const res = await fetch("/api/poll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pollKey: "workplace-transformation", optionKey }),
      });
      const result = await res.json();
      if (result.ok && result.data) {
        setPollData(result.data);
      } else {
        // optimistic update
        setPollData((prev) =>
          prev.map((opt) =>
            opt.optionKey === optionKey ? { ...opt, votes: opt.votes + 1 } : opt
          )
        );
      }
      setHasVoted(true);
      localStorage.setItem("wt_voted_poll_transformation", optionKey);
    } catch {
      setHasVoted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const growingSkills = SKILLS_RADAR_DATA.filter((s) => s.trend.includes("صعودی"));
  const decliningSkills = SKILLS_RADAR_DATA.filter((s) => s.trend.includes("افول"));

  return (
    <section className="py-14 sm:py-20 bg-slate-900 text-white rounded-3xl my-10 overflow-hidden relative border border-slate-800">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold mb-4">
            <BarChart2 className="w-3.5 h-3.5" />
            <span>رصد داده‌محور بازار کار و شایستگی‌ها</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mb-4 leading-tight">
            کدام مهارت‌ها تا سال ۲۰۳۰ اهمیت بنیادین می‌یابند؟
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            بررسی الگوهای تحول شایستگی‌های انسانی در تقابل با هوش مصنوعی و ابزارهای خودکار،
            بر مبنای یافته‌های گزارش آینده مشاغل (Future of Jobs).
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-2xl bg-slate-800/80 border border-slate-700/60 backdrop-blur-md">
            <button
              onClick={() => setActiveTab("growing")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeTab === "growing"
                  ? "bg-teal-500 text-slate-950 shadow-md"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>مهارت‌های رو به رشد</span>
            </button>
            <button
              onClick={() => setActiveTab("declining")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeTab === "declining"
                  ? "bg-rose-500 text-white shadow-md"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <TrendingDown className="w-4 h-4" />
              <span>مهارت‌های در معرض اتوماسیون</span>
            </button>
            <button
              onClick={() => setActiveTab("model")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeTab === "model"
                  ? "bg-cyan-500 text-slate-950 shadow-md"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>مدل هم‌افزایی انسان و هوش مصنوعی</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          {/* Main Visualizer (8 cols) */}
          <div className="lg:col-span-7 bg-slate-800/60 rounded-2xl border border-slate-700/60 p-6 sm:p-8 backdrop-blur-md">
            {activeTab === "growing" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-teal-400" />
                    <span>شایستگی‌های غیرقابل جایگزین با بالاترین تقاضا</span>
                  </h3>
                  <span className="text-xs text-teal-300 bg-teal-500/10 px-2 py-1 rounded">
                    رشد سالانه
                  </span>
                </div>

                <div className="space-y-5">
                  {growingSkills.map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center text-xs sm:text-sm font-medium">
                        <span className="text-slate-200 font-bold">{item.skill}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-teal-400 font-mono font-bold">{item.growth}</span>
                          <span className="text-[11px] text-slate-400">({item.category})</span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-700/80 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-teal-500 to-cyan-400 h-full rounded-full transition-all duration-700"
                          style={{ width: `${item.importance}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "declining" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-rose-400" />
                    <span>وظایفی که سریع‌تر از همه خودکار می‌شوند</span>
                  </h3>
                  <span className="text-xs text-rose-300 bg-rose-500/10 px-2 py-1 rounded">
                    کاهش تقاضا
                  </span>
                </div>

                <div className="space-y-5">
                  {decliningSkills.map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center text-xs sm:text-sm font-medium">
                        <span className="text-slate-200 font-bold">{item.skill}</span>
                        <span className="text-rose-400 font-mono font-bold">{item.growth}</span>
                      </div>
                      <div className="w-full bg-slate-700/80 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-rose-500 to-amber-500 h-full rounded-full transition-all duration-700"
                          style={{ width: `${item.importance}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}

                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/50 text-xs text-slate-300 leading-relaxed mt-4">
                    <strong>راهبرد سازمان‌های پیشرو:</strong> تعدیل این افراد نیست، بلکه ایجاد
                    مسیرهای مشخص برای بازآموزی (Reskilling) آن‌ها به سمت تحلیل داده، پشتیبانی
                    شخصی‌سازی‌شده مشتریان و نظارت بر خودکارسازی است.
                  </div>
                </div>
              </div>
            )}

            {activeTab === "model" && (
              <div className="space-y-6">
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 border-b border-slate-700 pb-4">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <span>معماری هم‌افزایی: انسان + هوش مصنوعی</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-teal-500/30 space-y-2">
                    <span className="text-teal-300 font-bold text-sm block">
                      نقش ممتاز ماشین (AI)
                    </span>
                    <ul className="space-y-1.5 text-slate-300">
                      <li>• اسکن میلیاردها بایت داده در چند ثانیه</li>
                      <li>• کشف الگوهای آماری پنهان</li>
                      <li>• حذف خطاهای ناشی از خستگی در کارهای روتین</li>
                      <li>• تولید پیش‌نویس‌های اولیه در مقیاس وسیع</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 space-y-2">
                    <span className="text-cyan-300 font-bold text-sm block">
                      قلمرو انحصاری انسان
                    </span>
                    <ul className="space-y-1.5 text-slate-300">
                      <li>• قضاوت اخلاقی و سنجش انصاف</li>
                      <li>• درک عواطف، همدلی و حمایت روانی</li>
                      <li>• تصمیم‌گیری استراتژیک در شرایط ابهام مطلق</li>
                      <li>• خلق روابط اعتمادمحور عمیق میان‌فردی</li>
                    </ul>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-200">
                  سازمان‌هایی که از هوش مصنوعی برای <strong>توانمندسازی انسان</strong> بهره
                  می‌گیرند، تا ۴۳ درصد نسبت به سازمان‌هایی که صرفاً قصد جایگزینی دارند بازدهی بالاتری ثبت کرده‌اند.
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
              <span>منبع: گزارش آیندهٔ مشاغل • مجمع جهانی اقتصاد</span>
              <span className="text-slate-500">تحلیل ترکیبی ۲۰۲۴-۲۰۲۶</span>
            </div>
          </div>

          {/* Live Pulse Poll (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-800 to-slate-800/40 rounded-2xl border border-slate-700/80 p-6 sm:p-7 backdrop-blur-md">
            <div className="flex items-center gap-2 text-teal-300 text-xs font-bold mb-2">
              <Vote className="w-4 h-4" />
              <span>نبض‌سنجی تعاملی مدیران و متخصصان</span>
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-white mb-2 leading-snug">
              کدام حوزه بیشترین اولویت تحول را در سازمان شما دارد؟
            </h3>
            <p className="text-xs text-slate-300 mb-5 leading-relaxed">
              رأی شما به نتایج واقعی همین نظرسنجی اضافه می‌شود؛ نتایج تا این لحظه بر اساس رأی‌های ثبت‌شده نمایش داده می‌شوند.
            </p>

            <div className="space-y-3 mb-5">
              {pollData.map((opt) => {
                const percentage =
                  totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
                const isSelected = selectedOption === opt.optionKey;

                return (
                  <button
                    key={opt.optionKey}
                    onClick={() => handleVote(opt.optionKey)}
                    disabled={hasVoted}
                    className={`w-full text-right p-3.5 rounded-xl border transition-all duration-200 relative overflow-hidden group ${
                      isSelected
                        ? "border-teal-400 bg-teal-500/20"
                        : "border-slate-700 bg-slate-900/60 hover:border-slate-600 hover:bg-slate-900"
                    } ${hasVoted ? "cursor-default" : "cursor-pointer"}`}
                  >
                    {/* Percentage fill bar if voted */}
                    {hasVoted && (
                      <div
                        className="absolute inset-y-0 right-0 bg-teal-500/15 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    )}

                    <div className="relative z-10 flex items-center justify-between text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />}
                        <span
                          className={`font-medium ${
                            isSelected ? "text-teal-200 font-bold" : "text-slate-200"
                          }`}
                        >
                          {opt.label}
                        </span>
                      </div>
                      {hasVoted && (
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-teal-300">{percentage}٪</span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            ({opt.votes})
                          </span>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
              <span>{totalVotes > 0 ? `مجموع آراء ثبت‌شده: ${totalVotes.toLocaleString("fa-IR")} رأی` : "هنوز رأیی ثبت نشده است"}</span>
              {hasVoted && <span className="text-teal-400 font-medium">رأی شما ثبت شد ✓</span>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
