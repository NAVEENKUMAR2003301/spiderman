import { useRef, useCallback } from "react";

export default function TiltCard({ name, alias, emoji, gradient, powers, accentColor = "#e31c23", delay = 0 }) {
  const cardRef = useRef(null);
  const MAX_TILT = 22;

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const scene = card.parentElement;
    const rect = scene.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const nx = (e.clientX - cx) / (rect.width / 2);
    const ny = (e.clientY - cy) / (rect.height / 2);
    const rotY = nx * MAX_TILT;
    const rotX = -ny * MAX_TILT;
    card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.05,1.05,1.05)`;
    card.style.transition = "transform 0.08s linear";

    const glare = card.querySelector(".card-glare");
    if (glare) {
      const gx = ((e.clientX - rect.left) / rect.width) * 100;
      const gy = ((e.clientY - rect.top) / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.22) 0%, transparent 65%)`;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = "transform 0.55s cubic-bezier(0.23,1,0.32,1)";
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    const glare = card.querySelector(".card-glare");
    if (glare) glare.style.background = "";
  }, []);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    const card = cardRef.current;
    if (!card) return;
    const scene = card.parentElement;
    const rect = scene.getBoundingClientRect();
    const touch = e.touches[0];
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const nx = (touch.clientX - cx) / (rect.width / 2);
    const ny = (touch.clientY - cy) / (rect.height / 2);
    card.style.transform = `rotateX(${-ny * MAX_TILT}deg) rotateY(${nx * MAX_TILT}deg) scale3d(1.05,1.05,1.05)`;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = "transform 0.55s cubic-bezier(0.23,1,0.32,1)";
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  }, []);

  return (
    <div
      className="card-scene"
      style={{ animationDelay: `${delay}s` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="card" ref={cardRef}>
        {/* Glare overlay */}
        <div className="card-glare" />

        {/* Top image area */}
        <div className="card-img-placeholder" style={{ background: gradient }}>
          <span className="card-emoji">{emoji}</span>
        </div>

        {/* Info */}
        <div className="card-body" style={{ "--accent": accentColor }}>
          <div
            className="card-top-line"
            style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
          />
          <div>
            <div className="card-name">{name}</div>
            <div className="card-alias" style={{ color: accentColor }}>{alias}</div>
          </div>
          <div className="card-powers">
            {powers.map((p) => (
              <span
                key={p}
                className="power-tag"
                style={{ borderColor: `${accentColor}55`, background: `${accentColor}11` }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
