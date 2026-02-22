'use client';

import Link from 'next/link';
import { Header } from '@/components/Header';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section
        style={{
          padding: 'var(--space-3xl) var(--space-2xl)',
          background: 'var(--gradient-accent-subtle)',
          borderBottom: '1px solid var(--color-border-subtle)',
          textAlign: 'center',
        }}
      >
        <h1 className="headline-1" style={{ maxWidth: 720, margin: '0 auto var(--space-md)' }}>
          Know how AI-ready your portfolio really is
        </h1>
        <p className="body-muted" style={{ maxWidth: 560, margin: '0 auto var(--space-xl)', fontSize: '1.125rem' }}>
          MATURITYOS™ runs evidence-based AI & data maturity audits at scale—so investors and strategy teams make better decisions, faster.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/analyze" className="btn" style={{ textDecoration: 'none' }}>
            Start free analysis
          </Link>
          <Link
            href="/pricing"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '12px 24px',
              fontWeight: 600,
              color: 'var(--color-accent)',
              textDecoration: 'none',
              border: '2px solid var(--color-accent)',
              borderRadius: 'var(--radius-md)',
              background: 'transparent',
              transition: 'all 0.15s ease',
            }}
          >
            View pricing
          </Link>
        </div>
      </section>

      {/* Who it's for */}
      <section style={{ padding: 'var(--space-3xl) var(--space-2xl)', maxWidth: 960, margin: '0 auto' }}>
        <h2 className="headline-2" style={{ marginBottom: 'var(--space-lg)', textAlign: 'center' }}>
          Built for investors and strategy leaders
        </h2>
        <p className="body-muted" style={{ textAlign: 'center', marginBottom: 'var(--space-xl)', maxWidth: 640 }}>
          VCs, PE firms, family offices, and corporate development teams who need objective, scalable intelligence on AI and data maturity—without surveys or guesswork.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-lg)',
          }}
        >
          {[
            { title: 'VC & PE', desc: 'Evaluate portfolio companies and due diligence targets' },
            { title: 'Family offices', desc: 'Monitor AI thesis across holdings' },
            { title: 'M&A teams', desc: 'Assess acquisition targets’ tech readiness' },
            { title: 'Innovation leads', desc: 'Benchmark and track maturity over time' },
          ].map((item) => (
            <div key={item.title} className="card" style={{ padding: 'var(--space-lg)' }}>
              <h3 className="headline-3" style={{ marginBottom: 'var(--space-sm)' }}>{item.title}</h3>
              <p className="body-muted" style={{ fontSize: '0.875rem', margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pain point */}
      <section
        style={{
          padding: 'var(--space-3xl) var(--space-2xl)',
          background: 'var(--color-bg-subtle)',
          borderTop: '1px solid var(--color-border-subtle)',
          borderBottom: '1px solid var(--color-border-subtle)',
        }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <h2 className="headline-2" style={{ marginBottom: 'var(--space-md)' }}>
            Manual audits don’t scale—and surveys lie
          </h2>
          <p className="body-muted" style={{ marginBottom: 'var(--space-xl)' }}>
            Self-reported maturity scores are unreliable. Deep-diving 50+ companies is costly. Data is fragmented and goes stale. Without a consistent framework, you can’t compare—or spot the risks and opportunities that matter.
          </p>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-md)',
              textAlign: 'left',
              maxWidth: 480,
              marginInline: 'auto',
            }}
          >
            {[
              'Subjectivity and bias from surveys and manual reviews',
              'Scale constraints—portfolio-wide views take weeks',
              'Stale, fragmented data across job posts, tech, patents',
              'Inconsistent criteria—no apples-to-apples comparison',
            ].map((item) => (
              <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-sm)' }}>
                <span style={{ color: 'var(--color-error)', fontWeight: 700 }}>×</span>
                <span className="body-muted">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Solution */}
      <section style={{ padding: 'var(--space-3xl) var(--space-2xl)', maxWidth: 960, margin: '0 auto' }}>
        <h2 className="headline-2" style={{ marginBottom: 'var(--space-md)', textAlign: 'center' }}>
          We solve it with automated multi-agent intelligence
        </h2>
        <p className="body-muted" style={{ textAlign: 'center', marginBottom: 'var(--space-xl)', maxWidth: 640 }}>
          MATURITYOS™ deploys 13 specialized agents to collect and analyze public signals—company profiles, data infrastructure, AI capabilities, hiring, tech stack, patents, and financials—then synthesizes them into a unified maturity score.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)', justifyContent: 'center', marginBottom: 'var(--space-xl)' }}>
          {['Evidence-based scoring', 'Standardized 1–6 scale', 'Classification badges', 'Financial upside estimates', 'Scalable & repeatable'].map((item) => (
            <span key={item} className="badge badge-info">
              {item}
            </span>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <Link href="/analyze" className="btn" style={{ textDecoration: 'none' }}>
            Run your first analysis
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: 'var(--space-3xl) var(--space-2xl)',
          background: 'var(--gradient-accent-subtle)',
          borderTop: '1px solid var(--color-border-subtle)',
          textAlign: 'center',
        }}
      >
        <h2 className="headline-2" style={{ marginBottom: 'var(--space-md)' }}>
          Ready to see the full picture?
        </h2>
        <p className="body-muted" style={{ marginBottom: 'var(--space-lg)', maxWidth: 480, marginInline: 'auto' }}>
          Cut due diligence time by 70–90%. Surface hidden risks and opportunities. Compare portfolios consistently.
        </p>
        <Link href="/pricing" className="btn" style={{ textDecoration: 'none' }}>
          View plans and pricing
        </Link>
      </section>
    </div>
  );
}
