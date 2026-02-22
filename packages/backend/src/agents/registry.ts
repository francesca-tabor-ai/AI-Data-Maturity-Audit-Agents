import type { AgentId } from './types.js';
import { BaseAgent } from './base-agent.js';
import { CompanyDiscoveryAgent } from './agents/company-discovery.js';
import { DataInfrastructureAgent } from './agents/data-infrastructure.js';
import { AICapabilityAgent } from './agents/ai-capability.js';
import { ProductIntelligenceAgent } from './agents/product-intelligence.js';
import { HiringIntelligenceAgent } from './agents/hiring-intelligence.js';
import { TechStackAgent } from './agents/tech-stack.js';
import { FinancialIntelligenceAgent } from './agents/financial-intelligence.js';
import { PatentResearchAgent } from './agents/patent-research.js';
import { StrategicSignalsAgent } from './agents/strategic-signals.js';
import { ValidationAgent } from './agents/validation.js';
import { SynthesisAgent } from './agents/synthesis.js';
import { ScoringAgent } from './agents/scoring.js';

export type AgentRegistry = Record<AgentId, BaseAgent>;

export function createAllAgents(): AgentRegistry {
  return {
    coordinator: null as unknown as BaseAgent,
    company_discovery: new CompanyDiscoveryAgent(),
    data_infrastructure: new DataInfrastructureAgent(),
    ai_capability: new AICapabilityAgent(),
    product_intelligence: new ProductIntelligenceAgent(),
    hiring_intelligence: new HiringIntelligenceAgent(),
    tech_stack: new TechStackAgent(),
    financial_intelligence: new FinancialIntelligenceAgent(),
    patent_research: new PatentResearchAgent(),
    strategic_signals: new StrategicSignalsAgent(),
    validation: new ValidationAgent(),
    synthesis: new SynthesisAgent(),
    scoring: new ScoringAgent(),
  };
}
