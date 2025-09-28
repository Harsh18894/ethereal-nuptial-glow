import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, memo, useEffect, useMemo } from "react";
import { useBackgroundMusic } from "@/hooks/useBackgroundMusic";
import { AudioToggleButton } from "@/components/AudioToggleButton";

// Lazy load pages for better performance with preloading
const Index = lazy(() => import("./pages/Index"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Preload critical routes
const preloadRoutes = () => {
  import("./pages/Index");
  import("./pages/Gallery");
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Loading component for Suspense fallback
const LoadingSpinner = memo(() => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
      <p className="mt-4 text-muted-foreground">Loading...</p>
    </div>
  </div>
));

const App = () => {
  useEffect(() => {
    const preloadCriticalImages = () => {
      const criticalImages = [
        '/src/assets/bride-portrait.webp',
        '/src/assets/groom-portrait.webp',
        '/src/assets/hero-image.webp',
        '/src/assets/engagement.webp',
        '/src/assets/first-date.webp',
        '/src/assets/first-meet.webp',
        '/src/assets/rokafied.webp',
        '/src/assets/haldi-event.webp',
        '/src/assets/phere-event.jpg',
        '/src/assets/wedding-event.jpg',
        '/src/assets/baraat-event.jpg',
        '/src/assets/gallery-1.jpg',
        '/src/assets/gallery-2.jpg'
      ];
      
      criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };
    
    preloadCriticalImages();
    setTimeout(preloadRoutes, 1000);
  }, []);

  let audioHook;
  try {
    audioHook = useBackgroundMusic({
      src: "/background-music.mp3",
      volume: 0.3,
      loop: true,
      autoplay: true,
    });
  } catch (error) {
    console.error('Failed to initialize audio hook:', error);
    audioHook = {
      isMuted: false,
      isPlaying: false,
      toggleMute: () => {},
      togglePlayPause: () => {},
      play: () => {},
      isLoaded: true,
      autoplayBlocked: false,
      userInteracted: true,
      handleUserInteraction: () => {},
      error: 'Audio initialization failed'
    };
  }

  const { 
    isMuted, 
    isPlaying,
    toggleMute, 
    togglePlayPause,
    play, 
    isLoaded, 
    autoplayBlocked, 
    userInteracted,
    handleUserInteraction,
    error 
  } = audioHook;

  const handleAppInteraction = (event?: Event) => {
    try {
      console.log('App interaction:', event?.type || 'manual');
      handleUserInteraction();
    } catch (error) {
      console.error('Error in user interaction handler:', error);
    }
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    console.log('Touch start detected');
    handleAppInteraction(event.nativeEvent);
  };

  const handleClick = (event: React.MouseEvent) => {
    console.log('Click detected');
    handleAppInteraction(event.nativeEvent);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    console.log('Key down detected');
    handleAppInteraction(event.nativeEvent);
  };

  // Log errors for debugging
  if (error) {
    console.error('Audio error:', error);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div 
            onClick={handleClick} 
            onTouchStart={handleTouchStart}
            onKeyDown={handleKeyDown}
            style={{ minHeight: '100vh', width: '100%' }}
          >
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/admin" element={<Admin />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </BrowserRouter>
        {/* Audio toggle button - appears on all pages */}
        <AudioToggleButton 
          isMuted={isMuted} 
          isPlaying={isPlaying}
          onToggle={() => {
            try {
              console.log('Audio button clicked - Mobile Debug Info:', {
                isPlaying,
                isMuted,
                isLoaded,
                userInteracted,
                autoplayBlocked
              });
              
              handleUserInteraction(); // Ensure user interaction is registered
              
              // If not playing, use togglePlayPause to start playing
              // If playing, use toggleMute to mute/unmute
              if (!isPlaying) {
                console.log('Button shows Play - attempting to start audio');
                togglePlayPause();
              } else {
                console.log('Button shows Volume - toggling mute state');
                toggleMute();
              }
            } catch (error) {
              console.error('Error in button toggle:', error);
            }
          }} 
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
