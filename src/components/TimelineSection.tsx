import { useEffect, useRef, useState } from 'react';
import { Heart, Sparkles, Home, Diamond } from 'lucide-react';
import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import bridePortrait from '@/assets/bride-portrait.jpg';
import groomPortrait from '@/assets/groom-portrait.jpg';

const TimelineSection = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const timelineEvents = [
    {
      year: '2024',
      title: 'First Meeting',
      description: 'Our families insisted on us meeting and so we did at Haldirams, Raj Nagar. She was hesitant, I was shy, but the persistent nudges from our elders brought us together. Over shared Fries and Krushers, a quiet connection formed—one that would grow into something truly special.',
      icon: Heart,
      side: 'left',
      image: gallery1
    },
    {
      year: '2024',
      title: 'First Date',
      description: 'Our first official date was at IHC Delhi. The food was nothing to write home about, but we barely noticed as we talked for hours, lost in conversation. Later, we headed to Café Tesu for another meal, where the taste was better, but the company was what truly made the evening unforgettable.',
      icon: Sparkles,
      side: 'right',
      image: gallery2
    },
    {
      year: '2025',
      title: 'Rokafied',
      description: 'After dating, we decided to take the next step and get rokafied. Surrounded by close family and laughter, promises were made over sweets and warm smiles. It wasn’t just a ritual—it was the beginning of a lifetime pact, sealed with love and the joy of togetherness',
      icon: Home,
      side: 'left',
      image: bridePortrait
    },
    {
      year: '2025',
      title: 'The Engagement',
      description: 'On a hot March afternoon at Eleven-to-Eleven, we had our engagement. The air buzzed with excitement as rings were exchanged and smiles shared. Surrounded by friends and family, the moment felt both intimate and grand—a beautiful promise made, marking the start of our forever journey.',
      icon: Diamond,
      side: 'right',
      image: groomPortrait
    }
  ];

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => [...prev, index]);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  return (
    <section id="story" ref={sectionRef} className="py-20 bg-background relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-accent"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-rose"></div>
      </div>

      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 right-1/4 text-accent/20 animate-float" style={{ animationDelay: '0s' }}>
          <Heart className="w-6 h-6" />
        </div>
        <div className="absolute bottom-40 left-1/4 text-rose/20 animate-float" style={{ animationDelay: '1s' }}>
          <Heart className="w-4 h-4" />
        </div>
        <div className="absolute top-2/3 right-1/6 text-accent/15 animate-float" style={{ animationDelay: '2s' }}>
          <Sparkles className="w-5 h-5" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-heading text-4xl md:text-5xl font-light text-foreground mb-4">
            Our Love Story
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every love story is beautiful, but ours is our favorite
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-rose mx-auto mt-6"></div>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-accent via-rose to-accent hidden md:block"></div>

          {/* Timeline Items */}
          <div className="space-y-16">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              const isVisible = visibleItems.includes(index);
              const isLeft = event.side === 'left';

              return (
                <div
                  key={index}
                  ref={el => itemRefs.current[index] = el}
                  className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    } flex-col`}
                >
                  {/* Content Card */}
                  <div
                    className={`w-full md:w-5/12 transition-all duration-1000 transform ${isVisible
                      ? 'translate-x-0 opacity-100'
                      : isLeft
                        ? '-translate-x-8 opacity-0'
                        : 'translate-x-8 opacity-0'
                      }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    {/* Timeline Event Image */}
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-40 object-cover rounded-xl mb-4 shadow-md border border-border/20"
                      style={{ objectPosition: 'center' }}
                    />
                    <div className="glass-effect rounded-2xl p-8 hover-lift">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent to-rose flex items-center justify-center mr-4">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-heading text-2xl font-medium text-foreground">
                            {event.title}
                          </h3>
                          <p className="text-accent font-medium">{event.year}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Icon (Desktop) */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-r from-accent to-rose flex items-center justify-center shadow-accent transition-all duration-700 transform ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                        }`}
                      style={{ transitionDelay: `${index * 200 + 300}ms` }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Year Badge (Mobile) */}
                  <div className="md:hidden mb-4">
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-accent to-rose text-white rounded-full font-medium">
                      {event.year}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;