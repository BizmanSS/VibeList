// app/auth/signup.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { auth, db } from "../../services/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "expo-router";
import { colors } from "../../constants/colors";

const SignupScreen: React.FC = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!firstName || !lastName || !username || !gender || !email || !password) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    try {
      const q = query(collection(db, "users"), where("username", "==", username));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        Alert.alert("Username taken", "Please choose a different username.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        username,
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
      {/* TOP TITLE AREA (image visible like login page) */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subTitle}>Create your VibeList account</Text>
      </View>

      {/* WHITE ROUNDED CONTAINER */}
      <KeyboardAvoidingView
        style={{ flex: 1, width: "100%" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <View style={styles.formWrapper}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* FIRST NAME */}
            <Text style={styles.label}>First Name</Text>
            <TextInput
              placeholder="John"
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholderTextColor="#BEC3D2"
            />

            {/* LAST NAME */}
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              placeholder="Doe"
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholderTextColor="#BEC3D2"
            />

            {/* USERNAME */}
            <Text style={styles.label}>Username</Text>
            <TextInput
              placeholder="johndoe123"
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholderTextColor="#BEC3D2"
            />

            {/* GENDER */}
            <Text style={styles.label}>Gender</Text>
            <TextInput
              placeholder="Male / Female / Other"
              style={styles.input}
              value={gender}
              onChangeText={setGender}
              placeholderTextColor="#BEC3D2"
            />

            {/* EMAIL */}
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="example@gmail.com"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#BEC3D2"
            />

            {/* PASSWORD */}
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="●●●●●●●●●"
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#BEC3D2"
            />

            {/* BUTTON */}
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* BACK TO LOGIN */}
            <View style={styles.loginRow}>
              <Text style={styles.loginText}>Already have a VibeList account? </Text>
              <Text
                style={styles.loginLink}
                onPress={() => router.replace("/auth/login")}
              >
                Log in
              </Text>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default SignupScreen;

// ------------------- STYLES -------------------

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },

  /* TOP IMAGE ZONE (like login page) */
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

  /* WHITE ROUNDED FORM CONTAINER */
  formWrapper: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 30,
  },

  scrollContent: {
    paddingBottom: 40,
  },

  label: {
    fontSize: 16,
    color: "#4C4D56",
    marginBottom: 10,
  },

  input: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 7,
    backgroundColor: "#F0F5FB",
    color: "#4C4D56",
  },

  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginTop: 30,
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
