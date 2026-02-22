'use client';

import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from 'recharts';

const DIM_LABELS: Record<string, string> = {
  data: 'Data',
  ai: 'AI',
  alignment: 'Alignment',
  innovation: 'Innovation',
};

interface MaturityChartProps {
  scores: Record<string, number>;
  maxScore?: number;
}

export function MaturityChart({ scores, maxScore = 6 }: MaturityChartProps) {
  const dims = Object.keys(DIM_LABELS);
  const chartData = dims.map((key) => ({
    subject: DIM_LABELS[key] ?? key,
    score: scores[key] ?? 0,
    fullMark: maxScore,
  }));

  return (
    <div style={{ width: '100%', height: 280 }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
          <PolarGrid
            stroke="var(--color-border)"
            strokeOpacity={0.5}
          />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, maxScore]}
            tick={false}
            axisLine={false}
          />
          <Radar
            name="Maturity"
            dataKey="score"
            stroke="var(--color-accent)"
            strokeWidth={2}
            fill="var(--color-accent)"
            fillOpacity={0.25}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              fontSize: 14,
            }}
            formatter={(value: number) => [`${value}/${maxScore}`, 'Score']}
            labelFormatter={(label) => label}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
