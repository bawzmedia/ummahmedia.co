'use client';

import ServiceFunnelPage from '@/components/ServiceFunnelPage';
import AccordionDiagram from '@/components/interactive/AccordionDiagram';
import ScrollableCards from '@/components/interactive/ScrollableCards';

const LANDSCAPE_NODES = [
  { id: 'writing', title: 'Writing & Copywriting', description: 'Generate marketing copy, emails, social posts, blog articles, and proposals. Tools: ChatGPT, Claude, Jasper' },
  { id: 'image', title: 'Image & Design', description: 'Create graphics, product mockups, social media visuals, and brand assets. Tools: Midjourney, DALL\u00B7E, Canva AI' },
  { id: 'video', title: 'Video & Audio', description: 'Edit videos, generate voiceovers, create subtitles, produce video concepts. Tools: Runway, ElevenLabs, CapCut AI' },
  { id: 'automation', title: 'Automation', description: 'Connect apps and automate repetitive tasks. Tools: Make.com, Zapier, n8n' },
  { id: 'research', title: 'Research & Analysis', description: 'Analyze customer data, research competitors, summarize documents. Tools: ChatGPT, NotebookLM, Perplexity' },
  { id: 'service', title: 'Customer Service', description: 'Build AI chatbots and assistants for 24/7 support. Tools: Intercom AI, Tidio, Custom GPTs' },
];

const PROGRAM_ITEMS = [
  { title: 'AI for Business 101', description: 'Beginner course teaching business owners AI fundamentals and practical applications.' },
  { title: 'Workflow Automation', description: 'Learn to automate tasks using n8n, Zapier, and Make.' },
  { title: 'AI Marketing Mastery', description: 'Advanced training on AI-powered content creation and optimization.' },
  { title: 'Build a Custom AI Tool', description: 'We design and build a custom AI tool for your specific business needs.' },
  { title: 'AI Agent Development', description: 'Build AI agents for sales, customer support, or operations.' },
  { title: 'AI Training & Workshops', description: 'Hands-on group sessions customized to your team\'s skill level.' },
];

export default function AiEducationPage() {
  return (
    <ServiceFunnelPage
      pageId="ai-education"
      interactiveContent={{
        '6.3': <AccordionDiagram nodes={LANDSCAPE_NODES} isVisible />,
        '6.4': <ScrollableCards items={PROGRAM_ITEMS} isVisible />,
      }}
    />
  );
}
