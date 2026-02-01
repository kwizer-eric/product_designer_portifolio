import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      quote: "Incorporating Designor Framer into our web development process has streamlined collaboration.",
      author: "John Smith",
      role: "CEO @taskify",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
    },
    {
      quote: "The visual language established here has become the cornerstone of our brand identity.",
      author: "Sarah Jenkings",
      role: "Director @aura",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop"
    },
    {
      quote: "An absolute masterclass in whitespace and typography. The results speak for themselves.",
      author: "Alex Morgan",
      role: "Lead @studio",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Staggered text animation variants
  const quoteVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.4, ease: [0.2, 0.65, 0.3, 0.9] }
    }
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="testimonials-layout"
        >

          {/* Left Column: Content */}
          <div className="content-col">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.5, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="quote-icon"
            >
              “
            </motion.div>

            <div className="quote-wrapper">
              <AnimatePresence mode='wait'>
                <motion.div
                  key={activeIndex}
                  variants={quoteVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="active-quote-block"
                >
                  <p className="quote-text">
                    {testimonials[activeIndex].quote.split(" ").map((word, i) => (
                      <motion.span key={i} variants={wordVariants} className="word">
                        {word}{"\u00A0"}
                      </motion.span>
                    ))}
                  </p>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="author-block"
                  >
                    <div className="author-line" />
                    <div className="author-info">
                      <span className="name">{testimonials[activeIndex].author}</span>
                      <span className="role">{testimonials[activeIndex].role}</span>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="nav-buttons">
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "#fff", color: "#000" }}
                whileTap={{ scale: 0.95 }}
                onClick={prevTestimonial}
                className="nav-btn prev"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "#fff", color: "#000" }}
                whileTap={{ scale: 0.95 }}
                onClick={nextTestimonial}
                className="nav-btn next"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </motion.button>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="image-col">
            <div className="image-frame">
              {/* Corner Markers with Pulse */}
              <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="corner c-tl" />
              <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="corner c-tr" />
              <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: 1.0 }} className="corner c-bl" />
              <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: 1.5 }} className="corner c-br" />

              <AnimatePresence mode='wait'>
                <motion.div
                  key={activeIndex}
                  className="image-reveal-mask"
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  animate={{ clipPath: 'inset(0 0% 0 0)' }}
                  exit={{ clipPath: 'inset(0 0% 0 100%)' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].author}
                    className="testimonial-image"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </motion.div>
      </div>

      <style>{`
                .testimonials-section {
                    background-color: #050505;
                    color: #fff;
                    padding: 10vh 5vw;
                    min-height: 80vh;
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                }

                .container {
                    width: 100%;
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .testimonials-layout {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 8rem;
                    align-items: center;
                }

                /* Left Column */
                .content-col {
                    position: relative;
                    z-index: 10;
                }

                .quote-icon {
                    font-size: 8rem;
                    line-height: 1;
                    color: #333;
                    font-family: serif;
                    margin-bottom: 2rem;
                    opacity: 0.5;
                    pointer-events: none;
                }

                .quote-wrapper {
                    min-height: 300px; /* Prevent layout shift */
                }

                .quote-text {
                    font-size: clamp(2rem, 3vw, 2.8rem);
                    line-height: 1.2;
                    margin-bottom: 4rem;
                    font-weight: 300;
                    letter-spacing: -0.02em;
                    display: flex;
                    flex-wrap: wrap;
                }
                
                .word {
                    display: inline-block;
                }

                .author-block {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                }

                .author-line {
                    width: 2px;
                    height: 50px;
                    background: #fff;
                }

                .author-info {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }

                .name {
                    font-size: 1.2rem;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                }

                .role {
                    color: #888;
                    font-size: 0.9rem;
                    font-family: monospace;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                }

                .nav-buttons {
                    margin-top: 4rem;
                    display: flex;
                    gap: 1.5rem;
                }

                .nav-btn {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: transparent;
                    border: 1px solid rgba(255,255,255,0.2);
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    outline: none;
                }

                /* Right Column */
                .image-col {
                    position: relative;
                }

                .image-frame {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 4/5;
                    padding: 20px;
                }

                .image-reveal-mask {
                    width: 100%;
                    height: 100%;
                }

                .testimonial-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: grayscale(100%) contrast(1.1);
                }

                .corner {
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    border: 2px solid #fff;
                    z-index: 20;
                }

                .c-tl { top: 0; left: 0; border-right: none; border-bottom: none; }
                .c-tr { top: 0; right: 0; border-left: none; border-bottom: none; }
                .c-bl { bottom: 0; left: 0; border-right: none; border-top: none; }
                .c-br { bottom: 0; right: 0; border-left: none; border-top: none; }

                @media (max-width: 900px) {
                    .testimonials-layout {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                    .testimonials-section {
                        padding: 5rem 5vw;
                    }
                    .quote-wrapper {
                        min-height: auto;
                        margin-bottom: 2rem;
                    }
                    .quote-text {
                        font-size: 1.8rem;
                    }
                    .image-frame {
                        aspect-ratio: 16/9;
                        padding: 10px;
                    }
                }
            `}</style>
    </section >
  );
}
