import { useEffect, useRef, useState } from 'react';
import bridePortrait from '@/assets/bride-portrait.webp';
import groomPortrait from '@/assets/groom-portrait.webp';
import { VideoIntroModal } from './VideoIntroModal';
import { VideoIntroButton } from './VideoIntroButton';
import { useAudioControl } from '@/hooks/useAudioControl';
import { OptimizedImage } from './OptimizedImage';

const CoupleSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { pauseMusic, resumeMusic } = useAudioControl();

  useEffect(() => {
    // Preload critical images immediately
    [bridePortrait, groomPortrait].forEach(src => {
      const img = new Image();
      img.src = src;
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleVideoStart = () => {
    pauseMusic();
  };

  const handleVideoEnd = () => {
    resumeMusic();
  };

  return (
    <section ref={sectionRef} className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`font-heading text-4xl md:text-5xl font-light text-foreground mb-4 transition-all duration-1000 transform ${isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
              }`}
          >
            Meet the Couple
          </h2>
          <div
            className={`w-24 h-1 bg-gradient-to-r from-accent to-rose mx-auto transition-all duration-1000 delay-200 transform ${isVisible
              ? 'scale-x-100 opacity-100'
              : 'scale-x-0 opacity-0'
              }`}
          ></div>
          
          {/* Video Intro Button */}
          <div
            className={`mt-8 flex justify-center transition-all duration-1000 delay-400 transform ${isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
              }`}
          >
            <VideoIntroButton onClick={() => setIsVideoModalOpen(true)} />
          </div>
        </div>

        {/* Couple Cards */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* Bride */}
          <div
            className={`text-center transition-all duration-1000 delay-300 transform ${isVisible
              ? 'translate-x-0 opacity-100'
              : '-translate-x-8 opacity-0'
              }`}
          >
            <div className="relative group mb-8">
              <div className="relative overflow-hidden rounded-2xl hover-lift">
                <OptimizedImage
                  src={bridePortrait}
                  alt="Manisha - The Bride"
                  objectPosition="center top"
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full glass-effect flex items-center justify-center">
                <span className="text-2xl">💐</span>
              </div>
            </div>

            <h3 className="font-heading text-3xl font-medium text-foreground mb-2">
              Manisha
            </h3>
            <p className="text-accent font-medium mb-4">The Bride</p>
            <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
              A free spirit with a love for travel and photography.
              Manisha brings creativity and warmth to everything she touches, from crunching numbers
              to editing instagram posts.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">Finance</span>
              <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">Travel</span>
              <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">Photography</span>
            </div>
          </div>

          {/* Groom */}
          <div
            className={`text-center transition-all duration-1000 delay-500 transform ${isVisible
              ? 'translate-x-0 opacity-100'
              : 'translate-x-8 opacity-0'
              }`}
          >
            <div className="relative group mb-8">
              <div className="relative overflow-hidden rounded-2xl hover-lift">
                <OptimizedImage
                  src={groomPortrait}
                  alt="Harsh - The Groom"
                  objectPosition="center top"
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full glass-effect flex items-center justify-center">
                <span className="text-2xl">🎸</span>
              </div>
            </div>

            <h3 className="font-heading text-3xl font-medium text-foreground mb-2">
              Harsh
            </h3>
            <p className="text-accent font-medium mb-4">The Groom</p>
            <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
              A romantic with a passion for music, cooking, and technology.
              Harsh combines logical thinking with creative expression, whether he's
              learning the next song or perfecting his pasta recipe.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">Technology</span>
              <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">Music</span>
              <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">Cooking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Intro Modal */}
      <VideoIntroModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoSrc="/intro-video.mp4"
        onVideoStart={handleVideoStart}
        onVideoEnd={handleVideoEnd}
      />
    </section>
  );
};

export default CoupleSection;