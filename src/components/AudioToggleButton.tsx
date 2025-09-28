import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioToggleButtonProps {
  isMuted: boolean;
  isPlaying?: boolean;
  onToggle: () => void;
  className?: string;
}

export const AudioToggleButton = ({ 
  isMuted, 
  isPlaying = false,
  onToggle, 
  className 
}: AudioToggleButtonProps) => {
  // Debug logging for mobile
  console.log('AudioToggleButton render:', { isPlaying, isMuted });

  // Determine which icon to show
  const getIcon = () => {
    if (!isPlaying) {
      return <Play className="h-6 w-6 text-white" />;
    }
    return isMuted ? (
      <VolumeX className="h-6 w-6 text-white" />
    ) : (
      <Volume2 className="h-6 w-6 text-white" />
    );
  };

  const getAriaLabel = () => {
    if (!isPlaying) {
      return "Play background music";
    }
    return isMuted ? "Unmute background music" : "Mute background music";
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      className={cn(
        "fixed bottom-4 right-4 z-50",
        "h-12 w-12 rounded-full",
        "bg-black/20 backdrop-blur-sm",
        "border border-white/20",
        "hover:bg-black/30 hover:scale-105",
        "transition-all duration-200",
        "opacity-70 hover:opacity-100",
        "shadow-lg",
        className
      )}
      aria-label={getAriaLabel()}
    >
      {getIcon()}
    </Button>
  );
};
