import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import "./Gallery.css";

const quotes = [
  { text: "Whatever life holds in store for me, I will never forget these words: with great power comes great responsibility.", issue: "Amazing Fantasy #15" },
  { text: "I'm Spider-Man. I don't know what you're expecting, but I'm always late.", issue: "Amazing Spider-Man #2" },
  { text: "No man can win every battle, but no man should fall without a struggle.", issue: "Amazing Spider-Man #33" },
];

const facts = [
  { n: "1962", l: "First Appearance" },
  { n: "13K+", l: "Comic Issues" },
  { n: "4", l: "Spider-Suits in MCU" },
  { n: "$25B", l: "Franchise Value" },
];

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section className="gallery" id="gallery" ref={ref}>
      {/* Parallax web background */}
      <motion.div className="gallery-bg" style={{ y: bgY }}>
        <FullWebSVG />
      </motion.div>

      <div className="gallery-inner">
        <motion.div
          className="gallery-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="section-label">Iconic Moments</p>
          <h2 className="section-title">THE <span className="text-red">LEGACY</span></h2>
        </motion.div>

        {/* Facts strip */}
        <motion.div
          className="facts-strip"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          {facts.map((f, i) => (
            <motion.div
              key={f.l}
              className="fact-item"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <span className="fact-n">{f.n}</span>
              <span className="fact-l">{f.l}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Mosaic grid */}
        <div className="mosaic">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              className={`mosaic-cell cell-${i}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.6 }}
              whileHover={{ scale: 1.03, zIndex: 10 }}
            >
              <MosaicContent index={i} />
            </motion.div>
          ))}
        </div>

        {/* Quotes */}
        <div className="quotes-row">
          {quotes.map((q, i) => (
            <motion.div
              key={i}
              className="quote-block"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.15 }}
            >
              <div className="quote-mark">"</div>
              <p className="quote-text">{q.text}</p>
              <span className="quote-source">— {q.issue}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MosaicContent({ index }) {
  const configs = [
    { bg: "#0d1b4b", content: "AMAZING\nSPIDER-MAN", type: "text", accent: "#e62429" },
    { bg: "#1a0505", content: "WEB OF\nSHADOWS", type: "text", accent: "#e62429" },
    { bg: "#0a0a0a", content: "🕷️", type: "emoji", size: "4rem" },
    { bg: "#050d1e", content: "MARVEL\nCOMICS", type: "text", accent: "#2952cc" },
    { bg: "#e62429", content: "PETER\nPARKER", type: "text", accent: "#fff" },
    { bg: "#0d1b4b", content: "🕸️", type: "emoji", size: "3rem" },
    { bg: "#1a0505", content: "SINCE\n1962", type: "text", accent: "#f5c842" },
    { bg: "#080d20", content: "INTO THE\nSPIDERVERSE", type: "text", accent: "#ff6b9d" },
    { bg: "#0d0d0d", content: "⚡", type: "emoji", size: "3.5rem" },
  ];
  const c = configs[index] || configs[0];
  return (
    <div className="mc-inner" style={{ background: c.bg }}>
      {c.type === "emoji"
        ? <span style={{ fontSize: c.size }}>{c.content}</span>
        : <span className="mc-text" style={{ color: c.accent }}>{c.content}</span>
      }
      <div className="mc-overlay" />
    </div>
  );
}

function FullWebSVG() {
  const cx = 600, cy = 400;
  const rings = [80, 160, 240, 320, 400];
  const spokes = 12;
  return (
    <svg viewBox="0 0 1200 800" className="web-svg-full" preserveAspectRatio="xMidYMid slice">
      {rings.map(r => (
        [...Array(spokes)].map((_, i) => (
          <line key={`${r}-${i}`}
            x1={cx + r * Math.cos((i * Math.PI * 2) / spokes)}
            y1={cy + r * Math.sin((i * Math.PI * 2) / spokes)}
            x2={cx + r * Math.cos(((i + 1) * Math.PI * 2) / spokes)}
            y2={cy + r * Math.sin(((i + 1) * Math.PI * 2) / spokes)}
            stroke="#e62429" strokeWidth="0.8"
          />
        ))
      ))}
      {[...Array(spokes)].map((_, i) => (
        <line key={`s${i}`}
          x1={cx} y1={cy}
          x2={cx + 400 * Math.cos((i * Math.PI * 2) / spokes)}
          y2={cy + 400 * Math.sin((i * Math.PI * 2) / spokes)}
          stroke="#e62429" strokeWidth="0.6"
        />
      ))}
    </svg>
  );
}
