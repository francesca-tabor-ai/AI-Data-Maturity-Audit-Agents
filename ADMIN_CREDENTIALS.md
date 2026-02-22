# Admin Login Credentials

**⚠️ IMPORTANT:** Change these credentials in production. Do not commit production credentials to version control.

## Default Admin Account

| Field | Value |
|-------|-------|
| **Email** | `admin@maturityos.com` |
| **Password** | `Admin123!` |

## Getting Started

1. Run database migration: `npm run db:migrate`
2. Seed the database (creates admin user): `npm run db:seed`
3. Start the backend: `npm run dev:backend`
4. Log in at `/login` with the credentials above
5. Access the admin dashboard at `/admin`

## Changing the Admin Password

Update the seed script (`packages/backend/src/db/seed.ts`) before running `npm run db:seed`, or use the admin API to update the user's password after creation.

## Environment Variables

Ensure the following are set for the backend:

- `DATABASE_URL` or `DATABASE_PUBLIC_URL` – PostgreSQL connection string (Railway provides this)
- `JWT_SECRET` – Secret for signing tokens (use a strong random value in production)
