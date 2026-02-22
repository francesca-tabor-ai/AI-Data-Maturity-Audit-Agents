import pg from 'pg';

const connectionString =
  process.env.DATABASE_URL ?? process.env.DATABASE_PUBLIC_URL ?? '';

if (!connectionString) {
  console.warn(
    'DATABASE_URL or DATABASE_PUBLIC_URL not set. Database features will not work.'
  );
}

export const pool = new pg.Pool({
  connectionString: connectionString || undefined,
  ssl: connectionString?.includes('rlwy.net') ? { rejectUnauthorized: false } : undefined,
});
