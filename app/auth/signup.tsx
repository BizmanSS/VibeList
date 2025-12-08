import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, } from "react-native";
import { auth, db } from "../../services/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification, signOut, } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "expo-router";
import { colors } from "../../constants/colors";

const SignupScreen: React.FC = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!firstName || !lastName || !gender || !email || !password) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        gender,
        email,
        createdAt: new Date(),
      });

      await signOut(auth);
      await sendEmailVerification(user);

      Alert.alert(
        "Verify Your Email",
        "A verification email has been sent. Please check your inbox before logging in."
      );

      router.replace("/auth/login");
    } catch (error: any) {
      Alert.alert("Signup Error", error.message);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/authBackground.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subTitle}>Create your VibeList account</Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1, width: "100%" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <View style={styles.formWrapper}>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>First Name</Text>
            <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} placeholder="John" placeholderTextColor="#BEC3D2" />

            <Text style={styles.label}>Last Name</Text>
            <TextInput style={styles.input} value={lastName} onChangeText={setLastName} placeholder="Doe" placeholderTextColor="#BEC3D2" />

            <Text style={styles.label}>Gender</Text>
            <TextInput style={styles.input} value={gender} onChangeText={setGender} placeholder="Male / Female / Other" placeholderTextColor="#BEC3D2" />

            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="example@gmail.com" placeholderTextColor="#BEC3D2" />

            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} secureTextEntry value={password} onChangeText={setPassword} placeholder="●●●●●●●●●" placeholderTextColor="#BEC3D2" />

            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.loginRow}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <Text style={styles.loginLink} onPress={() => router.replace("/auth/login")}>Log in</Text>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%", alignItems: "center" },
  titleContainer: { height: "28%", justifyContent: "center", alignItems: "center", paddingTop: 40 },
  title: { fontSize: 32, color: "white", fontWeight: "600" },
  subTitle: { fontSize: 16, color: "white", marginTop: 5, fontWeight: "100" },
  formWrapper: { flex: 1, backgroundColor: "white", width: "100%", borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 25, paddingTop: 30 },
  scrollContent: { paddingBottom: 40 },
  label: { fontSize: 16, color: "#4C4D56", marginBottom: 10 },
  input: { marginBottom: 20, padding: 20, borderRadius: 7, backgroundColor: "#F0F5FB", color: "#4C4D56" },
  button: { backgroundColor: colors.primary, borderRadius: 10, padding: 20, alignItems: "center", marginTop: 30 },
  buttonText: { fontSize: 16, color: "white", fontWeight: "500" },
  loginRow: { flexDirection: "row", justifyContent: "center", marginTop: 30 },
  loginText: { fontSize: 16, color: "#4C4D56" },
  loginLink: { fontSize: 16, color: colors.primary, fontWeight: "600" },
});