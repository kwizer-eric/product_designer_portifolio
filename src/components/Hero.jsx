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

        // Gentle pendulum swing
        if (groupRef.current) {
            groupRef.current.rotation.z = Math.sin(t * 0.6) * 0.18;
            groupRef.current.position.y = Math.sin(t * 0.9) * 0.2;
        }

        if (groupRef.current) {
            groupRef.current.rotation.y = THREE.MathUtils.lerp(
                groupRef.current.rotation.y,
                state.mouse.x * 0.25,
                0.05,
            );
            groupRef.current.rotation.x = THREE.MathUtils.lerp(
                groupRef.current.rotation.x,
                state.mouse.y * 0.2,
                0.05,
            );
        }
    });

    return (
        <group ref={groupRef} position={[2.4, 1.2, 0]} scale={1.2}>
            {/* Chain going up */}
            <group ref={swingRef} position={[0, 2.5, 0]}>
                {Array.from({ length: 10 }).map((_, i) => (
                    <Torus
                        // eslint-disable-next-line react/no-array-index-key
                        key={i}
                        args={[0.18, 0.035, 8, 20]}
                        position={[0, i * -0.34, 0]}
                        rotation={[Math.PI / 2, i % 2 === 0 ? 0.4 : -0.4, 0]}
                    >
                        <meshStandardMaterial
                            color="#e3e3e3"
                            metalness={1}
                            roughness={0.15}
                            envMapIntensity={1.4}
                        />
                    </Torus>
                ))}
            </group>

            {/* Character / object */}
            <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.5}>
                <group position={[0, -1.4, 0]}>
                    <Sphere args={[0.6, 32, 32]} position={[0, 1.1, 0]}>
                        <meshPhysicalMaterial
                            color="#f5f5f5"
                            metalness={0.4}
                            roughness={0.05}
                            clearcoat={1}
                            thickness={2}
                        />
                    </Sphere>

                    <Box args={[1.1, 1.3, 0.6]} position={[0, 0, 0]}>
                        <meshStandardMaterial
                            color="#c0c0c0"
                            metalness={1}
                            roughness={0.2}
                            envMapIntensity={1.3}
                        />
                    </Box>

                    <Box args={[0.5, 0.8, 0.5]} position={[-0.6, -1.1, 0]}>
                        <meshStandardMaterial
                            color="#a3ff12"
                            metalness={1}
                            roughness={0.3}
                        />
                    </Box>

                    <Box args={[0.5, 0.8, 0.5]} position={[0.6, -1.1, 0]}>
                        <meshStandardMaterial
                            color="#ffffff"
                            metalness={1}
                            roughness={0.3}
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

    const yContent = useTransform(scrollY, [0, 500], [0, 200]);
    const opacityContent = useTransform(scrollY, [0, 400], [1, 0]);

    return (
        <section id="hero" className="hero-shell">
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
                style={{ y: yContent, opacity: opacityContent }}
            >
                <div className="hero-grid">
                    <div className="hero-copy">
                        <div className="hero-kicker-row">
                            <span className="hero-kicker">PRODUCT & VISUAL DESIGNER</span>
                            <span className="hero-location">Based in Kigali, working worldwide.</span>
                        </div>

                        <h1 className="hero-heading">
                            Visual
                            <span className="hero-heading-em">
                                Engineer
                                <span className="hero-heading-em-bar" />
                            </span>

                        </h1>

                        <p className="hero-subcopy">

                        </p>

                        <div className="hero-ctas">
                            <a href="#work" className="hero-primary-cta">
                                View artcrafts
                            </a>
                            <a href="#services" className="hero-secondary-cta">
                                What I Do
                            </a>
                        </div>

                        <div className="hero-meta-row">
                            <div className="hero-meta-block">
                                <span className="hero-meta-label"></span>
                                <span className="hero-meta-value"></span>
                            </div>
                            <div className="hero-meta-block">
                                <span className="hero-meta-label"></span>
                                <span className="hero-meta-value"></span>
                            </div>
                            <div className="hero-meta-block">
                                <span className="hero-meta-label"></span>
                                <span className="hero-meta-value"></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hero-scroll-indicator">
                    <span className="hero-scroll-line" />
                    <span className="hero-scroll-label">Scroll to explore</span>
                </div>
            </motion.div>

            <style>{`
        .hero-shell {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          background: #050505;
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
            radial-gradient(circle at 20% 30%, rgba(0, 153, 255, 0.45), transparent 60%),
            radial-gradient(circle at 70% 10%, rgba(0, 240, 255, 0.4), transparent 55%),
            radial-gradient(circle at 60% 80%, rgba(0, 0, 0, 1), #000);
          mix-blend-mode: screen;
          filter: blur(12px);
          opacity: 0.75;
          pointer-events: none;
          animation: hero-electric-pulse 16s infinite alternate ease-in-out;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 1600px;
          margin: 0 auto;
          padding: 7rem 2rem 4rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 100vh;
        }

        .hero-grid {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .hero-copy {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .hero-kicker-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          align-items: center;
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-family: monospace;
          color: #888;
        }

        .hero-kicker {
          color: #a3ff12;
        }

        .hero-location {
          border-left: 1px solid rgba(255, 255, 255, 0.15);
          padding-left: 1.25rem;
        }

        .hero-heading {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: clamp(2.8rem, 5vw, 4.5rem);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.04em;
          color: #f3f3f3;
        }

        .hero-heading-em {
          position: relative;
          display: inline-flex;
          align-items: center;
          padding-inline: 0.4rem;
          margin-inline: 0.35rem;
          background: radial-gradient(circle at 0 0, rgba(163, 255, 18, 0.25), transparent 55%);
          color: #ffffff;
        }

        .hero-heading-em-bar {
          position: absolute;
          inset-inline: 0;
          bottom: -0.1rem;
          height: 2px;
          background: linear-gradient(90deg, #a3ff12, transparent);
          opacity: 0.8;
        }

        .hero-subcopy {
          max-width: 34rem;
          font-size: 1rem;
          line-height: 1.7;
          color: #b3b3b3;
        }

        .hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .hero-primary-cta,
        .hero-secondary-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.8rem 1.8rem;
          border-radius: 999px;
          font-size: 0.8rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.25s ease;
          border: 1px solid transparent;
        }

        .hero-primary-cta {
          background: #ffffff;
          color: #050505;
          border-color: #ffffff;
        }

        .hero-primary-cta:hover,
        .hero-primary-cta:focus-visible {
          outline: none;
          background: #a3ff12;
          border-color: #a3ff12;
          box-shadow: 0 0 0 1px rgba(163, 255, 18, 0.4);
        }

        .hero-secondary-cta {
          border-color: rgba(255, 255, 255, 0.2);
          color: #f3f3f3;
          background: rgba(0, 0, 0, 0.5);
        }

        .hero-secondary-cta:hover,
        .hero-secondary-cta:focus-visible {
          outline: none;
          border-color: #a3ff12;
          color: #ffffff;
        }

        .hero-meta-row {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, auto));
          gap: 1.5rem;
          margin-top: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .hero-meta-block {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .hero-meta-label {
          font-family: monospace;
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #777;
        }

        .hero-meta-value {
          font-size: 0.95rem;
          color: #e0e0e0;
        }

        .hero-scroll-indicator {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 3rem;
          font-size: 0.75rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #777;
        }

        .hero-scroll-line {
          width: 40px;
          height: 1px;
          background: linear-gradient(90deg, #ffffff, transparent);
        }

        .hero-scroll-label {
          font-family: monospace;
        }

        @keyframes hero-electric-pulse {
          0% {
            transform: scale(1) translate3d(0, 0, 0);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.05) translate3d(-1.5%, 1.5%, 0);
            opacity: 0.9;
          }
          100% {
            transform: scale(1.08) translate3d(1.5%, -1.5%, 0);
            opacity: 0.65;
          }
        }

        @media (max-width: 1024px) {
          .hero-content {
            padding-top: 6rem;
          }

          .hero-grid {
            justify-content: center;
          }
        }

        @media (max-width: 640px) {
          .hero-content {
            padding-inline: 1.25rem;
            padding-top: 5rem;
          }

          .hero-kicker-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .hero-heading {
            font-size: clamp(2.2rem, 8vw, 3rem);
          }

          .hero-meta-row {
            grid-template-columns: 1fr;
          }

          .hero-panel {
            max-width: 100%;
          }
        }
      `}</style>
        </section>
    );
}
