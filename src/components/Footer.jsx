import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./Footer.css";

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer className="footer" ref={ref}>
      <div className="footer-web">
        <FooterWebSVG />
      </div>

      <div className="footer-inner">
        <motion.div
          className="footer-top"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="footer-brand">
            <div className="footer-logo">
              <SpiderLogo size={48} />
              <span>SPIDER-MAN</span>
            </div>
            <p className="footer-tagline">
              "Whatever life holds in store for me, I will never forget these words: with great power comes great responsibility."
            </p>
            <div className="footer-socials">
              {["TW", "IG", "YT", "FB"].map(s => (
                <a key={s} className="social-btn" href="#" data-hover>{s}</a>
              ))}
            </div>
          </div>

          <div className="footer-links">
            {[
              { title: "UNIVERSE", links: ["Comics", "Movies", "TV Shows", "Games"] },
              { title: "CHARACTERS", links: ["Peter Parker", "Miles Morales", "Gwen Stacy", "Mary Jane"] },
              { title: "EXPLORE", links: ["Powers", "Villains", "Allies", "Timeline"] },
            ].map(col => (
              <div key={col.title} className="footer-col">
                <h4>{col.title}</h4>
                <ul>
                  {col.links.map(l => (
                    <li key={l}><a href="./SpiderManFightGame" data-hover>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="footer-marquee-wrap"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          <div className="footer-marquee">
            {Array(3).fill("SPIDER-MAN • WITH GREAT POWER • NEW YORK CITY • MARVEL COMICS • PETER PARKER • ").map((t, i) => (
              <span key={i}>{t}</span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <p>© 2025 Spider-Man Fan Universe. Marvel characters and comics © Marvel Entertainment.</p>
          <p>Built with passion by a true believer. No copyright infringement intended.</p>
        </motion.div>
      </div>
    </footer>
  );
}

function SpiderLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 4 C10 4 6 9 6 14 C6 20 11 26 16 28 C21 26 26 20 26 14 C26 9 22 4 16 4Z" fill="#e62429" />
      <path d="M16 8 L16 24 M8 14 L24 14 M9 9 L23 23 M23 9 L9 23" stroke="#0d1b4b" strokeWidth="1.5" opacity="0.6" />
      <circle cx="16" cy="14" r="3" fill="#0d1b4b" />
    </svg>
  );
}

function FooterWebSVG() {
  const cx = 700, cy = 0;
  return (
    <svg className="footer-web-svg" viewBox="0 0 1400 400" preserveAspectRatio="xMidYMid slice">
      {[100, 200, 300, 400, 500].map(r => (
        [...Array(10)].map((_, i) => (
          <line key={`${r}-${i}`}
            x1={cx + r * Math.cos((i * Math.PI) / 5)}
            y1={cy + r * Math.sin((i * Math.PI) / 5)}
            x2={cx + r * Math.cos(((i + 1) * Math.PI) / 5)}
            y2={cy + r * Math.sin(((i + 1) * Math.PI) / 5)}
            stroke="#e62429" strokeWidth="0.6"
          />
        ))
      ))}
      {[...Array(10)].map((_, i) => (
        <line key={`sp${i}`}
          x1={cx} y1={cy}
          x2={cx + 500 * Math.cos((i * Math.PI) / 5)}
          y2={cy + 500 * Math.sin((i * Math.PI) / 5)}
          stroke="#e62429" strokeWidth="0.5"
        />
      ))}
    </svg>
  );
}
