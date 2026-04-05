
import { motion, AnimatePresence } from 'framer-motion';
import { getProjectsByService } from '../data/projects';
import { useEffect } from 'react';

export default function ServiceDetailOverlay({ service, onClose }) {
    const projects = service ? getProjectsByService(service.id) : [];

    // Lock body scroll
    useEffect(() => {
        if (service) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [service]);

    if (!service) return null;

    return (
        <motion.div
            className="service-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="overlay-content">
                <button type="button" className="close-btn" onClick={onClose}>
                    ×
                </button>

                <header className="overlay-header">
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {service.title}
                    </motion.h1>
                    <motion.p
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {service.description}
                    </motion.p>
                </header>

                <div className="projects-grid">
                    {projects.length > 0 ? (
                        projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                className="project-card-mini"
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                            >
                                <div className="card-img-container">
                                    <img src={project.image} alt={project.title} />
                                    <div className="card-overlay">
                                        <span>{project.year}</span>
                                    </div>
                                </div>
                                <div className="card-info">
                                    <h3>{project.title}</h3>
                                    <span>{project.category}</span>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="no-projects">
                            <p>—</p>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
        .service-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: var(--color-bg);
          z-index: 999; /* Above everything */
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .overlay-content {
          padding: 8rem 5vw;
          min-height: 100%;
          position: relative;
        }

        .close-btn {
          position: fixed;
          top: 2rem;
          right: 2rem;
          background: var(--color-accent);
          color: var(--color-text);
          border: none;
          padding: 0.5rem 1.5rem;
          font-family: monospace;
          font-weight: bold;
          cursor: pointer;
          z-index: 1000;
          mix-blend-mode: normal;
        }

        .overlay-header {
          margin-bottom: 6rem;
          max-width: 800px;
        }

        .overlay-header h1 {
          font-family: var(--font-display);
          font-size: 5rem;
          color: var(--color-text);
          margin-bottom: 1.5rem;
          line-height: 0.9;
        }

        .overlay-header p {
          font-family: var(--font-main);
          font-size: 1.25rem;
          color: var(--color-text-dim);
          line-height: 1.6;
        }

        .projects-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 4rem;
        }

        .project-card-mini {
            width: 100%;
            cursor: pointer;
        }

        .card-img-container {
            width: 100%;
            aspect-ratio: 16/9;
            overflow: hidden;
            margin-bottom: 1.5rem;
            position: relative;
            background: var(--color-bg-deep);
        }

        .card-img-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .project-card-mini:hover img {
            transform: scale(1.05);
        }

        .card-info h3 {
            font-family: var(--font-display);
            font-size: 2rem;
            color: #fff;
            margin-bottom: 0.5rem;
        }

        .card-info span {
            font-family: monospace;
            color: var(--color-accent);
            text-transform: uppercase;
            font-size: 0.8rem;
        }

        .no-projects {
            grid-column: span 2;
            text-align: center;
            padding: 4rem;
            color: var(--color-text-muted);
            font-family: monospace;
            border: 1px dashed var(--color-border);
        }

        @media (max-width: 900px) {
            .overlay-header h1 { font-size: 3rem; }
            .projects-grid { grid-template-columns: 1fr; gap: 3rem; }
        }
      `}</style>
        </motion.div>
    );
}
