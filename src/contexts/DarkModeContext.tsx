import { createContext, ReactNode, useState } from 'react';

interface DarkModeContextData {
  toggleDarkMode: () => void;
}

interface DarkModeProviderProps {
  children: ReactNode;
}

export const DarkModeContext = createContext({} as DarkModeContextData);

export function DarkModeProvider({ children }: DarkModeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  function toggleDarkMode() {
    const colorModes = {
      light: {
        '--white': '#fff',
        '--background': '#f2f3f5',
        '--text': '##666666',
        '--blue': '#5965e0',
        '--blue-dark': '#4953b8',
        '--red': '#e83f5b',
        '--dark-green': '#36a420',
      },
      dark: {
        '--white': '#282a36',
        '--background': '#000000',
        '--text': '#FCFCFC',
        '--blue': '#50fa7b',
        '--blue-dark': '#4cd62b',
        '--red': '#ff5555',
        '--dark-green': '#5965e0',
      },
    };

    const newColorMode = isDarkMode ? 'light' : 'dark';
    const rootStyle = document.querySelector<HTMLElement>(':root').style;

    for (const property in colorModes[newColorMode]) {
      rootStyle.setProperty(property, colorModes[newColorMode][property]);
    }
    setIsDarkMode(!isDarkMode);
  }

  return (
    <DarkModeContext.Provider
      value={{
        toggleDarkMode,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}
