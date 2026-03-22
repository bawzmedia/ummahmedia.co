'use client';

import ServiceFunnelPage from '@/components/ServiceFunnelPage';
import ModuleExplorer from '@/components/interactive/ModuleExplorer';

const MODULES = [
  {
    id: 'funnel',
    title: 'Smart Funnel',
    description: 'A data-driven system that attracts prospects, qualifies them, captures their info, and improves targeting over time.',
    deliverables: ['Funnel design & architecture', 'Landing pages', 'Lead qualification logic', 'Feedback loops', 'Targeting optimization'],
  },
  {
    id: 'agent',
    title: 'Smart Agent',
    description: 'An AI-powered agent that talks to your visitors, answers questions, qualifies leads, and routes them — 24/7.',
    deliverables: ['Agent design & personality', 'Voiceflow implementation', 'Website integration', 'Lead qualification flows', 'Knowledge base setup'],
  },
  {
    id: 'site',
    title: 'Smart Site',
    description: 'A team of AI agents researches your business, analyzes competition, studies your market, then produces a cinematic scroll-driven website unique to your story.',
    deliverables: ['AI business analysis', 'Competition research', 'Market landscape mapping', 'Cinematic website production', 'Scroll-driven storytelling'],
  },
  {
    id: 'media',
    title: 'Smart Project Media',
    description: 'A content engine that produces videos, visuals, and media assets designed to feed your other SmartSuite systems.',
    deliverables: ['Video assets', 'Campaign visuals', 'Project storytelling content', 'Sales-support media'],
  },
  {
    id: 'portal',
    title: 'Smart Portal',
    description: 'A client-facing dashboard where your customers can track progress, view metrics, access assets, and manage invoices.',
    deliverables: ['Portal dashboard', 'Onboarding flow', 'Progress tracking', 'Metrics & reporting', 'Asset library & payments'],
  },
];

export default function SmartSuitePage() {
  return (
    <ServiceFunnelPage
      pageId="smartsuite"
      interactiveContent={{
        '5.3': <ModuleExplorer modules={MODULES} isVisible />,
      }}
    />
  );
}
