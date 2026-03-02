import { useState } from "react";
import MobileCarousel from "./MobileCarousel";
import "./Services.css";

const Services = () => {
  const [activeTab, setActiveTab] = useState("software");

  const softwareServices = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      title: "Custom Software Development",
      description:
        "Tailored software solutions designed to meet your unique business requirements and drive digital transformation.",
      features: [
        "Requirements Analysis",
        "Agile Development",
        "Quality Assurance",
        "Ongoing Support",
      ],
      color: "#0ea5e9",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      ),
      title: "Mobile App Development",
      description:
        "Native and cross-platform mobile applications that deliver exceptional user experiences on iOS and Android.",
      features: [
        "iOS & Android",
        "React Native",
        "Flutter",
        "App Store Publishing",
      ],
      color: "#8b5cf6",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
      title: "Web Development",
      description:
        "Modern, responsive websites and web applications built with cutting-edge technologies and best practices.",
      features: [
        "React & Next.js",
        "Responsive Design",
        "SEO Optimization",
        "Performance Tuning",
      ],
      color: "#10b981",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      ),
      title: "Cloud Solutions",
      description:
        "Scalable cloud infrastructure, migration services, and cloud-native application development.",
      features: ["AWS & Azure", "Cloud Migration", "DevOps", "Serverless"],
      color: "#06b6d4",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
      title: "IT Security & Support",
      description:
        "Comprehensive cybersecurity solutions and reliable technical support to protect your digital assets.",
      features: [
        "Security Audits",
        "24/7 Support",
        "Data Protection",
        "Compliance",
      ],
      color: "#f59e0b",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
          <path d="M16 14H8a4 4 0 0 0-4 4v2h16v-2a4 4 0 0 0-4-4z" />
          <line x1="9" y1="6" x2="9" y2="6.01" />
          <line x1="15" y1="6" x2="15" y2="6.01" />
        </svg>
      ),
      title: "AI & Machine Learning",
      description:
        "Intelligent automation and data-driven insights powered by artificial intelligence and ML algorithms.",
      features: ["Predictive Analytics", "NLP", "Computer Vision", "ML Models"],
      color: "#ec4899",
    },
  ];

  const educationServices = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
        </svg>
      ),
      title: "Professional Training Programs",
      description:
        "Industry-focused courses in software development, DevOps, cloud computing, and emerging technologies.",
      features: [
        "Live Sessions",
        "Hands-on Projects",
        "Industry Experts",
        "Certificate",
      ],
      color: "#3b82f6",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      title: "Coding Bootcamps",
      description:
        "Intensive, hands-on training programs that transform beginners into job-ready developers in weeks.",
      features: [
        "12-Week Program",
        "Job Placement",
        "Mentorship",
        "Portfolio Building",
      ],
      color: "#14b8a6",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
      title: "Online Courses & Tutorials",
      description:
        "Self-paced online learning resources covering programming, web development, and IT fundamentals.",
      features: ["Video Lessons", "Quizzes", "Code Labs", "Lifetime Access"],
      color: "#a855f7",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: "University Partnerships",
      description:
        "Collaborative programs with educational institutions to bridge the gap between academia and industry.",
      features: [
        "Guest Lectures",
        "Internships",
        "Research Projects",
        "Industry Insights",
      ],
      color: "#f97316",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
      title: "Corporate Training",
      description:
        "Customized training solutions to upskill your team and align with your organization's goals.",
      features: [
        "Custom Curriculum",
        "On-site Training",
        "Progress Tracking",
        "Team Building",
      ],
      color: "#ef4444",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 9 6 9 6s2-2 4.5-2a2.5 2.5 0 0 1 0 5H12" />
          <path d="M12 6v13" />
          <path d="M2 12h20" />
          <path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7" />
        </svg>
      ),
      title: "Certification Programs",
      description:
        "Industry-recognized certifications that validate skills and enhance career prospects.",
      features: [
        "Exam Prep",
        "Practice Tests",
        "Study Materials",
        "Global Recognition",
      ],
      color: "#eab308",
    },
  ];

  const currentServices =
    activeTab === "software" ? softwareServices : educationServices;

  return (
    <section id="services" className="services section-padding">
      <div className="container">
        <div className="section-header animate-fade-in">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Comprehensive solutions spanning software innovation and educational
            excellence
          </p>
        </div>

        <div className="services-tabs">
          <button
            className={`tab-button ${activeTab === "software" ? "active" : ""}`}
            onClick={() => setActiveTab("software")}
          >
            <span className="tab-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></span>
            <span className="tab-label">
              Software Development & IT Services
            </span>
          </button>
          <button
            className={`tab-button ${activeTab === "education" ? "active" : ""}`}
            onClick={() => setActiveTab("education")}
          >
            <span className="tab-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg></span>
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
              <div className="service-icon" style={{ color: service.color, background: `${service.color}15` }}>{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-features">
                {service.features.map((feature, i) => (
                  <span key={i} className="feature-tag">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <MobileCarousel
          items={currentServices}
          renderItem={(service, index) => (
            <div className="service-card glass-card" key={index}>
              <div className="service-icon" style={{ color: service.color, background: `${service.color}15` }}>{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-features">
                {service.features.map((feature, i) => (
                  <span key={i} className="feature-tag">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}
        />

        <div className="services-cta">
          <div className="cta-card glass-card">
            <h3>Ready to Transform Your Ideas into Reality?</h3>
            <p>
              Let&apos;s discuss how Inxcode can help you achieve your goals
              through innovative software solutions or comprehensive training
              programs.
            </p>
            <button
              className="btn-primary"
              onClick={() =>
                document
                  .getElementById("contact")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
