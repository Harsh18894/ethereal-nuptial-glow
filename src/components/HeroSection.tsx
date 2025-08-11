import { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImageDesktop from '@/assets/hero-image.jpg';
import heroImageMobile from '@/assets/hero-image-alt.jpg';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsVisible(true);
    // On mobile, scroll by 1px to hide browser search bar after load
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setTimeout(() => {
        window.scrollTo(0, 1);
      }, 300);
    }
  }, []);

  // Format date as '8th November, 2025'
  const weddingDate = new Date('2025-11-08T18:00:00');
  const day = weddingDate.getDate();
  const daySuffix = (d) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  const formattedDate = `${day}${daySuffix(day)} ${weddingDate.toLocaleString('en-US', { month: 'long' })}, ${weddingDate.getFullYear()}`;

  const scrollToRSVP = () => {
    const element = document.querySelector('#rsvp');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={`relative min-h-screen flex ${isMobile ? 'flex-col' : 'flex-row'} items-center justify-center overflow-hidden bg-gradient-to-br from-[#f7e7d3] via-[#fbeee6] to-[#e6d3c2]`}>
      {/* Desktop: Left solid color block with date, names, nav; right: image */}
      {!isMobile && (
        <>
          {/* Left block */}
          <div className="flex-1 flex flex-col justify-between h-screen bg-[#e6d3c2] px-16 py-12" style={{ minWidth: 0 }}>
            {/* Navigation */}
            <div className="flex space-x-10 text-sm tracking-widest text-[#444] font-light mb-12">
              <a href="/" className="hover:underline">HOME</a>
              <a href="/#story" className="hover:underline" onClick={e => { e.preventDefault(); const el = document.getElementById('story'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}>OUR STORY</a>
              <a href="/#events" className="hover:underline" onClick={e => { e.preventDefault(); const el = document.getElementById('events'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}>EVENTS</a>
              <a href="/gallery" className="hover:underline">GALLERY</a>
              <a href="/#rsvp" className="hover:underline" onClick={e => { e.preventDefault(); const el = document.getElementById('rsvp'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}>RSVP</a>
            </div>
            {/* Names + Date + RSVP stamp */}
            <div className="flex flex-col items-start space-y-4 mb-4">
              <div className="text tracking-widest text-[#444] font-medium">{formattedDate}</div>
              <div className="flex items-center space-x-8">
                <h1 className="font-heading text-6xl lg:text-7xl xl:text-8xl font-light text-foreground" style={{ color: '#3d2c1e' }}>
                  Harsh &<br />Manisha
                </h1>
              </div>
            </div>
          </div>
          {/* Right block: image */}
          <div className="flex-1 relative h-screen flex items-center justify-center">
            <img
              src={heroImageDesktop}
              alt="Wedding Hero"
              className="object-cover w-full h-full"
              style={{ minHeight: '100vh', maxHeight: '100vh' }}
            />
          </div>
        </>
      )}
      {/* Mobile: Stack everything vertically, RSVP next to names */}
      {isMobile && (
        <>
          <div className={`relative flex-1 h-full w-full order-first`} style={{ minHeight: '60vh' }}>
            <img
              src={heroImageMobile}
              alt="Wedding Hero"
              className="object-cover w-full h-full absolute inset-0 z-0"
              style={{ maxHeight: '100vh', minHeight: '60vh', borderRadius: 0, background: 'rgba(255, 245, 230, 0.7)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#f7e7d3]/40 via-[#fbeee6]/60 to-[#e6d3c2]/80 pointer-events-none"></div>
            {/* Names and date pinned to bottom */}
            <div className="absolute bottom-0 left-0 w-full flex flex-col items-center justify-end pb-8 px-4 z-10">
              <div className="text-base sm:text-lg md:text-xl font-bold tracking-widest text-[#444] mb-2" style={{ fontWeight: 700, fontSize: '1.25rem' }}>{formattedDate}</div>
              <div className="flex items-center justify-center space-x-4 mb-4">
                <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold text-foreground" style={{ color: '#3d2c1e', fontWeight: 800 }}>
                  Harsh & Manisha
                </h1>
              </div>
              {/* Animated arrow and Tap to scroll */}
              <button
                className="flex flex-col items-center mt-2 focus:outline-none"
                style={{ background: 'none', border: 'none' }}
                onClick={() => {
                  const nextSection = document.querySelector('section[id], div[id], main[id], section, div, main');
                  if (nextSection && 'offsetTop' in nextSection) {
                    window.scrollTo({
                      top: (nextSection as HTMLElement).offsetTop + window.innerHeight,
                      behavior: 'smooth',
                    });
                  }
                }}
              >
                <span className="text-xs text-[#444] mb-1">Tap to scroll</span>
                <span className="animate-bounce text-3xl text-[#b6a98c]">↓</span>
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default HeroSection;