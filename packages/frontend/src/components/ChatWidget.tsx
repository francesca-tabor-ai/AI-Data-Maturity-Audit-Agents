'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const PROMPT_PROBES = [
  'What is MATURITYOS™ and who is it for?',
  'How do I run a maturity analysis?',
  'What does the 1–6 maturity scale mean?',
  'How many agents does the platform use?',
  'What ROI can I expect from using this?',
];

// Knowledge base for platform Q&A
function formatMessageWithBold(text: string): React.ReactNode {
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} style={{ fontWeight: 600 }}>{part}</strong>
    ) : (
      part
    )
  );
}

function getAssistantResponse(query: string): string {
  const q = query.toLowerCase().trim();

  if (
    q.includes('what is') &&
    (q.includes('maturityos') || q.includes('maturity os') || q.includes('platform'))
  ) {
    return `MATURITYOS™ is an AI & Data Maturity Audit platform that runs evidence-based assessments at scale. It's built for investors and corporate strategy leaders—VCs, PE firms, family offices, and M&A teams—who need objective intelligence on how AI-ready companies really are, without relying on self-reported surveys or manual research. The system uses 13 specialized agents to collect and analyze public signals (company profiles, data infrastructure, AI capabilities, hiring patterns, tech stack, patents, financials) and synthesizes them into a unified maturity score on a 1–6 scale.`;
  }

  if (
    q.includes('how do i') &&
    (q.includes('run') || q.includes('start') || q.includes('analysis'))
  ) {
    return `To run a maturity analysis:\n\n1. Go to **Analyze** (or use "Start free analysis" from the homepage)\n2. Enter the company name and domain (e.g. acme.com)\n3. Click **Start analysis**\n4. You'll be redirected to the analysis page where you can watch the agent pipeline run and view maturity scores in real time.\n\nThe backend will process the request and our 13 agents will collect and analyze public signals about the company.`;
  }

  if (q.includes('1') && q.includes('6') && (q.includes('scale') || q.includes('maturity'))) {
    return `The maturity scale runs from 1 (lowest) to 6 (highest) across four dimensions:\n\n• **Data** — How mature is their data infrastructure?\n• **AI** — How advanced are their AI capabilities?\n• **Alignment** — How well-aligned are their strategic initiatives?\n• **Innovation** — How innovative is their approach?\n\nScores are evidence-based and derived from observable signals (job postings, tech stack, patents, etc.), not self-reported answers. Classification badges like "Intelligent Operator" or "Augmented Enterprise" help segment and prioritize companies.`;
  }

  if (q.includes('agent') && (q.includes('how many') || q.includes('13'))) {
    return `MATURITYOS™ uses **13 specialized agents** working in concert:\n\n1. Coordinator — Orchestration & workflow\n2. Company Discovery — Foundational profiling\n3. Data Infrastructure — Data maturity detection\n4. AI Capability — AI maturity detection\n5. Product Intelligence — AI-embedded product features\n6. Hiring Intelligence — Talent signal analysis\n7. Technology Stack — Tech stack detection\n8. Financial Intelligence — Financial opportunity estimation\n9. Patent & Research — Proprietary AI detection\n10. Strategic Signals — Strategic initiatives\n11. Validation — Cross-validation & confidence\n12. Synthesis — Unified model generation\n13. Scoring — Final maturity classification`;
  }

  if (
    q.includes('roi') ||
    q.includes('return') ||
    q.includes('benefit') ||
    q.includes('expect')
  ) {
    return `Expected outcomes from MATURITYOS™ include:\n\n• **Faster due diligence** — Cut manual research time by 70–90% per company\n• **Higher decision quality** — Evidence-based scores reduce bias and surface hidden risks and opportunities\n• **Portfolio transparency** — Comparative maturity views across your portfolio\n• **Value creation roadmap** — Identify where to invest in data and AI to unlock upside\n• **Consistent benchmarking** — Track maturity over time and across cohorts\n\nROI drivers: Reduced analyst hours, fewer missed opportunities, earlier risk detection, and data-driven allocation of capital.`;
  }

  if (
    q.includes('pricing') ||
    q.includes('cost') ||
    q.includes('plan')
  ) {
    return `For details on plans and pricing, head to the **Pricing** page. You can reach it from the main navigation or the "View pricing" button on the homepage.`;
  }

  if (
    q.includes('case stud') ||
    q.includes('example')
  ) {
    return `You can explore example analyses via the **Case Studies** section. Check the main navigation for the link.`;
  }

  if (q.includes('hello') || q.includes('hi') || q === 'hey') {
    return `Hi! I'm the MATURITYOS™ assistant. I can answer questions about the platform, guide you through running analyses, explain the maturity scale, and more. What would you like to know?`;
  }

  if (q.includes('help') || q.includes('guide')) {
    return `I'm here to help you navigate MATURITYOS™. You can ask me about:\n\n• What the platform does and who it's for\n• How to run a maturity analysis\n• The 1–6 maturity scale and dimensions\n• Our 13 specialized agents\n• Expected ROI and outcomes\n• Pricing and plans\n\nTry one of the prompt suggestions above, or type your own question!`;
  }

  // Default fallback
  return `I'd be happy to help! MATURITYOS™ is an AI & Data Maturity Audit platform for investors and strategy leaders. You can ask me about:\n\n• How to run an analysis — just go to **Analyze**, enter a company name and domain, and click Start analysis\n• The maturity scale — we use a 1–6 evidence-based scale across Data, AI, Alignment, and Innovation\n• Our 13 agents — they collect and analyze public signals to produce unified maturity scores\n• ROI — expect 70–90% reduction in manual research time and better decision quality\n\nWhat would you like to explore?`;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setInput('');
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate typing delay
    await new Promise((r) => setTimeout(r, 400));

    const response = getAssistantResponse(trimmed);
    const assistantMsg: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, assistantMsg]);
    setIsTyping(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleProbeClick = (probe: string) => {
    sendMessage(probe);
  };

  return (
    <>
      {/* Floating chat button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        style={{
          position: 'fixed',
          bottom: 'var(--space-lg)',
          right: 'var(--space-lg)',
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'var(--gradient-accent)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-lg)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          zIndex: 9998,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08)';
          e.currentTarget.style.boxShadow =
            '0 12px 24px -4px rgba(99, 102, 241, 0.25)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
        }}
      >
        {isOpen ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 'calc(var(--space-lg) + 64px)',
            right: 'var(--space-lg)',
            width: 'min(400px, calc(100vw - 48px))',
            maxHeight: 'min(560px, calc(100vh - 120px))',
            background: 'var(--color-bg-elevated)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 9999,
            animation: 'fade-in-up 0.25s ease-out',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: 'var(--space-md) var(--space-lg)',
              background: 'var(--gradient-accent-subtle)',
              borderBottom: '1px solid var(--color-border-subtle)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-sm)',
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'var(--gradient-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>
                MATURITYOS™ Assistant
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-text-muted)',
                }}
              >
                Ask me anything about the platform
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: 'var(--space-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-md)',
            }}
          >
            {messages.length === 0 ? (
              <>
                <div
                  style={{
                    padding: 'var(--space-md)',
                    background: 'var(--color-bg-subtle)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.9375rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  Hi! I can answer questions about MATURITYOS™, guide you through
                  analyses, and explain how the platform works. Try one of the
                  suggestions below, or ask your own question.
                </div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--color-text-muted)', marginBottom: 'var(--space-xs)' }}>
                  Suggested questions
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-sm)',
                  }}
                >
                  {PROMPT_PROBES.map((probe) => (
                    <button
                      key={probe}
                      type="button"
                      onClick={() => handleProbeClick(probe)}
                      style={{
                        padding: 'var(--space-sm) var(--space-md)',
                        fontSize: '0.875rem',
                        textAlign: 'left',
                        background: 'var(--color-bg-subtle)',
                        border: '1px solid var(--color-border-subtle)',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        color: 'var(--color-text-primary)',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--gradient-accent-subtle)';
                        e.currentTarget.style.borderColor = 'var(--color-accent)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'var(--color-bg-subtle)';
                        e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
                      }}
                    >
                      {probe}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '90%',
                  }}
                >
                  <div
                    style={{
                      padding: 'var(--space-sm) var(--space-md)',
                      background:
                        msg.role === 'user'
                          ? 'var(--color-accent)'
                          : 'var(--color-bg-subtle)',
                      color: msg.role === 'user' ? 'white' : 'var(--color-text-primary)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.9375rem',
                      lineHeight: 1.6,
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {msg.role === 'assistant'
                      ? formatMessageWithBold(msg.content)
                      : msg.content}
                  </div>
                </div>
              ))
            )}
            {isTyping && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  padding: 'var(--space-sm) var(--space-md)',
                  background: 'var(--color-bg-subtle)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  gap: 4,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--color-text-muted)',
                    animation: 'chat-typing-dot 0.6s ease-in-out infinite',
                  }}
                />
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--color-text-muted)',
                    animation: 'chat-typing-dot 0.6s ease-in-out 0.2s infinite',
                  }}
                />
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--color-text-muted)',
                    animation: 'chat-typing-dot 0.6s ease-in-out 0.4s infinite',
                  }}
                />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            style={{
              padding: 'var(--space-md)',
              borderTop: '1px solid var(--color-border-subtle)',
            }}
          >
            <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about the platform..."
                className="input"
                style={{ flex: 1, margin: 0 }}
                disabled={isTyping}
              />
              <button
                type="submit"
                className="btn"
                disabled={isTyping}
                style={{ padding: '12px 20px' }}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}

    </>
  );
}
