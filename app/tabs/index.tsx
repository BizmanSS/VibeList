import { View, Text, FlatList } from "react-native";
import { global } from "../../styles/global";
import { useSelector } from "react-redux";
import { selectAllEvents } from "../../features/events/eventsSlice";
import EventCard from "../../components/EventCard";

export default function Home() {
  const events = useSelector(selectAllEvents);
  return (
    <View style={global.screen}>
      <Text style={global.h1}>Discover</Text>
      <FlatList
        data={events}
        keyExtractor={(e) => e.id}
        renderItem={({ item }) => <EventCard event={item} />}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}