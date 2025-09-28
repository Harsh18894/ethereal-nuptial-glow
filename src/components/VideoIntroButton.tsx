import { PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VideoIntroButtonProps {
  onClick: () => void;
  className?: string;
}

export const VideoIntroButton = ({ onClick, className }: VideoIntroButtonProps) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 text-lg text-accent hover:text-rose transition-colors",
        "group", // For hover effects
        className
      )}
    >
      <PlayCircle className="h-7 w-7 group-hover:scale-110 transition-transform" />
      <span className="font-medium">Watch our Intro</span>
    </Button>
  );
};