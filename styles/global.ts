import { Platform, StyleSheet } from "react-native";
import { colors } from "../constants/colors";

export const global = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 20,
    paddingTop: 35,
    paddingBottom: 0
  },
  h1: {
    fontSize: 22,
    fontWeight: "400",
    color: colors.text,
    marginBottom: 12,
    fontFamily: "System",
  },
  text: {
    fontSize: 15,
    fontWeight: "400",
    color: colors.text,
    fontFamily: "System",
  }
});