import { useEffect, useRef, useState } from 'react';
import { Calendar, Clock, MapPin, Flower2, Crown, Heart, Sparkles } from 'lucide-react';

const EventsSection = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const events = [
    {
      title: 'Haldi',
      description: 'A beautiful ceremony where turmeric paste is applied to the bride and groom, bringing blessings for a bright future together.',
      date: 'September 13, 2024',
      time: '10:00 AM',
      venue: 'Garden Manor Courtyard',
      icon: Flower2,
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      title: 'Baraat',
      description: 'The joyous procession where the groom arrives with family and friends, celebrating with music and dance.',
      date: 'September 15, 2024',
      time: '3:00 PM',
      venue: 'Garden Manor Entrance',
      icon: Crown,
      gradient: 'from-accent to-rose'
    },
    {
      title: 'Wedding',
      description: 'The sacred ceremony where Emma and James exchange vows and begin their journey as one, surrounded by loved ones.',
      date: 'September 15, 2024',
      time: '4:00 PM',
      venue: 'Garden Manor Main Hall',
      icon: Heart,
      gradient: 'from-rose to-pink-500'
    },
    {
      title: 'Phere',
      description: 'The seven sacred circles around the holy fire, each representing a vow and promise for their married life.',
      date: 'September 15, 2024',
      time: '5:00 PM',
      venue: 'Garden Manor Sacred Space',
      icon: Sparkles,
      gradient: 'from-purple-500 to-accent'
    }
  ];

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => [...prev, index]);
          }
        },
        { threshold: 0.2 }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  return (
    <section id="events" ref={sectionRef} className="py-20 bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-20 w-40 h-40 rounded-full bg-rose"></div>
        <div className="absolute bottom-10 left-20 w-32 h-32 rounded-full bg-accent"></div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 text-accent/10 animate-float" style={{animationDelay: '0s'}}>
          <Flower2 className="w-8 h-8" />
        </div>
        <div className="absolute bottom-32 right-1/3 text-rose/10 animate-float" style={{animationDelay: '1.5s'}}>
          <Crown className="w-6 h-6" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-light text-foreground mb-4">
            Wedding Events
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join us for these beautiful ceremonies as we celebrate our union with tradition, love, and joy
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-rose mx-auto mt-6"></div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {events.map((event, index) => {
            const Icon = event.icon;
            const isVisible = visibleCards.includes(index);

            return (
              <div
                key={index}
                ref={el => cardRefs.current[index] = el}
                className={`transition-all duration-1000 transform ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="glass-effect rounded-2xl overflow-hidden hover-lift group">
                  {/* Event Header */}
                  <div className={`h-24 bg-gradient-to-r ${event.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10 h-full flex items-center justify-between px-8">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-heading text-2xl font-medium text-white">
                          {event.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-8">
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {event.description}
                    </p>

                    {/* Event Details */}
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 text-accent mr-3" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 text-accent mr-3" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-accent mr-3" />
                        <span>{event.venue}</span>
                      </div>
                    </div>

                    {/* Decorative Border */}
                    <div className={`mt-6 h-1 bg-gradient-to-r ${event.gradient} rounded-full opacity-60`}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground italic max-w-2xl mx-auto">
            Each ceremony holds special significance in our journey together. 
            We invite you to be part of these sacred and joyous moments.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;