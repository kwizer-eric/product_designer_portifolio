import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import './About.css';

// --- Visual Components (Refined & Ethereal) ---

const ProfileVisual = () => (
  <motion.div
    className="visual-card profile-visual"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
  >
    <div className="scanline" />
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
    {/* Soft Glass Layers - Wrappers handle parallax, Inner divs handle CSS float/tilt */}
    <motion.div style={{ x: mouseX, y: mouseY }} className="pane-wrapper pane-1-wrap">
      <div className="glass-pane pane-1" />
    </motion.div>
    <motion.div style={{ x: mouseX * -0.5, y: mouseY * -0.5 }} className="pane-wrapper pane-2-wrap">
      <div className="glass-pane pane-2" />
    </motion.div>
    <motion.div style={{ x: mouseX * 0.2, y: mouseY * 0.2 }} className="pane-wrapper pane-3-wrap">
      <div className="glass-pane pane-3" />
    </motion.div>
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
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="star-node"
        animate={{
          opacity: [0.2, 0.8, 0.2],
          scale: [1, 1.5, 1],
        }}
        transition={{ duration: 3 + Math.random() * 5, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 5 }}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`
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
          <div className="about-sticky-col">
            <div className="about-sticky-wrapper">
              <AnimatePresence mode="popLayout" custom={activeSection}>
                {activeSection === 0 && <ProfileVisual key="profile" />}
                {activeSection === 1 && <PortalVisual key="portal" mouseX={springX} mouseY={springY} />}
                {activeSection === 2 && <ConstructVisual key="construct" mouseX={springX} mouseY={springY} />}
                {activeSection === 3 && <NetworkVisual key="network" />}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Scrolling Manifesto */}
          <motion.div style={{ y: yText }} className="about-scroll-col">
            {/* 0. Intro */}
            <motion.div
              className="manifesto-block"
              onViewportEnter={() => setActiveSection(0)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-30% 0px -30% 0px", once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
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
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-30% 0px -30% 0px", once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
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
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-30% 0px -30% 0px", once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
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
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-30% 0px -30% 0px", once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
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
    </section>
  );
}
