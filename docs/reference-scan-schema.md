# Reference: Scan/Analysis Schema

Field alignment between MATURITYOS backend and reference scan data models.

## Core Fields

| Field | Type | Description |
|-------|------|-------------|
| companyName | string | Company name |
| websiteUrl | string | Company website |
| status | string | pending, processing, completed, failed |

## Maturity & Classification

| Field | Type | Description |
|-------|------|-------------|
| dataMaturityStage | integer (1–6) | Data maturity score |
| aiMaturityStage | integer (1–6) | AI maturity score |
| classification | string | e.g. "Intelligent Operator", "Augmented Enterprise" |
| riskLevel | string | Low, Moderate, High |
| revenueUpsidePotential | string | e.g. "15–35%" |
| recommendedInvestmentPriority | string | Investment focus area |

## Agent Signals (JSON)

| Field | Description |
|-------|-------------|
| dataInfrastructureSignals | Data maturity detection outputs |
| aiCapabilitySignals | AI capability detection outputs |
| productIntelligence | AI-embedded product features |
| hiringSignals | Talent signal analysis |
| techStack | Tech stack detection |
| financialSignals | Financial opportunity signals |
| strategicSignals | Strategic initiatives |
