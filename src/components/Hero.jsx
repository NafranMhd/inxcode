import './Hero.css';

const Hero = () => {
    const scrollToContact = () => {
        const element = document.getElementById('contact');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="hero" className="hero">
            <div className="hero-container">
                <div className="hero-content animate-fade-in">
                    <div className="hero-badge">
                        <span className="badge-dot"></span>
                        Software Innovation & IT Education
                    </div>

                    <h1 className="hero-title">
                        Knowledge Creates Ideas,
                        <br />
                        <span className="gradient-text">Inxcode Brings Them to Life</span>
                    </h1>

                    <p className="hero-description">
                        Transforming creativity into scalable, real-world technology solutions while empowering
                        the next generation through cutting-edge education and training programs.
                    </p>

                    <div className="hero-stats">
                        <div className="stat-item">
                            <h3 className="stat-number">100+</h3>
                            <p className="stat-label">Projects Delivered</p>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <h3 className="stat-number">500+</h3>
                            <p className="stat-label">Students Trained</p>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <h3 className="stat-number">50+</h3>
                            <p className="stat-label">Expert Team</p>
                        </div>
                    </div>

                    <div className="hero-cta">
                        <button className="btn-primary" onClick={scrollToContact}>
                            Get Started
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 10h10M10 5l5 5-5 5" />
                            </svg>
                        </button>
                        <button className="btn-secondary" onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}>
                            Explore Services
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M10 5v10M5 10l5 5 5-5" />
                            </svg>
                        </button>
                    </div>

                    <div className="hero-brands">
                        <p className="brands-label">Trusted by leading organizations</p>
                        <div className="brands-logos">
                            <div className="brand-logo">Innovation Labs</div>
                            <div className="brand-logo">Tech Solutions</div>
                            <div className="brand-logo">EduTech Pro</div>
                            <div className="brand-logo">Digital Future</div>
                        </div>
                    </div>
                </div>

                <div className="hero-visual animate-slide-in-right">
                    <div className="floating-card card-1 glass-card">
                        <div className="card-icon">💡</div>
                        <h4>Software Development</h4>
                        <p>Unlimited ideas to execution</p>
                    </div>
                    <div className="floating-card card-2 glass-card">
                        <div className="card-icon">📚</div>
                        <h4>Inxcode Academy</h4>
                        <p>Knowledge for unlimited ideas</p>
                    </div>
                    <div className="floating-card card-3 glass-card">
                        <div className="card-icon">🚀</div>
                        <h4>Innovation & Research</h4>
                        <p>Shaping the future of tech</p>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-indicator">
                <div className="scroll-mouse">
                    <div className="scroll-wheel"></div>
                </div>
                <p>Scroll to explore</p>
            </div>
        </section>
    );
};

export default Hero;
