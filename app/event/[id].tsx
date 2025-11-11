import { View, Text, Image, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { selectEventById, toggleBookmark, selectBookmarkedIds } from "../../features/events/eventsSlice";
import { global } from "../../styles/global";
import { colors } from "../../constants/colors";

export default function EventDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch = useDispatch();
  const event = useSelector((st:any)=> selectEventById(st, id!));
  const bm = useSelector(selectBookmarkedIds);
  if (!event) return <View style={global.screen}><Text>Not found.</Text></View>;

  const isSaved = !!bm[event.id];

  return (
    <ScrollView style={global.screen}>
      <Image source={{ uri: event.image }} style={{ width: "100%", height: 220, borderRadius: 12 }} />
      <Text style={[global.h1, { marginTop: 12 }]}>{event.title}</Text>
      <Text style={{ color: colors.subtext, marginBottom: 10 }}>
        {event.venue} • {new Date(event.dateISO).toLocaleString()}
      </Text>
      <Text style={{ lineHeight: 20, color: colors.text }}>{event.description ?? ""}</Text>

      <View style={{ flexDirection: "row", gap: 12, marginTop: 16 }}>
        <Text onPress={()=>dispatch(toggleBookmark(event.id))}
              style={{ backgroundColor: colors.primary, color: colors.white, padding: 12, borderRadius: 10 }}>
          {isSaved ? "Saved ✓" : "Save"}
        </Text>
        <Text style={{ borderColor: colors.primary, borderWidth: 1, color: colors.primary, padding: 12, borderRadius: 10 }}>
          Share (stub)
        </Text>
      </View>
    </ScrollView>
  );
}