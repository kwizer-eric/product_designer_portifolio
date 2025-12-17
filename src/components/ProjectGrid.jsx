import ProjectCard from './ProjectCard';
import './Projects.css';

const projects = [
    {
        id: "01",
        title: "Aether",
        role: "Visual Interface Architect",
        context: "Redesigning the flight control systems for a commercial space line. The goal was to reduce cognitive load during high-stress maneuvers.",
        color: "#00E0FF",
        heroColor: "#003b4d",
        beforeColor: "#1a2a33",
        afterColor: "#00E0FF",
    },
    {
        id: "02",
        title: "Sentry",
        role: "Data Visualization Lead",
        context: "A cybersecurity dashboard that turns millions of threat logs into a calm, actionable heatmap for SOC analysts.",
        color: "#FF3B30",
        heroColor: "#4d110d",
        beforeColor: "#331210",
        afterColor: "#FF3B30",
    },
    {
        id: "03",
        title: "Echo",
        role: "Product Designer",
        context: "An AI-powered audio workspace. We needed to visualize sound waves not just as data, but as tangible, sculptable objects.",
        color: "#BF5AF2",
        heroColor: "#3d1152",
        beforeColor: "#2a1533",
        afterColor: "#BF5AF2",
    },
    {
        id: "04",
        title: "Oasis",
        role: "Design Systems",
        context: "Unified design language for a global botanical research network. Bringing organic chaos into a structured digital archive.",
        color: "#30D158",
        heroColor: "#0d3b19",
        beforeColor: "#142e1d",
        afterColor: "#30D158",
    },
    {
        id: "05",
        title: "Horizon",
        role: "UX Strategy",
        context: "Autonomous vehicle fleet management. Shifting the paradigm from 'driving' to 'orchestrating' movement.",
        color: "#FF9F0A",
        heroColor: "#4d2e08",
        beforeColor: "#332210",
        afterColor: "#FF9F0A",
    },
    {
        id: "06",
        title: "Canvas",
        role: "Creative Director",
        context: "A mixed-reality painting tool. The challenge: crafting UI that feels present but invisible.",
        color: "#0A84FF",
        heroColor: "#082a4d",
        beforeColor: "#102033",
        afterColor: "#0A84FF",
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
        </section>
    );
}
