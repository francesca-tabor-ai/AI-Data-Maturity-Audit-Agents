# Vercel Deployment

This is a monorepo with the Next.js app in `packages/frontend`. To fix the ".next not found" error:

## Required: Set Root Directory

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select this project
3. **Settings** → **General**
4. Under **Root Directory**, click **Edit**
5. Enter: `packages/frontend`
6. Click **Save**
7. **Redeploy** (Deployments → ⋮ on latest → Redeploy)

This tells Vercel the Next.js app lives in that folder, so `.next` is found correctly.
