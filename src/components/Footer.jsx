import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer id="contact" className="footer-section">
      <div className="container">

        {/* MASSIVE CTA AREA */}
        <div className="footer-cta">
          <div className="cta-header">
            <span className="cta-label">05</span>
            <div className="cta-line" />
          </div>
          <motion.h2
            className="huge-text"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            Hi.<br />
            <span className="accent-text">—</span>
          </motion.h2>

          <motion.a
            href="mailto:hello@example.com"
            className="contact-trigger"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="btn-content">
              <span>Mail</span>
              <span className="btn-icon">→</span>
            </div>
            <div className="btn-bg" />
          </motion.a>
        </div>

        {/* SYSTEM GRID */}
        <div className="footer-grid">
          <div className="col brand-col">
            <div className="sys-status">
              <span className="status-dot pulsed" />
              <span>On</span>
            </div>
            <p className="footer-desc">
              Design · build
            </p>
          </div>

          <div className="col">
            <h4 className="col-header">—</h4>
            <ul className="footer-links">
              <li><a href="#services">Svc</a></li>
              <li><a href="#work">Work</a></li>
              <li><a href="#story">Bio</a></li>
            </ul>
          </div>

          <div className="col">
            <h4 className="col-header">—</h4>
            <ul className="footer-links">
              <li><a href="#">in</a></li>
              <li><a href="#">x</a></li>
              <li><a href="#">ig</a></li>
            </ul>
          </div>

          <div className="col">
            <h4 className="col-header">—</h4>
            <p className="footer-desc">
              KGL
            </p>
            <div className="time-display">
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="footer-bottom">
          <div className="copyright">
            © {new Date().getFullYear()}
          </div>
          <div className="ticker-container">
            <div className="ticker-text">
              — ship — cut — ship — cut —
            </div>
          </div>
          <div className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            ↑
          </div>
        </div>

      </div>

      <style>{`
        .footer-section {
            background-color: var(--color-bg);
            color: var(--color-text);
            padding: 6rem 0 2rem;
            border-top: 1px solid var(--color-border);
            position: relative;
            overflow: hidden;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 4vw;
        }

        /* --- CTA --- */
        .footer-cta {
            margin-bottom: 8rem;
        }

        .cta-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 2rem;
            opacity: 0.5;
        }

        .cta-label {
            font-family: monospace;
            font-size: 0.7rem;
            letter-spacing: 0.2em;
            color: var(--color-accent);
        }

        .cta-line {
            height: 1px;
            background: var(--color-accent);
            width: 100px;
        }

        .huge-text {
            font-family: var(--font-main);
            font-size: clamp(3rem, 7vw, 9rem);
            line-height: 0.9;
            font-weight: 700;
            letter-spacing: -0.04em;
            margin-bottom: 3rem;
        }

        .accent-text {
            color: var(--color-text-muted);
            transition: color 0.3s;
        }
        
        .huge-text:hover .accent-text {
            color: var(--color-text);
        }

        .contact-trigger {
            position: relative;
            background: none;
            border: 1px solid var(--color-border);
            padding: 0;
            cursor: pointer;
            overflow: hidden;
        }

        .btn-content {
            position: relative;
            z-index: 2;
            padding: 1.5rem 3rem;
            display: flex;
            align-items: center;
            gap: 1.5rem;
            font-family: monospace;
            font-size: 1rem;
            letter-spacing: 0.1em;
            color: var(--color-text);
            transition: color 0.3s;
        }

        .contact-trigger:hover .btn-content {
            color: var(--color-ink);
        }

        .btn-bg {
            position: absolute;
            inset: 0;
            background: var(--color-accent);
            transform: translateX(-101%);
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 1;
        }

        .contact-trigger:hover .btn-bg {
            transform: translateX(0);
        }

        /* --- GRID --- */
        .footer-grid {
            display: grid;
            grid-template-columns: 1.5fr 1fr 1fr 1fr;
            gap: 4rem;
            margin-bottom: 6rem;
            border-top: 1px solid var(--color-border);
            padding-top: 4rem;
        }

        .sys-status {
            display: flex;
            align-items: center;
            gap: 10px;
            font-family: monospace;
            font-size: 0.7rem;
            color: var(--color-accent);
            margin-bottom: 1.5rem;
        }

        .status-dot {
            width: 6px;
            height: 6px;
            background: var(--color-accent);
            border-radius: 50%;
            box-shadow: 0 0 5px var(--color-accent);
        }

        .pulsed {
            animation: pulse-dot 2s infinite;
        }

        @keyframes pulse-dot {
            0% { opacity: 1; }
            50% { opacity: 0.3; }
            100% { opacity: 1; }
        }

        .footer-desc {
            font-family: var(--font-main);
            font-size: 0.9rem;
            line-height: 1.6;
            color: var(--color-text-dim);
        }

        .col-header {
            font-family: monospace;
            font-size: 0.7rem;
            color: var(--color-text-muted);
            margin-bottom: 1.5rem;
            letter-spacing: 0.1em;
        }

        .footer-links {
            list-style: none;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
        }

        .footer-links a {
            color: var(--color-text-dim);
            text-decoration: none;
            font-size: 0.9rem;
            transition: all 0.3s;
            position: relative;
            padding-left: 0;
        }

        .footer-links a:hover {
            color: var(--color-accent);
            padding-left: 10px;
        }
        
        .footer-links a::before {
            content: '>';
            position: absolute;
            left: 0;
            opacity: 0;
            transition: opacity 0.3s;
            color: var(--color-accent);
        }

        .footer-links a:hover::before {
            opacity: 1;
        }

        .time-display {
            font-family: monospace;
            font-size: 1.5rem;
            color: var(--color-text);
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid var(--color-border);
        }

        /* --- BOTTOM --- */
        .footer-bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 2rem;
            border-top: 1px solid var(--color-border);
            font-family: monospace;
            font-size: 0.7rem;
            color: var(--color-text-muted);
        }

        .ticker-container {
            flex: 1;
            overflow: hidden;
            margin: 0 4rem;
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }

        .ticker-text {
            white-space: nowrap;
            animation: ticker 20s linear infinite;
        }

        @keyframes ticker {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
        }

        .back-top {
            cursor: pointer;
            transition: color 0.3s;
        }
        .back-top:hover {
            color: var(--color-accent);
        }

        @media (max-width: 900px) {
            .footer-grid {
                grid-template-columns: 1fr;
                gap: 3rem;
            }
            .footer-bottom {
                flex-direction: column;
                gap: 1.5rem;
            }
            .ticker-container {
                display: none;
            }
            .huge-text {
                font-size: 3rem;
            }
        }
      `}</style>
    </footer>
  );
}
