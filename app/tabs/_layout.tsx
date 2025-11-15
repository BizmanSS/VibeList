import { Tabs } from "expo-router";
import { colors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarStyle: {
          height: 55,
        },
    }}>
      <Tabs.Screen name="index" options={{
        title: "Home",
        tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />
      }}/>
      <Tabs.Screen name="favourites" options={{
        title: "Favourites",
        tabBarIcon: ({ color, size }) => <Ionicons name="heart-outline" color={color} size={size} />
      }}/>
      <Tabs.Screen name="profile" options={{
        title: "Profile",
        tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" color={color} size={size} />
      }}/>
    </Tabs>
  );
}