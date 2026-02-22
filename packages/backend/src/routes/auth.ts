import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { store, uuid } from '../db/client.js';
import { z } from 'zod';

export const authRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret-change-in-production';
const signupSchema = z.object({ email: z.string().email(), password: z.string().min(8), name: z.string().optional() });
const loginSchema = z.object({ email: z.string().email(), password: z.string().min(1) });

authRouter.post('/signup', async (req, res) => {
  try {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors[0]?.message ?? 'Invalid input' });
    }
    const { email, password, name } = parsed.data;

    const existing = await store.users.getByEmail(email);
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    const id = uuid();
    const passwordHash = await bcrypt.hash(password, 10);
    await store.users.insert({ id, email, password_hash: passwordHash, name, role: 'user' });

    const token = jwt.sign({ sub: id, role: 'user' }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id, email, name, role: 'user' } });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Signup failed' });
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors[0]?.message ?? 'Invalid input' });
    }
    const { email, password } = parsed.data;

    const user = await store.users.getByEmail(email);
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid email or password' });

    const token = jwt.sign(
      { sub: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Login failed' });
  }
});
