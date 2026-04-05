import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
    const sectionRef = useRef(null);

    useGSAP(
        () => {
            gsap.from('.story-v2-marquee-inner', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
                xPercent: -8,
                ease: 'none',
            });

            gsap.from('.story-v2-bento-cell', {
                scrollTrigger: {
                    trigger: '.story-v2-bento',
                    start: 'top 82%',
                },
                y: 40,
                opacity: 0,
                duration: 0.85,
                ease: 'power3.out',
                stagger: 0.1,
            });
        },
        { scope: sectionRef },
    );

    return (
        <section id="story" className="story-v2" ref={sectionRef}>
            <div className="story-v2-marquee" aria-hidden="true">
                <div className="story-v2-marquee-inner">
                    <span>— clarity · motion —</span>
                </div>
            </div>

            <div className="story-v2-inner container">
                <div className="story-v2-header">
                    <span className="story-v2-eyebrow">02</span>
                    <h2 className="story-v2-title">
                        Ideas.
                        <br />
                        <span className="story-v2-title-dim">Cut.</span>
                    </h2>
                </div>

                <div className="story-v2-layout">
                    <motion.figure
                        className="story-v2-photo"
                        initial={{ opacity: 0, rotate: -2, y: 24 }}
                        whileInView={{ opacity: 1, rotate: -1.5, y: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="story-v2-photo-frame">
                            <img
                                src="/src/images/ahirwe.jpg"
                                alt="Faustin Ahirwe"
                                className="story-v2-photo-img"
                            />
                        </div>
                        <figcaption className="story-v2-caption">FA</figcaption>
                    </motion.figure>

                    <div className="story-v2-bento">
                        <div className="story-v2-bento-cell story-v2-bento-wide">
                            <p className="story-v2-lead">Strategy → UI → ship.</p>
                        </div>
                        <div className="story-v2-bento-cell">
                            <span className="story-v2-cell-label">—</span>
                            <ul className="story-v2-list">
                                <li>Clarity</li>
                                <li>Systems</li>
                                <li>Motion</li>
                            </ul>
                        </div>
                        <div className="story-v2-bento-cell">
                            <span className="story-v2-cell-label">—</span>
                            <ul className="story-v2-list">
                                <li>Product</li>
                                <li>Brand</li>
                                <li>3D</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .story-v2 {
          position: relative;
          background: var(--color-bg);
          color: var(--color-text);
          padding: 0 0 clamp(5rem, 12vw, 8rem);
          overflow: hidden;
        }

        .story-v2-marquee {
          border-block: 1px solid var(--color-border);
          padding: 1.25rem 0;
          margin-bottom: clamp(3rem, 8vw, 5rem);
          overflow: hidden;
        }

        .story-v2-marquee-inner {
          display: flex;
          white-space: nowrap;
          font-family: ui-monospace, monospace;
          font-size: clamp(0.7rem, 1.2vw, 0.85rem);
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--color-text-muted);
          gap: 3rem;
        }

        .story-v2-marquee-inner span {
          flex-shrink: 0;
        }

        .story-v2-inner.container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 clamp(1.25rem, 4vw, 2.5rem);
        }

        .story-v2-header {
          margin-bottom: clamp(2.5rem, 6vw, 4rem);
        }

        .story-v2-eyebrow {
          display: inline-block;
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin-bottom: 1.25rem;
        }

        .story-v2-title {
          font-family: var(--font-display);
          font-size: clamp(2.1rem, 5.5vw, 4rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.04em;
          margin: 0;
        }

        .story-v2-title-dim {
          color: var(--color-text-muted);
        }

        .story-v2-layout {
          display: grid;
          grid-template-columns: minmax(0, 0.42fr) minmax(0, 1fr);
          gap: clamp(2rem, 5vw, 4rem);
          align-items: start;
        }

        .story-v2-photo {
          margin: 0;
          position: sticky;
          top: 8rem;
        }

        .story-v2-photo-frame {
          border-radius: 1.25rem;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: var(--color-bg-deep);
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.55);
        }

        .story-v2-photo-img {
          display: block;
          width: 100%;
          height: auto;
          aspect-ratio: 3 / 4;
          object-fit: cover;
        }

        .story-v2-caption {
          margin-top: 1rem;
          font-family: ui-monospace, monospace;
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text-muted);
        }

        .story-v2-bento {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
        }

        .story-v2-bento-wide {
          grid-column: 1 / -1;
        }

        .story-v2-bento-cell {
          padding: 1.5rem 1.75rem;
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
        }

        .story-v2-lead {
          margin: 0;
          font-size: clamp(1.05rem, 1.35vw, 1.2rem);
          line-height: 1.65;
          color: var(--color-text-dim);
          max-width: 42rem;
        }

        .story-v2-cell-label {
          display: block;
          font-family: ui-monospace, monospace;
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-text-muted);
          margin-bottom: 1rem;
        }

        .story-v2-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.95rem;
          color: var(--color-text-dim);
        }

        .story-v2-list li::before {
          content: '—';
          margin-right: 0.5rem;
          color: var(--color-accent);
        }

        @media (max-width: 960px) {
          .story-v2-layout {
            grid-template-columns: 1fr;
          }
          .story-v2-photo {
            position: relative;
            top: auto;
            max-width: 360px;
          }
          .story-v2-bento {
            grid-template-columns: 1fr;
          }
          .story-v2-bento-wide {
            grid-column: auto;
          }
        }
      `}</style>
        </section>
    );
}
