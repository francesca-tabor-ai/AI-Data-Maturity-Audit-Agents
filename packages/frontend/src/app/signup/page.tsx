'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name: name || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Signup failed');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/');
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
          Sign up
        </h1>
        <p className="body-muted" style={{ marginBottom: 'var(--space-lg)' }}>
          Create an account to get started.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <input
            type="text"
            placeholder="Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <input
            type="password"
            placeholder="Password (min 8 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          <button onClick={signup} disabled={loading} className="btn">
            {loading ? 'Creating account…' : 'Sign up'}
          </button>
        </div>
        {error && (
          <p className="label" style={{ color: 'var(--color-error)', marginTop: 'var(--space-md)' }}>
            {error}
          </p>
        )}
        <p className="body-muted" style={{ marginTop: 'var(--space-lg)' }}>
          Already have an account? <Link href="/login" className="link-interactive">Log in</Link>
        </p>
      </main>
    </div>
  );
}
