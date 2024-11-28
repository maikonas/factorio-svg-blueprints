import { createContext, useState, useContext } from 'react';
import { GeneralSettingsType } from '~GeneralSettings';


type GeneralSettingsContextType = {
  settings: GeneralSettingsType;
  setSettings: React.Dispatch<React.SetStateAction<GeneralSettingsType>>;
}

const defaultContext: GeneralSettingsContextType = {
  settings: {
    tile: 'space-platform-foundation',
    addSpacePlatformHub: true,
    platformHubX: 0,
    platformHubY: 0,
  },
  setSettings: () => {},
};

const GeneralSettingsContext = createContext(defaultContext);

export function GeneralSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<GeneralSettingsType>(defaultContext.settings);
  
  return (
    <GeneralSettingsContext.Provider value={{settings, setSettings}}>
      {children}
    </GeneralSettingsContext.Provider>
  );
}

export const useGeneralSettings = () => useContext(GeneralSettingsContext);