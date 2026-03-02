import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

function App() {
    const [isAdmin, setIsAdmin] = useState(window.location.hash === '#admin');

    useEffect(() => {
        const handleHash = () => setIsAdmin(window.location.hash === '#admin');
        window.addEventListener('hashchange', handleHash);
        return () => window.removeEventListener('hashchange', handleHash);
    }, []);

    // Admin Dashboard — separate full-screen page
    if (isAdmin) {
        return <AdminDashboard />;
    }

    // Main Website
    return (
        <ThemeProvider>
            <div className="App">
                <ParticleBackground />
                <Navbar />
                <main>
                    <Hero />
                    <Services />
                    <Projects />
                    <Team />
                    <Contact />
                </main>
                <Footer />
            </div>
        </ThemeProvider>
    );
}

export default App;
