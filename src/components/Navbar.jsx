// Navbar.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";
import spiderLogo from "../../public/logo.svg";

const links = ["Home", "Story", "Powers", "Villains", "Gallery"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [webShoot, setWebShoot] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(link.toLowerCase());
      if (element) {
        const navHeight = document.querySelector(".navbar")?.offsetHeight || 70;
        const top = element.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 350);
  };

  const handleJoinFight = () => {
    setWebShoot(true);
    setTimeout(() => setWebShoot(false), 800);
    setMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById("game");
      if (element) {
        const navHeight = document.querySelector(".navbar")?.offsetHeight || 70;
        const top = element.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 350);
  };

  return (
    <>
      <AnimatePresence>
        {webShoot && (
          <motion.div className="web-shoot" initial={{ scaleY: 0, opacity: 1 }} animate={{ scaleY: 1, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: "easeIn" }} />
        )}
      </AnimatePresence>

      <motion.nav className={`navbar ${scrolled ? "scrolled" : ""} ${menuOpen ? "mobile-open" : ""}`} initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}>
        <div className="web-corner web-corner--left" />
        <div className="web-corner web-corner--right" />

        <div className="nav-logo" onClick={() => handleLinkClick("Home")}>
          <div className="logo-ring">
            <img src={spiderLogo} alt="Spider Logo" width="32" height="32" />
          </div>
          <div className="logo-text">
            <span className="logo-spider">SPIDER</span>
            <span className="logo-man">MAN</span>
          </div>
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li className="mobile-menu-header">
            <div className="mobile-web-bg" />
            <img src={spiderLogo} alt="Spider Logo" width="28" height="28" />
            <span>SPIDER-MAN</span>
          </li>

          {links.map((l, i) => (
            <motion.li key={l} className={activeLink === l ? "active-link" : ""} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.08 }}>
              <a href={`#${l.toLowerCase()}`} onClick={(e) => { e.preventDefault(); handleLinkClick(l); }}>
                <span className="link-number">0{i + 1}</span>
                <span className="link-text">{l}</span>
                <span className="link-web" />
              </a>
            </motion.li>
          ))}

          <li className="mobile-cta-item">
            <button className="nav-cta mobile-cta" onClick={handleJoinFight}>
              <span className="cta-web-left" />
              JOIN THE FIGHT
              <span className="cta-web-right" />
            </button>
          </li>
        </ul>

        <button className="nav-cta desktop-cta" onClick={handleJoinFight}>
          JOIN THE FIGHT
        </button>

        <button className={`burger ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={() => setMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}