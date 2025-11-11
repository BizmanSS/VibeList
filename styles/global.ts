import { StyleSheet } from "react-native";
import { colors } from "../constants/colors";

export const global = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  h1: { fontSize: 24, fontWeight: "700", color: colors.text, marginBottom: 12 }
});