import { db } from "./index";
import { articles, pollVotes } from "./schema";
import { SEED_ARTICLES } from "./seed-data";
import { eq } from "drizzle-orm";

export async function seedDatabase() {
  console.log("Seeding database...");

  // Seed articles
  for (const item of SEED_ARTICLES) {
    const existing = await db
      .select()
      .from(articles)
      .where(eq(articles.slug, item.slug))
      .limit(1);

    if (existing.length === 0) {
      await db.insert(articles).values({
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
      });
      console.log(`Inserted article: ${item.slug}`);
    } else {
      // Update with latest rich content
      await db
        .update(articles)
        .set({
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
        })
        .where(eq(articles.slug, item.slug));
    }
  }

  // Poll options start at zero; only visitor submissions should create votes.

  console.log("Database seeding completed.");
}

// Run if called directly
if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("Failed to seed database:", err);
      process.exit(1);
    });
}
