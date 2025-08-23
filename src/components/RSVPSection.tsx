import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { MapPin, Phone, Mail, Calendar, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { submitRSVP } from '@/lib/rsvpService';
import LazyImage from '@/components/LazyImage';
import venueImage from '@/assets/venue-image.JPG';

const RSVPSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: '',
    guests: '1',
    message: ''
  });
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Submit to Firebase
      await submitRSVP({
        name: formData.name,
        email: formData.email || '',
        attendance: formData.attendance as 'yes' | 'no',
        guests: parseInt(formData.guests),
        message: formData.message || ''
      });

      toast({
        title: "RSVP Received!",
        description: "Thank you for your response. We can't wait to celebrate with you!",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        attendance: '',
        guests: '1',
        message: ''
      });
    } catch (error) {
      console.error('RSVP submission error:', error);
      toast({
        title: "Error",
        description: "Failed to submit RSVP. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  return (
    <section id="rsvp" ref={sectionRef} className="py-20 bg-secondary/20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`font-heading text-4xl md:text-5xl font-light text-foreground mb-4 transition-all duration-1000 transform ${isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
              }`}
          >
            Join Our Celebration
          </h2>
          <p
            className={`text-xl text-muted-foreground max-w-2xl mx-auto transition-all duration-1000 delay-200 transform ${isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
              }`}
          >
            We would be honored to have you celebrate with us on our special day
          </p>
          <div
            className={`w-24 h-1 bg-gradient-to-r from-accent to-rose mx-auto mt-6 transition-all duration-1000 delay-400 transform ${isVisible
              ? 'scale-x-100 opacity-100'
              : 'scale-x-0 opacity-0'
              }`}
          ></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* RSVP Form */}
          <div
            className={`transition-all duration-1000 delay-300 transform ${isVisible
              ? 'translate-x-0 opacity-100'
              : '-translate-x-8 opacity-0'
              }`}
          >
            <div className="glass-effect rounded-2xl p-8">
              <h3 className="font-heading text-2xl font-medium text-foreground mb-6">
                RSVP Form
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="attendance">Will you attend? *</Label>
                    <Select
                      value={formData.attendance}
                      onValueChange={(value) => handleInputChange('attendance', value)}
                      required
                    >
                      <SelectTrigger id="attendance" className="mt-1">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes, I'll be there!</SelectItem>
                        <SelectItem value="no">Sorry, can't make it</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="guests">Number of Guests *</Label>
                    <Input
                      id="guests"
                      type="number"
                      min={1}
                      max={10}
                      value={formData.guests}
                      onChange={(e) => handleInputChange('guests', e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Special Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Share your excitement or well wishes..."
                    className="mt-1"
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-accent to-rose hover:from-accent/90 hover:to-rose/90 text-white py-3 rounded-xl font-medium transition-all duration-300 hover-lift"
                >
                  Send RSVP
                </Button>
              </form>
            </div>
          </div>

          {/* Venue Information */}
          <div
            className={`transition-all duration-1000 delay-500 transform ${isVisible
              ? 'translate-x-0 opacity-100'
              : 'translate-x-8 opacity-0'
              }`}
          >
            {/* Venue Image */}
            <div className="relative overflow-hidden rounded-2xl mb-8 hover-lift">
              <a href="https://maps.app.goo.gl/VQHyEEC31cZENKtd9" target="_blank" rel="noopener noreferrer">
                <LazyImage
                  src={venueImage}
                  alt="Garden Manor Venue"
                  className="w-full h-64 object-cover cursor-pointer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-heading text-xl font-medium">M.R. Golden Dream Farmhouse</h4>
                  <p className="text-sm opacity-90">Wave City, Ghaziabad</p>
                </div>
              </a>
            </div>

            {/* Venue Details */}
            <div className="glass-effect rounded-2xl p-8">
              <h3 className="font-heading text-2xl font-medium text-foreground mb-6">
                Wedding Details
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Calendar className="w-6 h-6 text-accent mt-1" />
                  <div>
                    <h4 className="font-medium text-foreground">Date</h4>
                    <p className="text-muted-foreground">Saturday, November 8th, 2025</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-accent mt-1" />
                  <div>
                    <h4 className="font-medium text-foreground">Schedule</h4>
                    <p className="text-muted-foreground">
                      7:00 PM - Baraat<br />
                      9:00 PM - Jaimala<br />
                      11:00 PM - Wedding
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-accent mt-1" />
                  <div>
                    <h4 className="font-medium text-foreground">
                      <a href="https://maps.app.goo.gl/VQHyEEC31cZENKtd9" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-rose transition-colors">Venue</a>
                    </h4>
                    <p className="text-muted-foreground">
                      <a href="https://maps.app.goo.gl/VQHyEEC31cZENKtd9" target="_blank" rel="noopener noreferrer" className="hover:underline">M.R. Golden Dream Farmhouse<br />Wave City<br />Ghaziabad, U.P.(201001)</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Users className="w-6 h-6 text-accent mt-1" />
                  <div>
                    <h4 className="font-medium text-foreground">Dress Code</h4>
                    <p className="text-muted-foreground">Wedding Elegant</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h4 className="font-medium text-foreground mb-3">Contact</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-accent" />
                      <span className="text-muted-foreground">(+91) 7895-052263</span>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(RSVPSection);