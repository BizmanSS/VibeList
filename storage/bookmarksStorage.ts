import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@VibeList_bookmarks";

export async function loadBookmarks(): Promise<Record<string, string[]>> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

export async function saveBookmarks(bm: Record<string, string[]>): Promise<void> {
  try { 
    await AsyncStorage.setItem(KEY, JSON.stringify(bm)); 
  } catch (e) {
    console.error("Failed to save bookmarks:", e);
  }
}