'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
const WS_URL = (process.env.NEXT_PUBLIC_WS_URL ?? 'ws://localhost:3001').replace(/^http/, 'ws');

interface Task {
  id: string;
  agentId: string;
  agentName: string;
  status: string;
}

interface Analysis {
  id: string;
  companyId: string;
  status: string;
  classification?: string;
  riskLevel?: string;
  revenueUpside?: number;
  scores?: Record<string, number>;
  createdAt: string;
  completedAt?: string;
}

export function AnalysisView({ id }: { id: string }) {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [wsConnected, setWsConnected] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [aRes, tRes] = await Promise.all([
        fetch(`${API}/api/analyses/${id}`),
        fetch(`${API}/api/agents/tasks?analysisId=${id}`),
      ]);
      if (aRes.ok) setAnalysis(await aRes.json());
      if (tRes.ok) {
        const { tasks: t } = await tRes.json();
        setTasks(t ?? []);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, [id]);

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}/ws`);
    ws.onopen = () => setWsConnected(true);
    ws.onclose = () => setWsConnected(false);
    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        if (msg.payload?.taskId) {
          setTasks((prev) =>
            prev.map((t) =>
              t.id === msg.payload.taskId
                ? {
                    ...t,
                    status:
                      msg.type === 'task_complete'
                        ? 'completed'
                        : msg.type === 'task_failed'
                          ? 'failed'
                          : 'running',
                  }
                : t
            )
          );
        }
      } catch {}
    };
    return () => ws.close();
  }, [id]);

  if (!analysis)
    return (
      <div
        style={{
          padding: 'var(--space-2xl)',
          color: 'var(--color-text-secondary)',
          minHeight: '100vh',
        }}
      >
        <p className="body-muted">Loading…</p>
      </div>
    );

  const scores = analysis.scores ?? {};
  const dims = ['data', 'ai', 'alignment', 'innovation'];

  const getBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'badge badge-success';
      case 'running':
        return 'badge badge-info';
      case 'failed':
        return 'badge badge-error';
      default:
        return 'badge badge-neutral';
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <header
        className="animate-in"
        style={{
          padding: 'var(--space-2xl)',
          borderBottom: '1px solid var(--color-border-subtle)',
        }}
      >
        <h1
          className="headline-2 animate-in animate-in-delay-1"
          style={{ marginBottom: 'var(--space-sm)' }}
        >
          Analysis: {id.slice(0, 8)}…
        </h1>
        <div
          className="animate-in animate-in-delay-2"
          style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}
        >
          <span className={getBadgeClass(analysis.status)} style={{ textTransform: 'capitalize' }}>
            {analysis.status}
          </span>
          {wsConnected && (
            <span className="label-muted" style={{ color: 'var(--color-success)' }}>
              ● Live
            </span>
          )}
        </div>
      </header>

      <main style={{ padding: 'var(--space-2xl)', maxWidth: 720, margin: '0 auto' }}>
        {analysis.status === 'completed' && (
          <section
            className="animate-in animate-in-delay-3"
            style={{ marginBottom: 'var(--space-2xl)' }}
          >
            <h2 className="headline-3" style={{ marginBottom: 'var(--space-lg)' }}>
              Maturity scores
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: 'var(--space-md)',
              }}
            >
              {dims.map((d, i) => (
                <div
                  key={d}
                  className="card-elevated animate-in"
                  style={{
                    padding: 'var(--space-lg)',
                    minWidth: 0,
                    animationDelay: `${0.15 + i * 0.05}s`,
                  }}
                >
                  <div
                    className="label"
                    style={{
                      textTransform: 'capitalize',
                      marginBottom: 'var(--space-xs)',
                    }}
                  >
                    {d}
                  </div>
                  <div
                    className="data-value"
                    style={{
                      fontSize: '2rem',
                      color: 'var(--color-text-primary)',
                      marginBottom: 'var(--space-sm)',
                    }}
                  >
                    {scores[d] ?? '–'}
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: 6,
                      background: 'var(--color-border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${((scores[d] ?? 0) / 6) * 100}%`,
                        height: '100%',
                        background: 'var(--gradient-accent)',
                        borderRadius: 'var(--radius-sm)',
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            {(analysis.classification || analysis.revenueUpside != null) && (
              <div
                style={{
                  marginTop: 'var(--space-lg)',
                  padding: 'var(--space-md)',
                  background: 'var(--color-bg-subtle)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-sm)',
                }}
              >
                {analysis.classification && (
                  <div>
                    <span className="label">Classification </span>
                    <span className="body" style={{ fontWeight: 600 }}>
                      {analysis.classification}
                    </span>
                  </div>
                )}
                {analysis.revenueUpside != null && (
                  <div>
                    <span className="label">Revenue upside </span>
                    <span className="data-value">{analysis.revenueUpside}%</span>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        <section className="animate-in animate-in-delay-4">
          <h2 className="headline-3" style={{ marginBottom: 'var(--space-lg)' }}>
            Agent tasks
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            {tasks.map((t, i) => (
              <div
                key={t.id}
                className="card animate-in"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-md)',
                  padding: 'var(--space-md) var(--space-lg)',
                  animationDelay: `${0.3 + i * 0.05}s`,
                }}
              >
                <span className="body" style={{ fontWeight: 500, minWidth: 160 }}>
                  {t.agentName}
                </span>
                <span
                  className={getBadgeClass(t.status)}
                  style={{ textTransform: 'capitalize' }}
                >
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
