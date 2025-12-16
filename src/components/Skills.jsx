import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

const SkillCard = ({ title, desc, tags, color, delay }) => {
  const ref = useRef(null);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x);
  const mouseY = useSpring(y);

  function handleMouseMove({ clientX, clientY, currentTarget }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPos = clientX - left;
    const yPos = clientY - top;

    // Calculate rotation (max 10deg)
    const rotateX = ((yPos - height / 2) / height) * -10;
    const rotateY = ((xPos - width / 2) / width) * 10;

    x.set(rotateX);
    y.set(rotateY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className="bento-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: mouseX, rotateY: mouseY }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="card-content">
        <div className="card-header">
          <div className="icon-blob" style={{ backgroundColor: color }} />
          <h3>{title}</h3>
        </div>
        <p>{desc}</p>
        <div className="tags">
          {tags.map(t => <span key={t} className="bento-tag">{t}</span>)}
        </div>
      </div>
    </motion.div>
  );
};

export default function Skills() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax Columns
  const yCol1 = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);
  const yCol2 = useTransform(scrollYProgress, [0, 1], ["5%", "-10%"]);

  return (
    <section ref={containerRef} className="skills-section">
      <div className="container">
        <motion.h2
          className="section-header"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Design Ecosystem
        </motion.h2>

        <div className="bento-grid">
          {/* Column 1 */}
          <motion.div style={{ y: yCol1 }} className="bento-col">
            <SkillCard
              title="Brand Strategy"
              desc="Defining the soul of the business before drawing a single pixel."
              tags={["DNA", "Voice", "Market"]}
              color="#ff6b6b"
              delay={0.1}
            />
            <SkillCard
              title="UI/UX Engineering"
              desc="Building scalable design systems that bridge Figma and Code."
              tags={["System", "React", "Tokens"]}
              color="#4ecdc4"
              delay={0.2}
            />
          </motion.div>

          {/* Column 2 */}
          <motion.div style={{ y: yCol2 }} className="bento-col">
            <SkillCard
              title="Motion & Interaction"
              desc="Choreographing the user journey with purposeful animation."
              tags={["Framer", "Lottie", "Feel"]}
              color="#ffe66d"
              delay={0.3}
            />
            <SkillCard
              title="3D & Spatial"
              desc="Expanding the canvas into the third dimension for immersive web3 experiences."
              tags={["Three.js", "Spline", "Depth"]}
              color="#ff9ff3"
              delay={0.4}
            />
          </motion.div>
        </div>
      </div>

      <style>{`
        .skills-section {
          padding: var(--spacing-xxl) var(--spacing-md);
          background-color: var(--color-bg);
          overflow: hidden; /* For parallax clipping */
        }
        
        .container {
          max-width: var(--container-width);
          margin: 0 auto;
        }

        .section-header {
           font-size: clamp(2rem, 5vw, 4rem);
           margin-bottom: var(--spacing-xl);
           color: var(--color-text);
           text-align: center;
        }

        .bento-grid {
           display: flex;
           flex-direction: column;
           gap: var(--spacing-md);
        }

        .bento-col {
           display: flex;
           flex-direction: column;
           gap: var(--spacing-md);
        }

        .bento-card {
           background: rgba(255,255,255,0.03);
           border: 1px solid rgba(255,255,255,0.05);
           border-radius: 24px;
           padding: var(--spacing-lg);
           transform-style: preserve-3d;
           perspective: 1000px;
           backdrop-filter: blur(10px);
           cursor: default;
        }

        .card-content {
           transform-style: preserve-3d;
           transform: translateZ(20px); /* Content pops out */
        }

        .card-header {
           display: flex;
           align-items: center;
           gap: 16px;
           margin-bottom: var(--spacing-md);
        }

        .icon-blob {
           width: 40px;
           height: 40px;
           border-radius: 12px;
           filter: blur(20px);
           opacity: 0.8;
        }

        .bento-card h3 {
           font-size: 1.8rem;
           font-weight: 500;
        }

        .bento-card p {
           font-size: 1.1rem;
           color: var(--color-text-dim);
           line-height: 1.5;
           margin-bottom: var(--spacing-md);
        }

        .tags {
           display: flex;
           gap: 10px;
           flex-wrap: wrap;
        }

        .bento-tag {
           font-size: 0.8rem;
           text-transform: uppercase;
           letter-spacing: 0.05em;
           padding: 6px 14px;
           background: rgba(255,255,255,0.05);
           border-radius: 100px;
           border: 1px solid rgba(255,255,255,0.1);
           color: #fff;
        }

        @media (min-width: 900px) {
           .bento-grid {
              flex-direction: row;
              gap: var(--spacing-lg);
              justify-content: center;
           }
           .bento-col {
              width: 45%;
           }
        }
      `}</style>
    </section>
  );
}
