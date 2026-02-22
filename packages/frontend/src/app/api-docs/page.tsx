'use client';

import Link from 'next/link';
import { Header } from '@/components/Header';

const ENTITIES = [
  {
    name: 'companies',
    description: 'Organizations analyzed for AI and data maturity.',
    fields: [
      { name: 'id', type: 'string', desc: 'Unique identifier' },
      { name: 'name', type: 'string', desc: 'Company name' },
      { name: 'domain', type: 'string', desc: 'Primary domain' },
      { name: 'website_url', type: 'string', desc: 'Full website URL' },
      { name: 'description', type: 'string', desc: 'Company description' },
      { name: 'profile_json', type: 'object', desc: 'Enriched profile data' },
      { name: 'created_at', type: 'string', desc: 'ISO 8601 timestamp' },
      { name: 'updated_at', type: 'string', desc: 'ISO 8601 timestamp' },
    ],
  },
  {
    name: 'analyses',
    description: 'Maturity audit runs for a company.',
    fields: [
      { name: 'id', type: 'string', desc: 'Unique identifier' },
      { name: 'company_id', type: 'string', desc: 'References companies.id' },
      { name: 'status', type: 'string', desc: 'queued | running | completed | failed' },
      { name: 'classification', type: 'string', desc: 'Company classification badge' },
      { name: 'risk_level', type: 'string', desc: 'Risk assessment' },
      { name: 'revenue_upside', type: 'number', desc: 'Estimated revenue upside' },
      { name: 'investment_priority', type: 'string', desc: 'Investment recommendation' },
      { name: 'created_at', type: 'string', desc: 'ISO 8601 timestamp' },
      { name: 'completed_at', type: 'string', desc: 'ISO 8601 timestamp' },
    ],
  },
  {
    name: 'agent_tasks',
    description: 'Individual agent work items within an analysis.',
    fields: [
      { name: 'id', type: 'string', desc: 'Unique identifier' },
      { name: 'analysis_id', type: 'string', desc: 'References analyses.id' },
      { name: 'agent_id', type: 'string', desc: 'Agent identifier' },
      { name: 'agent_name', type: 'string', desc: 'Human-readable agent name' },
      { name: 'status', type: 'string', desc: 'pending | running | completed | failed' },
      { name: 'input_data', type: 'object', desc: 'Input payload' },
      { name: 'output_data', type: 'object', desc: 'Output payload' },
      { name: 'confidence', type: 'number', desc: 'Confidence score 0–1' },
      { name: 'error_message', type: 'string', desc: 'Error details if failed' },
      { name: 'started_at', type: 'string', desc: 'ISO 8601 timestamp' },
      { name: 'completed_at', type: 'string', desc: 'ISO 8601 timestamp' },
      { name: 'created_at', type: 'string', desc: 'ISO 8601 timestamp' },
    ],
  },
  {
    name: 'scores',
    description: 'Dimension scores (1–6) per analysis.',
    fields: [
      { name: 'id', type: 'string', desc: 'Unique identifier' },
      { name: 'analysis_id', type: 'string', desc: 'References analyses.id' },
      { name: 'dimension', type: 'string', desc: 'data | ai | alignment | innovation' },
      { name: 'score', type: 'integer', desc: '1–6 maturity score' },
      { name: 'confidence', type: 'number', desc: 'Confidence 0–1' },
      { name: 'created_at', type: 'string', desc: 'ISO 8601 timestamp' },
    ],
  },
  {
    name: 'findings',
    description: 'Individual findings from agents.',
    fields: [
      { name: 'id', type: 'string', desc: 'Unique identifier' },
      { name: 'analysis_id', type: 'string', desc: 'References analyses.id' },
      { name: 'agent_id', type: 'string', desc: 'Agent that produced the finding' },
      { name: 'finding_type', type: 'string', desc: 'Type of finding' },
      { name: 'title', type: 'string', desc: 'Finding title' },
      { name: 'description', type: 'string', desc: 'Detailed description' },
      { name: 'evidence', type: 'string', desc: 'Supporting evidence' },
      { name: 'confidence', type: 'number', desc: 'Confidence 0–1' },
      { name: 'created_at', type: 'string', desc: 'ISO 8601 timestamp' },
    ],
  },
];

