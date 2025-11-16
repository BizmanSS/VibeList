import { View, Text, FlatList } from "react-native";
import { global } from "../../styles/global";
import { useSelector } from "react-redux";
import { selectAllEvents } from "../../features/events/eventsSlice";
import EventCard from "../../components/EventCard";
import LocationSelector from "../../components/LocationSelector";

export default function Home() {
  const events = useSelector(selectAllEvents);
  return (
    <View style={global.screen}>
      <LocationSelector />
      <Text style={global.h1}>Discover</Text>
      <FlatList
        data={events}
        keyExtractor={(e) => e.id}
        renderItem={({ item }) => <EventCard event={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}