import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@VibeList_location";

export async function saveLocation(city: string) {
  try {
    await AsyncStorage.setItem(KEY, city);
  } catch {}
}

export async function loadLocation(): Promise<string> {
  try {
    const city = await AsyncStorage.getItem(KEY);
    return city || "Toronto"; // default city for now
  } catch {
    return "Toronto";
  }
}