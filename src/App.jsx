import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "./components/Hero";
import WebSlinger from "./components/WebSlinger";
import Powers from "./components/Powers";
import Villains from "./components/Villains";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import SpiderManFightGame from "./components/SpiderManFightGame";
import "./App.css";

function SpiderWeb() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      {[...Array(8)].map((_, i) => (
        <motion.line
          key={i}
          x1="60" y1="60"
          x2={60 + 55 * Math.cos((i * Math.PI) / 4)}
          y2={60 + 55 * Math.sin((i * Math.PI) / 4)}
          stroke="#e62429" strokeWidth="1.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ delay: i * 0.05, duration: 0.4 }}
        />
      ))}
      {[15, 28, 41, 55].map((r, ri) =>
        [...Array(8)].map((_, i) => (
          <motion.line
            key={`${ri}-${i}`}
            x1={60 + r * Math.cos((i * Math.PI) / 4)}
            y1={60 + r * Math.sin((i * Math.PI) / 4)}
            x2={60 + r * Math.cos(((i + 1) * Math.PI) / 4)}
            y2={60 + r * Math.sin(((i + 1) * Math.PI) / 4)}
            stroke="#e62429" strokeWidth="1"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ delay: 0.4 + ri * 0.1 + i * 0.03, duration: 0.3 }}
          />
        ))
      )}
      <motion.circle cx="60" cy="60" r="6" fill="#e62429"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
      />
    </svg>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Cursor />
      <AnimatePresence>
        {loading && (
          <motion.div
            className="loader"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="loader-web"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <SpiderWeb />
            </motion.div>
            <motion.p
              className="loader-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              WITH GREAT POWER...
            </motion.p>
            <motion.div
              className="loader-bar-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                className="loader-bar"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut", delay: 0.8 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <div className="site-wrapper">
          <Navbar />
          <Hero />
          <WebSlinger />
          <Powers />
          <Villains />
          <Gallery />
          <div id="game">
            <SpiderManFightGame />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}
