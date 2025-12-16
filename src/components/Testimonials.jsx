export default function Testimonials() {
    const testimonials = [
        {
            quote: "Erick has a rare ability to translate abstract concepts into tangible, beautiful products. A true visionary.",
            author: "Sarah Jenkings",
            role: "CEO, Aura Tech"
        },
        {
            quote: "The attention to detail is unmatched. Every pixel serves a purpose, and the motion work brought our brand to life.",
            author: "David Chen",
            role: "Director, Studio Mono"
        },
        {
            quote: "Professional, efficient, and creatively boundless. Working with Erick was the highlight of our rebranding.",
            author: "Elena Rossi",
            role: "Founder, Luxe Interiors"
        }
    ];

    return (
        <section className="testimonials-section">
            <div className="container">
                <h2 className="section-label">Endorsements</h2>
                <div className="testimonials-grid">
                    {testimonials.map((item, index) => (
                        <div key={index} className="testimonial-card">
                            <blockquote className="quote">"{item.quote}"</blockquote>
                            <div className="author-info">
                                <cite className="author-name">{item.author}</cite>
                                <span className="author-role">{item.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
        .testimonials-section {
          padding: var(--spacing-xxl) var(--spacing-md);
          background-color: var(--color-bg);
          overflow: hidden;
        }
        .container {
          max-width: var(--container-width);
          margin: 0 auto;
        }
        .section-label {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-text-dim);
          margin-bottom: var(--spacing-xl);
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--spacing-xl);
        }
        .testimonial-card {
           display: flex;
           flex-direction: column;
           gap: var(--spacing-md);
        }
        .quote {
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          line-height: 1.3;
          font-weight: 300;
          color: var(--color-text);
        }
        .author-info {
          display: flex;
          flex-direction: column;
          font-size: 0.9rem;
        }
        .author-name {
          font-style: normal;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .author-role {
          color: var(--color-text-dim);
        }

        @media (min-width: 900px) {
           .testimonials-grid {
              grid-template-columns: repeat(3, 1fr);
           }
        }
      `}</style>
        </section>
    );
}
