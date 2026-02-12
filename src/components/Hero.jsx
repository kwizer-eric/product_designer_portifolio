import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();

    // Parallax logic
    const yImage = useTransform(scrollY, [0, 1000], [0, 400]);
    const scaleImage = useTransform(scrollY, [0, 1000], [1, 1.2]);
    const yText = useTransform(scrollY, [0, 1000], [0, 200]);

    // Mouse movement for subtle tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 40, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 40, damping: 20 });

    function handleMouseMove(e) {
        const { innerWidth, innerHeight } = window;
        const xPct = (e.clientX / innerWidth - 0.5) * 20;
        const yPct = (e.clientY / innerHeight - 0.5) * 20;
        x.set(xPct);
        y.set(yPct);
    }

    return (
        <section
            ref={containerRef}
            className="hero-section"
            onMouseMove={handleMouseMove}
        >

            <div className="container hero-container">

                {/* 1. THE CORNER DATA (FRAME) */}
                <div className="frame-data tl">
                    <span className="mono">AHIRWE ERICK</span>
                    <span className="mono dim">P.DESIGNER</span>
                </div>
                <div className="frame-data tr">
                    <span className="mono">AVAILABLE</span>
                    <div className="status-dot"></div>
                </div>
                <div className="frame-data bl">
                    <span className="mono">KIGALI, RW</span>
                    <span className="mono dim">LOCAL_TIME</span>
                </div>
                <div className="frame-data br">
                    <span className="mono">SCROLL_DOWN</span>
                </div>

                {/* 2. THE SUBJECT (CENTER IMAGE) */}
                <div className="hero-center-stage">
                    <motion.div
                        className="hero-image-crop"
                        style={{
                            y: yImage,
                            scale: scaleImage,
                            rotateX: useTransform(mouseY, (v) => v * -1),
                            rotateY: useTransform(mouseX, (v) => v)
                        }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
                            alt="Portrait"
                            className="hero-img-main"
                        />
                        <div className="hero-img-overlay"></div>
                    </motion.div>
                </div>

                {/* 3. THE STATEMENT (OVERLAPPING TEXT) */}
                <div className="hero-typography-layer">
                    <motion.h1 className="hero-title" style={{ y: yText }}>
                        <div className="row top">
                            <motion.span
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            >
                                AHIRWE
                            </motion.span>
                        </div>
                        <div className="row bottom">
                            <motion.span
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                            >
                                ERICK
                            </motion.span>
                        </div>
                    </motion.h1>
                </div>

                {/* 4. THE INTERFACE (FLOATING NAV PILL) */}
                <motion.div
                    className="hero-nav-pill"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                >
                    <button onClick={() => document.getElementById('work').scrollIntoView({ behavior: 'smooth' })}>
                        Selected Work
                    </button>
                    <div className="pill-divider"></div>
                    <button>Contact</button>
                    <div className="pill-divider"></div>
                    <button>About</button>
                </motion.div>

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
                    perspective: 1200px;
                }

                .hero-container {
                    width: 100%;
                    height: 100%;
                    padding: 2rem; /* The "Passe-Partout" frame */
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                /* FRAME CORNERS */
                .frame-data {
                    position: absolute;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    z-index: 10;
                }
                .tl { top: 2rem; left: 2rem; align-items: flex-start; }
                .tr { top: 2rem; right: 2rem; align-items: flex-end; }
                .bl { bottom: 2rem; left: 2rem; align-items: flex-start; }
                .br { bottom: 2rem; right: 2rem; align-items: flex-end; }

                .mono {
                    font-family: 'Inter', sans-serif; /* Using Inter for clean data look */
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    font-weight: 500;
                    color: #fff;
                }
                .dim { color: #555; }
                
                .status-dot {
                    width: 8px;
                    height: 8px;
                    background: #a3ff12;
                    border-radius: 50%;
                    box-shadow: 0 0 10px #a3ff12;
                }

                /* CENTER STAGE (IMAGE) */
                .hero-center-stage {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1; /* Below text */
                }

                .hero-image-crop {
                    width: 35vw;
                    height: 65vh;
                    position: relative;
                    overflow: hidden;
                    background: #111;
                }

                .hero-img-main {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    /* High contrast B&W base for blend mode to bite into */
                    filter: grayscale(100%) contrast(1.2) brightness(0.9);
                    transition: transform 0.5s;
                }
                
                .hero-img-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5));
                }

                /* TYPOGRAPHY LAYER */
                .hero-typography-layer {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2; /* ABOVE image */
                    pointer-events: none; /* Let clicks pass through */
                    mix-blend-mode: exclusion; /* THE SECRET SAUCE */
                }

                .hero-title {
                    font-family: 'Playfair Display', serif;
                    font-size: 15vw; /* Massive */
                    line-height: 0.8;
                    font-weight: 400;
                    font-style: italic;
                    color: #fff;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                }

                .row {
                    display: block;
                    overflow: hidden;
                    white-space: nowrap;
                }
                
                /* Layout offsets for dynamic feel */
                .row.top { transform: translateX(-10vw); }
                .row.bottom { transform: translateX(10vw); }

                /* NAV PILL */
                .hero-nav-pill {
                    position: absolute;
                    bottom: 4rem;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(255,255,255,0.1);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 0.5rem 0.5rem;
                    border-radius: 50px;
                    display: flex;
                    align-items: center;
                    z-index: 20;
                }

                .hero-nav-pill button {
                    background: none;
                    border: none;
                    color: #fff;
                    font-family: 'Inter', sans-serif;
                    font-size: 0.85rem;
                    padding: 0.6rem 1.5rem;
                    cursor: pointer;
                    transition: background 0.3s, color 0.3s;
                    border-radius: 40px;
                }

                .hero-nav-pill button:hover {
                    background: #fff;
                    color: #000;
                }

                .pill-divider {
                    width: 1px;
                    height: 15px;
                    background: rgba(255,255,255,0.2);
                }

                @media (max-width: 1024px) {
                    .hero-image-crop {
                        width: 80vw;
                        height: 60vh;
                    }
                    .hero-title {
                        font-size: 18vw;
                    }
                    .row.top { transform: translateX(0); }
                    .row.bottom { transform: translateX(0); }
                    
                    .hero-nav-pill {
                        width: 90%;
                        bottom: 2rem;
                        justify-content: space-between;
                    }
                    
                    .frame-data { display: none; } /* Hide corners on mobile to reduce clutter */
                }

            `}</style>
        </section>
    );
}
