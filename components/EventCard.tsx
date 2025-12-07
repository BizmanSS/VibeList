// import { View, Text, Image, Pressable, StyleSheet } from "react-native";
// import { EventItem } from "../types";
// import { colors } from "../constants/colors";
// import { useRouter } from "expo-router";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   toggleBookmark,
//   selectBookmarkedIds,
// } from "../features/events/eventsSlice";

// import DollarIcon from "../assets/icons/DollarIcon";
// import TimeIcon from "../assets/icons/TimeIcon";

// export default function EventCard({ event }: { event: EventItem }) {
//   const router = useRouter();
//   const dispatch = useDispatch();
  
//   const bm = useSelector(selectBookmarkedIds);
//   const saved = !!bm[event.id];

//   const date = new Date(event.dateISO);
//   const timeString = date.toLocaleTimeString([], {
//     hour: "numeric",
//     minute: "2-digit",
//   });

//   const handleToggleSave = async () => {
    
//     const { 
//       scheduleEventReminders, 
//       cancelEventReminders, 
//       triggerBookmarkNotification
//     } = await import("../utils/NotificationsHandler");

//     if (!saved) {
//       const notificationIds = await scheduleEventReminders(event.title, event.dateISO);
      
//       dispatch(toggleBookmark({ id: event.id, notificationIds }));

//       await triggerBookmarkNotification(event.title);
//     // Inside EventCard.tsx handleToggleSave
//     } 
//     // else {
//     //   const existingIds = bm[event.id];

//     //   if (existingIds && Array.isArray(existingIds)) {
//     //     await cancelEventReminders(existingIds);
//     //   }

//     //   dispatch(toggleBookmark({ id: event.id }));
//     // }

// //TEMP COMMENTTTT
// //     else {
// //   const existingIds = bm[event.id];

// //   if (existingIds && Array.isArray(existingIds)) {
// //     await cancelEventReminders(existingIds);
    
// //     // ADD THIS LINE TO VERIFY THE QUEUE IS NOW EMPTY
// //     const count = await verifyQueue();
// //     console.log(`Queue count after unsave: ${count}`);
// //   }

// //   dispatch(toggleBookmark({ id: event.id }));
// // }

//   // EventCard.tsx (Temporary debug workflow)

//  else {
//     const existingIds = bm[event.id];

//     // 1. Flush EVERYTHING once to remove the 32 ghosts
//     const { clearAllScheduledNotifications, verifyQueue } = await import("../utils/NotificationsHandler");
//     await clearAllScheduledNotifications();

//     // 2. Log that it is now zero
//     await verifyQueue(); 

//     // 3. Normal Redux toggle
//     dispatch(toggleBookmark({ id: event.id }));
// }


//   };

//   return (
//     <Pressable
//       onPress={() => router.push(`/event/${event.id}`)}
//       style={styles.card}
//     >
//       <Image source={{ uri: event.image }} style={styles.image} />

//       <View style={styles.content}>
//         <View style={styles.row}>
//           <Text style={styles.title} numberOfLines={1}>{event.title}</Text>

//           <Pressable
//             onPress={(e) => {
//               e.stopPropagation(); 
//               handleToggleSave();
//             }}
//           >
//             <Text
//               style={[
//                 styles.saveButton,
//                 saved ? styles.saveButtonActive : styles.saveButtonInactive,
//               ]}
//             >
//               {saved ? "Saved" : "Save"}
//             </Text>
//           </Pressable>
//         </View>

//         <Text style={styles.subtext} numberOfLines={1}>
//           {event.venue} • {date.toLocaleDateString()}
//         </Text>

//         <View style={styles.iconRow}>
//           <View style={styles.iconItem}>
//             <DollarIcon size={16} />
//             <Text style={styles.iconText}>
//               {event.price ? event.price : "N/A"}
//             </Text>
//           </View>

