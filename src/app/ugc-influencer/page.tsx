'use client';

import ServiceFunnelPage from '@/components/ServiceFunnelPage';
import ScrollableCards from '@/components/interactive/ScrollableCards';

const FORMAT_ITEMS = [
  { title: 'Problem → Solution', description: 'Start with a pain point, reveal the solution.' },
  { title: 'Testimonial', description: 'Real customers sharing genuine experiences.' },
  { title: 'Unboxing / First Look', description: 'The excitement of receiving and trying something for the first time.' },
  { title: 'How-To / Tutorial', description: 'Real users demonstrating your product in their daily life.' },
  { title: 'Day-in-the-Life', description: 'Lifestyle content where your brand appears naturally.' },
];

const SERVICE_ITEMS = [
  { title: 'Curated Creator Roster', description: 'A vetted network of Muslim influencers across Edmonton and Canada.' },
  { title: 'Brand-Creator Matching', description: 'We match based on audience overlap, values alignment, content style.' },
  { title: 'Campaign Management', description: 'End-to-end campaign management from briefs to reporting.' },
  { title: 'Creator Development', description: 'We help Muslim creators grow their brands and portfolios.' },
  { title: 'Multi-Platform Campaigns', description: 'Instagram, TikTok, YouTube, X, LinkedIn campaigns.' },
  { title: 'Performance & ROI', description: 'Every campaign measured against real business outcomes.' },
];

export default function UgcInfluencerPage() {
  return (
    <ServiceFunnelPage
      pageId="ugc-influencer"
      interactiveContent={{
        '4.4': <ScrollableCards items={FORMAT_ITEMS} isVisible />,
        '4.5': <ScrollableCards items={SERVICE_ITEMS} isVisible />,
      }}
    />
  );
}
