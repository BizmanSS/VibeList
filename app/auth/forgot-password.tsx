// app/auth/forgot-password.tsx
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ImageBackground, KeyboardAvoidingView, Platform, } from "react-native";
import { auth } from "../../services/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "expo-router";
import { colors } from "../../constants/colors";

const ForgotPasswordScreen: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Success", "Password reset email sent!");
      router.replace("/auth/login");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/authBackground.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* TOP SECTION (same as login/signup) */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subTitle}>
          Reset your VibeList account password
        </Text>
      </View>

      {/* WHITE ROUNDED CONTAINER */}
      <KeyboardAvoidingView
        style={{ flex: 1, width: "100%" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <View style={styles.formContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="example@gmail.com"
            placeholderTextColor="#BEC3D2"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity style={styles.button} onPress={handleReset}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Remembered your password? </Text>
            <Text
              style={styles.loginLink}
              onPress={() => router.replace("/auth/login")}
            >
              Log in
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default ForgotPasswordScreen;

// -------------------- STYLES --------------------

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },

  titleContainer: {
    height: "28%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },

  title: {
    fontSize: 32,
    color: "white",
    fontWeight: "600",
  },

  subTitle: {
    fontSize: 16,
    color: "white",
    marginTop: 5,
    fontWeight: "100",
  },

  formContainer: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 30,
  },

  label: {
    fontSize: 16,
    color: "#4C4D56",
    marginBottom: 10,
  },

  input: {
    padding: 20,
    borderRadius: 7,
    backgroundColor: "#F0F5FB",
    color: "#4C4D56",
    marginBottom: 20,
  },

  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
  },

  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },

  loginText: {
    fontSize: 16,
    color: "#4C4D56",
  },

  loginLink: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "600",
  },
});