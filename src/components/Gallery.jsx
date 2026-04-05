import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

const galleryItems = [
    {
        id: 'wearable',
        title: "WEARABLE",
        category: "AUDIO",
        material: "aluminum",
        image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1000&auto=format&fit=crop",
        size: "large",
        description: "Audio. Body-fit.",
        client: "SL",
        role: "ID",
        year: "2024",
        challenge: "Heat + isolation.",
        solution: "Alu shell. Foam fit.",
        galleryImages: [
            "https://images.unsplash.com/photo-1618413346543-c7827e4466b5?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1629367494173-c78a56567877?q=80&w=800&auto=format&fit=crop"
        ]
    },
    {
        id: 'controller',
        title: "CONTROLLER",
        category: "GAMING",
        material: "clay",
        image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1000&auto=format&fit=crop",
        size: "small",
        description: "Pro input.",
        client: "NX",
        role: "Erg",
        year: "2023",
        challenge: "Fatigue. Latency.",
        solution: "Sculpted grip. Texture.",
        galleryImages: [
            "https://images.unsplash.com/photo-1600080972464-8cb002c91960?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1592840496073-f66e754d9c77?q=80&w=800&auto=format&fit=crop"
        ]
    },
    {
        id: 'speaker',
        title: "SMART SPEAKER",
        category: "HOME AUDIO",
        material: "chrome",
        image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1000&auto=format&fit=crop",
        size: "tall", // spans 2 rows
        description: "360 sound.",
        client: "AH",
        role: "PD",
        year: "2025",
        challenge: "Vibration. Size.",
        solution: "Decoupled frame. Chrome shell.",
        galleryImages: [
            "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1615563821037-cc5432c668b5?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?q=80&w=800&auto=format&fit=crop"
        ]
    },
    {
        id: 'watch',
        title: "WRISTWATCH",
        category: "HARDWARE",
        material: "aluminum",
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop",
        size: "small",
        description: "Time + health.",
        client: "CT",
        role: "ID",
        year: "2024",
        challenge: "Classic vs gadget.",
        solution: "Hidden sensors. OLED face.",
        galleryImages: [
            "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800&auto=format&fit=crop"
        ]
    },
    {
        id: 'earbuds',
        title: "EARBUDS",
        category: "PERSONAL AUDIO",
        material: "clay",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000&auto=format&fit=crop",
        size: "small",
        description: "Wireless. Tight.",
        client: "SL",
        role: "CMF",
        year: "2023",
        challenge: "Stay in. Move.",
        solution: "Balance. Matte clay.",
        galleryImages: [
            "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop"
        ]
    },
    {
        id: 'headphones',
        title: "HEADPHONES",
        category: "AUDIO DEVICE",
        material: "chrome",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
        size: "large",
        description: "Over-ear ref.",
        client: "PA",
        role: "Lead",
        year: "2022",
        challenge: "Audio + fashion.",
        solution: "Chrome + leather.",
        galleryImages: [
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop"
        ]
    },
    {
        id: 'vr',
        title: "VR HEADSET",
        category: "HARDWARE",
        material: "aluminum",
        image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1000&auto=format&fit=crop",
        size: "small",
        description: "VR. Inside-out.",
        client: "VX",
        role: "ID",
        year: "2025",
        challenge: "Neck strain.",
        solution: "Battery back. 50/50.",
        galleryImages: [
            "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=800&auto=format&fit=crop"
        ]
    },
    {
        id: 'laptop',
        title: "LAPTOP",
        category: "HARDWARE",
        material: "clay",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop",
        size: "tall",
        description: "Thin pro book.",
        client: "CC",
        role: "ID",
        year: "2024",
        challenge: "GPU heat. 18mm.",
        solution: "Vapor chamber. Micro base.",
        galleryImages: [
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop"
        ]
    }
];

