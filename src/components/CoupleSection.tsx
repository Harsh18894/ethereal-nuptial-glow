import { useEffect, useRef, useState } from 'react';
import bridePortrait from '@/assets/bride-portrait.jpg';
import groomPortrait from '@/assets/groom-portrait.jpg';

const CoupleSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
                <img
                  src={bridePortrait}
                  alt="Emma - The Bride"
                  className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
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
              A passionate architect with a love for sustainable design and travel.
              Emma brings creativity and warmth to everything she touches, from designing
              eco-friendly homes to planning the perfect dinner party for friends.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">Architecture</span>
              <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">Yoga</span>
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
                <img
                  src={groomPortrait}
                  alt="James - The Groom"
                  className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
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
              A software engineer turned entrepreneur with a passion for music and cooking.
              James combines analytical thinking with creative expression, whether he's
              building the next great app or perfecting his grandmother's pasta recipe.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">Technology</span>
              <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">Music</span>
              <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">Cooking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoupleSection;