import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

// --- Visual Components (Refined & Ethereal) ---

const ProfileVisual = () => (
  <motion.div
    className="visual-card profile-visual"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
  >
    <div className="visual-inner">
      <div className="abstract-shape"></div>
    </div>
    <div className="visual-caption">
      <span>Erick</span>
      <span>San Francisco</span>
    </div>
  </motion.div>
);

const PortalVisual = ({ mouseX, mouseY }) => (
  <motion.div
    className="visual-card portal-visual"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
    transition={{ duration: 1, ease: "easeInOut" }}
  >
    <motion.div style={{ x: mouseX, y: mouseY }} className="orb-core" />
    <motion.div style={{ x: mouseX * -0.5, y: mouseY * -0.5 }} className="orb-glow" />
  </motion.div>
);

const ConstructVisual = ({ mouseX, mouseY }) => (
  <motion.div
    className="visual-card construct-visual"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8 }}
  >
    {/* Soft Glass Layers */}
    <motion.div style={{ x: mouseX, y: mouseY, rotate: 2 }} className="glass-pane pane-1" />
    <motion.div style={{ x: mouseX * -0.5, y: mouseY * -0.5, rotate: -1 }} className="glass-pane pane-2" />
    <motion.div style={{ x: mouseX * 0.2, y: mouseY * 0.2 }} className="glass-pane pane-3" />
  </motion.div>
);

const NetworkVisual = () => (
  <motion.div
    className="visual-card network-visual"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1 }}
  >
    <div className="network-glow" />
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="star-node"
        animate={{
          opacity: [0.3, 0.8, 0.3],
          scale: [1, 1.2, 1],
          x: [0, Math.random() * 20 - 10, 0],
          y: [0, Math.random() * 20 - 10, 0]
        }}
        transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          left: `${Math.random() * 80 + 10}%`,
          top: `${Math.random() * 80 + 10}%`
        }}
      />
    ))}
  </motion.div>
)

