'use client';

import ServiceFunnelPage from '@/components/ServiceFunnelPage';
import ScrollableCards from '@/components/interactive/ScrollableCards';

const SERVICES = [
  { title: 'Revenue-Driven Strategy', description: 'Every social media plan starts with your business goals.' },
  { title: 'Partnership Development', description: 'Using social media as a networking and partnership tool.' },
  { title: 'Content That Converts', description: 'Posts designed with conversion in mind.' },
  { title: 'Community As Currency', description: 'Building communities that trust you enough to buy from you.' },
  { title: 'Platform-Specific Execution', description: 'Each platform has different rules and different audiences.' },
  { title: 'Dawah-Integrated Outreach', description: 'Integrating dawah principles into social strategy.' },
  { title: 'Paid Social Advertising', description: 'Strategic ad campaigns on Meta, TikTok, and LinkedIn.' },
  { title: 'Analytics & Reporting', description: 'Monthly reports showing revenue, partnerships, leads, cost per acquisition.' },
];

export default function SocialMediaPage() {
  return (
    <ServiceFunnelPage
      pageId="social-media"
      interactiveContent={{
        '3.4': <ScrollableCards items={SERVICES} isVisible />,
      }}
    />
  );
}
