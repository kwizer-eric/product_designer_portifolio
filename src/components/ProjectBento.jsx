import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';


const projects = [
    {
        id: 'aether',
        title: 'Aether',
        category: 'Interface',
        material: 'aluminum',
        size: 'large', // spans 2 cols
        img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80'
    },
    {
        id: 'sentry',
        title: 'Sentry',
        category: 'Cybersecurity',
        material: 'clay',
        size: 'small',
        img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80'
    },
    {
        id: 'echo',
        title: 'Echo',
        category: 'Audio AI',
        material: 'chrome',
        size: 'tall', // spans 2 rows
        img: 'https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?auto=format&fit=crop&q=80'
    },
    {
        id: 'oasis',
        title: 'Oasis',
        category: 'Design System',
        material: 'aluminum',
        size: 'small',
        img: 'https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?auto=format&fit=crop&q=80'
    }
];

export default function ProjectBento() {
    const [selectedId, setSelectedId] = useState(null);
    const containerRef = useRef(null);

    // Breathing Interaction: Grid scales slightly with scroll
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.02, 0.95]);
    const smoothScale = useSpring(scale, { stiffness: 100, damping: 20 });

    return (
        <section ref={containerRef} className="bento-section">
            <div className="bento-header">
                <h2>THE SHOWROOM</h2>
                <p>EVOLUTIONARY design artifacts</p>
            </div>

            <motion.div className="bento-grid" style={{ scale: smoothScale }}>
                {projects.map(project => (
                    <motion.div
                        key={project.id}
                        layoutId={`card-${project.id}`}
                        onClick={() => setSelectedId(project.id)}
                        className={`bento-cell ${project.material} size-${project.size}`}
                        whileHover={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                        <div className="cell-bg" style={{ backgroundImage: `url(${project.img})` }} />
                        <div className="cell-content">
                            <h3>{project.title}</h3>
                            <span>{project.category}</span>
                        </div>
                        {/* Material Effects Overlay */}
                        <div className="material-sheen" />
                    </motion.div>
                ))}
            </motion.div>

            {/* EXPANDED VIEW OVERLAY */}
            <AnimatePresence>
                {selectedId && (
                    <motion.div className="expanded-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <motion.div
                            className="expanded-card"
                            layoutId={`card-${selectedId}`}
                        >
                            {/* Close Button */}
                            <button className="close-btn" onClick={() => setSelectedId(null)}>×</button>

                            {/* Content matches the card but expanded */}
                            {(() => {
                                const proj = projects.find(p => p.id === selectedId);
                                return (
                                    <>
                                        <div className="expanded-image" style={{ backgroundImage: `url(${proj.img})` }} />
                                        <div className="expanded-details">
                                            <h1>{proj.title}</h1>
                                            <p className="proj-meta">{proj.category} — 2024</p>
                                            <p className="proj-desc">
                                                High-fidelity exploration into {proj.material} aesthetics.
                                                This project focuses on the intersection of tangible materials and digital interfaces.
                                            </p>
                                        </div>
                                    </>
                                )
                            })()}
                        </motion.div>
                        {/* Backdrop click to close */}
                        <div className="overlay-backdrop" onClick={() => setSelectedId(null)} />
                    </motion.div>
                )}
            </AnimatePresence>
            <style>{styles}</style>
        </section>
    );
}

const styles = `
/* --- BENTO GRID LAYOUT --- */
.bento-section {
    padding: 10vh 5vw;
    background: #050505;
    min-height: 100vh;
}

.bento-header {
    margin-bottom: 5vh;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding-bottom: 20px;
}

.bento-header h2 {
    font-size: 3rem;
    font-weight: 300;
    letter-spacing: -0.05em;
    color: #fff;
}

.bento-header p {
    font-family: monospace;
    color: #555;
    letter-spacing: 0.2em;
    text-transform: uppercase;
}

.bento-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 300px;
    gap: 20px;
    width: 100%;
}

/* Size Modifiers */
.size-small { grid-column: span 1; }
.size-large { grid-column: span 2; }
.size-tall  { grid-column: span 1; grid-row: span 2; }

@media (max-width: 900px) {
    .bento-grid { grid-template-columns: 1fr; grid-auto-rows: 400px; }
    .size-small, .size-large, .size-tall { grid-column: span 1; grid-row: span 1; }
}

/* --- MATERIAL CARDS --- */
.bento-cell {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    background: #111;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 20px;
}

.cell-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0.6;
    transition: opacity 0.3s;
    mix-blend-mode: overlay;
    z-index: 1;
}

.bento-cell:hover .cell-bg {
    opacity: 0.8;
}

.cell-content {
    position: relative;
    z-index: 3;
    pointer-events: none;
}

.cell-content h3 {
    font-size: 1.5rem;
    color: #fff;
    margin-bottom: 5px;
}

.cell-content span {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.7;
}

/* MATERIAL: ALUMINUM */
.bento-cell.aluminum {
    background: linear-gradient(135deg, #2b2b2b 0%, #1a1a1a 100%);
    box-shadow: 
        inset 0 0 0 1px rgba(255,255,255,0.1),
        0 10px 30px rgba(0,0,0,0.5);
}
.bento-cell.aluminum .material-sheen {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%);
    z-index: 2;
}

/* MATERIAL: CLAY */
.bento-cell.clay {
    background: #1e1e1e;
    box-shadow: 
        20px 20px 60px #131313, 
        -20px -20px 60px #292929;
    border: none;
}
.bento-cell.clay .cell-content h3 { color: #e0e0e0; }

/* MATERIAL: CHROME */
.bento-cell.chrome {
    background: #000;
    border: 1px solid #333;
}
.bento-cell.chrome .cell-bg {
    mix-blend-mode: normal;
    filter: contrast(1.2) saturate(0);
}
.bento-cell.chrome:hover .cell-bg {
    filter: contrast(1.5) saturate(0) brightness(1.2);
}

/* --- EXPANDED VIEW --- */
.expanded-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none; /* Let backdrop handle clicks */
}

.overlay-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.8);
    backdrop-filter: blur(20px);
    pointer-events: auto;
}

.expanded-card {
    width: 60vw;
    height: 80vh;
    background: #111;
    border-radius: 30px;
    overflow: hidden;
    position: relative;
    z-index: 1001;
    display: flex;
    flex-direction: column;
    pointer-events: auto;
}

.expanded-image {
    width: 100%;
    height: 50%;
    background-size: cover;
    background-position: center;
}

.expanded-details {
    padding: 40px;
    color: #fff;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background: rgba(0,0,0,0.5);
    color: #fff;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 10;
}

@media (max-width: 900px) {
    .expanded-card { width: 90vw; height: 90vh; }
}
`;
