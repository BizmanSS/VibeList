import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@VibeList_theme";

export type ThemeMode = "light" | "dark";

export async function saveTheme(mode: ThemeMode): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, mode);
  } catch {
  }
}

export async function loadTheme(): Promise<ThemeMode> {
  try {
    const mode = await AsyncStorage.getItem(KEY);
    return mode === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}