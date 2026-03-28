import { C, R, BigText, Sub, Tag, Line, CTA, ImgBlock, VideoBlock, ServiceHero, Definition, SectionHead, StatBar, StepItem, FeatureCard, Insight, BottomCTA } from "../shared";
import { InsightKeyIcon, InsightChartIcon, InsightTargetIcon } from "../icons";

const BrandDevelopment = ({ setPage }: { setPage: (p: string) => void }) => (
  <div>
    {/* ── HERO ── */}
    <ServiceHero
      tag="Brand Development"
      titleLine1={<>YOUR BRAND'S <span style={{ color: C.gold }}>GENERAL</span></>}
      titleLine2="CONTRACTOR"
      subtitle="Not sure where your brand needs work? We figure that out. We audit your brand, build a custom plan, and handle the execution — strategy, content creation, and growth. All under one roof."
    />

    {/* ── DEFINITION ── */}
    <Definition
      term="In Simple Terms"
      definition="Brand development is strategic consulting paired with custom content creation. We assess which part of your brand needs work, then we build it — weekly consulting, custom video, photography, branded content, and everything in between. Think general contractor, but for your marketing."
    />

    {/* ── FEATURED VIDEO ── */}
    <section style={{ background: C.cream, padding: "clamp(40px, 8vw, 80px) 20px" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <R>
          <VideoBlock label="Brand Development Showreel — Replace with your video" aspect="56.25%" />
        </R>
      </div>
    </section>

    {/* ── THE BIG IDEA: Property Development, but Digital ── */}
    <section style={{ background: C.lightCream, padding: "clamp(60px, 12vw, 120px) 20px" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div className="grid-split" style={{ gap: "60px" }}>
          <R>
            <div>
              <Tag>The Big Idea</Tag>
              <BigText size="clamp(28px, 4vw, 52px)" style={{ marginBottom: "24px" }}>
                CONSULTING +<br />
                CONTENT<br />
                <span style={{ color: C.gold }}>CREATION</span>.
              </BigText>
              <Line />
              <Sub>
                A general contractor doesn't just lay tile. They assess the project, coordinate the trades, and make sure every piece works together. The result is a finished product — not a pile of parts.
              </Sub>
              <Sub style={{ marginTop: "16px" }}>
                That's how we approach your brand. We start with weekly consulting to audit what needs work, then we execute — custom video, professional photography, branded content, and strategic direction. Every deliverable is part of a plan, not a guess.
              </Sub>
              <div style={{ marginTop: "28px" }}>
                <Insight
                  emoji={<InsightKeyIcon size={24} color={C.gold} />}
                  text="Most businesses don't need a full rebrand. They need a dedicated consultant who can see the full picture, build the plan, and handle the execution. That's us."
                />
              </div>
            </div>
          </R>
          <R delay={0.15}>
            <ImgBlock label="Brand Ecosystem Overview" h="clamp(300px, 50vw, 580px)" />
          </R>
        </div>
      </div>
    </section>

    {/* ── STATS ── */}
    <StatBar stats={[
      { num: "23%", label: "Revenue lift from brand consistency" },
      { num: "3.5×", label: "ROI on strategic marketing" },
      { num: "80%", label: "Of trust comes from visuals" },
      { num: "100%", label: "Gaps identified & filled" },
    ]} />


    {/* ── WHAT WE BUILD (the full spectrum) ── */}
    <section style={{ background: C.cream, padding: "clamp(60px, 12vw, 120px) 20px" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <SectionHead tag="What You Get">
          YOUR <span style={{ color: C.gold }}>PACKAGE</span>
        </SectionHead>

        <R>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "15px", color: C.textMid, lineHeight: 1.7,
            maxWidth: "750px", marginBottom: "20px",
          }}>
            Every package starts with weekly consulting. From there, we build your custom content — video, photo, and branded posts — based on what your brand actually needs. Pricing depends on your industry and scope.
          </p>
        </R>
        <R delay={0.1}>
          <Insight
            emoji={<InsightChartIcon size={24} color={C.gold} />}
            text="We don't charge a flat rate because a restaurant and a law firm are two different builds. We set the deliverables, then price it based on your business."
          />
        </R>

        <div className="grid-cards" style={{ marginTop: "48px" }}>
          {[
            { number: "01", title: "CONSULTING & BRAND AUDIT", description: "Weekly strategy sessions — 1 hour, twice a week. We assess your brand, identify what needs work, and guide the entire build-out. This is where every project starts." },
            { number: "02", title: "CUSTOM VIDEO", description: "Short-form videos filmed and edited specifically for your brand. Scroll-stopping content optimized for Instagram Reels, TikTok, and YouTube Shorts." },
            { number: "03", title: "FILMING DAYS", description: "We come to you. On-location shoot days to capture the video and photo content your brand needs. Pre-production planning, equipment, and direction included." },
            { number: "04", title: "PROFESSIONAL PHOTOGRAPHY", description: "Branded photos that make your business look as good as the work you do. Edited, color-graded, and delivered in formats ready for social media and marketing." },
            { number: "05", title: "BRANDED IG POSTS", description: "Designed Instagram photo posts built with your brand colors, fonts, and identity. Not templates — custom designs that look like they belong to your brand." },
            { number: "06", title: "LANDING PAGES", description: "High-converting pages built to capture leads or drive sales. Designed to match your brand and optimized for the action you need visitors to take." },
            { number: "07", title: "SOCIAL MEDIA MANAGEMENT", description: "Available on our Flagship package — we post, engage, and grow your audience so you can focus on running your business. Daily management and monthly reporting." },
            { number: "08", title: "ADD-ONS", description: "Need more? Add lead magnets, email sequences, extra content, or additional filming days. Your package scales with your goals." },
          ].map((item, i) => (
            <R key={i} delay={i * 0.08}>
              <FeatureCard {...item} />
            </R>
          ))}
        </div>
      </div>
    </section>

    {/* ── HOW IT WORKS ── */}
    <section style={{ background: C.lightCream, padding: "clamp(60px, 12vw, 120px) 20px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <SectionHead tag="How It Works">
          FROM <span style={{ color: C.gold }}>AUDIT</span> TO EXECUTION
        </SectionHead>

        <R>
          <Insight
            emoji={<InsightTargetIcon size={24} color={C.gold} />}
            text="We don't start with content. We start with consulting. Every project begins with understanding your brand — then we build the package around what you actually need."
          />
        </R>

        <div style={{ marginTop: "48px" }}>
          <StepItem step="01" title="AUDIT YOUR BRAND" desc="In our first consulting sessions, we review your entire brand presence — visuals, content, online presence, and competitive landscape. You get a clear picture of where your brand stands and what needs work." />
          <StepItem step="02" title="BUILD YOUR PACKAGE" desc="Based on the audit, we build a custom package around your needs and industry. Foundation, Signature, or Flagship — each comes with set deliverables. Pricing is based on your business, not a one-size-fits-all rate." />
          <StepItem step="03" title="CREATE YOUR CONTENT" desc="We execute — filming days, custom videos, professional photography, branded posts, landing pages. Everything is produced under one roof with ongoing consulting to keep it all on strategy." />
          <StepItem step="04" title="LAUNCH & GROW" desc="Content goes live, your brand shows up consistently, and we keep building. Weekly consulting continues so your strategy evolves as your business grows." isLast />
        </div>
      </div>
    </section>

    {/* ── WHO THIS IS FOR ── */}
    <section style={{ background: C.cream, padding: "clamp(60px, 12vw, 120px) 20px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <SectionHead tag="Who This Is For">
          IS THIS <span style={{ color: C.gold }}>YOU</span>?
        </SectionHead>

        <R>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "15px", color: C.textMid, lineHeight: 1.7,
            maxWidth: "750px", marginBottom: "48px",
          }}>
            Brand development is for businesses that know they need help but aren't sure where to start:
          </p>
        </R>

        <StepItem step="→" title="YOU KNOW YOUR BRAND NEEDS WORK" desc="Something's off but you can't pinpoint what. You need someone who can look at the full picture, diagnose the problems, and build the solutions — not just hand you a logo." />
        <StepItem step="→" title="YOU'RE DOING MARKETING WITHOUT A PLAN" desc="You're posting content, maybe running ads, but there's no strategy behind it. No clear direction. No consistency. You need a consultant who builds the plan and executes it." />
        <StepItem step="→" title="YOU DON'T HAVE TIME TO FIGURE IT OUT" desc="You run a business. You don't have time to learn marketing, hire five freelancers, and manage them all. You need one team that handles everything — strategy, content, and distribution." />
        <StepItem step="→" title="YOU WANT PROFESSIONAL CONTENT" desc="Your competitors have clean videos, professional photos, and branded social media. You want the same — but done right, with strategy behind every piece of content." isLast />
      </div>
    </section>

    {/* ── PORTFOLIO ── */}
    <section style={{ background: C.lightCream, padding: "clamp(60px, 12vw, 120px) 20px" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <SectionHead tag="Selected Work">
          BRAND <span style={{ color: C.gold }}>PROJECTS</span>
        </SectionHead>

        <div className="grid-2-1">
          <R><ImgBlock label="Full Brand Build — Case Study" h="clamp(280px, 45vw, 500px)" /></R>
          <R delay={0.1}><ImgBlock label="Strategy + Visual System" h="clamp(280px, 45vw, 500px)" /></R>
        </div>
        <div className="grid-3" style={{ marginTop: "4px" }}>
          <R><ImgBlock label="Content SOPs" h="clamp(220px, 32vw, 320px)" /></R>
          <R delay={0.1}><ImgBlock label="Platform Strategy" h="clamp(220px, 32vw, 320px)" /></R>
          <R delay={0.2}><ImgBlock label="Brand Collateral" h="clamp(220px, 32vw, 320px)" /></R>
        </div>
      </div>
    </section>

    {/* ── CTA ── */}
    <BottomCTA
      title="READY TO BUILD YOUR"
      highlight="BRAND?"
      subtitle="Book a consultation. We'll audit your brand, build your package, and handle the execution — so you can focus on your business."
      buttonText="BOOK A CONSULTATION"
      onButtonClick={() => setPage("contact")}
    />
  </div>
);

export default BrandDevelopment;
