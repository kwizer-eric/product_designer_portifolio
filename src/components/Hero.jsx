import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();

    // Mouse Parallax Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 25, damping: 25 });
    const springY = useSpring(mouseY, { stiffness: 25, damping: 25 });

    function handleMouseMove({ clientX, clientY }) {
        const { innerWidth, innerHeight } = window;
        mouseX.set((clientX / innerWidth - 0.5) * 30);
        mouseY.set((clientY / innerHeight - 0.5) * 30);
    }

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Scroll Parallax
    const yName = useTransform(scrollY, [0, 1000], [0, 400]);
    const yBio = useTransform(scrollY, [0, 1000], [0, -200]);
    const yImage = useTransform(scrollY, [0, 1000], [0, 100]);

    return (
        <section ref={containerRef} className="hero-section">

            {/* Background Ambience */}
            <div className="ambience-spotlight" />
            <div className="noise-grain" />

            <div className="container">
                <div className="hero-layout">

                    {/* 1. OFF-CENTER GIANT NAME */}
                    <motion.div
                        className="name-layer"
                        style={{ y: yName, x: useTransform(springX, v => v * -1) }}
                    >
                        <div className="name-row">
                            <span className="outline">AHI</span>
                            <span className="filled">RWE</span>
                        </div>
                        <div className="name-decoration">
                            <span className="coordinate">37°46'N</span>
                            <div className="line" />
                            <span className="coordinate">122°25'W</span>
                        </div>
                    </motion.div>

                    {/* 2. CENTRAL VISUAL (The focus) */}
                    <motion.div
                        className="visual-layer"
                        style={{
                            y: yImage,
                            rotateX: useTransform(springY, v => v * 0.5),
                            rotateY: useTransform(springX, v => v * 0.5)
                        }}
                    >
                        <div className="image-frame-tech">
                            <div className="frame-corner c-tl" />
                            <div className="frame-corner c-br" />

                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
                                alt="Erick Profile"
                                className="hero-img"
                            />

                            {/* Image Overlays */}
                            <div className="scan-line" />
                            <div className="img-gloss" />
                        </div>
                    </motion.div>

                    {/* 3. FLOATING BIO CARD (Right aligned) */}
                    <motion.div
                        className="bio-layer"
                        style={{ y: yBio }}
                    >
                        <div className="bio-card">
                            <div className="bio-header">
                                <div className="status-dot" />
                                <span>AVAILABLE FOR WORK</span>
                            </div>
                            <h2 className="role-title">
                                DIGITAL<br />ALCHEMIST
                            </h2>
                            <p className="bio-text">
                                Constructing <b>digital ecosystems</b> that bridge the gap between human intuition and machine logic.
                            </p>

                            <div className="bio-actions">
                                <button className="btn-primary">
                                    PROJECTS <span className="arrow">↗</span>
                                </button>
                                <div className="social-links">
                                    <a href="#">LN</a>
                                    <a href="#">GH</a>
                                    <a href="#">TW</a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>

            <style>{`
        .hero-section {
            min-height: 100vh;
            background-color: #030303;
            color: #fff;
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
        }

        .container {
            width: 100%;
            max-width: 1600px;
            margin: 0 auto;
            position: relative;
            z-index: 10;
            padding: 2rem;
        }

        .ambience-spotlight {
            position: absolute;
            top: -20%;
            left: 20%;
            width: 80vw;
            height: 80vw;
            background: radial-gradient(circle, rgba(59,91,219,0.15) 0%, transparent 60%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 0;
            filter: blur(100px);
        }

        .noise-grain {
            position: absolute;
            inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
            z-index: 1;
            pointer-events: none;
        }

        .hero-layout {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            align-items: center;
            height: 80vh;
        }

        /* 1. Name Layer */
        .name-layer {
            position: relative;
            z-index: 2;
        }

        .name-row {
            font-size: clamp(6rem, 18vw, 20rem);
            font-weight: 800;
            line-height: 0.8;
            letter-spacing: -0.05em;
            display: flex;
            flex-direction: column;
        }

        .outline {
            color: transparent;
            -webkit-text-stroke: 2px rgba(255,255,255,0.3);
        }

        .filled {
            color: #fff;
            margin-left: 1rem;
        }

        .name-decoration {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-top: 2rem;
            font-family: monospace;
            color: #555;
            font-size: 0.9rem;
        }

        .line {
            width: 60px;
            height: 1px;
            background: #555;
        }

        /* 2. Visual Layer */
        .visual-layer {
            display: flex;
            justify-content: center;
            perspective: 1000px;
            z-index: 5;
        }

        .image-frame-tech {
            position: relative;
            width: 380px;
            height: 520px;
            background: #111;
            border: 1px solid rgba(255,255,255,0.1);
        }

        .hero-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0.8;
            transition: opacity 0.5s;
        }
        
        .image-frame-tech:hover .hero-img { opacity: 1; }

        .frame-corner {
            position: absolute;
            width: 20px;
            height: 20px;
            border: 2px solid #3b5bdb;
            z-index: 10;
        }
        .c-tl { top: -2px; left: -2px; border-right: 0; border-bottom: 0; }
        .c-br { bottom: -2px; right: -2px; border-left: 0; border-top: 0; }

        .scan-line {
            position: absolute;
            top: 0;
            width: 100%;
            height: 2px;
            background: rgba(59, 91, 219, 0.5);
            box-shadow: 0 0 10px #3b5bdb;
            animation: scan 4s linear infinite;
            opacity: 0.5;
        }

        @keyframes scan { 0% { top: 0; opacity: 0; } 50% { opacity: 1; } 100% { top: 100%; opacity: 0; } }

        /* 3. Bio Layer */
        .bio-layer {
            z-index: 10;
            display: flex;
            justify-content: flex-end;
        }

        .bio-card {
            background: rgba(20,20,20,0.6);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.1);
            padding: 2.5rem;
            width: 360px;
            position: relative;
        }
        
        .bio-card::before {
            content: "";
            position: absolute;
            left: 0; top: 20px; bottom: 20px;
            width: 2px;
            background: #3b5bdb;
        }

        .bio-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-family: monospace;
            font-size: 0.75rem;
            color: #888;
            margin-bottom: 1.5rem;
            letter-spacing: 0.1em;
        }

        .status-dot {
            width: 6px;
            height: 6px;
            background: #00ff88;
            border-radius: 50%;
            box-shadow: 0 0 8px #00ff88;
        }

        .role-title {
            font-size: 2.5rem;
            line-height: 1;
            font-weight: 700;
            margin-bottom: 1.5rem;
            letter-spacing: -0.02em;
        }

        .bio-text {
            font-size: 1rem;
            line-height: 1.6;
            color: #aaa;
            margin-bottom: 2rem;
        }
        .bio-text b { color: #fff; }

        .bio-actions {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .btn-primary {
            background: #fff;
            color: #000;
            border: none;
            padding: 0.8rem 1.5rem;
            font-family: monospace;
            font-weight: 700;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.3s;
        }
        .btn-primary:hover {
            background: #ccc;
            transform: translateX(5px);
        }

        .social-links {
            display: flex;
            gap: 1rem;
        }
        .social-links a {
            color: #555;
            text-decoration: none;
            font-family: monospace;
            font-size: 0.9rem;
            transition: color 0.3s;
        }
        .social-links a:hover { color: #fff; }

        @media (max-width: 1024px) {
            .hero-layout {
                grid-template-columns: 1fr;
                height: auto;
                gap: 4rem;
                padding-top: 6rem;
            }
            .name-row { font-size: 20vw; flex-direction: row; }
            .visual-layer { order: -1; } /* Image on top? or text on top? Let's keep name top for mobile */
            .bio-layer { justify-content: flex-start; }
            .bio-card { width: 100%; }
        }
      `}</style>
        </section>
    );
}
