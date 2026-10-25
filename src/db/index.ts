import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

// Database is optional during build; article pages fall back to bundled seed content when unavailable.

const CREATE_TABLES_SQL = `
  create table if not exists articles (
    id serial primary key,
    slug text not null unique,
    title text not null,
    subtitle text not null,
    summary text not null,
    category text not null,
    category_label text not null,
    read_time integer not null,
    author_name text not null,
    author_role text not null,
    cover_image text not null,
    is_featured boolean default false,
    published_at text not null,
    tags text not null,
    content text not null,
    table_of_contents text,
    key_takeaways text,
    "references" text,
    views_count integer default 120,
    likes_count integer default 24,
    created_at timestamp default now()
  );
  create table if not exists newsletter_subscribers (
    id serial primary key,
    email text not null unique,
    status text default 'active',
    created_at timestamp default now()
  );
  create table if not exists poll_votes (
    id serial primary key,
    poll_key text not null,
    option_key text not null,
    votes integer not null default 1
  );
  create table if not exists article_feedback (
    id serial primary key,
    article_slug text not null,
    is_helpful boolean not null,
    created_at timestamp default now()
  );
`;

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

function createPool(): Pool {
  const newPool = databaseUrl
    ? new Pool({ connectionString: databaseUrl })
    : new Pool();

  // Make sure the tables exist. The statement is queued on the new
  // connection before any real query, so it always runs first.
  let tablesChecked = false;
  newPool.on("connect", (client) => {
    if (tablesChecked) return;
    tablesChecked = true;
    client.query(CREATE_TABLES_SQL).catch((err: unknown) => {
      console.error("Table setup error:", err);
    });
  });

  return newPool;
}

export const pool = globalForDb.__arenaNextJsPostgresqlPool ?? createPool();

if (process.env.NODE_ENV !== "production") {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

export const db = drizzle(pool);
