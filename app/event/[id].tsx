import { View, Text, Image, ScrollView, StyleSheet, Pressable, Linking, Share } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import {
  selectEventById,
  toggleBookmark,
  selectBookmarkedIds,
} from "../../features/events/eventsSlice";
import { colors } from "../../constants/colors";

import DollarIcon from "../../assets/icons/DollarIcon";
import TimeIcon from "../../assets/icons/TimeIcon";

export default function EventDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch = useDispatch();
  const router = useRouter();

  const event = useSelector((st: any) => selectEventById(st, id!));
  const bm = useSelector(selectBookmarkedIds);

  if (!event)
    return (
      <View style={styles.screen}>
        <Text>Not found.</Text>
      </View>
    );

  const isSaved = !!bm[event.id];

  const safeBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/tabs");
  };

  const date = new Date(event.dateISO);

  const shareEvent = () => {
    Share.share({
      message: `${event.title}\n${event.venue}\n${date.toLocaleString()}`,
    });
  };

  const openLink = () => {
    if (event.externalLink) Linking.openURL(event.externalLink);
  };

  const timeString = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 140 }}>
        <View style={styles.imageBackground}>
          <Text style={styles.backButton} onPress={safeBack}>
            &lt;
          </Text>

          <Image source={{ uri: event.image }} style={styles.image} />
        </View>

        <View style={styles.content}>

        <Text style={styles.title}>{event.title}</Text>

        <Text style={styles.subtitle}>
          {event.venue} •{` `}
          {date.toLocaleDateString()}
        </Text>

        <View style={styles.iconRow}>
          <View style={styles.iconItem}>
            <DollarIcon size={22} />
            <Text style={styles.iconText}>{event.price ? event.price : "Free"}</Text>
          </View>

          <View style={styles.iconItem}>
            <TimeIcon size={22} />
            <Text style={styles.iconText}>{timeString}</Text>
          </View>
        </View>

        <Text style={styles.description}>{event.description ?? ""}</Text>


        <View style={styles.buttonRow}>
          <Pressable style={styles.checkoutButton} onPress={openLink}>
            <Text style={styles.checkoutText}>Check Out Event</Text>
          </Pressable>

          <Pressable style={styles.shareButton} onPress={shareEvent}>
            <Text style={styles.shareIcon}>⤴︎</Text>
          </Pressable>
        </View>
        </View>
      </ScrollView>

      <Pressable
        style={styles.floatingSave}
        onPress={() => dispatch(toggleBookmark(event.id))}
      >
        <Text style={styles.floatingSaveText}>
          {isSaved ? "Saved ✓" : "Save to Favorites"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 0,
    backgroundColor: colors.bg,
  },

  content: {
    padding: 20,
    paddingTop: 15
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginTop: 20,
  },

  imageBackground: {
    backgroundColor: "#f7a554ff",
    padding: 15,
    paddingBottom: 25,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 20,
  },

  backButton: {
    fontWeight: "600",
    color: "black",
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 24,
    textAlign: "center",
    fontSize: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textSecondary,
    marginTop: 12,
  },

  subtitle: {
    color: colors.subtext,
    marginBottom: 20,
    marginTop:5
  },

  description: {
    lineHeight: 20,
    color: colors.text,
    marginBottom: 16,
  },

  iconRow: {
    flexDirection: "row",
    gap: 18,
    marginBottom: 18,
  },

  iconItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  iconText: {
    color: colors.textSecondary,
    fontSize: 16
  },

  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  checkoutButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  checkoutText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },

  shareButton: {
    width: 55,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  shareIcon: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: "700",
  },

  floatingSave: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: "center",
  },

  floatingSaveText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
});
