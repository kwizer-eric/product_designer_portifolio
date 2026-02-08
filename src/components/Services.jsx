
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ServiceCard from './ServiceCard';
import './Services.css';

export default function Services() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    // 4 items -> need to scroll 3 widths. 3/4 = 75%
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    const services = [
        {
            id: "svc-creative",
            title: "CREATIVE DESIGN",
            description: "Conceptual exploration and visual storytelling. Pushing boundaries to create unique aesthetics that resonate and inspire.",
            features: ["Art Direction", "Visual Concepts", "Moodboards", "Style Exploration"],
            visualType: "creative"
        },
        {
            id: "svc-brand",
            title: "BRAND SYSTEM",
            description: "Strategic brand systems that align vision, visuals, and voice. Helping companies communicate clearly, consistently, and confidently.",
            features: ["Brand Strategy", "Visual Identity", "Tone of Voice", "Design Systems"],
            visualType: "brand"
        },
        {
            id: "svc-product",
            title: "PRODUCT DESIGN",
            description: "Physical products designed with a 3D-first workflow, refining form, ergonomics, and details into manufacturable models ready for prototyping.",
            features: ["3D Modeling", "CAD Refinement", "Material Selection", "Prototyping"],
            visualType: "product"
        },
        {
            id: "svc-dev",
            title: "DEVELOPMENT",
            description: "Modern, responsive, and high-performing websites. Ensuring seamless functionality and fluid interactions across all devices.",
            features: ["Responsive Design", "Custom Development", "SEO Optimization", "E-commerce"],
            visualType: "dev"
        }
    ];

    return (
        <section ref={targetRef} className="services-section">
            <div className="sticky-wrapper">
                <div className="section-hud-top">
                    <span>SECTOR: SERVICES</span>
                    <span style={{ color: '#a3ff12' }}>DEBUG_SCROLL: <motion.span>{scrollYProgress}</motion.span></span>
                    <span>SCROLL_X &gt;</span>
                </div>

                {/* Using a key on the track to force re-render if needed, though usually not required */}
                <motion.div style={{ x }} className="services-track">
                    {services.map((s, i) => (
                        <ServiceCard key={s.id} number={i + 1} {...s} />
                    ))}
                </motion.div>

                <div className="section-progress">
                    <motion.div className="progress-bar" style={{ scaleX: scrollYProgress, transformOrigin: "left" }} />
                </div>
            </div>
        </section>
    );
}
