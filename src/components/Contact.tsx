import { useState } from "react";
import { C, R, BigText, Sub, Tag, CTA } from "../shared";
import { BrandDevIcon, VideoMarketingIcon, SocialMediaIcon, UgcInfluencerIcon, SmartSuiteIcon, AiEducationIcon, JustStartingIcon, GrowingIcon, RebuildingIcon, AsapIcon, MonthsIcon, FlexibleIcon, Budget1Icon, Budget2Icon, Budget3Icon, Budget4Icon } from "../icons";

const ChoiceCard = ({ label, desc, selected, onClick, icon }: {
  label: string; desc: string; selected: boolean; onClick: () => void; icon: React.ReactNode;
}) => (
  <button onClick={onClick} style={{
    background: selected ? C.gold : C.white,
    border: `2px solid ${selected ? C.gold : C.goldDim}`,
    padding: "24px 20px",
    cursor: "pointer",
    transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
    textAlign: "left",
    display: "flex", flexDirection: "column", gap: "8px",
    boxShadow: selected ? "0 12px 32px rgba(201,169,97,0.25)" : "0 2px 8px rgba(0,0,0,0.03)",
    transform: selected ? "translateY(-3px) scale(1.02)" : "translateY(0) scale(1)",
    width: "100%",
  }}>
    <span style={{ color: selected ? C.white : C.gold }}>{icon}</span>
    <span style={{
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "20px", letterSpacing: "2px",
      color: selected ? C.white : C.textDark,
    }}>
      {label}
    </span>
    <span style={{
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "13px",
      color: selected ? "rgba(255,255,255,0.8)" : C.textLight,
      lineHeight: 1.5,
    }}>
      {desc}
    </span>
  </button>
);

