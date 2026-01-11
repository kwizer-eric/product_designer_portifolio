import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  // Parallax for text
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section ref={containerRef} className="hero-section">
      <div className="hero-content">
        <motion.div style={{ y: y1, opacity }} className="hero-line">
          <span className="outline">VISUAL</span>
        </motion.div>

        <motion.div style={{ y: y2, opacity }} className="hero-line indent">
          <span className="filled">DESIGNER</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="hero-meta"
        >
          <p>Based in Digital Space</p>
          <p>Available for 2024</p>
        </motion.div>
      </div>

      <div className="hero-bg">
        <div className="gradient-blob b1" />
        <div className="gradient-blob b2" />
        <div className="noise-overlay" />
      </div>

      <style>{`
        .hero-section {
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: #050505;
          overflow: hidden;
        }

        .hero-content {
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 0;
          mix-blend-mode: exclusion;
        }

        .hero-line {
          font-size: clamp(4rem, 15vw, 15rem);
          line-height: 0.85;
          font-weight: 800;
          letter-spacing: -0.05em;
          color: #fff;
          white-space: nowrap;
        }

        .hero-line.indent {
          margin-left: 15vw;
        }

        .outline {
          -webkit-text-stroke: 2px rgba(255,255,255,0.8);
          color: transparent;
        }

        .filled {
          color: #fff;
        }

        .hero-meta {
            margin-top: 5vh;
            display: flex;
            gap: 40px;
            font-family: monospace;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: rgba(255,255,255,0.5);
            font-size: 0.9rem;
        }

        /* Ambient Background */
        .hero-bg {
            position: absolute;
            inset: 0;
            z-index: 1;
        }

        .gradient-blob {
            position: absolute;
            filter: blur(80px);
            opacity: 0.4;
            border-radius: 50%;
            animation: float 10s ease-in-out infinite;
        }

        .b1 {
            width: 50vw;
            height: 50vw;
            background: #3b5bdb; /* Accent Blue */
            top: -10%;
            left: -10%;
        }

        .b2 {
            width: 40vw;
            height: 40vw;
            background: #e04f5f; /* Accent Red/Pink */
            bottom: -10%;
            right: -10%;
            animation-delay: -5s;
        }

        .noise-overlay {
            position: absolute;
            inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
            opacity: 0.5;
        }

        @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
        }
      `}</style>
    </section>
  );
}
