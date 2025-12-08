import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, ImageBackground } from "react-native";
import { auth } from "../../services/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useRouter } from "expo-router";
import {colors} from "../../constants/colors";

const LoginScreen: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        Alert.alert(
          "Email Not Verified",
          "Please verify your email before logging in."
        );
        await signOut(auth);
        return;
      }

      router.replace("/");
    } catch (error: any) {
      Alert.alert("Login Error", error.message);
    }
  };

  return (

    <ImageBackground
    source={require("../../assets/images/authBackground.jpg")}
    style={styles.background}
    resizeMode="cover"
    >

    <View style={styles.titleContainer}>
    <Text style={styles.title}>Log In</Text>
    <Text style={styles.subTitle}>Please sign in to your VibeList account</Text>
    </View>

    <View style={styles.container}>
      <Text style={styles.text}>Email</Text>
      <TextInput
        placeholder="example@gmail.com"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#BEC3D2"
      />

      <Text style={styles.text}>Password</Text>
      <TextInput
        placeholder="●●●●●●●●●"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#BEC3D2"
      />
      <TouchableOpacity onPress={() => router.push("/auth/forgot-password")}>
        <Text style={styles.link}>Forgot Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <View style={styles.signupRow}>
        <Text style={styles.signupText}>New to VibeList? </Text>
        <Text
          style={styles.signupLink}
          onPress={() => router.push("/auth/signup")}
        >
          Sign up
        </Text>
      </View>
    </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  titleContainer:{
    height: "28%",
    display: "flex",
    justifyContent:"center"
  },
  background: {
      flex: 1,
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },

  container: { flex: 1, padding: 25, backgroundColor: "white", width: "100%",
  borderTopLeftRadius: 30, borderTopRightRadius: 30},
  title: { fontSize: 32, marginBottom: 10, textAlign: "center", color:"white", fontWeight:"600", marginTop: 50 },
  subTitle:{ fontSize: 16, color: "white", fontWeight:"100"},
  text:{ fontSize: 16, marginBottom: 10, color:"#4C4D56" },
  input: { marginBottom: 15, padding: 20, borderRadius: 7,backgroundColor:"#F0F5FB" },
  link: { color: colors.primary, textAlign: "left", marginBottom:30, fontSize: 15 },
  button: {backgroundColor: colors.primary, borderRadius: 10,
  padding: 20, alignItems:"center"},
  buttonText:{fontSize: 16, color:"white", fontWeight:"500"},
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
  },

  signupText: {
    fontSize: 16,
    color:"#4C4D56"
  },

  signupLink: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "600",
  },
});
