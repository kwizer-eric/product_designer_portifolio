import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

const galleryItems = [
    {
        id: 'wearable',
        title: "WEARABLE",
        category: "PERSONAL AUDIO",
        material: "aluminum",
        image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1000&auto=format&fit=crop",
        size: "large", // spans 2 cols
        description: "Next-generation personal audio with adaptive noise cancellation and biometric sensing."
    },
    {
        id: 'controller',
        title: "CONTROLLER",
        category: "GAMING",
        material: "clay",
        image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1000&auto=format&fit=crop",
        size: "small",
        description: "Precision input device designed for e-sports performance with tactile feedback."
    },
    {
        id: 'speaker',
        title: "SMART SPEAKER",
        category: "HOME AUDIO",
        material: "chrome",
        image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1000&auto=format&fit=crop",
        size: "tall", // spans 2 rows
        description: "360-degree high-fidelity sound architecture in a seamless aluminum enclosure."
    },
    {
        id: 'watch',
        title: "WRISTWATCH",
        category: "HARDWARE",
        material: "aluminum",
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop",
        size: "small",
        description: "Minimalist timekeeping with integrated health monitoring and sapphire crystal glass."
    },
    {
        id: 'earbuds',
        title: "EARBUDS",
        category: "PERSONAL AUDIO",
        material: "clay",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000&auto=format&fit=crop",
        size: "small",
        description: "Ultra-compact wireless audio with pro-grade drivers and ergonomic fit."
    },
    {
        id: 'headphones',
        title: "HEADPHONES",
        category: "AUDIO DEVICE",
        material: "chrome",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
        size: "large",
        description: "Studio-reference over-ear headphones constructed from premium leather and steel."
    },
    {
        id: 'vr',
        title: "VR HEADSET",
        category: "HARDWARE",
        material: "aluminum",
        image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1000&auto=format&fit=crop",
        size: "small",
        description: "Immersive virtual reality system with high-resolution displays and inside-out tracking."
    },
    {
        id: 'laptop',
        title: "LAPTOP",
        category: "HARDWARE",
        material: "clay",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop",
        size: "tall",
        description: "Unibody machined performance workstation for creative professionals."
    }
];

