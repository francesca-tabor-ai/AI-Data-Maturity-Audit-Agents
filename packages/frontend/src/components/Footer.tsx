'use client';

import Link from 'next/link';

const FOOTER_LINKS = {
  product: [
    { href: '/analyze', label: 'Analyze' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/api-docs', label: 'API Docs' },
  ],
  developers: [
    { href: '/api-docs', label: 'API Reference' },
    { href: '/marketplace', label: 'App Marketplace' },
    { href: '/build-app', label: 'Build an App' },
  ],
  company: [
    { href: '/contact', label: 'Contact' },
  ],
} as const;

export function Footer() {
  return (
    <footer
      style={{
        marginTop: 'auto',
        padding: 'var(--space-2xl) var(--space-2xl) var(--space-xl)',
        background: 'var(--color-bg-subtle)',
        borderTop: '1px solid var(--color-border-subtle)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 'var(--space-2xl)',
          marginBottom: 'var(--space-2xl)',
        }}
      >
        <div>
          <Link
            href="/"
            style={{
              fontWeight: 700,
              fontSize: '1.125rem',
              color: 'var(--color-text-primary)',
              textDecoration: 'none',
              display: 'block',
              marginBottom: 'var(--space-md)',
            }}
          >
            MATURITYOS™
          </Link>
          <p className="label-muted" style={{ maxWidth: 220, margin: 0 }}>
            AI & data maturity audits at scale for investors and strategy teams.
          </p>
        </div>

        <div>
          <h4
            className="label"
            style={{
              marginBottom: 'var(--space-md)',
              color: 'var(--color-text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Product
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {FOOTER_LINKS.product.map((link) => (
              <li key={link.href} style={{ marginBottom: 'var(--space-sm)' }}>
                <Link href={link.href} className="body-muted link-interactive" style={{ textDecoration: 'none', fontSize: '0.9375rem' }}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4
            className="label"
            style={{
              marginBottom: 'var(--space-md)',
              color: 'var(--color-text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Developers
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {FOOTER_LINKS.developers.map((link) => (
              <li key={link.href} style={{ marginBottom: 'var(--space-sm)' }}>
                <Link href={link.href} className="body-muted link-interactive" style={{ textDecoration: 'none', fontSize: '0.9375rem' }}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4
            className="label"
            style={{
              marginBottom: 'var(--space-md)',
              color: 'var(--color-text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Company
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {FOOTER_LINKS.company.map((link) => (
              <li key={link.href} style={{ marginBottom: 'var(--space-sm)' }}>
                <Link href={link.href} className="body-muted link-interactive" style={{ textDecoration: 'none', fontSize: '0.9375rem' }}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          paddingTop: 'var(--space-lg)',
          borderTop: '1px solid var(--color-border-subtle)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 'var(--space-md)',
        }}
      >
        <span className="label-muted" style={{ fontSize: '0.8125rem' }}>
          © {new Date().getFullYear()} MATURITYOS. All rights reserved.
        </span>
        <Link href="/api-docs" className="label-muted link-interactive" style={{ fontSize: '0.8125rem', textDecoration: 'none' }}>
          API Docs
        </Link>
      </div>
    </footer>
  );
}
