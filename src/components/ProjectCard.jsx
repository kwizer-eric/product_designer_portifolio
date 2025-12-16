import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const yImage = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <div
      ref={cardRef}
      className={`project-card ${index % 2 === 0 ? 'even' : 'odd'}`}
    >
      <div className="card-image-wrapper">
        <motion.div style={{ y: yImage, height: "110%" }} className="card-image-inner">
          <div className="placeholder-img" style={{ backgroundColor: project.color }} />
        </motion.div>
      </div>

      <div className="card-content">
        <div className="card-header">
          <span className="project-id">0{project.id}</span>
          <span className="project-role">{project.role}</span>
        </div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
      </div>

      <style>{`
        .project-card {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-xxl);
          width: 100%;
          cursor: pointer;
        }
        
        .card-image-wrapper {
          width: 100%;
          height: 65vh;
          overflow: hidden;
          position: relative;
          background: #111;
        }
        
        .card-image-inner {
          width: 100%;
          position: absolute;
          top: -5%;
          left: 0;
          background-size: cover;
          background-position: center;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .project-card:hover .card-image-inner {
           transform: scale(1.03);
        }

        .placeholder-img {
          width: 100%;
          height: 100%;
        }
        
        .card-content {
          padding-top: var(--spacing-md);
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        
        .card-header {
           display: flex;
           justify-content: space-between;
           margin-bottom: var(--spacing-md);
           font-size: 0.8rem;
           text-transform: uppercase;
           letter-spacing: 0.1em;
           color: var(--color-text-dim);
        }
        
        .project-title {
          font-size: clamp(2.5rem, 5vw, 5rem);
          font-weight: 500;
          letter-spacing: -0.04em;
          margin-bottom: var(--spacing-sm);
          line-height: 1;
        }
        
        .project-desc {
          color: var(--color-text-dim);
          max-width: 500px;
          line-height: 1.5;
          font-size: 1.1rem;
        }

        @media (min-width: 900px) {
          .project-card {
            flex-direction: row;
            align-items: flex-start;
            gap: var(--spacing-xl);
          }
          .project-card.even {
            flex-direction: row-reverse;
          }
          .card-image-wrapper {
            flex: 1.6;
            height: 85vh;
          }
          .card-content {
            flex: 1;
            padding-top: var(--spacing-md);
            border-top: 1px solid rgba(255,255,255,0.1);
          }
        }
      `}</style>
    </div>
  );
}
