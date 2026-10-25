import { db } from "@/db";
import { articles, newsletterSubscribers, pollVotes, articleFeedback } from "@/db/schema";
import { eq, desc, sql, and, ne } from "drizzle-orm";
import { SEED_ARTICLES } from "@/db/seed-data";

// Seed sync runs once per server runtime to avoid repeating writes on every request.
let seedSyncPromise: Promise<void> | null = null;

export async function ensureArticlesSeeded() {
  if (seedSyncPromise) return seedSyncPromise;
  seedSyncPromise = (async () => {
  try {
    // Keep seed-managed article content in sync by slug, while preserving user engagement counters.
    // This updates article metadata/content/references on deploy without resetting views or likes.
    for (const item of SEED_ARTICLES) {
      await db
        .insert(articles)
        .values({
          slug: item.slug,
          title: item.title,
          subtitle: item.subtitle,
          summary: item.summary,
          category: item.category,
          categoryLabel: item.categoryLabel,
          readTime: item.readTime,
          authorName: item.authorName,
          authorRole: item.authorRole,
          coverImage: item.coverImage,
          isFeatured: item.isFeatured,
          publishedAt: item.publishedAt,
          tags: JSON.stringify(item.tags),
          content: item.content,
          keyTakeaways: JSON.stringify(item.keyTakeaways),
          tableOfContents: JSON.stringify(item.tableOfContents),
          references: JSON.stringify(item.references),
          viewsCount: 0,
          likesCount: 0,
        })
        .onConflictDoUpdate({
          target: articles.slug,
          set: {
            title: item.title,
            subtitle: item.subtitle,
            summary: item.summary,
            category: item.category,
            categoryLabel: item.categoryLabel,
            readTime: item.readTime,
            authorName: item.authorName,
            authorRole: item.authorRole,
            coverImage: item.coverImage,
            isFeatured: item.isFeatured,
            publishedAt: item.publishedAt,
            tags: JSON.stringify(item.tags),
            content: item.content,
            keyTakeaways: JSON.stringify(item.keyTakeaways),
            tableOfContents: JSON.stringify(item.tableOfContents),
            references: JSON.stringify(item.references),
          },
        });
    }
  } catch (err) {
    console.error("Article seed sync error:", err);
    seedSyncPromise = null;
  }
  })();
  return seedSyncPromise;
}

export interface ParsedArticle {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  category: string;
  categoryLabel: string;
  readTime: number;
  authorName: string;
  authorRole: string;
  coverImage: string;
  isFeatured: boolean | null;
  publishedAt: string;
  tags: string[];
  content: string;
  tableOfContents: { id: string; text: string; level: number }[];
  keyTakeaways: string[];
  references: { title: string; source: string; url?: string }[];
  viewsCount: number | null;
  likesCount: number | null;
  createdAt: Date | null;
}

function parseArticleRow(row: typeof articles.$inferSelect): ParsedArticle {
  let tags: string[] = [];
  let tableOfContents: { id: string; text: string; level: number }[] = [];
  let keyTakeaways: string[] = [];
  let references: { title: string; source: string; url?: string }[] = [];

  try {
    tags = JSON.parse(row.tags || "[]");
  } catch {
    tags = [];
  }
  try {
    tableOfContents = JSON.parse(row.tableOfContents || "[]");
  } catch {
    tableOfContents = [];
  }
  try {
    keyTakeaways = JSON.parse(row.keyTakeaways || "[]");
  } catch {
    keyTakeaways = [];
  }
  try {
    references = JSON.parse(row.references || "[]");
  } catch {
    references = [];
  }

  return {
    ...row,
    tags,
    tableOfContents,
    keyTakeaways,
    references,
  };
}

function getSeedArticlesAsParsed(): ParsedArticle[] {
  return SEED_ARTICLES.map((item, index) => ({
    ...item,
    id: index + 1,
    tags: item.tags,
    tableOfContents: item.tableOfContents,
    keyTakeaways: item.keyTakeaways,
    references: item.references,
    viewsCount: 0,
    likesCount: 0,
    createdAt: null,
  }));
}

