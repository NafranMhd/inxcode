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
                        <p className="brands-label">Powered by Modern Technologies</p>
                        <div className="brands-logos">
                            <span className="tech-item">React</span>
                            <span className="tech-item">Node.js</span>
                            <span className="tech-item">Python</span>
                            <span className="tech-item">AWS</span>
                            <span className="tech-item">Flutter</span>
                            <span className="tech-item">Next.js</span>
                            <span className="tech-item">TypeScript</span>
                        </div>
                    </div>
                </div>

                <div className="hero-visual animate-slide-in-right">
                    <div className="hero-3d-scene">
                        {/* Main Interface Window */}
                        <div className="interface-window glass-panel">
                            <div className="window-header">
                                <div className="window-dot red"></div>
                                <div className="window-dot yellow"></div>
                                <div className="window-dot green"></div>
                            </div>
                            <div className="window-content">
                                <div className="code-line w-75"></div>
                                <div className="code-line w-50"></div>
                                <div className="code-line w-90"></div>
                                <div className="code-block">
                                    <div className="code-line w-40"></div>
                                    <div className="code-line w-60"></div>
                                </div>
                                <div className="stats-row">
                                    <div className="stat-pill"></div>
                                    <div className="stat-pill"></div>
                                    <div className="stat-pill"></div>
                                </div>
                            </div>
                        </div>

                        {/* Background Decor Elements */}
                        <div className="interface-layer layer-back"></div>
                        <div className="glow-effect"></div>

                        {/* Floating Status Badges */}
                        <div className="floating-status badge-1">
                            <div className="status-icon icon-rocket">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                                </svg>
                            </div>
                            <div className="status-text">
                                <span className="label">System</span>
                                <span className="value">Deployed</span>
                            </div>
                        </div>

                        <div className="floating-status badge-2">
                            <div className="status-icon icon-lightning">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                                </svg>
                            </div>
                            <div className="status-text">
                                <span className="label">Performance</span>
                                <span className="value">Optimal</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
