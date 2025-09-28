import { createContext, useContext, ReactNode } from 'react';

interface MusicContextType {
  pauseMusic: () => void;
  resumeMusic: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};

interface MusicProviderProps {
  children: ReactNode;
  pauseMusic: () => void;
  resumeMusic: () => void;
}

export const MusicProvider = ({ children, pauseMusic, resumeMusic }: MusicProviderProps) => {
  return (
    <MusicContext.Provider value={{ pauseMusic, resumeMusic }}>
      {children}
    </MusicContext.Provider>
  );
};
