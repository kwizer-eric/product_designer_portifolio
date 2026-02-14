import { motion } from 'framer-motion';

export default function Story() {
  return (
    <section id="story" className="story-section">
      <div className="container">
        {/* Kicker */}
        <div className="story-kicker-row">
          <span className="story-kicker-label">Faustin Ahirwe</span>
          <span className="story-kicker-role">
            Product & Visual Designer · Digital / Physical systems
          </span>
        </div>

        {/* Main grid: portrait + story */}
        <div className="story-grid">
          {/* Left: Portrait / image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="story-photo-col"
          >
            <div className="story-photo-frame">
              <div className="story-photo-glow" />
              <div className="story-photo-inner">
                <img
                  src="/src/images/ahirwe.jpg"
                  alt="Portrait of Faustin Ahirwe"
                  className="story-photo-img"
                />
              </div>

              <div className="story-photo-meta">
                <span className="story-photo-tag">Designer</span>
                <span className="story-photo-year">Portfolio 2026</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
            className="story-copy-col"
          >
            <h2 className="story-title">A designer obsessed with how things feel.</h2>

            <p className="story-body">
              I design at the intersection of industrial design and digital product—where
              objects, interfaces, and motion all have to agree on the same story. I care
              about tactility: how a surface catches light, how a button eases into place,
              how a system feels when you live with it every day.
            </p>

            <p className="story-body">
              My process is concept-first and detail-obsessed. I sketch, prototype, and
              simulate until the product feels inevitable—whether it ends up as a 3D
              object on a desk, a UI on a screen, or a brand living across both.
            </p>

            <div className="story-concept-grid">
              <div className="story-concept-block">
                <span className="story-concept-label">Design pillars</span>
                <ul>
                  <li>Clarity over decoration</li>
                  <li>Systems, not screens</li>
                  <li>Motion with purpose</li>
                </ul>
              </div>
              <div className="story-concept-block">
                <span className="story-concept-label">Modes I work in</span>
                <ul>
                  <li>Product & UX strategy</li>
                  <li>Visual & brand direction</li>
                  <li>3D / CMF exploration</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .story-section {
          background-color: #050505;
          color: #ffffff;
          padding: 8rem 2rem;
          position: relative;
          z-index: 5;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .story-kicker-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          align-items: center;
          margin-bottom: 3rem;
          font-size: 0.8rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-family: monospace;
          color: #777;
        }

        .story-kicker-label {
          padding: 0.4rem 1rem;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: rgba(255, 255, 255, 0.02);
          color: #e0e0e0;
        }

        .story-kicker-role {
          opacity: 0.9;
        }

        .story-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.6fr);
          gap: 4rem;
          align-items: center;
        }

        .story-photo-col {
          display: flex;
          justify-content: flex-start;
        }

        .story-photo-frame {
          position: relative;
          max-width: 420px;
          width: 100%;
          border-radius: 1.75rem;
          padding: 1.2rem;
          background: radial-gradient(circle at 0 0, rgba(163, 255, 18, 0.2), transparent 60%),
            linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(0, 0, 0, 0.9));
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow:
            0 22px 50px rgba(0, 0, 0, 0.85),
            0 0 40px rgba(163, 255, 18, 0.08);
          overflow: hidden;
        }

        .story-photo-glow {
          position: absolute;
          inset: -40%;
          background:
            radial-gradient(circle at 20% 0%, rgba(163, 255, 18, 0.25), transparent 60%),
            radial-gradient(circle at 90% 80%, rgba(77, 166, 255, 0.18), transparent 60%);
          mix-blend-mode: screen;
          opacity: 0.7;
          pointer-events: none;
        }

        .story-photo-inner {
          position: relative;
          border-radius: 1.25rem;
          overflow: hidden;
          background: radial-gradient(circle at 50% 0%, #1a1a1a, #050505);
        }

        .story-photo-img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.02);
        }

        .story-photo-meta {
          position: absolute;
          bottom: 1.4rem;
          left: 1.6rem;
          right: 1.6rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.7rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-family: monospace;
          color: #f5f5f5;
        }

        .story-photo-tag {
          padding: 0.2rem 0.8rem;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .story-photo-year {
          color: #a3ff12;
        }

        .story-copy-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .story-title {
          font-size: clamp(2.4rem, 4vw, 3.2rem);
          font-weight: 700;
          letter-spacing: -0.04em;
          color: #f3f3f3;
          margin: 0;
        }

        .story-body {
          font-size: 1.05rem;
          line-height: 1.8;
          color: #c7c7c7;
          max-width: 36rem;
        }

        .story-concept-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 2rem;
          margin-top: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
        }

        .story-concept-block {
          font-size: 0.9rem;
          color: #b8b8b8;
        }

        .story-concept-label {
          display: block;
          font-family: monospace;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #7a7a7a;
          margin-bottom: 0.6rem;
        }

        .story-concept-block ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .story-concept-block li::before {
          content: '—';
          margin-right: 0.4rem;
          color: #a3ff12;
        }

        @media (max-width: 1024px) {
          .story-section {
            padding-inline: 1.5rem;
          }

          .story-grid {
            grid-template-columns: minmax(0, 1fr);
          }

          .story-photo-col {
            justify-content: center;
          }

          .story-copy-col {
            margin-top: 2rem;
          }
        }

        @media (max-width: 640px) {
          .story-section {
            padding-top: 6rem;
            padding-bottom: 6rem;
          }

          .story-kicker-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .story-concept-grid {
            grid-template-columns: minmax(0, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
