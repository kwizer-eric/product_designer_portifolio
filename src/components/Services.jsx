import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ServiceCard = ({ number, title, description, features, icon }) => {
    return (
        <div className="service-card">
            <div className="service-content">
                <div className="service-header-row">
                    <span className="service-num">0{number}</span>
                    <span className="service-label">OUR SERVICE</span>
                </div>

                <h2 className="service-title">{title}</h2>

                <p className="service-desc">
                    {description}
                </p>

                <ul className="service-features">
                    {features.map((feature, i) => (
                        <li key={i}>
                            <span className="check-icon">⊙</span>
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="service-visual">
                {/* Wireframe/Tech Visual Placeholder */}
                <div className="wireframe-box">
                    {icon}
                    <div className="grid-bg"></div>
                </div>
            </div>
        </div>
    );
};

export default function Services() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

    const services = [
        {
            title: "PRODUCT DESIGN",
            description: "Physical products designed with a 3D-first workflow, refining form, ergonomics, and details into manufacturable models ready for prototyping.",
            features: ["3D Modeling", "CAD Refinement", "Material Selection", "Prototyping"],
            icon: (
                <svg viewBox="0 0 100 100" className="service-svg" stroke="currentColor" fill="none" strokeWidth="1">
                    <path d="M20 50 L50 80 L80 50 L50 20 Z" />
                    <circle cx="50" cy="50" r="15" />
                    <line x1="20" y1="50" x2="80" y2="50" strokeDasharray="4 4" />
                </svg>
            )
        },
        {
            title: "BRAND GUIDELINES",
            description: "Strategic brand systems that align vision, visuals, and voice. Helping companies communicate clearly, consistently, and confidently.",
            features: ["Brand Strategy", "Visual Identity", "Tone of Voice", "Design Systems"],
            icon: (
                <svg viewBox="0 0 100 100" className="service-svg" stroke="currentColor" fill="none" strokeWidth="1">
                    <rect x="20" y="20" width="20" height="20" />
                    <rect x="50" y="20" width="30" height="10" />
                    <rect x="50" y="40" width="30" height="40" />
                    <circle cx="30" cy="70" r="10" />
                </svg>
            )
        },
        {
            title: "DEVELOPMENT",
            description: "Modern, responsive, and high-performing websites. Ensuring seamless functionality and fluid interactions across all devices.",
            features: ["Responsive Design", "Custom Development", "SEO Optimization", "E-commerce"],
            icon: (
                <svg viewBox="0 0 100 100" className="service-svg" stroke="currentColor" fill="none" strokeWidth="1">
                    <rect x="10" y="20" width="80" height="50" rx="2" />
                    <line x1="10" y1="60" x2="90" y2="60" />
                    <line x1="40" y1="80" x2="60" y2="80" />
                    <line x1="50" y1="70" x2="50" y2="80" />
                </svg>
            )
        }
    ];

    return (
        <section ref={targetRef} className="services-section">
            <div className="sticky-wrapper">
                <motion.div style={{ x }} className="services-track">
                    {services.map((s, i) => (
                        <ServiceCard key={i} number={i + 1} {...s} />
                    ))}
                </motion.div>
            </div>

            <style>{`
        .services-section {
            height: 300vh; /* Scroll distance */
            position: relative;
            background: #000;
        }

        .sticky-wrapper {
            position: sticky;
            top: 0;
            height: 100vh;
            display: flex;
            align-items: center;
            overflow: hidden;
        }

        .services-track {
            display: flex;
            width: 300vw; /* 3 cards */
        }

        .service-card {
            width: 100vw;
            height: 100vh;
            display: grid;
            grid-template-columns: 1fr 1fr;
            padding: 0 10vw;
            align-items: center;
            gap: 4rem;
            flex-shrink: 0;
        }

        /* Content Side */
        .service-content {
            color: #fff;
            max-width: 600px;
        }

        .service-header-row {
            display: flex;
            gap: 1rem;
            align-items: center;
            margin-bottom: 2rem;
            font-family: monospace;
            color: #666;
            letter-spacing: 0.1em;
        }
        
        .service-num { font-size: 1.2rem; color: #3b5bdb; font-weight: bold; }

        .service-title {
            font-size: clamp(3rem, 5vw, 5rem);
            line-height: 1;
            margin-bottom: 2rem;
            font-weight: 700;
            text-transform: uppercase;
        }

        .service-desc {
            font-size: 1.1rem;
            line-height: 1.6;
            color: #aaa;
            margin-bottom: 3rem;
        }

        .service-features {
            list-style: none;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .service-features li {
            display: flex;
            align-items: center;
            gap: 1rem;
            font-family: monospace;
            font-size: 1rem;
            color: #ccc;
        }

        .check-icon {
            color: #3b5bdb;
        }

        /* Visual Side */
        .service-visual {
            height: 60vh;
            border: 1px solid #222;
            background: #050505;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
        }

        .wireframe-box {
            width: 60%;
            height: 60%;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .grid-bg {
            position: absolute;
            inset: 0;
            background-image: 
                linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
            background-size: 20px 20px;
            opacity: 0.5;
            z-index: 0;
            transform: perspective(500px) rotateX(60deg) scale(2);
            mask-image: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%);
        }

        .service-svg {
            width: 100%;
            height: 100%;
            z-index: 10;
            filter: drop-shadow(0 0 10px rgba(59,91,219,0.3));
        }

        @media (max-width: 900px) {
            .services-section {
                height: auto; /* Disable horizontal scroll on mobile */
            }
            .sticky-wrapper {
                position: relative;
                top: 0;
                height: auto;
                display: block;
            }
            .services-track {
                width: 100%;
                flex-direction: column;
            }
            .service-card {
                width: 100%;
                height: auto;
                grid-template-columns: 1fr;
                padding: 4rem 2rem;
            }
            .service-visual {
                height: 40vh;
                order: -1; /* Visual first */
            }
        }
      `}</style>
        </section>
    );
}
