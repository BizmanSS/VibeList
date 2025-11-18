// 

// import { View, Text, Image, Pressable, Platform } from "react-native";
// import { EventItem } from "../types";
// import { colors } from "../constants/colors";
// import { useRouter } from "expo-router";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleBookmark, selectBookmarkedIds } from "../features/events/eventsSlice";
// import * as Notifications from "expo-notifications";

// export default function EventCard({ event }: { event: EventItem }) {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const bm = useSelector(selectBookmarkedIds);
//   const saved = !!bm[event.id];

//   const handleBookmark = async () => {
//     dispatch(toggleBookmark(event.id));

//     if (!saved) {
//       // Native (iOS / Android)
//       if (Platform.OS !== "web") {
//         await Notifications.scheduleNotificationAsync({
//           content: {
//             title: "Event Saved!",
//             body: `You saved "${event.title}"!`,
//             sound: true,
//           },
//           trigger: null, // immediate
//         });
//       } else {
//         // Web
//         if ("Notification" in window) {
//           if (Notification.permission === "granted") {
//             new Notification("Event Saved!", { body: `You saved "${event.title}"!` });
//           } else if (Notification.permission !== "denied") {
//             Notification.requestPermission().then(permission => {
//               if (permission === "granted") {
//                 new Notification("Event Saved!", { body: `You saved "${event.title}"!` });
//               }
//             });
//           }
//         }
//       }
//     }
//   };

//   return (
//     <Pressable
//       onPress={() => router.push(`/event/${event.id}`)}
//       style={{
//         backgroundColor: colors.card,
//         borderRadius: 16,
//         overflow: "hidden",
//         marginBottom: 14,
//         borderWidth: 1,
//         borderColor: colors.border,
//       }}
//     >
//       <Image source={{ uri: event.image }} style={{ width: "100%", height: 140 }} />
//       <View style={{ padding: 12, gap: 6 }}>
//         <Text style={{ fontSize: 16, fontWeight: "600", color: colors.text }}>{event.title}</Text>
//         <Text style={{ color: colors.subtext }}>
//           {event.venue} • {new Date(event.dateISO).toLocaleDateString()}
//         </Text>
//         <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
//           <Text style={{ color: colors.text }}>{event.price ? `$${event.price}` : "Free"}</Text>
//           <Text
//             onPress={(e) => { e.preventDefault(); void handleBookmark(); }}
//             style={{
//               color: saved ? colors.white : colors.primary,
//               backgroundColor: saved ? colors.primary : colors.white,
//               borderWidth: 1,
//               borderColor: colors.primary,
//               paddingHorizontal: 10,
//               paddingVertical: 6,
//               borderRadius: 999,
//             }}
//           >
//             {saved ? "Saved" : "Save"}
//           </Text>
//         </View>
//       </View>
//     </Pressable>
//   );
// }


// import { View, Text, Image, Pressable, Platform } from "react-native";
// import { EventItem } from "../types";
// import { colors } from "../constants/colors";
// import { useRouter } from "expo-router";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleBookmark, selectBookmarkedIds } from "../features/events/eventsSlice";
// import { triggerBookmarkNotification } from "../utils/NotificationsHandler";

// export default function EventCard({ event }: { event: EventItem }) {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const bm = useSelector(selectBookmarkedIds);
//   const saved = !!bm[event.id];

//   const handleBookmark = async () => {
//     dispatch(toggleBookmark(event.id));

//     if (!saved) {
//       if (Platform.OS !== "web") {
//         await triggerBookmarkNotification(event.title);
//       } else {
//         // Web fallback
//         if ("Notification" in window) {
//           if (Notification.permission === "granted") {
//             new Notification("Event Saved!", { body: `You saved "${event.title}"!` });
//           } else if (Notification.permission !== "denied") {
//             Notification.requestPermission().then(permission => {
//               if (permission === "granted") {
//                 new Notification("Event Saved!", { body: `You saved "${event.title}"!` });
//               }
//             });
//           }
//         }
//       }
//     }
//   };

//   return (
//     <Pressable
//       onPress={() => router.push(`/event/${event.id}`)}
//       style={{
//         backgroundColor: colors.card,
//         borderRadius: 16,
//         overflow: "hidden",
//         marginBottom: 14,
//         borderWidth: 1,
//         borderColor: colors.border,
//       }}
//     >
//       <Image source={{ uri: event.image }} style={{ width: "100%", height: 140 }} />
//       <View style={{ padding: 12, gap: 6 }}>
//         <Text style={{ fontSize: 16, fontWeight: "600", color: colors.text }}>{event.title}</Text>
//         <Text style={{ color: colors.subtext }}>
//           {event.venue} • {new Date(event.dateISO).toLocaleDateString()}
//         </Text>
//         <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
//           <Text style={{ color: colors.text }}>{event.price ? `$${event.price}` : "Free"}</Text>
//           <Text
//             onPress={(e) => { e.preventDefault(); void handleBookmark(); }}
//             style={{
//               color: saved ? colors.white : colors.primary,
//               backgroundColor: saved ? colors.primary : colors.white,
//               borderWidth: 1,
//               borderColor: colors.primary,
//               paddingHorizontal: 10,
//               paddingVertical: 6,
//               borderRadius: 999,
//             }}
//           >
//             {saved ? "Saved" : "Save"}
//           </Text>
//         </View>
//       </View>
//     </Pressable>
//   );
// }


