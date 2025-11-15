import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet, Linking, Image } from "react-native";
import { signOut } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Event } from "../types";

type HomeProps = {
  onLogout: () => void;
  onNavigate: (screen: "Profile") => void;
};

const Home: React.FC<HomeProps> = ({ onLogout, onNavigate }) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "events"), (snapshot) => {
      const eventList: Event[] = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Event[];

      eventList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      setEvents(eventList);
    });

    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    onLogout();
  };

  const renderItem = ({ item }: { item: Event }) => (
    <View style={styles.eventCard}>
      {item.image ? <Image source={{ uri: item.image }} style={styles.image} /> : null}
      <Text style={styles.title}>{item.title}</Text>
      <Text>{new Date(item.date).toLocaleString()}</Text>
      <Text>{item.location}</Text>
      <Text>{item.price}</Text>
      <Text>{item.description}</Text>
      <Text style={styles.link} onPress={() => Linking.openURL(item.link)}>
        View Details
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Events</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <Button title="Profile" onPress={() => onNavigate("Profile")} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  eventCard: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#fafafa",
  },
  title: { fontSize: 20, fontWeight: "bold", marginTop: 5 },
  link: { color: "blue", marginTop: 5 },
  image: { width: "100%", height: 180, borderRadius: 8, marginBottom: 10 },
});
