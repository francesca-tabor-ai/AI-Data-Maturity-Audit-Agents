'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';

const CONTACT_EMAIL = 'info@francescatabor.com';

const REQUEST_TYPES = [
  { value: 'support', label: 'Customer support' },
  { value: 'bug', label: 'Bug report' },
] as const;

function buildMailtoUrl(params: {
  requestType: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  const { requestType, name, email, subject, message } = params;
  const typeLabel = REQUEST_TYPES.find((t) => t.value === requestType)?.label ?? requestType;
  const body = [
    `Request type: ${typeLabel}`,
    `From: ${name} <${email}>`,
    '',
    '---',
    '',
    message,
  ].join('\n');
  const subjectLine = `[MATURITYOS ${typeLabel.toUpperCase()}] ${subject}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(body)}`;
}

export default function ContactPage() {
  const [requestType, setRequestType] = useState<string>('support');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildMailtoUrl({ requestType, name, email, subject, message });
    window.location.href = url;
  };

  return (
    <div className="min-h-screen">
      <Header />

      <section
        style={{
          padding: 'var(--space-3xl) var(--space-2xl)',
          maxWidth: 560,
          margin: '0 auto',
        }}
      >
        <h1 className="headline-2" style={{ marginBottom: 'var(--space-xs)' }}>
          Contact us
        </h1>
        <p className="body-muted" style={{ marginBottom: 'var(--space-xl)' }}>
          Submit a customer support request or report a bug. Your message will be sent to{' '}
          <strong>{CONTACT_EMAIL}</strong>.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <div>
            <label htmlFor="requestType" className="label" style={{ display: 'block', marginBottom: 'var(--space-xs)' }}>
              Request type
            </label>
            <select
              id="requestType"
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
              className="input"
            >
              {REQUEST_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="name" className="label" style={{ display: 'block', marginBottom: 'var(--space-xs)' }}>
              Name *
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="label" style={{ display: 'block', marginBottom: 'var(--space-xs)' }}>
              Email *
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </div>

          <div>
            <label htmlFor="subject" className="label" style={{ display: 'block', marginBottom: 'var(--space-xs)' }}>
              Subject *
            </label>
            <input
              id="subject"
              type="text"
              placeholder="Brief summary of your request"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="input"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="label" style={{ display: 'block', marginBottom: 'var(--space-xs)' }}>
              Message *
            </label>
            <textarea
              id="message"
              placeholder="Describe your question, issue, or feedback in detail..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="input"
              required
              rows={5}
              style={{
                resize: 'vertical',
                minHeight: 120,
              }}
            />
          </div>

          <button type="submit" className="btn" style={{ alignSelf: 'flex-start' }}>
            Send via email
          </button>
        </form>

        <p className="label-muted" style={{ marginTop: 'var(--space-lg)' }}>
          Clicking &quot;Send via email&quot; will open your default mail client with the message addressed to{' '}
          <strong>{CONTACT_EMAIL}</strong>. If you prefer, you can email us directly at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="link-interactive">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </section>
    </div>
  );
}
