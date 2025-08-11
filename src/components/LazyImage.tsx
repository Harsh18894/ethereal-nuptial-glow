import { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
    src: string;
    alt: string;
    className?: string;
    placeholder?: string;
    onLoad?: () => void;
}

const LazyImage = ({ src, alt, className = '', placeholder, onLoad }: LazyImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: '50px 0px',
                threshold: 0.1
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleLoad = () => {
        setIsLoaded(true);
        onLoad?.();
    };

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Placeholder */}
            {!isLoaded && placeholder && (
                <div
                    className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"
                    style={{ backgroundImage: `url(${placeholder})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
            )}

            {/* Actual Image */}
            {isInView && (
                <img
                    ref={imgRef}
                    src={src}
                    alt={alt}
                    className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'
                        } ${className}`}
                    onLoad={handleLoad}
                    loading="lazy"
                />
            )}
        </div>
    );
};

export default LazyImage;
