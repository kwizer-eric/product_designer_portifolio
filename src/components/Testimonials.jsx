import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: "01",
      quote: "The design system allows for infinite scalability without losing the brand's core soul.",
      author: "SARAH JENKINGS",
      role: "CTO @ AURA",
      location: "SAN FRANCISCO, CA",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "02",
      quote: "A masterclass in reduction. Every pixel serves a purpose, creating a silent but powerful impact.",
      author: "DAVID CHEN",
      role: "VP DESIGN @ NEXUS",
      location: "TOKYO, JP",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "03",
      quote: "We needed an interface that felt like a physical tool. This exceeded all our engineering requirements.",
      author: "ELENA ROSSI",
      role: "PRODUCT LEAD @ VELOCITY",
      location: "BERLIN, DE",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonials-section">
      <div className="container">

        {/* Header / Technical Indicators */}
        <div className="section-header">
          <span className="section-label">CLIENT_VOICE // 004</span>
          <div className="header-line" />
        </div>

        <div className="content-grid">

          {/* Left Col: Interactive Image Area */}
          <div className="image-column">
            <div className="image-frame">
              <AnimatePresence mode='wait'>
                <motion.img
                  key={activeIndex}
                  src={testimonials[activeIndex].image}
                  alt={testimonials[activeIndex].author}
                  className="testimonial-image"
                  initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
              </AnimatePresence>

              {/* Overlays */}
              <div className="scan-line" />
              <div className="corner-brackets">
                <span className="bracket tl"></span>
                <span className="bracket tr"></span>
                <span className="bracket bl"></span>
                <span className="bracket br"></span>
              </div>

              <div className="image-meta">
                <span>IMG_ID: {testimonials[activeIndex].id}</span>
                <span>RES: 4K</span>
              </div>
            </div>

            <div className="controls">
              <button onClick={prevTestimonial} className="control-btn prev-btn">
                <span>← PREV</span>
              </button>
              <div className="progress-bar">
                <motion.div
                  className="progress-fill"
                  animate={{ width: `${((activeIndex + 1) / testimonials.length) * 100}%` }}
                />
              </div>
              <button onClick={nextTestimonial} className="control-btn next-btn">
                <span>NEXT →</span>
              </button>
            </div>
          </div>

          {/* Right Col: Typography */}
          <div className="text-column">
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeIndex}
                className="text-wrapper"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="quote-icon">“</div>
                <h2 className="quote-text">{testimonials[activeIndex].quote}</h2>

                <div className="author-details">
                  <div className="detail-row">
                    <span className="label">IDENTITY</span>
                    <span className="value">{testimonials[activeIndex].author}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">ROLE</span>
                    <span className="value active-color">{testimonials[activeIndex].role}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">LOC</span>
                    <span className="value">{testimonials[activeIndex].location}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      <style>{`
        .testimonials-section {
            background-color: #050505;
            color: #fff;
            padding: 2rem 0;
            display: flex;
            overflow: hidden;
        }

        .section-header {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 2rem;
            opacity: 0.5;
        }

        .section-label {
            font-family: 'Inter', sans-serif;
            font-size: 0.75rem;
            letter-spacing: 0.2em;
            color: #a3ff12;
        }

        .header-line {
            height: 1px;
            background: #fff;
            flex: 1;
            opacity: 0.2;
        }

        .content-grid {
            display: grid;
            grid-template-columns: 300px 1fr;
            gap: 4rem;
            align-items: center;
        }

        /* IMAGE COLUMN */
        .image-column {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            max-width: 100%;
        }

        .image-frame {
            position: relative;
            width: 100%;
            aspect-ratio: 3/4; /* Reverted to portrait */
            background: #111;
            overflow: hidden;
            border: 1px solid rgba(255,255,255,0.1);
        }

        .testimonial-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: grayscale(100%);
        }

        .scan-line {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: rgba(163, 255, 18, 0.5);
            box-shadow: 0 0 10px #a3ff12;
            animation: scan 4s linear infinite;
            pointer-events: none;
            z-index: 10;
        }

        @keyframes scan {
            0% { top: -10%; opacity: 0; }
            50% { opacity: 1; }
            100% { top: 110%; opacity: 0; }
        }

        .bracket {
            position: absolute;
            width: 20px;
            height: 20px;
            border: 2px solid #a3ff12;
            z-index: 20;
            opacity: 0.8;
        }
        
        .tl { top: 10px; left: 10px; border-right: 0; border-bottom: 0; }
        .tr { top: 10px; right: 10px; border-left: 0; border-bottom: 0; }
        .bl { bottom: 10px; left: 10px; border-right: 0; border-top: 0; }
        .br { bottom: 10px; right: 10px; border-left: 0; border-top: 0; }

        .image-meta {
            position: absolute;
            bottom: 10px;
            right: 15px;
            display: flex;
            gap: 15px;
            font-family: monospace;
            font-size: 0.6rem;
            color: #a3ff12;
            letter-spacing: 0.1em;
            z-index: 20;
        }

        /* CONTROLS */
        .controls {
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }

        .control-btn {
            background: none;
            border: 1px solid rgba(255,255,255,0.2);
            color: #fff;
            padding: 0.75rem 1.25rem;
            cursor: pointer;
            font-family: inherit;
            font-size: 0.75rem;
            letter-spacing: 0.1em;
            transition: all 0.3s;
        }

        .control-btn:hover {
            border-color: #a3ff12;
            color: #a3ff12;
            background: rgba(163, 255, 18, 0.05);
        }

        .progress-bar {
            flex: 1;
            height: 1px;
            background: rgba(255,255,255,0.1);
            position: relative;
        }

        .progress-fill {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            background: #a3ff12;
            box-shadow: 0 0 10px rgba(163, 255, 18, 0.5);
        }


        /* TEXT COLUMN */
        .text-column {
            position: relative;
        }

        .quote-icon {
            font-family: serif;
            font-size: 6rem;
            color: #222;
            line-height: 0.5;
            margin-bottom: 1rem;
            margin-left: -0.5rem;
        }

        .quote-text {
            font-family: 'Playfair Display', serif;
            font-size: 2.5rem;
            line-height: 1.2;
            margin-bottom: 2rem;
            font-weight: 500;
        }

        .author-details {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            border-top: 1px solid rgba(255,255,255,0.1);
            padding-top: 1.5rem;
        }

        .detail-row {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .label {
            font-size: 0.7rem;
            color: #555;
            letter-spacing: 0.15em;
        }

        .value {
            font-size: 0.9rem;
            letter-spacing: 0.05em;
            font-weight: 500;
        }

        .active-color {
            color: #a3ff12;
        }

        @media (max-width: 1024px) {
            .content-grid {
                grid-template-columns: 1fr;
                gap: 3rem;
            }
            .image-frame {
                aspect-ratio: 16/9;
                max-height: 50vh;
            }
            .quote-text {
                font-size: 2rem;
            }
            .author-details {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }
        }
      `}</style>
    </section>
  );
}
