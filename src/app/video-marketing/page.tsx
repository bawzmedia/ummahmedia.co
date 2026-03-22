'use client';

import ServiceFunnelPage from '@/components/ServiceFunnelPage';
import AccordionDiagram from '@/components/interactive/AccordionDiagram';
import ScrollableCards from '@/components/interactive/ScrollableCards';

const FUNNEL_NODES = [
  { id: 'tofu', title: 'Top of Funnel — Discovery', description: 'Get seen. Stop the scroll. Formats: Instagram Reels, TikTok Videos, YouTube Shorts, Social Media Clips', color: '#22c55e' },
  { id: 'mofu', title: 'Middle of Funnel — Consideration', description: 'Build trust. Educate. Show expertise. Formats: Explainer Videos, Behind-the-Scenes, Educational Content, Podcast Clips', color: '#eab308' },
  { id: 'bofu', title: 'Bottom of Funnel — Decision', description: 'Convert. Remove doubt. Formats: Client Testimonials, Case Study Films, Product Demos, Personalized Messages', color: '#ef4444' },
];

const ARSENAL_ITEMS = [
  { title: 'Brand Films', description: 'Cinematic brand stories that showcase your mission and values.' },
  { title: 'Short-Form Content', description: "Scroll-stopping videos optimized for each platform's algorithm." },
  { title: 'Event Coverage', description: 'Multi-camera event production for conferences, fundraisers, and community events.' },
  { title: 'Documentary Style', description: 'Long-form storytelling that builds deep trust.' },
  { title: 'Product Videos', description: 'Clean, compelling product showcases designed to remove doubt.' },
  { title: 'Video Strategy', description: 'Content calendars, platform selection, distribution strategy, and analytics.' },
];

export default function VideoMarketingPage() {
  return (
    <ServiceFunnelPage
      pageId="video-marketing"
      interactiveContent={{
        '2.3': <AccordionDiagram nodes={FUNNEL_NODES} isVisible />,
        '2.5': <ScrollableCards items={ARSENAL_ITEMS} isVisible />,
      }}
    />
  );
}
