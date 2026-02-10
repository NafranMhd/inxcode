import { useState } from 'react';
import MobileCarousel from './MobileCarousel';
import './Services.css';

const Services = () => {
    const [activeTab, setActiveTab] = useState('software');

    const softwareServices = [
        {
            icon: '💻',
            title: 'Custom Software Development',
            description: 'Tailored software solutions designed to meet your unique business requirements and drive digital transformation.',
            features: ['Requirements Analysis', 'Agile Development', 'Quality Assurance', 'Ongoing Support']
        },
        {
            icon: '📱',
            title: 'Mobile App Development',
            description: 'Native and cross-platform mobile applications that deliver exceptional user experiences on iOS and Android.',
            features: ['iOS & Android', 'React Native', 'Flutter', 'App Store Publishing']
        },
        {
            icon: '🌐',
            title: 'Web Development',
            description: 'Modern, responsive websites and web applications built with cutting-edge technologies and best practices.',
            features: ['React & Next.js', 'Responsive Design', 'SEO Optimization', 'Performance Tuning']
        },
        {
            icon: '☁️',
            title: 'Cloud Solutions',
            description: 'Scalable cloud infrastructure, migration services, and cloud-native application development.',
            features: ['AWS & Azure', 'Cloud Migration', 'DevOps', 'Serverless']
        },
        {
            icon: '🔒',
            title: 'IT Security & Support',
            description: 'Comprehensive cybersecurity solutions and reliable technical support to protect your digital assets.',
            features: ['Security Audits', '24/7 Support', 'Data Protection', 'Compliance']
        },
        {
            icon: '🤖',
            title: 'AI & Machine Learning',
            description: 'Intelligent automation and data-driven insights powered by artificial intelligence and ML algorithms.',
            features: ['Predictive Analytics', 'NLP', 'Computer Vision', 'ML Models']
        },
    ];

    const educationServices = [
        {
            icon: '🎓',
            title: 'Professional Training Programs',
            description: 'Industry-focused courses in software development, DevOps, cloud computing, and emerging technologies.',
            features: ['Live Sessions', 'Hands-on Projects', 'Industry Experts', 'Certificate']
        },
        {
            icon: '👨‍💻',
            title: 'Coding Bootcamps',
            description: 'Intensive, hands-on training programs that transform beginners into job-ready developers in weeks.',
            features: ['12-Week Program', 'Job Placement', 'Mentorship', 'Portfolio Building']
        },
        {
            icon: '📖',
            title: 'Online Courses & Tutorials',
            description: 'Self-paced online learning resources covering programming, web development, and IT fundamentals.',
            features: ['Video Lessons', 'Quizzes', 'Code Labs', 'Lifetime Access']
        },
        {
            icon: '🏫',
            title: 'University Partnerships',
            description: 'Collaborative programs with educational institutions to bridge the gap between academia and industry.',
            features: ['Guest Lectures', 'Internships', 'Research Projects', 'Industry Insights']
        },
        {
            icon: '🎯',
            title: 'Corporate Training',
            description: 'Customized training solutions to upskill your team and align with your organization\'s goals.',
            features: ['Custom Curriculum', 'On-site Training', 'Progress Tracking', 'Team Building']
        },
        {
            icon: '🏆',
            title: 'Certification Programs',
            description: 'Industry-recognized certifications that validate skills and enhance career prospects.',
            features: ['Exam Prep', 'Practice Tests', 'Study Materials', 'Global Recognition']
        },
    ];

    const currentServices = activeTab === 'software' ? softwareServices : educationServices;

    return (
        <section id="services" className="services section-padding">
            <div className="container">
                <div className="section-header animate-fade-in">
                    <h2 className="section-title">Our Services</h2>
                    <p className="section-subtitle">
                        Comprehensive solutions spanning software innovation and educational excellence
                    </p>
                </div>

                <div className="services-tabs">
                    <button
                        className={`tab-button ${activeTab === 'software' ? 'active' : ''}`}
                        onClick={() => setActiveTab('software')}
                    >
                        <span className="tab-icon">🚀</span>
                        <span className="tab-label">Software Development & IT Services</span>
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'education' ? 'active' : ''}`}
                        onClick={() => setActiveTab('education')}
                    >
                        <span className="tab-icon">📚</span>
                        <span className="tab-label">Training & Education</span>
                    </button>
                </div>

                {/* Desktop Grid */}
                <div className="services-grid desktop-only">
                    {currentServices.map((service, index) => (
                        <div
                            key={index}
                            className="service-card glass-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="service-icon">{service.icon}</div>
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-description">{service.description}</p>
                            <ul className="service-features">
                                {service.features.map((feature, i) => (
                                    <li key={i}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M16.667 5L7.5 14.167 3.333 10" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Mobile Carousel */}
                <MobileCarousel
                    items={currentServices}
                    renderItem={(service, index) => (
                        <div className="service-card glass-card" key={index}>
                            <div className="service-icon">{service.icon}</div>
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-description">{service.description}</p>
                            <ul className="service-features">
                                {service.features.map((feature, i) => (
                                    <li key={i}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M16.667 5L7.5 14.167 3.333 10" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                />

                <div className="services-cta">
                    <div className="cta-card glass-card">
                        <h3>Ready to Transform Your Ideas into Reality?</h3>
                        <p>Let&apos;s discuss how Inxcode can help you achieve your goals through innovative software solutions or comprehensive training programs.</p>
                        <button className="btn-primary" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                            Start Your Journey
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
