'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';

const APP_CATEGORIES = [
  { value: 'analytics', label: 'Analytics & reporting' },
  { value: 'integration', label: 'CRM / data integration' },
  { value: 'productivity', label: 'Productivity & notifications' },
  { value: 'workflow', label: 'Workflow automation' },
  { value: 'enterprise', label: 'Enterprise custom' },
  { value: 'other', label: 'Other' },
];

const INTEGRATION_TYPES = [
  { value: 'api', label: 'REST API integration' },
  { value: 'webhook', label: 'Webhooks (outbound)' },
  { value: 'oauth', label: 'OAuth app (user installs)' },
  { value: 'embedded', label: 'Embedded in MATURITYOS UI' },
  { value: 'data_export', label: 'Data export / sync' },
];

const STAGES = [
  { id: 1, title: 'About you', short: 'Your info' },
  { id: 2, title: 'Your app', short: 'App details' },
  { id: 3, title: 'Technical', short: 'Technical' },
  { id: 4, title: 'Review', short: 'Review' },
];

const CONTACT_EMAIL = 'info@francescatabor.com';

function buildApplicationEmail(data: Record<string, string | string[]>) {
  const lines = Object.entries(data)
    .filter(([, v]) => v !== '' && (Array.isArray(v) ? v.length : true))
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`);
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('[MATURITYOS Build an App] New application')}&body=${encodeURIComponent(
    '--- MATURITYOS App Application ---\n\n' + lines.join('\n'),
  )}`;
}

