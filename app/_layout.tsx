import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { colors } from "../constants/colors";
import { useEffect } from "react";
import { bootstrapBookmarks, setEvents } from "../features/events/eventsSlice";
import { AuthProvider } from "./context/AuthContext";
import { registerForNotifications } from "../utils/NotificationsHandler";
import { db } from "../services/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Event } from "../types";

export default function RootLayout() {
  useEffect(() => {
    // Request notification permission on app start
    void registerForNotifications();

    // Subscribe to events collection in Firestore
    const unsubscribe = onSnapshot(collection(db, "events"), (snapshot) => {
      const eventList: Event[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Event[];

      // Sort events by date
      eventList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      // Update Redux store with events
      store.dispatch(setEvents(eventList));
    });

    // Initialize bookmarks
    void bootstrapBookmarks(store.dispatch);

    // Clean up Firestore subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: colors.white,
            headerTitleStyle: { fontWeight: "700" },
            headerTitleAlign: "center",
            headerBackTitle: "Back",
          }}
        >
          <Stack.Screen name="tabs" options={{ headerShown: false }} />
          <Stack.Screen name="event/[id]" options={{ title: "Event Details" }} />
          <Stack.Screen name="auth/login" options={{ headerShown: false }} />
          <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
          <Stack.Screen name="auth/forgot-password" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </Provider>
  );
}
