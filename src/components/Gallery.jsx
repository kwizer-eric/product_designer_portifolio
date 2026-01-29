import { motion } from 'framer-motion';

const galleryItems = [
    {
        title: "WEARABLE",
        category: "PERSONAL AUDIO",
        image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "CONTROLLER",
        category: "GAMING",
        image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "SMART SPEAKER",
        category: "HOME AUDIO",
        image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "WRISTWATCH",
        category: "HARDWARE",
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "EARBUDS",
        category: "PERSONAL AUDIO",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "HEADPHONES",
        category: "AUDIO DEVICE",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "VR HEADSET",
        category: "HARDWARE",
        image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "LAPTOP",
        category: "HARDWARE",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop"
    }
];

export default function Gallery() {
    return (
        <section className="gallery-section">
            <div className="container">
                <div className="gallery-header">
                    <motion.span
                        className="gallery-overline"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        GALLERY
                    </motion.span>
                    <motion.h2
                        className="gallery-title"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        PHYSICAL PRODUCTS
                    </motion.h2>
                    <motion.p
                        className="gallery-desc"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        CAREFULLY DESIGNED OBJECTS FOCUSED ON FORM, USABILITY, AND<br />MANUFACTURABLE DETAIL ACROSS MODERN CONSUMER DEVICES.
                    </motion.p>
                </div>

                <div className="gallery-grid">
                    {galleryItems.map((item, index) => (
                        <motion.div
                            key={index}
                            className="gallery-item"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <div className="gallery-img-container">
                                <img src={item.image} alt={item.title} />
                                <div className="corner corner-tl" />
                                <div className="corner corner-br" />
                            </div>
                            <div className="gallery-item-info">
                                <h3 className="item-title">{item.title}</h3>
                                <p className="item-category">{item.category}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style>{`
                .gallery-section {
                    padding: 10rem 0;
                    background-color: #000;
                    color: #fff;
                }

                .gallery-header {
                    text-align: center;
                    margin-bottom: 10rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .gallery-overline {
                    font-family: 'Inter', sans-serif;
                    color: #a3ff12; 
                    font-size: 0.8rem;
                    letter-spacing: 0.5em;
                    margin-bottom: 1.5rem;
                    font-weight: 600;
                }

                .gallery-title {
                    font-family: 'Inter', sans-serif;
                    font-size: 8rem;
                    font-weight: 600;
                    margin-bottom: 2rem;
                    letter-spacing: -0.05em;
                    line-height: 0.85;
                }

                .gallery-desc {
                    font-family: 'Inter', sans-serif;
                    font-size: 1.1rem;
                    color: rgba(255, 255, 255, 0.4);
                    line-height: 1.4;
                    max-width: 900px;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                }

                .gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 3rem;
                    row-gap: 6rem;
                    padding: 0 5vw;
                }

                .gallery-item {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    cursor: pointer;
                }

                .gallery-img-container {
                    width: 100%;
                    height: 600px; /* Significantly increased height */
                    background: #0a0a0a;
                    position: relative;
                    overflow: hidden;
                    border: 1px solid rgba(255,255,255,0.05);
                }

                .gallery-img-container img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }

                .gallery-item:hover .gallery-img-container img {
                    transform: scale(1.05);
                }

                .corner {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .corner-tl { top: 10px; left: 10px; border-right: 0; border-bottom: 0; }
                .corner-br { bottom: 10px; right: 10px; border-left: 0; border-top: 0; }

                .gallery-item-info {
                    display: flex;
                    flex-direction: column;
                    gap: 0.2rem;
                }

                .item-title {
                    font-family: 'Inter', sans-serif;
                    font-size: 1.8rem;
                    font-weight: 700;
                    letter-spacing: 0.02em;
                }

                .item-category {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.75rem;
                    color: rgba(255, 255, 255, 0.4);
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    font-weight: 500;
                }

                @media (max-width: 1200px) {
                    .gallery-grid { grid-template-columns: repeat(3, 1fr); }
                    .gallery-title { font-size: 4rem; }
                }

                @media (max-width: 900px) {
                    .gallery-grid { grid-template-columns: repeat(2, 1fr); }
                    .gallery-title { font-size: 3rem; }
                }

                @media (max-width: 600px) {
                    .gallery-grid { grid-template-columns: 1fr; }
                    .gallery-header { margin-bottom: 4rem; }
                    .gallery-title { font-size: 2.5rem; }
                }
            `}</style>
        </section>
    );
}
