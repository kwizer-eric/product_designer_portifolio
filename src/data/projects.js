
export const projects = [
    {
        id: "01",
        title: "Grido",
        category: "ID",
        serviceId: "s1",
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop",
        year: "2024",
        role: "Lead",
        challenge: "Modular brand, no chaos.",
        solution: "Grid logo. Adaptive lockups.",
        gallery: [
            "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop"
        ]
    },
    {
        id: "02",
        title: "Stickify",
        category: "Web",
        serviceId: "s3",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
        year: "2023",
        role: "Product",
        challenge: "Non-designers. Print truth.",
        solution: "Drag UI. Live proof.",
        gallery: [
            "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop"
        ]
    },
    {
        id: "03",
        title: "Agentify",
        category: "AI",
        serviceId: "s3",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
        year: "2025",
        role: "UX",
        challenge: "Trust the agent.",
        solution: "Live graph. Explain paths.",
        gallery: [
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
        ]
    },
    {
        id: "04",
        title: "AI Nest",
        category: "HW",
        serviceId: "s2",
        image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000&auto=format&fit=crop",
        year: "2024",
        role: "ID",
        challenge: "Smart hub. Not a gadget.",
        solution: "Ceramic shell. Soft form.",
        gallery: [
            "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop"
        ]
    },
    {
        id: "05",
        title: "Brandora",
        category: "ID",
        serviceId: "s1",
        image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop",
        year: "2023",
        role: "AD",
        challenge: "Legacy + Gen Z.",
        solution: "Dual palette. New serif.",
        gallery: [
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop"
        ]
    },
    {
        id: "06",
        title: "Codify",
        category: "Dev",
        serviceId: "s3",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
        year: "2024",
        role: "UI",
        challenge: "Long sessions. Less strain.",
        solution: "Dark theme. Color-safe syntax.",
        gallery: [
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop"
        ]
    },
    {
        id: "07",
        title: "Dailyhub",
        category: "App",
        serviceId: "s3",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop",
        year: "2025",
        role: "Product",
        challenge: "End doomscroll.",
        solution: "Digest mode. Done state.",
        gallery: [
            "https://images.unsplash.com/photo-1512428559087-560fa0db79c5?q=80&w=800&auto=format&fit=crop"
        ]
    },
    {
        id: "08",
        title: "Lumina",
        category: "Photo",
        serviceId: "s4",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
        year: "2024",
        role: "AD",
        challenge: "Light in motion.",
        solution: "Long exposure + map.",
        gallery: [
            "https://images.unsplash.com/photo-1517816428103-7dc26ec54855?q=80&w=800&auto=format&fit=crop"
        ]
    },
    {
        id: "09",
        title: "Vortex",
        category: "3D",
        serviceId: "s4",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
        year: "2025",
        role: "3D",
        challenge: "Explain quantum.",
        solution: "Procedural loops. Abstract.",
        gallery: [
            "https://images.unsplash.com/photo-1614728853970-a86c001cbc9f?q=80&w=800&auto=format&fit=crop"
        ]
    }
];

export const getProjectsByService = (serviceId) => {
    return projects.filter(p => p.serviceId === serviceId);
};
