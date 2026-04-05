import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const steps = [
    {
        id: "01",
        title: "Discover",
        description: "Listen.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop" // Abstract Tech/Globe
    },
    {
        id: "02",
        title: "Plan",
        description: "Frame.",
        image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800&auto=format&fit=crop" // Abstract Nodes
    },
    {
        id: "03",
        title: "Design",
        description: "Shape.",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop" // Abstract Fluid/Neon
    },
    {
        id: "04",
        title: "Ship",
        description: "Build.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop" // Code
    }
];

const ProcessCard = ({ step, index, total, scrollYProgress }) => {
    // Calculate start and end points for this card's animation based on total steps
    const stepSize = 1 / total;
    const start = stepSize * index;
    const end = start + stepSize;

    // Animate Y position: starts lower (100% of height) and moves to 0
    const y = useTransform(
        scrollYProgress,
        [start, end],
        ['100%', '0%']
    );

    // Animate Opacity: fade in as it moves up
    const opacity = useTransform(
        scrollYProgress,
        [start, start + (stepSize * 0.5)], // Fades in quickly
        [0, 1]
    );

    return (
        <motion.div
            className="process-card"
            style={{ y, opacity }}
        >
            <div className="card-image-wrapper">
                <img src={step.image} alt={step.title} className="card-image" />
                <div className="card-overlay" />
            </div>

            <div className="card-content">
                <span className="step-id">{step.id}</span>
                <div className="text-group">
                    <h3 className="card-title">{step.title}</h3>
                    <p className="card-desc">{step.description}</p>
                </div>
            </div>
        </motion.div>
    );
};

export default function Process() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} className="process-section">
            <div className="sticky-wrapper">
                <div className="header-content">
                    <span className="label">04</span>
                    <h2 className="title">Flow</h2>
                </div>

                <div className="cards-container">
                    {steps.map((step, i) => (
                        <ProcessCard
                            key={i}
                            step={step}
                            index={i}
                            total={steps.length}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </div>
            </div>

            <style>{`
                .process-section {
                    height: 300vh; /* Scrollytelling length */
                    background-color: var(--color-bg);
                    color: var(--color-text);
                    position: relative;
                }

                .sticky-wrapper {
                    position: sticky;
                    top: 0;
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    overflow: hidden;
                    padding: 0 5vw;
                }

                .header-content {
                    text-align: center;
                    margin-bottom: 4vh;
                    position: absolute;
                    top: 10vh;
                    width: 100%;
                    left: 0;
                    z-index: 10;
                    pointer-events: none;
                }

                .label {
                    color: var(--color-accent);
                    font-size: 0.8rem;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    display: block;
                    margin-bottom: 1rem;
                    text-shadow: 0 2px 10px rgba(0,0,0,0.5);
                }

                .title {
                    font-family: var(--font-display);
                    font-size: clamp(3.25rem, 6vw, 6.5rem);
                    font-weight: 700;
                    text-transform: uppercase;
                    line-height: 1;
                    margin: 0;
                    text-shadow: 0 2px 20px rgba(0,0,0,0.8);
                }

                .cards-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end; /* Align bottom */
                    gap: 1.5rem;
                    width: 100%;
                    height: 65vh; /* Area for cards */
                    max-width: var(--container-width);
                    margin: 0 auto;
                    position: relative;
                    top: 5vh;
                }

                .process-card {
                    flex: 1;
                    height: 100%;
                    max-height: 600px;
                    border-radius: 16px;
                    overflow: hidden;
                    position: relative;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
                    border: 1px solid var(--color-border);
                    transform-origin: bottom center;
                }

                .card-image-wrapper {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                }

                .card-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.7s ease;
                }

                .process-card:hover .card-image {
                    transform: scale(1.1);
                }

                .card-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        to top,
                        rgba(0,0,0,0.95) 0%,
                        rgba(0,0,0,0.6) 50%,
                        rgba(0,0,0,0.2) 100%
                    );
                    z-index: 2;
                }

                .card-content {
                    position: relative;
                    z-index: 3;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    padding: 2rem;
                }

                .step-id {
                    font-size: 5rem;
                    font-weight: 800;
                    color: transparent;
                    -webkit-text-stroke: 1px rgba(255,255,255,0.3);
                    line-height: 1;
                    margin-bottom: auto; /* Pushes number to top */
                    padding-top: 1rem;
                }

                .text-group {
                    transform: translateY(0);
                    transition: transform 0.3s ease;
                }

                .card-title {
                    font-size: 1.8rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                    color: var(--color-on-dark);
                    text-shadow: 0 2px 10px rgba(0,0,0,0.8);
                }

                .card-desc {
                    font-size: 1rem;
                    line-height: 1.5;
                    color: rgba(245, 240, 232, 0.82);
                    text-shadow: 0 1px 5px rgba(0,0,0,0.8);
                }

                @media (max-width: 1024px) {
                    .cards-container {
                        gap: 1rem;
                    }
                    .step-id {
                        font-size: 3rem;
                    }
                    .card-content {
                        padding: 1.5rem;
                    }
                }

                @media (max-width: 768px) {
                    .process-section {
                        height: auto;
                    }
                    .sticky-wrapper {
                        position: relative;
                        height: auto;
                        padding: 4rem 1.5rem;
                        display: block;
                    }
                    .header-content {
                        position: relative;
                        top: 0;
                        margin-bottom: 3rem;
                    }
                    .cards-container {
                        flex-direction: column;
                        height: auto;
                        gap: 2rem;
                        align-items: stretch;
                        top: 0;
                    }
                    .process-card {
                        opacity: 1 !important;
                        transform: none !important;
                        height: 400px;
                        max-height: none;
                    }
                }
            `}</style>
        </section>
    );
}
