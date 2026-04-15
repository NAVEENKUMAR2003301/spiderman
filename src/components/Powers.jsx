import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./Powers.css";

const powers = [
  {
    icon: "🕷️",
    name: "SPIDER-SENSE",
    level: 95,
    desc: "A precognitive sixth sense that warns Peter of incoming danger milliseconds before impact.",
    color: "#e62429",
  },
  {
    icon: "💪",
    name: "SUPERHUMAN STRENGTH",
    level: 88,
    desc: "Can lift up to 10 tons and bench press heavy vehicles with ease.",
    color: "#2952cc",
  },
  {
    icon: "🕸️",
    name: "WEB-SLINGING",
    level: 100,
    desc: "Homemade web-shooters fire tensile-strength polymer webs at 90 mph.",
    color: "#e62429",
  },
  {
    icon: "🧲",
    name: "WALL-CRAWLING",
    level: 98,
    desc: "Microscopic hairs on hands and feet create molecular adhesion to any surface.",
    color: "#f5c842",
  },
  {
    icon: "⚡",
    name: "AGILITY & SPEED",
    level: 92,
    desc: "Reaction time 40× faster than an Olympic athlete. Moves at superhuman velocity.",
    color: "#2952cc",
  },
  {
    icon: "🧬",
    name: "ACCELERATED HEALING",
    level: 80,
    desc: "Minor injuries heal within hours. Immune to most toxins and diseases.",
    color: "#e62429",
  },
];

export default function Powers() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="powers" id="powers" ref={ref}>
      <div className="powers-header">
        <motion.p
          className="section-label"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          Abilities & Skills
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.8 }}
        >
          SPIDER<span className="text-outline">-POWERS</span>
        </motion.h2>
        <motion.p
          className="powers-sub"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          Biologically enhanced beyond human limits — a perfect fusion of science and instinct.
        </motion.p>
      </div>

      <div className="powers-grid">
        {powers.map((p, i) => (
          <motion.div
            key={p.name}
            className="power-card"
            initial={{ opacity: 0, y: 50, rotate: i % 2 === 0 ? -2 : 2 }}
            animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, scale: 1.02 }}
            style={{ "--card-color": p.color }}
          >
            <div className="card-glow" />
            <div className="card-icon">{p.icon}</div>
            <h3 className="card-name">{p.name}</h3>
            <p className="card-desc">{p.desc}</p>
            <div className="card-bar-wrap">
              <div className="card-bar-label">
                <span>POWER LEVEL</span>
                <span>{p.level}%</span>
              </div>
              <div className="card-bar-track">
                <motion.div
                  className="card-bar-fill"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${p.level}%` } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
            <div className="card-number">0{i + 1}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
