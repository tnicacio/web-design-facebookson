import { createContext, ReactNode, useState } from 'react';
import { GiBlackBar } from 'react-icons/gi';

interface DarkModeContextData {
  toggleDarkMode: (fromLogginOut?: boolean) => void;
}

interface DarkModeProviderProps {
  children: ReactNode;
  userLoggedIn?: boolean;
}

export const DarkModeContext = createContext({} as DarkModeContextData);

export function DarkModeProvider({ children }: DarkModeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  function toggleDarkMode(fromLogginOut = false) {
    const colorModes = {
      light: {
        '--white': '#fff',
        '--background': '#f2f3f5',
        '--numbers': '#5965e0',
        '--blue': '#5965e0',
        '--blue-dark': '#4953b8',
        '--red': '#e83f5b',
        '--dark-green': '#36a420',
        '--title': 'black',
        '--border': '#f0f1f3',
        '--init-cicle-btn': '#5965e0',
        '--init-cicle-btn-hover': '#4953b8',
      },
      dark: {
        '--white': '#383a59',
        // '--white': '#44475a',
        '--background': '#282a36',
        // '--background': '#282a36',
        // '--text': '#FCFCFC',
        // '--text': '#50fa7b',
        '--numbers': '#50fa7b',
        '--blue': '#383a59',
        // '--blue-dark': '#4cd62b',
        '--blue-dark': '#44475a',
        '--red': '#ff5555',
        '--dark-green': '#5965e0',
        '--title': 'white',
        '--border': '#282a36',
        '--init-cicle-btn': '#4cbe2b',
        '--init-cicle-btn-hover': '#36a420',
      },
    };

    const newColorMode = isDarkMode ? 'light' : 'dark';
    const setColorModeTo = fromLogginOut ? 'light' : newColorMode;
    const rootStyle = document.querySelector<HTMLElement>(':root').style;

    for (const property in colorModes[setColorModeTo]) {
      rootStyle.setProperty(property, colorModes[setColorModeTo][property]);
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
