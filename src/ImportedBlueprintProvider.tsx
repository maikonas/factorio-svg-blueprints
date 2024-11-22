import { createContext, useState, useContext } from 'react';
import { Blueprint } from '~utils';

type ImportedBlueprint = {
  glyph: ImageData;
  blueprint: Blueprint;
}

type ImportedBlueprintContextType = {
  imported: ImportedBlueprint | null;
  setImported: (imported: ImportedBlueprint) => void;
}

const defaultContext: ImportedBlueprintContextType = {
  imported: null,
  setImported: () => {},
};

const ImportedBlueprintContext = createContext(defaultContext);

export function ImportedBlueprintProvider({ children }: { children: React.ReactNode }) {
    const [imported, setImported] = useState<ImportedBlueprint | null>(null);
  
  return (
    <ImportedBlueprintContext.Provider value={{imported, setImported}}>
      {children}
    </ImportedBlueprintContext.Provider>
  );
}

export const useImportedBlueprint = () => useContext(ImportedBlueprintContext);