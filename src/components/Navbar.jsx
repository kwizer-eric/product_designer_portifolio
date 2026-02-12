import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [time, setTime] = useState("");

    // Live Clock
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options = { weekday: 'long', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
            setTime(now.toLocaleTimeString('en-US', options));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuItems = [
        { label: "HOME", href: "#hero", style: "green" },
        { label: "ABOUT", href: "#story", style: "default" },
        { label: "SERVICES", href: "#services", style: "white" }, // Replaced 'ARTICLE' with 'SERVICES' for relevance
        { label: "WORK", href: "#work", style: "default" },
        { label: "CONTACT", href: "#contact", style: "default" },
    ];

    return (
        <>
            {/* TOP BAR */}
            <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 mix-blend-exclusion text-white pointer-events-none">

                {/* TIME (Left) */}
                <div className="font-mono text-xs tracking-wider hidden md:block w-32">
                    {time}
                </div>

                {/* BRAND (Center) */}
                <div className="font-mono text-sm tracking-widest font-bold absolute left-1/2 transform -translate-x-1/2">
                    AHIRWE
                </div>

                {/* HAMBURGER (Right) */}
                <div className="pointer-events-auto cursor-pointer w-32 flex justify-end" onClick={toggleMenu}>
                    <div className="flex flex-col gap-1.5 w-8 items-end">
                        {/* Line 1: Longest */}
                        <motion.span
                            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0, width: isOpen ? "100%" : "32px" }}
                            className="h-0.5 bg-white block w-full origin-center"
                        ></motion.span>
                        {/* Line 2 */}
                        <motion.span
                            animate={{ opacity: isOpen ? 0 : 1 }}
                            className="h-0.5 bg-white block w-3/4"
                        ></motion.span>
                        {/* Line 3 */}
                        <motion.span
                            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0, width: isOpen ? "100%" : "20px" }}
                            className="h-0.5 bg-white block w-1/2 origin-center"
                        ></motion.span>
                    </div>
                </div>
            </nav>

            {/* FULLSCREEN OVERLAY */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
                        animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                        exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
                        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 bg-black z-40 flex flex-col justify-between p-8 md:p-16 text-white overflow-hidden"
                    >

                        {/* Header (Close Button area - managed by top nav but structure kept consistent) */}
                        <div className="flex justify-between items-center">
                            <div className="text-sm font-mono text-gray-500">NAVIGATION</div>
                            <button onClick={toggleMenu} className="text-white text-xl">✕</button>
                        </div>

                        {/* MENU LINKS */}
                        <div className="flex flex-col gap-4 md:gap-6 mt-10">
                            {menuItems.map((item, index) => (
                                <motion.a
                                    key={index}
                                    href={item.href}
                                    onClick={toggleMenu}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 + index * 0.1 }}
                                    className={`text-4xl md:text-6xl font-bold uppercase tracking-tighter flex items-center w-fit px-4 py-2 ${item.style === 'green' ? 'bg-[#a3ff12] text-black' :
                                        item.style === 'white' ? 'bg-white text-black' : 'text-white hover:text-[#a3ff12] transition-colors'
                                        }`}
                                >
                                    {item.label}
                                    {item.style !== 'default' && <span className="ml-4 text-xs font-mono tracking-widest opacity-60">PAGE 00{index + 1}</span>}
                                </motion.a>
                            ))}
                        </div>

                        {/* FOOTER */}
                        <div className="flex flex-col md:flex-row justify-between items-end border-t border-gray-800 pt-8 mt-10">
                            <div className="flex gap-8 text-sm font-mono text-gray-400">
                                <a href="#" className="hover:text-white">X LINK</a>
                                <a href="#" className="hover:text-white">DRIBBBLE</a>
                                <a href="#" className="hover:text-white">LINKEDIN</a>
                            </div>
                            <div className="mt-4 md:mt-0 font-mono text-xs text-gray-600">
                                AHIRWE DESIGN SYSTEM
                            </div>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
