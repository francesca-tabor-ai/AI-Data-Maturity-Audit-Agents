'use client';

import Link from 'next/link';
import { Header } from '@/components/Header';

const APPS = [
  {
    id: 'portfolio-dashboard',
    name: 'Portfolio Dashboard',
    tagline: 'Aggregate maturity scores across your portfolio',
    description: 'Connect MATURITYOS to your portfolio management tool. Automatically sync company analyses and visualize trends over time.',
    category: 'Analytics',
    featured: true,
  },
  {
    id: 'crm-sync',
    name: 'CRM Sync',
    tagline: 'Push maturity data into Salesforce or HubSpot',
    description: 'Keep your CRM enriched with AI maturity scores. Create custom fields and automations based on analysis outcomes.',
    category: 'Integration',
    featured: true,
  },
  {
    id: 'slack-alerts',
    name: 'Slack Alerts',
    tagline: 'Get notified when analyses complete',
    description: 'Receive real-time Slack notifications when analyses finish. Share findings directly to channels or DMs.',
    category: 'Productivity',
    featured: false,
  },
  {
    id: 'due-diligence-pack',
    name: 'Due Diligence Pack',
    tagline: 'Generate PDF reports for deal teams',
    description: 'Automatically create branded due diligence packs with scores, findings, and recommendations for each deal.',
    category: 'Reporting',
    featured: true,
  },
  {
    id: 'data-pipeline',
    name: 'Data Pipeline',
    tagline: 'Feed analyses into your data warehouse',
    description: 'Stream analysis results to Snowflake, BigQuery, or your preferred data warehouse for custom reporting and ML.',
    category: 'Analytics',
    featured: false,
  },
  {
    id: 'custom-scoring',
    name: 'Custom Scoring',
    tagline: 'Apply your own maturity framework',
    description: 'Map MATURITYOS dimensions to your internal scoring model. Override weights and thresholds for bespoke assessments.',
    category: 'Enterprise',
    featured: false,
  },
];

const CATEGORIES = ['All', 'Analytics', 'Integration', 'Productivity', 'Reporting', 'Enterprise'];

export default function MarketplacePage() {
  return (
    <div className="min-h-screen" style={{ display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1 }}>
        <section
          style={{
            padding: 'var(--space-3xl) var(--space-2xl)',
            background: 'var(--gradient-accent-subtle)',
            borderBottom: '1px solid var(--color-border-subtle)',
          }}
        >
          <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
            <h1 className="headline-1" style={{ marginBottom: 'var(--space-md)' }}>
              App Marketplace
            </h1>
            <p className="body-muted" style={{ maxWidth: 560, margin: '0 auto var(--space-xl)', fontSize: '1.125rem' }}>
              Extend MATURITYOS with integrations for portfolios, CRMs, data warehouses, and more. Build advanced workflows tailored to your team.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/api-docs" className="btn" style={{ textDecoration: 'none' }}>
                View API Docs
              </Link>
              <Link
                href="/build-app"
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
                Build an App
              </Link>
            </div>
          </div>
        </section>

        <section style={{ padding: 'var(--space-3xl) var(--space-2xl)' }}>
          <div style={{ maxWidth: 1040, margin: '0 auto' }}>
            <div
              style={{
                display: 'flex',
                gap: 'var(--space-sm)',
                flexWrap: 'wrap',
                marginBottom: 'var(--space-2xl)',
              }}
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={cat === 'All' ? 'badge badge-info' : 'badge badge-neutral'}
                  style={{
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: 'var(--space-xl)',
              }}
            >
              {APPS.map((app) => (
                <div
                  key={app.id}
                  className={app.featured ? 'card-elevated' : 'card'}
                  style={{
                    padding: 'var(--space-xl)',
                    display: 'flex',
                    flexDirection: 'column',
                    border: app.featured ? '2px solid var(--color-accent)' : undefined,
                    position: 'relative',
                  }}
                >
                  {app.featured && (
                    <span
                      className="badge badge-info"
                      style={{
                        position: 'absolute',
                        top: '-10px',
                        right: 'var(--space-md)',
                      }}
                    >
                      Featured
                    </span>
                  )}
                  <span
                    className="badge badge-neutral"
                    style={{ alignSelf: 'flex-start', marginBottom: 'var(--space-sm)' }}
                  >
                    {app.category}
                  </span>
                  <h3 className="headline-2" style={{ marginBottom: 'var(--space-xs)' }}>
                    {app.name}
                  </h3>
                  <p className="body-muted" style={{ fontSize: '0.9375rem', marginBottom: 'var(--space-md)', fontWeight: 500 }}>
                    {app.tagline}
                  </p>
                  <p className="body-muted" style={{ fontSize: '0.875rem', marginBottom: 'var(--space-lg)', flex: 1 }}>
                    {app.description}
                  </p>
                  <Link
                    href="/contact"
                    className="link-interactive"
                    style={{
                      fontSize: '0.9375rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    Request access →
                  </Link>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 'var(--space-3xl)',
                padding: 'var(--space-2xl)',
                background: 'var(--color-bg-subtle)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border-subtle)',
                textAlign: 'center',
              }}
            >
              <h3 className="headline-3" style={{ marginBottom: 'var(--space-sm)' }}>
                Don&apos;t see what you need?
              </h3>
              <p className="body-muted" style={{ marginBottom: 'var(--space-lg)', maxWidth: 480, marginInline: 'auto' }}>
                Build a custom integration or apply to list your app in the marketplace. We review applications within 5 business days.
              </p>
              <Link href="/build-app" className="btn" style={{ textDecoration: 'none' }}>
                Apply to Build an App
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
