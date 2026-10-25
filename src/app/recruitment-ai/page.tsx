"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Users,
  AlertTriangle,
  Brain,
  FileCheck,
  Lock,
  Compass,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Layers,
  HelpCircle,
  BarChart3
} from "lucide-react";

export default function RecruitmentAiPage() {
  const [activeStep, setActiveStep] = useState(0);

  // Readiness self-assessment state
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const toggleCheck = (id: number) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const workflowSteps = [
    {
      title: "۱. ثبت درخواست و داده‌های متقاضی",
      tag: "ورود کارجو",
      desc: "کارجو رزومه و نمونه‌کارهای خود را بارگذاری می‌کند. در این مرحله، سازمان شفافانه اعلام می‌کند که از هوش مصنوعی برای غربالگری اولیه استفاده می‌شود.",
      humanRole: "تدوین معیارهای منصفانه و شفافیت در حقوق کارجو",
      aiRole: "ساختاردهی و تفکیک متون رزومه به مولفه‌های مهارتی",
    },
    {
      title: "۲. بی‌نام‌سازی داده‌ها (Anonymization)",
      tag: "کاهش سوگیری",
      desc: "سیستم اطلاعات غیرمرتبط با شایستگی نظیر عکس، نام، سن، جنسیت، آدرس یا دانشگاه را موقتاً در مرحله غربالگری اولیه پنهان می‌کند.",
      humanRole: "تنظیم پارامترهای عدم افشا و نظارت بر حذف متغیرهای سوگیرانه",
      aiRole: "حذف خودکار اطلاعات هویتی پیش از ورود به ارزیابی مهارت",
    },
    {
      title: "۳. تطبیق معنایی شایستگی‌ها (Skill Matching)",
      tag: "درک معنایی",
      desc: "به‌جای جست‌وجوی دقیق کلمات کلیدی، مدل زبان تجارب کاری را به مهارت‌های عینی نگاشت داده و پتانسیل یادگیری را می‌سنجد.",
      humanRole: "اعتبارسنجی مهارت‌های قابل‌انتقال و سرفصل‌های تخصصی",
      aiRole: "مقایسه برداری رزومه با نیازمندی‌های اصلی موقعیت شغلی",
    },
    {
      title: "۴. مصاحبه‌های رفتاری و تعاملی",
      tag: "ارتباط انسانی",
      desc: "برگزاری مصاحبه توسط کارشناسان منابع انسانی و مدیران فنی بر پایه سناریوهای حل مسئله، تفکر نقادانه و سنجش تناسب فرهنگی.",
      humanRole: "سنجش هوش هیجانی، انگیزه درونی، شنیدن فعال و همدلی",
      aiRole: "پیشنهاد سوالات مصاحبه مرتبط با نقاط مبهم رزومه کارجو",
    },
    {
      title: "۵. تحلیل چندبعدی و تجمیع داده‌ها",
      tag: "تصمیم‌گیری ترکیبی",
      desc: "جمع‌آوری امتیازات فنی، مصاحبه رفتاری، سوابق و شایستگی‌ها در یک داشبورد تحلیلی یکپارچه بدون نمره‌دهی خودکار کور.",
      humanRole: "بحث و تبادل‌نظر کمیته جذب و بررسی زمینه‌های ویژه فردی",
      aiRole: "خلاصه‌سازی نظرات مصاحبه‌کنندگان و کشف تناقضات احتمالی",
    },
    {
      title: "۶. تصمیم نهایی استخدام و ارائه بازخورد",
      tag: "تصمیم نهایی انسان",
      desc: "تصمیم نهایی جذب ۱۰۰٪ توسط مدیران انسان اتخاذ می‌شود و برای تمام داوطلبان، بازخورد مشخص و محترمانه ارسال می‌گردد.",
      humanRole: "مسئولیت کامل تصمیم استخدام و ایجاد تجربه مثبت برای کارجو",
      aiRole: "کمک به تهیه پیش‌نویس بازخورد شخصی‌سازی‌شده و سازنده برای کارجو",
    },
  ];

  const readinessQuestions = [
    { id: 1, text: "سازمان ما شرح شغل‌های استاندارد مبتنی بر شایستگی (نه فقط عناوین کلی) دارد." },
    { id: 2, text: "سیاست شفاف و مکتوبی برای اطلاع‌رسانی استفاده از ابزارهای الگوریتمی به کارجویان داریم." },
    { id: 3, text: "تیم استخدام ما تفاوت میان تطبیق کلمه کلیدی سنتی و پردازش زبان طبیعی مدرن را می‌شناسد." },
    { id: 4, text: "فرآیند بازنگری انسانی (Human-in-the-loop) قبل از رد هر کاندیدا به طور قطعی اجرا می‌شود." },
    { id: 5, text: "پروتکل مشخصی برای محرمانگی و عدم انتقال داده‌های متقاضیان به هوش مصنوعی عمومی داریم." },
    { id: 6, text: "دوره‌های منظم ممیزی برای سنجش سوگیری ناخواسته علیه گروه‌های مختلف متقاضیان برگزار می‌کنیم." },
  ];

  const readinessScore = Math.round((checkedItems.length / readinessQuestions.length) * 100);

  return (
    <main className="min-h-screen pb-24 pt-8 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-teal-700 transition">
            صفحه اصلی
          </Link>
          <span>/</span>
          <span className="text-teal-800 font-bold">پرونده ویژه</span>
          <span>/</span>
          <span className="text-slate-800">هوش مصنوعی در استخدام</span>
        </div>

        {/* Hero Header */}
        <header className="relative bg-[#0B132B] text-white rounded-3xl p-8 sm:p-12 lg:p-16 mb-12 overflow-hidden shadow-xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold mb-5 border border-teal-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>پرونده ویژه تحلیلی و راهنمای راهبردی</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
              هوش مصنوعی در استخدام:
              <br />
              <span className="bg-gradient-to-r from-teal-300 via-cyan-200 to-white bg-clip-text text-transparent">
                توازن میان سرعت الگوریتم و قضاوت انسانی
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
              بررسی جامع تحول فرآیندهای غربالگری، درک معنایی شایستگی‌ها، پیشگیری از سوگیری
              الگوریتمی، حفظ حریم خصوصی کارجویان و تبیین اصل حیاتی «انسان در چرخه تصمیم‌گیری».
            </p>

            <div className="flex flex-wrap gap-4 text-xs sm:text-sm">
              <a
                href="#infographic"
                className="px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold transition shadow-lg shadow-teal-500/20 flex items-center gap-2"
              >
                <span>مشاهده چرخه ۶ مرحله‌ای استخدام</span>
                <ArrowLeft className="w-4 h-4" />
              </a>
              <a
                href="#readiness"
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition border border-slate-700 flex items-center gap-2"
              >
                <span>چک‌لیست آمادگی سازمان</span>
              </a>
            </div>
          </div>
        </header>

        {/* 8 Structured Chapters */}
        <div className="space-y-12">
          {/* Chapter 1 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm">
                ۱
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                هوش مصنوعی چیست و چگونه در استخدام به کار می‌رود؟
              </h2>
            </div>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base mb-4">
              هوش مصنوعی در جذب و استخدام به معنای جایگزینی یک روبات خودکار با مدیر منابع انسانی نیست.
              بلکه مجموعه‌ای از مدل‌های آماری، پردازش زبان طبیعی (NLP) و شبکه‌های یادگیری ماشین است که
              برای کاهش کارهای تکراری، مرتب‌سازی داده‌های حجیم کارجویان و تسهیل ارتباطات اولیه به خدمت
              گرفته می‌شوند.
            </p>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              در سال‌های اخیر، حجم تقاضا برای فرصت‌های شغلی به‌ویژه در موقعیت‌های دورکاری به‌شدت افزایش یافته
              است؛ بررسی چندصد رزومه برای یک موقعیت توسط یک کارشناس انسانی بدون کمک ابزارهای نرم‌افزاری،
              منجر به خستگی مفرط، رد تصادفی رزومه‌های باکیفیت و پاسخ‌دهی دیرهنگام به کارجویان می‌شود.
            </p>
          </section>

          {/* Chapter 2 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm">
                ۲
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                بررسی و دسته‌بندی رزومه‌ها (Semantic ATS)
              </h2>
            </div>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base mb-4">
              سامانه‌های ردیابی کارجو در گذشته (Traditional ATS) رزومه را صرفاً برای یافتن عبارات خاص جستجو
              می‌کردند. اگر کارجو واژه «طراحی محصول» را می‌نوشت ولی آگهی کلمه «Product Design» را طلب می‌کرد،
              رزومه کنار گذاشته می‌شد.
            </p>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              هوش مصنوعی معنایی نوین با استفاده از بردارهای مفهومی (Embeddings)، روابط بین واژگان، عمق پروژه‌ها
              و پویایی سوابق کاری را می‌فهمد. این امر به کارجویان اجازه می‌دهد تا با ادبیات طبیعی رزومه خود را
              بنویسند، نه اینکه رزومه‌شان را پر از کلمات کلیدی مصنوعی برای فریب روبات‌ها کنند.
            </p>
          </section>

          {/* Chapter 3 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm">
                ۳
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                تطبیق مهارت‌ها با نیازهای شغلی (Skill-Based Matching)
              </h2>
            </div>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base mb-4">
              یکی از بزرگ‌ترین مزیت‌های هوش مصنوعی، گذر از «عنوان‌گرایی» به «شایسته‌محوری» است. در مدل سنتی،
              اگر داوطلب عنوان شغلی مشابهی در گذشته نداشت شانس کمی داشت؛ اما امروزه مدل می‌تواند مهارت‌های
              انتقال‌پذیر (Transferable Skills) را تجزیه کند.
            </p>
            <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200 text-teal-900 text-xs sm:text-sm">
              <strong>مثال عینی:</strong> کارجویی که ۵ سال در دانشگاه به عنوان پژوهشگر زیست‌شناسی کار کرده و با
              تحلیل داده‌های آماری پایتون سر و کار داشته، می‌تواند برای نقش «تحلیل‌گر داده‌های کسب‌وکار» بسیار
              شایسته باشد؛ ارتباطی که فیلترهای سنتی گذشته آن را نادیده می‌گرفتند.
            </div>
          </section>

          {/* Chapter 4 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm">
                ۴
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                کمک به تحلیل داده‌های استخدام (Recruitment Analytics)
              </h2>
            </div>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base mb-3">
              هوش مصنوعی می‌تواند به سوالات کلیدی مدیران منابع انسانی پاسخ‌های کمی بدهد:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc pr-5">
              <li>کدام کانال‌های انتشار آگهی شایسته‌ترین کاندیداها را معرفی می‌کنند؟</li>
              <li>در کدام مرحله از فرایند مصاحبه، بیشترین متقاضیان انصراف می‌دهند و علت چیست؟</li>
              <li>میانگین زمان استخدام (Time-to-Hire) برای هر دسته شغلی چقدر است؟</li>
              <li>آیا متن آگهی شغلی توانسته تنوع مناسبی از متقاضیان را جذب کند؟</li>
            </ul>
          </section>

          {/* Chapter 5 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm">
                ۵
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                محدودیت‌ها و خطاهای احتمالی
              </h2>
            </div>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base mb-4">
              هوش مصنوعی معجزه‌گر نیست و هرگز نباید بدون نظارت رها شود:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">توهم مدل (Hallucination)</span>
                <p className="text-slate-600">
                  گاهی مدل ممکن است اطلاعاتی را که در رزومه وجود ندارد به شکل مفروض تلقی کند یا ارزیابی‌های اشتباه از سال‌های سابقه ارائه دهد.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">عدم درک بافت فرهنگی و عاطفی</span>
                <p className="text-slate-600">
                  اشتیاق، اخلاق حرفه‌ای، صبر، سازگاری و انعطاف‌پذیری کارجو در هیچ فرمت متنی به طور کامل قابل سنجش ماشینی نیست.
                </p>
              </div>
            </div>
          </section>

          {/* Chapter 6 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm">
                ۶
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                اهمیت حفظ حریم خصوصی متقاضیان (Privacy & Data Protection)
              </h2>
            </div>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base mb-3">
              رزومه کارجویان حاوی شماره‌های تماس، نشانی‌ها، سوابق تحصیلی و تجربیات شخصی است. سازمان‌ها موظف‌اند:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc pr-5">
              <li>هرگز داده‌های کارجویان را وارد ابزارهای عمومی هوش مصنوعی بدون قراردادهای سازمانی محرمانگی نکنند.</li>
              <li>پس از اتمام فرایند، مطابق با استانداردهای حفظ داده (مشابه الزامات GDPR)، امکان حذف داده‌های شخصی را فراهم کنند.</li>
              <li>از نظارت مخفیانه تصویری یا ضبط غیرمجاز حالات چهره در آزمون‌های ویدیویی آنلاین اجتناب کنند.</li>
            </ul>
          </section>

          {/* Chapter 7 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm">
                ۷
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                خطر سوگیری الگوریتمی (Algorithmic Bias)
              </h2>
            </div>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base mb-4">
              اگر مدلی بر روی داده‌های تاریخی استخدامی گذشته یک شرکت آموزش ببیند، تعصبات و خطاهای گذشته را
              کدگذاری و تشدید می‌کند. تجربه تاریخی پروژه‌های غربالگری خودکار نشان داده است که مدل‌ها ممکن است
              به‌طور ناخواسته دانشگاه‌های خاص، جنسیت، سن یا قومیت را به‌عنوان پیش‌بینی‌کننده موفقیت در نظر بگیرند.
            </p>
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs sm:text-sm">
              <strong>راهکار مقابله:</strong> بی‌نام‌سازی داده‌ها (Blind Screening) در مراحل اولیه، بررسی دوره‌ای
              نرخ پذیرش در میان اقشار گوناگون و اطمینان از اینکه هیچ کاندیدایی صرفاً به دلایل نامرئی الگوریتمی رد نشود.
            </div>
          </section>

          {/* Chapter 8 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm">
                ۸
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                نقش تصمیم‌گیری انسانی در کنار ابزارهای هوش مصنوعی (Human-in-the-Loop)
              </h2>
            </div>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base mb-4">
              اصل اساسی در استخدام مسئولانه این است که هوش مصنوعی در جایگاه «پیشنهاددهنده» باقی بماند، نه
              «تصمیم‌گیرنده نهایی». هیچ متقاضی کاری نباید بدون بررسی و قضاوت یک کارشناس انسانی از فرآیند کنار گذاشته شود.
            </p>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              هوش مصنوعی با انجام کارهای روتین، وقت ارزشمند کارشناسان جذب را آزاد می‌کند تا بتوانند زمان بیشتری
              را به گفتگو، مصاحبه‌های عمیق، درک آرزوهای شغلی کارجو و ساختن رابطه پایدار اختصاص دهند.
            </p>
          </section>
        </div>

        {/* Section: Interactive 6-step Infographic */}
        <section id="infographic" className="mt-16 pt-12 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold mb-3 border border-teal-200">
              <Layers className="w-3.5 h-3.5" />
              <span>اینفوگرافیک تعاملی</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              چرخه ۶ مرحله‌ای استخدام هوشمند و انسانی
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              روی هر مرحله کلیک کنید تا نقش متقابل هوش مصنوعی و انسان را مشاهده کنید.
            </p>
          </div>

          {/* Steps selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-6">
            {workflowSteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-3 rounded-2xl border text-right transition flex flex-col justify-between ${
                  activeStep === idx
                    ? "bg-slate-900 text-white border-slate-900 shadow-md"
                    : "bg-white text-slate-700 border-slate-200 hover:border-teal-300"
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-2">
                  <span className={`font-mono font-bold ${activeStep === idx ? "text-teal-400" : "text-teal-700"}`}>
                    گام ۰{idx + 1}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${activeStep === idx ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-500"}`}>
                    {step.tag}
                  </span>
                </div>
                <h4 className="text-xs font-bold leading-snug line-clamp-2">
                  {step.title.split(". ")[1]}
                </h4>
              </button>
            ))}
          </div>

          {/* Active step detail view */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                  مرحله {activeStep + 1} از ۶
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                  {workflowSteps[activeStep].title}
                </h3>
              </div>
              <span className="text-xs text-slate-500">
                برچسب راهبردی: {workflowSteps[activeStep].tag}
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
              {workflowSteps[activeStep].desc}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/80">
                <div className="flex items-center gap-2 font-bold text-teal-900 mb-1">
                  <Brain className="w-4 h-4 text-teal-700" />
                  <span>نقش کمکی هوش مصنوعی:</span>
                </div>
                <p className="text-teal-800 leading-relaxed">
                  {workflowSteps[activeStep].aiRole}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80">
                <div className="flex items-center gap-2 font-bold text-blue-900 mb-1">
                  <Users className="w-4 h-4 text-blue-700" />
                  <span>نقش حیاتی انسان:</span>
                </div>
                <p className="text-blue-800 leading-relaxed">
                  {workflowSteps[activeStep].humanRole}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Organizational AI Recruitment Readiness Assessment */}
        <section id="readiness" className="mt-16 pt-12 border-t border-slate-200">
          <div className="bg-gradient-to-br from-slate-900 to-[#0B132B] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center gap-2 text-teal-400 text-xs font-bold mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>ابزار خودارزیابی منابع انسانی</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  چک‌لیست سنجش آمادگی سازمان برای هوش مصنوعی در استخدام
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  موارد محقق‌شده در سازمان خود را علامت بزنید تا شاخص آمادگی اخلاقی و عملیاتی محاسبه شود.
                </p>
              </div>

              {/* Score indicator */}
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 text-center shrink-0 min-w-[140px]">
                <span className="text-xs text-slate-400 block mb-1">شاخص آمادگی:</span>
                <span className="text-3xl font-black font-mono text-teal-400">{readinessScore}٪</span>
                <span className="text-[11px] text-slate-400 block mt-1">
                  {readinessScore >= 80 ? "آمادگی بالا ✓" : readinessScore >= 50 ? "نیازمند بهبود" : "مقدماتی"}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {readinessQuestions.map((q) => {
                const isChecked = checkedItems.includes(q.id);
                return (
                  <button
                    key={q.id}
                    onClick={() => toggleCheck(q.id)}
                    className={`w-full text-right p-4 rounded-2xl border transition flex items-start gap-3 ${
                      isChecked
                        ? "bg-teal-500/15 border-teal-500/50 text-teal-100"
                        : "bg-slate-800/50 border-slate-700 hover:bg-slate-800 text-slate-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                        isChecked
                          ? "bg-teal-500 border-teal-400 text-slate-950"
                          : "border-slate-500 bg-slate-900"
                      }`}
                    >
                      {isChecked && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                    </div>
                    <span className="text-xs sm:text-sm font-medium leading-relaxed">
                      {q.text}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
              <span>{checkedItems.length} از ۶ شاخص کلیدی در سازمان شما فعال است.</span>
              <Link
                href="/toolbox"
                className="text-teal-300 hover:text-white font-bold transition flex items-center gap-1"
              >
                <span>مشاهده پرامپت‌های استاندارد تدوین آگهی و مصاحبه در جعبه‌ابزار</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
