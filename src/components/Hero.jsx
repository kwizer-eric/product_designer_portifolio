import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Environment, Torus, Sphere, Box } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

// 3D hanging object + chain, inspired by a pendant / toy on a chain
function HangingPendant() {
    const groupRef = useRef();
    const swingRef = useRef();

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime();

        // Gentle pendulum swing with damping
        if (groupRef.current) {
            groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.15;
            groupRef.current.position.y = Math.sin(t * 0.8) * 0.15;
        }

        // Smooth mouse parallax
        if (groupRef.current) {
            groupRef.current.rotation.y = THREE.MathUtils.lerp(
                groupRef.current.rotation.y,
                state.mouse.x * 0.2,
                0.04,
            );
            groupRef.current.rotation.x = THREE.MathUtils.lerp(
                groupRef.current.rotation.x,
                state.mouse.y * 0.15,
                0.04,
            );
        }
    });

    return (
        <group ref={groupRef} position={[2.4, 1.2, 0]} scale={1.3}>
            {/* Chain going up */}
            <group ref={swingRef} position={[0, 2.5, 0]}>
                {Array.from({ length: 12 }).map((_, i) => (
                    <Torus
                        // eslint-disable-next-line react/no-array-index-key
                        key={i}
                        args={[0.16, 0.03, 8, 24]}
                        position={[0, i * -0.32, 0]}
                        rotation={[Math.PI / 2, i % 2 === 0 ? 0.3 : -0.3, 0]}
                    >
                        <meshStandardMaterial
                            color="#f0f0f0"
                            metalness={1}
                            roughness={0.1}
                            envMapIntensity={1.6}
                        />
                    </Torus>
                ))}
            </group>

            {/* Character / object */}
            <Float speed={1} rotationIntensity={0.4} floatIntensity={0.4}>
                <group position={[0, -1.5, 0]}>
                    {/* Head */}
                    <Sphere args={[0.65, 32, 32]} position={[0, 1.2, 0]}>
                        <meshPhysicalMaterial
                            color="#ffffff"
                            metalness={0.3}
                            roughness={0.05}
                            clearcoat={1}
                            clearcoatRoughness={0.1}
                            thickness={2}
                            transmission={0.1}
                        />
                    </Sphere>

                    {/* Body */}
                    <Box args={[1.2, 1.4, 0.65]} position={[0, 0, 0]}>
                        <meshStandardMaterial
                            color="#d0d0d0"
                            metalness={1}
                            roughness={0.15}
                            envMapIntensity={1.5}
                        />
                    </Box>

                    {/* Left leg with accent */}
                    <Box args={[0.55, 0.85, 0.55]} position={[-0.65, -1.15, 0]}>
                        <meshStandardMaterial
                            color="#a3ff12"
                            metalness={1}
                            roughness={0.2}
                            emissive="#a3ff12"
                            emissiveIntensity={0.15}
                        />
                    </Box>

                    {/* Right leg */}
                    <Box args={[0.55, 0.85, 0.55]} position={[0.65, -1.15, 0]}>
                        <meshStandardMaterial
                            color="#ffffff"
                            metalness={1}
                            roughness={0.2}
                            envMapIntensity={1.4}
                        />
                    </Box>
                </group>
            </Float>
        </group>
    );
}

