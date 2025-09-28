import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface VideoIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  onVideoStart?: () => void;
  onVideoEnd?: () => void;
}

export const VideoIntroModal = ({
  isOpen,
  onClose,
  videoSrc,
  onVideoStart,
  onVideoEnd,
}: VideoIntroModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Attempt to play video when modal opens
      if (videoRef.current) {
        videoRef.current.play().then(() => {
          onVideoStart?.();
        }).catch(error => {
          console.error('Error attempting to play video:', error);
        });
      }
    } else {
      // Pause and reset video when modal closes
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        onVideoEnd?.();
      }
    }
  }, [isOpen, onVideoStart, onVideoEnd]);

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 border-none bg-transparent shadow-none">
        <div className="relative w-full h-full aspect-video bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            src={videoSrc}
            controls
            autoPlay
            playsInline
            webkit-playsinline
            className="w-full h-full object-contain"
            onEnded={handleClose} // Close modal when video ends
          />
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
            aria-label="Close video"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};