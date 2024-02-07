import { createContext, useState } from "react";

// Interfaces
interface IThemeContext {
  darkMode: boolean;
  toggleDarkMode: () => void;
}
interface IThemeContextProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext<IThemeContext>({
  darkMode: false,
  toggleDarkMode: () => {},
});

const ThemeContextProvider = ({ children }: IThemeContextProviderProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const toggleDarkMode: () => void = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
