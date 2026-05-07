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

// Image URLs for each mosaic cell (0-8)
const cellImages = [
  "https://cdn.marvel.com/u/prod/marvel/i/mg/f/10/598363848588e/clean.jpg",        // 0: Amazing Fantasy #15
  "https://wallpapers-clan.com/wp-content/uploads/2025/04/spider-man-noir-shadow-city-desktop-wallpaper-preview.jpg", // 1: Noir shadows
  "https://www.shutterstock.com/shutterstock/videos/3421474481/thumb/2.jpg?ip=x480", // 2: Web
  "https://4kwallpapers.com/images/wallpapers/marvel-logo-dark-1280x1280-22111.jpg",   // 3: Marvel logo
  "https://static0.srcdn.com/wordpress/wp-content/uploads/2022/03/Spider-Man-No-Way-Home-Final-Suit.jpg", // 4: MCU suit
  "https://static01.nyt.com/images/2019/01/27/arts/27spider-man-anatomy1/spider-man-anatomy-videoSixteenByNine3000.jpg?auto=webp&quality=30&disable=upscale&format=pjpg", // 5: Into Spider-Verse
  "https://i.ebayimg.com/images/g/6oIAAOSwtbtjE7Up/s-l400.jpg", // 6: 1962 vintage
  "https://static01.nyt.com/images/2021/09/14/arts/09spider-man-image1/09spider-man-image1-articleLarge.jpg?quality=75&auto=webp&disable=upscale", // 7: Comic art
  "https://static.wikia.nocookie.net/amazingspiderman/images/e/e5/Electro_promotional.png/revision/latest?cb=20231030121025", // 8: Electro/lightning
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

        {/* Mosaic grid with images */}
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
              <MosaicContent index={i} imageUrl={cellImages[i]} />
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

function MosaicContent({ index, imageUrl }) {
  const configs = [
    { label: "AMAZING\nSPIDER-MAN", accent: "#e62429" },
    { label: "WEB OF\nSHADOWS", accent: "#e62429" },
    { label: "", accent: "#e62429" }, // emoji cell
    { label: "MARVEL\nCOMICS", accent: "#2952cc" },
    { label: "PETER\nPARKER", accent: "#fff" },
    { label: "", accent: "#ff6b9d" }, // emoji cell
    { label: "SINCE\n1962", accent: "#f5c842" },
    { label: "INTO THE\nSPIDERVERSE", accent: "#ff6b9d" },
    { label: "", accent: "#ffd700" }, // emoji cell
  ];

  const c = configs[index] || configs[0];
  const emojis = ["", "", "🕷️", "", "", "🕸️", "", "", "⚡"];

  return (
    <div className="mc-inner" style={{ backgroundImage: `url(${imageUrl})` }}>
      {/* Dark overlay for text readability */}
      <div className="mc-img-overlay" />

      {/* Content on top */}
      {index === 2 || index === 5 || index === 8 ? (
        <span className="mc-emoji" style={{ fontSize: index === 2 ? "4rem" : index === 8 ? "3.5rem" : "3rem" }}>
          {emojis[index]}
        </span>
      ) : (
        <span className="mc-text" style={{ color: c.accent }}>{c.label}</span>
      )}

      <div className="mc-hover-overlay" />
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