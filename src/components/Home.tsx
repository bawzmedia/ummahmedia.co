import { useState } from "react";
import { C, LOGO_URL, R, BigText, Sub, Tag, CTA, VideoBlock, ImgBlock } from "../shared";

// ─── Service Tile ───
const ServiceTile = ({ title, sub, href }: { title: string; sub: string; href: string }) => {
  const [h, setH] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        position: "relative",
        minHeight: "260px",
        background: h ? C.white : C.card,
        border: `2px solid ${h ? C.gold : C.goldDim}`,
        display: "flex", flexDirection: "column",
        justifyContent: "flex-end",
        padding: "32px",
        cursor: "pointer",
        transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        overflow: "hidden",
        boxShadow: h ? "0 16px 40px rgba(201,169,97,0.18)" : "0 2px 10px rgba(0,0,0,0.03)",
        transform: h ? "translateY(-4px)" : "translateY(0)",
        textDecoration: "none",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "3px",
        background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`,
        opacity: h ? 1 : 0,
        transition: "opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
      }} />
      <h3 style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "36px",
        color: C.textDark,
        lineHeight: 1,
        letterSpacing: "2px",
        whiteSpace: "pre-line",
        marginBottom: "12px",
        transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        transform: h ? "translateY(-6px)" : "translateY(0)",
      }}>
        {title}
      </h3>
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "13px",
        color: h ? C.textMid : C.textLight,
        letterSpacing: "1px",
        transition: "color 0.4s",
      }}>
        {sub}
      </span>
      <span style={{
        position: "absolute", top: "28px", right: "28px",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "20px", color: C.gold,
        opacity: h ? 1 : 0,
        transform: h ? "translateX(0)" : "translateX(-8px)",
        transition: "all 0.3s ease",
      }}>
        →
      </span>
    </a>
  );
};

const Home = () => (
  <div>
    <section style={{
      minHeight: "100vh", position: "relative", overflow: "hidden",
      background: C.lightCream,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "40px 0 60px",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `
          radial-gradient(ellipse at 30% 40%, rgba(26,94,81,0.06), transparent 50%),
          radial-gradient(ellipse at 70% 60%, rgba(201,169,97,0.08), transparent 40%),
          linear-gradient(180deg, rgba(250,248,243,0.5), rgba(250,248,243,1))
        `,
      }} />
      <div style={{
        position: "absolute", inset: 0, opacity: 0.05,
        background: `linear-gradient(45deg, ${C.greenLight} 25%, ${C.goldLight} 50%, ${C.greenLight} 75%)`,
        backgroundSize: "400% 400%",
        animation: "shimmer 8s ease infinite",
      }} />

      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 20px", maxWidth: "900px" }}>
        <R>
          <BigText size="clamp(36px, 9vw, 100px)" style={{ marginBottom: "0", lineHeight: 1 }}>
            CRAFTING
          </BigText>
        </R>
        <R delay={0.15}>
          <img src={LOGO_URL} alt="Ummah Media" style={{
            height: "clamp(140px, 30vw, 260px)", width: "clamp(140px, 30vw, 260px)", objectFit: "contain",
            margin: "20px auto",
            display: "block",
            filter: "drop-shadow(0 0 80px rgba(201,169,97,0.3))",
          }} />
        </R>
        <R delay={0.3}>
          <BigText size="clamp(36px, 9vw, 100px)" style={{ lineHeight: 1 }}>
            <span style={{ color: C.gold }}>MUSLIM</span> EXCELLENCE
          </BigText>
        </R>
        <R delay={0.45}>
          <div style={{ margin: "32px auto 0", display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <CTA href="/contact">START A PROJECT</CTA>
            <CTA href="/work" outline>SEE OUR WORK</CTA>
          </div>
        </R>
      </div>
    </section>

    <section style={{ background: C.cream, padding: "0 0 60px 0" }}>
      <R>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 20px" }}>
          <VideoBlock label="Your Showreel — Replace with actual video" aspect="56.25%" />
        </div>
      </R>
    </section>

    {/* Services */}
    <section style={{ background: C.lightCream, padding: "clamp(60px, 12vw, 120px) 20px" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <R>
          <Tag>What We Do</Tag>
          <BigText size="clamp(36px, 8vw, 90px)" style={{ marginBottom: "40px" }}>
            OUR <span style={{ color: C.gold }}>SERVICES</span>
          </BigText>
        </R>

        <div className="grid-services">
          {[
            { title: "BRAND\nDEVELOPMENT", sub: "Identity systems that inspire trust and command respect.", href: "/services/brand-development" },
            { title: "VIDEO\nMARKETING", sub: "Cinematic storytelling that moves hearts and drives results.", href: "/services/video-marketing" },
          ].map((s, i) => (
            <R key={i} delay={i * 0.1}>
              <ServiceTile title={s.title} sub={s.sub} href={s.href} />
            </R>
          ))}
        </div>

        <div className="grid-services" style={{ marginTop: "4px" }}>
          {[
            { title: "SOCIAL MEDIA\nMARKETING", sub: "Revenue-driven. Partnership-focused. Not just posting.", href: "/services/social-media" },
            { title: "UGC &\nINFLUENCER", sub: "Muslim creators. Authentic content. Real influence.", href: "/services/ugc-influencer" },
          ].map((s, i) => (
            <R key={i} delay={i * 0.1}>
              <ServiceTile title={s.title} sub={s.sub} href={s.href} />
            </R>
          ))}
        </div>

        <div className="grid-services" style={{ marginTop: "4px" }}>
          {[
            { title: "SMART\nSUITE", sub: "AI-powered funnels, agents, sites, media & portals.", href: "/services/smartsuite" },
            { title: "AI\nEDUCATION", sub: "Empowering the Ummah with future-proof skills.", href: "/services/ai-education" },
          ].map((s, i) => (
            <R key={i} delay={i * 0.1}>
              <ServiceTile title={s.title} sub={s.sub} href={s.href} />
            </R>
          ))}
        </div>
      </div>
    </section>

    <section style={{ background: C.cream, padding: "0 20px clamp(60px, 12vw, 120px)" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <R>
          <Tag>Selected Work</Tag>
          <BigText size="clamp(32px, 7vw, 80px)" style={{ marginBottom: "48px" }}>
            THE <span style={{ color: C.gold }}>PORTFOLIO</span>
          </BigText>
        </R>

        <div className="grid-2-1">
          <R><ImgBlock label="Project Showcase 1" h="clamp(250px, 40vw, 500px)" /></R>
          <R delay={0.1}><ImgBlock label="Project Showcase 2" h="clamp(250px, 40vw, 500px)" /></R>
        </div>
        <div className="grid-3" style={{ marginTop: "4px" }}>
          <R><ImgBlock label="Brand Work" h="clamp(200px, 30vw, 320px)" /></R>
          <R delay={0.1}><ImgBlock label="Event Coverage" h="clamp(200px, 30vw, 320px)" /></R>
          <R delay={0.2}><ImgBlock label="Social Campaign" h="clamp(200px, 30vw, 320px)" /></R>
        </div>
        <div className="grid-1-2" style={{ marginTop: "4px" }}>
          <R><ImgBlock label="Behind the Scenes" h="clamp(250px, 35vw, 400px)" /></R>
          <R delay={0.1}><VideoBlock label="Highlight Reel" aspect="44%" /></R>
        </div>
      </div>
    </section>

    <section style={{
      background: `linear-gradient(180deg, ${C.lightCream}, ${C.greenLight}, ${C.lightCream})`,
      padding: "clamp(80px, 15vw, 140px) 20px",
      textAlign: "center",
      position: "relative",
    }}>
      <R>
        <p style={{
          fontFamily: "'Amiri', serif",
          fontSize: "32px",
          color: C.gold,
          marginBottom: "40px",
          direction: "rtl",
        }}>
          بسم الله الرحمن الرحيم
        </p>
      </R>
      <R delay={0.15}>
        <BigText size="clamp(32px, 6vw, 72px)">
          MUSLIM OWNED.<br />
          PURPOSE DRIVEN.<br />
          <span style={{ color: C.gold }}>EXCELLENCE</span> ALWAYS.
        </BigText>
      </R>
      <R delay={0.3}>
        <Sub style={{ margin: "32px auto 0", textAlign: "center", maxWidth: "500px" }}>
          We serve Edmonton's Muslim community with professional media that reflects our values. Every project is an amanah.
        </Sub>
      </R>
    </section>

    <section style={{ background: C.cream, padding: "100px 24px", textAlign: "center" }}>
      <R>
        <BigText size="clamp(36px, 7vw, 80px)" style={{ marginBottom: "32px" }}>
          LET'S <span style={{ color: C.gold }}>BUILD</span>
        </BigText>
      </R>
      <R delay={0.15}>
        <CTA href="/contact">GET IN TOUCH</CTA>
      </R>
    </section>
  </div>
);

export default Home;
