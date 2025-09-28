import { useState, useEffect, useCallback, memo } from 'react';
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import { usePerformanceMonitor } from '@/hooks/usePerformance';
import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import bridePortrait from '@/assets/bride-portrait.webp';
import groomPortrait from '@/assets/groom-portrait.webp';
import heroImage from '@/assets/hero-image.webp';
import engagementImage from '@/assets/engagement.webp';
import firstDateImage from '@/assets/first-date.webp';
import firstMeetImage from '@/assets/first-meet.webp';
import rokafiedImage from '@/assets/rokafied.webp';
import baraatEventImage from '@/assets/baraat-event.jpg';
import haldiEventImage from '@/assets/haldi-event.webp';
import phereEventImage from '@/assets/phere-event.jpg';
import weddingEventImage from '@/assets/wedding-event.jpg';

interface GalleryImage {
  src: string;
  alt: string;
  objectPosition?: string;
}

const Gallery = memo(() => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Performance monitoring
  usePerformanceMonitor('Gallery');

  useEffect(() => {
    setIsVisible(true);
    loadGalleryImages();
    
    // Preload existing website images immediately for faster loading
    preloadExistingImages();
  }, []);

  // Preload existing website images immediately
  const preloadExistingImages = useCallback(() => {
    const existingImages = [
      heroImage,
      bridePortrait,
      groomPortrait,
      engagementImage,
      firstDateImage,
      firstMeetImage,
      rokafiedImage,
      baraatEventImage,
      haldiEventImage,
      phereEventImage,
      weddingEventImage,
      gallery1,
      gallery2
    ];

    existingImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const loadGalleryImages = useCallback(async () => {
    try {
      setLoading(true);
      
      const images: GalleryImage[] = [
        {
          src: heroImage,
          alt: 'The couple - Hero image',
          objectPosition: 'top center'
        },
        {
          src: bridePortrait,
          alt: 'Manisha - Bridal Portrait',
          objectPosition: 'center top'
        },
        {
          src: groomPortrait,
          alt: 'Harsh - Groom Portrait',
          objectPosition: 'center top'
        },
        {
          src: engagementImage,
          alt: 'Engagement ceremony',
          objectPosition: 'center'
        },
        {
          src: firstDateImage,
          alt: 'First date memories',
          objectPosition: 'center'
        },
        {
          src: firstMeetImage,
          alt: 'First meeting',
          objectPosition: 'center'
        },
        {
          src: rokafiedImage,
          alt: 'Rokafied ceremony',
          objectPosition: 'center'
        }
      ];
      
      const galleryPhotos = Array.from({ length: 25 }, (_, i) => ({
        name: `photo-${i + 1}.webp`,
        objectPosition: i === 1 || i === 2 ? 'top' : i === 14 ? 'center top' : 'center'
      }));

      const existingPhotos = await Promise.all(
        galleryPhotos.map(async (photo, index) => {
          return new Promise<GalleryImage | null>((resolve) => {
            const img = new Image();
            img.onload = () => {
              resolve({
                src: `/gallery-photos/${photo.name}`,
                alt: `Wedding Photo ${index + 1}`,
                objectPosition: photo.objectPosition
              });
            };
            img.onerror = () => resolve(null);
            img.src = `/gallery-photos/${photo.name}`;
          });
        })
      );

      const validPhotos = existingPhotos.filter((photo): photo is GalleryImage => photo !== null);
      images.push(...validPhotos);
      
      setGalleryImages(images);
      setLoading(false);
      
    } catch (error) {
      console.error('Error loading gallery images:', error);
      setLoading(false);
    }
  }, []);

  const openLightbox = useCallback((index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  }, []);

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    if (selectedImage === null) return;

    const newIndex = direction === 'next'
      ? (selectedImage + 1) % galleryImages.length
      : (selectedImage - 1 + galleryImages.length) % galleryImages.length;

    setSelectedImage(newIndex);
  }, [selectedImage, galleryImages.length]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImage === null) return;

      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          navigateImage('prev');
          break;
        case 'ArrowRight':
          navigateImage('next');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, closeLightbox, navigateImage]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-secondary/20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div
              className={`transition-all duration-1000 transform ${isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
                }`}
            >
              <Link
                to="/"
                className="inline-flex items-center text-accent hover:text-rose transition-colors duration-300 mb-6 group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
                Back to Home
              </Link>

              <h1 className="font-heading text-4xl md:text-6xl font-light text-foreground mb-4">
                Our Gallery
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Capturing the moments that matter most
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-accent to-rose mx-auto mt-6"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading gallery images...</p>
            </div>
          ) : galleryImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading gallery images...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className={`group cursor-pointer transition-all duration-700 delay-${index * 100} transform ${isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                    }`}
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative overflow-hidden rounded-2xl hover-lift">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ objectPosition: image.objectPosition || 'center' }}
                      loading="eager"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-lg z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-6">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 bg-primary/20 hover:bg-primary/30 text-white"
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateImage('prev')}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 bg-primary/20 hover:bg-primary/30 text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateImage('next')}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 bg-primary/20 hover:bg-primary/30 text-white"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Image */}
            <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                className="max-w-full max-h-full object-contain rounded-xl"
                style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
              />

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 glass-effect rounded-xl px-4 py-2">
                <p className="text-white font-medium">{galleryImages[selectedImage].alt}</p>
              </div>
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 glass-effect rounded-full px-4 py-2">
              <span className="text-white text-sm font-medium">
                {selectedImage + 1} / {galleryImages.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default Gallery;

Gallery.displayName = 'Gallery';