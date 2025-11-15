import { View, Text, Image, Pressable } from "react-native";
import { EventItem } from "../types";
import { colors } from "../constants/colors";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { toggleBookmark, selectBookmarkedIds } from "../features/events/eventsSlice";

export default function EventCard({ event }: { event: EventItem }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const bm = useSelector(selectBookmarkedIds);
  const saved = !!bm[event.id];

  return (
    <Pressable
      onPress={() => router.push(`/event/${event.id}`)}
      style={{ backgroundColor: colors.card, borderRadius: 16, overflow: "hidden", marginBottom: 14, borderWidth: 1, borderColor: colors.border }}
    >
      <Image source={{ uri: event.image }} style={{ width: "100%", height: 140 }} />
      <View style={{ padding: 12, gap: 6 }}>
        <Text style={{ fontSize: 16, fontWeight: "600", color: colors.text }}>{event.title}</Text>
        <Text style={{ color: colors.subtext }}>{event.venue} • {new Date(event.dateISO).toLocaleDateString()}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
          <Text style={{ color: colors.text }}>{event.price ? `$${event.price}` : "Free"}</Text>
          <Text
            onPress={(e)=>{ e.preventDefault(); dispatch(toggleBookmark(event.id)); }}
            style={{ color: saved ? colors.white : colors.primary, backgroundColor: saved ? colors.primary : colors.white,
                     borderWidth: 1, borderColor: colors.primary, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 }}>
            {saved ? "Saved" : "Save"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}