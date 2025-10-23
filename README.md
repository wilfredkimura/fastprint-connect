# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/4b3a43f5-d00e-4eaf-831c-dcb3afc90d91

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/4b3a43f5-d00e-4eaf-831c-dcb3afc90d91) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/4b3a43f5-d00e-4eaf-831c-dcb3afc90d91) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Deploy to Vercel and Neon (PostgreSQL)

This project is configured to deploy a Vite frontend and an Express API as a Vercel Serverless Function, and to use Neon (serverless Postgres) via Prisma.

### 1) Create Neon database

- Create a project at https://neon.tech and a database.
- Copy the pooled connection string, e.g.
  `postgresql://<user>:<password>@<neon-host>.neon.tech/<db>?sslmode=require`

### 2) Set environment variables (Vercel → Project → Settings → Environment Variables)

- `DATABASE_URL` = your Neon pooled connection string (recommended)
  - Alternatively, set piecewise values and the app will build `DATABASE_URL` automatically:
    - `NEON_HOST`, `NEON_USER`, `NEON_PASSWORD`, `NEON_DATABASE`
- `JWT_SECRET` = a strong random string
- `ADMIN_EMAIL` = `admin@example.com`
- `ADMIN_PASSWORD` = `12345678`
- `ADMIN_NAME` = `Admin User`

### 3) One-time Prisma migration against Neon

Option A (local):

```bash
# Ensure local has Prisma CLI available
npm i
npm run postinstall  # runs "prisma generate --schema=server/prisma/schema.prisma"

# Point DATABASE_URL to your Neon URL in environment for this command
npx prisma migrate deploy --schema=server/prisma/schema.prisma
```

Option B (CI task): run `prisma migrate deploy` once against Neon after setting envs.

### 4) Deploy to Vercel

- Push repo to GitHub/GitLab/Bitbucket and import into Vercel.
- Build settings (auto-detected):
  - Install: `npm install` (postinstall generates Prisma client)
  - Build: `npm run build`
  - Output: `dist`
- Serverless API is in `api/index.js` and is mounted at `/api/*`.

### 5) SPA rewrites (already added)

- `vercel.json` at the repo root:

```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api" },
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### 6) Verify

- API health: `https://<your-app>.vercel.app/api/health` → `{ ok: true }`
- Frontend: `https://<your-app>.vercel.app/`
- Login with seeded admin (`admin@example.com` / `12345678`). If the user already exists, delete it from the DB to re-seed.

### Local development tips

- Frontend dev: `npm run dev` → http://localhost:5173
- Backend local (optional): `server/index.js` on http://localhost:4000
- Frontend API base defaults to `"/api"` for Vercel. For local split-ports, set `VITE_API_URL=http://localhost:4000/api` in `.env.local`.
