import { useEffect, useRef, useState, useCallback } from 'react';

interface UseBackgroundMusicOptions {
  src: string;
  volume?: number;
  loop?: boolean;
  autoplay?: boolean;
}

export const useBackgroundMusic = ({
  src,
  volume = 0.3,
  loop = true,
  autoplay = true,
}: UseBackgroundMusicOptions) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  // Mobile-specific volume control function
  const setMobileVolume = useCallback((newVolume: number, shouldMute: boolean = false) => {
    if (!audioRef.current) return;
    
    console.log('Setting mobile volume:', { newVolume, shouldMute });
    
    // Set both volume and muted properties for mobile compatibility
    audioRef.current.volume = newVolume;
    audioRef.current.muted = shouldMute;
    
    console.log('Mobile volume set - volume:', audioRef.current.volume, 'muted:', audioRef.current.muted);
  }, []);

  // Initialize audio with better error handling
  useEffect(() => {
    try {
      const audio = new Audio();
      audio.src = src;
      audio.volume = volume;
      audio.loop = loop;
      audio.preload = 'auto';
      
      // Important: Set these attributes for better mobile compatibility
      audio.setAttribute('playsinline', 'true');
      audio.setAttribute('webkit-playsinline', 'true');
      audio.setAttribute('controls', 'false');
      audio.setAttribute('muted', 'false');
      
      // Additional mobile-specific attributes
      audio.crossOrigin = 'anonymous';
      audio.load();

      // Event listeners
      const handleCanPlay = () => {
        console.log('Audio can play');
        setIsLoaded(true);
        setError(null);
      };

      const handleError = (e: Event) => {
        console.error('Audio error:', e);
        setError('Failed to load audio file');
        setIsLoaded(false);
      };

      const handlePlay = () => {
        console.log('Audio playing - setting isPlaying to true');
        setIsPlaying(true);
        setAutoplayBlocked(false);
      };

      const handlePause = () => {
        console.log('Audio paused - setting isPlaying to false');
        setIsPlaying(false);
      };

      const handleEnded = () => {
        console.log('Audio ended - setting isPlaying to false');
        setIsPlaying(false);
      };

      const handleVolumeChange = () => {
        // Sync mute state with actual volume
        if (audioRef.current) {
          const currentVolume = audioRef.current.volume;
          const currentMuted = audioRef.current.muted;
          console.log('Volume change detected:', { currentVolume, currentMuted });
          
          // Update state based on actual audio element state
          if (currentMuted || currentVolume === 0) {
            setIsMuted(true);
          } else {
            setIsMuted(false);
          }
        }
      };

      // Mobile-specific event listeners
      const handleLoadStart = () => {
        console.log('Audio load started');
      };

      const handleLoadedData = () => {
        console.log('Audio data loaded');
        setIsLoaded(true);
      };

      const handleCanPlayThrough = () => {
        console.log('Audio can play through');
        setIsLoaded(true);
      };

      audio.addEventListener('canplay', handleCanPlay);
      audio.addEventListener('error', handleError);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('volumechange', handleVolumeChange);
      audio.addEventListener('loadstart', handleLoadStart);
      audio.addEventListener('loadeddata', handleLoadedData);
      audio.addEventListener('canplaythrough', handleCanPlayThrough);

      audioRef.current = audio;

      return () => {
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('error', handleError);
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('volumechange', handleVolumeChange);
        audio.removeEventListener('loadstart', handleLoadStart);
        audio.removeEventListener('loadeddata', handleLoadedData);
        audio.removeEventListener('canplaythrough', handleCanPlayThrough);
        audio.pause();
        audio.src = '';
      };
    } catch (err) {
      console.error('Error initializing audio:', err);
      setError('Failed to initialize audio');
    }
  }, [src, volume, loop]);

  const play = useCallback(async () => {
    if (!audioRef.current || !isLoaded) {
      console.log('Cannot play: audio not loaded or audioRef is null');
      return false;
    }

    try {
      console.log('Attempting to play audio on mobile');
      
      // Mobile-specific: Use mobile volume control for better compatibility
      if (isMuted) {
        console.log('Audio is muted, keeping muted state');
        setMobileVolume(0, true);
      } else {
        console.log('Audio is not muted, setting normal volume');
        setMobileVolume(volume, false);
      }
      
      // Mobile-specific: Play with promise handling
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        console.log('Waiting for play promise...');
        await playPromise;
        console.log('Audio play promise resolved successfully');
        setIsMuted(false);
        return true;
      } else {
        console.log('Audio play promise undefined - older browser');
        setIsMuted(false);
        return true;
      }
    } catch (err) {
      console.error('Play failed with error:', err);
      setAutoplayBlocked(true);
      return false;
    }
  }, [isLoaded, isMuted, volume, setMobileVolume]);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    console.log('Pausing audio');
    audioRef.current.pause();
  }, []);

  // Handle user interaction for autoplay
  const handleUserInteraction = useCallback(() => {
    if (!userInteracted) {
      console.log('User interaction detected');
      setUserInteracted(true);
      // Try to play after user interaction
      if (isLoaded && !isPlaying) {
        play();
      }
    }
  }, [userInteracted, isLoaded, isPlaying, play]);

  // Add global click/touch listeners for autoplay (enhanced for mobile)
  useEffect(() => {
    if (!userInteracted && isLoaded) {
      // More comprehensive event list for mobile devices
      const events = [
        'click', 
        'touchstart', 
        'touchend', 
        'keydown', 
        'mousedown', 
        'mouseup',
        'focus',
        'scroll',
        'gesturestart',
        'gesturechange',
        'gestureend'
      ];
      
      const handleInteraction = (event: Event) => {
        console.log('User interaction detected:', event.type);
        handleUserInteraction();
        events.forEach(eventType => {
          document.removeEventListener(eventType, handleInteraction);
        });
      };

      // Add event listeners with different options for mobile
      events.forEach(event => {
        document.addEventListener(event, handleInteraction, { 
          once: true,
          passive: true, // Better for mobile performance
          capture: false
        });
      });

      return () => {
        events.forEach(event => {
          document.removeEventListener(event, handleInteraction);
        });
      };
    }
  }, [userInteracted, isLoaded, handleUserInteraction]);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) {
      console.log('Cannot toggle mute: audioRef is null');
      return;
    }
    
    console.log('Toggle mute - current state:', { isMuted, volume });
    
    if (isMuted) {
      console.log('Currently muted, unmuting...');
      setMobileVolume(volume, false);
      setIsMuted(false);
    } else {
      console.log('Currently unmuted, muting...');
      setMobileVolume(0, true);
      setIsMuted(true);
    }
  }, [isMuted, volume, setMobileVolume]);

  const togglePlayPause = useCallback(async () => {
    if (!audioRef.current || !isLoaded) {
      console.log('Cannot toggle play/pause: audio not loaded or audioRef is null');
      return;
    }

    console.log('Toggle play/pause - current state:', { isPlaying, isLoaded });

    if (isPlaying) {
      console.log('Currently playing, pausing...');
      pause();
    } else {
      console.log('Not playing, starting playback...');
      const success = await play();
      console.log('Play result:', success);
    }
  }, [isPlaying, isLoaded, play, pause]);

  // Auto-play attempt when loaded (but browsers will likely block this)
  useEffect(() => {
    if (isLoaded && autoplay && !userInteracted) {
      console.log('Attempting autoplay');
      // Try to play, but don't worry if it fails due to autoplay restrictions
      play().catch(() => {
        // This is expected - browsers block autoplay
        console.log('Autoplay blocked - waiting for user interaction');
      });
    }
  }, [isLoaded, autoplay, userInteracted, play]);

  // Listen for custom events to pause/resume music for video
  useEffect(() => {
    const handlePauseMusic = () => {
      console.log('Received pauseBackgroundMusic event');
      if (audioRef.current && !audioRef.current.paused) {
        console.log('Pausing background music for video');
        pause();
      }
    };

    const handleResumeMusic = () => {
      console.log('Received resumeBackgroundMusic event');
      if (audioRef.current && audioRef.current.paused) {
        console.log('Resuming background music after video');
        play().catch(error => {
          console.log('Could not resume music after video:', error);
        });
      }
    };

    window.addEventListener('pauseBackgroundMusic', handlePauseMusic);
    window.addEventListener('resumeBackgroundMusic', handleResumeMusic);

    return () => {
      window.removeEventListener('pauseBackgroundMusic', handlePauseMusic);
      window.removeEventListener('resumeBackgroundMusic', handleResumeMusic);
    };
  }, [pause, play]);

  return {
    isPlaying,
    isMuted,
    isLoaded,
    error,
    autoplayBlocked,
    userInteracted,
    play,
    pause,
    toggleMute,
    togglePlayPause,
    handleUserInteraction,
  };
};