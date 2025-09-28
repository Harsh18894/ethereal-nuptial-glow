import { useCallback } from 'react';

// Simple hook to control background music without context
export const useAudioControl = () => {
  const pauseMusic = useCallback(() => {
    console.log('Pausing background music for video');
    
    // Method 1: Try to find audio elements in DOM
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
      if (!audio.paused) {
        console.log('Pausing DOM audio element');
        audio.pause();
      }
    });
    
    // Method 2: Try to find audio elements by looking for elements with audio sources
    const elementsWithAudio = document.querySelectorAll('[src*=".mp3"], [src*=".wav"], [src*=".ogg"]');
    elementsWithAudio.forEach(element => {
      if (element instanceof HTMLAudioElement && !element.paused) {
        console.log('Pausing audio element found by src');
        element.pause();
      }
    });
    
    // Method 3: Dispatch a custom event that the background music hook can listen to
    window.dispatchEvent(new CustomEvent('pauseBackgroundMusic'));
  }, []);

  const resumeMusic = useCallback(() => {
    console.log('Resuming background music after video');
    
    // Method 1: Try to find audio elements in DOM
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
      if (audio.paused) {
        console.log('Resuming DOM audio element');
        audio.play().catch(error => {
          console.log('Could not resume DOM audio:', error);
        });
      }
    });
    
    // Method 2: Try to find audio elements by looking for elements with audio sources
    const elementsWithAudio = document.querySelectorAll('[src*=".mp3"], [src*=".wav"], [src*=".ogg"]');
    elementsWithAudio.forEach(element => {
      if (element instanceof HTMLAudioElement && element.paused) {
        console.log('Resuming audio element found by src');
        element.play().catch(error => {
          console.log('Could not resume audio element:', error);
        });
      }
    });
    
    // Method 3: Dispatch a custom event that the background music hook can listen to
    window.dispatchEvent(new CustomEvent('resumeBackgroundMusic'));
  }, []);

  return { pauseMusic, resumeMusic };
};
