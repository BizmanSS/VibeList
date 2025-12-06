import { View, Text, FlatList } from "react-native";
import { global } from "../../styles/global";
import { useSelector } from "react-redux";
import { selectAllEvents } from "../../features/events/eventsSlice";
import EventCard from "../../components/EventCard";
import LocationSelector from "../../components/LocationSelector";
import { useLocation } from "../../hooks/useLocation";

export default function Home() {
  const events = useSelector(selectAllEvents);
  const { city, updateCity } = useLocation();

  const filteredEvents = events.filter((e) => !city || e.city === city);

  return (
    <View style={global.screen}>
      <LocationSelector city={city} onChange={updateCity} />
      <Text style={global.h1}>Discover</Text>
      <FlatList
        data={filteredEvents}
        keyExtractor={(e) => e.id}
        renderItem={({ item }) => <EventCard event={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}