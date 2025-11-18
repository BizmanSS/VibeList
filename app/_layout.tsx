// import { Stack } from "expo-router";
// import { Provider } from "react-redux";
// import { store } from "../store/store";
// import { colors } from "../constants/colors";
// import { useEffect } from "react";
// import { bootstrapBookmarks, setEvents } from "../features/events/eventsSlice";
// import events from "../assets/data/events.json";
// import { AuthProvider } from "./context/AuthContext";

// export default function RootLayout() {
//   useEffect(() => {
//     store.dispatch(setEvents(events as any));
//     void bootstrapBookmarks(store.dispatch);
//   }, []);

//   return (
//     <Provider store={store}>
//       <AuthProvider>
//         <Stack
//           screenOptions={{
//             headerStyle: { backgroundColor: colors.primary },
//             headerTintColor: colors.white,
//             headerTitleStyle: { fontWeight: "700" },
//             headerTitleAlign: "center",
//             headerBackTitle: "Back",
//           }}
//         >
//           <Stack.Screen name="tabs" options={{ headerShown: false }} />
//           <Stack.Screen name="event/[id]" options={{ title: "Event Details" }} />
//           <Stack.Screen name="auth/login" options={{ headerShown: false }} />
//           <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
//           <Stack.Screen name="auth/forgot-password" options={{ headerShown: false }} />
//         </Stack>
//       </AuthProvider>
//     </Provider>
//   );
// }

// import { Stack } from "expo-router";
// import { Provider } from "react-redux";
// import { store } from "../store/store";
// import { colors } from "../constants/colors";
// import { useEffect } from "react";
// import { bootstrapBookmarks, setEvents } from "../features/events/eventsSlice";
// import events from "../assets/data/events.json";
// import { AuthProvider } from "./context/AuthContext";
// import * as Notifications from "expo-notifications";
// import { Platform } from "react-native";

// export default function RootLayout() {
//   useEffect(() => {
//     // --- Notifications handler for native platforms ---
//     if (Platform.OS !== "web") {
//       Notifications.setNotificationHandler({
//         handleNotification: async () => ({
//           shouldShowAlert: true,    // optional fallback for older versions
//           shouldShowBanner: true,   // iOS 16+ alert banner
//           shouldShowList: true,     // show in notification center / shade
//           shouldPlaySound: true,
//           shouldSetBadge: false,
//         }),
//       });
//     }


//     // --- Existing code ---
//     store.dispatch(setEvents(events as any));
//     void bootstrapBookmarks(store.dispatch);
//   }, []);

//   return (
//     <Provider store={store}>
//       <AuthProvider>
//         <Stack
//           screenOptions={{
//             headerStyle: { backgroundColor: colors.primary },
//             headerTintColor: colors.white,
//             headerTitleStyle: { fontWeight: "700" },
//             headerTitleAlign: "center",
//             headerBackTitle: "Back",
//           }}
//         >
//           <Stack.Screen name="tabs" options={{ headerShown: false }} />
//           <Stack.Screen name="event/[id]" options={{ title: "Event Details" }} />
//           <Stack.Screen name="auth/login" options={{ headerShown: false }} />
//           <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
//           <Stack.Screen name="auth/forgot-password" options={{ headerShown: false }} />
//         </Stack>
//       </AuthProvider>
//     </Provider>
//   );
// }


// import { Stack } from "expo-router";
// import { Provider } from "react-redux";
// import { store } from "../store/store";
// import { colors } from "../constants/colors";
// import { useEffect } from "react";
// import { bootstrapBookmarks, setEvents } from "../features/events/eventsSlice";
// import events from "../assets/data/events.json";
// import AuthProvider from "./context/AuthContext"; // default export
// import { registerForNotifications } from "../utils/NotificationsHandler";

// export default function RootLayout() {
//   useEffect(() => {
//     // Request permissions once on app start
//     void registerForNotifications();

//     // Load events & bookmarks
//     store.dispatch(setEvents(events as any));
//     void bootstrapBookmarks(store.dispatch);
//   }, []);

//   return (
//     <Provider store={store}>
//       <AuthProvider>
//         <Stack
//           screenOptions={{
//             headerStyle: { backgroundColor: colors.primary },
//             headerTintColor: colors.white,
//             headerTitleStyle: { fontWeight: "700" },
//             headerTitleAlign: "center",
//             headerBackTitle: "Back",
//           }}
//         >
//           <Stack.Screen name="tabs" options={{ headerShown: false }} />
//           <Stack.Screen name="event/[id]" options={{ title: "Event Details" }} />
//           <Stack.Screen name="auth/login" options={{ headerShown: false }} />
//           <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
//           <Stack.Screen name="auth/forgot-password" options={{ headerShown: false }} />
//         </Stack>
//       </AuthProvider>
//     </Provider>
//   );
// }


// import { Stack } from "expo-router";
// import { Provider } from "react-redux";
// import { store } from "../store/store";
// import { colors } from "../constants/colors";
// import { useEffect } from "react";
// import { bootstrapBookmarks, setEvents } from "../features/events/eventsSlice";
// import events from "../assets/data/events.json";
// import AuthProvider from "./context/AuthContext";
// import { registerForNotifications } from "../utils/NotificationsHandler";

// export default function RootLayout() {
//   useEffect(() => {
//     // Request notification permissions on app start
//     void registerForNotifications();

//     // Load events and bookmarks
//     store.dispatch(setEvents(events as any));
//     void bootstrapBookmarks(store.dispatch);
//   }, []);

//   return (
//     <Provider store={store}>
//       <AuthProvider>
//         <Stack
//           screenOptions={{
//             headerStyle: { backgroundColor: colors.primary },
//             headerTintColor: colors.white,
//             headerTitleStyle: { fontWeight: "700" },
//             headerTitleAlign: "center",
//             headerBackTitle: "Back",
//           }}
//         >
//           <Stack.Screen name="tabs" options={{ headerShown: false }} />
//           <Stack.Screen name="event/[id]" options={{ title: "Event Details" }} />
//           <Stack.Screen name="auth/login" options={{ headerShown: false }} />
//           <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
//           <Stack.Screen name="auth/forgot-password" options={{ headerShown: false }} />
//         </Stack>
//       </AuthProvider>
//     </Provider>
//   );
// }

import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { colors } from "../constants/colors";
import { useEffect } from "react";
import { bootstrapBookmarks, setEvents } from "../features/events/eventsSlice";
import events from "../assets/data/events.json";
import { AuthProvider } from "./context/AuthContext";
import { registerForNotifications } from "../utils/NotificationsHandler";

export default function RootLayout() {
  useEffect(() => {
    // Request notification permission on app start
    void registerForNotifications();

    // Load events and bookmarks
    store.dispatch(setEvents(events as any));
    void bootstrapBookmarks(store.dispatch);
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
