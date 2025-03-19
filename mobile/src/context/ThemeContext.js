import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import colors from '../theme/colors';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const deviceColorScheme = useColorScheme();
  const [theme, setTheme] = useState(deviceColorScheme === 'dark' ? 'dark' : 'light');
  
  useEffect(() => {
    setTheme(deviceColorScheme === 'dark' ? 'dark' : 'light');
  }, [deviceColorScheme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const themeStyles = {
  light: {
    backgroundColor: colors.white,
    color: colors.black,
  },
  dark: {
    backgroundColor: colors.dark,
    color: colors.white,
  },
};