export default function About() {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  // Mouse Parallax Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 40, damping: 30 });
  const springY = useSpring(y, { stiffness: 40, damping: 30 });

  function handleMouseMove({ clientX, clientY, currentTarget }) {
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) / 40);
    y.set((clientY - centerY) / 40);
  }

  return (
    <section
      ref={containerRef}
      className="about-section"
      onMouseMove={handleMouseMove}
    >
      <div className="container">
        <div className="about-layout">

          {/* Left Column: Dynamic Sticky Visual */}
          <div className="sticky-col">
            <div className="sticky-wrapper">
              <AnimatePresence mode="popLayout" custom={activeSection}>
                {activeSection === 0 && <ProfileVisual key="profile" />}
                {activeSection === 1 && <PortalVisual key="portal" mouseX={springX} mouseY={springY} />}
                {activeSection === 2 && <ConstructVisual key="construct" mouseX={springX} mouseY={springY} />}
                {activeSection === 3 && <NetworkVisual key="network" />}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Scrolling Manifesto */}
          <motion.div style={{ y: yText }} className="scroll-col">
            {/* 0. Intro */}
            <motion.div
              className="manifesto-block"
              onViewportEnter={() => setActiveSection(0)}
              viewport={{ margin: "-30% 0px -30% 0px" }}
            >
              <span className="manifesto-label">00 / Introduction</span>
              <h2 className="manifesto-text">
                Hi, I'm <span className="highlight">Erick</span>. A multidisciplinary designer obsessed with the space between function and beauty.
              </h2>
              <p className="manifesto-p">
                I craft digital experiences that solve complex problems with clarity and emotion. My work bridges the gap between strategic thinking and pixel-perfect execution.
              </p>
              <a href="/resume.pdf" className="resume-btn" target="_blank" rel="noopener noreferrer">
                View Resume <span className="arrow">→</span>
              </a>
            </motion.div>

            {/* 1. Vision */}
            <motion.div
              className="manifesto-block offset"
              onViewportEnter={() => setActiveSection(1)}
              viewport={{ margin: "-30% 0px -30% 0px" }}
            >
              <span className="manifesto-label">01 / The Vision</span>
              <h2 className="manifesto-text">
                Digital products should feel <span className="highlight">inevitable</span>.
                Like they've always existed, waiting to be discovered.
              </h2>
            </motion.div>

            {/* 2. Approach */}
            <motion.div
              className="manifesto-block offset"
              onViewportEnter={() => setActiveSection(2)}
              viewport={{ margin: "-30% 0px -30% 0px" }}
            >
              <span className="manifesto-label">02 / The Approach</span>
              <h2 className="manifesto-text">
                I bridge the gap between <span className="highlight">system</span> and <span className="highlight">soul</span>.
                Crafting interfaces that are rigidly functional yet emotionally resonant.
              </h2>
            </motion.div>

            {/* 3. Experience */}
            <motion.div
              className="manifesto-block"
              onViewportEnter={() => setActiveSection(3)}
              viewport={{ margin: "-30% 0px -30% 0px" }}
            >
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
            </motion.div>

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
          height: 80vh; 
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .sticky-wrapper {
             width: 100%;
             max-width: 400px;
             aspect-ratio: 3/4;
             position: relative;
        }
        
        .visual-card {
           position: absolute;
           inset: 0;
           border-radius: 12px;
           overflow: hidden;
           background: #080808; /* Darker base */
           border: 1px solid rgba(255,255,255,0.03); /* Subtler border */
        }

        /* 0. Profile - Refined */
        .profile-visual {
           background: #0a0a0a;
        }
        .visual-inner {
           width: 100%;
           height: 100%;
           background: radial-gradient(circle at 40% 30%, #1a1a1a, #000);
           display: flex;
           align-items: center;
           justify-content: center;
           position: relative;
        }
        .visual-inner::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, transparent 0%, #000 100%);
            opacity: 0.8;
        }
        .abstract-shape {
           width: 60%;
           height: 60%;
           background: var(--color-accent);
           filter: blur(100px);
           border-radius: 50%;
           opacity: 0.2; /* Subtler */
        }
        .visual-caption {
           position: absolute;
           bottom: 0;
           left: 0;
           width: 100%;
           padding: 24px;
           display: flex;
           justify-content: space-between;
           font-family: var(--font-main);
           font-size: 0.75rem;
           text-transform: uppercase;
           letter-spacing: 0.2em;
           color: rgba(255,255,255,0.4);
           z-index: 10;
        }

        /* 1. Portal - Ethereal */
        .portal-visual {
           display: flex;
           align-items: center;
           justify-content: center;
           background: #050505;
        }
        .orb-core {
           width: 150px;
           height: 150px;
           background: linear-gradient(135deg, var(--color-accent), #a29bfe);
           border-radius: 50%;
           filter: blur(60px);
           opacity: 0.6;
        }
        .orb-glow {
           position: absolute;
           width: 300px;
           height: 300px;
           background: radial-gradient(circle, var(--color-accent) 0%, transparent 70%);
           opacity: 0.2;
           mix-blend-mode: screen;
        }

        /* 2. Construct - Frosted Glass */
        .construct-visual {
           display: flex;
           align-items: center;
           justify-content: center;
           background: linear-gradient(to bottom right, #0a0a0a, #000);
        }
        .glass-pane {
           position: absolute;
           background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01));
           backdrop-filter: blur(10px);
           border: 1px solid rgba(255,255,255,0.05);
           border-radius: 16px;
           box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
        }
        .pane-1 { width: 60%; height: 40%; z-index: 2; }
        .pane-2 { width: 50%; height: 60%; z-index: 1; opacity: 0.6; }
        .pane-3 { width: 70%; height: 30%; z-index: 3; background: rgba(59, 91, 219, 0.05); border-color: rgba(59, 91, 219, 0.1); }

        /* 3. Network - Cosmic */
        .network-visual {
           background: #020202;
           overflow: hidden;
        }
        .network-glow {
            position: absolute; 
            inset: 0;
            background: radial-gradient(circle at 50% 50%, #111 0%, #000 80%);
        }
        .star-node {
           position: absolute;
           width: 3px;
           height: 3px;
           background: #fff;
           border-radius: 50%;
           box-shadow: 0 0 4px #fff;
        }

        /* Text & Layout */
        
        .sticky-wrapper::after {
            /* Vignette */
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 12px;
            box-shadow: inset 0 0 100px rgba(0,0,0,0.8);
            pointer-events: none;
            z-index: 20;
        }

        .scroll-col {
           padding: var(--spacing-xl) var(--spacing-md);
           display: flex;
           flex-direction: column;
           gap: 35vh; /* Increased gap */
        }

        .manifesto-block {
           opacity: 0.9;
        }
        
        .manifesto-label {
           display: block;
           font-family: monospace;
           color: var(--color-accent);
           margin-bottom: var(--spacing-md);
           font-size: 0.8rem;
        }

        .manifesto-text {
           font-size: clamp(2rem, 5vw, 4rem);
           font-weight: 300;
           line-height: 1.1;
           color: var(--color-text);
           letter-spacing: -0.02em;
        }

        .highlight { color: #fff; font-weight: 500; text-shadow: 0 0 30px rgba(255,255,255,0.15); }
        .manifesto-p { font-size: 1.25rem; line-height: 1.6; color: var(--color-text-dim); max-width: 580px; margin-bottom: var(--spacing-lg); }
        .resume-btn { display: inline-flex; align-items: center; gap: 12px; padding: 14px 32px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 100px; color: #fff; text-decoration: none; text-transform: uppercase; letter-spacing: 0.15em; font-size: 0.75rem; margin-top: var(--spacing-md); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); backdrop-filter: blur(5px); }
        .resume-btn:hover { background: #fff; color: #000; border-color: #fff; box-shadow: 0 0 20px rgba(255,255,255,0.3); }
        .stats-row { display: flex; gap: var(--spacing-xl); border-top: 1px solid rgba(255,255,255,0.1); padding-top: var(--spacing-md); }
        .stat { display: flex; flex-direction: column; }
        .stat-num { font-size: 1.8rem; font-weight: 600; color: #fff; }
        .stat-label { font-size: 0.75rem; text-transform: uppercase; color: var(--color-text-dim); letter-spacing: 0.05em; }

        @media (min-width: 900px) {
          .about-layout {
            flex-direction: row;
            align-items: flex-start; 
          }
          .sticky-col {
             width: 45%; /* Slightly wider */
             align-self: flex-start; /* Important for sticky */
             position: sticky;
             top: 15vh;
             height: auto; 
          }
          .sticky-wrapper {
             width: 100%;
             max-width: none; /* Let it fill */
             aspect-ratio: 4/5; /* Taller potrait feel */
          }
          .scroll-col {
             width: 55%;
             padding-top: 15vh;
             padding-bottom: 15vh;
             padding-left: var(--spacing-xl);
          }
          .manifesto-block.offset {
             padding-left: var(--spacing-xxl);
          }
        }
      `}</style>
    </section>
  );
}
