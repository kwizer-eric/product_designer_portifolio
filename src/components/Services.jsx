
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ServiceCard from './ServiceCard';
import './Services.css';

export default function Services() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // We want to translate the track horizontally.
    // 4 items, each 100vw wide. Total width 400vw.
    // We need to move from 0 to -300vw (showing the 4th item).
    const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-300vw"]);

    const services = [
        {
            id: "s1",
            title: "CREATIVE DESIGN",
            description: "Conceptual exploration and visual storytelling. Pushing boundaries to create unique aesthetics that resonate and inspire.",
            features: ["Art Direction", "Visual Concepts", "Moodboards", "Style Exploration"],
            visualType: "creative"
        },
        {
            id: "s2",
            title: "BRAND SYSTEM",
            description: "Strategic brand systems that align vision, visuals, and voice. Helping companies communicate clearly, consistently, and confidently.",
            features: ["Brand Strategy", "Visual Identity", "Tone of Voice", "Design Systems"],
            visualType: "brand"
        },
        {
            id: "s3",
            title: "PRODUCT DESIGN",
            description: "Physical products designed with a 3D-first workflow, refining form, ergonomics, and details into manufacturable models ready for prototyping.",
            features: ["3D Modeling", "CAD Refinement", "Material Selection", "Prototyping"],
            visualType: "product"
        },
        {
            id: "s4",
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
                    <span>SCROLL_X &gt;</span>
                </div>

                <motion.div style={{ x }} className="services-track">
                    {services.map((s, i) => (
                        <ServiceCard key={s.id} number={i + 1} {...s} />
                    ))}
                </motion.div>

                {/* Optional Progress Bar */}
                <div className="section-progress">
                    <motion.div className="progress-bar" style={{ scaleX: scrollYProgress, transformOrigin: "left" }} />
                </div>
            </div>
        </section>
    );
}
