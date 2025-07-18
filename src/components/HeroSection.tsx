import { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-image.jpg';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const weddingDate = new Date('2024-09-15T16:00:00');
  const formattedDate = weddingDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const scrollToRSVP = () => {
    const element = document.querySelector('#rsvp');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Wedding Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/60"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div
          className={`transition-all duration-1000 transform ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
        >
          {/* Names */}
          <h1 className="font-heading text-6xl md:text-8xl font-light text-foreground mb-6">
            Emma
            <span className="text-accent mx-4">&</span>
            James
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light italic">
            Together we begin a new chapter
          </p>

          {/* Wedding Details */}
          <div
            className={`glass-effect rounded-2xl p-8 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-300 transform ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
          >
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center space-y-2">
                <Calendar className="w-6 h-6 text-accent" />
                <div>
                  <p className="font-medium text-foreground">{formattedDate}</p>
                  <p className="text-sm text-muted-foreground">Save the Date</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <Clock className="w-6 h-6 text-accent" />
                <div>
                  <p className="font-medium text-foreground">4:00 PM</p>
                  <p className="text-sm text-muted-foreground">Ceremony</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <MapPin className="w-6 h-6 text-accent" />
                <div>
                  <p className="font-medium text-foreground">Garden Manor</p>
                  <p className="text-sm text-muted-foreground">Napa Valley, CA</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div
            className={`transition-all duration-1000 delay-500 transform ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
          >
            <Button
              onClick={scrollToRSVP}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-full font-medium transition-all duration-300 hover-lift"
            >
              RSVP Now
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-1 h-12 bg-gradient-to-b from-accent to-transparent rounded-full"></div>
      </div>
    </section>
  );
};

export default HeroSection;