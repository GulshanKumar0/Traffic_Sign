import { createContext, useMemo, useState } from 'react';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('auto');
  const [mode, setMode] = useState('exam');

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      language,
      setLanguage,
      mode,
      setMode
    }),
    [theme, language, mode]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
