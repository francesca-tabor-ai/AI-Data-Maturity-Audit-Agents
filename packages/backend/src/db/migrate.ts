import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { pool } from './pool.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, 'schema.pg.sql');
const schema = readFileSync(schemaPath, 'utf-8');

async function migrate() {
  const client = await pool.connect();
  try {
    await client.query(schema);
    console.log('PostgreSQL schema applied successfully.');
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
