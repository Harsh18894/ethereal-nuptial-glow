import { Dialog, DialogContent } from '@/components/ui/dialog';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RSVPModalProps {
  isOpen: boolean;
  status: 'loading' | 'success' | 'error' | null;
  onClose: () => void;
  errorMessage?: string;
}

const RSVPModal = ({ isOpen, status, onClose, errorMessage }: RSVPModalProps) => {
  const getModalContent = () => {
    switch (status) {
      case 'loading':
        return {
          icon: <Loader2 className="w-16 h-16 text-accent animate-spin" />,
          title: 'Sending RSVP...',
          description: 'Please wait while we process your response.',
          showButton: false
        };
      
      case 'success':
        return {
          icon: <CheckCircle className="w-16 h-16 text-green-500" />,
          title: 'RSVP Received!',
          description: "Thank you for your response. We can't wait to celebrate with you!",
          showButton: true,
          buttonText: 'Close'
        };
      
      case 'error':
        return {
          icon: <XCircle className="w-16 h-16 text-red-500" />,
          title: 'Error',
          description: errorMessage || 'Failed to submit RSVP. Please try again.',
          showButton: true,
          buttonText: 'Try Again'
        };
      
      default:
        return null;
    }
  };

  const content = getModalContent();
  if (!content) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-1 sm:mx-auto">
        <div className="flex flex-col items-center text-center space-y-6 py-6">
          {content.icon}
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">
              {content.title}
            </h3>
            <p className="text-muted-foreground">
              {content.description}
            </p>
          </div>
          
          {content.showButton && (
            <Button 
              onClick={onClose}
              className="w-full bg-gradient-to-r from-accent to-rose hover:from-accent/90 hover:to-rose/90 text-white"
            >
              {content.buttonText}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RSVPModal;
