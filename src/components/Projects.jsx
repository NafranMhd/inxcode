import { useState } from 'react';
import MobileCarousel from './MobileCarousel';
import './Projects.css';

const Projects = () => {
    const projects = [
        {
            title: 'E-Commerce Platform',
            category: 'Web Development',
            description: 'A full-featured e-commerce solution with inventory management, payment integration, and analytics dashboard.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            image: '/project_ecommerce_1766409949007.png',
            stats: { users: '10K+', revenue: '₹50M+' },
        },
        {
            title: 'Learning Management System',
            category: 'Education Tech',
            description: 'Comprehensive LMS platform for Inxcode Academy with video streaming, assessments, and progress tracking.',
            technologies: ['Next.js', 'PostgreSQL', 'AWS', 'WebRTC'],
            image: '/project_lms_1766409972210.png',
            stats: { students: '5K+', courses: '100+' },
        },
        {
            title: 'Mobile Banking App',
            category: 'Mobile Development',
            description: 'Secure mobile banking application with biometric authentication, UPI payments, and real-time notifications.',
            technologies: ['React Native', 'Firebase', 'Node.js', 'MongoDB'],
            image: '/project_mobile_banking_1766409992920.png',
            stats: { downloads: '50K+', rating: '4.8/5' },
        },
        {
            title: 'Healthcare Management',
            category: 'Enterprise Software',
            description: 'Hospital management system with patient records, appointment scheduling, and billing automation.',
            technologies: ['Angular', 'Java Spring', 'MySQL', 'Docker'],
            image: '/project_healthcare_1766410011063.png',
            stats: { hospitals: '25+', patients: '100K+' },
        },
        {
            title: 'AI Chatbot Platform',
            category: 'AI & ML',
            description: 'Intelligent chatbot platform with natural language processing and multi-channel support.',
            technologies: ['Python', 'TensorFlow', 'FastAPI', 'Redis'],
            image: '/project_ai_chatbot_1766410031298.png',
            stats: { conversations: '1M+', accuracy: '95%' },
        },
        {
            title: 'Project Management Tool',
            category: 'SaaS',
            description: 'Collaborative project management platform with Kanban boards, time tracking, and team collaboration.',
            technologies: ['Vue.js', 'Laravel', 'PostgreSQL', 'Redis'],
            image: '/project_management_tool_1766410047195.png',
            stats: { teams: '500+', projects: '10K+' },
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
                                <div className="project-stats">
                                    {Object.entries(project.stats).map(([key, value]) => (
                                        <div key={key} className="stat">
                                            <span className="stat-value">{value}</span>
                                            <span className="stat-key">{key}</span>
                                        </div>
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
                                    {project.technologies.map((tech, i) => (
                                        <span key={i} className="tech-tag">{tech}</span>
                                    ))}
                                </div>
                                <div className="project-stats">
                                    {Object.entries(project.stats).map(([key, value]) => (
                                        <div key={key} className="stat">
                                            <span className="stat-value">{value}</span>
                                            <span className="stat-key">{key}</span>
                                        </div>
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
