import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import "./Hero.css";

const SPIDERMAN_IMG = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc0caooNAXJIIuN4CM-te9ihk_lwc6b7pnAw&s";
const SPIDERMAN_IMG2 = "https://cdn.marvel.com/content/2x/spidey02_ons_var_mob_01.jpg";

// ─── Realistic Spider SVG ──────────────────────────────────────────────────────
function SpiderSVG({ x, y, rotation, legPhase, size = 1, opacity = 1 }) {
  const lp = legPhase;
  const legAnim = (i) => Math.sin(lp + i * 0.8) * 6;

  const legs = [
    // Front right pair
    { sx: 4, sy: -6, cp1x: 18 + legAnim(0), cp1y: -18 + legAnim(0), ex: 28 + legAnim(0), ey: -10 + legAnim(0) },
    { sx: 4, sy: -3, cp1x: 20 + legAnim(1), cp1y: -8 + legAnim(1), ex: 32 + legAnim(1), ey: 2 + legAnim(1) },
    // Back right pair
    { sx: 3, sy: 2, cp1x: 18 + legAnim(2), cp1y: 8 + legAnim(2), ex: 28 + legAnim(2), ey: 14 + legAnim(2) },
    { sx: 2, sy: 6, cp1x: 14 + legAnim(3), cp1y: 18 + legAnim(3), ex: 20 + legAnim(3), ey: 26 + legAnim(3) },
    // Front left pair (mirrored)
    { sx: -4, sy: -6, cp1x: -18 + legAnim(4), cp1y: -18 + legAnim(4), ex: -28 + legAnim(4), ey: -10 + legAnim(4) },
    { sx: -4, sy: -3, cp1x: -20 + legAnim(5), cp1y: -8 + legAnim(5), ex: -32 + legAnim(5), ey: 2 + legAnim(5) },
    // Back left pair
    { sx: -3, sy: 2, cp1x: -18 + legAnim(6), cp1y: 8 + legAnim(6), ex: -28 + legAnim(6), ey: 14 + legAnim(6) },
    { sx: -2, sy: 6, cp1x: -14 + legAnim(7), cp1y: 18 + legAnim(7), ex: -20 + legAnim(7), ey: 26 + legAnim(7) },
  ];

  return (
    <g
      transform={`translate(${x},${y}) rotate(${rotation}) scale(${size})`}
      opacity={opacity}
      style={{ filter: "drop-shadow(0 2px 6px rgba(230,36,41,0.5))" }}
    >
      {/* Web thread trailing */}
      <line x1="0" y1="-8" x2="0" y2="-60" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" strokeDasharray="3,4" />

      {/* Legs */}
      {legs.map((leg, i) => (
        <path
          key={i}
          d={`M ${leg.sx} ${leg.sy} Q ${leg.cp1x} ${leg.cp1y} ${leg.ex} ${leg.ey}`}
          stroke="#1a0000"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />
      ))}
      {/* Leg highlights */}
      {legs.map((leg, i) => (
        <path
          key={`h${i}`}
          d={`M ${leg.sx} ${leg.sy} Q ${leg.cp1x} ${leg.cp1y} ${leg.ex} ${leg.ey}`}
          stroke="rgba(180,0,0,0.3)"
          strokeWidth="0.6"
          fill="none"
          strokeLinecap="round"
        />
      ))}

      {/* Abdomen */}
      <ellipse cx="0" cy="8" rx="8" ry="11" fill="#0d0000" />
      <ellipse cx="0" cy="7" rx="5.5" ry="7.5" fill="#1a0000" opacity="0.7" />
      {/* Abdomen pattern - web lines */}
      <path d="M0,0 L0,18" stroke="rgba(230,36,41,0.25)" strokeWidth="0.5" />
      <path d="M-6,6 Q0,4 6,6" stroke="rgba(230,36,41,0.2)" strokeWidth="0.5" fill="none" />
      <path d="M-7,10 Q0,8 7,10" stroke="rgba(230,36,41,0.2)" strokeWidth="0.5" fill="none" />
      {/* Red hourglass marking */}
      <path d="M-2.5,4 L2.5,4 L1.5,9 L-1.5,9 Z" fill="#e62429" opacity="0.85" />
      <ellipse cx="0" cy="16" rx="3" ry="1.5" fill="rgba(230,36,41,0.4)" />

      {/* Cephalothorax */}
      <ellipse cx="0" cy="-5" rx="6" ry="7" fill="#0d0d0d" />
      <ellipse cx="0" cy="-5" rx="3.5" ry="4.5" fill="#1a1a1a" opacity="0.8" />

      {/* Head */}
      <ellipse cx="0" cy="-12" rx="4.5" ry="4" fill="#111" />

      {/* Eyes - 8 eyes */}
      <circle cx="-3" cy="-14" r="1.1" fill="#e62429" />
      <circle cx="-1" cy="-15.5" r="0.9" fill="#ff4444" />
      <circle cx="1" cy="-15.5" r="0.9" fill="#ff4444" />
      <circle cx="3" cy="-14" r="1.1" fill="#e62429" />
      <circle cx="-2.5" cy="-12.5" r="0.7" fill="#cc2222" />
      <circle cx="2.5" cy="-12.5" r="0.7" fill="#cc2222" />
      {/* Eye glow */}
      <circle cx="-3" cy="-14" r="1.1" fill="none" stroke="rgba(230,36,41,0.8)" strokeWidth="0.4" />
      <circle cx="3" cy="-14" r="1.1" fill="none" stroke="rgba(230,36,41,0.8)" strokeWidth="0.4" />

      {/* Chelicerae (fangs) */}
      <path d="M-2,-17 Q-3,-20 -2,-21" stroke="#330000" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M2,-17 Q3,-20 2,-21" stroke="#330000" strokeWidth="1.2" fill="none" strokeLinecap="round" />

      {/* Body sheen */}
      <ellipse cx="-1.5" cy="-7" rx="1.5" ry="3" fill="rgba(255,255,255,0.06)" transform="rotate(-15,-1.5,-7)" />
    </g>
  );
}

