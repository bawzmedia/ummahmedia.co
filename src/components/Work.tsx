import { C, R, BigText, Tag, CTA, VideoBlock, ImgBlock } from "../shared";

const Work = () => (
  <div>
    <section style={{
      minHeight: "80vh", display: "flex", alignItems: "flex-end",
      background: `radial-gradient(ellipse at 60% 40%, ${C.greenDim}, transparent 50%), ${C.lightCream}`,
      padding: "60px 20px 60px",
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
        <R>
          <Tag>Portfolio</Tag>
          <BigText size="clamp(42px, 10vw, 120px)">
            OUR BEST<br />
            <span style={{ color: C.gold }}>WORK</span>
          </BigText>
        </R>
      </div>
    </section>

    <section style={{ background: C.cream, padding: "0 20px 60px" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <R><VideoBlock label="Featured Project Reel" aspect="56.25%" /></R>
      </div>
    </section>

    <section style={{ background: C.cream, padding: "0 20px clamp(60px, 12vw, 120px)" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div>
          <R><VideoBlock label="Event Coverage" aspect="42%" /></R>
        </div>
        <div className="grid-2" style={{ marginTop: "4px" }}>
          <R><ImgBlock label="Project 1" h="clamp(220px, 35vw, 400px)" /></R>
          <R delay={0.1}><ImgBlock label="Project 2" h="clamp(220px, 35vw, 400px)" /></R>
        </div>
        <div className="grid-3" style={{ marginTop: "4px" }}>
          <R><ImgBlock label="Frame 1" h="clamp(180px, 28vw, 300px)" /></R>
          <R delay={0.1}><ImgBlock label="Frame 2" h="clamp(180px, 28vw, 300px)" /></R>
          <R delay={0.2}><ImgBlock label="Frame 3" h="clamp(180px, 28vw, 300px)" /></R>
        </div>

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <R><CTA href="/contact">START YOUR PROJECT</CTA></R>
        </div>
      </div>
    </section>
  </div>
);

export default Work;
