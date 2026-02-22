'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Header() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const u = localStorage.getItem('user');
      setUser(u ? JSON.parse(u) : null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

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
          <Link href="/marketplace" className="body-muted link-interactive" style={{ textDecoration: 'none' }}>
            Marketplace
          </Link>
          <Link href="/pricing" className="body-muted link-interactive" style={{ textDecoration: 'none' }}>
            Pricing
          </Link>
          <Link href="/contact" className="body-muted link-interactive" style={{ textDecoration: 'none' }}>
            Contact
          </Link>
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link href="/admin" className="body-muted link-interactive" style={{ textDecoration: 'none', fontWeight: 600 }}>
                  Admin
                </Link>
              )}
              <span className="label-muted">{user.email}</span>
              <button
                onClick={handleLogout}
                type="button"
                style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '0.875rem' }}
                className="link-interactive"
              >
                Log out
              </button>
            </>
          ) : (
            <Link href="/login" className="body-muted link-interactive" style={{ textDecoration: 'none' }}>
              Log in
            </Link>
          )}
          <Link href="/analyze" className="btn" style={{ textDecoration: 'none' }}>
            Analyze
          </Link>
        </div>
      </nav>
    </header>
  );
}
