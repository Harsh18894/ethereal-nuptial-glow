import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSectionDebug';
import CoupleSection from '@/components/CoupleSection';
import TimelineSection from '@/components/TimelineSection';
import EventsSection from '@/components/EventsSection';
import RSVPSection from '@/components/RSVPSection';
import { useEffect, useState } from 'react';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
}

const Index = () => {
  const isMobile = useIsMobile();
  return (
    <div className="min-h-screen bg-background">
      {isMobile && <Navigation />}
      <HeroSection />
      <CoupleSection />
      <TimelineSection />
      <EventsSection />
      <RSVPSection />
    </div>
  );
};

export default Index;
