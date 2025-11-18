// // services/NotificationsHandler.ts
// import * as Notifications from 'expo-notifications';
// import { Platform } from 'react-native';

// export async function registerForPushNotificationsAsync() {
//   if (Platform.OS === 'web') return;

//   const { status: existingStatus } = await Notifications.getPermissionsAsync();
//   let finalStatus = existingStatus;

//   if (existingStatus !== 'granted') {
//     const { status } = await Notifications.requestPermissionsAsync();
//     finalStatus = status;
//   }

//   if (finalStatus !== 'granted') return false;
//   return true;
// }

// export async function triggerBookmarkNotification(title: string) {
//   if (Platform.OS === 'web') return;

//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: 'Saved to Favourites!',
//       body: `You saved "${title}"`,
//       sound: true,
//     },
//     trigger: null,
//   });
// }

// // Optional: configure global handler
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldShowBanner: true,
//     shouldShowList: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });


// import * as Notifications from "expo-notifications";
// import { Platform } from "react-native";

// // Global notification handler
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowBanner: true,  // iOS 16+ alert banner
//     shouldShowList: true,    // notification center / shade
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

// // Request permissions for local notifications
// export async function registerForNotifications() {
//   if (Platform.OS === "web") return false;

//   const { status: existingStatus } = await Notifications.getPermissionsAsync();
//   let finalStatus = existingStatus;

//   if (existingStatus !== "granted") {
//     const { status } = await Notifications.requestPermissionsAsync();
//     finalStatus = status;
//   }

//   return finalStatus === "granted";
// }

// // Trigger a bookmark notification
// export async function triggerBookmarkNotification(title: string) {
//   if (Platform.OS === "web") return;

//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "Event Saved!",
//       body: `You saved "${title}"!`,
//       sound: true,
//     },
//     trigger: null, // immediate
//   });
// }


// import * as Notifications from "expo-notifications";
// import { Platform } from "react-native";

// // Set global notification behavior
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowBanner: true,  // shows iOS banner
//     shouldShowList: true,    // shows in notification center
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

// // Request permissions for iOS / Android
// export async function registerForNotifications() {
//   if (Platform.OS === "web") return false;

//   const { status: existingStatus } = await Notifications.getPermissionsAsync();
//   let finalStatus = existingStatus;

//   if (existingStatus !== "granted") {
//     const { status } = await Notifications.requestPermissionsAsync();
//     finalStatus = status;
//   }

//   return finalStatus === "granted";
// }

// // Trigger a local notification
// export async function triggerBookmarkNotification(title: string) {
//   if (Platform.OS === "web") return;

//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "Event Saved!",
//       body: `You saved "${title}"!`,
//       sound: true,
//     },
//     trigger: null, // immediate
//   });
// }


import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Configure global notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,   // iOS banner
    shouldShowList: true,     // notification center / shade
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Request notification permission (call once on app start)
export async function registerForNotifications() {
  if (Platform.OS === "web") return false;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}

// Trigger a local notification
export async function triggerBookmarkNotification(title: string) {
  if (Platform.OS === "web") return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Event Saved!",
      body: `You saved "${title}"!`,
      sound: true,
    },
    trigger: null, // immediate
  });
}
