import { useEffect, useRef, useState } from 'react';
import { Heart, Sparkles, Home, Diamond } from 'lucide-react';

const TimelineSection = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const timelineEvents = [
    {
      year: '2019',
      title: 'First Meeting',
      description: 'A chance encounter at a coffee shop in downtown Portland. Emma was sketching building designs while James was debugging code on his laptop at the next table.',
      icon: Heart,
      side: 'left'
    },
    {
      year: '2020',
      title: 'First Adventure',
      description: 'Our first trip together to Iceland, where we discovered our shared love for adventure and Emma taught James to appreciate the Northern Lights.',
      icon: Sparkles,
      side: 'right'
    },
    {
      year: '2022',
      title: 'Moving In',
      description: 'We found our perfect home in Napa Valley - a charming cottage that Emma redesigned and James filled with smart home technology.',
      icon: Home,
      side: 'left'
    },
    {
      year: '2023',
      title: 'The Proposal',
      description: 'James proposed during a sunset picnic in our favorite vineyard, with a ring he designed himself and a speech that made Emma cry happy tears.',
      icon: Diamond,
      side: 'right'
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
        <div className="absolute top-32 right-1/4 text-accent/20 animate-float" style={{animationDelay: '0s'}}>
          <Heart className="w-6 h-6" />
        </div>
        <div className="absolute bottom-40 left-1/4 text-rose/20 animate-float" style={{animationDelay: '1s'}}>
          <Heart className="w-4 h-4" />
        </div>
        <div className="absolute top-2/3 right-1/6 text-accent/15 animate-float" style={{animationDelay: '2s'}}>
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
                  className={`relative flex items-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col`}
                >
                  {/* Content Card */}
                  <div
                    className={`w-full md:w-5/12 transition-all duration-1000 transform ${
                      isVisible
                        ? 'translate-x-0 opacity-100'
                        : isLeft
                        ? '-translate-x-8 opacity-0'
                        : 'translate-x-8 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
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
                      className={`w-16 h-16 rounded-full bg-gradient-to-r from-accent to-rose flex items-center justify-center shadow-accent transition-all duration-700 transform ${
                        isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
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