import { View, Text } from "react-native";
import { global } from "../../styles/global";
export default function Profile() {
  return (
    <View style={global.screen}>
      <Text style={global.h1}>Profile</Text>
      <Text>Auth to be integrated later (Firebase OAuth or email/password).</Text>
    </View>
  );
}