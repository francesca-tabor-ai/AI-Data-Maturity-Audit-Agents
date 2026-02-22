'use client';

import Link from 'next/link';
import { Header } from '@/components/Header';

const PLANS = [
  {
    id: 'individual',
    name: 'Individual',
    price: 49,
    period: 'month',
    description: 'For analysts and consultants running assessments on a small scale.',
    features: [
      'Up to 20 analyses per month',
      'Data, AI, Alignment & Innovation scores',
      'Classification badges & confidence levels',
      'Export to JSON',
      'Email support',
    ],
    cta: 'Start free trial',
    href: '/analyze',
    highlighted: false,
  },
  {
    id: 'team',
    name: 'Team',
    price: 199,
    period: 'month',
    description: 'For investment teams and corporate strategy groups.',
    features: [
      'Up to 100 analyses per month',
      'Everything in Individual',
      'Portfolio comparison views',
      'Shared workspaces & collaboration',
      'Historical tracking & trends',
      'PDF report generation',
      'Priority support',
    ],
    cta: 'Start free trial',
    href: '/analyze',
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: null,
    period: 'custom',
    priceLabel: 'Contact us',
    description: 'For firms running hundreds of analyses with custom needs.',
    features: [
      'Unlimited analyses',
      'Everything in Team',
      'Custom maturity frameworks',
      'API access & integrations',
      'Dedicated success manager',
      'SSO & advanced security',
      'SLA guarantees',
    ],
    cta: 'Contact sales',
    href: '#contact',
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <section style={{ padding: 'var(--space-3xl) var(--space-2xl)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <h1 className="headline-1" style={{ marginBottom: 'var(--space-md)' }}>
            Simple, scalable pricing
          </h1>
          <p className="body-muted" style={{ fontSize: '1.125rem' }}>
            Start with Individual, grow with Team, or go unlimited with Enterprise. No hidden fees.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-xl)',
            maxWidth: 1040,
            margin: 'var(--space-2xl) auto 0',
            alignItems: 'stretch',
          }}
        >
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={plan.highlighted ? 'card-elevated' : 'card'}
              style={{
                padding: 'var(--space-xl)',
                display: 'flex',
                flexDirection: 'column',
                border: plan.highlighted ? '2px solid var(--color-accent)' : undefined,
                position: 'relative',
              }}
            >
              {plan.highlighted && (
                <span
                  className="badge badge-info"
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                >
                  Most popular
                </span>
              )}
              <h2 className="headline-2" style={{ marginBottom: 'var(--space-xs)' }}>
                {plan.name}
              </h2>
              <p className="body-muted" style={{ fontSize: '0.875rem', marginBottom: 'var(--space-lg)' }}>
                {plan.description}
              </p>
              <div style={{ marginBottom: 'var(--space-lg)' }}>
                {plan.priceLabel ? (
                  <span className="headline-1" style={{ fontSize: '1.5rem' }}>{plan.priceLabel}</span>
                ) : (
                  <>
                    <span className="headline-1" style={{ fontSize: '2rem' }}>${plan.price}</span>
                    <span className="body-muted">/{plan.period}</span>
                  </>
                )}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 var(--space-xl)', flex: 1 }}>
                {plan.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 'var(--space-sm)',
                      marginBottom: 'var(--space-sm)',
                      fontSize: '0.9375rem',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    <span style={{ color: 'var(--color-success)', fontWeight: 700 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={plan.highlighted ? 'btn' : 'link-interactive'}
                style={{
                  display: 'inline-flex',
                  justifyContent: 'center',
                  padding: '12px 24px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  border: plan.highlighted ? 'none' : '2px solid var(--color-accent)',
                  borderRadius: 'var(--radius-md)',
                  color: plan.highlighted ? 'white' : 'var(--color-accent)',
                  background: plan.highlighted ? 'var(--color-accent)' : 'transparent',
                  marginTop: 'auto',
                }}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div
          style={{
            maxWidth: 640,
            margin: 'var(--space-2xl) auto 0',
            padding: 'var(--space-xl)',
            background: 'var(--color-bg-subtle)',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center',
          }}
        >
          <h3 className="headline-3" style={{ marginBottom: 'var(--space-sm)' }}>
            Scale with usage
          </h3>
          <p className="body-muted" style={{ marginBottom: 'var(--space-md)' }}>
            Need more analyses? Add analysis packs or upgrade your plan. Enterprise volumes get custom pricing with volume discounts.
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-md)',
              justifyContent: 'center',
            }}
          >
            <span className="badge badge-neutral">+50 analyses: $79/mo</span>
            <span className="badge badge-neutral">+200 analyses: $249/mo</span>
            <span className="badge badge-neutral">Enterprise: custom</span>
          </div>
        </div>
      </section>
    </div>
  );
}
