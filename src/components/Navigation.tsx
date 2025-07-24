import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Our Story', href: '/#story' },
    { name: 'Events', href: '/#events' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'RSVP', href: '/#rsvp' },
  ];

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/${sectionId}`;
      return;
    }
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Determine nav background: only show on mobile when menu is open
  const navBg = isMobileMenuOpen ? 'bg-white/80 backdrop-blur-md' : 'bg-transparent';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg} ${isScrolled ? 'glass-effect shadow-soft' : ''
        }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group min-w-0"
          >
            <Heart className="w-6 h-6 text-accent group-hover:text-rose transition-colors duration-300 flex-shrink-0" />
            <span className="font-heading text-xl font-medium text-foreground truncate block min-w-0 max-w-[60vw] sm:max-w-xs md:max-w-sm lg:max-w-md text-sm sm:text-base md:text-xl">
              Harsh & Manisha
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={(e) => {
                  if (item.href.includes('#')) {
                    e.preventDefault();
                    scrollToSection(item.href.substring(1));
                  }
                }}
                className="text-foreground hover:text-accent transition-colors duration-300 font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-rose transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => {
              setIsMobileMenuOpen((prev) => !prev);
            }}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 transition-opacity duration-300 opacity-100">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={(e) => {
                    if (item.href === '/' && location.pathname === '/') {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                    if (item.href.includes('#')) {
                      e.preventDefault();
                      scrollToSection(item.href.substring(1));
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-foreground hover:text-accent transition-colors duration-300 font-medium py-2"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;