const Contact = ({ preselectedService = "" }: { preselectedService?: string }) => {
  const [step, setStep] = useState(0);
  const [service, setService] = useState(preselectedService);
  const [stage, setStage] = useState("");
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalSteps = 5;
  const progress = ((step + 1) / totalSteps) * 100;

  const canNext = () => {
    if (step === 0) return !!service;
    if (step === 1) return !!stage;
    if (step === 2) return !!timeline;
    if (step === 3) return !!budget;
    if (step === 4) return !!name && !!email;
    return false;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service, stage, timeline, budget, name, email, message }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        background: C.lightCream, padding: "60px 20px 60px",
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", width: "100%" }}>

          {!submitted ? (
            <>
              {/* Progress bar */}
              <div style={{ marginBottom: "48px" }}>
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  marginBottom: "12px",
                }}>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px", letterSpacing: "2px",
                    color: C.gold, textTransform: "uppercase",
                  }}>
                    STEP {step + 1} OF {totalSteps}
                  </span>
                  <span style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "14px", letterSpacing: "2px",
                    color: C.textLight,
                  }}>
                    {Math.round(progress)}%
                  </span>
                </div>
                <div style={{
                  width: "100%", height: "4px",
                  background: C.goldDim, overflow: "hidden",
                }}>
                  <div style={{
                    width: `${progress}%`, height: "100%",
                    background: `linear-gradient(90deg, ${C.green}, ${C.gold})`,
                    transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                  }} />
                </div>
              </div>

              {/* Step 0: What do you need? */}
              {step === 0 && (
                <div key="s0" style={{ animation: "fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1)" }}>
                  <Tag>Let's Build Something</Tag>
                  <BigText size="clamp(32px, 7vw, 64px)" style={{ marginBottom: "12px" }}>
                    WHAT DO YOU <span style={{ color: C.gold }}>NEED</span>?
                  </BigText>
                  <Sub style={{ marginBottom: "36px" }}>Pick the service that best matches your project. Don't worry — we can always adjust later.</Sub>
                  <div className="grid-choices">
                    <ChoiceCard icon={<BrandDevIcon size={28} />} label="BRAND DEVELOPMENT" desc="Strategy, visuals, systems — build what's missing." selected={service === "brand"} onClick={() => setService("brand")} />
                    <ChoiceCard icon={<VideoMarketingIcon size={28} />} label="VIDEO MARKETING" desc="Videos that move hearts and drive results." selected={service === "video"} onClick={() => setService("video")} />
                    <ChoiceCard icon={<SocialMediaIcon size={28} />} label="SOCIAL MEDIA MARKETING" desc="Revenue-driven social. Partnerships & growth." selected={service === "social"} onClick={() => setService("social")} />
                    <ChoiceCard icon={<UgcInfluencerIcon size={28} />} label="UGC & INFLUENCER" desc="Muslim creators. Real influence. Real results." selected={service === "ugc"} onClick={() => setService("ugc")} />
                    <ChoiceCard icon={<SmartSuiteIcon size={28} />} label="SMARTSUITE" desc="AI-powered funnels, agents, sites & portals." selected={service === "smartsuite"} onClick={() => setService("smartsuite")} />
                    <ChoiceCard icon={<AiEducationIcon size={28} />} label="AI EDUCATION" desc="Practical AI skills for your team." selected={service === "ai"} onClick={() => setService("ai")} />
                  </div>
                </div>
              )}

              {/* Step 1: What stage? */}
              {step === 1 && (
                <div key="s1" style={{ animation: "fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1)" }}>
                  <Tag>About Your Brand</Tag>
                  <BigText size="clamp(32px, 7vw, 64px)" style={{ marginBottom: "12px" }}>
                    WHERE ARE YOU <span style={{ color: C.gold }}>NOW</span>?
                  </BigText>
                  <Sub style={{ marginBottom: "36px" }}>No judgment — just helps us understand where to start.</Sub>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <ChoiceCard icon={<JustStartingIcon size={28} />} label="JUST STARTING" desc="I have an idea or a new business and need to build from scratch." selected={stage === "starting"} onClick={() => setStage("starting")} />
                    <ChoiceCard icon={<GrowingIcon size={28} />} label="GROWING" desc="I have a business running but need to level up my brand and marketing." selected={stage === "growing"} onClick={() => setStage("growing")} />
                    <ChoiceCard icon={<RebuildingIcon size={28} />} label="REBUILDING" desc="My brand exists but needs a serious overhaul — something feels off." selected={stage === "rebuilding"} onClick={() => setStage("rebuilding")} />
                  </div>
                </div>
              )}

              {/* Step 2: Timeline */}
              {step === 2 && (
                <div key="s2" style={{ animation: "fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1)" }}>
                  <Tag>Timeline</Tag>
                  <BigText size="clamp(32px, 7vw, 64px)" style={{ marginBottom: "12px" }}>
                    WHEN DO YOU <span style={{ color: C.gold }}>NEED IT</span>?
                  </BigText>
                  <Sub style={{ marginBottom: "36px" }}>This helps us plan capacity. We'll always confirm exact timelines later.</Sub>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <ChoiceCard icon={<AsapIcon size={28} />} label="ASAP" desc="I need this done as soon as possible — days to 2 weeks." selected={timeline === "asap"} onClick={() => setTimeline("asap")} />
                    <ChoiceCard icon={<MonthsIcon size={28} />} label="1–3 MONTHS" desc="I have some time — let's do it properly." selected={timeline === "1-3"} onClick={() => setTimeline("1-3")} />
                    <ChoiceCard icon={<FlexibleIcon size={28} />} label="FLEXIBLE" desc="No rush — I want to take the time to get it right." selected={timeline === "flexible"} onClick={() => setTimeline("flexible")} />
                  </div>
                </div>
              )}

              {/* Step 3: Budget */}
              {step === 3 && (
                <div key="s3" style={{ animation: "fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1)" }}>
                  <Tag>Investment</Tag>
                  <BigText size="clamp(32px, 7vw, 64px)" style={{ marginBottom: "12px" }}>
                    WHAT'S YOUR <span style={{ color: C.gold }}>RANGE</span>?
                  </BigText>
                  <Sub style={{ marginBottom: "36px" }}>Be honest — we work with real budgets. We'll always find a way to make it work In Shaa Allah.</Sub>
                  <div className="grid-choices">
                    <ChoiceCard icon={<Budget1Icon size={28} />} label="$500 – $2K" desc="Small but mighty. Let's make it count." selected={budget === "500-2k"} onClick={() => setBudget("500-2k")} />
                    <ChoiceCard icon={<Budget2Icon size={28} />} label="$2K – $5K" desc="Room to build something solid." selected={budget === "2k-5k"} onClick={() => setBudget("2k-5k")} />
                    <ChoiceCard icon={<Budget3Icon size={28} />} label="$5K – $15K" desc="Full scope. Full quality." selected={budget === "5k-15k"} onClick={() => setBudget("5k-15k")} />
                    <ChoiceCard icon={<Budget4Icon size={28} />} label="$15K+" desc="Let's build something exceptional." selected={budget === "15k+"} onClick={() => setBudget("15k+")} />
                  </div>
                </div>
              )}

              {/* Step 4: Contact details */}
              {step === 4 && (
                <div key="s4" style={{ animation: "fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1)" }}>
                  <Tag>Almost Done</Tag>
                  <BigText size="clamp(32px, 7vw, 64px)" style={{ marginBottom: "12px" }}>
                    WHO ARE <span style={{ color: C.gold }}>YOU</span>?
                  </BigText>
                  <Sub style={{ marginBottom: "36px" }}>Last step — tell us how to reach you and anything else on your mind.</Sub>

                  <div style={{
                    background: C.white,
                    border: `2px solid ${C.goldDim}`,
                    padding: "clamp(24px, 5vw, 40px)",
                    boxShadow: "0 8px 30px rgba(201,169,97,0.1)",
                  }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                      {[
                        { label: "YOUR NAME", value: name, setter: setName, type: "text" },
                        { label: "YOUR EMAIL", value: email, setter: setEmail, type: "email" },
                      ].map((f, i) => (
                        <div key={i}>
                          <label style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "11px", letterSpacing: "3px",
                            color: C.gold, display: "block", marginBottom: "10px",
                          }}>
                            {f.label}
                          </label>
                          <input type={f.type} value={f.value} onChange={e => f.setter(e.target.value)} style={{
                            width: "100%", background: C.lightCream,
                            border: `1px solid ${C.goldDim}`,
                            borderBottom: `2px solid ${C.gold}`,
                            color: C.textDark,
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "16px", padding: "14px 12px",
                            outline: "none", boxSizing: "border-box",
                          }} />
                        </div>
                      ))}
                      <div>
                        <label style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "11px", letterSpacing: "3px",
                          color: C.gold, display: "block", marginBottom: "10px",
                        }}>
                          ANYTHING ELSE? (OPTIONAL)
                        </label>
                        <textarea rows={3} value={message} onChange={e => setMessage(e.target.value)} style={{
                          width: "100%", background: C.lightCream,
                          border: `1px solid ${C.goldDim}`,
                          borderBottom: `2px solid ${C.gold}`,
                          color: C.textDark,
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "16px", padding: "14px 12px",
                          outline: "none", resize: "vertical", boxSizing: "border-box",
                        }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", marginTop: "36px", gap: "16px",
              }}>
                {step > 0 ? (
                  <button onClick={() => setStep(step - 1)} style={{
                    background: "none", border: `2px solid ${C.goldDim}`,
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "14px", letterSpacing: "3px",
                    color: C.textMid, padding: "14px 32px",
                    cursor: "pointer", transition: "all 0.3s",
                  }}>
                    ← BACK
                  </button>
                ) : <div />}

                {step < totalSteps - 1 ? (
                  <button onClick={() => canNext() && setStep(step + 1)} style={{
                    background: canNext() ? C.gold : C.goldDim,
                    border: "none",
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "14px", letterSpacing: "3px",
                    color: canNext() ? C.white : C.textLight,
                    padding: "14px 40px",
                    cursor: canNext() ? "pointer" : "default",
                    transition: "all 0.3s",
                  }}>
                    NEXT →
                  </button>
                ) : (
                  <button onClick={() => canNext() && handleSubmit()} style={{
                    background: canNext() ? C.gold : C.goldDim,
                    border: "none",
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "14px", letterSpacing: "3px",
                    color: canNext() ? C.white : C.textLight,
                    padding: "14px 40px",
                    cursor: canNext() ? "pointer" : "default",
                    transition: "all 0.3s",
                    boxShadow: canNext() ? "0 8px 20px rgba(201,169,97,0.25)" : "none",
                  }}>
                    {loading ? "SUBMITTING..." : "SUBMIT PROJECT →"}
                  </button>
                )}
              </div>

              {error && (
                <div style={{
                  marginTop: "20px", padding: "16px 20px",
                  background: "rgba(200,60,60,0.08)",
                  borderLeft: "3px solid #C93C3C",
                }}>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px", color: "#C93C3C",
                    lineHeight: 1.5,
                  }}>
                    {error}
                  </p>
                </div>
              )}
            </>
          ) : (
            /* ── SUCCESS STATE ── */
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <R>
                <p style={{
                  fontFamily: "'Amiri', serif",
                  fontSize: "clamp(24px, 5vw, 36px)", color: C.gold,
                  marginBottom: "32px", direction: "rtl" as const,
                }}>
                  بارك الله فيك
                </p>
              </R>
              <R delay={0.15}>
                <BigText size="clamp(36px, 8vw, 80px)" style={{ marginBottom: "20px" }}>
                  YOUR PROJECT IS <span style={{ color: C.gold }}>SUBMITTED</span>
                </BigText>
              </R>
              <R delay={0.25}>
                <Sub style={{ margin: "0 auto 16px", textAlign: "center", maxWidth: "480px" }}>
                  JazakAllahu Khairan, {name}. We've received your brief and will be in touch within 24 hours In Shaa Allah.
                </Sub>
              </R>
              <R delay={0.35}>
                <div style={{
                  background: C.white, border: `2px solid ${C.goldDim}`,
                  padding: "32px", marginTop: "40px", textAlign: "left",
                  maxWidth: "500px", margin: "40px auto 0",
                }}>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: "12px",
                    letterSpacing: "2px", color: C.gold, textTransform: "uppercase",
                    marginBottom: "20px",
                  }}>YOUR PROJECT SUMMARY</p>
                  {[
                    { label: "Service", value: service === "brand" ? "Brand Development" : service === "video" ? "Video Marketing" : service === "social" ? "Social Media Marketing" : service === "ugc" ? "UGC & Influencer" : service === "smartsuite" ? "SmartSuite" : "AI Education" },
                    { label: "Stage", value: stage === "starting" ? "Just Starting" : stage === "growing" ? "Growing" : "Rebuilding" },
                    { label: "Timeline", value: timeline === "asap" ? "ASAP" : timeline === "1-3" ? "1-3 Months" : "Flexible" },
                    { label: "Budget", value: budget },
                    { label: "Email", value: email },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: "flex", justifyContent: "space-between",
                      padding: "10px 0",
                      borderBottom: i < 4 ? `1px solid ${C.goldDim}` : "none",
                    }}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: C.textLight }}>{item.label}</span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: C.textDark, fontWeight: 600 }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </R>

              <R delay={0.3}>
                <div style={{ marginTop: "48px" }}>
                  <p style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "18px", letterSpacing: "3px",
                    color: C.textLight,
                  }}>
                    UMMAHMEDIA.CA — EDMONTON, AB
                  </p>
                </div>
              </R>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Contact;
