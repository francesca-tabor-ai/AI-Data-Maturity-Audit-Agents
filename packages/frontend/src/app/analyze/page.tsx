'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export default function AnalyzePage() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState('');
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/api/analyses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName: companyName || 'Unknown', domain: domain || '' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to start analysis');
      router.push(`/analysis/${data.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main style={{ padding: 'var(--space-2xl)', maxWidth: 560, margin: '0 auto' }}>
        <section className="container-narrow">
          <h1 className="headline-2" style={{ marginBottom: 'var(--space-xs)' }}>
            Run a maturity analysis
          </h1>
          <p className="body-muted" style={{ marginBottom: 'var(--space-lg)' }}>
            Enter a company name and domain to start an AI & data maturity audit.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <input
              type="text"
              placeholder="Company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="input"
            />
            <input
              type="text"
              placeholder="Domain (e.g. acme.com)"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="input"
            />
            <button
              onClick={startAnalysis}
              disabled={loading}
              className="btn"
              style={{ alignSelf: 'flex-start' }}
            >
              {loading ? 'Starting…' : 'Start analysis'}
            </button>
          </div>
          {error && (
            <p className="label" style={{ color: 'var(--color-error)', marginTop: 'var(--space-md)' }}>
              {error}
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
