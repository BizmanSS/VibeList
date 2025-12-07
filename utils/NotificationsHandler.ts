import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registerForNotifications(): Promise<boolean> {
  if (Platform.OS === "web") return false;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === "granted";
}

export async function triggerBookmarkNotification(title: string) {
  if (Platform.OS === "web") return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Event Saved!",
      body: `You saved "${title}"!`,
      sound: true,
    },
    trigger: null,
  });
}

export async function scheduleEventReminders(title: string, eventDateISO: string) {
  if (Platform.OS === "web") return;

  const hasPermission = await registerForNotifications();
  if (!hasPermission) return;

  const eventDate = new Date(eventDateISO);
  const now = new Date();

  const reminders = [
    { label: "in 3 days", ms: 3 * 24 * 60 * 60 * 1000 },
    { label: "in 1 day", ms: 1 * 24 * 60 * 60 * 1000 },
    { label: "1 hour before", ms: 1 * 60 * 60 * 1000 },
  ];

  for (const r of reminders) {
    const triggerTime = new Date(eventDate.getTime() - r.ms);

    if (triggerTime > now) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `🎉 Event Happening Soon!`,
          body:
            r.label === "1 hour before"
              ? `Your saved event "${title}" is happening in 1 hour! Get ready!`
              : `Your saved event "${title}" is happening ${r.label}!`,
          sound: true,
        },
        trigger: {
          type: 'date',
          date: triggerTime,
        } as Notifications.DateTriggerInput,
      });
    }
  }
}

export async function cancelEventReminders(notificationIds: string[]) {
  if (Platform.OS === "web") return;

  for (const id of notificationIds) {
    await Notifications.cancelScheduledNotificationAsync(id);
  }
}