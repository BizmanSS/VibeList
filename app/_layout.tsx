import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { colors } from "../constants/colors";
import { useEffect } from "react";
import { bootstrapBookmarks, setEvents } from "../features/events/eventsSlice";
import events from "../assets/data/events.json";

export default function RootLayout() {
  useEffect(() => {
    store.dispatch(setEvents(events as any));
    void bootstrapBookmarks(store.dispatch);
  }, []);

  return (
    <Provider store={store}>
      <Stack screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.white,
        headerTitleStyle: { fontWeight: "700" },
        headerTitleAlign: "center",
        headerBackTitle: "Back",
      }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="event/[id]" options={{ title: "Event Details" }} />
      </Stack>
    </Provider>
  );
}