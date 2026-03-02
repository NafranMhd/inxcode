import { useState } from 'react';
import MobileCarousel from './MobileCarousel';
import './Projects.css';

const Projects = () => {
    const projects = [
        {
            title: 'E-Commerce Platform',
            category: 'Web Development',
            description: 'Scalable e-commerce solution with advanced inventory management and payment integration.',
            technologies: ['React', 'Node.js', 'Stripe'],
            image: '/project_ecommerce_1766409949007.png',
        },
        {
            title: 'Learning Management System',
            category: 'Education Tech',
            description: 'Comprehensive LMS platform featuring video streaming, interactive assessments, and progress tracking.',
            technologies: ['Next.js', 'PostgreSQL', 'AWS'],
            image: '/project_lms_1766409972210.png',
        },
        {
            title: 'Mobile Banking App',
            category: 'Mobile Development',
            description: 'Secure banking application with biometric authentication and real-time transaction processing.',
            technologies: ['React Native', 'Firebase', 'Node.js'],
            image: '/project_mobile_banking_1766409992920.png',
        },
        {
            title: 'Healthcare Management',
            category: 'Enterprise Software',
            description: 'Hospital management system streamlining patient records, scheduling, and billing workflows.',
            technologies: ['Angular', 'Java Spring', 'MySQL'],
            image: '/project_healthcare_1766410011063.png',
        },
        {
            title: 'AI Chatbot Platform',
            category: 'AI & ML',
            description: 'Intelligent conversational AI platform with natural language processing capabilities.',
            technologies: ['Python', 'TensorFlow', 'FastAPI'],
            image: '/project_ai_chatbot_1766410031298.png',
        },
        {
            title: 'Project Management Tool',
            category: 'SaaS',
            description: 'Collaborative workspace platform with Kanban boards and real-time team synchronization.',
            technologies: ['Vue.js', 'Laravel', 'Redis'],
            image: '/project_management_tool_1766410047195.png',
        },
    ];

    const [filter, setFilter] = useState('all');
    const categories = ['all', 'Web Development', 'Education Tech', 'Mobile Development', 'Enterprise Software', 'AI & ML', 'SaaS'];

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(project => project.category === filter);

    return (
        <section id="projects" className="projects section-padding">
            <div className="container">
                <div className="section-header animate-fade-in">
                    <h2 className="section-title">Our Projects</h2>
                    <p className="section-subtitle">
                        Showcasing our commitment to excellence through successful software solutions
                    </p>
                </div>

                <div className="projects-filter">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`filter-button ${filter === category ? 'active' : ''}`}
                            onClick={() => setFilter(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Desktop Grid */}
                <div className="projects-grid desktop-only">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={index}
                            className="project-card glass-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="project-image">
                                <img src={project.image} alt={project.title} className="project-screenshot" />
                                <div className="project-overlay">
                                    <button className="view-project-btn">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="10" cy="10" r="7" />
                                            <path d="M10 6v8M6 10h8" />
                                        </svg>
                                        View Details
                                    </button>
                                </div>
                            </div>
                            <div className="project-content">
                                <span className="project-category">{project.category}</span>
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>
                                <div className="project-technologies">
                                    {project.technologies.map((tech, i) => (
                                        <span key={i} className="tech-tag">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile Carousel */}
                <MobileCarousel
                    items={filteredProjects}
                    renderItem={(project, index) => (
                        <div className="project-card glass-card" key={index}>
                            <div className="project-image">
                                <img src={project.image} alt={project.title} className="project-screenshot" />
                            </div>
                            <div className="project-content">
                                <span className="project-category">{project.category}</span>
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>
                                <div className="project-technologies">
                                    {project.technologies.slice(0, 3).map((tech, i) => (
                                        <span key={i} className="tech-tag">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                />
            </div>
        </section>
    );
};

export default Projects;
