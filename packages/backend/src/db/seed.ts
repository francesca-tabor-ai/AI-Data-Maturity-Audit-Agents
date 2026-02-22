import bcrypt from 'bcrypt';
import { store, uuid } from './client.js';
import { pool } from './pool.js';

const ADMIN_EMAIL = 'admin@maturityos.com';
const ADMIN_PASSWORD = 'Admin123!'; // Change in production

async function seed() {
  // Create admin user
  const existingAdmin = await store.users.getByEmail(ADMIN_EMAIL);
  if (!existingAdmin) {
    const adminId = uuid();
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await store.users.insert({
      id: adminId,
      email: ADMIN_EMAIL,
      password_hash: passwordHash,
      name: 'Admin',
      role: 'admin',
    });
    console.log('Admin user created:', ADMIN_EMAIL);
  } else {
    console.log('Admin user already exists:', ADMIN_EMAIL);
  }

  // Seed sample companies
  const companies = [
    { name: 'Acme Corp', domain: 'acme.com' },
    { name: 'TechStart Inc', domain: 'techstart.io' },
  ];

  for (const c of companies) {
    const existing = (await store.companies.getAll()).find(
      (x) => x.domain === c.domain
    );
    if (!existing) {
      await store.companies.insert({
        id: uuid(),
        name: c.name,
        domain: c.domain,
      });
      console.log('Created company:', c.name);
    }
  }

  console.log('Seed completed.');
  await pool.end();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
