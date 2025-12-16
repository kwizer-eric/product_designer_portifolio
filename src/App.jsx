import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import ProjectGrid from './components/ProjectGrid';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="app">
      <Hero />
      <About />
      <Skills />
      <ProjectGrid />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
