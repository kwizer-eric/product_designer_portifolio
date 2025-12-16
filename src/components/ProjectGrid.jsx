import ProjectCard from './ProjectCard';

const projects = [
    {
        id: 1,
        title: "Lumina",
        role: "Product System",
        description: "Holistic smart home interface focusing on ambient computing.",
        color: "#1c1c1c"
    },
    {
        id: 2,
        title: "Apex",
        role: "Visual Identity",
        description: "Fintech branding that conveys speed through static motion.",
        color: "#0f0f0f"
    },
    {
        id: 3,
        title: "Mono",
        role: "Audio Interface",
        description: "Minimalist control surface for high-fidelity audio equipment.",
        color: "#222"
    },
    {
        id: 4,
        title: "Vortex",
        role: "VR Experience",
        description: "Visual language for an abstract virtual reality platform.",
        color: "#111"
    }
];

export default function ProjectGrid() {
    return (
        <section className="projects-section">
            <div className="container">
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
            <style>{`
        .projects-section {
          padding: var(--spacing-xxl) var(--spacing-md);
          background-color: var(--color-bg);
          position: relative;
          z-index: 2;
        }
        .container {
          max-width: var(--container-width);
          margin: 0 auto;
        }
      `}</style>
        </section>
    );
}
