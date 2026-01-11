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
    <div ref={cardRef} className={`project-card ${index % 2 === 1 ? 'even' : ''}`}>
      {/* 1. Hero Image (Big & Confident) */}
      <div className="card-hero-wrapper">
        <motion.div style={{ y: yImage, height: "110%" }} className="card-hero-inner">
          <div
            className="placeholder-img"
            style={{
              backgroundColor: project.heroColor,
              backgroundImage: `url(${project.heroImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Title overlay hidden if image loads, but useful for accessibility/loading */}
          </div>
        </motion.div>
      </div>

      {/* 2. Info & Role */}
      <div className="card-info">
        <div className="card-header" style={{ borderColor: project.color }}>
          <div className="project-meta">
            <span className="project-id">{project.id}</span>
            <span className="separator">—</span>
            <span className="project-role">{project.role}</span>
          </div>
          <h3 className="project-title">{project.title}</h3>
        </div>
        <p className="project-context">{project.context}</p>
      </div>

      {/* 3. Before -> After (Powerful Visual) */}
      <div className="transformation-section">
        <span className="section-label">Transformation</span>
        <div className="before-after-grid">
          <div className="ba-panel before-panel">
            <div className="ba-label">Before / Legacy</div>
            <div
              className="placeholder-img"
              style={{
                backgroundColor: project.beforeColor,
                backgroundImage: `url(${project.beforeImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'grayscale(100%) contrast(120%)' // Grayscale for "Before"
              }}
            />
          </div>
          <div className="ba-panel after-panel">
            <div className="ba-label" style={{ backgroundColor: project.color }}>After / Redesign</div>
            <div
              className="placeholder-img"
              style={{
                backgroundColor: project.afterColor,
                backgroundImage: `url(${project.afterImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          </div>
        </div>
      </div>

      {/* 4. Final Visuals (Brand Feel) */}
      <div className="gallery-section">
        <span className="section-label">System Visuals</span>
        <div className="gallery-grid">
          {project.finalImgs.map((img, i) => (
            <div key={i} className="gallery-item">
              <div
                className="placeholder-img"
                style={{
                  backgroundColor: project.heroColor,
                  backgroundImage: `url(${img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
