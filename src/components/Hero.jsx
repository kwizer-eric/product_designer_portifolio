import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

    function handleMouseMove(e) {
        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    }

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

    // Scroll Parallax
    const yHero = useTransform(scrollY, [0, 1000], [0, 300]);
    const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="hero-section"
            onMouseMove={handleMouseMove}
        >
            <div className="hero-bg-grid" />

            <div className="container hero-container">

                {/* LEFT COLUMN: AUTHORITY */}
                <div className="hero-col-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="badge-wrapper"
                    >
                        <span className="sc-badge">SYSTEMS ARCHITECT // EST. 2021</span>
                    </motion.div>

                    <h1 className="hero-headline">
                        <span className="line">Forging Clarity</span>
                        <span className="line">from <span className="highlight">Chaos.</span></span>
                    </h1>

                    <p className="hero-subhead">
                        I build scalable digital products that bridge the gap between human intuition and machine logic. Specializing in design systems and complex interfaces.
                    </p>

                    <div className="hero-actions">
                        <button
                            className="btn primary"
                            onClick={() => document.getElementById('work').scrollIntoView({ behavior: 'smooth' })}
                        >
                            VIEW SELECTED WORK
                        </button>
                        <button className="btn secondary">
                            CONTACT ME
                        </button>
                    </div>

                    <div className="hero-proof">
                        <div className="proof-item">
                            <span className="val">05+</span>
                            <span className="lbl">YEARS EXP</span>
                        </div>
                        <div className="proof-divider"></div>
                        <div className="proof-item">
                            <span className="val">42+</span>
                            <span className="lbl">PROJECTS SHIPPED</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: VISUAL PROOF (FLOATING UI) */}
                <motion.div
                    className="hero-col-right"
                    style={{ y: yHero, opacity: opacityHero }}
                >
                    <motion.div
                        className="floating-ui-container"
                        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    >
                        {/* BACKPLATE: Glass Panel */}
                        <div className="ui-layer backplate">
                            <div className="glass-panel"></div>
                        </div>

                        {/* MIDPLATE: Abstract Graphs */}
                        <motion.div
                            className="ui-layer midplate"
                            style={{ z: 40 }}
                        >
                            <div className="graph-box">
                                <div className="graph-lines">
                                    <div className="g-line" style={{ height: '40%' }}></div>
                                    <div className="g-line" style={{ height: '70%' }}></div>
                                    <div className="g-line active" style={{ height: '100%' }}></div>
                                    <div className="g-line" style={{ height: '60%' }}></div>
                                    <div className="g-line" style={{ height: '80%' }}></div>
                                </div>
                            </div>
                        </motion.div>

                        {/* FRONTPLATE: Code Snippet / Toast */}
                        <motion.div
                            className="ui-layer frontplate"
                            style={{ z: 80 }}
                        >
                            <div className="code-card">
                                <div className="card-header">
                                    <div className="dots">
                                        <span className="dot r"></span>
                                        <span className="dot y"></span>
                                        <span className="dot g"></span>
                                    </div>
                                </div>
                                <div className="code-content">
                                    <div className="c-row"><span className="c-k">const</span> <span className="c-f">Experience</span> = () ={'>'} {'{'}</div>
                                    <div className="c-row indent"><span className="c-k">return</span> <span className="c-s">"Seamless"</span>;</div>
                                    <div className="c-row">{'}'};</div>
                                </div>
                                <div className="success-badge">
                                    <span>✓ DEPLOYED</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* HOVER EFFECT: Cursor Follower */}
                        <motion.div
                            className="ui-cursor"
                            style={{ z: 120, x: useTransform(mouseX, [-0.5, 0.5], [-50, 50]), y: useTransform(mouseY, [-0.5, 0.5], [-50, 50]) }}
                        >
                            <div className="cursor-ring"></div>
                        </motion.div>

                    </motion.div>
                </motion.div>

            </div>

            <style>{`
                .hero-section {
                    min-height: 100vh;
                    background-color: #050505;
                    color: #fff;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                }

                .hero-bg-grid {
                    position: absolute;
                    inset: 0;
                    background-image: 
                        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
                    background-size: 60px 60px;
                    pointer-events: none;
                }

                .hero-container {
                    width: 100%;
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 4rem 5vw;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4rem;
                    align-items: center;
                    position: relative;
                    z-index: 10;
                }

                /* LEFT COLUMN */
                .hero-col-left {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 2rem;
                }

                .badge-wrapper {
                    margin-bottom: 1rem;
                }

                .sc-badge {
                    font-family: monospace;
                    font-size: 0.75rem;
                    color: #a3ff12;
                    border: 1px solid #333;
                    padding: 0.4rem 0.8rem;
                    border-radius: 4px;
                    letter-spacing: 0.1em;
                    background: rgba(163, 255, 18, 0.05);
                }

                .hero-headline {
                    font-family: 'Playfair Display', serif;
                    font-size: clamp(3rem, 5vw, 5rem);
                    line-height: 1.1;
                    font-weight: 500;
                    display: flex;
                    flex-direction: column;
                }

                .highlight {
                    color: #fff;
                    position: relative;
                    display: inline-block;
                }
                
                .highlight::after {
                    content: '';
                    position: absolute;
                    bottom: 0.1em;
                    left: 0;
                    width: 100%;
                    height: 0.15em;
                    background: #a3ff12;
                    z-index: -1;
                    opacity: 0.7;
                }

                .hero-subhead {
                    font-family: 'Inter', sans-serif;
                    font-size: 1.1rem;
                    line-height: 1.6;
                    color: #aaa;
                    max-width: 500px;
                }

                .hero-actions {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .btn {
                    padding: 1rem 2rem;
                    font-family: monospace;
                    font-size: 0.9rem;
                    cursor: pointer;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    transition: all 0.3s;
                    border-radius: 2px;
                }

                .btn.primary {
                    background: #fff;
                    color: #000;
                    border: 1px solid #fff;
                    font-weight: 700;
                }
                
                .btn.primary:hover {
                    background: #a3ff12;
                    border-color: #a3ff12;
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(163, 255, 18, 0.2);
                }

                .btn.secondary {
                    background: transparent;
                    color: #fff;
                    border: 1px solid #333;
                }

                .btn.secondary:hover {
                    border-color: #fff;
                }

                .hero-proof {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                    margin-top: 2rem;
                    border-top: 1px solid #222;
                    padding-top: 2rem;
                    width: 100%;
                }

                .proof-item {
                    display: flex;
                    flex-direction: column;
                }

                .proof-item .val {
                    font-family: 'Inter', sans-serif;
                    font-weight: 700;
                    font-size: 1.5rem;
                    color: #fff;
                }

                .proof-item .lbl {
                    font-family: monospace;
                    font-size: 0.7rem;
                    color: #555;
                    margin-top: 0.2rem;
                }
                
                .proof-divider {
                    width: 1px;
                    height: 40px;
                    background: #222;
                }

                /* RIGHT COLUMN: 3D UI */
                .hero-col-right {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    perspective: 1000px; /* Essential for 3D */
                    height: 100%;
                    min-height: 500px;
                }

                .floating-ui-container {
                    width: 400px;
                    height: 500px;
                    position: relative;
                }

                .ui-layer {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                /* Backplate */
                .backplate .glass-panel {
                    width: 100%;
                    height: 100%;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    backdrop-filter: blur(10px);
                    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                }

                /* Midplate */
                .midplate {
                    align-items: flex-end;
                    padding-bottom: 3rem;
                }

                .graph-box {
                    width: 80%;
                    height: 150px;
                    background: #111;
                    border: 1px solid #333;
                    border-radius: 8px;
                    padding: 1rem;
                    display: flex;
                    align-items: flex-end;
                    transform: translateX(-20px); /* Slight offset */
                }

                .graph-lines {
                    display: flex;
                    align-items: flex-end;
                    gap: 8px;
                    width: 100%;
                    height: 100%;
                }

                .g-line {
                    flex: 1;
                    background: #333;
                    border-radius: 2px;
                }

                .g-line.active {
                    background: #a3ff12;
                    box-shadow: 0 0 10px rgba(163, 255, 18, 0.4);
                }

                /* Frontplate */
                .frontplate {
                    align-items: flex-start;
                    padding-top: 4rem;
                    justify-content: flex-end;
                }

                .code-card {
                    width: 280px;
                    background: #151515;
                    border: 1px solid #333;
                    border-radius: 8px;
                    padding: 1.5rem;
                    transform: translateX(30px);
                    box-shadow: 0 30px 60px rgba(0,0,0,0.6);
                    position: relative;
                }

                .card-header { margin-bottom: 1rem; }
                .dots { display: flex; gap: 6px; }
                .dot { width: 8px; height: 8px; border-radius: 50%; }
                .r { background: #ff5f56; }
                .y { background: #ffbd2e; }
                .g { background: #27c93f; }

                .code-content {
                    font-family: monospace;
                    font-size: 0.8rem;
                    color: #aaa;
                    line-height: 1.6;
                }
                
                .c-k { color: #c678dd; }
                .c-f { color: #61afef; }
                .c-s { color: #98c379; }
                .indent { margin-left: 1rem; }

                .success-badge {
                    position: absolute;
                    bottom: -15px;
                    right: -15px;
                    background: #a3ff12;
                    color: #000;
                    padding: 0.4rem 0.8rem;
                    border-radius: 4px;
                    font-family: monospace;
                    font-weight: 700;
                    font-size: 0.7rem;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                }

                /* Cursor */
                .ui-cursor {
                    position: absolute;
                    top: 50%; left: 50%;
                    width: 0; height: 0;
                    pointer-events: none;
                }

                .cursor-ring {
                    width: 40px;
                    height: 40px;
                    border: 2px solid rgba(255,255,255,0.5);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                }

                @media (max-width: 1024px) {
                    .hero-container {
                        grid-template-columns: 1fr;
                        padding-top: 6rem;
                    }
                    .hero-col-right {
                        display: none; /* Hide complex UI on mobile to focus on copy */
                    }
                    .hero-headline {
                        font-size: 3.5rem;
                    }
                }
            `}</style>
        </section>
    );
}
