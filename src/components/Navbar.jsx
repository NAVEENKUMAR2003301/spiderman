// Navbar.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Navbar.css";

const links = ["Home", "Story", "Powers", "Villains", "Gallery"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu when a link is clicked
  const handleLinkClick = (link) => {
    setMenuOpen(false);
    const element = document.getElementById(link.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? "scrolled" : ""} ${menuOpen ? "mobile-open" : ""}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
      >
        <div className="nav-logo">
          <SpiderLogo />
          <span>SPIDER-MAN</span>
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          {links.map((l, i) => (
            <motion.li
              key={l}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
            >
              <a href={`#${l.toLowerCase()}`} onClick={(e) => {
                e.preventDefault();
                handleLinkClick(l);
              }} data-hover>
                {l}
              </a>
            </motion.li>
          ))}
        </ul>

        <button className="nav-cta" data-hover onClick={() => handleLinkClick("join")}>
          JOIN THE FIGHT
        </button>

        <button
          className={`burger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </motion.nav>

      {/* Overlay for mobile menu */}
      {menuOpen && (
        <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />
      )}
    </>
  );
}

function SpiderLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 4 C10 4 6 9 6 14 C6 20 11 26 16 28 C21 26 26 20 26 14 C26 9 22 4 16 4Z" fill="#e62429" />
      <path d="M16 8 L16 24 M8 14 L24 14 M9 9 L23 23 M23 9 L9 23" stroke="#0d1b4b" strokeWidth="1.5" opacity="0.6" />
      <circle cx="16" cy="14" r="3" fill="#0d1b4b" />
    </svg>
  );
}