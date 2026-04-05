import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import SplitType from 'split-type';
import { useGSAP } from '@gsap/react';

export default function Hero() {
    const { scrollY } = useScroll();
    const yBlock = useTransform(scrollY, [0, 600], [0, 120]);
    const opacityBlock = useTransform(scrollY, [0, 400], [1, 0.35]);
    const containerRef = useRef(null);

    useGSAP(
        () => {
            const split = new SplitType('.hero-v2-headline', { types: 'lines, words' });
            gsap.from(split.words, {
                y: '120%',
                opacity: 0,
                duration: 1.1,
                ease: 'power4.out',
                stagger: 0.06,
                delay: 0.15,
            });

            gsap.from('.hero-v2-kicker span', {
                y: 24,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.08,
                delay: 0.4,
            });

            gsap.from('.hero-v2-aside, .hero-v2-cta-row', {
                y: 20,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                stagger: 0.1,
                delay: 0.85,
            });

            gsap.from('.hero-v2-foot', {
                y: 20,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                delay: 0.95,
            });
        },
        { scope: containerRef },
    );

    return (
        <section id="hero" className="hero-v2" ref={containerRef}>
            <div className="hero-v2-bg" aria-hidden="true">
                <div className="hero-v2-mesh" />
                <div className="hero-v2-grid" />
            </div>

            <motion.div className="hero-v2-inner container" style={{ y: yBlock, opacity: opacityBlock }}>
                <header className="hero-v2-top">
                    <div className="hero-v2-kicker">
                        <span>Design</span>
                        <span className="hero-v2-dot" aria-hidden="true" />
                        <span>KGL</span>
                    </div>
                    <div className="hero-v2-index">01</div>
                </header>

                <div className="hero-v2-main">
                    <div className="hero-v2-copy">
                        <h1 className="hero-v2-headline">
                            Ship.
                            <br />
                            <span className="hero-v2-headline-muted">Scale.</span>
                        </h1>
                    </div>

                    <aside className="hero-v2-aside">
                        <div className="hero-v2-aside-block">
                            <span className="hero-v2-aside-label">—</span>
                            <p>UX · UI · 3D</p>
                        </div>
                        <div className="hero-v2-aside-block">
                            <span className="hero-v2-aside-label">—</span>
                            <p>Open · ’26</p>
                        </div>
                    </aside>
                </div>

                <div className="hero-v2-cta-row">
                    <a href="#work" className="hero-v2-btn hero-v2-btn-primary">
                        Work
                    </a>
                </div>

                <footer className="hero-v2-foot">
                    <div className="hero-v2-scroll">
                        <span className="hero-v2-scroll-line" />
                        <span>↓</span>
                    </div>
                </footer>
            </motion.div>

            <style>{`
        .hero-v2 {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          background: var(--color-bg);
          color: var(--color-text);
        }

        .hero-v2-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .hero-v2-mesh {
          position: absolute;
          inset: -20%;
          background:
            radial-gradient(ellipse 80% 50% at 10% 20%, rgba(201, 168, 76, 0.18), transparent 52%),
            radial-gradient(ellipse 60% 40% at 90% 10%, rgba(201, 168, 76, 0.1), transparent 48%),
            radial-gradient(circle at 50% 100%, var(--color-bg-deep) 0%, var(--color-bg) 100%);
          filter: blur(0);
        }

        .hero-v2-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(28, 28, 30, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(28, 28, 30, 0.06) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 70%);
          opacity: 0.5;
        }

        .hero-v2-inner {
          position: relative;
          z-index: 1;
          max-width: 1600px;
          margin: 0 auto;
          padding: clamp(5.5rem, 10vw, 7rem) clamp(1.25rem, 4vw, 2.5rem) 2.5rem;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: clamp(2rem, 5vw, 3.5rem);
        }

        .hero-v2-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .hero-v2-kicker {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: ui-monospace, monospace;
          font-size: var(--text-xs);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-text-dim);
        }

        .hero-v2-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--color-accent);
        }

        .hero-v2-index {
          font-family: ui-monospace, monospace;
          font-size: var(--text-xs);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text-muted);
        }

        .hero-v2-main {
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.65fr);
          gap: clamp(2rem, 5vw, 4rem);
          align-items: end;
        }

        .hero-v2-headline {
          font-family: var(--font-display);
          font-size: var(--text-display-lg);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.045em;
          margin: 0;
        }

        .hero-v2-headline .line {
          display: block;
          overflow: hidden;
        }

        .hero-v2-headline-muted {
          color: var(--color-text-muted);
          display: inline-block;
        }

        .hero-v2-aside {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          padding-bottom: 0.25rem;
          border-left: 1px solid var(--color-border);
          padding-left: 1.5rem;
        }

        .hero-v2-aside-label {
          display: block;
          font-family: ui-monospace, monospace;
          font-size: 0.65rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin-bottom: 0.5rem;
        }

        .hero-v2-aside-block p {
          margin: 0;
          font-size: var(--text-sm);
          line-height: 1.5;
          color: var(--color-text-dim);
        }

        .hero-v2-cta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .hero-v2-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.95rem 1.85rem;
          border-radius: 999px;
          font-size: var(--text-sm);
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
        }

        .hero-v2-btn-primary {
          background: var(--color-ink);
          color: var(--color-on-dark);
          border: 1px solid var(--color-ink);
        }

        .hero-v2-btn-primary:hover {
          background: var(--color-accent);
          border-color: var(--color-accent);
          color: var(--color-ink);
          transform: translateY(-2px);
        }

        .hero-v2-btn-ghost {
          background: transparent;
          color: var(--color-text-dim);
          border: 1px solid var(--color-border);
        }

        .hero-v2-btn-ghost:hover {
          border-color: var(--color-accent);
          color: var(--color-ink);
        }

        .hero-v2-foot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--color-border);
        }

        .hero-v2-scroll {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          font-family: ui-monospace, monospace;
          font-size: var(--text-xs);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-text-muted);
        }

        .hero-v2-scroll-line {
          width: 48px;
          height: 1px;
          background: linear-gradient(90deg, var(--color-ink), transparent);
        }

        @media (max-width: 900px) {
          .hero-v2-main {
            grid-template-columns: 1fr;
          }
          .hero-v2-aside {
            border-left: none;
            border-top: 1px solid var(--color-border);
            padding-left: 0;
            padding-top: 1.5rem;
          }
        }
      `}</style>
        </section>
    );
}
