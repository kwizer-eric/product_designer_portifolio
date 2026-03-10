import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const navbarOpacity = useTransform(scrollY, [0, 100], [0.95, 1]);
  const navbarBlur = useTransform(scrollY, [0, 100], [8, 12]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="navbar-v2"
        style={{
          opacity: navbarOpacity,
          backdropFilter: `blur(${navbarBlur}px)`,
        }}
      >
        <div className="navbar-v2-container">
          {/* LEFT: ACTIONS (Menu Trigger) */}
          <div className="navbar-v2-actions" style={{ justifyContent: 'flex-start' }}>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="navbar-v2-menu-trigger"
              aria-label="Open menu"
              aria-expanded={isOpen}
            >
              <div className="navbar-v2-menu-icon" style={{ alignItems: 'flex-start' }}>
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 6, width: '100%' } : { rotate: 0, y: 0, width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  animate={isOpen ? { opacity: 0, width: '100%' } : { opacity: 1, width: '60%' }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -6, width: '100%' } : { rotate: 0, y: 0, width: '80%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className="navbar-v2-menu-text">Menu</span>
            </button>
          </div>

          {/* CENTER: BRAND */}
          <a href="#hero" className="navbar-v2-brand" style={{ justifyContent: 'center' }}>
            <span className="navbar-v2-brand-main">AHIRWE</span>
            <span className="navbar-v2-brand-dot" aria-hidden="true">•</span>
            <span className="navbar-v2-brand-sub">Designer</span>
          </a>

          {/* RIGHT: NAV LINKS (Hidden) & Contact */}
          <div className="navbar-v2-right-section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem' }}>
            <div className="navbar-v2-links" style={{ display: 'none' }}>
            </div>
            <a href="#contact" className="navbar-v2-contact">
              Get in touch
            </a>
          </div>
        </div>

        {/* BOTTOM BORDER INDICATOR */}
        <motion.div
          className="navbar-v2-indicator"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrolled ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </motion.nav>

      {/* FULLSCREEN MENU */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="navbar-v2-backdrop"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="navbar-v2-drawer"
              role="dialog"
              aria-modal="true"
            >
              <div className="navbar-v2-drawer-header">
                <span className="navbar-v2-drawer-label">Navigation</span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="navbar-v2-drawer-close"
                  aria-label="Close menu"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="navbar-v2-drawer-nav">
                {menuLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="navbar-v2-drawer-link"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                  >
                    <span className="navbar-v2-drawer-link-number">{link.tag}</span>
                    <span className="navbar-v2-drawer-link-text">{link.title}</span>
                    <span className="navbar-v2-drawer-link-arrow">→</span>
                  </motion.a>
                ))}
              </nav>

              <div className="navbar-v2-drawer-footer">
                <div className="navbar-v2-drawer-socials">
                  <a href="#" aria-label="Twitter" className="navbar-v2-drawer-social">
                    Twitter
                  </a>
                  <a href="#" aria-label="LinkedIn" className="navbar-v2-drawer-social">
                    LinkedIn
                  </a>
                  <a href="#" aria-label="Instagram" className="navbar-v2-drawer-social">
                    Instagram
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
