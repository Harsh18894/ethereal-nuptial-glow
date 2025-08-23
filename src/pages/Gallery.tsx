import { useState, useEffect, useMemo, useCallback } from 'react';
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import bridePortrait from '@/assets/bride-portrait.webp';
import groomPortrait from '@/assets/groom-portrait.webp';
import heroImage from '@/assets/hero-image.webp';
import venueImage from '@/assets/venue-image.png';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Memoize gallery images to prevent unnecessary re-renders
  const galleryImages = useMemo(() => [
    {
      src: heroImage,
      alt: 'Beautiful wedding bouquet',
      category: 'Details'
    },
    {
      src: bridePortrait,
      alt: 'Manisha - Bridal Portrait',
      category: 'Portraits'
    },
    {
      src: groomPortrait,
      alt: 'Harsh - Groom Portrait',
      category: 'Portraits'
    },
    {
      src: gallery1,
      alt: 'Elegant table setting',
      category: 'Reception'
    },
    {
      src: gallery2,
      alt: 'Romantic couple moment',
      category: 'Ceremony'
    },
    {
      src: venueImage,
      alt: 'Garden Manor venue',
      category: 'Venue'
    }
  ], []);

  // Memoize categories
  const categories = useMemo(() => ['All', 'Portraits', 'Ceremony', 'Reception', 'Details', 'Venue'], []);

  // Memoize filtered images
  const filteredImages = useMemo(() =>
    activeCategory === 'All'
      ? galleryImages
      : galleryImages.filter(img => img.category === activeCategory),
    [activeCategory, galleryImages]
  );

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

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);



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

      {/* Category Filter */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-6">
          <div
            className={`flex flex-wrap justify-center gap-4 transition-all duration-1000 delay-300 transform ${isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
              }`}
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => handleCategoryChange(category)}
                className={`rounded-full px-6 transition-all duration-300 ${activeCategory === category
                  ? 'bg-gradient-to-r from-accent to-rose text-white hover:from-accent/90 hover:to-rose/90'
                  : 'hover:bg-accent/10 hover:text-accent'
                  }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className={`group cursor-pointer transition-all duration-700 delay-${index * 100} transform ${isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
                  }`}
                onClick={() => openLightbox(galleryImages.indexOf(image))}
              >
                <div className="relative overflow-hidden rounded-2xl hover-lift">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <span className="inline-block px-3 py-1 bg-accent/80 rounded-full text-sm font-medium">
                      {image.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
            <div className="relative max-w-5xl max-h-[90vh]">
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                className="max-w-full max-h-full object-contain rounded-xl animate-scale-in"
              />

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 glass-effect rounded-xl px-4 py-2">
                <p className="text-white font-medium">{galleryImages[selectedImage].alt}</p>
                <p className="text-white/70 text-sm">{galleryImages[selectedImage].category}</p>
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
};

export default Gallery;