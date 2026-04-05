
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import './Services.css';

const ServiceCard = ({ number, title, description, features, visualType }) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <div
            className="service-card"
            ref={cardRef}
            onMouseMove={handleMouseMove}
        >
            {/* BACKGROUND GRID */}
            <div className="card-bg-grid" />

            {/* SPOTLIGHT EFFECT */}
            <div className="card-spotlight" />

            <div className="service-content">
                <motion.div
                    className="service-header-row"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <span className="service-num">0{number}</span>
                    <div className="header-line" />
                    <span className="service-label">CAPABILITY_INDEX // SEC-{number}</span>
                </motion.div>

                <motion.h2
                    className="service-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {title}
                </motion.h2>

                <motion.p
                    className="service-desc"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {description}
                </motion.p>

                <ul className="service-features">
                    {features.map((feature, i) => (
                        <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.4 + (i * 0.1) }}
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <span className="check-icon">[x]</span>
                            {feature}
                        </motion.li>
                    ))}
                </ul>
            </div>

            <div className="service-visual">
                <motion.div
                    className="visual-frame"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <div className="corner-marker tl" />
                    <div className="corner-marker tr" />
                    <div className="corner-marker bl" />
                    <div className="corner-marker br" />

                    {/* Extra HUD Elements */}
                    <div className="hud-coords">
                        <span>X: {34.002 + number * 10}</span>
                        <span>Y: {118.24 + number}</span>
                    </div>

                    <div className="hud-status">
                        <span className="add-blink">SYS.NORMAL</span>
                    </div>

                    {visualType === 'creative' && (
                        <div className="schematic-creative">
                            <div className="shape s1" />
                            <div className="shape s2" />
                            <div className="shape s3" />
                            <div className="composition-lines">
                                <div className="line v1" />
                                <div className="line h1" />
                            </div>
                        </div>
                    )}

                    {visualType === 'product' && (
                        <div className="schematic-product">
                            <div className="wireframe-cube">
                                <div className="face front" />
                                <div className="face back" />
                                <div className="face right" />
                                <div className="face left" />
                                <div className="face top" />
                                <div className="face bottom" />
                            </div>
                            <div className="dim-line x-dim"><span>120mm</span></div>
                            <div className="dim-line y-dim"><span>40mm</span></div>
                        </div>
                    )}

                    {visualType === 'brand' && (
                        <div className="schematic-brand">
                            <div className="typo-scale">
                                <div className="bar b1" />
                                <div className="bar b2" />
                                <div className="bar b3" />
                            </div>
                            <div className="color-grid">
                                <div className="c-box c1" />
                                <div className="c-box c2" />
                            </div>
                        </div>
                    )}

                    {visualType === 'dev' && (
                        <div className="schematic-dev">
                            <div className="code-block">
                                <div className="code-line w-80" />
                                <div className="code-line w-60 indent" />
                                <div className="code-line w-40 indent" />
                                <div className="code-line w-90" />
                            </div>
                            <div className="cursor-blink" />
                        </div>
                    )}

                    <div className="tech-readout">
                        <span>SYS_VISUALizer_v2.0</span>
                    </div>
                </motion.div>
            </div>

            <style>{`
                .hud-coords {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    font-family: monospace;
                    font-size: 0.6rem;
                    color: #555;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                }
                .hud-status {
                    position: absolute;
                    top: 1rem;
                    left: 1rem;
                    font-family: monospace;
                    font-size: 0.6rem;
                    color: var(--color-accent);
                    border: 1px solid var(--color-accent);
                    padding: 2px 4px;
                }
                .add-blink {
                    animation: blink 2s infinite;
                }
            `}</style>
        </div>
    );
};

export default ServiceCard;
