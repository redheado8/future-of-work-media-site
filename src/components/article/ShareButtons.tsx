"use client";

import React, { useState } from "react";
import { Link2, Check, Send } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/articles/${slug}`;
    }
    return `https://worktomorrow.media/articles/${slug}`;
  };

  const copyToClipboard = () => {
    const url = getShareUrl();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const shareTelegram = () => {
    const url = getShareUrl();
    const text = encodeURIComponent(`${title}\n${url}`);
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${text}`, "_blank");
  };

  const shareLinkedIn = () => {
    const url = getShareUrl();
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareTwitter = () => {
    const url = getShareUrl();
    const text = encodeURIComponent(title);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-slate-500 font-medium ml-1">اشتراک:</span>

      <button
        onClick={copyToClipboard}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
          copied
            ? "bg-teal-50 text-teal-700 border-teal-300"
            : "bg-white text-slate-600 hover:bg-slate-50 border-slate-200"
        }`}
        title="کپی پیوند مقاله"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-teal-600" />
            <span>کپی شد!</span>
          </>
        ) : (
          <>
            <Link2 className="w-3.5 h-3.5" />
            <span>کپی پیوند</span>
          </>
        )}
      </button>

      {/* LinkedIn SVG */}
      <button
        onClick={shareLinkedIn}
        className="p-1.5 rounded-lg bg-white hover:bg-blue-50 text-slate-600 hover:text-[#0A66C2] border border-slate-200 transition"
        title="اشتراک در لینکدین"
        aria-label="LinkedIn"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.75a1.66 1.66 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66 1.66 1.66 0 0 0-1.66-1.66Z" />
        </svg>
      </button>

      {/* Telegram SVG */}
      <button
        onClick={shareTelegram}
        className="p-1.5 rounded-lg bg-white hover:bg-sky-50 text-slate-600 hover:text-[#229ED9] border border-slate-200 transition"
        title="اشتراک در تلگرام"
        aria-label="Telegram"
      >
        <Send className="w-4 h-4" />
      </button>

      {/* X / Twitter SVG */}
      <button
        onClick={shareTwitter}
        className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-950 border border-slate-200 transition"
        title="اشتراک در X"
        aria-label="X (Twitter)"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>
    </div>
  );
}