//           <View style={styles.iconItem}>
//             <TimeIcon size={16} />
//             <Text style={styles.iconText}>{timeString}</Text>
//           </View>
//         </View>
//       </View>
//     </Pressable>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: colors.card,
//     borderRadius: 16,
//     overflow: "hidden",
//     marginBottom: 14,
//   },
//   image: {
//     width: "100%",
//     height: 140,
//     borderRadius: 16
//   },
//   content: {
//     padding: 12,
//     paddingTop:0,
//     gap: 0,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: colors.textSecondary,
//     maxWidth: 280
//   },
//   subtext: {
//     color: colors.subtext,
//     marginTop: -10,
//     maxWidth: 280
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems:"center"
//   },
//   iconRow: {
//     flexDirection: "row",
//     gap: 14,
//     marginTop: 10,
//   },
//   iconItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4
//   },
//   iconText: {
//     fontSize: 14,
//     color: colors.textSecondary,
//   },
//   saveButton: {
//     borderWidth: 1,
//     borderColor: colors.primary,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 999,
//     textAlign: "center",
//     marginTop:10
//   },
//   saveButtonActive: {
//     backgroundColor: colors.primary,
//     color: colors.white,
//   },
//   saveButtonInactive: {
//     backgroundColor: colors.white,
//     color: colors.primary,
//   }
// });


import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { EventItem } from "../types";
import { colors } from "../constants/colors";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleBookmark,
  selectBookmarkedIds,
} from "../features/events/eventsSlice";

import DollarIcon from "../assets/icons/DollarIcon";
import TimeIcon from "../assets/icons/TimeIcon";

export default function EventCard({ event }: { event: EventItem }) {
  const router = useRouter();
  const dispatch = useDispatch();
  
  // bm is now Record<string, string[]> (ID mapped to Notification IDs)
  const bm = useSelector(selectBookmarkedIds);
  const saved = !!bm[event.id];

  const date = new Date(event.dateISO);
  const timeString = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  const handleToggleSave = async () => {
    // Dynamic import of utilities to keep initial bundle light
    const { 
      scheduleEventReminders, 
      cancelEventReminders, 
      triggerBookmarkNotification 
    } = await import("../utils/NotificationsHandler");

    if (!saved) {
      /**
       * ACTION: SAVE EVENT
       * 1. Schedule native notifications and retrieve the generated IDs.
       * 2. Store both the event ID and notification IDs in Redux.
       * 3. Trigger immediate feedback notification.
       */
      const notificationIds = await scheduleEventReminders(event.title, event.dateISO);
      
      dispatch(toggleBookmark({ id: event.id, notificationIds }));

      await triggerBookmarkNotification(event.title);
      
    } else {
      /**
       * ACTION: UNSAVE EVENT
       * 1. Retrieve current notification IDs from Redux state.
       * 2. Tell the OS to cancel those specific scheduled alerts.
       * 3. Remove event from Redux state.
       */
      const existingIds = bm[event.id];

      if (existingIds && Array.isArray(existingIds)) {
        await cancelEventReminders(existingIds);
      }

      dispatch(toggleBookmark({ id: event.id }));
    }
  };

  return (
    <Pressable
      onPress={() => router.push(`/event/${event.id}`)}
      style={styles.card}
    >
      <Image source={{ uri: event.image }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.title} numberOfLines={1}>{event.title}</Text>

          <Pressable
            onPress={(e) => {
              e.stopPropagation(); // Stop navigation to detail screen
              handleToggleSave();
            }}
          >
            <Text
              style={[
                styles.saveButton,
                saved ? styles.saveButtonActive : styles.saveButtonInactive,
              ]}
            >
              {saved ? "Saved" : "Save"}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.subtext} numberOfLines={1}>
          {event.venue} • {date.toLocaleDateString()}
        </Text>

        <View style={styles.iconRow}>
          <View style={styles.iconItem}>
            <DollarIcon size={16} />
            <Text style={styles.iconText}>
              {event.price ? event.price : "N/A"}
            </Text>
          </View>

          <View style={styles.iconItem}>
            <TimeIcon size={16} />
            <Text style={styles.iconText}>{timeString}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 14,
  },
  image: {
    width: "100%",
    height: 140,
    borderRadius: 16
  },
  content: {
    padding: 12,
    paddingTop:0,
    gap: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textSecondary,
    maxWidth: 280
  },
  subtext: {
    color: colors.subtext,
    marginTop: -10,
    maxWidth: 280
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center"
  },
  iconRow: {
    flexDirection: "row",
    gap: 14,
    marginTop: 10,
  },
  iconItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  iconText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  saveButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    textAlign: "center",
    marginTop:10
  },
  saveButtonActive: {
    backgroundColor: colors.primary,
    color: colors.white,
  },
  saveButtonInactive: {
    backgroundColor: colors.white,
    color: colors.primary,
  }
});
