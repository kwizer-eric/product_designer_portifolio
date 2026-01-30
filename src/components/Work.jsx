import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const projects = [
    {
        id: "01",
        title: "Grido",
        category: "Visual Identity",
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "02",
        title: "Stickify",
        category: "Web Platform",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "03",
        title: "Agentify",
        category: "AI Dashboard",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "04",
        title: "AI Nest",
        category: "Product Design",
        image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "05",
        title: "Brandora",
        category: "Branding",
        image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "06",
        title: "Codify",
        category: "Dev Tools",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "07",
        title: "Dailyhub",
        category: "Mobile App",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop",
    }
];

const WorkItem = ({ project, isActive, onClick }) => {
    return (
        <motion.div
            className={`work-item ${isActive ? 'active' : ''}`}
            onClick={onClick}
            animate={{
                scale: isActive ? 1.2 : 0.7,
                opacity: isActive ? 1 : 0.2,
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

    // Move the list vertically as we scroll to keep the active item centered
    // Start at 27.5vh (35vh center - 7.5vh half-item)
    // End at -62.5vh (35vh center - 97.5vh last item center)
    const yTransform = useTransform(scrollYProgress, [0, 1], ["27.5vh", "-62.5vh"]);

    const handleProjectClick = (index) => {
        if (!containerRef.current) return;
        const totalHeight = containerRef.current.offsetHeight;
        // Target the middle of the project's scroll range
        const progress = (index + 0.5) / projects.length;
        const targetScroll = containerRef.current.offsetTop + progress * (totalHeight - window.innerHeight);

        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
    };

    return (
        <div className="work-sticky-wrapper" ref={containerRef}>
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
                                        backgroundColor: i === activeIndex ? '#fff' : '#444'
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Center: List (Controlled by page scroll) */}
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
                                >
                                    <span className="arrow-icon">→</span>
                                    VIEW PROJECT
                                </motion.button>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>

                <style>{`
        .work-sticky-wrapper {
            height: 500vh; /* Control how long the section stays pinned */
            position: relative;
            background-color: #050505;
        }

        .work-reel-section {
            position: sticky;
            top: 0;
            height: 100vh;
            color: #fff;
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

        /* 1. Indicators */
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
            border-left: 1px solid rgba(255,255,255,0.1);
        }

        .bar {
            border-radius: 2px;
        }

        /* 2. List - Page Scroll Controlled */
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
            font-family: "Playfair Display", "Georgia", "Times New Roman", serif;
            font-size: 6rem; 
            margin: 0;
            line-height: .9;
            font-weight: 500;
            text-align: center;
            letter-spacing: -0.02em;
            text-transform: uppercase;
        }
        
        .work-item.active .project-title {
            color: #fff;
            text-shadow: 0 0 30px rgba(255,255,255,0.2);
        }

        @media (max-width: 1400px) {
            .project-title { font-size: 4rem; }
        }

        /* 3. Preview */
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
            background: #111;
            overflow: hidden;
            margin-bottom: 2rem;
            border-radius: 4px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }

        .img-wrapper img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .view-btn {
            background: none;
            border: none;
            color: #fff;
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
            background: #fff;
            transform: scaleX(0);
            transform-origin: right;
            transition: transform 0.3s ease;
        }

        .view-btn:hover::after {
            transform: scaleX(1);
            transform-origin: left;
        }
        
        .arrow-icon { font-size: 1.2rem; }

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
            .reel-list { transform: none !important; }
            .project-title { font-size: 3rem; }
            .reel-preview { height: auto; padding-top: 2rem; }
            .img-wrapper { aspect-ratio: 16/9; }
        }
      `}</style>
            </section>
        </div>
    );
}
