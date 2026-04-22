// Navbar.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Navbar.css";
import spiderLogo from "../../public/logo.svg"

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

        {/* <button className="nav-cta" data-hover onClick={() => handleLinkClick("/SpiderManFightGame")}>
          <a href = "/SpiderManFightGame">JOIN THE FIGHT</a>
        </button> */}

        <button className="nav-cta" data-hover onClick={() => {
          setMenuOpen(false);
          document.getElementById("game")?.scrollIntoView({ behavior: "smooth" });
        }}>
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
    <img src={spiderLogo} alt="Spider Logo" width="32" height="32" />
  );
}