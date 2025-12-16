import { motion } from 'framer-motion';

export default function Contact() {
    return (
        <section className="contact-section">
            <div className="container">
                <div className="contact-content">
                    <h2 className="contact-title">Let's create something<br />inevitable.</h2>

                    <motion.a
                        href="mailto:hello@erick.design"
                        className="contact-button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Start a Project
                        <span className="arrow">→</span>
                    </motion.a>

                    <div className="contact-details">
                        <div className="detail-group">
                            <h3>Social</h3>
                            <a href="#">LinkedIn</a>
                            <a href="#">Instagram</a>
                            <a href="#">Twitter</a>
                        </div>
                        <div className="detail-group">
                            <h3>Location</h3>
                            <p>San Francisco, CA</p>
                            <p>Remote Available</p>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
        .contact-section {
          padding: var(--spacing-xxl) var(--spacing-md);
          background-color: var(--color-bg);
          min-height: 80vh;
          display: flex;
          align-items: center;
        }
        .container {
          max-width: var(--container-width);
          margin: 0 auto;
          width: 100%;
        }
        .contact-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: var(--spacing-xl);
        }
        .contact-title {
          font-size: clamp(3rem, 8vw, 8rem);
          line-height: 1;
          font-weight: 700;
          letter-spacing: -0.04em;
          color: var(--color-text);
        }
        .contact-button {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          font-size: 1.5rem;
          padding: 24px 48px;
          border-radius: 100px;
          background-color: var(--color-text);
          color: var(--color-bg);
          font-weight: 600;
          text-decoration: none;
          margin-top: var(--spacing-md);
        }
        .arrow {
          font-size: 1.2em;
        }
        .contact-details {
          display: flex;
          gap: var(--spacing-xl);
          margin-top: var(--spacing-xl);
          flex-wrap: wrap;
        }
        .detail-group h3 {
          font-size: 0.8rem;
          text-transform: uppercase;
          color: var(--color-text-dim);
          margin-bottom: 16px;
          letter-spacing: 0.1em;
        }
        .detail-group a, .detail-group p {
          display: block;
          font-size: 1.1rem;
          color: var(--color-text);
          margin-bottom: 8px;
          text-decoration: none;
        }
        .detail-group a:hover {
          text-decoration: underline;
        }
      `}</style>
        </section>
    );
}
