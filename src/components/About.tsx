import { lazy, Suspense } from "react";
import { C, R, BigText, Sub, Tag, Line, CTA, ImgBlock } from "../shared";

const PartnerGlobe = lazy(() => import("./PartnerGlobe"));

const About = () => (
  <div>
    <section style={{
      minHeight: "80vh", display: "flex", alignItems: "flex-end",
      background: `radial-gradient(ellipse at 40% 50%, ${C.goldDim}, transparent 40%), ${C.lightCream}`,
      padding: "60px 20px 60px",
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
        <R>
          <Tag>About Us</Tag>
          <BigText size="clamp(42px, 10vw, 120px)">
            BUILDING<br />
            <span style={{ color: C.gold }}>COMMUNITY</span>
          </BigText>
        </R>
      </div>
    </section>

    <section style={{ background: C.white, padding: "48px 20px", borderTop: `1px solid ${C.goldDim}`, borderBottom: `1px solid ${C.goldDim}` }}>
      <div style={{
        maxWidth: "1000px", margin: "0 auto",
        display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "32px",
        textAlign: "center",
      }}>
        {[
          { num: "HALAL", label: "Values-aligned" },
          { num: "LOCAL", label: "Edmonton based" },
          { num: "QUALITY", label: "Professional grade" },
          { num: "TRUST", label: "Community first" },
        ].map((s, i) => (
          <R key={i} delay={i * 0.08}>
            <div>
              <span style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "28px", color: C.gold, letterSpacing: "3px",
                display: "block",
              }}>
                {s.num}
              </span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px", color: C.textLight, letterSpacing: "1px",
                textTransform: "uppercase",
              }}>
                {s.label}
              </span>
            </div>
          </R>
        ))}
      </div>
    </section>

    {/* ── PARTNER GLOBE ── */}
    <section style={{ background: C.lightCream, padding: "clamp(60px, 12vw, 120px) 20px" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <R>
          <Tag>Our Global Network</Tag>
          <BigText size="clamp(32px, 6vw, 72px)" style={{ marginBottom: "12px" }}>
            PARTNERS ACROSS THE <span style={{ color: C.gold }}>UMMAH</span>
          </BigText>
        </R>
        <R delay={0.1}>
          <Sub style={{ marginBottom: "48px" }}>
            We work with talented Muslims around the world. Our network spans continents — united by purpose, connected by faith.
          </Sub>
        </R>
        <R delay={0.2}>
          <Suspense fallback={
            <div style={{
              width: "100%", height: "500px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px", color: C.textLight, letterSpacing: "2px",
              }}>
                LOADING GLOBE...
              </span>
            </div>
          }>
            <PartnerGlobe />
          </Suspense>
        </R>
        <R delay={0.3}>
          <div style={{
            display: "flex", justifyContent: "center", gap: "40px",
            flexWrap: "wrap", marginTop: "40px",
          }}>
            {[
              { city: "Edmonton", country: "Canada" },
              { city: "Red Deer", country: "Canada" },
              { city: "Halifax", country: "Canada" },
              { city: "Gujranwala", country: "Pakistan" },
              { city: "Toba Tek Singh", country: "Pakistan" },
            ].map((p, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "24px", letterSpacing: "2px",
                  color: C.gold, display: "block",
                }}>
                  {p.city}
                </span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px", letterSpacing: "1.5px",
                  color: C.textLight, textTransform: "uppercase",
                }}>
                  {p.country}
                </span>
              </div>
            ))}
          </div>
        </R>
      </div>
    </section>

    {/* ── SERVING THE UMMAH ── */}
    <section style={{ background: C.cream, padding: "clamp(60px, 12vw, 120px) 20px" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div className="grid-split">
          <R>
            <div>
              <BigText size="clamp(28px, 4vw, 48px)" style={{ marginBottom: "20px" }}>
                SERVING THE<br />
                <span style={{ color: C.gold }}>UMMAH.</span>
              </BigText>
              <Line />
              <Sub>
                We're Edmonton's go-to media company for Muslim businesses, organizations, and community leaders who refuse to compromise on quality or values.
              </Sub>
              <div style={{ marginTop: "32px" }}>
                <CTA href="/contact">WORK WITH US</CTA>
              </div>
            </div>
          </R>
          <R delay={0.15}>
            <div className="grid-2">
              <ImgBlock label="Team Photo 1" h="clamp(160px, 25vw, 240px)" />
              <ImgBlock label="Team Photo 2" h="clamp(160px, 25vw, 240px)" />
              <ImgBlock label="Team Photo 3" h="clamp(160px, 25vw, 240px)" />
              <ImgBlock label="Team Photo 4" h="clamp(160px, 25vw, 240px)" />
            </div>
          </R>
        </div>
      </div>
    </section>
  </div>
);

export default About;
