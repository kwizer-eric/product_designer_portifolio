import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState('');

  // Clock with seconds
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const menuLinks = [
    { title: 'Home', href: '#hero', tag: '01' },
    { title: 'Story', href: '#story', tag: '02' },
    { title: 'Services', href: '#services', tag: '03' },
    { title: 'Projects', href: '#work', tag: '04' },
    { title: 'Connect', href: '#contact', tag: '05' },
  ];

  return (
    <>
      {/* Top navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="navbar"
      >
        {/* LEFT: SYSTEM STATS */}
        <div className="navbar-left">
          <div className="navbar-clock">
            <span className="navbar-clock-label">LOCAL_TIME</span>
            <div className="navbar-clock-row">
              <span className="navbar-clock-dot" aria-hidden="true" />
              <span className="navbar-clock-value" aria-live="polite">
                {time}
              </span>
            </div>
          </div>
        </div>

        {/* CENTER: BRAND MARK */}
        <div className="navbar-center">
          <a href="#hero" className="navbar-brand">
            <span className="navbar-brand-main">AHIRWE</span>
            <span className="navbar-brand-sub">Portfolio 2026</span>
          </a>
        </div>

        {/* RIGHT: CONTACT + MENU */}
        <div className="navbar-right">
          <a href="#contact" className="navbar-contact-btn">
            Contact
          </a>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="navbar-menu-btn"
            aria-label="Open navigation menu"
            aria-haspopup="true"
            aria-expanded={isOpen}
            aria-controls="navbar-overlay"
          >
            <span className="navbar-menu-label">Menu</span>
            <div className="navbar-menu-lines" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* FULLSCREEN MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="navbar-overlay"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="navbar-overlay"
          >
            {/* DECORATIVE GRID */}
            <div className="navbar-overlay-grid" aria-hidden="true" />

            {/* CLOSE HEADER */}
            <div className="navbar-overlay-header">
              <span className="navbar-overlay-label">[ SYSTEM_OVERLAY ]</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="navbar-overlay-close"
                aria-label="Close navigation menu"
              >
                ✕
              </button>
            </div>

            {/* LINK LIST */}
            <div className="navbar-overlay-links">
              {menuLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.1, ease: 'easeOut' }}
                  className="navbar-overlay-link-row"
                >
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="navbar-overlay-link"
                  >
                    <span className="navbar-overlay-link-tag">{link.tag}</span>
                    <span className="navbar-overlay-link-title stroke-text">
                      {link.title}
                    </span>
                    <span className="navbar-overlay-link-suffix">///</span>
                  </a>
                </motion.div>
              ))}
            </div>

            {/* FOOTER METADATA */}
            <div className="navbar-overlay-footer">
              <div className="navbar-overlay-status">
                <span className="navbar-overlay-status-label">Status</span>
                <span className="navbar-overlay-status-value">
                  ALL SYSTEMS NOMINAL
                </span>
              </div>
              <div className="navbar-overlay-socials">
                <a href="#" aria-label="Twitter">
                  TW
                </a>
                <a href="#" aria-label="LinkedIn">
                  LI
                </a>
                <a href="#" aria-label="Instagram">
                  IG
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
