import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import CoupleSection from '@/components/CoupleSection';
import TimelineSection from '@/components/TimelineSection';
import RSVPSection from '@/components/RSVPSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <CoupleSection />
      <TimelineSection />
      <RSVPSection />
    </div>
  );
};

export default Index;
