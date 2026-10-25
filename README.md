# Future of Work Media Site

A Next.js web application for publishing articles and interactive content about the future of work, AI, and recruitment.

## Tech stack

- Next.js (App Router)
- TypeScript
- Drizzle ORM
- PostgreSQL
- Tailwind CSS (if configured in the source)

## Requirements

- Node.js compatible with the version supported by the project's Next.js release
- npm
- A PostgreSQL database

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure the database connection by setting `DATABASE_URL` in your local environment (for example, in a `.env.local` file):

   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
   ```

   Replace the placeholder with your own database connection string. Do not commit credentials or real environment files.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Available scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run start` — start the production server
- `npm run lint` — run lint checks
- `npm run typecheck` — run TypeScript checks

## Database

The project uses Drizzle ORM with PostgreSQL. Review the Drizzle configuration and schema before applying any schema changes. The database must be provisioned and its schema initialized before database-backed features can work.

## Deployment

The project can be deployed to Vercel after the full source tree has been committed and the required environment variables and database are configured.

## Notes

- Keep secrets such as `DATABASE_URL` out of Git.
- Check that any referenced static assets are present in the project's `public/` directory before deploying.
