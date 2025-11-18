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
  const bm = useSelector(selectBookmarkedIds);
  const saved = !!bm[event.id];

  const date = new Date(event.dateISO);
  const timeString = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <Pressable
      onPress={() => router.push(`/event/${event.id}`)}
      style={styles.card}
    >
      <Image source={{ uri: event.image }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.title}>{event.title}</Text>

          <Text
            onPress={(e) => {
              e.preventDefault();
              dispatch(toggleBookmark(event.id));
            }}
            style={[
              styles.saveButton,
              saved ? styles.saveButtonActive : styles.saveButtonInactive,
            ]}
          >
            {saved ? "Saved" : "Save"}
          </Text>
        </View>

        <Text style={styles.subtext}>
          {event.venue} • {date.toLocaleDateString()}
        </Text>

        <View style={styles.iconRow}>
          <View style={styles.iconItem}>
            <DollarIcon size={16} />
            <Text style={styles.iconText}>
              {event.price ? event.price : "Free"}
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
  },

  subtext: {
    color: colors.subtext,
    marginTop: -10
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
  },

  price: {
    color: colors.text,
  },
});
