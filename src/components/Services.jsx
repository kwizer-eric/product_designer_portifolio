
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import './Services.css';

import ServiceDetailOverlay from './ServiceDetailOverlay';

const services = [
    {
        id: "s1",
        title: "Branding",
        number: "01",
        description: "Building cohesive visual identities that scale across physical and digital touchpoints. A rigorous approach to typography, color, and layout.",
        features: ["Visual Identity", "Art Direction", "Brand Strategy", "Guidelines"],
        visualType: "brand"
    },
    {
        id: "s2",
        title: "Product Design",
        number: "02",
        description: "From initial sketch to manufacturing-ready 3D models. We blend aesthetics with ergonomics to create physical objects that feel inevitable.",
        features: ["Industrial Design", "Ergonomics", "CMF Strategy", "Prototyping"],
        visualType: "product"
    },
    {
        id: "s3",
        title: "Development",
        number: "03",
        description: "Crafting immersive digital interfaces. High-performance web and mobile applications with a focus on interaction and motion.",
        features: ["UI/UX Design", "Frontend Dev", "Motion Design", "Creative Coding"],
        visualType: "digital"
    },
    {
        id: "s4",
        title: "Visual Creation",
        number: "04",
        description: "Guiding the visual narrative through lens and light. We oversee the entire aesthetic output to ensure a singular, uncompromising vision.",
        features: ["Photography", "Videography", "3D Visualization", "Art Direction"],
        visualType: "creative"
    }
];

const ServiceItem = ({ service, setFocusedService, onOpenDetail }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

    useEffect(() => {
        if (isInView) {
            setFocusedService(service);
        }
    }, [isInView, service, setFocusedService]);

    return (
        <div ref={ref} className="service-list-item">
            <div className="service-item-header">
                <span className="service-number">{service.number}</span>
                <span className="service-label">SERVICE // {service.id.toUpperCase()}</span>
            </div>
            <h2 className="service-item-title">{service.title}</h2>
            <p className="service-item-desc">{service.description}</p>
            <ul className="service-item-features">
                {service.features.map((f, i) => (
                    <li key={i}>
                        <span className="feature-icon">↦</span> {f}
                    </li>
                ))}
            </ul>
            <button className="service-view-work-btn" onClick={() => onOpenDetail(service)}>
                VIEW SELECTED WORK <span className="arrow">→</span>
            </button>
        </div>
    );
};

export default function Services() {
    const [focusedService, setFocusedService] = useState(services[0]);
    const [selectedServiceDetail, setSelectedServiceDetail] = useState(null);

    return (
        <section id="services" className="services-section-new">
            <div className="container services-container-new">

                {/* LEFT COLUMN: SCROLLABLE CONTENT */}
                <div className="services-list">
                    <div className="list-header">
                        <span>CAPABILITIES_INDEX</span>
                        <div className="list-line" />
                    </div>
                    {services.map((service) => (
                        <ServiceItem
                            key={service.id}
                            service={service}
                            setFocusedService={setFocusedService}
                            onOpenDetail={setSelectedServiceDetail}
                        />
                    ))}
                    <div className="list-footer">
                        <span>// END OF LIST</span>
                    </div>
                </div>

                {/* RIGHT COLUMN: STICKY VISUALS */}
                <div className="services-visual-col">
                    <div className="sticky-visual-wrapper">
                        <div className="visual-frame-outer">
                            <div className="frame-corner tl" />
                            <div className="frame-corner tr" />
                            <div className="frame-corner bl" />
                            <div className="frame-corner br" />

                            <div className="visual-display">
                                <motion.div
                                    key={focusedService.id}
                                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                    transition={{ duration: 0.5 }}
                                    className="visual-content"
                                >
                                    {focusedService.visualType === 'product' && <ProductVisual />}
                                    {focusedService.visualType === 'digital' && <DigitalVisual />}
                                    {focusedService.visualType === 'brand' && <BrandVisual />}
                                    {focusedService.visualType === 'creative' && <CreativeVisual />}
                                </motion.div>
                            </div>

                            <div className="visual-hud">
                                <span className="hud-id">ID: {focusedService.id.toUpperCase()}</span>
                                <span className="hud-type">TYPE: {focusedService.visualType.toUpperCase()}</span>
                                <div className="hud-status-light" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <AnimatePresence>
                {selectedServiceDetail && (
                    <ServiceDetailOverlay
                        service={selectedServiceDetail}
                        onClose={() => setSelectedServiceDetail(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}

/* --- CALCULATED VISUAL COMPONENTS --- */

const ProductVisual = () => (
    <div className="visual-component product">
        <div className="wireframe-box">
            <div className="face front"></div>
            <div className="face back"></div>
            <div className="face left"></div>
            <div className="face right"></div>
            <div className="face top"></div>
            <div className="face bottom"></div>
            <motion.div
                className="scan-plane"
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
        </div>
        <div className="measure-lines">
            <div className="line-x"><span>140mm</span></div>
            <div className="line-y"><span>65mm</span></div>
        </div>
    </div>
);

const DigitalVisual = () => (
    <div className="visual-component digital">
        <div className="code-window">
            <div className="window-header">
                <span className="dot r"></span><span className="dot y"></span><span className="dot g"></span>
            </div>
            <div className="code-content">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.1 }}
                >
                    <div className="code-row c-blue">import <span className="c-white">Future</span> from <span className="c-green">'./design'</span>;</div>
                    <div className="code-row c-purple">export default <span className="c-blue">function</span> <span className="c-yellow">Interface()</span> {'{'}</div>
                    <div className="code-row indent c-blue">return (</div>
                    <div className="code-row indent-2 c-white">&lt;<span className="c-red">Experience</span> /&gt;</div>
                    <div className="code-row indent c-blue">);</div>
                    <div className="code-row c-purple">{'}'}</div>
                </motion.div>
                <motion.div className="cursor-block" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} />
            </div>
        </div>
    </div>
);

const BrandVisual = () => (
    <div className="visual-component brand">
        <div className="grid-system">
            {[...Array(9)].map((_, i) => (
                <div key={i} className="grid-cell">
                    <div className="crosshair"></div>
                </div>
            ))}
            <motion.div
                className="logo-mark"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                <div className="logo-inner"></div>
            </motion.div>
        </div>
        <div className="canva-palette">
            <div className="p-swatch s1">#000000</div>
            <div className="p-swatch s2">#FFFFFF</div>
            <div className="p-swatch s3">#A3FF12</div>
        </div>
    </div>
);

const CreativeVisual = () => (
    <div className="visual-component creative">
        <div className="abstract-shapes">
            <motion.div
                className="shape-circle"
                animate={{ scale: [1, 1.2, 1], borderRadius: ["50%", "40%", "50%"] }}
                transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
                className="shape-rect"
                animate={{ rotate: 180 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="shape-blur"
                animate={{ x: [-20, 20, -20] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
        <div className="composition-guide">
            <div className="guide-line v-center"></div>
            <div className="guide-line h-center"></div>
        </div>
    </div>
);
