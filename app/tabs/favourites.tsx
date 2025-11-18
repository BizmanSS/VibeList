import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { global } from "../../styles/global";
import { useRouter } from "expo-router";
import {
  selectAllEvents,
  selectBookmarkedIds,
} from "../../features/events/eventsSlice";
import EventCard from "../../components/EventCard";

import EmptyBoxIcon from "../../assets/icons/EmptyBox";
import { colors } from "../../constants/colors";

export default function Favourites() {
  const events = useSelector(selectAllEvents);
  const bm = useSelector(selectBookmarkedIds);
  const router = useRouter();

  const favs = events.filter((e) => bm[e.id]);


  if (favs.length === 0) {
    return (
      <View style={[global.screen, styles.emptyContainer]}>
        <Text style={global.h1}>Favourites</Text>

        <View style={styles.emptyContent}>
          <EmptyBoxIcon size={140} />

          <Text style={styles.emptyText}>
            Looks like your VibeList is empty,
          </Text>
          <Text style={styles.emptyText2}>
            discover some events near you!
          </Text>

          <Pressable
            style={styles.exploreButton}
            onPress={() => router.push("/tabs")}
          >
            <Text style={styles.exploreText}>Explore Events</Text>
          </Pressable>
        </View>
      </View>
    );
  }


  return (
    <View style={global.screen}>
      <Text style={global.h1}>Favourites</Text>

      <FlatList
        data={favs}
        keyExtractor={(e) => e.id}
        renderItem={({ item }) => <EventCard event={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
  },

  emptyContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    marginTop: -40,
  },

  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4C4D56",
    marginTop: 20,
    textAlign: "center",
  },

  emptyText2: {
    fontSize: 16,
    color: "#4C4D56",
    opacity: 0.8,
    marginBottom: 30,
    textAlign: "center",
  },

  exploreButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
  },

  exploreText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