// ─── Discover Page ─────────────────────────────────────────────────────────────
function DiscoverPage({ onBack }) {
  const [activeSection, setActiveSection] = useState(null);
  const [webLines, setWebLines] = useState([]);
  const pageRef = useRef(null);

  const handleClick = (e) => {
    const rect = pageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setWebLines(prev => [...prev.slice(-4), { id, x, y, angle: Math.random() * 60 - 30 }]);
    setTimeout(() => setWebLines(prev => prev.filter(w => w.id !== id)), 1200);
  };

  const sections = [
    {
      id: "origin",
      label: "01",
      title: "THE ORIGIN",
      subtitle: "From Science Nerd to Spider",
      icon: "🕷",
      color: "#e62429",
      content: "Peter Benjamin Parker was a shy, bookish teenager from Queens, New York. An orphan raised by his Aunt May and Uncle Ben, he was intellectually gifted but socially isolated — until one fateful afternoon at a science exhibition changed everything.",
      detail: "A radioactive spider bite granted Peter superhuman strength, agility, the ability to cling to walls, and a precognitive 'spider-sense'. With great power, came the greatest lesson of his life.",
      quote: "With great power, there must also come great responsibility.",
      quoteBy: "Uncle Ben"
    },
    {
      id: "powers",
      label: "02",
      title: "THE POWERS",
      subtitle: "Beyond Human Limits",
      icon: "⚡",
      color: "#2962cc",
      content: "Spider-Man's abilities go far beyond mere wall-crawling. His physiology was permanently altered at a cellular level, granting him a suite of powers that make him one of the most formidable heroes on Earth.",
      detail: "Superhuman strength (lifting 10+ tons), reflexes 15x faster than a normal human, 360° spider-sense threat detection, and self-designed web-shooters capable of supporting over 120 lbs per strand.",
      stats: [
        { label: "Strength", value: "10 Tons", bar: 75 },
        { label: "Speed", value: "200 mph", bar: 60 },
        { label: "Agility", value: "15× Human", bar: 90 },
        { label: "Spider-Sense", value: "360°", bar: 100 },
      ]
    },
    {
      id: "rogues",
      label: "03",
      title: "ROGUES' GALLERY",
      subtitle: "His Greatest Enemies",
      icon: "☠",
      color: "#7c1a1a",
      content: "No hero is defined without his villains. Spider-Man's rogues' gallery is among the most iconic in comic history — each one a twisted reflection of Peter Parker's own fears, failures, and responsibilities.",
      villains: [
        { name: "Green Goblin", desc: "Norman Osborn. His most personal nemesis.", color: "#2a6e1a" },
        { name: "Doctor Octopus", desc: "Otto Octavius. A dark mirror of Peter's intellect.", color: "#1a3a6e" },
        { name: "Venom", desc: "Eddie Brock + alien symbiote. Born from Peter's own darkness.", color: "#111" },
        { name: "Kingpin", desc: "Wilson Fisk. The shadow over New York City.", color: "#3a2a1a" },
        { name: "Electro", desc: "Max Dillon. Living lightning. Unstoppable in the rain.", color: "#1a4a6e" },
        { name: "The Vulture", desc: "Adrian Toomes. Old. Patient. Deadly.", color: "#2a3a1a" },
      ]
    },
    {
      id: "legacy",
      label: "04",
      title: "THE LEGACY",
      subtitle: "60 Years of Friendly Neighborhood",
      icon: "★",
      color: "#c08000",
      content: "Created by Stan Lee and Steve Ditko in 1962, Spider-Man redefined what a superhero could be. Not a billionaire, not an alien, not a god — just a kid from Queens trying to do the right thing.",
      milestones: [
        { year: "1962", event: "Amazing Fantasy #15 — First appearance" },
        { year: "1973", event: "Death of Gwen Stacy — Comics changed forever" },
        { year: "1984", event: "Secret Wars — The black symbiote suit" },
        { year: "2004", event: "\"The Other\" arc — Deeper mutation" },
        { year: "2018", event: "Into the Spider-Verse — Cultural phenomenon" },
        { year: "2024", event: "800+ issues, still swinging" },
      ]
    }
  ];

  return (
    <motion.div
      className="discover-page"
      ref={pageRef}
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated web background */}
      <div className="discover-web-bg">
        <svg className="discover-web-svg" viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice">
          {[60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720].map(r => (
            <circle key={r} cx="600" cy="0" r={r} fill="none" stroke="rgba(230,36,41,0.04)" strokeWidth="0.8" />
          ))}
          {[...Array(16)].map((_, i) => (
            <line key={i} x1="600" y1="0" x2={600 + 900 * Math.cos((i * Math.PI) / 8)} y2={900 * Math.sin((i * Math.PI) / 8)} stroke="rgba(230,36,41,0.03)" strokeWidth="0.6" />
          ))}
        </svg>
      </div>

      {/* Click web shoots */}
      <AnimatePresence>
        {webLines.map(w => (
          <motion.svg key={w.id} className="web-shoot-line" style={{ position: "absolute", left: w.x, top: w.y, zIndex: 10, pointerEvents: "none" }} width="200" height="200" viewBox="-100 -100 200 200"
            initial={{ opacity: 0.9, scale: 0 }} animate={{ opacity: 0, scale: 1 }} exit={{}} transition={{ duration: 0.9, ease: "easeOut" }}>
            {[w.angle - 25, w.angle, w.angle + 25, w.angle - 50, w.angle + 50].map((a, i) => (
              <line key={i} x1="0" y1="0" x2={90 * Math.cos(a * Math.PI / 180)} y2={90 * Math.sin(a * Math.PI / 180)} stroke="rgba(255,255,255,0.7)" strokeWidth={i === 1 ? 1.5 : 0.8} />
            ))}
            {[25, 55, 85].map(r => (
              <circle key={r} cx="0" cy="0" r={r} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
            ))}
          </motion.svg>
        ))}
      </AnimatePresence>

      {/* Header */}
      <div className="discover-header">
        <motion.button className="discover-back" onClick={(e) => { e.stopPropagation(); onBack(); }}
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <span className="back-arrow">←</span>
          <span>BACK</span>
        </motion.button>

        <motion.div className="discover-title-block"
          initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
          <div className="discover-eyebrow">
            <span className="eyebrow-dot" /><span className="eyebrow-line" />
            <span>MARVEL UNIVERSE — THE COMPLETE STORY</span>
            <span className="eyebrow-line" />
          </div>
          <h1 className="discover-main-title">DISCOVER THE <span className="discover-red">LEGEND</span></h1>
          <p className="discover-subtitle">The definitive archive of Earth's most beloved hero</p>
        </motion.div>

        <div className="discover-header-spider">
          <svg width="80" height="80" viewBox="-40 -40 80 80">
            <SpiderSVG x={0} y={0} rotation={0} legPhase={Date.now() * 0.003} size={1.4} opacity={0.7} />
          </svg>
        </div>
      </div>

      {/* Sections */}
      <div className="discover-sections">
        {sections.map((sec, idx) => (
          <motion.div
            key={sec.id}
            className={`discover-section ${activeSection === sec.id ? "active" : ""}`}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + idx * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => { e.stopPropagation(); setActiveSection(activeSection === sec.id ? null : sec.id); }}
          >
            <div className="section-header">
              <div className="section-num" style={{ color: sec.color }}>{sec.label}</div>
              <div className="section-title-block">
                <span className="section-icon">{sec.icon}</span>
                <div>
                  <h2 className="section-title">{sec.title}</h2>
                  <p className="section-subtitle">{sec.subtitle}</p>
                </div>
              </div>
              <div className="section-toggle" style={{ borderColor: sec.color, color: sec.color }}>
                {activeSection === sec.id ? "−" : "+"}
              </div>
            </div>

            <AnimatePresence>
              {activeSection === sec.id && (
                <motion.div className="section-body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                  <div className="section-body-inner">
                    <p className="section-content">{sec.content}</p>
                    {sec.detail && <p className="section-detail">{sec.detail}</p>}
                    {sec.quote && (
                      <div className="section-quote">
                        <div className="quote-mark">"</div>
                        <blockquote>{sec.quote}</blockquote>
                        <cite>— {sec.quoteBy}</cite>
                      </div>
                    )}
                    {sec.stats && (
                      <div className="section-stats">
                        {sec.stats.map(s => (
                          <div key={s.label} className="power-stat">
                            <div className="power-stat-top">
                              <span className="power-label">{s.label}</span>
                              <span className="power-value">{s.value}</span>
                            </div>
                            <div className="power-bar-bg">
                              <motion.div className="power-bar-fill" style={{ background: sec.color }}
                                initial={{ width: 0 }} animate={{ width: `${s.bar}%` }} transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {sec.villains && (
                      <div className="villain-grid">
                        {sec.villains.map(v => (
                          <div key={v.name} className="villain-card" style={{ borderColor: v.color }}>
                            <div className="villain-name" style={{ color: v.color === "#111" ? "#666" : v.color }}>{v.name}</div>
                            <div className="villain-desc">{v.desc}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {sec.milestones && (
                      <div className="timeline">
                        {sec.milestones.map((m, i) => (
                          <motion.div key={m.year} className="timeline-item"
                            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                            <div className="timeline-year">{m.year}</div>
                            <div className="timeline-dot" />
                            <div className="timeline-event">{m.event}</div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="section-slash" style={{ background: `linear-gradient(90deg, ${sec.color}, transparent)` }} />
          </motion.div>
        ))}
      </div>

      {/* Footer quote */}
      <motion.div className="discover-footer"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}>
        <div className="footer-web-line" />
        <p className="footer-quote">"Whatever life holds in store for me, I will never forget these words:<br /><em>With great power, comes great responsibility.</em>"</p>
        <p className="footer-credit">STAN LEE · STEVE DITKO · 1962</p>
        <div className="footer-web-corner">
          <WebCorner />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Hero ─────────────────────────────────────────────────────────────────
export default function Hero() {
  const ref = useRef(null);
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);
  const [webLines, setWebLines] = useState([]);
  const [glitchActive, setGlitchActive] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [showDiscover, setShowDiscover] = useState(false);

  // Spider crawl state
  const spiderStateRef = useRef({
    x: 0, y: 100,
    vx: 0.8, vy: 0.3,
    angle: 90,
    legPhase: 0,
    mode: "crawl", // crawl | rappel | corner
    rappelY: 0,
    rappelX: 0,
    rappelActive: false,
    cornerTimer: 0,
    trail: [],
    webAnchorX: 0,
    webAnchorY: 0,
    swingAngle: 0,
  });
  const spiderAnimRef = useRef(null);
  const spiderCanvasRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Glitch
  useEffect(() => {
    const cycle = () => { setGlitchActive(true); setTimeout(() => setGlitchActive(false), 400); };
    const id = setInterval(cycle, 4000);
    setTimeout(cycle, 1800);
    return () => clearInterval(id);
  }, []);

  // Custom cursor
  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;
    const move = (e) => { el.style.left = e.clientX + "px"; el.style.top = e.clientY + "px"; };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Web shoot on click
  const handleWebShoot = (e) => {
    if (showDiscover) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setWebLines(prev => [...prev.slice(-6), { id, x, y, angle: Math.random() * 60 - 30 }]);
    setTimeout(() => setWebLines(prev => prev.filter(w => w.id !== id)), 1200);
  };

  // ─── Spider Crawl Animation ───────────────────────────────────────────────
  useEffect(() => {
    const canvas = spiderCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const s = spiderStateRef.current;
      if (s.x === 0 && s.y === 100) {
        s.x = canvas.width * 0.1;
        s.y = canvas.height * 0.1;
        s.webAnchorX = s.x;
        s.webAnchorY = 0;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const drawSpider = (s) => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Draw web trail (faint thread behind spider)
      if (s.trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(s.trail[0].x, s.trail[0].y);
        for (let i = 1; i < s.trail.length; i++) {
          ctx.lineTo(s.trail[i].x, s.trail[i].y);
        }
        ctx.strokeStyle = "rgba(255,255,255,0.06)";
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      // Draw rappel thread if swinging/rappelling
      if (s.mode === "rappel") {
        ctx.beginPath();
        ctx.moveTo(s.webAnchorX, s.webAnchorY);
        // Bezier for natural droop
        const cpx = (s.webAnchorX + s.x) * 0.5 + Math.sin(s.swingAngle * 0.5) * 20;
        const cpy = (s.webAnchorY + s.y) * 0.5;
        ctx.quadraticCurveTo(cpx, cpy, s.x, s.y);
        ctx.strokeStyle = "rgba(255,255,255,0.22)";
        ctx.lineWidth = 0.8;
        ctx.setLineDash([]);
        ctx.stroke();
        // Droplets on thread
        for (let t = 0.15; t < 0.9; t += 0.18) {
          const rx = s.webAnchorX + (s.x - s.webAnchorX) * t;
          const ry = s.webAnchorY + (s.y - s.webAnchorY) * t;
          ctx.beginPath();
          ctx.arc(rx, ry, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(180,210,255,0.45)";
          ctx.fill();
        }
      }

      // Draw the spider using SVG-like canvas commands
      const { x, y, angle, legPhase, mode } = s;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((angle * Math.PI) / 180);

      const lp = legPhase;
      const legAnim = (i) => Math.sin(lp + i * 0.78) * (mode === "rappel" ? 8 : 5);

      const legs = [
        { sx: 4, sy: -6, cp1x: 18 + legAnim(0), cp1y: -16 + legAnim(0), ex: 26 + legAnim(0), ey: -8 + legAnim(0) },
        { sx: 4, sy: -2, cp1x: 19 + legAnim(1), cp1y: -6 + legAnim(1), ex: 30 + legAnim(1), ey: 3 + legAnim(1) },
        { sx: 3, sy: 3, cp1x: 17 + legAnim(2), cp1y: 9 + legAnim(2), ex: 26 + legAnim(2), ey: 16 + legAnim(2) },
        { sx: 2, sy: 7, cp1x: 13 + legAnim(3), cp1y: 19 + legAnim(3), ex: 18 + legAnim(3), ey: 27 + legAnim(3) },
        { sx: -4, sy: -6, cp1x: -18 - legAnim(4), cp1y: -16 + legAnim(4), ex: -26 - legAnim(4), ey: -8 + legAnim(4) },
        { sx: -4, sy: -2, cp1x: -19 - legAnim(5), cp1y: -6 + legAnim(5), ex: -30 - legAnim(5), ey: 3 + legAnim(5) },
        { sx: -3, sy: 3, cp1x: -17 - legAnim(6), cp1y: 9 + legAnim(6), ex: -26 - legAnim(6), ey: 16 + legAnim(6) },
        { sx: -2, sy: 7, cp1x: -13 - legAnim(7), cp1y: 19 + legAnim(7), ex: -18 - legAnim(7), ey: 27 + legAnim(7) },
      ];

      // Leg shadows
      legs.forEach(leg => {
        ctx.beginPath();
        ctx.moveTo(leg.sx + 1, leg.sy + 1);
        ctx.quadraticCurveTo(leg.cp1x + 1, leg.cp1y + 1, leg.ex + 1, leg.ey + 1);
        ctx.strokeStyle = "rgba(0,0,0,0.3)";
        ctx.lineWidth = 2.2;
        ctx.stroke();
      });

      // Legs main
      legs.forEach(leg => {
        ctx.beginPath();
        ctx.moveTo(leg.sx, leg.sy);
        ctx.quadraticCurveTo(leg.cp1x, leg.cp1y, leg.ex, leg.ey);
        ctx.strokeStyle = "#160000";
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        ctx.stroke();
        // Leg sheen
        ctx.strokeStyle = "rgba(120,0,0,0.25)";
        ctx.lineWidth = 0.7;
        ctx.stroke();
      });

      // Abdomen shadow
      ctx.beginPath();
      ctx.ellipse(1.5, 10, 8, 11, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.fill();

      // Abdomen
      const abdGrad = ctx.createRadialGradient(-2, 4, 1, 0, 8, 12);
      abdGrad.addColorStop(0, "#2a0000");
      abdGrad.addColorStop(0.5, "#0d0000");
      abdGrad.addColorStop(1, "#050000");
      ctx.beginPath();
      ctx.ellipse(0, 8, 8, 11, 0, 0, Math.PI * 2);
      ctx.fillStyle = abdGrad;
      ctx.fill();

      // Abdomen web pattern lines
      ctx.strokeStyle = "rgba(230,36,41,0.18)";
      ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.moveTo(0, -1); ctx.lineTo(0, 19); ctx.stroke();
      for (let r of [4, 8, 12, 16]) {
        ctx.beginPath();
        ctx.arc(0, 8, r, -Math.PI * 0.6, Math.PI * 1.6);
        ctx.stroke();
      }

      // Red hourglass
      ctx.fillStyle = "rgba(230,36,41,0.9)";
      ctx.beginPath();
      ctx.moveTo(-2.5, 4); ctx.lineTo(2.5, 4); ctx.lineTo(1.8, 9); ctx.lineTo(-1.8, 9);
      ctx.closePath(); ctx.fill();
      ctx.beginPath();
      ctx.ellipse(0, 16, 2.5, 1.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(230,36,41,0.35)";
      ctx.fill();

      // Cephalothorax
      const cthGrad = ctx.createRadialGradient(-1.5, -6, 1, 0, -5, 8);
      cthGrad.addColorStop(0, "#222");
      cthGrad.addColorStop(1, "#080808");
      ctx.beginPath();
      ctx.ellipse(0, -5, 6, 7, 0, 0, Math.PI * 2);
      ctx.fillStyle = cthGrad;
      ctx.fill();
      // Sheen
      ctx.beginPath();
      ctx.ellipse(-2, -7, 2, 3.5, -0.4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.05)";
      ctx.fill();

      // Head
      ctx.beginPath();
      ctx.ellipse(0, -12, 4.5, 4, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#111";
      ctx.fill();

      // Eyes glow
      const eyePositions = [
        [-3, -14, 1.1], [-1, -15.5, 0.9], [1, -15.5, 0.9], [3, -14, 1.1],
        [-2.5, -12.5, 0.65], [2.5, -12.5, 0.65],
      ];
      eyePositions.forEach(([ex, ey, er]) => {
        const glow = ctx.createRadialGradient(ex, ey, 0, ex, ey, er * 2);
        glow.addColorStop(0, "rgba(230,36,41,0.9)");
        glow.addColorStop(0.5, "rgba(180,0,0,0.5)");
        glow.addColorStop(1, "rgba(230,36,41,0)");
        ctx.beginPath();
        ctx.arc(ex, ey, er * 2, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(ex, ey, er, 0, Math.PI * 2);
        ctx.fillStyle = "#e62429";
        ctx.fill();
      });

      // Fangs
      ctx.strokeStyle = "#330000";
      ctx.lineWidth = 1.3;
      ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(-2, -17); ctx.quadraticCurveTo(-3.5, -20, -2.5, -22); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(2, -17); ctx.quadraticCurveTo(3.5, -20, 2.5, -22); ctx.stroke();

      ctx.restore();
    };

    let t = 0;
    const animate = () => {
      const W = canvas.width, H = canvas.height;
      const s = spiderStateRef.current;
      t += 0.016;

      // Update leg animation
      const speed = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
      s.legPhase += speed * 0.25 + 0.04;

      // --- Behavior state machine ---
      if (s.mode === "crawl") {
        // Move
        s.x += s.vx;
        s.y += s.vy;

        // Wander steering
        const wander = (Math.random() - 0.5) * 0.15;
        s.vx += wander;
        s.vy += (Math.random() - 0.5) * 0.15;

        // Soft speed cap
        const spd = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
        if (spd > 2.2) { s.vx *= 2.2 / spd; s.vy *= 2.2 / spd; }
        if (spd < 0.5) { s.vx *= 1.3; s.vy *= 1.3; }

        // Calculate heading angle (spider faces direction of travel)
        s.angle = (Math.atan2(s.vy, s.vx) * 180) / Math.PI + 90;

        // Wall bounce / rappel trigger
        const margin = 50;
        if (s.x < margin) {
          s.vx = Math.abs(s.vx) + 0.5;
          s.angle = 90;
        }
        if (s.x > W - margin) {
          // Trigger rappel from right edge
          s.mode = "rappel";
          s.webAnchorX = s.x;
          s.webAnchorY = 0;
          s.swingAngle = 0.3;
          s.rappelLength = s.y;
        }
        if (s.y < margin) { s.vy = Math.abs(s.vy) + 0.3; }
        if (s.y > H - margin) { s.vy = -(Math.abs(s.vy) + 0.5); }

        // Occasionally trigger rappel
        if (Math.random() < 0.003 && s.y > H * 0.3 && s.y < H * 0.7) {
          s.mode = "rappel";
          s.webAnchorX = s.x;
          s.webAnchorY = Math.random() * s.y * 0.3;
          s.swingAngle = (Math.random() - 0.5) * 0.8;
          s.rappelLength = s.y - s.webAnchorY;
        }

        // Add to trail
        s.trail.push({ x: s.x, y: s.y });
        if (s.trail.length > 40) s.trail.shift();

      } else if (s.mode === "rappel") {
        // Pendulum physics
        const gravity = 0.004;
        s.swingAngle += gravity * Math.sin(s.swingAngle) * -1;
        s.swingAngle *= 0.995; // dampen

        const ropeLen = s.rappelLength || 200;
        s.x = s.webAnchorX + Math.sin(s.swingAngle) * ropeLen;
        s.y = s.webAnchorY + Math.cos(s.swingAngle) * ropeLen;

        // Spider faces "down" (toward gravity)
        s.angle = (s.swingAngle * 180) / Math.PI;

        // Extend rope slowly (rappelling down)
        s.rappelLength = Math.min((s.rappelLength || 200) + 0.6, H * 0.85 - s.webAnchorY);

        // End rappel when near floor or after enough time
        if (s.y > H - 80 || (Math.abs(s.swingAngle) < 0.05 && s.rappelLength > 150)) {
          s.mode = "crawl";
          s.vx = Math.sin(s.swingAngle) * 2.5 + 0.5;
          s.vy = -0.5;
          s.trail = [];
        }

        // Clamp to screen
        s.x = Math.max(20, Math.min(W - 20, s.x));
        s.y = Math.max(20, Math.min(H - 20, s.y));
      }

      drawSpider(s);
      spiderAnimRef.current = requestAnimationFrame(animate);
    };

    spiderAnimRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(spiderAnimRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Main canvas (background)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf, t = 0;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const rainDrops = Array.from({ length: 220 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      len: Math.random() * 18 + 6, speed: Math.random() * 6 + 4,
      alpha: Math.random() * 0.25 + 0.05, width: Math.random() * 0.8 + 0.3,
    }));

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.2 + 0.3, alpha: Math.random() * 0.4 + 0.08,
    }));

    const buildings = [
      { x: 0, w: 90, h: 340 }, { x: 80, w: 55, h: 270 }, { x: 125, w: 110, h: 430 },
      { x: 225, w: 55, h: 230 }, { x: 270, w: 95, h: 370 }, { x: 355, w: 75, h: 295 },
      { x: 420, w: 130, h: 455 }, { x: 540, w: 65, h: 250 }, { x: 595, w: 105, h: 400 },
      { x: 690, w: 85, h: 315 }, { x: 765, w: 150, h: 480 }, { x: 905, w: 75, h: 275 },
      { x: 970, w: 95, h: 360 }, { x: 1055, w: 65, h: 215 }, { x: 1110, w: 120, h: 415 },
      { x: 1220, w: 85, h: 330 }, { x: 1295, w: 155, h: 490 }, { x: 1440, w: 95, h: 300 },
      { x: 1525, w: 75, h: 370 }, { x: 1590, w: 130, h: 445 },
    ];

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      t += 0.01;
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, "#020508"); sky.addColorStop(0.3, "#04091a");
      sky.addColorStop(0.7, "#080412"); sky.addColorStop(1, "#0d0608");
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
      for (let i = 0; i < 5; i++) {
        const cx = ((i * 280 + t * 8) % (W + 200)) - 100, cy = 60 + i * 25;
        const cr = ctx.createRadialGradient(cx, cy, 10, cx, cy, 120);
        cr.addColorStop(0, `rgba(30,20,40,${0.5 + Math.sin(t + i) * 0.1})`); cr.addColorStop(1, "transparent");
        ctx.fillStyle = cr; ctx.beginPath(); ctx.arc(cx, cy, 120, 0, Math.PI * 2); ctx.fill();
      }
      for (let i = 0; i < 60; i++) {
        const sx = (i * 137.5) % W, sy = (i * 53.7) % (H * 0.4), ss = Math.sin(t * 1.5 + i) * 0.4 + 0.6;
        ctx.globalAlpha = ss * 0.25; ctx.fillStyle = "#fff";
        ctx.beginPath(); ctx.arc(sx, sy, 0.7, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      buildings.forEach((b) => {
        const bx = b.x % (W + 200), by = H - b.h;
        const cols = Math.floor((b.w - 16) / 12), floors = Math.floor(b.h / 22);
        const bg = ctx.createLinearGradient(bx, by, bx, H);
        bg.addColorStop(0, "rgba(12,18,38,0.85)"); bg.addColorStop(0.5, "rgba(8,12,25,0.85)"); bg.addColorStop(1, "rgba(4,6,14,0.85)");
        ctx.fillStyle = bg; ctx.fillRect(bx, by, b.w, b.h);
        ctx.fillStyle = "rgba(41,82,204,0.08)"; ctx.fillRect(bx, by, 2, b.h); ctx.fillRect(bx + b.w - 2, by, 2, b.h);
        for (let row = 0; row < floors; row++) {
          for (let col = 0; col < cols; col++) {
            const wx = bx + 8 + col * 12, wy = by + 14 + row * 22;
            const flicker = Math.sin(t * 0.5 + row * 1.9 + col * 2.7 + bx * 0.02);
            if (flicker > 0.05) {
              const warmth = Math.random();
              const r = warmth > 0.6 ? 240 : warmth > 0.3 ? 200 : 255;
              const g = warmth > 0.6 ? 200 : warmth > 0.3 ? 160 : 220;
              const b2 = warmth > 0.6 ? 100 : warmth > 0.3 ? 80 : 80;
              ctx.fillStyle = `rgba(${r},${g},${b2},${0.45 + flicker * 0.25})`;
              ctx.fillRect(wx, wy, 7, 10);
            }
          }
        }
      });
      const groundFog = ctx.createLinearGradient(0, H - 120, 0, H);
      groundFog.addColorStop(0, "transparent"); groundFog.addColorStop(0.4, "rgba(13,27,75,0.12)"); groundFog.addColorStop(1, "rgba(5,8,16,0.7)");
      ctx.fillStyle = groundFog; ctx.fillRect(0, H - 120, W, 120);
      for (let i = 0; i < 4; i++) {
        const px = (i * 320 + 80) % W;
        const pr = ctx.createRadialGradient(px, H - 10, 0, px, H - 10, 80);
        pr.addColorStop(0, "rgba(230,36,41,0.12)"); pr.addColorStop(0.5, "rgba(41,82,204,0.06)"); pr.addColorStop(1, "transparent");
        ctx.fillStyle = pr; ctx.beginPath(); ctx.ellipse(px, H - 10, 80, 15, 0, 0, Math.PI * 2); ctx.fill();
      }
      ctx.save();
      rainDrops.forEach(drop => {
        drop.y += drop.speed; drop.x -= drop.speed * 0.25;
        if (drop.y > H) { drop.y = -20; drop.x = Math.random() * W; }
        if (drop.x < 0) drop.x = W;
        ctx.beginPath(); ctx.moveTo(drop.x, drop.y); ctx.lineTo(drop.x - drop.len * 0.22, drop.y + drop.len);
        ctx.strokeStyle = `rgba(180,210,255,${drop.alpha})`; ctx.lineWidth = drop.width; ctx.stroke();
      });
      ctx.restore();
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      });
      particles.forEach((p, i) => {
        particles.forEach((p2, j) => {
          if (j <= i) return;
          const dx = p2.x - p.x, dy = p2.y - p.y, dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(230,36,41,${(1 - dist / 130) * 0.12})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        });
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230,36,41,${p.alpha})`; ctx.fill();
      });
      if (Math.sin(t * 7.3) > 0.985) { ctx.fillStyle = "rgba(180,200,255,0.04)"; ctx.fillRect(0, 0, W, H); }
      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.85);
      vig.addColorStop(0, "transparent"); vig.addColorStop(1, "rgba(0,0,0,0.65)");
      ctx.fillStyle = vig; ctx.fillRect(0, 0, W, H);
      const bloom = ctx.createRadialGradient(W * 0.28, H * 0.6, 0, W * 0.28, H * 0.6, H * 0.5);
      bloom.addColorStop(0, "rgba(230,36,41,0.04)"); bloom.addColorStop(1, "transparent");
      ctx.fillStyle = bloom; ctx.fillRect(0, 0, W, H);
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <>
      <AnimatePresence>
        {showDiscover && (
          <DiscoverPage onBack={() => setShowDiscover(false)} />
        )}
      </AnimatePresence>

      <section className={`hero ${showDiscover ? "hero-hidden" : ""}`} id="home" ref={ref} onClick={handleWebShoot}>
        {/* Custom cursor */}
        <div className="web-cursor" ref={cursorRef}>
          <svg width="28" height="28" viewBox="0 0 28 28">
            <circle cx="14" cy="14" r="3" fill="#e62429" />
            {[0, 45, 90, 135].map(a => (
              <line key={a} x1="14" y1="14" x2={14 + 11 * Math.cos(a * Math.PI / 180)} y2={14 + 11 * Math.sin(a * Math.PI / 180)} stroke="rgba(230,36,41,0.6)" strokeWidth="0.8" />
            ))}
            <circle cx="14" cy="14" r="11" fill="none" stroke="rgba(230,36,41,0.25)" strokeWidth="0.8" />
          </svg>
        </div>

        {/* Click web shoots */}
        <AnimatePresence>
          {webLines.map(w => (
            <motion.svg key={w.id} className="web-shoot-line" style={{ position: "absolute", left: w.x, top: w.y, zIndex: 10, pointerEvents: "none" }} width="200" height="200" viewBox="-100 -100 200 200"
              initial={{ opacity: 0.9, scale: 0 }} animate={{ opacity: 0, scale: 1 }} exit={{}} transition={{ duration: 0.9, ease: "easeOut" }}>
              {[w.angle - 25, w.angle, w.angle + 25, w.angle - 50, w.angle + 50].map((a, i) => (
                <line key={i} x1="0" y1="0" x2={90 * Math.cos(a * Math.PI / 180)} y2={90 * Math.sin(a * Math.PI / 180)} stroke="rgba(255,255,255,0.7)" strokeWidth={i === 1 ? 1.5 : 0.8} />
              ))}
              {[25, 55, 85].map(r => (
                <circle key={r} cx="0" cy="0" r={r} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
              ))}
            </motion.svg>
          ))}
        </AnimatePresence>

        {/* Canvas background */}
        <motion.div className="hero-bg" style={{ scale }}>
          <canvas ref={canvasRef} className="hero-canvas" />
        </motion.div>

        {/* Realistic Spider Canvas — on top of everything */}
        <canvas ref={spiderCanvasRef} className="spider-crawl-canvas" />

        {/* Diagonal panel overlay */}
        <div className="hero-diagonal-panel" />

        {/* Spider-Man character image */}
        <motion.div className="spiderman-img-wrap" style={{ y: imgY }}>
          <motion.img
            src={SPIDERMAN_IMG2} alt="Spider-Man"
            className={`spiderman-img ${imgLoaded ? "loaded" : ""}`}
            onLoad={() => setImgLoaded(true)}
            onError={(e) => { e.target.src = SPIDERMAN_IMG; }}
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            animate={{ opacity: imgLoaded ? 1 : 0, x: 0, scale: 1 }}
            transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="spiderman-glow" />
          <svg className="spiderman-web-lines" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
            <g stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" fill="none">
              <line x1="200" y1="100" x2="400" y2="0" />
              <line x1="200" y1="100" x2="420" y2="80" />
              <line x1="200" y1="100" x2="410" y2="160" />
              {[60, 120, 180, 240].map(r => <ellipse key={r} cx="200" cy="100" rx={r * 0.7} ry={r * 0.4} />)}
            </g>
          </svg>
        </motion.div>

        {/* Main content */}
        <motion.div className="hero-content" style={{ y, opacity }}>
          <motion.div className="hero-eyebrow" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
            <span className="eyebrow-dot" /><span className="eyebrow-line" />
            <span>MARVEL UNIVERSE — NEW YORK CITY</span>
            <span className="eyebrow-line" />
          </motion.div>

          <div className="hero-title-wrap">
            {["YOUR", "FRIENDLY", "NAVI"].map((word, i) => (
              <motion.div key={word} className={`title-line-wrap ${word === "FRIENDLY" ? "accent-wrap" : ""}`}
                initial={{ opacity: 0, x: -80 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
                <span className={`title-line ${word === "FRIENDLY" ? "accent" : ""} ${glitchActive && word === "FRIENDLY" ? "glitch" : ""}`} data-text={word}>{word}</span>
              </motion.div>
            ))}
          </div>

          <motion.div className="hero-name"
            initial={{ opacity: 0, scale: 0.75, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            <span className={`hero-name-text ${glitchActive ? "glitch" : ""}`} data-text="SPIDER-MAN">SPIDER-MAN</span>
          </motion.div>

          <motion.p className="hero-sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.8 }}>
            Peter Parker. Photographer. Student. Hero.<br />
            <em>Protecting the city that never sleeps.</em>
          </motion.p>

          <motion.div className="hero-actions" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.7 }}>
            <button className="btn-primary" onClick={(e) => { e.stopPropagation(); setShowDiscover(true); }}>
              <span className="btn-bg" />
              <span className="btn-text">DISCOVER THE LEGEND</span>
              <span className="btn-corner btn-corner--tl" />
              <span className="btn-corner btn-corner--br" />
            </button>
            <a href="https://youtu.be/aBlsrtxuwss?si=uF6_97vWvNd7EMWz" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <span className="play-icon">▶</span>
              WATCH TRAILER
            </a>
          </motion.div>

          <motion.div className="hero-stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
            {[["800+", "Issues Published"], ["60+", "Years of History"], ["15+", "Major Villains"]].map(([n, l], i) => (
              <motion.div className="stat" key={l} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.9 + i * 0.1 }}>
                <span className="stat-n">{n}</span>
                <span className="stat-l">{l}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div className="hero-scroll" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>
          <div className="scroll-line" />
          <span>SCROLL</span>
        </motion.div>

        {/* Web corners */}
        <div className="web-corner top-left"><WebCorner /></div>
        <div className="web-corner top-right" style={{ transform: "scaleX(-1)" }}><WebCorner /></div>

        <div className="hero-slash" />
      </section>
    </>
  );
}

function WebCorner() {
  return (
    <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
      {[35, 70, 105, 140, 175].map(r => (
        <path key={r} d={`M 0 0 Q ${r * 0.55} ${r * 1.1} ${r} ${r}`} stroke="#e62429" strokeWidth="0.8" fill="none" opacity={0.15 + r * 0.001} />
      ))}
      {[...Array(7)].map((_, i) => (
        <line key={i} x1="0" y1="0" x2={220 * Math.cos((i * Math.PI) / 14)} y2={220 * Math.sin((i * Math.PI) / 14)} stroke="#e62429" strokeWidth="0.7" opacity="0.2" />
      ))}
    </svg>
  );
}