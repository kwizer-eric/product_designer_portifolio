import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax transform for the text column
  // It moves faster than the sticky image to create a sliding effect
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  // Subtle rotation for the sticky image based on scroll
  const rotateImg = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const scaleImg = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);

  return (
    <section ref={containerRef} className="about-section">
      <div className="container">
        <div className="about-layout">

          {/* Left Column: Sticky Visual (The Anchor) */}
          <div className="sticky-col">
            <div className="sticky-wrapper">
              <motion.div
                style={{ rotate: rotateImg, scale: scaleImg }}
                className="profile-visual"
              >
                <div className="visual-inner">
                  {/* Abstract representation of 'Human' */}
                  <div className="abstract-shape"></div>
                </div>
                <div className="visual-caption">
                  <span>Erick</span>
                  <span>San Francisco</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Scrolling Manifesto (The Story) */}
          <motion.div style={{ y: yText }} className="scroll-col">
            <div className="manifesto-block">
              <span className="manifesto-label">01 / The Vision</span>
              <h2 className="manifesto-text">
                Digital products should feel <span className="highlight">inevitable</span>.
                Like they've always existed, waiting to be discovered.
              </h2>
            </div>

            <div className="manifesto-block offset">
              <span className="manifesto-label">02 / The Approach</span>
              <h2 className="manifesto-text">
                I bridge the gap between <span className="highlight">system</span> and <span className="highlight">soul</span>.
                Crafting interfaces that are rigidly functional yet emotionally resonant.
              </h2>
            </div>

            <div className="manifesto-block">
              <span className="manifesto-label">03 / The Experience</span>
              <p className="manifesto-p">
                With over 8 years of experience, I've defined visual languages for global brands.
                My work is rooted in the belief that every pixel serves a purpose, and every interaction tells a story.
              </p>
              <div className="stats-row">
                <div className="stat">
                  <span className="stat-num">8+</span>
                  <span className="stat-label">Years Exp.</span>
                </div>
                <div className="stat">
                  <span className="stat-num">40+</span>
                  <span className="stat-label">Projects</span>
                </div>
                <div className="stat">
                  <span className="stat-num">Global</span>
                  <span className="stat-label">Reach</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
      <style>{`
        .about-section {
          background-color: var(--color-bg);
          position: relative;
          z-index: 2;
          padding-bottom: var(--spacing-xxl);
        }

        .container {
          max-width: var(--container-width);
          margin: 0 auto;
        }

        .about-layout {
          display: flex;
          flex-direction: column;
        }

        .sticky-col {
          height: 80vh; /* Mobile height */
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .profile-visual {
           width: 100%;
           max-width: 400px;
           aspect-ratio: 3/4;
           background: #111;
           border-radius: 8px;
           position: relative;
           overflow: hidden;
           border: 1px solid rgba(255,255,255,0.1);
        }
        
        .visual-inner {
           width: 100%;
           height: 100%;
           background: radial-gradient(circle at 30% 30%, #333, #000);
           display: flex;
           align-items: center;
           justify-content: center;
        }
        
        .abstract-shape {
           width: 50%;
           height: 50%;
           background: var(--color-accent);
           filter: blur(80px);
           border-radius: 50%;
           opacity: 0.6;
           animation: pulse 4s infinite alternate;
        }
        
        @keyframes pulse {
           0% { transform: scale(1); opacity: 0.5; }
           100% { transform: scale(1.2); opacity: 0.8; }
        }

        .visual-caption {
           position: absolute;
           bottom: 0;
           left: 0;
           width: 100%;
           padding: 20px;
           display: flex;
           justify-content: space-between;
           font-family: monospace;
           font-size: 0.8rem;
           color: rgba(255,255,255,0.6);
           background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
        }

        .scroll-col {
           padding: var(--spacing-xl) var(--spacing-md);
           display: flex;
           flex-direction: column;
           gap: var(--spacing-xxl);
        }

        .manifesto-block {
           opacity: 0.9;
        }
        
        .manifesto-block.offset {
           padding-left: 0; 
        }

        .manifesto-label {
           display: block;
           font-family: monospace;
           color: var(--color-accent);
           margin-bottom: var(--spacing-md);
        }

        .manifesto-text {
           font-size: clamp(2rem, 5vw, 4rem);
           font-weight: 300;
           line-height: 1.2;
           color: var(--color-text);
        }

        .highlight {
           color: #fff;
           font-weight: 500;
           text-shadow: 0 0 20px rgba(255,255,255,0.2);
        }
        
        .manifesto-p {
           font-size: 1.25rem;
           line-height: 1.6;
           color: var(--color-text-dim);
           max-width: 600px;
           margin-bottom: var(--spacing-lg);
        }
        
        .stats-row {
           display: flex;
           gap: var(--spacing-xl);
           border-top: 1px solid rgba(255,255,255,0.1);
           padding-top: var(--spacing-md);
        }
        
        .stat {
           display: flex;
           flex-direction: column;
        }
        
        .stat-num {
           font-size: 2rem;
           font-weight: 700;
           color: #fff;
        }
        
        .stat-label {
           font-size: 0.8rem;
           text-transform: uppercase;
           color: var(--color-text-dim);
        }

        @media (min-width: 900px) {
          .about-layout {
            flex-direction: row;
          }
          .sticky-col {
             width: 40%;
             height: 150vh; /* Taller track for sticky */
          }
          .sticky-wrapper {
             position: sticky;
             top: 20vh;
             width: 100%;
             display: flex;
             justify-content: center;
          }
          .scroll-col {
             width: 60%;
             padding-top: 20vh;
          }
          .manifesto-block.offset {
             padding-left: var(--spacing-xl);
          }
        }
      `}</style>
    </section>
  );
}
