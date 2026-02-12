import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();

    // Parallax logic
    const yHero = useTransform(scrollY, [0, 1000], [0, 200]);
    const opacityHero = useTransform(scrollY, [0, 800], [1, 0]);
    const scaleImage = useTransform(scrollY, [0, 1000], [1, 1.1]);

    return (
        <section ref={containerRef} className="hero-section">

            <div className="container hero-container">

                {/* 1. Header (Minimal) */}
                <header className="hero-nav">
                    <div className="nav-item left">
                        <span>EST. 2021</span>
                    </div>
                    <div className="nav-item right">
                        <span>KIGALI — RWANDA</span>
                    </div>
                </header>

                {/* 2. Main Visual */}
                <div className="hero-content">

                    {/* Background/Main Image */}
                    <motion.div
                        className="hero-image-wrapper"
                        style={{ scale: scaleImage, opacity: opacityHero }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
                            alt="Erick Profile"
                            className="hero-img"
                        />
                        <div className="hero-noise"></div>
                    </motion.div>

                    {/* Text Overlay */}
                    <motion.div
                        className="hero-typography"
                        style={{ y: yHero }}
                    >
                        <h1 className="hero-title">
                            <span className="row">
                                <motion.span
                                    initial={{ y: 100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    Ahirwe
                                </motion.span>
                            </span>
                            <span className="row indent">
                                <motion.span
                                    initial={{ y: 100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    Erick
                                </motion.span>
                            </span>
                        </h1>

                        <motion.div
                            className="hero-subtitle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                        >
                            <span className="role">PRODUCT DESIGNER</span>
                            <span className="separator">/</span>
                            <span className="focus">DIGITAL EXPERIENCES</span>
                        </motion.div>
                    </motion.div>

                </div>

                {/* 3. Footer */}
                <div className="hero-footer">
                    <button
                        className="scroll-btn"
                        onClick={() => document.getElementById('work').scrollIntoView({ behavior: 'smooth' })}
                    >
                        <span className="label">SCROLL TO EXPLORE</span>
                        <motion.div className="line" initial={{ height: 0 }} animate={{ height: 60 }} transition={{ duration: 1, delay: 0.8 }} />
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
                }

                .hero-container {
                    width: 100%;
                    height: 100%;
                    padding: 2rem 4vw;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    position: relative;
                    z-index: 10;
                }

                .hero-nav {
                    display: flex;
                    justify-content: space-between;
                    font-family: 'Inter', sans-serif;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: rgba(255,255,255,0.6);
                    z-index: 20;
                }

                .hero-content {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .hero-image-wrapper {
                    position: absolute;
                    width: 35vw;
                    height: 55vh;
                    z-index: 1;
                    overflow: hidden;
                }

                .hero-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: grayscale(100%) contrast(1.2) brightness(0.9);
                    opacity: 0.8;
                }

                .hero-noise {
                    position: absolute;
                    inset: 0;
                    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
                    pointer-events: none;
                }

                .hero-typography {
                    position: relative;
                    z-index: 2;
                    text-align: center;
                    mix-blend-mode: exclusion; /* LUXURY TRICK */
                    color: #fff;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .hero-title {
                    font-family: 'Playfair Display', serif;
                    font-style: italic;
                    font-size: clamp(5rem, 13vw, 16rem);
                    font-weight: 400;
                    line-height: 0.8;
                    letter-spacing: -0.04em;
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 2rem;
                }

                .row {
                    display: block;
                    overflow: hidden;
                }

                .indent {
                    margin-left: 20%;
                }

                .hero-subtitle {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.85rem;
                    letter-spacing: 0.25em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.9);
                    display: flex;
                    gap: 1.5rem;
                }

                .hero-footer {
                    display: flex;
                    justify-content: center;
                    z-index: 20;
                    padding-bottom: 2vh;
                }

                .scroll-btn {
                    background: none;
                    border: none;
                    color: #fff;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                }

                .scroll-btn .label {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.7rem;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    opacity: 0.7;
                    transition: opacity 0.3s;
                }
                
                .scroll-btn:hover .label { opacity: 1; }

                .scroll-btn .line {
                    width: 1px;
                    background: #fff;
                }

                @media (max-width: 768px) {
                    .hero-image-wrapper {
                        width: 70vw;
                        height: 50vh;
                    }
                    .hero-title {
                        font-size: 20vw;
                    }
                    .hero-subtitle {
                        font-size: 0.7rem;
                        gap: 1rem;
                    }
                    .indent {
                        margin-left: 0;
                    }
                }
            `}</style>
        </section>
    );
}
