'use client';

import ServiceFunnelPage from '@/components/ServiceFunnelPage';
import ScrollableCards from '@/components/interactive/ScrollableCards';

const COMPONENTS = [
  { title: 'Marketing Strategy', description: 'The blueprint. Market position, target audience, competitive advantage, growth plan.' },
  { title: 'Visual Identity & Aesthetics', description: 'Logo, color palette, typography, imagery style, visual direction.' },
  { title: 'Content SOPs', description: 'Standard operating procedures for content across every platform.' },
  { title: 'Color Grading & Visual Standards', description: 'Locked-in presets, photo editing standards, visual guidelines.' },
  { title: 'Platform Strategy', description: 'Platform-specific strategies for Instagram, TikTok, YouTube, LinkedIn, X.' },
  { title: 'Brand Collateral & Assets', description: 'Business cards, presentations, templates, email signatures.' },
  { title: 'Messaging & Copywriting', description: 'Brand voice, taglines, bios, about pages, key messages.' },
  { title: 'Gap Analysis & Audit', description: 'Full brand audit — strategy, visuals, content, systems.' },
];

export default function BrandDevelopmentPage() {
  return (
    <ServiceFunnelPage
      pageId="brand-development"
      interactiveContent={{
        '1.4': <ScrollableCards items={COMPONENTS} isVisible />,
      }}
    />
  );
}
