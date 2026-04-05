import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { projects } from '../data/projects';

const WorkItem = ({ project, isActive, onClick }) => {
    return (
        <motion.div
            className={`work-item ${isActive ? 'active' : ''}`}
            onClick={onClick}
            animate={{
                scale: isActive ? 1.2 : 0.8,
                opacity: isActive ? 1 : 0.3,
                filter: isActive ? 'blur(0px)' : 'blur(2px)'
            }}
            transition={{
                type: "spring",
                stiffness: 150,
                damping: 20
            }}
        >
            <h2 className="project-title">
                {project.title}
            </h2>
        </motion.div>
    );
};

export default function Work() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedProject, setSelectedProject] = useState(null);
    const containerRef = useRef(null);

    // Track scroll through the entire section height
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Map scroll progress to project indices
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const index = Math.min(
            projects.length - 1,
            Math.floor(latest * projects.length)
        );
        if (index !== activeIndex && index >= 0) {
            setActiveIndex(index);
        }
    });

    // Scroll Transform logic matches previous implementation
    const yTransform = useTransform(scrollYProgress, [0, 1], ["30vh", "-70vh"]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedProject]);

    const handleProjectClick = (index) => {
        if (!containerRef.current) return;
        const totalHeight = containerRef.current.offsetHeight;
        const progress = (index + 0.5) / projects.length;
        const targetScroll = containerRef.current.offsetTop + progress * (totalHeight - window.innerHeight);

        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <div id="work" className="work-sticky-wrapper" ref={containerRef}>
                <section className="work-reel-section">
                    <div className="container reel-container">

                        {/* Left: Indicator */}
                        <div className="reel-decor">
                            <div className="sound-wave">
                                {projects.map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className={`bar ${i === activeIndex ? 'active' : ''}`}
                                        animate={{
                                            width: i === activeIndex ? 60 : 30,
                                            height: i === activeIndex ? 4 : 2,
                                            opacity: i === activeIndex ? 1 : 0.2,
                                            backgroundColor: i === activeIndex ? '#c9a84c' : 'rgba(28, 28, 30, 0.22)'
                                        }}
                                        transition={{ duration: 0.3 }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Center: List */}
                        <div className="reel-list-container">
                            <motion.div
                                className="reel-list"
                                style={{ y: yTransform }}
                            >
                                {projects.map((project, index) => (
                                    <WorkItem
                                        key={project.id}
                                        project={project}
                                        isActive={index === activeIndex}
                                        onClick={() => handleProjectClick(index)}
                                    />
                                ))}
                            </motion.div>
                        </div>

                        {/* Right: Preview */}
                        <div className="reel-preview">
                            <AnimatePresence mode='wait'>
                                <motion.div
                                    key={activeIndex}
                                    className="preview-card"
                                    initial={{ opacity: 0, x: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: -20, scale: 1.05 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                >
                                    <div className="img-wrapper">
                                        <motion.img
                                            src={projects[activeIndex].image}
                                            alt={projects[activeIndex].title}
                                            initial={{ scale: 1.2 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.6 }}
                                        />
                                    </div>

                                    <motion.button
                                        className="view-btn"
                                        whileHover={{ x: 10 }}
                                        onClick={() => setSelectedProject(projects[activeIndex])}
                                        layoutId={`btn-${projects[activeIndex].id}`} // Shared layout ID for transition?
                                    >
                                        <span className="arrow-icon">→</span>
                                        Open
                                    </motion.button>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                    </div>
                </section>
            </div>

            {/* PROJECT DETAIL OVERLAY */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="project-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="project-modal-content"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        >
                            <button className="modal-close-btn" onClick={() => setSelectedProject(null)}>
                                ×
                            </button>

                            <div className="modal-scroll-area" data-lenis-prevent>
                                {/* Hero Section */}
                                <div className="modal-hero">
                                    <div className="modal-hero-img-box">
                                        <img src={selectedProject.image} alt={selectedProject.title} />
                                    </div>
                                    <div className="modal-hero-text">
                                        <span className="modal-subtitle">{selectedProject.category} — {selectedProject.year}</span>
                                        <h1 className="modal-title">{selectedProject.title}</h1>
                                    </div>
                                </div>

                                {/* Content Grid */}
                                <div className="modal-grid">
                                    <div className="info-col">
                                        <div className="info-block">
                                            <h3>Role</h3>
                                            <p>{selectedProject.role}</p>
                                        </div>
                                        <div className="info-block">
                                            <h3>Year</h3>
                                            <p>{selectedProject.year}</p>
                                        </div>
                                    </div>

                                    <div className="context-col">
                                        <div className="text-block">
                                            <h3>Why</h3>
                                            <p>{selectedProject.challenge}</p>
                                        </div>
                                        <div className="text-block">
                                            <h3>How</h3>
                                            <p>{selectedProject.solution}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Gallery */}
                                {selectedProject.gallery && (
                                    <div className="modal-gallery">
                                        <h3>More</h3>
                                        <div className="modal-gallery-grid">
                                            {selectedProject.gallery.map((img, i) => (
                                                <div key={i} className="gallery-img-item">
                                                    <img src={img} alt="Detail" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        .work-sticky-wrapper {
            height: 500vh;
            position: relative;
            background-color: var(--color-bg);
        }

        .work-reel-section {
            position: sticky;
            top: 0;
            height: 100vh;
            color: var(--color-text);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            padding: 0 5vw;
        }

        .reel-container {
            width: 100%;
            max-width: 1600px;
            display: grid;
            grid-template-columns: 120px 1.2fr 1fr;
            height: 85vh;
            gap: 4rem;
            align-items: center;
        }

        .reel-decor {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 100%;
        }

        .sound-wave {
            display: flex;
            flex-direction: column;
            gap: 12px;
            padding-left: 20px;
            border-left: 1px solid var(--color-border);
        }

        .bar {
            border-radius: 2px;
        }

        .reel-list-container {
            height: 70vh;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            mask-image: linear-gradient(to bottom, 
                transparent 0%, 
                black 20%, 
                black 80%, 
                transparent 100%
            );
        }

        .reel-list {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
        }

        .work-item {
            height: 15vh; 
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: color 0.3s;
        }

        .project-title {
            font-family: var(--font-display);
            font-size: 3.5rem; 
            margin: 0;
            line-height: .9;
            font-weight: 500;
            text-align: center;
            letter-spacing: -0.02em;
            text-transform: uppercase;
        }
        
        .work-item.active .project-title {
            color: var(--color-text);
            text-shadow: 0 0 30px rgba(255,255,255,0.2);
        }

        /* Preview */
        .reel-preview {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
        }

        .preview-card {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }

        .img-wrapper {
            width: 100%;
            aspect-ratio: 4/5; 
            background: var(--color-bg-deep);
            overflow: hidden;
            margin-bottom: 2rem;
            border-radius: 4px;
            box-shadow: 0 20px 40px rgba(28, 28, 30, 0.12);
        }

        .img-wrapper img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .view-btn {
            background: none;
            border: none;
            color: var(--color-text);
            font-family: inherit;
            font-size: 1rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 0;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            position: relative;
        }

        .view-btn::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 100%;
            height: 1px;
            background: var(--color-accent);
            transform: scaleX(0);
            transform-origin: right;
            transition: transform 0.3s ease;
        }

        .view-btn:hover::after {
            transform: scaleX(1);
            transform-origin: left;
        }
        
        .arrow-icon { font-size: 1.2rem; }

        /* --- MODAL OVERLAY --- */
        .project-modal-overlay {
            position: fixed;
            inset: 0;
            z-index: 9999;
            background: rgba(0,0,0,0.6);
            backdrop-filter: blur(10px);
            display: flex;
            justify-content: center;
            align-items: flex-end; /* Slide up from bottom */
        }

        .project-modal-content {
            width: 100%;
            height: 95vh;
            background: var(--color-panel);
            color: var(--color-on-dark);
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
            position: relative;
            display: flex;
            flex-direction: column;
            box-shadow: 0 -20px 50px rgba(0, 0, 0, 0.35);
            border-top: 1px solid rgba(245, 240, 232, 0.12);
        }

        .modal-close-btn {
            position: absolute;
            top: 2rem;
            right: 2rem;
            background: var(--color-accent);
            color: #000;
            border: none;
            padding: 0.5rem 1.5rem;
            font-family: monospace;
            font-weight: bold;
            cursor: pointer;
            z-index: 100;
            border-radius: 2px;
        }

        .modal-scroll-area {
            overflow-y: auto;
            height: 100%;
            padding: 0 0 4rem 0;
            overscroll-behavior: contain;
        }

        .modal-hero {
            position: relative;
            width: 100%;
            height: 60vh;
        }

        .modal-hero-img-box {
            width: 100%;
            height: 100%;
        }

        .modal-hero-img-box img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
        }

        .modal-hero-text {
            position: absolute;
            bottom: 2rem;
            left: 5vw;
            width: 90%;
        }

        .modal-subtitle {
            font-family: monospace;
            color: var(--color-accent);
            margin-bottom: 1rem;
            display: block;
        }

        .modal-title {
            font-family: var(--font-display);
            font-size: 4rem;
            line-height: 0.9;
            color: var(--color-on-dark);
            margin: 0;
        }

        .modal-grid {
            padding: 4rem 5vw;
            display: grid;
            grid-template-columns: 300px 1fr;
            gap: 4rem;
        }

        .info-block {
            margin-bottom: 2rem;
        }

        .info-block h3 {
            font-family: monospace;
            color: rgba(245, 240, 232, 0.45);
            font-size: 0.8rem;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
        }

        .info-block p {
            font-family: var(--font-main);
            color: var(--color-text);
            font-size: 1.1rem;
        }

        .text-block {
            margin-bottom: 3rem;
        }

        .text-block h3 {
            font-family: monospace;
            color: var(--color-accent);
            font-size: 1rem;
            margin-bottom: 1rem;
        }

        .text-block p {
            font-family: var(--font-main);
            color: rgba(245, 240, 232, 0.78);
            font-size: 1.25rem;
            line-height: 1.6;
            max-width: 800px;
        }

        .modal-gallery {
            padding: 2rem 5vw;
        }

        .modal-gallery h3 {
            font-family: monospace;
            color: #555;
            margin-bottom: 2rem;
            text-transform: uppercase;
        }

        .modal-gallery-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
        }

        .gallery-img-item {
            width: 100%;
            background: rgba(0, 0, 0, 0.25);
        }

        .gallery-img-item img {
            width: 100%;
            height: auto;
            display: block;
            border-radius: 4px;
        }

        @media (max-width: 1024px) {
            .work-sticky-wrapper { height: auto; }
            .work-reel-section { position: relative; height: auto; padding: 4rem 1rem; }
            .reel-container { 
                grid-template-columns: 1fr; 
                height: auto;
                gap: 2rem;
            }
            .reel-decor { display: none; }
            .reel-list-container { 
                height: auto;
                mask-image: none;
            }
            .project-title { font-size: 2.5rem; }
            .reel-preview { height: auto; padding-top: 2rem; }
            .img-wrapper { aspect-ratio: 16/9; }

            .modal-grid { grid-template-columns: 1fr; gap: 2rem; }
            .modal-title { font-size: 3rem; }
            .modal-gallery-grid { grid-template-columns: 1fr; }
        }

      `}</style>
        </>
    );
}
