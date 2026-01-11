import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';


const About = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="about-editorial-section">
            <motion.div style={{ y, opacity }} className="about-container">
                <div className="editorial-header">
                    <h2>The <span className="accent">Vision</span></h2>
                </div>

                <div className="editorial-content">
                    <p className="lead-paragraph">
                        I am a <span className="highlight">Product Designer</span> who believes that interface is liquid thought.
                    </p>
                    <p>
                        My work exists at the intersection of aesthetic purity and functional depth.
                        I don't just build websites; I craft digital artifacts that feel alive.
                        Every interaction is a conversation, every pixel a deliberate choice.
                    </p>
                    <p>
                        With a background in both <span className="highlight">Visual Arts</span> and <span className="highlight">Engineering</span>,
                        I bridge the gap between "Make it Pop" and "Make it Work".
                    </p>
                </div>

                <div className="signature-block">
                    <p>Erick.</p>
                </div>
            </motion.div>

            <style>{`
                .about-editorial-section {
                    min-height: 80vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 10vh 5vw;
                    background: #050505;
                    color: #e0e0e0;
                }

                .about-container {
                    max-width: 800px;
                    display: flex;
                    flex-direction: column;
                    gap: 40px;
                }

                .editorial-header h2 {
                    font-size: 1rem;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    color: #555;
                    border-bottom: 1px solid #222;
                    padding-bottom: 20px;
                }

                .accent {
                    color: #3b5bdb; /* Blue */
                }

                .editorial-content {
                    font-family: 'Georgia', serif; /* Editorial vibe */
                    font-size: clamp(1.5rem, 3vw, 2.5rem);
                    line-height: 1.4;
                    font-weight: 300;
                }

                .lead-paragraph {
                    margin-bottom: 40px;
                    font-size: 1.1em;
                }

                .highlight {
                    color: #fff;
                    font-style: italic;
                    text-decoration: underline;
                    text-decoration-color: #3b5bdb;
                    text-underline-offset: 4px;
                }

                .editorial-content p {
                    margin-bottom: 30px;
                    opacity: 0.9;
                }

                .signature-block {
                    font-family: monospace;
                    font-size: 1.2rem;
                    color: #3b5bdb;
                    margin-top: 40px;
                }
            `}</style>
        </section>
    );
};

export default About;
