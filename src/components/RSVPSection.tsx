import { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Calendar, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import venueImage from '@/assets/venue-image.jpg';

const RSVPSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: '',
    guests: '1',
    dietary: '',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
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
      dietary: '',
      message: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="rsvp" ref={sectionRef} className="py-20 bg-secondary/20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`font-heading text-4xl md:text-5xl font-light text-foreground mb-4 transition-all duration-1000 transform ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
          >
            Join Our Celebration
          </h2>
          <p
            className={`text-xl text-muted-foreground max-w-2xl mx-auto transition-all duration-1000 delay-200 transform ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
          >
            We would be honored to have you celebrate with us on our special day
          </p>
          <div
            className={`w-24 h-1 bg-gradient-to-r from-accent to-rose mx-auto mt-6 transition-all duration-1000 delay-400 transform ${
              isVisible
                ? 'scale-x-100 opacity-100'
                : 'scale-x-0 opacity-0'
            }`}
          ></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* RSVP Form */}
          <div
            className={`transition-all duration-1000 delay-300 transform ${
              isVisible
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
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="attendance">Will you be attending? *</Label>
                  <Select onValueChange={(value) => handleInputChange('attendance', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Please select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Joyfully Accepts</SelectItem>
                      <SelectItem value="no">Regretfully Declines</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Select onValueChange={(value) => handleInputChange('guests', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="1" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Guest</SelectItem>
                      <SelectItem value="2">2 Guests</SelectItem>
                      <SelectItem value="3">3 Guests</SelectItem>
                      <SelectItem value="4">4 Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="dietary">Dietary Restrictions</Label>
                  <Input
                    id="dietary"
                    value={formData.dietary}
                    onChange={(e) => handleInputChange('dietary', e.target.value)}
                    placeholder="Any allergies or dietary preferences?"
                    className="mt-1"
                  />
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
            className={`transition-all duration-1000 delay-500 transform ${
              isVisible
                ? 'translate-x-0 opacity-100'
                : 'translate-x-8 opacity-0'
            }`}
          >
            {/* Venue Image */}
            <div className="relative overflow-hidden rounded-2xl mb-8 hover-lift">
              <img
                src={venueImage}
                alt="Garden Manor Venue"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="font-heading text-xl font-medium">Garden Manor</h4>
                <p className="text-sm opacity-90">Napa Valley, California</p>
              </div>
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
                    <p className="text-muted-foreground">Saturday, September 15th, 2024</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-accent mt-1" />
                  <div>
                    <h4 className="font-medium text-foreground">Schedule</h4>
                    <p className="text-muted-foreground">
                      4:00 PM - Ceremony<br />
                      5:30 PM - Cocktail Hour<br />
                      7:00 PM - Reception
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-accent mt-1" />
                  <div>
                    <h4 className="font-medium text-foreground">Venue</h4>
                    <p className="text-muted-foreground">
                      Garden Manor<br />
                      1234 Vineyard Lane<br />
                      Napa Valley, CA 94558
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Users className="w-6 h-6 text-accent mt-1" />
                  <div>
                    <h4 className="font-medium text-foreground">Dress Code</h4>
                    <p className="text-muted-foreground">Garden Party Elegant</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h4 className="font-medium text-foreground mb-3">Contact</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-accent" />
                      <span className="text-muted-foreground">(555) 123-4567</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-accent" />
                      <span className="text-muted-foreground">emma.james.wedding@email.com</span>
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

export default RSVPSection;