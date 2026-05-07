import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import "./Powers.css";

const powers = [
  {
    icon: "🕷️",
    name: "SPIDER-SENSE",
    level: 95,
    desc: "A precognitive sixth sense that warns Peter of incoming danger milliseconds before impact.",
    color: "#e62429",
    tag: "PERCEPTION",
    particles: 8,
  },
  {
    icon: "💪",
    name: "SUPER STRENGTH",
    level: 88,
    desc: "Can lift up to 10 tons and bench press heavy vehicles with ease.",
    color: "#2952cc",
    tag: "PHYSICAL",
    particles: 6,
  },
  {
    icon: "🕸️",
    name: "WEB-SLINGING",
    level: 100,
    desc: "Homemade web-shooters fire tensile-strength polymer webs at 90 mph.",
    color: "#e62429",
    tag: "SIGNATURE",
    particles: 10,
  },
  {
    icon: "🧲",
    name: "WALL-CRAWLING",
    level: 98,
    desc: "Microscopic hairs on hands and feet create molecular adhesion to any surface.",
    color: "#f5c842",
    tag: "MOBILITY",
    particles: 7,
  },
  {
    icon: "⚡",
    name: "AGILITY & SPEED",
    level: 92,
    desc: "Reaction time 40× faster than an Olympic athlete. Moves at superhuman velocity.",
    color: "#2952cc",
    tag: "PHYSICAL",
    particles: 9,
  },
  {
    icon: "🧬",
    name: "HEALING FACTOR",
    level: 80,
    desc: "Minor injuries heal within hours. Immune to most toxins and diseases.",
    color: "#39a839",
    tag: "BIOLOGY",
    particles: 5,
  },
];

function WebParticles({ color, count }) {
  return (
    <div className="web-particles" aria-hidden="true">
      {[...Array(count)].map((_, i) => (
        <span key={i} className="web-particle" style={{ "--p-color": color, "--p-delay": `${i * 0.12}s`, "--p-x": `${Math.random() * 100}%`, "--p-dur": `${1.2 + Math.random() * 0.8}s` }} />
      ))}
    </div>
  );
}

function RadarRing({ level, color }) {
  const circumference = 2 * Math.PI * 36;
  return (
    <div className="radar-ring">
      <svg viewBox="0 0 80 80" width="80" height="80">
        <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
        <motion.circle
          cx="40" cy="40" r="36"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (circumference * level) / 100 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
          style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
          filter={`drop-shadow(0 0 6px ${color})`}
        />
        <text x="40" y="45" textAnchor="middle" fill="white" fontSize="14" fontFamily="'Bebas Neue', sans-serif" letterSpacing="1">{level}</text>
      </svg>
    </div>
  );
}

