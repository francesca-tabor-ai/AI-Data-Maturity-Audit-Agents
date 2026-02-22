import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getDb } from './client.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, 'schema.sql');

const schema = readFileSync(schemaPath, 'utf-8');
const db = getDb();
db.exec(schema);
console.log('Database schema applied successfully.');
