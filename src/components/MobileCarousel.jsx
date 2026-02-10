import { useState, useEffect, useCallback } from 'react';
import './MobileCarousel.css';

const MobileCarousel = ({ items, renderItem }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const minSwipeDistance = 50;

    const goToNext = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === items.length - 1 ? 0 : prevIndex + 1
        );
    }, [items.length]);

    const goToPrev = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? items.length - 1 : prevIndex - 1
        );
    }, [items.length]);

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            goToNext();
        } else if (isRightSwipe) {
            goToPrev();
        }
    };

    useEffect(() => {
        if (currentIndex >= items.length) {
            setCurrentIndex(0);
        }
    }, [items.length, currentIndex]);

    return (
        <div className="mobile-carousel-wrapper">
            <div className="mobile-carousel">
                <div
                    className="carousel-viewport"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    {items.map((item, index) => {
                        const offset = index - currentIndex;
                        const isActive = index === currentIndex;

                        return (
                            <div
                                key={index}
                                className={`carousel-item ${isActive ? 'active' : ''}`}
                                style={{
                                    '--offset': offset,
                                    transform: `
                                        translateX(${offset * 100}%)
                                        translateZ(${isActive ? '0px' : '-100px'})
                                        scale(${isActive ? 1 : 0.85})
                                        rotateY(${offset * -15}deg)
                                    `,
                                    opacity: Math.abs(offset) > 1 ? 0 : 1 - Math.abs(offset) * 0.5,
                                    zIndex: isActive ? 10 : 10 - Math.abs(offset),
                                }}
                            >
                                {renderItem(item, index)}
                            </div>
                        );
                    })}
                </div>

                <button
                    className="carousel-nav carousel-nav-prev"
                    onClick={goToPrev}
                    aria-label="Previous"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                <button
                    className="carousel-nav carousel-nav-next"
                    onClick={goToNext}
                    aria-label="Next"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>

            <div className="carousel-pagination">
                {items.map((_, index) => (
                    <button
                        key={index}
                        className={`pagination-dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default MobileCarousel;
