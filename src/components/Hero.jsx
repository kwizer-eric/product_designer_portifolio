import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();

    // Parallax & Tilt
    const yHero = useTransform(scrollY, [0, 1000], [0, 200]);
    const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);

    // Mouse Tilt for Phone
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 40, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 40, damping: 20 });

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

    // Reverse tilt for 3D feel
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

    return (
        <section
            ref={containerRef}
            className="hero-section"
            onMouseMove={handleMouseMove}
        >
            <div className="hero-bg-light" />

            <div className="container hero-container">

                {/* LEFT: AUTHORITY CONTENT */}
                <div className="hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="status-pill"
                    >
                        <span className="dot"></span>
                        <span>AVAILABLE FOR NEW PROJECTS</span>
                    </motion.div>

                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Crafting Digital <br />
                        <span className="highlight">Systems That Scale.</span>
                    </motion.h1>

                    <motion.p
                        className="hero-desc"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        I define the visual language and interaction patterns for complex products. Bridging the gap between brand vision and user utility.
                    </motion.p>

                    <motion.div
                        className="hero-btns"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <button onClick={() => document.getElementById('work').scrollIntoView({ behavior: 'smooth' })} className="btn-solid">
                            View Selected Work
                        </button>
                        <button className="btn-outline">
                            Contact Me
                        </button>
                    </motion.div>

                    <motion.div
                        className="hero-stats"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <div className="stat">
                            <span className="num">05+</span>
                            <span className="lbl">Years Exp.</span>
                        </div>
                        <div className="div-line"></div>
                        <div className="stat">
                            <span className="num">42+</span>
                            <span className="lbl">Projects</span>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT: VISUAL PROOF (REALISTIC PHONE) */}
                <motion.div
                    className="hero-visual"
                    style={{ y: yHero, opacity: opacityHero }}
                >
                    <motion.div
                        className="phone-container"
                        style={{
                            rotateX,
                            rotateY,
                            transformStyle: "preserve-3d"
                        }}
                    >
                        {/* THE PHONE FRAME */}
                        <div className="phone-mockup">
                            <div className="phone-screen">

                                {/* Header */}
                                <div className="app-header">
                                    <span className="time">9:41</span>
                                    <div className="status-icons">
                                        <div className="icon-wifi"></div>
                                        <div className="icon-battery"></div>
                                    </div>
                                </div>

                                {/* Content: Music Player / Gallery App */}
                                <div className="app-content">
                                    <div className="album-art">
                                        <div className="art-inner-gradient"></div>
                                        <div className="play-btn-overlay">▶</div>
                                    </div>
                                    <div className="track-info">
                                        <div className="track-title-bar"></div>
                                        <div className="track-artist-bar"></div>
                                    </div>
                                    <div className="waveform">
                                        {[...Array(20)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="wave-bar"
                                                style={{
                                                    height: Math.random() * 100 + '%',
                                                    animationDelay: i * 0.1 + 's'
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <div className="control-row">
                                        <div className="c-btn"></div>
                                        <div className="c-btn big"></div>
                                        <div className="c-btn"></div>
                                    </div>
                                </div>

                                {/* Bottom Nav */}
                                <div className="app-nav">
                                    <div className="nav-item active"></div>
                                    <div className="nav-item"></div>
                                    <div className="nav-item"></div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Notification */}
                        <motion.div
                            className="floating-notif"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="notif-icon">✓</div>
                            <div className="notif-text">
                                <span className="n-title">Design System</span>
                                <span className="n-desc">v2.0 Published</span>
                            </div>
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

                .hero-bg-light {
                    position: absolute;
                    top: -20%;
                    right: -10%;
                    width: 50vw;
                    height: 50vw;
                    background: radial-gradient(circle, rgba(163, 255, 18, 0.15) 0%, transparent 70%);
                    filter: blur(100px);
                    pointer-events: none;
                    z-index: 0;
                }

                .hero-container {
                    width: 100%;
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 4rem 5vw;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 6rem;
                    align-items: center;
                    position: relative;
                    z-index: 10;
                }

                /* LEFT COLUMN */
                .hero-content {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    z-index: 10;
                }

                .status-pill {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 0.5rem 1rem;
                    border-radius: 50px;
                    font-family: 'Inter', sans-serif;
                    font-size: 0.75rem;
                    color: #ccc;
                    margin-bottom: 2rem;
                    backdrop-filter: blur(5px);
                }

                .dot {
                    width: 6px;
                    height: 6px;
                    background: #a3ff12;
                    border-radius: 50%;
                    box-shadow: 0 0 8px #a3ff12;
                }

                .hero-title {
                    font-family: 'Playfair Display', serif;
                    font-size: clamp(3rem, 4.5vw, 5rem);
                    font-weight: 600;
                    line-height: 1.1;
                    margin-bottom: 1.5rem;
                }

                .highlight {
                    background: linear-gradient(90deg, #fff 0%, #aaa 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .hero-desc {
                    font-family: 'Inter', sans-serif;
                    font-size: 1.1rem;
                    line-height: 1.6;
                    color: #888;
                    max-width: 500px;
                    margin-bottom: 2.5rem;
                }

                .hero-btns {
                    display: flex;
                    gap: 1.5rem;
                    margin-bottom: 3rem;
                }

                .btn-solid {
                    background: #fff;
                    color: #000;
                    border: none;
                    padding: 1rem 2rem;
                    font-family: 'Inter', sans-serif;
                    font-weight: 600;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .btn-solid:hover {
                    background: #e0e0e0;
                    transform: translateY(-2px);
                }

                .btn-outline {
                    background: transparent;
                    color: #fff;
                    border: 1px solid rgba(255,255,255,0.3);
                    padding: 1rem 2rem;
                    font-family: 'Inter', sans-serif;
                    font-weight: 500;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .btn-outline:hover {
                    border-color: #fff;
                }

                .hero-stats {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                    border-top: 1px solid rgba(255,255,255,0.1);
                    padding-top: 1.5rem;
                    width: 100%;
                }

                .stat .num {
                    display: block;
                    font-family: 'Inter', sans-serif;
                    font-weight: 700;
                    font-size: 1.25rem;
                    color: #fff;
                }

                .stat .lbl {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.75rem;
                    color: #666;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .div-line {
                    width: 1px;
                    height: 30px;
                    background: rgba(255,255,255,0.1);
                }

                /* RIGHT COLUMN */
                .hero-visual {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    perspective: 1500px;
                    height: 600px;
                }
                
                .phone-container {
                    position: relative;
                    width: 320px;
                    height: 640px;
                }

                .phone-mockup {
                    width: 100%;
                    height: 100%;
                    background: #1a1a1a;
                    border-radius: 40px;
                    border: 8px solid #333;
                    box-shadow: 
                        0 0 0 2px #444,
                        0 30px 60px rgba(0,0,0,0.5),
                        inset 0 0 20px rgba(0,0,0,0.8);
                    position: relative;
                    overflow: hidden;
                    transition: box-shadow 0.3s;
                }

                .phone-screen {
                    background: linear-gradient(135deg, #111, #222);
                    width: 100%;
                    height: 100%;
                    padding: 2rem 1.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .app-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                }

                .time { font-family: 'Inter', sans-serif; font-size: 0.8em; font-weight: 600; }
                .status-icons { display: flex; gap: 4px; }
                .icon-wifi, .icon-battery { width: 14px; height: 10px; background: #fff; border-radius: 2px; opacity: 0.8; }

                .app-content {
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1.5rem;
                    margin-top: 1rem;
                }

                .album-art {
                    width: 220px;
                    height: 220px;
                    background: #333;
                    border-radius: 12px;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 15px 30px rgba(0,0,0,0.4);
                }
                
                .art-inner-gradient {
                    width: 100%; height: 100%;
                    background: linear-gradient(45deg, #a3ff12, #3b5bdb);
                    opacity: 0.8;
                }

                .play-btn-overlay {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    color: #fff;
                    background: rgba(0,0,0,0.2);
                }

                .track-info { width: 100%; padding: 0 1rem; }
                .track-title-bar { width: 60%; height: 12px; background: #fff; margin-bottom: 8px; border-radius: 4px; }
                .track-artist-bar { width: 40%; height: 8px; background: #555; border-radius: 4px; }

                .waveform {
                    display: flex;
                    align-items: center;
                    gap: 3px;
                    height: 40px;
                    width: 100%;
                    padding: 0 1rem;
                }

                .wave-bar {
                    flex: 1;
                    background: #a3ff12;
                    border-radius: 2px;
                    animation: bounce 1s infinite ease-in-out;
                }
                
                @keyframes bounce { 0%, 100% { transform: scaleY(0.5); } 50% { transform: scaleY(1); } }

                .control-row {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    margin-top: 1rem;
                }
                
                .c-btn { width: 30px; height: 30px; border-radius: 50%; background: #333; }
                .c-btn.big { width: 50px; height: 50px; background: #fff; }

                .app-nav {
                    display: flex;
                    justify-content: space-around;
                    padding-top: 1.5rem;
                    border-top: 1px solid #333;
                }

                .nav-item { width: 24px; height: 24px; background: #333; border-radius: 4px; }
                .nav-item.active { background: #fff; }

                /* NOTIFICATION */
                .floating-notif {
                    position: absolute;
                    top: 100px;
                    right: -40px;
                    background: rgba(255,255,255,0.95);
                    color: #000;
                    padding: 0.8rem 1rem;
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    display: flex;
                    gap: 12px;
                    align-items: center;
                    width: 200px;
                    z-index: 20;
                }

                .notif-icon {
                    width: 30px; height: 30px;
                    background: #a3ff12;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    font-size: 0.8rem;
                }

                .notif-text { display: flex; flex-direction: column; }
                .n-title { font-weight: 700; font-size: 0.8rem; font-family: 'Inter', sans-serif; }
                .n-desc { font-size: 0.7rem; color: #555; }

                @media (max-width: 1024px) {
                    .hero-container { grid-template-columns: 1fr; padding-top: 6rem; gap: 3rem; }
                    .hero-visual { display: none; }
                    .hero-title { font-size: 3rem; }
                }

            `}</style>
        </section>
    );
}
