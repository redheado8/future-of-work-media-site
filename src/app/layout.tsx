import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookmarkProvider } from "@/components/BookmarkContext";
import { getAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: {
    default: "فردای کار | ایده‌های تازه برای دنیای در حال تغییر کار",
    template: "%s | فردای کار",
  },
  description:
    "رسانه تخصصی آینده کار، مدیریت سرمایه انسانی، هوش مصنوعی، یادگیری سازمانی و تحول دیجیتال سازمان‌ها.",
  keywords: [
    "آینده کار",
    "منابع انسانی هوشمند",
    "هوش مصنوعی در استخدام",
    "یادگیری سازمانی",
    "تجربه کارکنان",
    "تحول دیجیتال",
    "فردای کار",
    "پیپل آنالیتیکس",
  ],
  authors: [{ name: "فردای کار" }],
  openGraph: {
    title: "فردای کار | ایده‌های تازه برای دنیای در حال تغییر کار",
    description: "رسانه مستقل تخصصی درباره فناوری‌های نوین در محیط کار و مدیریت سرمایه انسانی",
    siteName: "فردای کار",
    locale: "fa_IR",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const articlesForSearch = await getAllArticles();

  return (
    <html lang="fa" dir="rtl" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#F8FAFC] text-slate-900 antialiased min-h-screen flex flex-col selection:bg-teal-500 selection:text-white">
        <BookmarkProvider>
          <Header articlesForSearch={articlesForSearch} />
          <div className="flex-1">{children}</div>
          <Footer />
        </BookmarkProvider>
      </body>
    </html>
  );
}
