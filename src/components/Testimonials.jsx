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

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="testimonials-layout">

          {/* Left Column: Content */}
          <div className="content-col">
            <div className="quote-icon">“</div>

            <div className="quote-slider">
              <AnimatePresence mode='wait'>
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="active-quote-block"
                >
                  <p className="quote-text">
                    {testimonials[activeIndex].quote}
                  </p>

                  <div className="author-block">
                    <div className="author-line" />
                    <div className="author-info">
                      <span className="name">{testimonials[activeIndex].author}</span>
                      <span className="role">{testimonials[activeIndex].role}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="nav-buttons">
              <button onClick={prevTestimonial} className="nav-btn prev">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button onClick={nextTestimonial} className="nav-btn next">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="image-col">
            <div className="image-frame">
              {/* Corner Markers */}
              <div className="corner c-tl" />
              <div className="corner c-tr" />
              <div className="corner c-bl" />
              <div className="corner c-br" />

              <AnimatePresence mode='wait'>
                <motion.img
                  key={activeIndex}
                  src={testimonials[activeIndex].image}
                  alt={testimonials[activeIndex].author}
                  className="testimonial-image"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      <style>{`
                .testimonials-section {
                    background-color: #000;
                    color: #fff;
                    padding: 10vh 5vw;
                    min-height: 80vh;
                    display: flex;
                    align-items: center;
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
                }

                .quote-icon {
                    font-size: 8rem;
                    line-height: 1;
                    color: #333;
                    font-family: serif;
                    margin-bottom: 2rem;
                    opacity: 0.5;
                }

                .quote-text {
                    font-size: clamp(2rem, 3vw, 2.5rem);
                    line-height: 1.2;
                    margin-bottom: 4rem;
                    font-weight: 400;
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
                    font-weight: 500;
                }

                .role {
                    color: #888;
                    font-size: 1rem;
                }

                .nav-buttons {
                    margin-top: 4rem;
                    display: flex;
                    gap: 1rem;
                }

                .nav-btn {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: #222;
                    border: 1px solid #333;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .nav-btn:hover {
                    background: #fff;
                    color: #000;
                    border-color: #fff;
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

                .testimonial-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    background: #111;
                    filter: grayscale(100%);
                }

                .corner {
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    border: 2px solid #fff;
                    z-index: 10;
                }

                .c-tl { top: 0; left: 0; border-right: none; border-bottom: none; }
                .c-tr { top: 0; right: 0; border-left: none; border-bottom: none; }
                .c-bl { bottom: 0; left: 0; border-right: none; border-top: none; }
                .c-br { bottom: 0; right: 0; border-left: none; border-top: none; }

                @media (max-width: 900px) {
                    .testimonials-layout {
                        grid-template-columns: 1fr;
                        gap: 4rem;
                    }
                    .testimonials-section {
                        padding: 5rem 2rem;
                    }
                    .quote-text {
                        font-size: 1.5rem;
                    }
                    .image-frame {
                        aspect-ratio: 16/9;
                    }
                }
            `}</style>
    </section>
  );
}
