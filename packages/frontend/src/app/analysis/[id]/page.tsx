'use client';

import { use } from 'react';
import dynamic from 'next/dynamic';
import { PageLoadingSkeleton } from '@/components/PageLoadingSkeleton';

const AnalysisView = dynamic(() => import('@/components/AnalysisView').then((m) => m.AnalysisView), {
  loading: () => <PageLoadingSkeleton />,
  ssr: false,
});

export default function AnalysisPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return <AnalysisView id={id} />;
}