// MAIN HERO COMPONENT
export default function Hero() {
    const { scrollY } = useScroll();
    const containerRef = useRef(null);

    const yContent = useTransform(scrollY, [0, 600], [0, 250]);
    const opacityContent = useTransform(scrollY, [0, 500], [1, 0]);
    const scaleContent = useTransform(scrollY, [0, 500], [1, 0.95]);

    return (
        <section id="hero" className="hero-shell" ref={containerRef}>
            {/* 3D SCENE */}
            <div className="hero-scene">
                <div className="hero-electric-bg" />
                <Canvas camera={{ position: [0, 0, 9], fov: 40 }} gl={{ antialias: true }}>
                    <color attach="background" args={['#050505']} />

                    <ambientLight intensity={0.6} />
                    <spotLight
                        position={[8, 12, 10]}
                        angle={0.2}
                        penumbra={1}
                        intensity={1.1}
                        color="#a3ff12"
                    />
                    <pointLight
                        position={[-8, -10, -6]}
                        intensity={0.9}
                        color="#4c4cff"
                    />

                    <Environment preset="city" />
                    <HangingPendant />
                    <Stars
                        radius={80}
                        depth={40}
                        count={1200}
                        factor={3}
                        saturation={0}
                        fade
                        speed={0.4}
                    />
                </Canvas>
            </div>

            {/* FOREGROUND CONTENT */}
            <motion.div
                className="hero-content"
                style={{ 
                    y: yContent, 
                    opacity: opacityContent,
                    scale: scaleContent
                }}
            >
                <div className="hero-grid">
                    <div className="hero-copy">
                        <motion.div 
                            className="hero-kicker-row"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <span className="hero-kicker">PRODUCT & VISUAL DESIGNER</span>
                            <span className="hero-location">Based in Kigali, working worldwide</span>
                        </motion.div>

                        <motion.h1 
                            className="hero-heading"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            Crafting
                            <span className="hero-heading-em">
                                Digital
                                <span className="hero-heading-em-bar" />
                            </span>
                            Experiences
                        </motion.h1>

                        <motion.p 
                            className="hero-subcopy"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            I design products and visual systems that bridge the gap between 
                            industrial design and digital interfaces. Every pixel, every interaction, 
                            every detail is intentional.
                        </motion.p>

                        <motion.div 
                            className="hero-ctas"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                        >
                            <a href="#work" className="hero-primary-cta">
                                <span>View Projects</span>
                            </a>
                            <a href="#services" className="hero-secondary-cta">
                                My Services
                            </a>
                        </motion.div>

                        <motion.div 
                            className="hero-meta-row"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.9 }}
                        >
                            <div className="hero-meta-block">
                                <span className="hero-meta-label">Experience</span>
                                <span className="hero-meta-value">8+ Years</span>
                            </div>
                            <div className="hero-meta-block">
                                <span className="hero-meta-label">Projects</span>
                                <span className="hero-meta-value">40+ Shipped</span>
                            </div>
                            <div className="hero-meta-block">
                                <span className="hero-meta-label">Focus</span>
                                <span className="hero-meta-value">Product & Brand</span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <motion.div 
                    className="hero-scroll-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                >
                    <motion.span 
                        className="hero-scroll-line"
                        animate={{ 
                            scaleX: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <span className="hero-scroll-label">Scroll to explore</span>
                </motion.div>
            </motion.div>

            <style>{`
        .hero-shell {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          background: #050505;
          display: flex;
          align-items: center;
        }

        .hero-scene {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero-electric-bg {
          position: absolute;
          inset: -10%;
          background:
            radial-gradient(circle at 20% 30%, rgba(0, 153, 255, 0.5), transparent 65%),
            radial-gradient(circle at 70% 10%, rgba(0, 240, 255, 0.45), transparent 60%),
            radial-gradient(circle at 60% 80%, rgba(163, 255, 18, 0.15), transparent 70%),
            radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 1), #000);
          mix-blend-mode: screen;
          filter: blur(14px);
          opacity: 0.8;
          pointer-events: none;
          animation: hero-electric-pulse 18s infinite alternate ease-in-out;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 1600px;
          margin: 0 auto;
          padding: 8rem 2.5rem 5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 100vh;
          width: 100%;
        }

        .hero-grid {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          max-width: 900px;
        }

        .hero-copy {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          width: 100%;
        }

        .hero-kicker-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          align-items: center;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-family: 'Inter', monospace;
          color: #999;
          margin-bottom: 0.5rem;
        }

        .hero-kicker {
          color: #a3ff12;
          font-weight: 600;
        }

        .hero-location {
          border-left: 1px solid rgba(255, 255, 255, 0.12);
          padding-left: 1.5rem;
          color: #888;
        }

        .hero-heading {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: clamp(3.5rem, 6.5vw, 6rem);
          font-weight: 900;
          line-height: 0.95;
          letter-spacing: -0.05em;
          color: #ffffff;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .hero-heading-em {
          position: relative;
          display: inline-block;
          color: #a3ff12;
          padding-inline: 0.5rem;
          margin-inline: 0.25rem;
        }

        .hero-heading-em-bar {
          position: absolute;
          inset-inline: 0;
          bottom: 0.1rem;
          height: 3px;
          background: linear-gradient(90deg, #a3ff12, rgba(163, 255, 18, 0.3));
          opacity: 0.6;
          border-radius: 2px;
        }

        .hero-subcopy {
          max-width: 600px;
          font-size: 1.15rem;
          line-height: 1.75;
          color: #d0d0d0;
          font-weight: 400;
          margin-top: 0.5rem;
        }

        .hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 1.25rem;
          margin-top: 1rem;
        }

        .hero-primary-cta,
        .hero-secondary-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 2.25rem;
          border-radius: 999px;
          font-size: 0.85rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid transparent;
          font-weight: 600;
          position: relative;
          overflow: hidden;
        }

        .hero-primary-cta {
          background: #ffffff;
          color: #050505;
          border-color: #ffffff;
        }

        .hero-primary-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #a3ff12, #8ae600);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .hero-primary-cta:hover,
        .hero-primary-cta:focus-visible {
          outline: none;
          color: #050505;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(163, 255, 18, 0.3);
        }

        .hero-primary-cta:hover::before {
          opacity: 1;
        }

        .hero-primary-cta span {
          position: relative;
          z-index: 1;
        }

        .hero-secondary-cta {
          border-color: rgba(255, 255, 255, 0.25);
          color: #f5f5f5;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
        }

        .hero-secondary-cta:hover,
        .hero-secondary-cta:focus-visible {
          outline: none;
          border-color: #a3ff12;
          color: #ffffff;
          background: rgba(163, 255, 18, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(163, 255, 18, 0.2);
        }

        .hero-meta-row {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, auto));
          gap: 2.5rem;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .hero-meta-block {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .hero-meta-label {
          font-family: monospace;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #888;
          font-weight: 500;
        }

        .hero-meta-value {
          font-size: 1.1rem;
          color: #ffffff;
          font-weight: 600;
          letter-spacing: -0.02em;
        }

        .hero-scroll-indicator {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          margin-top: 4rem;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #999;
          font-family: monospace;
        }

        .hero-scroll-line {
          width: 50px;
          height: 1.5px;
          background: linear-gradient(90deg, #a3ff12, rgba(163, 255, 18, 0.3));
          border-radius: 2px;
        }

        .hero-scroll-label {
          font-family: 'Inter', monospace;
        }

        @keyframes hero-electric-pulse {
          0% {
            transform: scale(1) translate3d(0, 0, 0);
            opacity: 0.75;
          }
          50% {
            transform: scale(1.06) translate3d(-2%, 2%, 0);
            opacity: 0.9;
          }
          100% {
            transform: scale(1.1) translate3d(2%, -2%, 0);
            opacity: 0.7;
          }
        }

        @media (max-width: 1024px) {
          .hero-content {
            padding: 7rem 2rem 4rem;
          }

          .hero-grid {
            max-width: 100%;
            justify-content: center;
          }

          .hero-copy {
            align-items: center;
            text-align: center;
          }

          .hero-subcopy {
            text-align: center;
          }

          .hero-meta-row {
            justify-content: center;
          }
        }

        @media (max-width: 640px) {
          .hero-content {
            padding: 6rem 1.5rem 3rem;
          }

          .hero-kicker-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }

          .hero-location {
            border-left: none;
            padding-left: 0;
          }

          .hero-heading {
            font-size: clamp(2.5rem, 10vw, 4rem);
            text-align: left;
          }

          .hero-subcopy {
            font-size: 1rem;
            text-align: left;
          }

          .hero-ctas {
            flex-direction: column;
            width: 100%;
          }

          .hero-primary-cta,
          .hero-secondary-cta {
            width: 100%;
            justify-content: center;
          }

          .hero-meta-row {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            text-align: left;
          }
        }
      `}</style>
        </section>
    );
}
