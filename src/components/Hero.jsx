import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const skills = [
  {
    id: '01',
    title: 'Branding',
    intro: 'Identity Systems',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12L12 16L16 8" />
      </svg>
    ),
    color: '#eb4d4b'
  },
  {
    id: '02',
    title: 'Product',
    intro: 'User Experience',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    color: '#686de0'
  },
  {
    id: '03',
    title: 'Photo',
    intro: 'Visual Story',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
    color: '#f0932b'
  },
  {
    id: '04',
    title: 'Color',
    intro: 'Atmosphere',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2.69l5.74 5.88-5.74 5.88-5.74-5.88z" />
        <path d="M12 21.31l-5.74-5.88 5.74-5.88 5.74 5.88z" />
      </svg>
    ),
    color: '#badc58'
  },
  {
    id: '05',
    title: 'Concept',
    intro: 'Design Thinking',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 12h20" />
        <path d="M12 2v20" />
        <circle cx="12" cy="12" r="8" />
      </svg>
    ),
    color: '#00cec9'
  },
  {
    id: '06',
    title: 'Story',
    intro: 'Visual Boarding',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
        <line x1="7" y1="2" x2="7" y2="22" />
        <line x1="17" y1="2" x2="17" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="2" y1="7" x2="7" y2="7" />
        <line x1="2" y1="17" x2="7" y2="17" />
        <line x1="17" y1="17" x2="22" y2="17" />
        <line x1="17" y1="7" x2="22" y2="7" />
      </svg>
    ),
    color: '#fd79a8'
  },
  {
    id: '07',
    title: 'Vector',
    intro: 'Illustration',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
    color: '#e056fd'
  }
];

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax Values for 7 Islands
  // Spread out over the scroll range
  const yIsland1 = useTransform(scrollYProgress, [0, 0.25], ["110vh", "-60vh"]);
  const yIsland2 = useTransform(scrollYProgress, [0, 0.35], ["130vh", "-50vh"]);
  const yIsland3 = useTransform(scrollYProgress, [0, 0.45], ["150vh", "-40vh"]);
  const yIsland4 = useTransform(scrollYProgress, [0, 0.55], ["170vh", "-30vh"]);
  const yIsland5 = useTransform(scrollYProgress, [0, 0.65], ["190vh", "-20vh"]);
  const yIsland6 = useTransform(scrollYProgress, [0, 0.75], ["210vh", "-10vh"]);
  const yIsland7 = useTransform(scrollYProgress, [0, 0.85], ["230vh", "0vh"]);


  return (
    <section ref={containerRef} className="hero-section">
      <div className="sticky-wrapper">

        {/* Layer 1: Background */}
        <div className="bg-layer" />

        {/* Layer 2: Foreground Title */}
        <div className="title-layer">
          <h1>Visual<br />Designer</h1>
        </div>

        {/* Layer 3: Floating Islands */}
        <div className="islands-container">
          {/* 1. Branding */}
          <motion.div style={{ y: yIsland1, left: "5%", rotate: -5 }} className="island-card">
            <div className="island-icon" style={{ color: skills[0].color }}>{skills[0].icon}</div>
            <div className="island-info">
              <span className="island-label">{skills[0].id} &mdash; {skills[0].title}</span>
              <p className="island-intro">{skills[0].intro}</p>
            </div>
          </motion.div>

          {/* 2. Product */}
          <motion.div style={{ y: yIsland2, right: "8%", rotate: 3 }} className="island-card">
            <div className="island-icon" style={{ color: skills[1].color }}>{skills[1].icon}</div>
            <div className="island-info">
              <span className="island-label">{skills[1].id} &mdash; {skills[1].title}</span>
              <p className="island-intro">{skills[1].intro}</p>
            </div>
          </motion.div>

          {/* 3. Photo */}
          <motion.div style={{ y: yIsland3, left: "12%", rotate: 2 }} className="island-card glass">
            <div className="island-icon" style={{ color: skills[2].color }}>{skills[2].icon}</div>
            <div className="island-info">
              <span className="island-label">{skills[2].id} &mdash; {skills[2].title}</span>
              <p className="island-intro">{skills[2].intro}</p>
            </div>
          </motion.div>

          {/* 4. Color */}
          <motion.div style={{ y: yIsland4, right: "15%", rotate: -3 }} className="island-card glass">
            <div className="island-icon" style={{ color: skills[3].color }}>{skills[3].icon}</div>
            <div className="island-info">
              <span className="island-label">{skills[3].id} &mdash; {skills[3].title}</span>
              <p className="island-intro">{skills[3].intro}</p>
            </div>
          </motion.div>

          {/* 5. Concept */}
          <motion.div style={{ y: yIsland5, left: "20%", rotate: 4 }} className="island-card glass">
            <div className="island-icon" style={{ color: skills[4].color }}>{skills[4].icon}</div>
            <div className="island-info">
              <span className="island-label">{skills[4].id} &mdash; {skills[4].title}</span>
              <p className="island-intro">{skills[4].intro}</p>
            </div>
          </motion.div>

          {/* 6. Story */}
          <motion.div style={{ y: yIsland6, right: "5%", rotate: -2 }} className="island-card glass">
            <div className="island-icon" style={{ color: skills[5].color }}>{skills[5].icon}</div>
            <div className="island-info">
              <span className="island-label">{skills[5].id} &mdash; {skills[5].title}</span>
              <p className="island-intro">{skills[5].intro}</p>
            </div>
          </motion.div>

          {/* 7. Vector */}
          <motion.div style={{ y: yIsland7, left: "25%", rotate: -4 }} className="island-card glass">
            <div className="island-icon" style={{ color: skills[6].color }}>{skills[6].icon}</div>
            <div className="island-info">
              <span className="island-label">{skills[6].id} &mdash; {skills[6].title}</span>
              <p className="island-intro">{skills[6].intro}</p>
            </div>
          </motion.div>
        </div>

      </div>
      <style>{`
        .hero-section {
          height: 400vh; /* Extended Scroll space */
          background-color: var(--color-bg);
          position: relative;
        }

        .sticky-wrapper {
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
          width: 100%;
        }

        .bg-layer {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, #111 0%, var(--color-bg) 70%);
          z-index: 1;
        }

        .title-layer {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          pointer-events: none;
        }

        .title-layer h1 {
          font-size: clamp(5rem, 15vw, 15rem);
          line-height: 0.8;
          text-transform: uppercase;
          text-align: center;
          color: rgba(255,255,255,0.05);
          font-weight: 800;
          letter-spacing: -0.05em;
        }

        .islands-container {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
        }

        .island-card {
           position: absolute;
           width: 380px; /* Larger width */
           padding: var(--spacing-md);
           background: rgba(30,30,30,0.6);
           backdrop-filter: blur(20px);
           border: 1px solid rgba(255,255,255,0.1);
           border-radius: 16px;
           display: flex;
           gap: var(--spacing-md);
           align-items: center;
           box-shadow: 0 30px 60px rgba(0,0,0,0.4);
        }

        .island-icon {
           width: 64px; /* Larger icon */
           height: 64px;
           border-radius: 50%;
           background: rgba(255,255,255,0.05);
           display: flex;
           align-items: center;
           justify-content: center;
        }
        
        .island-icon svg {
           width: 32px;
           height: 32px;
        }

        .island-info {
           display: flex;
           flex-direction: column;
           gap: 6px;
        }

        .island-label {
           font-size: 0.9rem;
           text-transform: uppercase;
           letter-spacing: 0.1em;
           color: var(--color-text-dim);
        }

        .island-intro {
           font-size: 1.4rem; /* Larger Text */
           font-weight: 500;
           color: var(--color-text);
           line-height: 1.1;
        }

        @media (max-width: 768px) {
           .island-card {
              width: 260px;
              padding: var(--spacing-sm);
           }
           .island-intro {
              font-size: 1.1rem;
           }
        }
      `}</style>
    </section>
  );
}
