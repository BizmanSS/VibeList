import { createContext, useContext, useEffect, useState } from "react";
import { lightTheme, darkTheme } from "../../constants/colors";
import { loadTheme, saveTheme, ThemeMode } from "../../storage/themeStorage";

type ThemeContextType = {
  theme: typeof lightTheme;
  themeMode: ThemeMode;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  themeMode: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  useEffect(() => {
    loadTheme().then((stored) => setThemeMode(stored));
  }, []);

  const toggleTheme = async () => {
    const next = themeMode === "light" ? "dark" : "light";
    setThemeMode(next);
    await saveTheme(next);
  };

  const theme = themeMode === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeMode() {
  return useContext(ThemeContext);
}
