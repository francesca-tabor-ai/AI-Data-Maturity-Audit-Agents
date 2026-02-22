'use client';

import Link from 'next/link';

export function Header() {
  return (
    <header
      className="header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--color-border-subtle)',
      }}
    >
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-md) var(--space-2xl)', maxWidth: 1200, margin: '0 auto' }}>
        <Link href="/" className="link-interactive" style={{ textDecoration: 'none', fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-text-primary)' }}>
          MATURITYOS™
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xl)' }}>
          <Link href="/case-studies" className="body-muted link-interactive" style={{ textDecoration: 'none' }}>
            Case Studies
          </Link>
          <Link href="/pricing" className="body-muted link-interactive" style={{ textDecoration: 'none' }}>
            Pricing
          </Link>
          <Link href="/analyze" className="btn" style={{ textDecoration: 'none' }}>
            Analyze
          </Link>
        </div>
      </nav>
    </header>
  );
}
