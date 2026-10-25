import { pgTable, serial, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  summary: text("summary").notNull(),
  category: text("category").notNull(), // 'ai', 'hr', 'learning', 'future-work', 'analysis'
  categoryLabel: text("category_label").notNull(),
  readTime: integer("read_time").notNull(), // in minutes
  authorName: text("author_name").notNull(),
  authorRole: text("author_role").notNull(),
  coverImage: text("cover_image").notNull(),
  isFeatured: boolean("is_featured").default(false),
  publishedAt: text("published_at").notNull(),
  tags: text("tags").notNull(), // JSON array of string tags
  content: text("content").notNull(), // In-depth structured JSON or rich text
  tableOfContents: text("table_of_contents"), // JSON array of { id, text, level }
  keyTakeaways: text("key_takeaways"), // JSON array of string bullet points
  references: text("references"), // JSON array of { title, url, source }
  viewsCount: integer("views_count").default(120),
  likesCount: integer("likes_count").default(24),
  createdAt: timestamp("created_at").defaultNow(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  status: text("status").default("active"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const pollVotes = pgTable("poll_votes", {
  id: serial("id").primaryKey(),
  pollKey: text("poll_key").notNull(),
  optionKey: text("option_key").notNull(),
  votes: integer("votes").default(1).notNull(),
});

export const articleFeedback = pgTable("article_feedback", {
  id: serial("id").primaryKey(),
  articleSlug: text("article_slug").notNull(),
  isHelpful: boolean("is_helpful").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
