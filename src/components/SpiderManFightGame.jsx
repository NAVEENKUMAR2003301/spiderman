import React, { useState, useEffect, useCallback, useRef } from 'react';

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@500;700&display=swap');

  @keyframes flicker { 0%,100%{opacity:1} 92%{opacity:1} 93%{opacity:0.4} 95%{opacity:1} 97%{opacity:0.6} }
  @keyframes shake   { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
  @keyframes pulse-red { 0%,100%{box-shadow:0 0 0 0 rgba(230,36,41,0.5)} 50%{box-shadow:0 0 0 14px rgba(230,36,41,0)} }
  @keyframes slam    { 0%{transform:scale(1)} 30%{transform:scale(1.08)} 100%{transform:scale(1)} }
  @keyframes float   { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
  @keyframes scan    { 0%{background-position:0 -100%} 100%{background-position:0 200%} }
  @keyframes web-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes energy-glow { 0%,100%{filter:drop-shadow(0 0 4px #facc15)} 50%{filter:drop-shadow(0 0 14px #facc15)} }
  @keyframes combo-pop { 0%{transform:scale(0.5);opacity:0} 60%{transform:scale(1.3)} 100%{transform:scale(1);opacity:1} }
  @keyframes hit-flash { 0%,100%{opacity:1} 50%{opacity:0.2} }
  @keyframes slide-up { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
  @keyframes modal-in { from{transform:scale(0.92);opacity:0} to{transform:scale(1);opacity:1} }

  .fight-btn { transition: transform 0.15s, box-shadow 0.15s, opacity 0.2s; }
  .fight-btn:not(:disabled):hover { transform: translateY(-3px) scale(1.04); }
  .fight-btn:not(:disabled):active { transform: scale(0.95); }
  .fight-btn:disabled { opacity: 0.35; cursor: not-allowed; }

  .hp-bar { transition: width 0.4s cubic-bezier(0.4,0,0.2,1); }
  .energy-bar { transition: width 0.3s ease; }
  .rules-scroll::-webkit-scrollbar { width: 4px; }
  .rules-scroll::-webkit-scrollbar-track { background: transparent; }
  .rules-scroll::-webkit-scrollbar-thumb { background: rgba(230,36,41,0.4); border-radius: 99px; }
`;

function WebDecor({ size = 100, opacity = 0.08, color = '#e62429' }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity }}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                <line key={i} x1="50" y1="50"
                    x2={50 + 48 * Math.cos(i * Math.PI / 4)}
                    y2={50 + 48 * Math.sin(i * Math.PI / 4)}
                    stroke={color} strokeWidth="1" />
            ))}
            {[12, 22, 33, 45].map(r =>
                [0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                    <line key={`${r}-${i}`}
                        x1={50 + r * Math.cos(i * Math.PI / 4)}
                        y1={50 + r * Math.sin(i * Math.PI / 4)}
                        x2={50 + r * Math.cos((i + 1) * Math.PI / 4)}
                        y2={50 + r * Math.sin((i + 1) * Math.PI / 4)}
                        stroke={color} strokeWidth="0.8" />
                ))
            )}
        </svg>
    );
}

function VsDivider() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, zIndex: 10 }}>
            <div style={{ width: 2, height: 40, background: 'linear-gradient(to bottom, transparent, #e62429)' }} />
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '2rem', color: '#e62429', textShadow: '0 0 20px #e62429', letterSpacing: 4, animation: 'flicker 3s infinite' }}>VS</div>
            <div style={{ width: 2, height: 40, background: 'linear-gradient(to top, transparent, #7c3aed)' }} />
        </div>
    );
}

function HealthBar({ value, isHit }) {
    const barColor = value > 60 ? '#22c55e' : value > 30 ? '#f59e0b' : '#ef4444';
    return (
        <div style={{ position: 'relative', height: 14, background: 'rgba(0,0,0,0.6)', borderRadius: 99, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', animation: isHit ? 'hit-flash 0.3s ease' : 'none' }}>
            <div className="hp-bar" style={{ height: '100%', width: `${Math.max(0, value)}%`, background: `linear-gradient(90deg, ${barColor}cc, ${barColor})`, borderRadius: 99, boxShadow: `0 0 8px ${barColor}88` }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)', backgroundSize: '100% 200%', animation: 'scan 2s linear infinite' }} />
        </div>
    );
}

function EnergyBar({ value }) {
    return (
        <div style={{ height: 8, background: 'rgba(0,0,0,0.5)', borderRadius: 99, overflow: 'hidden', border: '1px solid rgba(250,204,21,0.2)' }}>
            <div className="energy-bar" style={{ height: '100%', width: `${value}%`, background: 'linear-gradient(90deg, #ca8a04, #facc15)', borderRadius: 99, boxShadow: '0 0 6px #facc1588' }} />
        </div>
    );
}

function AttackBtn({ label, emoji, cost, grad, shadow, onClick, disabled, pulse }) {
    return (
        <button className="fight-btn" onClick={onClick} disabled={disabled} style={{
            background: disabled ? 'rgba(30,30,40,0.6)' : grad,
            border: disabled ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(255,255,255,0.12)',
            borderRadius: 12, padding: '14px 10px', color: '#fff',
            fontFamily: "'Bebas Neue', sans-serif", fontSize: '1rem', letterSpacing: 2,
            cursor: disabled ? 'not-allowed' : 'pointer',
            position: 'relative', overflow: 'hidden',
            boxShadow: disabled ? 'none' : shadow,
            animation: pulse && !disabled ? 'pulse-red 1.5s infinite' : 'none',
        }}>
            <div style={{ fontSize: '1.4rem', marginBottom: 4 }}>{emoji}</div>
            <div>{label}</div>
            <div style={{ marginTop: 6, fontSize: '0.65rem', letterSpacing: 1, background: 'rgba(0,0,0,0.35)', borderRadius: 6, padding: '2px 8px', display: 'inline-block', color: '#facc15' }}>{cost}⚡</div>
        </button>
    );
}

// ── Rules Modal ───────────────────────────────────────────────────────────────
function RulesModal({ onClose }) {
    const attacks = [
        { icon: '🕸️', title: 'WEB SHOT', cost: '15⚡', dmg: '12–29', combo: '+1', desc: 'Quick web strike. Low cost, great combo starter.' },
        { icon: '🦵', title: 'SPIDER KICK', cost: '20⚡', dmg: '18–41', combo: '+2', desc: 'Powerful kick. Double combo points per hit.' },
        { icon: '🎯', title: 'WEB THROW', cost: '25⚡', dmg: '20–49', combo: '+3', desc: 'Critical throw. Best combo builder, high damage.' },
        { icon: '★', title: 'ULTIMATE', cost: '45⚡', dmg: '40–84', combo: '×0', desc: 'Needs COMBO ×3. Devastating move. Resets combo.' },
    ];
    const venomMoves = [
        { icon: '😈', name: 'VENOM CLAW', dmg: '8–22', chance: '60%', color: '#f59e0b' },
        { icon: '🖤', name: 'SYMBIOTE SMASH', dmg: '15–36', chance: '25%', color: '#e62429' },
        { icon: '💀', name: 'BLACK BITE', dmg: '20–49', chance: '15%', color: '#7c3aed' },
    ];
    const tips = [
        'Spam Web Shot early to build combo ×3 quickly',
        'Save 45 energy before combo ×3 so Ultimate fires instantly',
        'Web Throw gives +3 combo — fastest path to Ultimate',
        'Venom\'s Black Bite hits 20–49 DMG — keep HP above 50 as buffer',
        'Energy regens faster the higher your combo is',
    ];

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={onClose}>
            <div
                className="rules-scroll"
                onClick={e => e.stopPropagation()}
                style={{
                    maxWidth: 660, width: '100%', maxHeight: '90vh', overflowY: 'auto',
                    background: 'linear-gradient(145deg, #0d0a1a 0%, #110818 100%)',
                    border: '1px solid rgba(230,36,41,0.35)', borderRadius: 20, padding: 28,
                    boxShadow: '0 0 80px rgba(230,36,41,0.18), 0 0 160px rgba(124,58,237,0.1)',
                    fontFamily: "'Rajdhani', sans-serif",
                    animation: 'modal-in 0.3s ease'
                }}
            >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
                    <div>
                        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '2.2rem', letterSpacing: 5, color: '#fff', textShadow: '0 0 24px rgba(230,36,41,0.5)', lineHeight: 1 }}>📋 GAME RULES</div>
                        <div style={{ fontSize: '0.72rem', letterSpacing: 3, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>HOW TO DEFEAT VENOM & SAVE NEW YORK</div>
                    </div>
                    <button onClick={onClose} style={{ background: 'rgba(230,36,41,0.12)', border: '1px solid rgba(230,36,41,0.3)', borderRadius: 8, width: 36, height: 36, color: '#e62429', cursor: 'pointer', fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.1rem', flexShrink: 0 }}>✕</button>
                </div>

                {/* Objective */}
                <div style={{ background: 'rgba(230,36,41,0.08)', border: '1px solid rgba(230,36,41,0.2)', borderLeft: '3px solid #e62429', borderRadius: 10, padding: '12px 16px', marginBottom: 16 }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.9rem', letterSpacing: 3, color: '#e62429', marginBottom: 4 }}>🎯 OBJECTIVE</div>
                    <div style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>
                        Reduce <b style={{ color: '#fff' }}>Venom's HP to 0</b> before he destroys you. Venom attacks automatically every <b style={{ color: '#facc15' }}>2.2 seconds</b> — strike fast and manage your energy!
                    </div>
                </div>

                {/* Energy */}
                <div style={{ background: 'rgba(250,204,21,0.06)', border: '1px solid rgba(250,204,21,0.15)', borderLeft: '3px solid #facc15', borderRadius: 10, padding: '12px 16px', marginBottom: 16 }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.9rem', letterSpacing: 3, color: '#facc15', marginBottom: 6 }}>⚡ ENERGY SYSTEM</div>
                    <div style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8 }}>
                        • Auto-regens <b style={{ color: '#facc15' }}>+5 every 1.2s</b><br />
                        • High combo = <b style={{ color: '#facc15' }}>faster regen bonus</b><br />
                        • Each attack costs energy — don't go dry!
                    </div>
                </div>

                {/* Attacks grid */}
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.9rem', letterSpacing: 3, color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>🕷️ YOUR ATTACKS</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
                    {attacks.map(a => (
                        <div key={a.title} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '12px 14px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                <span style={{ fontSize: '1.5rem' }}>{a.icon}</span>
                                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1rem', letterSpacing: 2, color: '#fff' }}>{a.title}</div>
                            </div>
                            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                                <span style={{ fontSize: '0.65rem', background: 'rgba(250,204,21,0.15)', color: '#facc15', padding: '2px 7px', borderRadius: 4, letterSpacing: 1 }}>{a.cost}</span>
                                <span style={{ fontSize: '0.65rem', background: 'rgba(230,36,41,0.15)', color: '#f87171', padding: '2px 7px', borderRadius: 4, letterSpacing: 1 }}>{a.dmg} DMG</span>
                                <span style={{ fontSize: '0.65rem', background: 'rgba(251,146,60,0.15)', color: '#fb923c', padding: '2px 7px', borderRadius: 4, letterSpacing: 1 }}>COMBO {a.combo}</span>
                            </div>
                            <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{a.desc}</div>
                        </div>
                    ))}
                </div>

                {/* Combo system */}
                <div style={{ background: 'rgba(250,204,21,0.05)', border: '1px solid rgba(250,204,21,0.15)', borderRadius: 12, padding: '14px 16px', marginBottom: 16 }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.9rem', letterSpacing: 3, color: '#facc15', marginBottom: 10 }}>🔥 COMBO SYSTEM</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 0, position: 'relative' }}>
                        {[
                            { label: 'x1', sub: 'Web Shot', color: 'rgba(255,255,255,0.15)' },
                            { label: 'x2', sub: 'Kick', color: 'rgba(251,146,60,0.25)' },
                            { label: 'x3', sub: 'Throw', color: 'rgba(250,204,21,0.25)' },
                            { label: '★', sub: 'ULTIMATE!', color: 'rgba(230,36,41,0.35)', highlight: true },
                        ].map((c, i) => (
                            <React.Fragment key={c.label}>
                                <div style={{ flex: 1, textAlign: 'center', background: c.color, border: `1px solid ${c.highlight ? 'rgba(230,36,41,0.5)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 8, padding: '8px 4px' }}>
                                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: c.highlight ? '1.3rem' : '1.1rem', color: c.highlight ? '#facc15' : '#fff', letterSpacing: 1 }}>{c.label}</div>
                                    <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.45)', letterSpacing: 1 }}>{c.sub}</div>
                                </div>
                                {i < 3 && <div style={{ width: 20, height: 2, background: 'rgba(255,255,255,0.1)', flexShrink: 0 }} />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Venom attacks */}
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.9rem', letterSpacing: 3, color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>👾 VENOM'S ATTACKS (AUTO)</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                    {venomMoves.map(v => (
                        <div key={v.name} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.14)', borderRadius: 10, padding: '10px 14px' }}>
                            <span style={{ fontSize: '1.5rem' }}>{v.icon}</span>
                            <div style={{ flex: 1, fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.95rem', letterSpacing: 2, color: '#fff' }}>{v.name}</div>
                            <div style={{ display: 'flex', gap: 6 }}>
                                <span style={{ fontSize: '0.65rem', background: 'rgba(230,36,41,0.15)', color: '#f87171', padding: '2px 8px', borderRadius: 4, letterSpacing: 1 }}>{v.dmg} DMG</span>
                                <span style={{ fontSize: '0.65rem', background: `${v.color}22`, color: v.color, padding: '2px 8px', borderRadius: 4, letterSpacing: 1 }}>{v.chance}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pro tips */}
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '14px 16px', marginBottom: 20 }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.9rem', letterSpacing: 3, color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>💡 PRO TIPS</div>
                    {tips.map((tip, i) => (
                        <div key={i} style={{ display: 'flex', gap: 10, marginBottom: i < tips.length - 1 ? 8 : 0 }}>
                            <span style={{ color: '#e62429', fontSize: '0.8rem', marginTop: 2, flexShrink: 0 }}>▸</span>
                            <span style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{tip}</span>
                        </div>
                    ))}
                </div>

                {/* Close CTA */}
                <button onClick={onClose} className="fight-btn" style={{
                    width: '100%', background: 'linear-gradient(135deg, #e62429 0%, #7c3aed 100%)',
                    border: 'none', borderRadius: 12, padding: '14px',
                    color: '#fff', cursor: 'pointer',
                    fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.2rem', letterSpacing: 4,
                    boxShadow: '0 0 30px rgba(230,36,41,0.25)'
                }}>
                    LET'S FIGHT! 🕷️
                </button>
            </div>
        </div>
    );
}

// ── Main Game ─────────────────────────────────────────────────────────────────
const SpiderManFightGame = () => {
    const [spiderHealth, setSpiderHealth] = useState(100);
    const [venomHealth, setVenomHealth] = useState(100);
    const [spiderEnergy, setSpiderEnergy] = useState(100);
    const [message, setMessage] = useState("PRESS AN ATTACK TO BEGIN!");
    const [isAttacking, setIsAttacking] = useState(false);
    const [venomAttacking, setVenomAttacking] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);
    const [combo, setCombo] = useState(0);
    const [lastMove, setLastMove] = useState(null);
    const [spiderHit, setSpiderHit] = useState(false);
    const [venomHit, setVenomHit] = useState(false);
    const [showRules, setShowRules] = useState(false);

    const venomTimerRef = useRef(null);
    const messageTimerRef = useRef(null);

    const setTempMessage = (msg) => {
        setMessage(msg);
        if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
        messageTimerRef.current = setTimeout(() => {
            if (!gameOver) setMessage("CHOOSE YOUR NEXT MOVE...");
        }, 1800);
    };

    useEffect(() => {
        if (spiderHealth <= 0 && !gameOver) {
            setSpiderHealth(0); setGameOver(true); setWinner('venom');
            setMessage("VENOM WINS — NEW YORK FALLS!");
            clearInterval(venomTimerRef.current);
        } else if (venomHealth <= 0 && !gameOver) {
            setVenomHealth(0); setGameOver(true); setWinner('spider');
            setMessage("SPIDER-MAN DEFEATS VENOM!");
            clearInterval(venomTimerRef.current);
        }
    }, [spiderHealth, venomHealth, gameOver]);

    const flashVenom = () => { setVenomHit(true); setTimeout(() => setVenomHit(false), 350); };
    const flashSpider = () => { setSpiderHit(true); setTimeout(() => setSpiderHit(false), 350); };

    const webShot = useCallback(() => {
        if (gameOver || spiderEnergy < 15) return setTempMessage(spiderEnergy < 15 ? "LOW ENERGY!" : "GAME OVER!");
        const dmg = Math.floor(Math.random() * 18) + 12;
        setVenomHealth(h => Math.max(0, h - dmg));
        setSpiderEnergy(e => Math.max(0, e - 15));
        setCombo(c => c + 1); setLastMove('web'); setIsAttacking(true); flashVenom();
        setTempMessage(`WEB SHOT! -${dmg} DMG`);
        setTimeout(() => setIsAttacking(false), 300);
    }, [gameOver, spiderEnergy]);

    const spiderKick = useCallback(() => {
        if (gameOver || spiderEnergy < 20) return setTempMessage(spiderEnergy < 20 ? "NEED 20 ENERGY!" : "GAME OVER!");
        const dmg = Math.floor(Math.random() * 24) + 18;
        setVenomHealth(h => Math.max(0, h - dmg));
        setSpiderEnergy(e => Math.max(0, e - 20));
        setCombo(c => c + 2); setLastMove('kick'); setIsAttacking(true); flashVenom();
        setTempMessage(`SPIDER KICK! -${dmg} DMG`);
        setTimeout(() => setIsAttacking(false), 300);
    }, [gameOver, spiderEnergy]);

    const webThrow = useCallback(() => {
        if (gameOver || spiderEnergy < 25) return setTempMessage(spiderEnergy < 25 ? "NEED 25 ENERGY!" : "GAME OVER!");
        const dmg = Math.floor(Math.random() * 30) + 20;
        setVenomHealth(h => Math.max(0, h - dmg));
        setSpiderEnergy(e => Math.max(0, e - 25));
        setCombo(c => c + 3); setLastMove('throw'); setIsAttacking(true); flashVenom();
        setTempMessage(`WEB THROW! -${dmg} DMG — CRITICAL!`);
        setTimeout(() => setIsAttacking(false), 300);
    }, [gameOver, spiderEnergy]);

    const ultimateStrike = useCallback(() => {
        if (gameOver) return;
        if (spiderEnergy < 45) return setTempMessage("NEED 45 ENERGY FOR ULTIMATE!");
        if (combo < 3) return setTempMessage("BUILD COMBO ×3 TO UNLOCK!");
        const dmg = Math.floor(Math.random() * 45) + 40;
        setVenomHealth(h => Math.max(0, h - dmg));
        setSpiderEnergy(e => Math.max(0, e - 45));
        setCombo(0); setLastMove('ultimate'); setIsAttacking(true); flashVenom();
        setTempMessage(`★ ULTIMATE STRIKE! -${dmg} DMG ★`);
        setTimeout(() => setIsAttacking(false), 500);
    }, [gameOver, spiderEnergy, combo]);

    const venomAttack = useCallback(() => {
        if (gameOver) return;
        const r = Math.random();
        let dmg, name;
        if (r < 0.6) { dmg = Math.floor(Math.random() * 15) + 8; name = "VENOM CLAW"; }
        else if (r < 0.85) { dmg = Math.floor(Math.random() * 22) + 15; name = "SYMBIOTE SMASH"; }
        else { dmg = Math.floor(Math.random() * 30) + 20; name = "BLACK BITE"; }
        setVenomAttacking(true); flashSpider();
        setSpiderHealth(h => Math.max(0, h - dmg));
        setTempMessage(`${name}! -${dmg} TO SPIDER-MAN!`);
        setTimeout(() => setVenomAttacking(false), 400);
    }, [gameOver]);

    useEffect(() => {
        if (gameOver) return;
        const energy = setInterval(() => setSpiderEnergy(e => Math.min(100, e + 5 + Math.floor(combo / 2))), 1200);
        venomTimerRef.current = setInterval(venomAttack, 2200);
        return () => { clearInterval(energy); clearInterval(venomTimerRef.current); };
    }, [gameOver, venomAttack, combo]);

    const resetGame = () => {
        clearInterval(venomTimerRef.current);
        clearTimeout(messageTimerRef.current);
        setSpiderHealth(100); setVenomHealth(100); setSpiderEnergy(100);
        setCombo(0); setGameOver(false); setWinner(null);
        setIsAttacking(false); setVenomAttacking(false); setLastMove(null);
        setMessage("ROUND 2 — FIGHT!");
    };

    const moveLabels = { web: '🕸 WEB STRIKE', kick: '🦵 SPIDER KICK', throw: '🎯 WEB THROW', ultimate: '★ ULTIMATE' };

    return (
        <>
            <style>{GLOBAL_STYLES}</style>

            {showRules && <RulesModal onClose={() => setShowRules(false)} />}

            <div style={{
                minHeight: '100vh', background: '#080610',
                backgroundImage: `
          radial-gradient(ellipse 80% 50% at 20% 30%, rgba(230,36,41,0.12) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 80% 70%, rgba(124,58,237,0.12) 0%, transparent 60%)
        `,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '24px 16px', fontFamily: "'Rajdhani', sans-serif",
                position: 'relative', overflow: 'hidden'
            }}>

                {/* bg web decors */}
                <div style={{ position: 'absolute', top: -20, left: -20, animation: 'web-spin 40s linear infinite', transformOrigin: 'center' }}>
                    <WebDecor size={200} opacity={0.05} />
                </div>
                <div style={{ position: 'absolute', bottom: -20, right: -20, animation: 'web-spin 30s linear infinite reverse', transformOrigin: 'center' }}>
                    <WebDecor size={160} opacity={0.05} color='#7c3aed' />
                </div>

                <div style={{ maxWidth: 860, width: '100%', position: 'relative', zIndex: 1 }}>

                    {/* ── TITLE ── */}
                    <div style={{ textAlign: 'center', marginBottom: 28, position: 'relative' }}>
                        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(2.2rem,6vw,3.8rem)', letterSpacing: 6, color: '#fff', textShadow: '0 0 40px rgba(230,36,41,0.6), 0 2px 0 #000', lineHeight: 1, animation: 'flicker 6s infinite' }}>
                            🕷 SPIDER-MAN
                        </div>
                        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(0.9rem,2vw,1.1rem)', letterSpacing: 8, color: '#e62429', marginTop: 4, opacity: 0.9 }}>
                            WEB WARRIOR — DEFEAT VENOM
                        </div>

                        {/* Rules button */}
                        <button
                            className="fight-btn"
                            onClick={() => setShowRules(true)}
                            style={{
                                position: 'absolute', top: 0, right: 0,
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.12)',
                                borderRadius: 10, padding: '8px 16px', color: 'rgba(255,255,255,0.7)',
                                cursor: 'pointer', fontFamily: "'Bebas Neue',sans-serif",
                                fontSize: '0.85rem', letterSpacing: 2,
                                display: 'flex', alignItems: 'center', gap: 6
                            }}
                        >
                            📋 RULES
                        </button>
                    </div>

                    {/* ── FIGHTERS ROW ── */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16, alignItems: 'center', marginBottom: 20 }}>

                        {/* Spider-Man card */}
                        <div style={{
                            background: 'linear-gradient(135deg, rgba(13,27,75,0.9) 0%, rgba(127,13,18,0.8) 100%)',
                            border: isAttacking ? '1px solid #facc15' : '1px solid rgba(230,36,41,0.25)',
                            borderRadius: 16, padding: 20,
                            boxShadow: isAttacking ? '0 0 30px rgba(250,204,21,0.3)' : '0 8px 32px rgba(0,0,0,0.5)',
                            animation: isAttacking ? 'slam 0.3s ease' : 'none',
                            transition: 'border 0.2s, box-shadow 0.2s', position: 'relative', overflow: 'hidden'
                        }}>
                            <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.06 }}><WebDecor size={120} color='#e62429' opacity={1} /></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                                <div style={{ fontSize: '2.2rem', animation: isAttacking ? 'float 0.5s ease' : 'float 3s ease infinite', filter: isAttacking ? 'drop-shadow(0 0 12px #facc15)' : 'none' }}>🕷️</div>
                                <div>
                                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.3rem', letterSpacing: 3, color: '#fff' }}>SPIDER-MAN</div>
                                    <div style={{ fontSize: '0.72rem', letterSpacing: 2, color: 'rgba(255,255,255,0.4)' }}>THE AMAZING</div>
                                </div>
                                {lastMove && (
                                    <div style={{ marginLeft: 'auto', fontSize: '0.7rem', letterSpacing: 1, background: 'rgba(250,204,21,0.15)', border: '1px solid rgba(250,204,21,0.3)', color: '#facc15', padding: '3px 8px', borderRadius: 6, animation: 'combo-pop 0.3s ease' }}>
                                        {moveLabels[lastMove]}
                                    </div>
                                )}
                            </div>
                            <div style={{ marginBottom: 10 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                                    <span style={{ fontSize: '0.72rem', letterSpacing: 2, color: 'rgba(255,255,255,0.5)' }}>HEALTH</span>
                                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1rem', color: '#fff', letterSpacing: 1 }}>{Math.max(0, spiderHealth)}<span style={{ color: 'rgba(255,255,255,0.3)' }}>/100</span></span>
                                </div>
                                <HealthBar value={spiderHealth} isHit={spiderHit} />
                            </div>
                            <div style={{ marginBottom: 12 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                                    <span style={{ fontSize: '0.72rem', letterSpacing: 2, color: 'rgba(255,255,255,0.5)' }}>ENERGY</span>
                                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.9rem', color: '#facc15', letterSpacing: 1, animation: 'energy-glow 2s infinite' }}>{Math.floor(spiderEnergy)}%</span>
                                </div>
                                <EnergyBar value={spiderEnergy} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.6rem', color: combo >= 3 ? '#facc15' : 'rgba(255,255,255,0.2)', letterSpacing: 2, textShadow: combo >= 3 ? '0 0 20px #facc15' : 'none', transition: 'color 0.3s, text-shadow 0.3s' }}>
                                    COMBO ×{combo}
                                </div>
                                {combo >= 3 && (
                                    <div style={{ fontSize: '0.65rem', letterSpacing: 1, background: 'rgba(250,204,21,0.2)', border: '1px solid #facc1566', color: '#facc15', padding: '2px 8px', borderRadius: 99, animation: 'pulse-red 1s infinite' }}>ULTIMATE READY</div>
                                )}
                            </div>
                        </div>

                        <VsDivider />

                        {/* Venom card */}
                        <div style={{
                            background: 'linear-gradient(135deg, rgba(30,0,50,0.95) 0%, rgba(10,0,20,0.9) 100%)',
                            border: venomAttacking ? '1px solid #7c3aed' : '1px solid rgba(124,58,237,0.2)',
                            borderRadius: 16, padding: 20,
                            boxShadow: venomAttacking ? '0 0 30px rgba(124,58,237,0.35)' : '0 8px 32px rgba(0,0,0,0.6)',
                            animation: venomAttacking ? 'slam 0.3s ease' : 'none',
                            transition: 'border 0.2s, box-shadow 0.2s', position: 'relative', overflow: 'hidden'
                        }}>
                            <div style={{ position: 'absolute', top: -10, left: -10, opacity: 0.06 }}><WebDecor size={120} color='#7c3aed' opacity={1} /></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                                <div style={{ fontSize: '2.2rem', animation: venomAttacking ? 'shake 0.4s ease' : 'float 3.5s ease infinite', filter: venomAttacking ? 'drop-shadow(0 0 14px #7c3aed)' : 'none' }}>🖤</div>
                                <div>
                                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.3rem', letterSpacing: 3, color: '#fff' }}>VENOM</div>
                                    <div style={{ fontSize: '0.72rem', letterSpacing: 2, color: 'rgba(255,255,255,0.4)' }}>THE SYMBIOTE</div>
                                </div>
                                <div style={{ marginLeft: 'auto', fontSize: '0.65rem', letterSpacing: 1, color: 'rgba(124,58,237,0.7)', fontStyle: 'italic' }}>"We are Venom."</div>
                            </div>
                            <div style={{ marginBottom: 10 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                                    <span style={{ fontSize: '0.72rem', letterSpacing: 2, color: 'rgba(255,255,255,0.5)' }}>HEALTH</span>
                                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1rem', color: '#fff', letterSpacing: 1 }}>{Math.max(0, venomHealth)}<span style={{ color: 'rgba(255,255,255,0.3)' }}>/100</span></span>
                                </div>
                                <HealthBar value={venomHealth} isHit={venomHit} />
                            </div>
                            <div style={{ marginTop: 20, padding: '10px 14px', background: 'rgba(124,58,237,0.08)', borderRadius: 10, border: '1px solid rgba(124,58,237,0.15)' }}>
                                <div style={{ fontSize: '0.7rem', letterSpacing: 2, color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>SYMBIOTE ATTACKS</div>
                                <div style={{ display: 'flex', gap: 6 }}>
                                    {['😈 CLAW', '🖤 SMASH', '💀 BITE'].map(a => (
                                        <div key={a} style={{ flex: 1, textAlign: 'center', padding: '4px 0', background: 'rgba(124,58,237,0.15)', borderRadius: 6, fontSize: '0.6rem', letterSpacing: 1, color: 'rgba(255,255,255,0.5)' }}>{a}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── MESSAGE ── */}
                    <div style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(230,36,41,0.2)', borderLeft: '3px solid #e62429', borderRadius: 10, padding: '14px 20px', marginBottom: 20, textAlign: 'center', backdropFilter: 'blur(8px)', animation: 'slide-up 0.3s ease' }}>
                        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(1rem,3vw,1.4rem)', letterSpacing: 3, color: '#fff', textShadow: '0 0 20px rgba(230,36,41,0.4)' }}>
                            {message}
                        </div>
                    </div>

                    {/* ── ATTACK BUTTONS ── */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 16 }}>
                        <AttackBtn label="WEB SHOT" emoji="🕸️" cost={15} grad="linear-gradient(135deg,#0891b2,#1d4ed8)" shadow="0 4px 20px rgba(8,145,178,0.4)" onClick={webShot} disabled={gameOver || spiderEnergy < 15} />
                        <AttackBtn label="SPIDER KICK" emoji="🦵" cost={20} grad="linear-gradient(135deg,#d97706,#c2410c)" shadow="0 4px 20px rgba(217,119,6,0.4)" onClick={spiderKick} disabled={gameOver || spiderEnergy < 20} />
                        <AttackBtn label="WEB THROW" emoji="🎯" cost={25} grad="linear-gradient(135deg,#6d28d9,#4c1d95)" shadow="0 4px 20px rgba(109,40,217,0.4)" onClick={webThrow} disabled={gameOver || spiderEnergy < 25} />
                        <AttackBtn label="ULTIMATE" emoji="★" cost={45} grad="linear-gradient(135deg,#b45309,#e62429)" shadow="0 4px 24px rgba(230,36,41,0.5)" onClick={ultimateStrike} disabled={gameOver || spiderEnergy < 45 || combo < 3} pulse={combo >= 3 && spiderEnergy >= 45 && !gameOver} />
                    </div>

                    {/* ── FOOTER TIPS + RULES LINK ── */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, marginBottom: 16 }}>
                        <div style={{ fontSize: '0.72rem', letterSpacing: 1.5, color: 'rgba(255,255,255,0.3)' }}>
                            BUILD COMBO ×3 → ULTIMATE &nbsp;·&nbsp; VENOM ATTACKS EVERY 2s &nbsp;·&nbsp; ENERGY REGENS AUTO
                        </div>
                        <button onClick={() => setShowRules(true)} className="fight-btn" style={{ background: 'none', border: '1px solid rgba(230,36,41,0.25)', borderRadius: 6, padding: '4px 12px', color: '#e62429', cursor: 'pointer', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: 2, flexShrink: 0, marginLeft: 12 }}>
                            📋 VIEW RULES
                        </button>
                    </div>

                    {/* ── GAME OVER ── */}
                    {gameOver && (
                        <div style={{ textAlign: 'center', animation: 'slide-up 0.5s ease' }}>
                            <div style={{ display: 'inline-block', fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(1.4rem,4vw,2.2rem)', letterSpacing: 4, color: winner === 'spider' ? '#facc15' : '#7c3aed', textShadow: winner === 'spider' ? '0 0 30px #facc15' : '0 0 30px #7c3aed', marginBottom: 20, padding: '8px 0' }}>
                                {winner === 'spider' ? '🏆 SPIDER-MAN SAVES THE CITY! 🏆' : '☠️ VENOM CONSUMES NEW YORK ☠️'}
                            </div>
                            <br />
                            <button onClick={resetGame} className="fight-btn" style={{ background: 'linear-gradient(135deg,#16a34a,#15803d)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 12, padding: '14px 40px', color: '#fff', cursor: 'pointer', fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.3rem', letterSpacing: 3, boxShadow: '0 0 24px rgba(34,197,94,0.35)', marginRight: 12 }}>
                                🔄 RESTART FIGHT
                            </button>
                            <button onClick={() => setShowRules(true)} className="fight-btn" style={{ background: 'rgba(230,36,41,0.1)', border: '1px solid rgba(230,36,41,0.3)', borderRadius: 12, padding: '14px 24px', color: '#e62429', cursor: 'pointer', fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.1rem', letterSpacing: 3 }}>
                                📋 RULES
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default SpiderManFightGame;