export default function Gallery() {
    const [selectedId, setSelectedId] = useState(null);
    const containerRef = useRef(null);

    // Lock body scroll when popup is open
    useEffect(() => {
        if (selectedId) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedId]);

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
                        <span className="meta-label">07</span>
                        <div className="meta-line" />
                        <span className="meta-label">—</span>
                    </div>

                    <div className="header-main">
                        <motion.h2
                            className="gallery-title"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            Objects
                        </motion.h2>
                        <motion.p
                            className="gallery-desc"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Form · material
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

            {/* EXPANDED PROJECT VIEWER */}
            <AnimatePresence>
                {selectedId && (
                    <div className="project-viewer-portal">
                        <motion.div
                            className="viewer-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                        />
                        <motion.div
                            className="viewer-container"
                            layoutId={`card-${selectedId}`}
                        >
                            {(() => {
                                const item = galleryItems.find(p => p.id === selectedId);
                                return (
                                    <>
                                        <button className="viewer-close-btn" onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}>
                                            <span className="close-text">CLOSE PROJECT</span> <span className="close-icon">×</span>
                                        </button>

                                        <div className="viewer-content">
                                            {/* HERO HEADER */}
                                            <div className="viewer-hero">
                                                <div className="viewer-hero-image-wrapper">
                                                    <motion.img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="viewer-hero-image"
                                                    />
                                                    <div className="viewer-overlay-grid" />
                                                    <div className="viewer-tech-ui">
                                                        <span>001</span>
                                                    </div>
                                                </div>

                                                <div className="viewer-hero-content">
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.2 }}
                                                    >
                                                        <span className="viewer-category">{item.category}</span>
                                                        <h1 className="viewer-title">{item.title}</h1>
                                                        <p className="viewer-description">{item.description}</p>
                                                    </motion.div>

                                                    <motion.div
                                                        className="viewer-meta-grid"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 0.3 }}
                                                    >
                                                        <div className="meta-item">
                                                            <span className="meta-label">C</span>
                                                            <span className="meta-value">{item.client}</span>
                                                        </div>
                                                        <div className="meta-item">
                                                            <span className="meta-label">ROLE</span>
                                                            <span className="meta-value">{item.role}</span>
                                                        </div>
                                                        <div className="meta-item">
                                                            <span className="meta-label">Y</span>
                                                            <span className="meta-value">{item.year}</span>
                                                        </div>
                                                        <div className="meta-item">
                                                            <span className="meta-label">M</span>
                                                            <span className="meta-value">{item.material.toUpperCase()}</span>
                                                        </div>
                                                    </motion.div>
                                                </div>
                                            </div>

                                            {/* RICH CONTENT SECTIONS */}
                                            <div className="viewer-body">
                                                <div className="viewer-section">
                                                    <div className="section-label">Why</div>
                                                    <motion.p
                                                        className="section-text"
                                                        initial={{ opacity: 0, y: 20 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true }}
                                                    >
                                                        {item.challenge}
                                                    </motion.p>
                                                </div>

                                                <div className="viewer-section">
                                                    <div className="section-label">How</div>
                                                    <motion.p
                                                        className="section-text"
                                                        initial={{ opacity: 0, y: 20 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true }}
                                                    >
                                                        {item.solution}
                                                    </motion.p>
                                                </div>

                                                {/* ADDITIONAL GALLERY */}
                                                {item.galleryImages && item.galleryImages.length > 0 && (
                                                    <div className="viewer-gallery">
                                                        <div className="section-label">03 // VISUAL ARTIFACTS</div>
                                                        <div className="project-images-grid">
                                                            {item.galleryImages.map((img, index) => (
                                                                <motion.div
                                                                    key={index}
                                                                    className="project-image-item"
                                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                                    viewport={{ once: true }}
                                                                    transition={{ delay: index * 0.1 }}
                                                                >
                                                                    <img src={img} alt={`Detail ${index + 1}`} />
                                                                </motion.div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="viewer-footer">
                                                <div className="footer-line" />
                                                <span className="footer-end">—</span>
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
                    padding: 2rem 0;
                    background-color: var(--color-bg);
                    color: #fff;
                    position: relative;
                }

                /* --- HEADER --- */
                .gallery-header {
                    margin-bottom: 2rem;
                    padding: 0 4vw;
                }

                .header-meta {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 2rem;
                    color: var(--color-accent);
                    font-family: monospace;
                    font-size: 0.7rem;
                    letter-spacing: 0.2em;
                }

                .meta-line {
                    height: 1px;
                    background: rgba(201, 168, 76, 0.4);
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
                    font-family: var(--font-main);
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
                    background: var(--color-bg-deep);
                    overflow: hidden;
                    border: 1px solid var(--color-border);
                }

                .size-small { grid-column: span 1; grid-row: span 1; }
                .size-large { grid-column: span 2; grid-row: span 1; }
                .size-tall  { grid-column: span 1; grid-row: span 2; }

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
                    opacity: 0.3;
                }

                .overlay-gradient {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, #000 0%, transparent 50%);
                    z-index: 1;
                }

                /* HUD Elements */
                .hud-overlay {
                    position: absolute;
                    inset: 10px;
                    border: 1px solid var(--color-border);
                    z-index: 5;
                    pointer-events: none;
                }
                
                .gallery-item:hover .hud-overlay {
                    border-color: rgba(201, 168, 76, 0.45);
                }

                .hud-corner {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    border: 2px solid transparent;
                    transition: all 0.3s;
                }

                .gallery-item:hover .hud-corner {
                    border-color: var(--color-accent);
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
                    background: var(--color-accent);
                }
                .hud-crosshair::before { top: 9px; left: 0; width: 100%; height: 2px; }
                .hud-crosshair::after { left: 9px; top: 0; height: 100%; width: 2px; }

                .hud-data {
                    position: absolute;
                    font-family: monospace;
                    font-size: 0.6rem;
                    color: var(--color-accent);
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
                    background: rgba(245, 158, 11, 0.5);
                    box-shadow: 0 0 10px var(--color-accent);
                    z-index: 10;
                    pointer-events: none;
                }

                .item-content {
                    position: absolute;
                    bottom: 20px;
                    left: 20px;
                    z-index: 20;
                }

                .item-title {
                    font-family: var(--font-main);
                    font-size: 1.5rem;
                    font-weight: 500;
                    margin: 0;
                    color: var(--color-on-dark);
                    letter-spacing: -0.02em;
                }

                .item-category {
                    font-family: monospace;
                    font-size: 0.7rem;
                    color: rgba(245, 240, 232, 0.65);
                    margin-top: 5px;
                }

                /* --- PROJECT VIEWER (Full Screen Popup) --- */
                .project-viewer-portal {
                    position: fixed;
                    inset: 0;
                    z-index: 9999;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    overflow-y: auto;
                    padding-top: 0;
                }

                .viewer-backdrop {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.95);
                    backdrop-filter: blur(10px);
                    z-index: 1;
                }

                .viewer-container {
                    position: relative;
                    z-index: 2;
                    width: 100%;
                    max-width: 1600px;
                    background: #0a0a0a;
                    min-height: 100vh;
                    border-left: 1px solid #222;
                    border-right: 1px solid #222;
                }

                .viewer-close-btn {
                    position: fixed;
                    top: 2rem;
                    right: 4vw;
                    z-index: 100;
                    background: var(--color-accent);
                    color: #000;
                    border: none;
                    padding: 0.5rem 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    cursor: pointer;
                    font-weight: bold;
                    transition: transform 0.2s;
                }
                .viewer-close-btn:hover {
                    transform: scale(1.05);
                }
                .close-text {
                    font-family: monospace;
                    font-size: 0.7rem;
                    letter-spacing: 0.1em;
                }
                .close-icon { font-size: 1.2rem; line-height: 0.8; }

                /* Viewer Content */
                .viewer-content {
                    display: flex;
                    flex-direction: column;
                }

                .viewer-hero {
                    display: grid;
                    grid-template-columns: 1.2fr 1fr;
                    border-bottom: 1px solid rgba(245, 240, 232, 0.1);
                    min-height: 80vh;
                }

                .viewer-hero-image-wrapper {
                    position: relative;
                    border-right: 1px solid rgba(245, 240, 232, 0.1);
                    overflow: hidden;
                }

                .viewer-hero-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    /* Slight raw look */
                    filter: contrast(1.1) saturate(0.9);
                }

                .viewer-overlay-grid {
                    position: absolute;
                    inset: 0;
                    background-image: linear-gradient(rgba(245, 240, 232, 0.04) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(245, 240, 232, 0.04) 1px, transparent 1px);
                    background-size: 40px 40px;
                    pointer-events: none;
                }

                .viewer-tech-ui {
                    position: absolute;
                    bottom: 2rem;
                    left: 2rem;
                    font-family: monospace;
                    background: rgba(0, 0, 0, 0.55);
                    color: var(--color-on-dark);
                    padding: 4px 8px;
                    font-size: 0.7rem;
                    border: 1px solid rgba(245, 240, 232, 0.2);
                }

                .viewer-hero-content {
                    padding: 4rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    background: linear-gradient(to bottom, #242426, var(--color-panel));
                }

                .viewer-category {
                    display: block;
                    font-family: monospace;
                    color: var(--color-accent);
                    margin-bottom: 1rem;
                }

                .viewer-title {
                    font-family: var(--font-display);
                    font-size: 5rem;
                    font-weight: 400;
                    line-height: 0.95;
                    margin-bottom: 2rem;
                    color: #fff;
                }

                .viewer-description {
                    font-family: var(--font-main);
                    font-size: 1.1rem;
                    line-height: 1.6;
                    color: #aaa;
                    max-width: 600px;
                    margin-bottom: 4rem;
                }

                .viewer-meta-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                    border-top: 1px solid rgba(245, 240, 232, 0.1);
                    padding-top: 2rem;
                }

                .meta-item {
                    display: flex;
                    flex-direction: column;
                }

                .meta-label {
                    font-family: monospace;
                    font-size: 0.6rem;
                    color: rgba(245, 240, 232, 0.45);
                    margin-bottom: 0.5rem;
                }

                .meta-value {
                    font-family: var(--font-main);
                    font-size: 1rem;
                    color: var(--color-on-dark);
                }

                /* Viewer Body (Challenge/Solution) */
                .viewer-body {
                    padding: 0;
                }

                .viewer-section {
                    padding: 6rem 4rem;
                    border-bottom: 1px solid rgba(245, 240, 232, 0.1);
                    display: grid;
                    grid-template-columns: 300px 1fr;
                    gap: 2rem;
                }

                .section-label {
                    font-family: monospace;
                    font-size: 0.8rem;
                    color: var(--color-accent);
                    letter-spacing: 0.1em;
                }

                .section-text {
                    font-family: var(--font-main);
                    font-size: 1.5rem;
                    line-height: 1.5;
                    color: rgba(245, 240, 232, 0.88);
                    max-width: 800px;
                }

                /* Additional Gallery Grid */
                .viewer-gallery {
                    padding: 6rem 4rem;
                }

                .project-images-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 2rem;
                    margin-top: 2rem;
                }

                .project-image-item {
                    width: 100%;
                    aspect-ratio: 16/9;
                    background: #111;
                    overflow: hidden;
                }

                .project-image-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: grayscale(100%);
                    transition: filter 0.5s;
                }
                
                .project-image-item:hover img {
                    filter: grayscale(0%);
                }
                
                .viewer-footer {
                    padding: 4rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                }
                
                .footer-line {
                    width: 2px;
                    height: 50px;
                    background: rgba(201, 168, 76, 0.45);
                    margin-bottom: 1rem;
                }
                
                .footer-end {
                    font-family: monospace;
                    color: rgba(245, 240, 232, 0.45);
                    font-size: 0.8rem;
                }

                /* RESPONSIVE */
                @media (max-width: 1024px) {
                    .gallery-header { margin-bottom: 4rem; }
                    .header-main { grid-template-columns: 1fr; gap: 2rem; }
                    .gallery-desc { text-align: left; justify-self: start; }
                    .gallery-title { font-size: 3rem; }
                    .gallery-grid { grid-template-columns: repeat(2, 1fr); }
                    .size-large { grid-column: span 2; }
                    .size-tall { grid-column: span 1; }
                    
                    /* Viewer Mobile */
                    .viewer-hero { grid-template-columns: 1fr; }
                    .viewer-hero-image-wrapper { height: 50vh; border-right: none; border-bottom: 1px solid rgba(245, 240, 232, 0.1); }
                    .viewer-hero-content { padding: 2rem; }
                    .viewer-title { font-size: 3rem; }
                    .viewer-section { grid-template-columns: 1fr; padding: 3rem 2rem; gap: 1rem; }
                    .section-text { font-size: 1.1rem; }
                    .project-images-grid { grid-template-columns: 1fr; }
                    
                    .viewer-close-btn { right: 1rem; top: 1rem; }
                }

                @media (max-width: 600px) {
                    .gallery-grid { grid-template-columns: 1fr; }
                    .size-large, .size-tall, .size-small { grid-column: span 1; grid-row: span 1; }
                    .gallery-title { font-size: 2.5rem; }
                    
                    .viewer-title { font-size: 2.5rem; }
                    .viewer-meta-grid { grid-template-columns: 1fr; gap: 1rem; }
                }
            `}</style>
        </section>
    );
}
