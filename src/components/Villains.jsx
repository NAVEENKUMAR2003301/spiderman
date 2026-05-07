import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import "./Villains.css";

const villains = [
  {
    name: "GREEN GOBLIN",
    alter: "Norman Osborn",
    threat: "EXTREME",
    color: "#2a7a2a",
    symbol: "🎃",
    desc: "Brilliant industrialist turned psychotic supervillain. Spider-Man's greatest nemesis and personal tormentor.",
    image: "https://cdn.marvel.com/content/1x/greengoblin_2023_comic_large.jpg"
  },
  {
    name: "DOC OCTOPUS",
    alter: "Otto Octavius",
    threat: "HIGH",
    color: "#8b4513",
    symbol: "🐙",
    desc: "Genius physicist with four prehensile mechanical arms fused to his body after a catastrophic accident.",
    image: "https://cdn.marvel.com/content/1x/doclok_2023_comic_large.jpg"
  },
  {
    name: "VENOM",
    alter: "Eddie Brock",
    threat: "EXTREME",
    color: "#1a1a1a",
    symbol: "👾",
    desc: "A living alien symbiote bonded with embittered journalist Eddie Brock — Spider-Man's dark mirror.",
    image: "https://cdn.marvel.com/content/1x/venom_2023_comic_large.jpg"
  },
  {
    name: "ELECTRO",
    alter: "Maxwell Dillon",
    threat: "HIGH",
    color: "#f5c842",
    symbol: "⚡",
    desc: "A former electrical engineer who became a living lightning battery with unlimited voltage at his command.",
    image: "https://cdn.marvel.com/content/1x/electro_2023_comic_large.jpg"
  },
  {
    name: "VULTURE",
    alter: "Adrian Toomes",
    threat: "MED",
    color: "#5a7a5a",
    symbol: "🦅",
    desc: "Cunning old-school criminal with engineered wings granting super-sonic flight and razor-sharp agility.",
    image: "https://cdn.marvel.com/content/1x/vulture_2023_comic_large.jpg"
  },
  {
    name: "SANDMAN",
    alter: "Flint Marko",
    threat: "HIGH",
    color: "#c8a46e",
    symbol: "🏖️",
    desc: "His molecular structure is pure sand — impossible to pin down and capable of incredible destructive force.",
    image: "https://cdn.marvel.com/content/1x/sandman_2023_comic_large.jpg"
  },
];

export default function Villains() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(null);
  const [shockIndex, setShockIndex] = useState(null);

  const handleSeeAll = () => {
    window.open("https://www.marvel.com/characters/spider-man-peter-parker/in-comics", "_blank");
  };

  const handleCardClick = (i) => {
    setActive(active === i ? null : i);
    // Trigger shock animation
    setShockIndex(i);
    setTimeout(() => setShockIndex(null), 500);
  };

  return (
    <section className="villains" id="villains" ref={ref}>
      <div className="villains-header">
        <motion.p 
          className="section-label"
          initial={{ opacity: 0 }} 
          animate={inView ? { opacity: 1 } : {}}
        >
          Rogues Gallery
        </motion.p>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 40 }} 
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.8 }}
        >
          THE <span className="text-red">ENEMIES</span>
        </motion.h2>
      </div>

      <div className="villains-grid">
        {villains.map((v, i) => (
          <motion.div
            key={v.name}
            className={`villain-card ${active === i ? "active" : ""} ${shockIndex === i ? "shock" : ""}`}
            style={{ "--v-color": v.color }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            onClick={() => handleCardClick(i)}
          >
            <div className="vc-bg">
              <img 
                src={v.image} 
                alt={v.name} 
                className="vc-bg-img"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://via.placeholder.com/400x500/1a1a1a/${v.color.slice(1)}?text=${v.name.replace(" ", "+")}`;
                }}
              />
            </div>
            <div className="vc-bg-overlay" />
            
            {/* Shock effect overlay */}
            {shockIndex === i && (
              <div className="shock-overlay">
                <div className="lightning"></div>
                <div className="lightning delay"></div>
                <div className="lightning delay-2"></div>
              </div>
            )}

            <div className="vc-content">
              <div className="vc-symbol">{v.symbol}</div>
              <div className="vc-threat" data-level={v.threat}>{v.threat}</div>
              <h3 className="vc-name">{v.name}</h3>
              <p className="vc-alter">{v.alter}</p>
              <AnimatePresence>
                {active === i && (
                  <motion.p
                    className="vc-desc"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {v.desc}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <div className="vc-expand">{active === i ? "−" : "+"}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="villains-cta"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6 }}
      >
        <p>Every villain forged a stronger Spider-Man.</p>
        <button className="btn-primary" onClick={handleSeeAll}>
          SEE ALL VILLAINS
        </button>
      </motion.div>
    </section>
  );
}