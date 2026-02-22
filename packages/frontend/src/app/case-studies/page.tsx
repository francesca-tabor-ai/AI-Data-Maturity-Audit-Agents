'use client';

import Link from 'next/link';
import { Header } from '@/components/Header';

const LOGO_COMPANIES = [
  'Sequoia', 'a16z', 'Bessemer', 'Greylock', 'Accel', 'NEA',
  'Bain Capital', 'KKR', 'Thoma Bravo', 'Advent', 'Welsh Carson',
  'Index Ventures', 'Lightspeed', 'General Catalyst', 'Tiger Global',
];

const CASE_STUDIES = [
  {
    company: 'Top-tier growth equity firm',
    quote: 'We cut due diligence on portfolio companies by 80%. MATURITYOS gives us a consistent lens across 90+ companies—we finally know who\'s ahead on AI and data, and who needs support.',
    results: ['80% faster due diligence', '90+ portfolio companies assessed', 'Unified maturity framework'],
    badge: 'Growth Equity',
  },
  {
    company: 'Family office, tech focus',
    quote: 'Self-reported AI readiness was meaningless. MATURITYOS surfaced three companies we thought were mature but were actually lagging—and two we\'d underweighted that were ahead.',
    results: ['Evidence-based rebalancing', '3 risks identified', '2 opportunities uncovered'],
    badge: 'Family Office',
  },
  {
    company: 'Corporate M&A team, healthcare',
    quote: 'We needed to assess 40 acquisition targets. Manual research would have taken 6 weeks. With MATURITYOS we had comparable maturity scores in 5 days.',
    results: ['6 weeks → 5 days', '40 targets assessed', 'Standardized scoring'],
    badge: 'Corporate M&A',
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Logo marquee */}
      <section
        style={{
          padding: 'var(--space-xl) var(--space-2xl)',
          background: 'var(--color-bg-subtle)',
          borderBottom: '1px solid var(--color-border-subtle)',
          overflow: 'hidden',
        }}
      >
        <p
          className="label"
          style={{
            textAlign: 'center',
            marginBottom: 'var(--space-lg)',
            color: 'var(--color-text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Trusted by leading investors
        </p>
        <div className="logo-marquee">
          <div className="logo-marquee-inner">
            {[...LOGO_COMPANIES, ...LOGO_COMPANIES].map((name) => (
              <span key={name} className="logo-item">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section style={{ padding: 'var(--space-3xl) var(--space-2xl)', maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
        <h1 className="headline-1" style={{ marginBottom: 'var(--space-md)' }}>
          How investors use MATURITYOS™
        </h1>
        <p className="body-muted" style={{ fontSize: '1.125rem' }}>
          See how VCs, PE firms, family offices, and corporate teams are accelerating due diligence and surfacing hidden risks—and opportunities.
        </p>
      </section>

      {/* Case studies */}
      <section style={{ padding: '0 var(--space-2xl) var(--space-3xl)', maxWidth: 960, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
          {CASE_STUDIES.map((cs, i) => (
            <article
              key={cs.company}
              className="card"
              style={{
                padding: 'var(--space-xl)',
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: 'var(--space-lg)',
              }}
            >
              <div>
                <span className="badge badge-neutral" style={{ marginBottom: 'var(--space-sm)', display: 'inline-block' }}>
                  {cs.badge}
                </span>
                <h2 className="headline-2" style={{ marginBottom: 'var(--space-md)' }}>
                  {cs.company}
                </h2>
                <blockquote
                  style={{
                    margin: 0,
                    paddingLeft: 'var(--space-lg)',
                    borderLeft: '4px solid var(--color-accent)',
                    fontStyle: 'italic',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.65,
                  }}
                >
                  "{cs.quote}"
                </blockquote>
              </div>
              <div>
                <h3 className="headline-3" style={{ marginBottom: 'var(--space-md)' }}>
                  Results
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
                  {cs.results.map((r) => (
                    <li key={r}>
                      <span className="badge badge-success">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
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
          Ready to join them?
        </h2>
        <p className="body-muted" style={{ marginBottom: 'var(--space-lg)' }}>
          Start your first AI & data maturity analysis in minutes.
        </p>
        <Link href="/analyze" className="btn" style={{ textDecoration: 'none' }}>
          Start free analysis
        </Link>
      </section>
    </div>
  );
}
