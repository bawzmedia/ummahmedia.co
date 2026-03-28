import { C, LOGO_URL } from "../shared";

const Footer = () => (
  <footer style={{
    background: C.white,
    borderTop: `2px solid ${C.goldDim}`,
    padding: "40px 20px",
  }}>
    <div style={{
      maxWidth: "1400px", margin: "0 auto",
      display: "flex", justifyContent: "space-between",
      alignItems: "center", flexWrap: "wrap", gap: "20px",
    }}>
      <a href="/" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
        <img src={LOGO_URL} alt="" style={{ height: "32px", width: "32px", objectFit: "contain" }} />
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "16px", letterSpacing: "3px", color: C.textLight,
        }}>
          UMMAH MEDIA
        </span>
      </a>
      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
        {[
          { href: "/services/brand-development", label: "Brand" },
          { href: "/services/video-marketing", label: "Video" },
          { href: "/services/social-media", label: "Social" },
          { href: "/services/ugc-influencer", label: "UGC" },
          { href: "/services/smartsuite", label: "SmartSuite" },
          { href: "/services/ai-education", label: "AI" },
          { href: "/work", label: "Work" },
          { href: "/about", label: "About" },
          { href: "/contact", label: "Contact" },
        ].map(p => (
          <a key={p.href} href={p.href} style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase",
            color: C.textMid, padding: 0, textDecoration: "none",
          }}>
            {p.label}
          </a>
        ))}
      </div>
      <span style={{
        fontFamily: "'Amiri', serif",
        fontSize: "18px", color: "#9E8345",
        width: "100%", textAlign: "center", display: "block",
      }}>
        الحمد لله رب العالمين
      </span>
    </div>
  </footer>
);

export default Footer;
