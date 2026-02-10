import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    const navLinks = [
        { name: 'Home', id: 'hero' },
        { name: 'Services', id: 'services' },
        { name: 'Projects', id: 'projects' },
        { name: 'Team', id: 'team' },
        { name: 'Contact', id: 'contact' },
    ];

    return (
        <>
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="navbar-container">
                    {/* Logo */}
                    <div className="navbar-logo" onClick={() => scrollToSection('hero')}>
                        <img src="/logo.png" alt="Inxcode Logo" className="logo-image" />
                        <span className="logo-name">Inxcode</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="navbar-links">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => scrollToSection(link.id)}
                                className="nav-link"
                            >
                                {link.name}
                            </button>
                        ))}
                    </div>

                    {/* Theme Toggle & Mobile Menu Button */}
                    <div className="navbar-actions">
                        <ThemeToggle />
                        <button
                            className="mobile-menu-button"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle mobile menu"
                        >
                            <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
                                <span></span>
                                <span></span>
                            </span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-content">
                    <div className="mobile-menu-header">
                        <div className="navbar-logo">
                            <img src="/logo.png" alt="Inxcode Logo" className="logo-image" />
                            <span className="logo-name">Inxcode</span>
                        </div>
                        <button
                            className="mobile-menu-close"
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-label="Close mobile menu"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                    <div className="mobile-menu-links">
                        {navLinks.map((link, index) => (
                            <button
                                key={link.id}
                                onClick={() => scrollToSection(link.id)}
                                className="mobile-nav-link"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {link.name}
                            </button>
                        ))}
                    </div>
                    <div className="mobile-menu-footer">
                        <p>&copy; 2025 Inxcode Pvt Ltd. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
