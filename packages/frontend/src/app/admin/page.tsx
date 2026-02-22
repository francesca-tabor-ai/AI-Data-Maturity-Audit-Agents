'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

type Entity = 'companies' | 'analyses' | 'agent-tasks' | 'scores' | 'findings' | 'users';

function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export default function AdminPage() {
  const router = useRouter();
  const [entity, setEntity] = useState<Entity>('companies');
  const [data, setData] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
      return;
    }
    const u = localStorage.getItem('user');
    const user = u ? JSON.parse(u) : null;
    if (user?.role !== 'admin') {
      router.push('/');
      return;
    }
  }, [router]);

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    setLoading(true);
    setError(null);
    fetch(`${API}/api/admin/${entity}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (r) => {
        if (r.status === 401 || r.status === 403) {
          router.push('/login');
          return null;
        }
        const d = await r.json().catch(() => ({}));
        return d;
      })
      .then((d) => {
        if (d !== null) setData(d.data ?? []);
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Request failed'))
      .finally(() => setLoading(false));
  }, [entity, router]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item?')) return;
    const token = getToken();
    if (!token) return;
    try {
      const res = await fetch(`${API}/api/admin/${entity}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Delete failed');
      setData((prev) => (prev as { id: string }[]).filter((x) => x.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error');
    }
  };

  const token = getToken();
  if (!token) return null;

  const entities: { key: Entity; label: string }[] = [
    { key: 'companies', label: 'Companies' },
    { key: 'analyses', label: 'Analyses' },
    { key: 'agent-tasks', label: 'Agent Tasks' },
    { key: 'scores', label: 'Scores' },
    { key: 'findings', label: 'Findings' },
    { key: 'users', label: 'Users' },
  ];

  const rows = data as Record<string, unknown>[];
  const keys = rows.length ? Object.keys(rows[0]).filter((k) => k !== 'password_hash') : [];

  return (
    <div className="min-h-screen">
      <Header />
      <main style={{ padding: 'var(--space-2xl)', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
          <h1 className="headline-2">Admin Dashboard</h1>
          <Link href="/" className="link-interactive">← Back</Link>
        </div>

        <nav style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap', marginBottom: 'var(--space-xl)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-md)' }}>
          {entities.map((e) => (
            <button
              key={e.key}
              onClick={() => setEntity(e.key)}
              className="btn"
              style={{
                background: entity === e.key ? 'var(--color-accent-hover)' : 'var(--color-bg-subtle)',
                color: entity === e.key ? 'white' : 'var(--color-text-primary)',
              }}
            >
              {e.label}
            </button>
          ))}
        </nav>

        {error && (
          <p className="label" style={{ color: 'var(--color-error)', marginBottom: 'var(--space-md)' }}>
            {error}
          </p>
        )}

        {loading ? (
          <p className="body-muted">Loading…</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  {keys.map((k) => (
                    <th key={k} style={{ textAlign: 'left', padding: 'var(--space-sm) var(--space-md)' }}>
                      {k.replace(/_/g, ' ')}
                    </th>
                  ))}
                  <th style={{ padding: 'var(--space-sm)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={String(row.id)} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                    {keys.map((k) => (
                      <td key={k} style={{ padding: 'var(--space-sm) var(--space-md)', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {typeof row[k] === 'object' ? JSON.stringify(row[k]).slice(0, 50) + '…' : String(row[k] ?? '')}
                      </td>
                    ))}
                    <td style={{ padding: 'var(--space-sm)' }}>
                      <button
                        onClick={() => handleDelete(String(row.id))}
                        style={{ color: 'var(--color-error)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8125rem' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {rows.length === 0 && <p className="body-muted" style={{ marginTop: 'var(--space-md)' }}>No records.</p>}
          </div>
        )}
      </main>
    </div>
  );
}
