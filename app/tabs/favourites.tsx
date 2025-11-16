import { View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { global } from "../../styles/global";
import { selectAllEvents, selectBookmarkedIds } from "../../features/events/eventsSlice";
import EventCard from "../../components/EventCard";

export default function Favourites() {
  const events = useSelector(selectAllEvents);
  const bm = useSelector(selectBookmarkedIds);
  const favs = events.filter(e => bm[e.id]);
  return (
    <View style={global.screen}>
      <Text style={global.h1}>Favourites</Text>
      <FlatList data={favs} keyExtractor={(e)=>e.id} renderItem={({item})=> <EventCard event={item} />} 
      showsVerticalScrollIndicator={false}/>
    </View>
  );
}