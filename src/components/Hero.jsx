import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();

    // Mouse Parallax Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    function handleMouseMove({ clientX, clientY }) {
        const { innerWidth, innerHeight } = window;
        mouseX.set((clientX / innerWidth - 0.5) * 15);
        mouseY.set((clientY / innerHeight - 0.5) * 15);
    }

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Scroll Parallax
    const yHero = useTransform(scrollY, [0, 800], [0, 200]);
    const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);

    // Time
    const [time, setTime] = useState("");
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section ref={containerRef} className="hero-section">

            {/* GRID BACKGROUND */}
            <div className="hero-grid-bg" />

            {/* CORNER DECORATION */}
            <div className="corner-decor tl">
                <div className="corner-bracket" />
                <span className="corner-label">SYS.INIT.v4</span>
            </div>
            <div className="corner-decor tr">
                <div className="corner-bracket" />
                <span className="corner-label">LOC: KG_RW</span>
            </div>
            <div className="corner-decor bl">
                <div className="corner-bracket" />
                <span className="corner-label">{time} UTC+2</span>
            </div>
            <div className="corner-decor br">
                <div className="corner-bracket" />
                <button
                    className="scroll-trigger"
                    onClick={() => document.getElementById('work').scrollIntoView({ behavior: 'smooth' })}
                >
                    INITIATE SCROLL <span className="arrow">↓</span>
                </button>
            </div>

            <div className="container hero-container">

                {/* CENTER CONTENT */}
                <div className="hero-center-axis">

                    {/* TOP TEXT BLOCK */}
                    <div className="hero-top-block">
                        <motion.div
                            className="status-pill"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="glow-dot"></span>
                            <span>AVAILABLE FOR COMMISSIONS</span>
                        </motion.div>
                    </div>

                    {/* MAIN VISUAL COMPONENT */}
                    <div className="hero-visual-assembly">

                        {/* LEFT DATA COLUMN */}
                        <motion.div
                            className="data-col left"
                            style={{ x: useTransform(springX, v => v * -1.5) }}
                        >
                            <div className="data-row">
                                <span className="label">ROLE</span>
                                <span className="value">PRODUCT_DESIGN</span>
                            </div>
                            <div className="data-row">
                                <span className="label">EXP</span>
                                <span className="value">05_YEARS</span>
                            </div>
                            <div className="data-row">
                                <span className="label">FOCUS</span>
                                <span className="value">DIGITAL_SYSTEMS</span>
                            </div>
                        </motion.div>

                        {/* CENTRAL IMAGE HOUSING */}
                        <motion.div
                            className="image-housing"
                            style={{
                                y: yHero,
                                rotateX: useTransform(springY, v => v * 0.1),
                                rotateY: useTransform(springX, v => v * 0.1),
                                opacity: opacityHero
                            }}
                        >
                            <div className="housing-frame">
                                <div className="crosshair tl"></div>
                                <div className="crosshair tr"></div>
                                <div className="crosshair bl"></div>
                                <div className="crosshair br"></div>

                                <div className="image-mask">
                                    <img
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
                                        alt="Profile"
                                        className="hero-img"
                                    />
                                    <div className="scan-overlay"></div>
                                </div>
                            </div>
                        </motion.div>

                        {/* RIGHT DATA COLUMN */}
                        <motion.div
                            className="data-col right"
                            style={{ x: useTransform(springX, v => v * 1.5) }}
                        >
                            <h1 className="hero-title-vertical">
                                <span className="char">A</span>
                                <span className="char">H</span>
                                <span className="char">I</span>
                                <span className="char">R</span>
                                <span className="char">W</span>
                                <span className="char">E</span>
                            </h1>
                        </motion.div>

                    </div>

                    {/* BOTTOM TITLE BLOCK */}
                    <motion.div
                        className="hero-bottom-block"
                        style={{ y: useTransform(scrollY, [0, 300], [0, -50]) }}
                    >
                        <h2 className="hero-subtitle-large">
                            ENGINEERING <span className="accent">AES·THET·ICS</span>
                        </h2>
                    </motion.div>

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
                    align-items: center;
                    justify-content: center;
                }

                .hero-grid-bg {
                    position: absolute;
                    inset: 0;
                    background-image: 
                        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
                    background-size: 80px 80px;
                    pointer-events: none;
                    z-index: 0;
                }

                /* CORNERS */
                .corner-decor {
                    position: absolute;
                    padding: 2rem;
                    z-index: 20;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .tl { top: 0; left: 0; align-items: flex-start; }
                .tr { top: 0; right: 0; align-items: flex-end; }
                .bl { bottom: 0; left: 0; align-items: flex-start; }
                .br { bottom: 0; right: 0; align-items: flex-end; }

                .corner-bracket {
                    width: 20px;
                    height: 20px;
                    border: 2px solid #333;
                }
                .tl .corner-bracket { border-right: 0; border-bottom: 0; }
                .tr .corner-bracket { border-left: 0; border-bottom: 0; }
                .bl .corner-bracket { border-right: 0; border-top: 0; }
                .br .corner-bracket { border-left: 0; border-top: 0; }

                .corner-label {
                    font-family: monospace;
                    font-size: 0.7rem;
                    color: #555;
                    letter-spacing: 0.1em;
                }

                .scroll-trigger {
                    background: transparent;
                    border: 1px solid #333;
                    color: #a3ff12;
                    padding: 0.5rem 1rem;
                    font-family: monospace;
                    font-size: 0.75rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.3s;
                    text-transform: uppercase;
                }
                .scroll-trigger:hover {
                    background: #a3ff12;
                    color: #000;
                }

                .hero-container {
                    width: 100%;
                    max-width: 1400px;
                    height: 100%;
                    position: relative;
                    z-index: 10;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .hero-center-axis {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4vh;
                }

                .status-pill {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(20,20,20,0.8);
                    border: 1px solid #333;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-family: monospace;
                    font-size: 0.75rem;
                    color: #aaa;
                    margin-bottom: 2rem;
                }

                .glow-dot {
                    width: 6px;
                    height: 6px;
                    background: #a3ff12;
                    border-radius: 50%;
                    box-shadow: 0 0 8px #a3ff12;
                    animation: blink 2s infinite;
                }

                @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

                /* MAIN ASSEMBLY */
                .hero-visual-assembly {
                    display: grid;
                    grid-template-columns: 200px 400px 200px;
                    gap: 2rem;
                    align-items: center;
                }

                .data-col {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    font-family: monospace;
                }

                .data-col.left {
                    text-align: right;
                    align-items: flex-end;
                }

                .data-col.right {
                    text-align: left;
                    align-items: flex-start;
                }

                .data-row {
                    display: flex;
                    flex-direction: column;
                }

                .label {
                    color: #444;
                    font-size: 0.65rem;
                    letter-spacing: 0.1em;
                    margin-bottom: 2px;
                }

                .value {
                    color: #a3ff12;
                    font-size: 0.9rem;
                    letter-spacing: 0.05em;
                }

                .hero-title-vertical {
                    display: flex;
                    flex-direction: column;
                    font-family: 'Playfair Display', serif;
                    font-size: 3rem;
                    line-height: 0.85;
                    color: #fff;
                    align-items: center;
                    border-left: 1px solid #333;
                    padding-left: 1.5rem;
                }

                /* IMAGE HOUSING */
                .image-housing {
                    position: relative;
                    width: 400px;
                    height: 500px;
                    perspective: 1000px;
                }

                .housing-frame {
                    width: 100%;
                    height: 100%;
                    border: 1px solid #333;
                    position: relative;
                    padding: 10px;
                    background: rgba(10,10,10,0.5);
                }

                .crosshair {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    z-index: 5;
                }
                .crosshair::before, .crosshair::after {
                    content: ''; position: absolute; background: #a3ff12;
                }
                .crosshair::before { width: 100%; height: 1px; top: 50%; left: 0; }
                .crosshair::after { width: 1px; height: 100%; top: 0; left: 50%; }

                .tl { top: -5px; left: -5px; }
                .tr { top: -5px; right: -5px; }
                .bl { bottom: -5px; left: -5px; }
                .br { bottom: -5px; right: -5px; }

                .image-mask {
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    position: relative;
                    border: 1px solid #222;
                }

                .hero-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: grayscale(100%) contrast(1.1);
                    opacity: 0.9;
                }

                .scan-overlay {
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 100%;
                    background: linear-gradient(to bottom, transparent 50%, rgba(163, 255, 18, 0.05) 51%, transparent 51%);
                    background-size: 100% 4px;
                    animation: scanlines 0.2s linear infinite;
                    pointer-events: none;
                }

                /* BOTTOM TEXT */
                .hero-subtitle-large {
                    font-family: 'Inter', sans-serif;
                    font-size: 1rem;
                    letter-spacing: 0.5em;
                    color: #fff;
                    text-transform: uppercase;
                    margin-top: 2rem;
                }
                
                .accent {
                    color: #a3ff12;
                }

                @media (max-width: 1024px) {
                    .hero-visual-assembly {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                    .data-col.left, .data-col.right {
                        flex-direction: row;
                        justify-content: center;
                        border: none;
                        text-align: center;
                        align-items: center;
                        padding: 0;
                    }
                    .hero-title-vertical {
                        flex-direction: row;
                        font-size: 2rem;
                        border-left: none;
                        padding-left: 0;
                        gap: 1rem;
                    }
                    .image-housing {
                        width: 80vw;
                        height: 50vh;
                    }
                }
            `}</style>
        </section>
    );
}