export default function BuildAppPage() {
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [appName, setAppName] = useState('');
  const [appDescription, setAppDescription] = useState('');
  const [useCase, setUseCase] = useState('');
  const [category, setCategory] = useState('');
  const [integrationTypes, setIntegrationTypes] = useState<string[]>([]);
  const [apiUsage, setApiUsage] = useState('');
  const [timeline, setTimeline] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const toggleIntegration = (v: string) => {
    setIntegrationTypes((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));
  };

  const step1Valid = companyName && contactName && contactEmail;
  const step2Valid = appName && appDescription && useCase && category;
  const step3Valid = integrationTypes.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      'Company name': companyName,
      'Company website': companyWebsite,
      'Contact name': contactName,
      'Contact email': contactEmail,
      'Contact phone': contactPhone,
      'App name': appName,
      'App description': appDescription,
      'Use case': useCase,
      'Category': APP_CATEGORIES.find((c) => c.value === category)?.label ?? category,
      'Integration types': integrationTypes.map((v) => INTEGRATION_TYPES.find((i) => i.value === v)?.label ?? v).join(', '),
      'Expected API usage': apiUsage,
      'Launch timeline': timeline,
      'Additional notes': additionalNotes,
    };
    window.location.href = buildApplicationEmail(data);
  };

  return (
    <div className="min-h-screen" style={{ display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1, padding: 'var(--space-3xl) var(--space-2xl)' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ marginBottom: 'var(--space-2xl)' }}>
            <Link href="/marketplace" className="body-muted link-interactive" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: 'var(--space-md)' }}>
              ← Back to Marketplace
            </Link>
            <h1 className="headline-1" style={{ marginBottom: 'var(--space-sm)' }}>
              Build an App
            </h1>
            <p className="body-muted" style={{ fontSize: '1.0625rem' }}>
              Apply to integrate with MATURITYOS and list your app in the marketplace. Inspired by Stripe and Shopify partner programs.
            </p>
          </div>

          {/* Progress steps */}
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-sm)',
              marginBottom: 'var(--space-2xl)',
            }}
          >
            {STAGES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStep(s.id)}
                style={{
                  flex: 1,
                  padding: 'var(--space-sm) var(--space-md)',
                  border: step === s.id ? '2px solid var(--color-accent)' : '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  background: step === s.id ? 'var(--color-info-bg)' : 'var(--color-bg)',
                  color: step === s.id ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                  fontWeight: step === s.id ? 600 : 400,
                  fontSize: '0.8125rem',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {s.short}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="card" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
                <h2 className="headline-3" style={{ marginBottom: 'var(--space-lg)' }}>
                  About you
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                  <div>
                    <label htmlFor="companyName" className="label" style={{ display: 'block', marginBottom: 'var(--space-xs)' }}>
                      Company / organization name *
                    </label>
                    <input
                      id="companyName"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="input"
                      placeholder="Acme Inc."
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="companyWebsite" className="label" style={{ display: 'block', marginBottom: 'var(--space-xs)' }}>
                      Company website
                    </label>
                    <input
                      id="companyWebsite"
                      type="url"
                      value={companyWebsite}
                      onChange={(e) => setCompanyWebsite(e.target.value)}
                      className="input"
                      placeholder="https://acme.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="contactName" className="label" style={{ display: 'block', marginBottom: 'var(--space-xs)' }}>
                      Your name *
                    </label>
                    <input
                      id="contactName"
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="input"
                      placeholder="Jane Smith"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="contactEmail" className="label" style={{ display: 'block', marginBottom: 'var(--space-xs)' }}>
                      Email *
                    </label>
                    <input
                      id="contactEmail"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="input"
                      placeholder="jane@acme.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="contactPhone" className="label" style={{ display: 'block', marginBottom: 'var(--space-xs)' }}>
                      Phone (for critical issues)
                    </label>
                    <input
                      id="contactPhone"
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="input"
                      placeholder="+1 555 123 4567"
                    />
                  </div>
                </div>
                <button type="button" onClick={() => setStep(2)} className="btn" style={{ marginTop: 'var(--space-lg)' }} disabled={!step1Valid}>
                  Continue
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="card" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
                <h2 className="headline-3" style={{ marginBottom: 'var(--space-lg)' }}>
                  Your app
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                  <div>
                    <label htmlFor="appName" className="label" style={{ display: 'block', marginBottom: 'var(--space-xs)' }}>
                      App name *
                    </label>
                    <input
                      id="appName"
                      type="text"
                      value={appName}
                      onChange={(e) => setAppName(e.target.value)}
                      className="input"
                      placeholder="Portfolio Dashboard"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="appDescription" className="label" style={{ display: 'block', marginBottom: 'var(--space-xs)' }}>
                      Short description *
                    </label>
                    <input
                      id="appDescription"
                      type="text"
                      value={appDescription}
                      onChange={(e) => setAppDescription(e.target.value)}
                      className="input"
                      placeholder="Aggregate maturity scores across your portfolio"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="useCase" className="label" style={{ display: 'block', marginBottom: 'var(--space-xs)' }}>
                      Use case / what problem does it solve? *
                    </label>
                    <textarea
                      id="useCase"
                      value={useCase}
                      onChange={(e) => setUseCase(e.target.value)}
                      className="input"
                      placeholder="Describe who will use this app and what workflows it enables..."
                      rows={4}
                      required
                      style={{ resize: 'vertical', minHeight: 100 }}
                    />
                  </div>
                  <div>
                    <label htmlFor="category" className="label" style={{ display: 'block', marginBottom: 'var(--space-xs)' }}>
                      Category *
                    </label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="input"
                      required
                    >
                      <option value="">Select a category</option>
                      {APP_CATEGORIES.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-lg)' }}>
                  <button type="button" onClick={() => setStep(1)} style={{ padding: '12px 24px', background: 'transparent', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontFamily: 'inherit' }}>
                    Back
                  </button>
                  <button type="button" onClick={() => setStep(3)} className="btn" disabled={!step2Valid}>
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="card" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
                <h2 className="headline-3" style={{ marginBottom: 'var(--space-lg)' }}>
                  Technical details
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                  <div>
                    <label className="label" style={{ display: 'block', marginBottom: 'var(--space-sm)' }}>
                      Integration type(s) *
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                      {INTEGRATION_TYPES.map((t) => (
                        <label key={t.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={integrationTypes.includes(t.value)}
                            onChange={() => toggleIntegration(t.value)}
                          />
                          <span className="body-muted">{t.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="apiUsage" className="label" style={{ display: 'block', marginBottom: 'var(--space-xs)' }}>
                      Expected API usage (requests/day estimate)
                    </label>
                    <input
                      id="apiUsage"
                      type="text"
                      value={apiUsage}
                      onChange={(e) => setApiUsage(e.target.value)}
                      className="input"
                      placeholder="e.g. 100–500"
                    />
                  </div>
                  <div>
                    <label htmlFor="timeline" className="label" style={{ display: 'block', marginBottom: 'var(--space-xs)' }}>
                      Launch timeline
                    </label>
                    <input
                      id="timeline"
                      type="text"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="input"
                      placeholder="e.g. Within 4 weeks"
                    />
                  </div>
                  <div>
                    <label htmlFor="additionalNotes" className="label" style={{ display: 'block', marginBottom: 'var(--space-xs)' }}>
                      Additional notes
                    </label>
                    <textarea
                      id="additionalNotes"
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      className="input"
                      placeholder="Screenshots, demo links, or anything else we should know..."
                      rows={3}
                      style={{ resize: 'vertical', minHeight: 80 }}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-lg)' }}>
                  <button type="button" onClick={() => setStep(2)} style={{ padding: '12px 24px', background: 'transparent', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontFamily: 'inherit' }}>
                    Back
                  </button>
                  <button type="button" onClick={() => setStep(4)} className="btn" disabled={!step3Valid}>
                    Review
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="card" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
                <h2 className="headline-3" style={{ marginBottom: 'var(--space-lg)' }}>
                  Review & submit
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
                  <div>
                    <span className="label-muted">Company</span>
                    <p className="body" style={{ margin: 'var(--space-xs) 0 0' }}>{companyName}</p>
                    {companyWebsite && <p className="body-muted" style={{ margin: 0, fontSize: '0.875rem' }}>{companyWebsite}</p>}
                  </div>
                  <div>
                    <span className="label-muted">Contact</span>
                    <p className="body" style={{ margin: 'var(--space-xs) 0 0' }}>{contactName} &lt;{contactEmail}&gt;</p>
                    {contactPhone && <p className="body-muted" style={{ margin: 0, fontSize: '0.875rem' }}>{contactPhone}</p>}
                  </div>
                  <div>
                    <span className="label-muted">App</span>
                    <p className="body" style={{ margin: 'var(--space-xs) 0 0' }}>{appName}</p>
                    <p className="body-muted" style={{ margin: 0, fontSize: '0.875rem' }}>{appDescription}</p>
                  </div>
                  <div>
                    <span className="label-muted">Category</span>
                    <p className="body" style={{ margin: 'var(--space-xs) 0 0' }}>{APP_CATEGORIES.find((c) => c.value === category)?.label ?? category}</p>
                  </div>
                  <div>
                    <span className="label-muted">Integration types</span>
                    <p className="body" style={{ margin: 'var(--space-xs) 0 0' }}>
                      {integrationTypes.map((v) => INTEGRATION_TYPES.find((i) => i.value === v)?.label).join(', ')}
                    </p>
                  </div>
                </div>
                <p className="body-muted" style={{ marginBottom: 'var(--space-lg)', fontSize: '0.875rem' }}>
                  Submitting will open your mail client with a pre-filled message to our partner team. We typically respond within 5 business days.
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                  <button type="button" onClick={() => setStep(3)} style={{ padding: '12px 24px', background: 'transparent', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontFamily: 'inherit' }}>
                    Back
                  </button>
                  <button type="submit" className="btn">
                    Submit application
                  </button>
                </div>
              </div>
            )}
          </form>

          <div
            style={{
              padding: 'var(--space-lg)',
              background: 'var(--color-bg-subtle)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border-subtle)',
            }}
          >
            <h4 className="headline-3" style={{ marginBottom: 'var(--space-sm)' }}>
              What happens next?
            </h4>
            <ol style={{ margin: 0, paddingLeft: 'var(--space-lg)', color: 'var(--color-text-secondary)', fontSize: '0.9375rem', lineHeight: 1.8 }}>
              <li>We review your application within 5 business days</li>
              <li>If approved, you&apos;ll receive API credentials and docs</li>
              <li>Build and test—we&apos;re here to help</li>
              <li>Submit for marketplace review when ready</li>
              <li>Launch and reach MATURITYOS users</li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}
