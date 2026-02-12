import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();

    const y = useTransform(scrollY, [0, 1000], [0, 400]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);

    // Split text for animation
    const firstName = "AHI";
    const lastName = "RWE";

    return (
        <section ref={containerRef} className="hero-section">
            <div className="hero-bg-grid" />

            <div className="container hero-container">

                {/* 1. TOP BAR */}
                <header className="hero-header">
                    <div className="header-left">
                        <span className="dot"></span>
                        <span className="location">KIGALI, RWANDA 19:42</span>
                    </div>
                    <div className="header-right">
                        <span>SCROLL FOR PROJECTS</span>
                    </div>
                </header>

                {/* 2. MAIN CONTENT GRID */}
                <div className="hero-main">

                    {/* LEFT COLUMN: TITLE & INTRO */}
                    <div className="hero-col-left">
                        <motion.div
                            className="hero-role-badge"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="role-text">PRODUCT DESIGNER</span>
                            <div className="role-line" />
                            <span className="role-year">©2026</span>
                        </motion.div>

                        <div className="hero-title-wrapper">
                            <motion.h1
                                className="hero-name"
                                style={{ y }}
                            >
                                <span className="name-part">{firstName}</span>
                                <span className="name-part outline">{lastName}</span>
                            </motion.h1>
                        </div>

                        <motion.p
                            className="hero-bio"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 1 }}
                        >
                            Crafting digital ecosystems that bridge the gap between human intuition and machine logic.
                        </motion.p>

                        <motion.div
                            className="hero-cta"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                        >
                            <button className="cta-btn primary" onClick={() => document.getElementById('work').scrollIntoView({ behavior: 'smooth' })}>
                                VIEW WORK
                            </button>
                            <button className="cta-btn secondary">
                                CONTACT
                            </button>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: VISUAL ABSTRACT */}
                    <motion.div
                        className="hero-col-right"
                        style={{ opacity }}
                    >
                        <div className="hero-image-frame">
                            <div className="frame-decor tl" />
                            <div className="frame-decor tr" />
                            <div className="frame-decor bl" />
                            <div className="frame-decor br" />

                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
                                alt="Profile"
                                className="hero-profile-img"
                            />

                            <div className="hero-overlay-info">
                                <div className="info-stat">
                                    <span className="label">EXP</span>
                                    <span className="val">5+ YRS</span>
                                </div>
                                <div className="info-stat">
                                    <span className="label">PROJECTS</span>
                                    <span className="val">42+</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>

                {/* 3. FOOTER / DECOR */}
                <div className="hero-footer">
                    <div className="scroll-indicator">
                        <div className="scroll-line">
                            <motion.div
                                className="scroll-scroller"
                                animate={{ y: [0, 40, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>
                    </div>
                </div>

            </div>

            <style>{`
                .hero-section {
                    height: 100vh;
                    background-color: #050505;
                    color: #fff;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .hero-bg-grid {
                    position: absolute;
                    inset: 0;
                    background-image: 
                        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
                    background-size: 100px 100px;
                    pointer-events: none;
                }

                .hero-container {
                    width: 100%;
                    max-width: 1600px;
                    margin: 0 auto;
                    padding: 0 5vw;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding-top: 4vh;
                    padding-bottom: 4vh;
                    position: relative;
                    z-index: 10;
                }

                /* HEADER */
                .hero-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-family: monospace;
                    font-size: 0.75rem;
                    color: #555;
                    letter-spacing: 0.1em;
                }

                .header-left {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .dot {
                    width: 6px;
                    height: 6px;
                    background: #a3ff12;
                    border-radius: 50%;
                    box-shadow: 0 0 10px #a3ff12;
                }

                /* MAIN LAYOUT */
                .hero-main {
                    display: grid;
                    grid-template-columns: 1.5fr 1fr;
                    gap: 4rem;
                    align-items: center;
                    height: 70%;
                }

                .hero-role-badge {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    font-family: monospace;
                    color: #a3ff12;
                    font-size: 0.9rem;
                    margin-bottom: 2rem;
                }

                .role-line {
                    height: 1px;
                    width: 40px;
                    background: #a3ff12;
                }

                .hero-title-wrapper {
                    overflow: hidden;
                    margin-bottom: 2rem;
                }

                .hero-name {
                    font-family: 'Playfair Display', serif;
                    font-size: 10vw;
                    line-height: 0.85;
                    margin: 0;
                    font-weight: 500;
                    display: flex;
                    flex-direction: column;
                }

                .name-part {
                    display: block;
                }

                .name-part.outline {
                    color: transparent;
                    -webkit-text-stroke: 1px rgba(255,255,255,0.3);
                    margin-left: 2vw;
                    transition: all 0.5s;
                }
                
                .name-part.outline:hover {
                    color: #fff;
                    -webkit-text-stroke: 0;
                    margin-left: 0;
                }

                .hero-bio {
                    font-family: 'Inter', sans-serif;
                    font-size: 1.5rem;
                    color: #aaa;
                    max-width: 600px;
                    line-height: 1.4;
                    margin-bottom: 3rem;
                }

                .hero-cta {
                    display: flex;
                    gap: 1.5rem;
                }

                .cta-btn {
                    padding: 1rem 2.5rem;
                    font-family: monospace;
                    font-size: 0.9rem;
                    cursor: pointer;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    transition: all 0.3s;
                }

                .cta-btn.primary {
                    background: #fff;
                    color: #000;
                    border: 1px solid #fff;
                    font-weight: 700;
                }

                .cta-btn.primary:hover {
                    background: #a3ff12;
                    border-color: #a3ff12;
                    transform: translateY(-2px);
                }

                .cta-btn.secondary {
                    background: transparent;
                    color: #fff;
                    border: 1px solid rgba(255,255,255,0.3);
                }

                .cta-btn.secondary:hover {
                    border-color: #fff;
                }

                /* RIGHT COLUMN */
                .hero-col-right {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                }

                .hero-image-frame {
                    position: relative;
                    width: 100%;
                    max-width: 450px;
                    aspect-ratio: 3/4;
                    border: 1px solid #222;
                    padding: 1rem;
                }
                
                .hero-image-frame::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: rgba(163, 255, 18, 0.03);
                    pointer-events: none;
                }

                .hero-profile-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: grayscale(100%) contrast(1.1);
                    transition: filter 0.5s;
                }

                .hero-image-frame:hover .hero-profile-img {
                    filter: grayscale(0%) contrast(1);
                }

                .frame-decor {
                    position: absolute;
                    width: 15px;
                    height: 15px;
                    border: 2px solid #a3ff12;
                    z-index: 2;
                }

                .tl { top: -1px; left: -1px; border-right: 0; border-bottom: 0; }
                .tr { top: -1px; right: -1px; border-left: 0; border-bottom: 0; }
                .bl { bottom: -1px; left: -1px; border-right: 0; border-top: 0; }
                .br { bottom: -1px; right: -1px; border-left: 0; border-top: 0; }

                .hero-overlay-info {
                    position: absolute;
                    bottom: 2rem;
                    right: -2rem;
                    background: #000;
                    border: 1px solid #333;
                    padding: 1rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .info-stat {
                    display: flex;
                    flex-direction: column;
                }

                .info-stat .label {
                    font-family: monospace;
                    font-size: 0.6rem;
                    color: #555;
                }
                
                .info-stat .val {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.5rem;
                    color: #fff;
                }

                /* FOOTER */
                .hero-footer {
                    display: flex;
                    justify-content: center;
                }

                .scroll-line {
                    width: 1px;
                    height: 80px;
                    background: rgba(255,255,255,0.1);
                    position: relative;
                    overflow: hidden;
                }

                .scroll-scroller {
                    width: 100%;
                    height: 30%;
                    background: #a3ff12;
                    position: absolute;
                    top: -30%;
                }

                @media (max-width: 1024px) {
                    .hero-main {
                        grid-template-columns: 1fr;
                        height: auto;
                        gap: 2rem;
                    }
                    .hero-col-right {
                        display: none; /* Hide image on mobile for cleaner look or move to bottom? */
                    }
                    .hero-name {
                        font-size: 18vw;
                    }
                }
            `}</style>
        </section>
    );
}