export default function Powers() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(null);
  const [activated, setActivated] = useState(null);

  const handleClick = (i) => {
    setActivated(activated === i ? null : i);
  };

  return (
    <section className="powers" id="powers" ref={ref}>
      {/* Animated web grid background */}
      <div className="powers-web-grid" aria-hidden="true">
        <svg className="web-grid-svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="webgrid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(230,36,41,0.04)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#webgrid)" />
        </svg>
        <div className="powers-radial-glow" />
        <div className="powers-radial-glow powers-radial-glow--blue" />
      </div>

      {/* Spider web SVG top center decoration */}
      <div className="powers-web-deco" aria-hidden="true">
        <svg viewBox="0 0 300 160" width="300" height="160" xmlns="http://www.w3.org/2000/svg">
          <g stroke="rgba(230,36,41,0.18)" strokeWidth="0.8" fill="none">
            <line x1="150" y1="0" x2="0" y2="160" /><line x1="150" y1="0" x2="50" y2="160" />
            <line x1="150" y1="0" x2="100" y2="160" /><line x1="150" y1="0" x2="150" y2="160" />
            <line x1="150" y1="0" x2="200" y2="160" /><line x1="150" y1="0" x2="250" y2="160" />
            <line x1="150" y1="0" x2="300" y2="160" />
            <ellipse cx="150" cy="0" rx="40" ry="32" /><ellipse cx="150" cy="0" rx="80" ry="64" />
            <ellipse cx="150" cy="0" rx="120" ry="96" /><ellipse cx="150" cy="0" rx="160" ry="128" />
            <ellipse cx="150" cy="0" rx="200" ry="160" />
          </g>
        </svg>
      </div>

      <div className="powers-header">
        <motion.p className="section-label" initial={{ opacity: 0, letterSpacing: "0.2em" }} animate={inView ? { opacity: 1, letterSpacing: "0.5em" } : {}} transition={{ duration: 0.9 }}>
          Abilities & Skills
        </motion.p>
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.8 }}>
          SPIDER<span className="text-outline">-POWERS</span>
        </motion.h2>
        <motion.div className="header-divider" initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ delay: 0.35, duration: 0.8 }} />
        <motion.p className="powers-sub" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.45 }}>
          Biologically enhanced beyond human limits — a perfect fusion of science and instinct.
        </motion.p>
      </div>

      <div className="powers-grid">
        {powers.map((p, i) => (
          <motion.div
            key={p.name}
            className={`power-card ${activated === i ? "activated" : ""}`}
            initial={{ opacity: 0, y: 60, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
            animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -10, scale: 1.025 }}
            style={{ "--card-color": p.color }}
            onHoverStart={() => setHovered(i)}
            onHoverEnd={() => setHovered(null)}
            onClick={() => handleClick(i)}
          >
            {/* Animated web particles on hover */}
            <AnimatePresence>{hovered === i && <WebParticles color={p.color} count={p.particles} />}</AnimatePresence>

            {/* Top accent line */}
            <motion.div className="card-top-line" animate={{ scaleX: hovered === i || activated === i ? 1 : 0 }} transition={{ duration: 0.4 }} />

            {/* Corner web */}
            <div className="card-corner-web" />

            {/* Glow blob */}
            <div className="card-glow" />

            {/* Header row */}
            <div className="card-header-row">
              <div className="card-icon-wrap">
                <motion.div className="card-icon" animate={{ scale: hovered === i ? 1.2 : 1, rotate: hovered === i ? [0, -10, 10, 0] : 0 }} transition={{ duration: 0.5 }}>
                  {p.icon}
                </motion.div>
                <div className="card-icon-ring" />
              </div>
              <RadarRing level={p.level} color={p.color} />
            </div>

            {/* Tag */}
            <div className="card-tag">{p.tag}</div>

            {/* Name */}
            <h3 className="card-name">{p.name}</h3>

            {/* Desc */}
            <p className="card-desc">{p.desc}</p>

            {/* Bar */}
            <div className="card-bar-wrap">
              <div className="card-bar-label">
                <span>POWER LEVEL</span>
                <span className="card-bar-pct">{p.level}%</span>
              </div>
              <div className="card-bar-track">
                <motion.div className="card-bar-fill" initial={{ width: 0 }} animate={inView ? { width: `${p.level}%` } : {}} transition={{ delay: 0.4 + i * 0.1, duration: 1.2, ease: "easeOut" }} />
                <motion.div className="card-bar-shine" initial={{ x: "-100%" }} animate={inView ? { x: "200%" } : {}} transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }} />
              </div>
            </div>

            {/* Activated pulse ring */}
            <AnimatePresence>
              {activated === i && (
                <motion.div className="card-pulse-ring" initial={{ scale: 0.8, opacity: 0.8 }} animate={{ scale: 2.5, opacity: 0 }} exit={{}} transition={{ duration: 0.7 }} />
              )}
            </AnimatePresence>

            {/* Big number watermark */}
            <div className="card-number">0{i + 1}</div>

            {/* Bottom border sweep */}
            <motion.div className="card-bottom-line" animate={{ scaleX: hovered === i || activated === i ? 1 : 0 }} transition={{ duration: 0.4, delay: 0.05 }} />
          </motion.div>
        ))}
      </div>

      {/* Bottom stat bar */}
      <motion.div className="powers-stats-bar" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.9 }}>
        {["STRENGTH", "SPEED", "INTELLIGENCE", "DURABILITY"].map((s, i) => (
          <div key={s} className="stat-item">
            <span className="stat-label">{s}</span>
            <div className="stat-track">
              <motion.div className="stat-fill" initial={{ width: 0 }} animate={inView ? { width: `${[88, 92, 95, 75][i]}%` } : {}} transition={{ delay: 1 + i * 0.15, duration: 1 }} />
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}