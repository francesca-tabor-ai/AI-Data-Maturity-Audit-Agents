# Vercel Deployment

This is a monorepo with the Next.js app in `packages/frontend`. To fix the ".next not found" error:

## Option A: Set Root Directory (recommended)

1. [Vercel Dashboard](https://vercel.com/dashboard) → your project → **Settings** → **General**
2. Find **Root Directory** → click **Edit**
3. Enter: `packages/frontend`
4. Click **Save**
5. **Deployments** → ⋮ on latest deployment → **Redeploy**

## Option B: Clear Output Directory override

If **Root Directory** is left at the repo root, ensure **Output Directory** is not overriding:

1. **Settings** → **General** → **Build & Development Settings**
2. Find **Output Directory** – if it shows `.next`, **clear it** (leave empty)
3. The `vercel.json` in this repo sets `outputDirectory` to `packages/frontend/.next`
4. Redeploy
