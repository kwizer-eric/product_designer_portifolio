
import React from 'react';
import { motion } from 'framer-motion';
import './Services.css';

const ServiceCard = ({ number, title, description, features, visualType }) => {
    return (
        <div className="service-card">
            {/* BACKGROUND GRID */}
            <div className="card-bg-grid" />

            <div className="service-content">
                <div className="service-header-row">
                    <span className="service-num">0{number}</span>
                    <div className="header-line" />
                    <span className="service-label">CAPABILITY_INDEX // SEC-{number}</span>
                </div>

                <motion.h2 className="service-title">
                    {title}
                </motion.h2>

                <p className="service-desc">
                    {description}
                </p>

                <ul className="service-features">
                    {features.map((feature, i) => (
                        <li key={i}>
                            <span className="check-icon">[x]</span>
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="service-visual">
                <div className="visual-frame">
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
                </div>
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
                    color: #a3ff12;
                    border: 1px solid #a3ff12;
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
