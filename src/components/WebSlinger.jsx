import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./WebSlinger.css";

const timeline = [
  { year: "1962", event: "BITTEN BY A RADIOACTIVE SPIDER", desc: "Peter Parker's life changes forever on a school field trip." },
  { year: "1963", event: "UNCLE BEN'S DEATH", desc: "With great power comes great responsibility — a lesson learned in tragedy." },
  { year: "1965", event: "JOINS THE AVENGERS", desc: "Spider-Man proves himself worthy among Earth's mightiest heroes." },
  { year: "1973", event: "THE NIGHT GWEN STACY DIED", desc: "The most devastating loss — and the birth of his greatest resolve." },
  { year: "2000s", event: "THE MULTIVERSE OPENS", desc: "Spider-Men across dimensions unite against a common threat." },
];

export default function WebSlinger() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="webslinger" id="story" ref={ref}>
      <div className="ws-bg">
        <div className="ws-gradient" />
        <AnimatedWebBg />
      </div>

      <div className="ws-content">
        <motion.div
          className="ws-left"
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="section-label">Origin Story</p>
          <h2 className="section-title">THE WEB<br /><span className="text-red">SLINGER</span></h2>
          <p className="ws-desc">
            From a timid Queens teenager to New York's greatest protector. 
            Peter Parker didn't choose to be extraordinary — extraordinary chose him.
            Every swing across Manhattan skyline carries the weight of one simple truth.
          </p>
          <blockquote className="ws-quote">
            <span>"</span>With great power, there must also come great responsibility.<span>"</span>
          </blockquote>
          <div className="ws-tags">
            {["#PeterParker", "#Queens", "#Marvel", "#Avenger"].map(t => (
              <span className="tag" key={t}>{t}</span>
            ))}
          </div>
        </motion.div>

        <div className="ws-right">
          <div className="timeline">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                className="tl-item"
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.7 }}
              >
                <div className="tl-year">{item.year}</div>
                <div className="tl-connector">
                  <div className="tl-dot" />
                  <div className="tl-line" />
                </div>
                <div className="tl-body">
                  <h4>{item.event}</h4>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Large decorative spider */}
      <motion.div
        className="deco-spider"
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 0.04, scale: 1 } : {}}
        transition={{ delay: 0.5, duration: 1.2 }}
      >
        <SpiderIcon size={500} />
      </motion.div>
    </section>
  );
}

function AnimatedWebBg() {
  return (
    <svg className="ws-web-svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
      {[60, 120, 180, 240, 300].map((r, ri) => (
        [...Array(8)].map((_, i) => (
          <line key={`${ri}-${i}`}
            x1={400 + r * Math.cos((i * Math.PI) / 4)}
            y1={300 + r * Math.sin((i * Math.PI) / 4)}
            x2={400 + r * Math.cos(((i + 1) * Math.PI) / 4)}
            y2={300 + r * Math.sin(((i + 1) * Math.PI) / 4)}
            stroke="#e62429" strokeWidth="0.5" opacity="0.4"
          />
        ))
      ))}
      {[...Array(8)].map((_, i) => (
        <line key={`r${i}`}
          x1="400" y1="300"
          x2={400 + 300 * Math.cos((i * Math.PI) / 4)}
          y2={300 + 300 * Math.sin((i * Math.PI) / 4)}
          stroke="#e62429" strokeWidth="0.5" opacity="0.3"
        />
      ))}
    </svg>
  );
}

function SpiderIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <ellipse cx="50" cy="42" rx="18" ry="14" fill="currentColor" />
      <ellipse cx="50" cy="65" rx="22" ry="18" fill="currentColor" />
      <circle cx="44" cy="38" r="3" fill="#050810" />
      <circle cx="56" cy="38" r="3" fill="#050810" />
      {[[-25,-10],[-32,5],[-28,20],[25,-10],[32,5],[28,20],[-15,50],[-30,65],[15,50],[30,65]].map(([dx,dy],i) => (
        <line key={i} x1="50" y1="50" x2={50+dx} y2={50+dy}
          stroke="currentColor" strokeWidth="3" strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
