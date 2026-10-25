import React from "react";
import { notFound } from "next/navigation";
import { getArticleBySlug, getRelatedArticles, incrementArticleViews } from "@/lib/articles";
import { ArticleView } from "@/components/article/ArticleView";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "مقاله یافت نشد | فردای کار",
    };
  }

  return {
    title: `${article.title} | فردای کار`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      images: [article.coverImage],
      type: "article",
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Record view count
  await incrementArticleViews(slug);

  // Fetch related articles
  const related = await getRelatedArticles(slug, article.category, 3);

  return <ArticleView article={article} relatedArticles={related} />;
}
