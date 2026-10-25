import pg from "pg";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is missing");
  process.exit(1);
}

const pool = new pg.Pool({ connectionString: url });

await pool.query(`
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
`);

await pool.end();
console.log("Tables ready");
