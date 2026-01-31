import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const CyberSigil = () => (
  <motion.div
    className="cyber-sigil"
    animate={{ rotate: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
  >
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
      <circle cx="50" cy="50" r="45" strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="50" cy="50" r="30" strokeWidth="1" />
      <path d="M50 5 L50 95 M5 50 L95 50" strokeWidth="0.5" />
      <rect x="35" y="35" width="30" height="30" strokeWidth="1" transform="rotate(45 50 50)" />
    </svg>
  </motion.div>
);

const GlitchHeader = ({ text }) => (
  <div className="glitch-header-wrapper">
    <h2 className="glitch-header" data-text={text}>{text}</h2>
  </div>
);

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const rotateSlight = useTransform(scrollYProgress, [0, 1], [2, -2]);

  return (
    <section ref={containerRef} className="about-section">
      <div className="container">

        <div className="about-grid">
          {/* Left Column: Fixed/Sticky Visuals */}
          <div className="about-visual-col">
            <div className="sticky-visuals">
              <CyberSigil />
              <div className="profile-frame">
                <div className="noise-overlay" />
                <div className="profile-glow" />
                <div className="profile-label">
                  <span>OPERATOR: ERICK</span>
                  <span>STATUS: ONLINE</span>
                  <span>LOC: SF_CA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Scrolling Manifesto */}
          <motion.div style={{ y: yParallax, rotate: rotateSlight }} className="about-content-col">

            <div className="content-block">
              <span className="block-idx">01</span>
              <GlitchHeader text="THE ARCHITECT" />
              <p className="manifesto-text">
                I don't just design interfaces; I engineer <span className="highlight">digital realities</span>.
                Obsessed with the friction between human intuition and machine logic.
              </p>
            </div>

            <div className="content-block offset-right">
              <span className="block-idx">02</span>
              <GlitchHeader text="METHODOLOGY" />
              <p className="manifesto-text">
                Systematic chaos. Bridging the gap between <span className="highlight">raw data</span> and
                <span className="highlight">visceral emotion</span>. Every pixel is a calculated decision.
              </p>
            </div>

            <div className="content-block">
              <span className="block-idx">03</span>
              <GlitchHeader text="CAPABILITIES" />
              <div className="stats-grid">
                <div className="stat-item">
                  <h3>8+</h3>
                  <p>Years in Field</p>
                </div>
                <div className="stat-item">
                  <h3>40+</h3>
                  <p>Systems Shipped</p>
                </div>
                <div className="stat-item">
                  <h3>∞</h3>
                  <p>Iterations</p>
                </div>
              </div>
              <a href="/resume.pdf" className="cyber-btn" target="_blank">
                INITIATE DOWNLOAD <span className="arrow">↗</span>
              </a>
            </div>

          </motion.div>
        </div>

      </div>

      <style>{`
        .about-section {
            background-color: #050505;
            color: #fff;
            padding: 10rem 2rem;
            position: relative;
            overflow: hidden;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
        }

        .about-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
        }

        /* Left Column */
        .about-visual-col {
            position: relative;
            height: 100%;
        }

        .sticky-visuals {
            position: sticky;
            top: 20vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
        }

        .cyber-sigil {
            width: 300px;
            height: 300px;
            color: rgba(59, 91, 219, 0.2);
        }

        .profile-frame {
            width: 100%;
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 1.5rem;
            background: rgba(10, 10, 10, 0.5);
            backdrop-filter: blur(10px);
            position: relative;
        }

        .profile-label {
            display: flex;
            justify-content: space-between;
            font-family: monospace;
            font-size: 0.8rem;
            color: #555;
            letter-spacing: 0.1em;
        }

        /* Right Column */
        .about-content-col {
            padding-top: 10vh;
            display: flex;
            flex-direction: column;
            gap: 15vh;
        }

        .content-block {
            position: relative;
        }

        .block-idx {
            font-family: monospace;
            font-size: 1rem;
            color: #3b5bdb;
            margin-bottom: 1rem;
            display: block;
        }

        .glitch-header {
            font-size: clamp(3rem, 6vw, 6rem);
            font-weight: 800;
            line-height: 0.9;
            margin-bottom: 2rem;
            text-transform: uppercase;
            position: relative;
            color: #fff;
        }

        .manifesto-text {
            font-size: 1.5rem;
            line-height: 1.4;
            color: #aaa;
            max-width: 600px;
        }

        .highlight {
            color: #fff;
            text-decoration: underline;
            text-decoration-color: #3b5bdb;
            text-underline-offset: 4px;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            margin: 3rem 0;
            border-top: 1px solid rgba(255,255,255,0.1);
            padding-top: 2rem;
        }

        .stat-item h3 {
            font-size: 3rem;
            font-weight: 700;
            color: #3b5bdb;
        }

        .stat-item p {
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #666;
        }

        .cyber-btn {
            display: inline-flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem 2rem;
            background: #fff;
            color: #000;
            font-weight: 700;
            text-decoration: none;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            transition: all 0.3s ease;
        }

        .cyber-btn:hover {
            background: #3b5bdb;
            color: #fff;
        }

        @media (max-width: 900px) {
            .about-grid {
                grid-template-columns: 1fr;
            }
            .sticky-visuals {
                position: relative;
                top: 0;
                margin-bottom: 4rem;
            }
        }
      `}</style>
    </section>
  );
}
