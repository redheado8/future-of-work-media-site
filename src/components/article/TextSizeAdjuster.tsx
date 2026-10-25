"use client";

import React from "react";
import { Type } from "lucide-react";

interface TextSizeAdjusterProps {
  size: "normal" | "large" | "xlarge";
  onChangeSize: (size: "normal" | "large" | "xlarge") => void;
}

export function TextSizeAdjuster({ size, onChangeSize }: TextSizeAdjusterProps) {
  return (
    <div className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
      <span className="text-slate-400 px-1">
        <Type className="w-3.5 h-3.5" />
      </span>
      <button
        onClick={() => onChangeSize("normal")}
        className={`px-2 py-0.5 rounded-lg font-medium transition ${
          size === "normal"
            ? "bg-white text-teal-800 shadow-sm font-bold"
            : "text-slate-600 hover:text-slate-900"
        }`}
        title="اندازه قلم استاندارد"
      >
        استاندارد
      </button>
      <button
        onClick={() => onChangeSize("large")}
        className={`px-2 py-0.5 rounded-lg font-medium transition ${
          size === "large"
            ? "bg-white text-teal-800 shadow-sm font-bold"
            : "text-slate-600 hover:text-slate-900"
        }`}
        title="اندازه قلم بزرگ"
      >
        بزرگ
      </button>
      <button
        onClick={() => onChangeSize("xlarge")}
        className={`px-2 py-0.5 rounded-lg font-medium transition ${
          size === "xlarge"
            ? "bg-white text-teal-800 shadow-sm font-bold"
            : "text-slate-600 hover:text-slate-900"
        }`}
        title="اندازه قلم بسیار بزرگ"
      >
        خیلی بزرگ
      </button>
    </div>
  );
}
