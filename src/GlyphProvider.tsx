import { createContext, useState, useContext } from 'react';

type GlyphContextType = {
    glyph: ImageData | null;
    setGlyph: (glyph: ImageData) => void;
}

const defaultContext: GlyphContextType = {
    glyph: null,
    setGlyph: () => {},
};

const GlyphContext = createContext(defaultContext);

export function GlyphProvider({ children }: { children: React.ReactNode }) {
    const [glyph, setGlyph] = useState<ImageData | null>(null);
  
  return (
    <GlyphContext.Provider value={{glyph, setGlyph}}>
      {children}
    </GlyphContext.Provider>
  );
}

export const useGlyph = () => useContext(GlyphContext);