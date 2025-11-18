import React, { useState } from "react";
import { View, Text, Modal, Pressable, StyleSheet, Image } from "react-native";
import { colors } from "../constants/colors";
import { useLocation } from "../hooks/useLocation";
import LocationIcon from "../assets/icons/LocationIcon";

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
          <View style={styles.locationIcon}>
            <LocationIcon />
          </View>
          <View>
            <Text style={styles.subLabel}>LOCATION</Text>
            <Text style={styles.label}>{city}</Text>
          </View>
        </View>
      </Pressable>

      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Select Location</Text>

            <View style={styles.optionRow}>
              {/* TORONTO */}
              <Pressable style={styles.option} onPress={() => select("Toronto")}>
                <Image
                  source={require("../assets/icons/Toronto.png")}
                  style={[
                    styles.cityImage,
                    city === "Toronto" && styles.selectedImage,
                  ]}
                />
                <Text
                  style={[
                    styles.cityLabel,
                    city === "Toronto" && styles.selectedLabel,
                  ]}
                >
                  Toronto
                </Text>
                {city === "Toronto" && <View style={styles.underline} />}
              </Pressable>

              <View style={styles.divider} />

              {/* VANCOUVER */}
              <Pressable style={styles.option} onPress={() => select("Vancouver")}>
                <Image
                  source={require("../assets/icons/Vancouver.png")}
                  style={[
                    styles.cityImage,
                    city === "Vancouver" && styles.selectedImage,
                  ]}
                />
                <Text
                  style={[
                    styles.cityLabel,
                    city === "Vancouver" && styles.selectedLabel,
                  ]}
                >
                  Vancouver
                </Text>
                {city === "Vancouver" && <View style={styles.underline} />}
              </Pressable>
            </View>

            <Pressable style={styles.cancel} onPress={() => setVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 10, marginTop: 10 },

  label: { fontSize: 16, color: colors.text },
  subLabel: { color: colors.primary, fontSize: 12, fontWeight: "700" },

  locationBox: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 200,
    backgroundColor: colors.warmGrey,
    justifyContent: "center",
    alignItems: "center",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  modalBox: {
    backgroundColor: colors.white,
    padding: 25,
    borderRadius: 20,
    width: "100%",
    maxWidth: 360,
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 25,
    color: colors.text,
  },

  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },

  option: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    position: "relative",
  },

  divider: {
    width: 1,
    height: 80,
    backgroundColor: "#E5E5E5",
    marginHorizontal: 10,
  },

  cityImage: {
    width: 70,
    height: 70,
    marginBottom: 8,
    resizeMode: "contain",
    opacity: 0.65,
  },

  selectedImage: {
    opacity: 1,
  },

  cityLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
    opacity: 0.65,
  },

  selectedLabel: {
    fontWeight: "700",
    opacity: 1,
  },

  underline: {
    width: 40,
    height: 2.5,
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginTop: 6,
  },

  cancel: {
    marginTop: 15,
    paddingVertical: 8,
  },

  cancelText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
});