export default function Gallery() {
    const [selectedId, setSelectedId] = useState(null);
    const containerRef = useRef(null);

    // Subtle breathing/parallax effect
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]);
    const smoothScale = useSpring(scale, { stiffness: 60, damping: 20 });

    return (
        <section ref={containerRef} className="gallery-section">
            <div className="container">

                {/* INDUSTRIAL HEADER */}
                <div className="gallery-header">
                    <div className="header-meta">
                        <span className="meta-label">ARCHIVE // 001</span>
                        <div className="meta-line" />
                        <span className="meta-label">SYS.READY</span>
                    </div>

                    <div className="header-main">
                        <motion.h2
                            className="gallery-title"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            SELECTED<br />ARTIFACTS
                        </motion.h2>
                        <motion.p
                            className="gallery-desc"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            INDEX OF INDUSTRIAL DESIGN WORKS.<br />
                            CLASSIFIED BY FORM FACTOR AND MATERIAL COMPOSITION.
                        </motion.p>
                    </div>
                </div>

                <motion.div
                    className="gallery-grid"
                    style={{ scale: smoothScale, y }}
                >
                    {galleryItems.map((item) => (
                        <motion.div
                            key={item.id}
                            layoutId={`card-${item.id}`}
                            className={`gallery-item size-${item.size} material-${item.material}`}
                            onClick={() => setSelectedId(item.id)}
                            whileHover="hover"
                            initial="initial"
                        >
                            <div className="gallery-img-box">
                                <motion.img
                                    src={item.image}
                                    alt={item.title}
                                    className="bg-image"
                                />
                                <div className="material-sheen" />
                                <div className="overlay-gradient" />

                                {/* HUD OVERLAY */}
                                <div className="hud-overlay">
                                    <div className="hud-corner tl" />
                                    <div className="hud-corner tr" />
                                    <div className="hud-corner bl" />
                                    <div className="hud-corner br" />

                                    <motion.div
                                        className="hud-crosshair"
                                        variants={{
                                            initial: { opacity: 0, scale: 0 },
                                            hover: { opacity: 1, scale: 1 }
                                        }}
                                    />

                                    <div className="hud-data top-right">
                                        <span>ID: {item.id.toUpperCase()}</span>
                                    </div>

                                    <div className="hud-data bottom-right">
                                        <span>MAT: {item.material.toUpperCase()}</span>
                                    </div>
                                </div>

                                <div className="item-content">
                                    <motion.h3
                                        className="item-title"
                                        variants={{
                                            initial: { x: 0 },
                                            hover: { x: 10 }
                                        }}
                                    >
                                        {item.title}
                                    </motion.h3>
                                    <p className="item-category">{item.category}</p>
                                </div>

                                <motion.div
                                    className="scan-line"
                                    variants={{
                                        initial: { top: '-100%' },
                                        hover: {
                                            top: '200%',
                                            transition: { repeat: Infinity, duration: 1.5, ease: "linear" }
                                        }
                                    }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* EXPANDED VIEW OVERLAY */}
            <AnimatePresence>
                {selectedId && (
                    <div className="expanded-overlay-container">
                        <motion.div
                            className="overlay-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                        />
                        <motion.div
                            className="expanded-card"
                            layoutId={`card-${selectedId}`}
                        >
                            {(() => {
                                const item = galleryItems.find(p => p.id === selectedId);
                                return (
                                    <>
                                        <button className="close-btn" onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}>
                                            <span className="close-text">CLOSE</span> <span className="close-icon">×</span>
                                        </button>

                                        {/* EXPANDED IMAGE (LEFT) */}
                                        <div className="expanded-image-container">
                                            <motion.img
                                                src={item.image}
                                                alt={item.title}
                                                className="expanded-image"
                                            />
                                            <div className="img-overlay-tech">
                                                <span>IMG_sequence_001.raw</span>
                                            </div>
                                            {/* Decorative Grid on Image */}
                                            <div className="img-grid-overlay" />
                                        </div>

                                        {/* EXPANDED DETAILS (RIGHT COLUMN) */}
                                        <div className="expanded-details">
                                            <div className="details-bg-pattern" />

                                            <div className="details-header">
                                                <motion.span className="category-tag">
                                                    // {item.category}
                                                </motion.span>
                                                <div className="header-dots">
                                                    <span className="dot" /> <span className="dot" /> <span className="dot" />
                                                </div>
                                            </div>

                                            <motion.h2 className="title-large">{item.title}</motion.h2>

                                            <motion.p className="description-text">
                                                {item.description}
                                            </motion.p>

                                            <div className="specs-grid">
                                                <div className="spec-item">
                                                    <span className="spec-label">Material</span>
                                                    <span className="spec-value">{item.material.toUpperCase()}</span>
                                                </div>
                                                <div className="spec-item">
                                                    <span className="spec-label">Year</span>
                                                    <span className="spec-value">2024</span>
                                                </div>
                                                <div className="spec-item">
                                                    <span className="spec-label">Status</span>
                                                    <span className="spec-value active-status">PROTOTYPE</span>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })()}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style>{`
                .gallery-section {
                    padding: 4rem 0;
                    background-color: #050505;
                    color: #fff;
                    overflow: hidden;
                    position: relative;
                }

                /* --- HEADER --- */
                .gallery-header {
                    margin-bottom: 3rem;
                    padding: 0 4vw;
                }

                .header-meta {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 2rem;
                    color: #a3ff12;
                    font-family: monospace;
                    font-size: 0.7rem;
                    letter-spacing: 0.2em;
                }

                .meta-line {
                    height: 1px;
                    background: rgba(163, 255, 18, 0.3);
                    width: 50px;
                }

                .header-main {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    align-items: end;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    padding-bottom: 2rem;
                }

                .gallery-title {
                    font-family: 'Inter', sans-serif; /* Industrial sans */
                    font-size: 5rem;
                    font-weight: 700;
                    line-height: 0.9;
                    letter-spacing: -0.05em;
                    color: #fff;
                }

                .gallery-desc {
                    font-family: monospace;
                    font-size: 0.8rem;
                    color: #888;
                    line-height: 1.6;
                    text-align: right;
                    max-width: 400px;
                    justify-self: end;
                }

                /* --- GRID --- */
                .gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    grid-auto-rows: 350px;
                    gap: 20px;
                    padding: 0 4vw;
                }

                .gallery-item {
                    position: relative;
                    cursor: pointer;
                    background: #111;
                    overflow: hidden;
                    border: 1px solid rgba(255,255,255,0.05);
                }

                /* Size Modifiers */
                .size-small { grid-column: span 1; grid-row: span 1; }
                .size-large { grid-column: span 2; grid-row: span 1; }
                .size-tall  { grid-column: span 1; grid-row: span 2; }

                /* Inner Content */
                .gallery-img-box {
                    width: 100%;
                    height: 100%;
                    position: relative;
                }

                .bg-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    opacity: 0.6;
                    transition: opacity 0.5s ease;
                    filter: grayscale(100%);
                }

                .gallery-item:hover .bg-image {
                    opacity: 0.3; /* Darken on hover to show HUD */
                }

                .overlay-gradient {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, #000 0%, transparent 50%);
                    z-index: 1;
                }

                /* --- HUD ELEMENTS --- */
                .hud-overlay {
                    position: absolute;
                    inset: 10px;
                    border: 1px solid rgba(255,255,255,0.1);
                    z-index: 5;
                    pointer-events: none;
                }
                
                .gallery-item:hover .hud-overlay {
                    border-color: rgba(163, 255, 18, 0.3);
                }

                .hud-corner {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    border: 2px solid transparent;
                    transition: all 0.3s;
                }

                .gallery-item:hover .hud-corner {
                    border-color: #a3ff12;
                }

                .tl { top: -1px; left: -1px; border-top: 2px solid transparent; border-left: 2px solid transparent; }
                .tr { top: -1px; right: -1px; border-top: 2px solid transparent; border-right: 2px solid transparent; }
                .bl { bottom: -1px; left: -1px; border-bottom: 2px solid transparent; border-left: 2px solid transparent; }
                .br { bottom: -1px; right: -1px; border-bottom: 2px solid transparent; border-right: 2px solid transparent; }

                .hud-crosshair {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 20px;
                    height: 20px;
                    margin-left: -10px;
                    margin-top: -10px;
                }
                .hud-crosshair::before, .hud-crosshair::after {
                    content: '';
                    position: absolute;
                    background: #a3ff12;
                }
                .hud-crosshair::before { top: 9px; left: 0; width: 100%; height: 2px; }
                .hud-crosshair::after { left: 9px; top: 0; height: 100%; width: 2px; }

                .hud-data {
                    position: absolute;
                    font-family: monospace;
                    font-size: 0.6rem;
                    color: #a3ff12;
                    letter-spacing: 0.1em;
                    opacity: 0;
                    transition: opacity 0.3s;
                }
                
                .gallery-item:hover .hud-data { opacity: 1; }
                .top-right { top: 10px; right: 10px; }
                .bottom-right { bottom: 10px; right: 10px; text-align: right; }

                .scan-line {
                    position: absolute;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: rgba(163, 255, 18, 0.5);
                    box-shadow: 0 0 10px #a3ff12;
                    z-index: 10;
                    pointer-events: none;
                }

                /* --- CONTENT --- */
                .item-content {
                    position: absolute;
                    bottom: 20px;
                    left: 20px;
                    z-index: 20;
                }

                .item-title {
                    font-family: 'Inter', sans-serif;
                    font-size: 1.5rem;
                    font-weight: 500;
                    margin: 0;
                    color: #fff;
                    letter-spacing: -0.02em;
                }

                .item-category {
                    font-family: monospace;
                    font-size: 0.7rem;
                    color: #888;
                    margin-top: 5px;
                }

                /* --- EXPANDED CARD --- */
                .expanded-overlay-container {
                    position: fixed;
                    inset: 0;
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    perspective: 1000px;
                }

                .overlay-backdrop {
                    position: absolute;
                    inset: 0;
                    background: rgba(0,0,0,0.9);
                    backdrop-filter: blur(5px);
                }

                .expanded-card {
                    width: 85vw;
                    max-width: 1400px;
                    height: 85vh;
                    background: #0a0a0a;
                    border: 1px solid #333;
                    position: relative;
                    z-index: 10000;
                    display: flex;
                    box-shadow: 0 0 50px rgba(0,0,0,0.8);
                }

                .expanded-image-container {
                    flex: 1.5;
                    position: relative;
                    border-right: 1px solid rgba(255,255,255,0.05);
                }

                .expanded-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    /* slight desaturation for industrial feel */
                    filter: saturate(0.8); 
                }

                .img-overlay-tech {
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    font-family: monospace;
                    font-size: 0.6rem;
                    color: #fff;
                    background: rgba(0,0,0,0.7);
                    padding: 4px 8px;
                    border: 1px solid rgba(255,255,255,0.1);
                }

                .img-grid-overlay {
                    position: absolute;
                    inset: 0;
                    background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
                    background-size: 100px 100px;
                    pointer-events: none;
                }

                /* RIGHT COLUMN POLISH */
                .expanded-details {
                    flex: 1;
                    padding: 4rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    background: linear-gradient(to bottom, #0d0d0d, #050505);
                    position: relative;
                    overflow: hidden;
                }

                .details-bg-pattern {
                    position: absolute;
                    inset: 0;
                    background-image: radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px);
                    background-size: 20px 20px;
                    pointer-events: none;
                }

                .details-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 3rem;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    padding-bottom: 1rem;
                    position: relative;
                    z-index: 2;
                }

                .category-tag {
                    font-family: monospace;
                    color: #a3ff12;
                    font-size: 0.8rem;
                }

                .header-dots .dot {
                    display: inline-block;
                    width: 4px;
                    height: 4px;
                    background: #444;
                    border-radius: 50%;
                    margin-left: 6px;
                }

                .title-large {
                    font-family: 'Playfair Display', serif;
                    font-size: 4rem;
                    line-height: 1;
                    margin-bottom: 2rem;
                    color: #fff;
                    position: relative;
                    z-index: 2;
                }

                .description-text {
                    font-family: 'Inter', sans-serif;
                    font-size: 1rem;
                    line-height: 1.6;
                    color: #aaa;
                    margin-bottom: auto;
                    position: relative;
                    z-index: 2;
                }

                .specs-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    gap: 1rem;
                    border-top: 1px solid rgba(255,255,255,0.1);
                    padding-top: 2rem;
                    position: relative;
                    z-index: 2;
                }

                .spec-label {
                    display: block;
                    font-family: monospace;
                    font-size: 0.6rem;
                    color: #555;
                    margin-bottom: 4px;
                }

                .spec-value {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.9rem;
                    font-weight: 500;
                }
                
                .active-status {
                    color: #a3ff12;
                }

                .close-btn {
                    position: absolute;
                    top: 2rem;
                    right: 2rem;
                    background: none;
                    border: 1px solid rgba(255,255,255,0.1);
                    color: #fff;
                    padding: 0.5rem 1rem;
                    cursor: pointer;
                    z-index: 20;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.3s;
                }
                
                .close-text {
                    font-family: monospace;
                    font-size: 0.7rem;
                    letter-spacing: 0.1em;
                }
                
                .close-icon {
                    font-size: 1.2rem;
                    line-height: 0.8;
                }

                .close-btn:hover {
                    background: #fff;
                    color: #000;
                    border-color: #fff;
                }

                /* RESPONSIVE */
                @media (max-width: 1024px) {
                    .gallery-header {
                        margin-bottom: 4rem;
                    }
                    .header-main {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                    .gallery-desc {
                        text-align: left;
                        justify-self: start;
                    }
                    .gallery-title { font-size: 3rem; }
                    
                    .gallery-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    .size-large { grid-column: span 2; }
                    .size-tall { grid-column: span 1; }
                    
                    .expanded-card {
                        flex-direction: column;
                        width: 95vw;
                        height: 90vh;
                        overflow-y: scroll;
                    }
                    .expanded-image-container { flex: none; height: 40vh; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.1); }
                    .expanded-details { padding: 2rem; }
                }

                @media (max-width: 600px) {
                    .gallery-grid {
                        grid-template-columns: 1fr;
                        grid-auto-rows: 400px;
                    }
                    .size-large, .size-tall, .size-small {
                        grid-column: span 1;
                        grid-row: span 1;
                    }
                    .gallery-title { font-size: 2.5rem; }
                }
            `}</style>
        </section>
    );
}
