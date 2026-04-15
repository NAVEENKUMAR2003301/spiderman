import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Hero.css";

export default function Hero() {
  const ref = useRef(null);
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  // Canvas animated "video" background - city skyline + web swinging animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Web strand particles
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      t += 0.008;

      // Deep city night sky gradient
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, "#010309");
      sky.addColorStop(0.5, "#050d1e");
      sky.addColorStop(1, "#0a0510");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      // Stars
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      for (let i = 0; i < 80; i++) {
        const sx = ((i * 137.5 + t * 2) % W);
        const sy = (i * 53.7) % (H * 0.5);
        const ss = Math.sin(t + i) * 0.3 + 0.7;
        ctx.globalAlpha = ss * 0.4;
        ctx.beginPath();
        ctx.arc(sx, sy, 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // City buildings
      const buildings = [
        { x: 0, w: 80, h: 320, floors: 12 },
        { x: 70, w: 60, h: 260, floors: 9 },
        { x: 120, w: 100, h: 400, floors: 14 },
        { x: 210, w: 50, h: 220, floors: 8 },
        { x: 250, w: 90, h: 350, floors: 12 },
        { x: 330, w: 70, h: 280, floors: 10 },
        { x: 390, w: 120, h: 420, floors: 15 },
        { x: 500, w: 60, h: 240, floors: 8 },
        { x: 550, w: 100, h: 380, floors: 13 },
        { x: 640, w: 80, h: 300, floors: 11 },
        { x: 710, w: 140, h: 450, floors: 16 },
        { x: 840, w: 70, h: 260, floors: 9 },
        { x: 900, w: 90, h: 340, floors: 12 },
        { x: 980, w: 60, h: 200, floors: 7 },
        { x: 1030, w: 110, h: 390, floors: 14 },
        { x: 1130, w: 80, h: 310, floors: 11 },
        { x: 1200, w: 140, h: 460, floors: 16 },
        { x: 1330, w: 90, h: 280, floors: 10 },
        { x: 1410, w: 70, h: 350, floors: 12 },
        { x: 1470, w: 120, h: 420, floors: 15 },
      ];

      buildings.forEach((b) => {
        const bx = (b.x % W);
        const by = H - b.h;

        // Building body
        const bg = ctx.createLinearGradient(bx, by, bx + b.w, H);
        bg.addColorStop(0, "#0d1530");
        bg.addColorStop(1, "#06090f");
        ctx.fillStyle = bg;
        ctx.fillRect(bx, by, b.w, b.h);

        // Windows
        const wW = 6, wH = 8, wPadX = 10, wPadY = 14;
        const cols = Math.floor((b.w - wPadX * 2) / (wW + 6));
        for (let row = 0; row < b.floors; row++) {
          for (let col = 0; col < cols; col++) {
            const wx = bx + wPadX + col * (wW + 6);
            const wy = by + wPadY + row * (wH + 8);
            const lit = Math.sin(t * 0.3 + row * 1.7 + col * 2.3 + bx * 0.01) > 0.1;
            if (lit) {
              ctx.fillStyle = `rgba(${200 + Math.random() * 55}, ${180 + Math.random() * 40}, ${80 + Math.random() * 80}, ${0.5 + Math.sin(t + row + col) * 0.2})`;
              ctx.fillRect(wx, wy, wW, wH);
            }
          }
        }
      });

      // Web strand network
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      });

      particles.forEach((p, i) => {
        particles.forEach((p2, j) => {
          if (j <= i) return;
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(230, 36, 41, ${(1 - dist / 140) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 36, 41, ${p.alpha})`;
        ctx.fill();
      });

      // Animated swinging arc (simulate spider swinging)
      const swingT = t % (Math.PI * 2);
      const swingX = W * 0.5 + Math.sin(swingT) * W * 0.3;
      const swingY = H * 0.25 + Math.cos(swingT * 0.7) * H * 0.1;
      const anchorX = W * 0.5 + Math.sin(swingT - 1) * W * 0.2;
      const anchorY = H * 0.05;

      // Web line
      ctx.beginPath();
      ctx.moveTo(anchorX, anchorY);
      ctx.lineTo(swingX, swingY);
      ctx.strokeStyle = "rgba(255,255,255,0.25)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Spider silhouette dot
      ctx.beginPath();
      ctx.arc(swingX, swingY, 6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(230, 36, 41, 0.8)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(swingX, swingY, 10, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(230, 36, 41, 0.2)";
      ctx.fill();

      // Red fog / atmospheric
      const fog = ctx.createRadialGradient(W / 2, H, H * 0.1, W / 2, H, H * 0.9);
      fog.addColorStop(0, "rgba(230, 36, 41, 0.0)");
      fog.addColorStop(0.6, "rgba(13, 27, 75, 0.05)");
      fog.addColorStop(1, "rgba(5, 8, 16, 0.6)");
      ctx.fillStyle = fog;
      ctx.fillRect(0, 0, W, H);

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section className="hero" id="home" ref={ref}>
      <motion.div className="hero-bg" style={{ scale }}>
        <canvas ref={canvasRef} className="hero-canvas" />
      </motion.div>

      <motion.div className="hero-content" style={{ y, opacity }}>
        <motion.div
          className="hero-eyebrow"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="dot" />
          <span>MARVEL UNIVERSE — NEW YORK CITY</span>
        </motion.div>

        <div className="hero-title-wrap">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="title-line">YOUR</span>
            <span className="title-line accent">FRIENDLY</span>
            <span className="title-line">NEIGHBORHOOD</span>
          </motion.h1>

          <motion.div
            className="hero-name"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          >
            SPIDER-MAN
          </motion.div>
        </div>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
        >
          Peter Parker. Photographer. Student. Hero.<br />
          Protecting the city that never sleeps.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <button className="btn-primary" data-hover>DISCOVER THE LEGEND</button>
          <button className="btn-ghost" data-hover>WATCH TRAILER</button>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          {[["800+", "Issues Published"], ["60+", "Years of History"], ["15+", "Major Villains"]].map(([n, l]) => (
            <div className="stat" key={l}>
              <span className="stat-n">{n}</span>
              <span className="stat-l">{l}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <div className="scroll-line" />
        <span>SCROLL</span>
      </motion.div>

      {/* Animated web corner decorations */}
      <div className="web-corner top-left"><WebCorner /></div>
      <div className="web-corner top-right" style={{ transform: "scaleX(-1)" }}><WebCorner /></div>
    </section>
  );
}

function WebCorner() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" opacity="0.25">
      {[40, 80, 120, 160].map(r => (
        <path key={r}
          d={`M 0 0 Q ${r/2} ${r} ${r} ${r}`}
          stroke="#e62429" strokeWidth="1" fill="none"
        />
      ))}
      {[...Array(6)].map((_, i) => (
        <line key={i} x1="0" y1="0"
          x2={200 * Math.cos((i * Math.PI) / 12)}
          y2={200 * Math.sin((i * Math.PI) / 12)}
          stroke="#e62429" strokeWidth="0.8"
        />
      ))}
    </svg>
  );
}
