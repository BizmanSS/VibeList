import React, { useState } from "react";
import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import { useLocation } from "../hooks/useLocation";
import LocationIcon from '../assets/icons/LocationIcon'

export default function LocationSelector() {
  const { city, updateCity } = useLocation();
  const [visible, setVisible] = useState(false);

  const select = async (newCity: string) => {
    await updateCity(newCity);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setVisible(true)}>
      <View style={styles.locationBox}>
        <View style={styles.locationIcon}><LocationIcon /></View> 
        <Text style={styles.label}>{city}</Text>
      </View>
      </Pressable>

      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Select Location</Text>

            <Pressable onPress={() => select("Toronto")} style={styles.option}>
              <Text>Toronto</Text>
            </Pressable>

            <Pressable onPress={() => select("Vancouver")} style={styles.option}>
              <Text>Vancouver</Text>
            </Pressable>

            <Pressable onPress={() => setVisible(false)} style={styles.cancel}>
              <Text style={{ color: colors.primary }}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 10, marginTop:10 },
  label: { fontSize: 16, fontWeight: "600", color: colors.primary },
  modalOverlay: {
    flex: 1, backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center", alignItems: "center"
  },
  modalBox: {
    backgroundColor: colors.white, padding: 20, borderRadius: 12, width: 250,
    alignItems: "center", gap: 10
  },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
  option: {
    padding: 10, backgroundColor: colors.bg, borderRadius: 8, width: "100%", alignItems: "center"
  },
  cancel: { marginTop: 8 },
  locationIcon: {width: 40, height: 40, borderRadius: 200, backgroundColor: colors.warmGrey},
  locationBox: {display:"flex", gap: 10, flexDirection: "row", alignItems: "center"}
});