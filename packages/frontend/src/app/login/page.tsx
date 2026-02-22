'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Login failed');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      if (data.user.role === 'admin') router.push('/admin');
      else router.push('/');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main style={{ padding: 'var(--space-2xl)', maxWidth: 400, margin: '0 auto' }}>
        <h1 className="headline-2" style={{ marginBottom: 'var(--space-md)' }}>
          Log in
        </h1>
        <p className="body-muted" style={{ marginBottom: 'var(--space-lg)' }}>
          Sign in to your account or continue as a guest.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          <button onClick={login} disabled={loading} className="btn">
            {loading ? 'Logging in…' : 'Log in'}
          </button>
        </div>
        {error && (
          <p className="label" style={{ color: 'var(--color-error)', marginTop: 'var(--space-md)' }}>
            {error}
          </p>
        )}
        <p className="body-muted" style={{ marginTop: 'var(--space-lg)' }}>
          Don&apos;t have an account? <Link href="/signup" className="link-interactive">Sign up</Link>
        </p>
      </main>
    </div>
  );
}
