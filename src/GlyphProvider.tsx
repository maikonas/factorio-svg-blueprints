import { createContext, useState, useContext } from 'react';

type GlyphType = {
  data: ImageData;
  boundary: number;
}

type GlyphContextType = {
    glyph: GlyphType | null;
    setGlyph: (glyph: GlyphType) => void;
}

const defaultContext: GlyphContextType = {
    glyph: null,
    setGlyph: () => {},
};

const GlyphContext = createContext(defaultContext);

export function GlyphProvider({ children }: { children: React.ReactNode }) {
    const [glyph, setGlyph] = useState<GlyphType | null>(null);
  
  return (
    <GlyphContext.Provider value={{glyph, setGlyph}}>
      {children}
    </GlyphContext.Provider>
  );
}

export const useGlyph = () => useContext(GlyphContext);

export { GlyphType }