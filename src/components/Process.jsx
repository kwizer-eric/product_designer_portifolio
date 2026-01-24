import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const steps = [
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="step-svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <path d="M15 9h.01" />
                <path d="M9 9h.01" />
            </svg>
        ),
        title: "DISCOVERY",
        description: "Deep dive into vision and user needs.",
        color: "#ffffff"
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="step-svg">
                <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
        ),
        title: "DESIGN",
        description: "High-fidelity prototypes and systems.",
        color: "#ffffff"
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="step-svg">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
        title: "DEVELOPMENT",
        description: "Robust, scalable engineering.",
        color: "#ffffff"
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="step-svg">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 1 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
            </svg>
        ),
        title: "LAUNCH",
        description: "Deploy, monitor, and scale.",
        color: "#a3e635" // Green
    }
];

const ProcessCard = ({ step, index }) => {
    const isLast = index === steps.length - 1;
    const accentColor = isLast ? "#a3e635" : "#ffffff";

    return (
        <div className="process-card-container">
            <motion.div
                className="process-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ margin: "-10%" }}
                transition={{ duration: 0.5 }}
            >
                {/* Bracket Corners */}
                <div className="bracket tl" style={{ borderColor: accentColor }} />
                <div className="bracket tr" style={{ borderColor: accentColor }} />
                <div className="bracket bl" style={{ borderColor: accentColor }} />
                <div className="bracket br" style={{ borderColor: accentColor }} />

                <div className="card-content">
                    <div className="icon-wrapper" style={{ color: accentColor }}>
                        {step.icon}
                    </div>
                    <h3 className="step-title" style={{ color: isLast ? accentColor : '#fff' }}>{step.title}</h3>
                    <p className="step-desc">{step.description}</p>
                </div>

            </motion.div>
        </div>
    );
};

export default function Process() {
    const containerRef = useRef(null);

    return (
        <section ref={containerRef} className="process-section">
            <div className="container">

                <div className="process-header">
                    <span className="sub-label">HOW IT WORKS</span>
                    <h2 className="title">FROM IDEA TO LAUNCH</h2>
                    <p className="subtitle">Crafting your next-gen digital success path</p>
                </div>

                <div className="cards-stack-wrapper">
                    {steps.map((step, i) => (
                        <ProcessCard key={i} step={step} index={i} />
                    ))}
                </div>

            </div>

            <style>{`
        .process-section {
            background-color: #000;
            color: #fff;
            padding: 10rem 2rem;
            position: relative;
        }

        .container {
            max-width: 600px; /* Keep it focused */
            margin: 0 auto;
        }

        .process-header {
            text-align: center;
            margin-bottom: 6rem;
        }

        .sub-label {
            color: #a3e635; /* Neon Green */
            font-family: monospace;
            font-size: 0.9rem;
            letter-spacing: 0.2em;
            display: block;
            margin-bottom: 1rem;
        }

        .title {
            font-size: clamp(2.5rem, 6vw, 4rem);
            line-height: 1;
            font-weight: 700;
            margin-bottom: 1rem;
            text-transform: uppercase;
        }

        .subtitle {
            font-size: 0.9rem;
            color: #666;
            letter-spacing: 0.1em;
            text-transform: uppercase;
        }

        .cards-stack-wrapper {
            display: flex;
            flex-direction: column;
            gap: 15vh;
            padding-bottom: 10vh;
        }

        .process-card-container {
            position: sticky;
            top: 25vh;
            height: 350px;
            display: flex;
            justify-content: center;
        }

        .process-card {
            width: 100%;
            height: 100%;
            background: #030303;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 50px rgba(0,0,0,0.8);
        }

        /* Brackets */
        .bracket {
            position: absolute;
            width: 20px;
            height: 20px;
            border-style: solid;
            border-width: 2px;
            pointer-events: none;
            transition: all 0.3s ease;
        }

        .tl { top: 0; left: 0; border-right: none; border-bottom: none; }
        .tr { top: 0; right: 0; border-left: none; border-bottom: none; }
        .bl { bottom: 0; left: 0; border-right: none; border-top: none; }
        .br { bottom: 0; right: 0; border-left: none; border-top: none; }

        .card-content {
            text-align: center;
            padding: 2rem;
        }

        .icon-wrapper {
            font-size: 4rem;
            margin-bottom: 2rem;
            display: flex;
            justify-content: center;
        }
        
        .step-svg {
            width: 80px;
            height: 80px;
        }

        .step-title {
            font-size: 2rem;
            font-weight: 700;
            letter-spacing: 0.05em;
            margin-bottom: 1rem;
        }

        .step-desc {
            font-size: 1rem;
            color: #888;
            font-family: monospace;
            max-width: 300px;
            margin: 0 auto;
        }
      `}</style>
        </section>
    );
}