export async function getAllArticles(options?: {
  category?: string;
  search?: string;
  limit?: number;
}): Promise<ParsedArticle[]> {
  await ensureArticlesSeeded();

  try {
    const rows = await db
      .select()
      .from(articles)
      .orderBy(desc(articles.id));

    let parsed = rows.map(parseArticleRow);

    if (options?.category && options.category !== "all") {
      parsed = parsed.filter((a) => a.category === options.category);
    }

    if (options?.search) {
      const q = options.search.toLowerCase().trim();
      parsed = parsed.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (options?.limit) {
      parsed = parsed.slice(0, options.limit);
    }

    return parsed;
  } catch (error) {
    console.error("Error fetching articles; using bundled seed content:", error);
    return getSeedArticlesAsParsed();
  }
}

export async function getFeaturedArticle(): Promise<ParsedArticle | null> {
  await ensureArticlesSeeded();
  try {
    const rows = await db
      .select()
      .from(articles)
      .where(eq(articles.isFeatured, true))
      .limit(1);

    if (rows.length > 0) {
      return parseArticleRow(rows[0]);
    }

    // fallback to first article
    const firstRow = await db.select().from(articles).limit(1);
    return firstRow.length > 0 ? parseArticleRow(firstRow[0]) : null;
  } catch (error) {
    console.error("Error fetching featured article; using bundled seed content:", error);
    return getSeedArticlesAsParsed().find((article) => article.isFeatured) ?? getSeedArticlesAsParsed()[0] ?? null;
  }
}

export async function getArticleBySlug(slug: string): Promise<ParsedArticle | null> {
  await ensureArticlesSeeded();
  try {
    const rows = await db
      .select()
      .from(articles)
      .where(eq(articles.slug, slug))
      .limit(1);

    if (rows.length === 0) return null;

    return parseArticleRow(rows[0]);
  } catch (error) {
    console.error("Error fetching article by slug; using bundled seed content:", error);
    return getSeedArticlesAsParsed().find((article) => article.slug === slug) ?? null;
  }
}

export async function getRelatedArticles(
  currentSlug: string,
  category: string,
  limit: number = 3
): Promise<ParsedArticle[]> {
  try {
    const rows = await db
      .select()
      .from(articles)
      .where(and(ne(articles.slug, currentSlug), eq(articles.category, category)))
      .limit(limit);

    if (rows.length >= limit) {
      return rows.map(parseArticleRow);
    }

    // Fallback: fill with any other articles
    const others = await db
      .select()
      .from(articles)
      .where(ne(articles.slug, currentSlug))
      .limit(limit);

    return others.map(parseArticleRow);
  } catch (error) {
    console.error("Error fetching related articles:", error);
    return [];
  }
}

export async function incrementArticleViews(slug: string) {
  try {
    await db
      .update(articles)
      .set({ viewsCount: sql`${articles.viewsCount} + 1` })
      .where(eq(articles.slug, slug));
  } catch (err) {
    console.error("Error incrementing views:", err);
  }
}

export async function registerNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  try {
    if (!email || !email.includes("@")) {
      return { success: false, message: "لطفاً یک آدرس ایمیل معتبر وارد کنید." };
    }
    const cleanEmail = email.trim().toLowerCase();
    
    // Check if already subscribed
    const existing = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, cleanEmail))
      .limit(1);

    if (existing.length > 0) {
      return {
        success: true,
        message: "ایمیل شما از قبل در خبرنامه فردای کار ثبت شده است.",
      };
    }

    await db.insert(newsletterSubscribers).values({
      email: cleanEmail,
    });

    return {
      success: true,
      message: "اشتراک شما در خبرنامه فردای کار با موفقیت تایید شد. از همراهی شما سپاسگزاریم.",
    };
  } catch (err) {
    console.error("Newsletter subscription error:", err);
    return {
      success: false,
      message: "خطایی در ثبت ایمیل رخ داد. لطفاً مجدداً تلاش فرمایید.",
    };
  }
}

export async function getPollData(pollKey: string = "workplace-transformation") {
  try {
    const rows = await db
      .select()
      .from(pollVotes)
      .where(eq(pollVotes.pollKey, pollKey));

    const labels: Record<string, string> = {
      "ai-recruitment": "هوش مصنوعی و جذب استعداد",
      "continuous-upskilling": "ارتقای مستمر مهارت‌ها و بازآموزی",
      "employee-wellbeing": "تجربه و سلامت روانی کارکنان",
      "remote-hybrid-culture": "فرهنگ تیم‌های ترکیبی و دورکاری",
    };

    const counts = new Map(rows.map((row) => [row.optionKey, row.votes]));
    // The database seed initializes poll options at zero. Report persisted vote
    // counts directly; subtracting historical demo baselines hides real votes
    // whenever the database does not contain those exact legacy totals.
    return Object.entries(labels).map(([optionKey, label]) => ({
      optionKey,
      label,
      votes: counts.get(optionKey) ?? 0,
    }));
  } catch (err) {
    console.error("Poll data error:", err);
    return [];
  }
}

export async function recordPollVote(pollKey: string, optionKey: string) {
  try {
    const existing = await db
      .select({ id: pollVotes.id })
      .from(pollVotes)
      .where(and(eq(pollVotes.pollKey, pollKey), eq(pollVotes.optionKey, optionKey)))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(pollVotes)
        .set({ votes: sql`${pollVotes.votes} + 1` })
        .where(and(eq(pollVotes.pollKey, pollKey), eq(pollVotes.optionKey, optionKey)));
    } else {
      await db.insert(pollVotes).values({ pollKey, optionKey, votes: 1 });
    }
    return { success: true };
  } catch (err) {
    console.error("Record poll vote error:", err);
    return { success: false };
  }
}

export async function recordArticleFeedback(articleSlug: string, isHelpful: boolean) {
  try {
    await db.insert(articleFeedback).values({
      articleSlug,
      isHelpful,
    });
    return { success: true };
  } catch (err) {
    console.error("Record feedback error:", err);
    return { success: false };
  }
}
