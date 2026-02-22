# Vercel Deployment

This is a monorepo. The Next.js app lives in `packages/frontend`. Vercel must use that folder as the project root.

## Fix: Set Root Directory (required)

The `outputDirectory` in `vercel.json` does not override where the Next.js framework looks. You **must** set Root Directory in the Vercel dashboard:

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click your project (**AI-Data-Maturity-Audit-Agents** or similar)
3. Click **Settings** (top nav)
4. In the left sidebar, click **General**
5. Scroll to **Root Directory**
6. Click **Edit** (or the pencil icon)
7. Enter exactly: `packages/frontend`
8. Click **Save**
9. Go to **Deployments** → click ⋮ on the latest → **Redeploy**

After redeploy, `.next` will be at `packages/frontend/.next` (the project root), and the build will succeed.
