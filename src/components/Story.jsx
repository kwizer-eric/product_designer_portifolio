import { motion } from 'framer-motion';

export default function Story() {
    return (
        <section className="story-section">
            <div className="container">

                {/* Top Label */}
                <div className="story-header-label">
                    <span className="label-text">ERICK</span>
                </div>

                {/* Main Title Row */}
                <div className="story-title-row">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="story-title"
                    >
                        MY STORY
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="story-arrow"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                    </motion.div>
                </div>

                {/* Meta Grid */}
                <div className="meta-grid">
                    <div className="meta-col">
                        <span className="meta-label">ERICK</span>
                    </div>
                    <div className="meta-col center">
                        <span className="meta-label">VISUAL DESIGNER / 3D ARTIST / CREATIVE DIRECTOR</span>
                    </div>
                    <div className="meta-col end">
                        <span className="meta-label">SAN FRANCISCO, CA</span>
                    </div>
                </div>

                {/* Divider */}
                <div className="story-divider" />

                {/* Text Content */}
                <div className="story-content-grid">
                    <div className="story-col">
                        <p className="story-text">
                            Driven by an obsession with detail, I merge functional product design with immersive 3D aesthetics.
                            My work attempts to capture the invisible logic of systems and render them into tangible,
                            emotional experiences. For NOT just interfaces, but ecosystems.
                        </p>
                    </div>
                    <div className="story-col">
                        <p className="story-text">
                            I believe that true design is inevitable — it should feel like it has always existed.
                            By combining code, motion, and visual fidelity, I build products that respect the user's intelligence
                            while challenging their expectations. Every interaction is a story; every pixel is a voice.
                        </p>
                    </div>
                </div>

            </div>

            <style>{`
        .story-section {
            background-color: #050505;
            color: #fff;
            padding: 10rem 2rem;
            position: relative;
            z-index: 5; /* Ensure it sits nicely */
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
        }

        .story-header-label {
            display: flex;
            justify-content: center;
            margin-bottom: 2rem;
        }

        .label-text {
            border: 1px solid rgba(255,255,255,0.2);
            padding: 8px 16px;
            border-radius: 100px;
            font-size: 0.8rem;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: #aaa;
        }

        .story-title-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 4rem;
        }

        .story-title {
            font-size: clamp(6rem, 15vw, 16rem);
            line-height: 0.8;
            font-weight: 400; /* Thinner, editorial feel */
            letter-spacing: -0.04em;
            color: #e0e0e0;
            margin: 0;
        }

        .story-arrow {
            width: clamp(60px, 10vw, 150px);
            height: clamp(60px, 10vw, 150px);
            color: #555;
            flex-shrink: 0;
        }

        .meta-grid {
            display: grid;
            grid-template-columns: 1fr 2fr 1fr;
            margin-bottom: 2rem;
            font-family: monospace;
            font-size: 0.8rem;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }

        .meta-col.center { text-align: center; }
        .meta-col.end { text-align: right; }

        .story-divider {
            width: 100%;
            height: 1px;
            background: rgba(255,255,255,0.15);
            margin-bottom: 4rem;
        }

        .story-content-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
        }

        .story-text {
            font-size: 1.25rem;
            line-height: 1.6;
            color: #ccc;
            opacity: 0.9;
        }

        @media (max-width: 900px) {
            .story-title-row {
                flex-direction: column;
            }
            .story-arrow {
                align-self: flex-end;
                margin-top: -2rem;
            }
            .meta-grid {
                grid-template-columns: 1fr;
                gap: 1rem;
                text-align: left;
            }
            .meta-col.center { text-align: left; }
            .meta-col.end { text-align: left; }
            .story-content-grid {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
        }
      `}</style>
        </section>
    );
}
