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
                <div className="gallery-header">
                    <motion.span
                        className="gallery-overline"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        GALLERY
                    </motion.span>
                    <motion.h2
                        className="gallery-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                    >
                        PHYSICAL ARTIFACTS
                    </motion.h2>
                    <motion.p
                        className="gallery-desc"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        A CURATED COLLECTION OF INDUSTRIAL DESIGN WORK.<br />
                        EXPLORING FORM, MATERIALITY, AND USER INTERACTION.
                    </motion.p>
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
                            whileHover={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        >
                            <div className="gallery-img-box">
                                <motion.img
                                    src={item.image}
                                    alt={item.title}
                                    className="bg-image"
                                />
                                {/* Material Sheen Overlay */}
                                <div className="material-sheen" />

                                <div className="overlay-gradient" />
                                <div className="item-content">
                                    <h3 className="item-title">{item.title}</h3>
                                    <p className="item-category">{item.category}</p>
                                </div>
                                <div className="corner corner-tl" />
                                <div className="corner corner-br" />
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
                                        <button className="close-btn" onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}>×</button>
                                        <div className="expanded-image-container">
                                            <motion.img
                                                src={item.image}
                                                alt={item.title}
                                                className="expanded-image"
                                            />
                                        </div>
                                        <div className="expanded-details">
                                            <motion.h2 className="title-large">{item.title}</motion.h2>
                                            <motion.span className="category-tag">{item.category}</motion.span>
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
                    padding: 10rem 0;
                    background-color: #050505;
                    color: #fff;
                    overflow: hidden; /* Prevent scrollbar issues with transform */
                }

                .gallery-header {
                    text-align: center;
                    margin-bottom: 8rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .gallery-overline {
                    font-family: 'Inter', sans-serif;
                    color: #a3ff12; 
                    font-size: 0.8rem;
                    letter-spacing: 0.4em;
                    margin-bottom: 1.5rem;
                    font-weight: 600;
                }

                .gallery-title {
                    font-family: 'Inter', sans-serif;
                    font-size: 6rem;
                    font-weight: 300;
                    margin-bottom: 2rem;
                    letter-spacing: -0.04em;
                    line-height: 0.9;
                }

                .gallery-desc {
                    font-family: 'Inter', sans-serif;
                    font-size: 1rem;
                    color: rgba(255, 255, 255, 0.5);
                    line-height: 1.5;
                    max-width: 700px;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                }

                /* GRID LAYOUT */
                .gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    grid-auto-rows: 350px;
                    gap: 30px; /* Increased gap for better material separation */
                    padding: 0 4vw;
                }

                .gallery-item {
                    position: relative;
                    cursor: pointer;
                    border-radius: 20px; /* Rounded corners like ProjectBento */
                    overflow: hidden;
                    background: #111;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5); /* Base shadow */
                    transition: transform 0.3s;
                }

                /* Size Modifiers */
                .size-small { grid-column: span 1; grid-row: span 1; }
                .size-large { grid-column: span 2; grid-row: span 1; }
                .size-tall  { grid-column: span 1; grid-row: span 2; }

                /* MATERIAL AESTHETICS */
                
                /* ALUMINUM */
                .material-aluminum {
                    background: linear-gradient(135deg, #2b2b2b 0%, #1a1a1a 100%);
                    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.1), 0 15px 40px rgba(0,0,0,0.6);
                }
                .material-aluminum .material-sheen {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%);
                    z-index: 2;
                    pointer-events: none;
                }

                /* CLAY */
                .material-clay {
                    background: #1e1e1e;
                    box-shadow: 20px 20px 60px #131313, -20px -20px 60px #292929;
                    border: none;
                }

                /* CHROME */
                .material-chrome {
                    background: #000;
                    border: 1px solid #333;
                }
                .material-chrome .bg-image {
                    filter: contrast(1.2) saturate(0) grayscale(100%);
                }
                .material-chrome:hover .bg-image {
                    filter: contrast(1.4) saturate(0) brightness(1.2) grayscale(100%);
                }

                
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
                    mix-blend-mode: overlay; /* Blend with material background */
                }

                .gallery-item:hover .bg-image {
                    opacity: 0.8;
                }

                .overlay-gradient {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%);
                    z-index: 1;
                }

                .item-content {
                    position: absolute;
                    bottom: 25px;
                    left: 25px;
                    z-index: 3;
                }

                .item-title {
                    font-family: 'Inter', sans-serif;
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-bottom: 5px;
                    letter-spacing: -0.02em;
                    color: #fff;
                }

                .item-category {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.75rem;
                    color: #a3ff12;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                }

                .corner {
                    position: absolute;
                    width: 15px;
                    height: 15px;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    z-index: 5;
                    transition: all 0.3s ease;
                }

                .corner-tl { top: 15px; left: 15px; border-right: 0; border-bottom: 0; }
                .corner-br { bottom: 15px; right: 15px; border-left: 0; border-top: 0; }

                .gallery-item:hover .corner-tl { top: 10px; left: 10px; border-color: #a3ff12; }
                .gallery-item:hover .corner-br { bottom: 10px; right: 10px; border-color: #a3ff12; }


                /* EXPANDED VIEW */
                .expanded-overlay-container {
                    position: fixed;
                    inset: 0;
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .overlay-backdrop {
                    position: absolute;
                    inset: 0;
                    background: rgba(0,0,0,0.85);
                    backdrop-filter: blur(15px);
                }

                .expanded-card {
                    width: 80vw;
                    max-width: 1200px;
                    height: 80vh;
                    background: #111;
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 30px; /* Match item radius */
                    position: relative;
                    z-index: 10000;
                    display: flex;
                    overflow: hidden;
                    box-shadow: 0 50px 100px rgba(0,0,0,0.7);
                }

                .expanded-image-container {
                    flex: 1.5;
                    position: relative;
                    overflow: hidden;
                }

                .expanded-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .expanded-details {
                    flex: 1;
                    padding: 4rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    background: #111;
                }

                .title-large {
                    font-size: 4rem;
                    line-height: 1;
                    margin-bottom: 1rem;
                    letter-spacing: -0.03em;
                }

                .category-tag {
                    color: #a3ff12;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    font-size: 0.85rem;
                    margin-bottom: 3rem;
                    display: block;
                }

                .description-text {
                    font-size: 1.1rem;
                    line-height: 1.6;
                    color: #aaa;
                    margin-bottom: 4rem;
                }

                .specs-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                    border-top: 1px solid rgba(255,255,255,0.1);
                    padding-top: 2rem;
                }

                .spec-item {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .spec-label {
                    color: #555;
                    text-transform: uppercase;
                    font-size: 0.75rem;
                    letter-spacing: 0.1em;
                }

                .spec-value {
                    color: #fff;
                    font-size: 1rem;
                }

                .close-btn {
                    position: absolute;
                    top: 2rem;
                    right: 2rem;
                    background: rgba(0,0,0,0.5);
                    color: #fff;
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    font-size: 1.5rem;
                    cursor: pointer;
                    z-index: 10;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.3s;
                }

                .close-btn:hover {
                    background: #fff;
                    color: #000;
                }

                /* RESPONSIVE */
                @media (max-width: 1024px) {
                    .gallery-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    .size-large { grid-column: span 2; }
                    .size-tall { grid-column: span 1; }
                    
                    .expanded-card {
                        flex-direction: column;
                        width: 90vw;
                        height: 90vh;
                        overflow-y: auto;
                    }
                    .expanded-image-container {
                        flex: 1;
                        min-height: 40vh;
                    }
                    .expanded-details {
                        flex: 1;
                        padding: 2rem;
                    }
                    .title-large { font-size: 3rem; }
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
                    .gallery-title { font-size: 3rem; }
                    .expanded-details { padding: 1.5rem; }
                    .title-large { font-size: 2.5rem; }
                }
            `}</style>
        </section>
    );
}
