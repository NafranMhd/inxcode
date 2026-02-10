import { useEffect, useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const ParticleBackground = () => {
    const particlesInit = useCallback(async (engine) => {
        console.log('Initializing tsParticles...');
        await loadSlim(engine);
        console.log('tsParticles loaded successfully');
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        console.log('Particles container loaded:', container);
    }, []);

    useEffect(() => {
        console.log('ParticleBackground component mounted');
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                fullScreen: {
                    enable: true,
                    zIndex: 1,
                },
                background: {
                    color: {
                        value: 'transparent',
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: 'push',
                        },
                        onHover: {
                            enable: true,
                            mode: ['grab', 'bubble'],
                        },
                        resize: {
                            enable: true,
                            delay: 0.5,
                        },
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        grab: {
                            distance: 200,
                            links: {
                                opacity: 1,
                            },
                        },
                        bubble: {
                            distance: 250,
                            size: 8,
                            duration: 2,
                        },
                    },
                },
                particles: {
                    color: {
                        value: '#0ea5e9',
                    },
                    links: {
                        color: '#0ea5e9',
                        distance: 150,
                        enable: true,
                        opacity: 0.6,
                        width: 2,
                    },
                    move: {
                        direction: 'none',
                        enable: true,
                        outModes: {
                            default: 'bounce',
                        },
                        random: true,
                        speed: 2,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 120,
                    },
                    opacity: {
                        value: { min: 0.3, max: 0.8 },
                        animation: {
                            enable: true,
                            speed: 1,
                            minimumValue: 0.3,
                            sync: false,
                        },
                    },
                    shape: {
                        type: 'circle',
                    },
                    size: {
                        value: { min: 2, max: 6 },
                        animation: {
                            enable: true,
                            speed: 3,
                            minimumValue: 2,
                            sync: false,
                        },
                    },
                },
                detectRetina: true,
                pauseOnBlur: false,
                pauseOnOutsideViewport: false,
            }}
        />
    );
};

export default ParticleBackground;