const ENDPOINTS = [
  { method: 'GET', path: '/health', desc: 'Health check', crud: '—' },
  { method: 'GET', path: '/api/companies', desc: 'List all companies', crud: 'Read' },
  { method: 'POST', path: '/api/companies', desc: 'Create a company', crud: 'Create' },
  { method: 'GET', path: '/api/companies/:id', desc: 'Get company by ID', crud: 'Read' },
  { method: 'POST', path: '/api/analyses', desc: 'Start an analysis', crud: 'Create' },
  { method: 'GET', path: '/api/analyses/:id', desc: 'Get analysis by ID (incl. scores)', crud: 'Read' },
  { method: 'GET', path: '/api/agents/status', desc: 'Get agent status', crud: 'Read' },
  { method: 'GET', path: '/api/agents/tasks?analysisId=...', desc: 'Get tasks for an analysis', crud: 'Read' },
  { method: 'WS', path: '/ws', desc: 'WebSocket for real-time updates', crud: '—' },
];

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen" style={{ display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1, padding: 'var(--space-3xl) var(--space-2xl)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h1 className="headline-1" style={{ marginBottom: 'var(--space-md)' }}>
            API Documentation
          </h1>
          <p className="body-muted" style={{ marginBottom: 'var(--space-2xl)', fontSize: '1.125rem' }}>
            Integrate with the MATURITYOS API to run audits, fetch results, and build advanced workflows. Base URL:{' '}
            <code style={{ background: 'var(--color-bg-subtle)', padding: '2px 8px', borderRadius: 'var(--radius-sm)', fontFamily: 'monospace', fontSize: '0.875rem' }}>
              {BASE_URL}
            </code>
          </p>

          <section style={{ marginBottom: 'var(--space-3xl)' }}>
            <h2 className="headline-2" style={{ marginBottom: 'var(--space-lg)' }}>
              API Endpoints
            </h2>
            <div
              style={{
                overflow: 'auto',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--color-bg-elevated)',
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem' }}>
                <thead>
                  <tr style={{ background: 'var(--color-bg-subtle)', borderBottom: '1px solid var(--color-border)' }}>
                    <th style={{ padding: 'var(--space-md) var(--space-lg)', textAlign: 'left', fontWeight: 600 }}>Method</th>
                    <th style={{ padding: 'var(--space-md) var(--space-lg)', textAlign: 'left', fontWeight: 600 }}>Path</th>
                    <th style={{ padding: 'var(--space-md) var(--space-lg)', textAlign: 'left', fontWeight: 600 }}>CRUD</th>
                    <th style={{ padding: 'var(--space-md) var(--space-lg)', textAlign: 'left', fontWeight: 600 }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {ENDPOINTS.map((ep) => (
                    <tr key={`${ep.method}-${ep.path}`} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                      <td style={{ padding: 'var(--space-md) var(--space-lg)' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '4px 8px',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            background:
                              ep.method === 'GET' ? 'var(--color-info-bg)' :
                              ep.method === 'POST' ? 'var(--color-success-bg)' :
                              ep.method === 'WS' ? '#f5f3ff' : 'var(--color-bg-subtle)',
                            color:
                              ep.method === 'GET' ? 'var(--color-info)' :
                              ep.method === 'POST' ? 'var(--color-success)' :
                              ep.method === 'WS' ? '#6d28d9' : 'var(--color-text-secondary)',
                          }}
                        >
                          {ep.method}
                        </span>
                      </td>
                      <td style={{ padding: 'var(--space-md) var(--space-lg)', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                        {ep.path}
                      </td>
                      <td style={{ padding: 'var(--space-md) var(--space-lg)', color: 'var(--color-text-secondary)' }}>
                        {ep.crud}
                      </td>
                      <td style={{ padding: 'var(--space-md) var(--space-lg)', color: 'var(--color-text-secondary)' }}>
                        {ep.desc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section style={{ marginBottom: 'var(--space-3xl)' }}>
            <h2 className="headline-2" style={{ marginBottom: 'var(--space-lg)' }}>
              Entities
            </h2>
            <p className="body-muted" style={{ marginBottom: 'var(--space-xl)' }}>
              Core data models used across the API responses.
            </p>

            {ENTITIES.map((entity) => (
              <div
                key={entity.name}
                className="card"
                style={{
                  marginBottom: 'var(--space-xl)',
                  padding: 'var(--space-xl)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <h3 className="headline-3" style={{ marginBottom: 'var(--space-sm)' }}>
                  <code style={{ background: 'var(--color-bg-subtle)', padding: '2px 8px', borderRadius: 'var(--radius-sm)', fontFamily: 'monospace' }}>
                    {entity.name}
                  </code>
                </h3>
                <p className="body-muted" style={{ marginBottom: 'var(--space-lg)', fontSize: '0.9375rem' }}>
                  {entity.description}
                </p>
                <div style={{ overflow: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <th style={{ padding: 'var(--space-sm) 0', textAlign: 'left', fontWeight: 600 }}>Field</th>
                        <th style={{ padding: 'var(--space-sm) var(--space-md)', textAlign: 'left', fontWeight: 600 }}>Type</th>
                        <th style={{ padding: 'var(--space-sm) 0', textAlign: 'left', fontWeight: 600 }}>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entity.fields.map((f) => (
                        <tr key={f.name} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                          <td style={{ padding: 'var(--space-sm) 0', fontFamily: 'monospace' }}>{f.name}</td>
                          <td style={{ padding: 'var(--space-sm) var(--space-md)', color: 'var(--color-text-muted)' }}>{f.type}</td>
                          <td style={{ padding: 'var(--space-sm) 0', color: 'var(--color-text-secondary)' }}>{f.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </section>

          <section style={{ marginBottom: 'var(--space-2xl)' }}>
            <h2 className="headline-2" style={{ marginBottom: 'var(--space-lg)' }}>
              Example Requests
            </h2>

            <div className="card" style={{ padding: 'var(--space-lg)', marginBottom: 'var(--space-lg)' }}>
              <h4 className="label" style={{ marginBottom: 'var(--space-sm)' }}>Create a company</h4>
              <pre style={{ margin: 0, fontSize: '0.8125rem', overflow: 'auto', color: 'var(--color-text-secondary)' }}>
{`POST ${BASE_URL}/api/companies
Content-Type: application/json

{
  "name": "Acme Corp",
  "domain": "acme.com"
}`}
              </pre>
            </div>

            <div className="card" style={{ padding: 'var(--space-lg)', marginBottom: 'var(--space-lg)' }}>
              <h4 className="label" style={{ marginBottom: 'var(--space-sm)' }}>Start an analysis</h4>
              <pre style={{ margin: 0, fontSize: '0.8125rem', overflow: 'auto', color: 'var(--color-text-secondary)' }}>
{`POST ${BASE_URL}/api/analyses
Content-Type: application/json

{
  "companyName": "Acme Corp",
  "domain": "acme.com"
}`}
              </pre>
            </div>

            <div className="card" style={{ padding: 'var(--space-lg)' }}>
              <h4 className="label" style={{ marginBottom: 'var(--space-sm)' }}>Get analysis by ID</h4>
              <pre style={{ margin: 0, fontSize: '0.8125rem', overflow: 'auto', color: 'var(--color-text-secondary)' }}>
{`GET ${BASE_URL}/api/analyses/:id`}
              </pre>
            </div>
          </section>

          <div
            style={{
              padding: 'var(--space-xl)',
              background: 'var(--gradient-accent-subtle)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border-subtle)',
            }}
          >
            <h3 className="headline-3" style={{ marginBottom: 'var(--space-sm)' }}>
              Build an integration
            </h3>
            <p className="body-muted" style={{ marginBottom: 'var(--space-md)' }}>
              Extend the platform with custom apps. Apply to list your app in the marketplace.
            </p>
            <Link href="/build-app" className="btn" style={{ textDecoration: 'none' }}>
              Apply to Build an App
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
