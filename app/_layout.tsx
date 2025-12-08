// app/_layout.tsx
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { colors } from "../constants/colors";
import { useEffect } from "react";
import { bootstrapBookmarks, setEvents } from "../features/events/eventsSlice";
import { AuthProvider } from "./context/AuthContext";

import { db } from "../services/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import type { EventItem } from "../types";
import { ThemeProvider } from "./context/ThemeContext";


export default function RootLayout() {
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "events"), (snapshot) => {
      const eventList: EventItem[] = snapshot.docs.map((doc) => {
        const data = doc.data() as any;
        return {
          id: doc.id,
          title: data.title ?? "",
          image:
            data.image ??
            "https://picsum.photos/seed/vibelist-event/600/400",
          venue: data.venue ?? data.location ?? "",
          city: data.city ?? data.location ?? "Toronto",
          dateISO: data.date ?? data.dateISO ?? new Date().toISOString(),
          price: data.price,
          rating: data.rating,
          description: data.description ,
          externalLink: data.link ?? data.externalLink,
        };
      });

      eventList.sort(
        (a, b) =>
          new Date(a.dateISO).getTime() - new Date(b.dateISO).getTime()
      );

      store.dispatch(setEvents(eventList));
    });

    void bootstrapBookmarks(store.dispatch);

    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
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
          <Stack.Screen name="event/[id]" options={{
                headerShown: false,
              }}
            />
          <Stack.Screen name="auth/login" options={{ headerShown: false }} />
          <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
          <Stack.Screen name="auth/forgot-password" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}