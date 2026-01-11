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
        heroImg: "https://images.unsplash.com/photo-1446776811953-b23d57bd21cd",
        beforeImg: "https://images.unsplash.com/photo-1514820402329-de527fdd2d08?auto=format&fit=crop&w=500&q=80",
        afterImg: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80",
        finalImgs: [
            "https://images.unsplash.com/photo-1454789548728-85d2696cfbaf",
            "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
            "https://images.unsplash.com/photo-1614728853970-a86c001cbc9f"
        ]
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
        heroImg: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
        beforeImg: "https://images.unsplash.com/photo-1558494949-ef527b00dea1?auto=format&fit=crop&w=500&q=80",
        afterImg: "https://images.unsplash.com/photo-1544197150-b99a580bbc7c?auto=format&fit=crop&w=500&q=80",
        finalImgs: [
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
            "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb",
            "https://images.unsplash.com/photo-1510511459019-5dda7724fd82"
        ]
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
        heroImg: "https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5",
        beforeImg: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=500&q=80",
        afterImg: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=500&q=80",
        finalImgs: [
            "https://images.unsplash.com/photo-1484704849700-f032a568e944",
            "https://images.unsplash.com/photo-1557804506-669a67965ba0",
            "https://images.unsplash.com/photo-1516280440614-6697288d5d38"
        ]
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
        heroImg: "https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c",
        beforeImg: "https://images.unsplash.com/photo-1530968464165-7a1861cbaf9f?auto=format&fit=crop&w=500&q=80",
        afterImg: "https://images.unsplash.com/photo-1470058869958-2a77ade41c02?auto=format&fit=crop&w=500&q=80",
        finalImgs: [
            "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
            "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735",
            "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f"
        ]
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
        heroImg: "https://images.unsplash.com/photo-1494905998402-395d579af36f",
        beforeImg: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=500&q=80",
        afterImg: "https://images.unsplash.com/photo-1554744512-783e26046759?auto=format&fit=crop&w=500&q=80",
        finalImgs: [
            "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7",
            "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023",
            "https://images.unsplash.com/photo-1503376763036-066120622c74"
        ]
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
        heroImg: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
        beforeImg: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=500&q=80",
        afterImg: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=500&q=80",
        finalImgs: [
            "https://images.unsplash.com/photo-1558655146-d09347e92766",
            "https://images.unsplash.com/photo-1550684848-fac1c5b4e853",
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"
        ]
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