// import { View, Text, Image, Pressable, Platform } from "react-native";
// import { EventItem } from "../types";
// import { colors } from "../constants/colors";
// import { useRouter } from "expo-router";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleBookmark, selectBookmarkedIds } from "../features/events/eventsSlice";
// import { triggerBookmarkNotification } from "../utils/NotificationsHandler";

// export default function EventCard({ event }: { event: EventItem }) {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const bm = useSelector(selectBookmarkedIds);
//   const saved = !!bm[event.id];

//   const handleBookmark = async () => {
//     dispatch(toggleBookmark(event.id));

//     if (!saved && Platform.OS !== "web") {
//       await triggerBookmarkNotification(event.title);
//     }

//     // Web fallback
//     if (Platform.OS === "web") {
//       if ("Notification" in window) {
//         if (Notification.permission === "granted") {
//           new Notification("Event Saved!", { body: `You saved "${event.title}"!` });
//         } else if (Notification.permission !== "denied") {
//           Notification.requestPermission().then(permission => {
//             if (permission === "granted") {
//               new Notification("Event Saved!", { body: `You saved "${event.title}"!` });
//             }
//           });
//         }
//       }
//     }
//   };

//   return (
//     <Pressable
//       onPress={() => router.push(`/event/${event.id}`)}
//       style={{
//         backgroundColor: colors.card,
//         borderRadius: 16,
//         overflow: "hidden",
//         marginBottom: 14,
//         borderWidth: 1,
//         borderColor: colors.border,
//       }}
//     >
//       <Image source={{ uri: event.image }} style={{ width: "100%", height: 140 }} />
//       <View style={{ padding: 12, gap: 6 }}>
//         <Text style={{ fontSize: 16, fontWeight: "600", color: colors.text }}>{event.title}</Text>
//         <Text style={{ color: colors.subtext }}>
//           {event.venue} • {new Date(event.dateISO).toLocaleDateString()}
//         </Text>
//         <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
//           <Text style={{ color: colors.text }}>{event.price ? `$${event.price}` : "Free"}</Text>
//           <Text
//             onPress={(e) => { e.preventDefault(); void handleBookmark(); }}
//             style={{
//               color: saved ? colors.white : colors.primary,
//               backgroundColor: saved ? colors.primary : colors.white,
//               borderWidth: 1,
//               borderColor: colors.primary,
//               paddingHorizontal: 10,
//               paddingVertical: 6,
//               borderRadius: 999,
//             }}
//           >
//             {saved ? "Saved" : "Save"}
//           </Text>
//         </View>
//       </View>
//     </Pressable>
//   );
// }


import { View, Text, Image, Pressable, Platform } from "react-native";
import { EventItem } from "../types";
import { colors } from "../constants/colors";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { toggleBookmark, selectBookmarkedIds } from "../features/events/eventsSlice";
import { triggerBookmarkNotification } from "../utils/NotificationsHandler";

export default function EventCard({ event }: { event: EventItem }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const bm = useSelector(selectBookmarkedIds);
  const saved = !!bm[event.id];

  const handleBookmark = async () => {
    dispatch(toggleBookmark(event.id));

    if (!saved && Platform.OS !== "web") {
      await triggerBookmarkNotification(event.title);
    }

    // Web fallback
    if (Platform.OS === "web") {
      if ("Notification" in window) {
        if (Notification.permission === "granted") {
          new Notification("Event Saved!", { body: `You saved "${event.title}"!` });
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then(permission => {
            if (permission === "granted") {
              new Notification("Event Saved!", { body: `You saved "${event.title}"!` });
            }
          });
        }
      }
    }
  };

  return (
    <Pressable
      onPress={() => router.push(`/event/${event.id}`)}
      style={{
        backgroundColor: colors.card,
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 14,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <Image source={{ uri: event.image }} style={{ width: "100%", height: 140 }} />
      <View style={{ padding: 12, gap: 6 }}>
        <Text style={{ fontSize: 16, fontWeight: "600", color: colors.text }}>{event.title}</Text>
        <Text style={{ color: colors.subtext }}>
          {event.venue} • {new Date(event.dateISO).toLocaleDateString()}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
          <Text style={{ color: colors.text }}>{event.price ? `$${event.price}` : "Free"}</Text>
          <Text
            onPress={(e) => { e.preventDefault(); void handleBookmark(); }}
            style={{
              color: saved ? colors.white : colors.primary,
              backgroundColor: saved ? colors.primary : colors.white,
              borderWidth: 1,
              borderColor: colors.primary,
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 999,
            }}
          >
            {saved ? "Saved" : "Save"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
