"use client";

import React, { useState } from "react";
import { ThumbsUp, ThumbsDown, CheckCircle2 } from "lucide-react";

interface ArticleFeedbackProps {
  slug: string;
}

export function ArticleFeedback({ slug }: ArticleFeedbackProps) {
  const [voted, setVoted] = useState(false);
  const [choice, setChoice] = useState<boolean | null>(null);

  const handleVote = async (isHelpful: boolean) => {
    if (voted) return;
    setChoice(isHelpful);
    setVoted(true);

    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleSlug: slug, isHelpful }),
      });
    } catch (e) {
      console.error("Feedback failed:", e);
    }
  };

  return (
    <div className="my-10 p-6 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <h4 className="text-sm font-bold text-slate-900">
          آیا این مقاله برای شما کاربردی و الهام‌بخش بود؟
        </h4>
        <p className="text-xs text-slate-500 mt-0.5">
          بازخورد شما به بهبود مداوم عمق تحلیل‌ها و انتخاب موضوعات بعدی کمک می‌کند.
        </p>
      </div>

      {voted ? (
        <div className="flex items-center gap-2 text-teal-700 bg-teal-50 border border-teal-200 px-4 py-2 rounded-xl text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-teal-600" />
          <span>سپاس! نظر ارزشمند شما ثبت شد.</span>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleVote(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-teal-400 hover:text-teal-700 text-slate-700 text-xs font-semibold shadow-sm transition"
          >
            <ThumbsUp className="w-4 h-4" />
            <span>بله، مفید بود</span>
          </button>
          <button
            onClick={() => handleVote(false)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-400 hover:text-slate-900 text-slate-700 text-xs font-semibold shadow-sm transition"
          >
            <ThumbsDown className="w-4 h-4" />
            <span>نیاز به بهبود دارد</span>
          </button>
        </div>
      )}
    </div>
  );
}
