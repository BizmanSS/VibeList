import { View, Text, Image, Switch, StyleSheet } from "react-native";
import { useState } from "react";
import { global } from "../../styles/global";
import { colors } from "../../constants/colors";

export default function Profile() {
  // Mock user for now
  const user = {
    name: "John Doe",
    avatar: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
  };

  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={[global.screen, styles.center]}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />

      <Text style={styles.name}>{user.name}</Text>

      <View style={styles.spacer} />

      <View style={styles.settingsCard}>
        <View style={styles.settingsRow}>
          <Text style={styles.settingLabel}>Dark Mode (local only)</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: "#bbb", true: colors.primary }}
            thumbColor={darkMode ? colors.white : "#f4f3f4"}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 999,
    marginBottom: 16,
    borderWidth: 2
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
  },

  spacer: {
    height: 40,
  },

  settingsCard: {
    width: "100%",
    padding: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },

  settingsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  settingLabel: {
    fontSize: 16,
    color: colors.text,
  },
});