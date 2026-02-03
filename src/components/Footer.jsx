import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const links = [
    { name: "Services", href: "#" },
    { name: "Work", href: "#" },
    { name: "About", href: "#" },
    { name: "Contact", href: "#" }
  ];

  const socials = [
    { name: "LinkedIn", href: "#" },
    { name: "Twitter", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "Dribbble", href: "#" }
  ];

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-grid">
          {/* Top Section: Massive CTA */}
          <div className="footer-cta-area">
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="huge-text"
            >
              Let's create <br />
              <span className="accent-text">next level</span> assets.
            </motion.h2>

            <motion.button
              className="contact-btn"
              whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
              whileTap={{ scale: 0.95 }}
            >
              Start a Project
              <span className="arrow">→</span>
            </motion.button>
          </div>

          {/* Divider Line */}
          <div className="divider"></div>

          {/* Middle Section: Links Grid */}
          <div className="footer-cols">
            <div className="col brand-col">
              <h3 className="col-label">Portfolio</h3>
              <p className="description">
                Crafting digital experiences with precision and passion.
                Based in San Francisco, working globally.
              </p>
            </div>

            <div className="col">
              <h3 className="col-label">Sitemap</h3>
              <ul className="link-list">
                {links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="footer-link">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col">
              <h3 className="col-label">Socials</h3>
              <ul className="link-list">
                {socials.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="footer-link">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col text-right">
              <h3 className="col-label">Local Time</h3>
              <div className="time-display">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>

          {/* Bottom Section: Copyright */}
          <div className="footer-bottom">
            <div className="copyright">
              © {new Date().getFullYear()} Erick. All Rights Reserved.
            </div>
            <div className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Back to Top ↑
            </div>
          </div>
        </div>
      </div>

      <style>{`
                .footer-section {
                    background-color: #080808;
                    color: #fff;
                    padding: var(--spacing-xxl) var(--spacing-md) var(--spacing-lg);
                    border-top: 1px solid rgba(255,255,255,0.05);
                    position: relative;
                    overflow: hidden;
                }

                .container {
                    max-width: var(--container-width);
                    margin: 0 auto;
                }

                .footer-grid {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-xl);
                }

                /* CTA Area */
                .footer-cta-area {
                    display: flex;
                    flex-direction: column;
                    gap: 3rem;
                    align-items: flex-start;
                    padding-bottom: var(--spacing-lg);
                }

                .huge-text {
                    font-size: clamp(3rem, 7vw, 9rem);
                    line-height: 0.95;
                    font-weight: 600;
                    letter-spacing: -0.04em;
                    color: #fff;
                }

                .accent-text {
                    color: var(--color-text-dim);
                }

                .contact-btn {
                    padding: 1.5rem 3rem;
                    border-radius: 100px;
                    background: transparent;
                    border: 1px solid rgba(255,255,255,0.2);
                    color: #fff;
                    font-size: 1.1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    transition: all 0.3s ease;
                }

                .arrow {
                    font-size: 1.2rem;
                }

                .divider {
                    width: 100%;
                    height: 1px;
                    background: rgba(255,255,255,0.1);
                }

                /* Columns */
                .footer-cols {
                    display: grid;
                    grid-template-columns: 2fr 1fr 1fr 1fr;
                    gap: 4rem;
                }

                .col-label {
                    font-size: 0.85rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: #555;
                    margin-bottom: 2rem;
                    font-weight: 500;
                }

                .description {
                    color: #999;
                    font-size: 1.1rem;
                    line-height: 1.6;
                    max-width: 300px;
                }

                .link-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .footer-link {
                    color: #cfcfcf;
                    font-size: 1.1rem;
                    position: relative;
                    display: inline-block;
                    transition: color 0.3s;
                }

                .footer-link:hover {
                    color: #fff;
                }

                .time-display {
                    font-size: 1.5rem;
                    font-family: monospace;
                    color: #cfcfcf;
                }

                .text-right {
                    text-align: right;
                }

                /* Bottom */
                .footer-bottom {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    padding-top: var(--spacing-lg);
                    color: #555;
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .back-to-top {
                    cursor: pointer;
                    transition: color 0.3s;
                }
                .back-to-top:hover {
                    color: #fff;
                }

                @media (max-width: 900px) {
                    .footer-cols {
                        grid-template-columns: 1fr;
                        gap: 3rem;
                    }
                    .text-right {
                        text-align: left;
                    }
                    .footer-bottom {
                        flex-direction: column;
                        gap: 1.5rem;
                        align-items: flex-start;
                    }
                    .huge-text {
                        font-size: 3.5rem;
                    }
                }
            `}</style>
    </footer>
  );
}
