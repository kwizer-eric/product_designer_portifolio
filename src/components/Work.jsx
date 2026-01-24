import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
    {
        id: "01",
        title: "Brandora",
        category: "Visual Identity",
        image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop",
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
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "05",
        title: "Codify",
        category: "Dev Tools",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "06",
        title: "Dailyhub",
        category: "Mobile App",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "07",
        title: "Vortex",
        category: "Motion Design",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "08",
        title: "Lumina",
        category: "Lighting Control",
        image: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1000&auto=format&fit=crop",
    }
];

const WorkItem = ({ project, isActive, onClick, onInView }) => {
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    onInView();
                }
            },
            {
                root: document.querySelector('.reel-list'),
                rootMargin: '-45% 0px -45% 0px',
                threshold: 0
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [onInView]);

    return (
        <motion.div
            ref={ref}
            className={`work-item ${isActive ? 'active' : ''}`}
            onClick={onClick}
            // Animate properties based on active state
            animate={{
                scale: isActive ? 1.1 : 0.9,
                opacity: isActive ? 1 : 0.3,
                filter: isActive ? 'blur(0px)' : 'blur(2px)',
            }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 20
            }}
        >
            <motion.h2
                className="project-title"
                animate={{
                    color: isActive ? '#ffffff' : 'rgba(255,255,255,0.2)',
                    textShadow: isActive ? '0 0 30px rgba(255,255,255,0.5)' : 'none'
                }}
            >
                {project.title}
            </motion.h2>

            <motion.div
                className="project-cat-wrapper"
                animate={{
                    height: isActive ? 'auto' : 0,
                    opacity: isActive ? 1 : 0,
                    marginTop: isActive ? '1rem' : 0
                }}
                transition={{ duration: 0.3 }}
            >
                <span className="project-cat">{project.category}</span>
            </motion.div>
        </motion.div>
    );
};

export default function Work() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="work-reel-section">
            <div className="container reel-container">

                {/* Left: Indicator */}
                <div className="reel-decor">
                    <div className="sound-wave">
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className={`bar ${i === activeIndex ? 'active' : ''}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Center: List */}
                <div className="reel-list">
                    <div className="spacer-top" />
                    {projects.map((project, index) => (
                        <WorkItem
                            key={project.id}
                            project={project}
                            isActive={index === activeIndex}
                            onInView={() => setActiveIndex(index)}
                            onClick={() => setActiveIndex(index)}
                        />
                    ))}
                    <div className="spacer-bottom" />
                </div>

                {/* Right: Preview */}
                <div className="reel-preview">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={activeIndex}
                            className="preview-card"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="img-wrapper">
                                <img src={projects[activeIndex].image} alt={projects[activeIndex].title} />
                            </div>

                            <button className="view-btn">
                                <span className="arrow-icon">↳</span>
                                VIEW PROJECT
                            </button>
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>

            <style>{`
        .work-reel-section {
            height: 100vh;
            background-color: #0d120d; /* Dark Olive/Black from ref */
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            font-family: serif; /* Global serif for this section */
        }

        .reel-container {
            width: 100%;
            max-width: 1400px;
            display: grid;
            grid-template-columns: 100px 1fr 1fr;
            height: 80vh;
            gap: 2rem;
            align-items: center;
        }

        /* 1. Indicators */
        .reel-decor {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            border-right: 1px solid rgba(255,255,255,0.05);
        }

        .sound-wave {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .bar {
            width: 20px;
            height: 2px;
            background: rgba(255,255,255,0.1);
            transition: all 0.3s ease;
        }

        .bar.active {
            width: 50px;
            background: #fff;
            box-shadow: 0 0 10px rgba(255,255,255,0.5);
        }

        /* 2. List - The 'Reel' */
        .reel-list {
            height: 60vh; /* Restricted height to force scroll within view */
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            scroll-snap-type: y mandatory;
            scrollbar-width: none;
            position: relative;
            /* Stronger mask for reel feel */
            mask-image: linear-gradient(to bottom, 
                transparent 0%, 
                black 30%, 
                black 70%, 
                transparent 100%
            );
        }
        .reel-list::-webkit-scrollbar { display: none; }

        .spacer-top, .spacer-bottom {
            min-height: 25vh; /* Half of list height */
            width: 100%;
            flex-shrink: 0;
        }

        .work-item {
            height: 12vh; /* Fixed height for consistent reel steps */
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            scroll-snap-align: center;
            cursor: pointer;
            transition: all 0.5s cubic-bezier(0.2, 0, 0, 1);
        }

        .project-title {
            font-family: "Georgia", "Times New Roman", serif;
            font-size: 3rem; 
            margin: 0;
            line-height: 1;
            font-weight: 400;
            transition: all 0.5s ease;
            color: rgba(255,255,255,0.15); /* Inactive color */
        }
        
        .active .project-title {
            font-size: 4.5rem; /* Scale up active */
            color: #fff;
            text-shadow: 0 0 20px rgba(255,255,255,0.3);
        }

        .project-cat-wrapper {
            overflow: hidden;
            height: 0; /* Hidden by default */
        }

        /* 3. Preview */
        .reel-preview {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            padding: 0 2rem;
        }

        .preview-card {
            width: 100%;
            max-width: 450px;
        }

        .img-wrapper {
            width: 100%;
            aspect-ratio: 1/1; /* Square-ish from recent ref */
            background: #111;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 2rem;
            border: 1px solid rgba(255,255,255,0.2);
            box-shadow: 0 20px 80px rgba(0,0,0,0.6);
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
            font-family: monospace;
            font-size: 0.9rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 0;
            opacity: 0.7;
            transition: opacity 0.3s;
        }
        
        .view-btn:hover { opacity: 1; }
        .arrow-icon { font-size: 1.2rem; }

        @media (max-width: 900px) {
            .reel-container { grid-template-columns: 1fr; gap: 0; }
            .reel-decor { display: none; }
            
            .reel-list { 
                height: 40vh; 
                mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
            }
            .work-item { height: 10vh; }
            .project-title { font-size: 2.5rem; }
            .active .project-title { font-size: 3.5rem; }
            
            .reel-preview { 
                height: 40vh;
                padding-bottom: 2rem;
            }
            .img-wrapper { aspect-ratio: 16/9; margin-bottom: 1rem; }
            .preview-card { max-width: 300px; }
        }
      `}</style>
        </section>
    );
}
