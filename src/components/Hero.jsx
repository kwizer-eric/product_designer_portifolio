import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();

    const y = useTransform(scrollY, [0, 1000], [0, 400]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);

    // Spring cursor follower
    const [cursorXY, setCursorXY] = useState({ x: -100, y: -100 });
    useEffect(() => {
        const moveCursor = (e) => { setCursorXY({ x: e.clientX, y: e.clientY }) };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    return (
        <section ref={containerRef} className="hero-section">
            <div className="hero-grid-bg" />

            {/* Custom Cursor Element */}
            <motion.div
                className="cursor-follower"
                animate={{ x: cursorXY.x - 10, y: cursorXY.y - 10 }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
            />

            <div className="container hero-container">

                {/* 1. TECHNICAL HEADER */}
                <header className="hero-header">
                    <div className="header-zone left">
                        <span className="bit-square"></span>
                        <span className="mono">AHIRWE ERICK</span>
                    </div>
                    <div className="header-zone right">
                        <span className="mono">AVAILABLE FOR WORK</span>
                        <div className="status-light" />
                    </div>
                </header>

                {/* 2. MASSIVE TYPOGRAPHY (NO IMAGE) */}
                <div className="hero-content">

                    <motion.div className="title-row" style={{ y, opacity }}>
                        <h1 className="giant-type">
                            <span className="row">
                                <span className="outline">PRODUCT</span>
                            </span>
                            <span className="row">
                                <span className="filled">DESIGNER</span>
                            </span>
                        </h1>
                    </motion.div>

                    <motion.div
                        className="hero-manifesto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        <p className="manifesto-text">
                            Constructing digital ecosystems where <span className="highlight">form follows function</span> and aesthetics serve purpose.
                            Specializing in complex interfaces and design systems.
                        </p>
                    </motion.div>

                    {/* DECORATIVE SPECS */}
                    <div className="specs-container">
                        <div className="spec-item">
                            <span className="label">LOC</span>
                            <span className="val">KGL_RW</span>
                        </div>
                        <div className="spec-item">
                            <span className="label">LAT</span>
                            <span className="val">-1.9441°</span>
                        </div>
                        <div className="spec-item">
                            <span className="label">LNG</span>
                            <span className="val">30.0619°</span>
                        </div>
                    </div>

                </div>

                {/* 3. SCROLL CTA */}
                <div className="hero-footer">
                    <button onClick={() => document.getElementById('work').scrollIntoView({ behavior: 'smooth' })} className="scroll-btn">
                        <span className="mono">INITIALIZE_VIEW</span>
                        <motion.div
                            className="scroll-track"
                        >
                            <motion.div
                                className="scroll-puck"
                                animate={{ y: [0, 30, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>
                    </button>
                </div>

            </div>

            <style>{`
                .hero-section {
                    height: 100vh;
                    background-color: #050505;
                    color: #fff;
                    position: relative;
                    overflow: hidden;
                    cursor: none; /* Hide default cursor */
                }

                .cursor-follower {
                    position: fixed;
                    top: 0; left: 0;
                    width: 20px;
                    height: 20px;
                    border: 1px solid #a3ff12;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    mix-blend-mode: difference;
                }

                .hero-grid-bg {
                    position: absolute;
                    inset: 0;
                    background-image: 
                        linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
                    background-size: 50px 50px;
                    pointer-events: none;
                }

                .hero-container {
                    width: 100%;
                    height: 100%;
                    max-width: 1600px;
                    margin: 0 auto;
                    padding: 2rem 5vw;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    position: relative;
                    z-index: 10;
                }

                /* HEADER */
                .hero-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    padding-bottom: 1rem;
                }

                .header-zone {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .bit-square {
                    width: 10px;
                    height: 10px;
                    background: #a3ff12;
                }

                .mono {
                    font-family: 'Space Mono', monospace; /* Fallback to monospace if not imported */
                    font-size: 0.8rem;
                    letter-spacing: 0.1em;
                    color: #888;
                }
                
                .status-light {
                    width: 8px;
                    height: 8px;
                    background: #00ff00;
                    border-radius: 50%;
                    box-shadow: 0 0 10px #00ff00;
                }

                /* CONTENT */
                .hero-content {
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center; /* Centered */
                    position: relative;
                }

                .title-row {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-bottom: 3rem;
                    z-index: 2;
                }

                .giant-type {
                    font-family: 'Inter', sans-serif; /* Clean sans-serif for industrial look */
                    font-size: 11vw;
                    font-weight: 800;
                    line-height: 0.85;
                    text-transform: uppercase;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin: 0;
                    letter-spacing: -0.04em;
                }

                .row {
                    display: block;
                    overflow: hidden;
                }

                .outline {
                    color: transparent;
                    -webkit-text-stroke: 1px rgba(255,255,255,0.4);
                }

                .filled {
                    color: #fff;
                }

                .hero-manifesto {
                    max-width: 600px;
                    text-align: center;
                    z-index: 2;
                }

                .manifesto-text {
                    font-family: 'Inter', sans-serif;
                    font-size: 1.2rem;
                    color: #666;
                    line-height: 1.5;
                }

                .highlight {
                    color: #a3ff12;
                }

                /* SPECS */
                .specs-container {
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .spec-item {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    font-family: monospace;
                    font-size: 0.7rem;
                }

                .spec-item .label { color: #444; }
                .spec-item .val { color: #a3ff12; }

                /* FOOTER */
                .hero-footer {
                    display: flex;
                    justify-content: center;
                    padding-top: 2rem;
                }

                .scroll-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                }

                .scroll-track {
                    width: 1px;
                    height: 60px;
                    background: rgba(255,255,255,0.1);
                    position: relative;
                }

                .scroll-puck {
                    width: 3px;
                    height: 10px;
                    background: #a3ff12;
                    position: absolute;
                    left: -1px;
                    top: 0;
                }

                @media (max-width: 768px) {
                    .giant-type { font-size: 16vw; }
                    .specs-container { display: none; }
                    .manifesto-text { font-size: 1rem; padding: 0 1rem; }
                }

            `}</style>
        </section>
    );
}
