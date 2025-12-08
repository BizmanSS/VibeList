import { View, Text, Image, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator, Alert, Switch, TouchableOpacity, ImageBackground,} from "react-native";
import { useEffect, useState } from "react";
import { colors } from "../../constants/colors";
import { auth, db } from "../../services/firebase";
import { doc, getDoc, updateDoc, deleteDoc, } from "firebase/firestore";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider, deleteUser, signOut, } from "firebase/auth";
import { useRouter } from "expo-router";
import { useThemeMode } from "../context/ThemeContext";

type ProfileData = {
  firstName?: string;
  lastName?: string;
  gender?: string;
  email?: string;
};

export default function Profile() {
  const router = useRouter();
  const { theme, themeMode, toggleTheme } = useThemeMode();
  const darkMode = themeMode === "dark";

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data() as ProfileData;
          setProfile(data);

          setFirstName(data.firstName ?? "");
          setLastName(data.lastName ?? "");
          setGender(data.gender ?? "");
          setEmail(data.email ?? user.email ?? "");
        } else {
          setEmail(user.email ?? "");
        }
      } catch {
        Alert.alert("Error", "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSaveProfile = async () => {
    if (!firstName || !lastName || !gender) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    setSaving(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No authenticated user");

      await updateDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        gender,
      });

      setProfile({
        firstName,
        lastName,
        gender,
        email,
      });

      setIsEditing(false);
      Alert.alert("Success", "Profile updated");
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setChangingPassword(true);
    try {
      const user = auth.currentUser;
      if (!user || !user.email) throw new Error("User not found");

      const cred = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, cred);
      await updatePassword(user, newPassword);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordSection(false);

      Alert.alert("Success", "Password changed");
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setChangingPassword(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/auth/login");
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert("Confirm Deletion", "Are you sure? This cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            setDeleting(true);
            const user = auth.currentUser;
            if (!user) throw new Error("No authenticated user");

            await deleteDoc(doc(db, "users", user.uid));
            await deleteUser(user);

            Alert.alert("Deleted", "Your account has been removed");
            router.replace("/auth/login");
          } catch (err: any) {
            Alert.alert("Error", err.message);
          } finally {
            setDeleting(false);
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const displayName =
    firstName || lastName ? `${firstName} ${lastName}`.trim() : "Guest User";

  const avatarUrl = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

  return (
    <ImageBackground
      source={require("../../assets/images/profileWallpaper.webp")}
      style={[styles.background, { backgroundColor: theme.background }]}
      resizeMode="cover"
    >
      <View style={styles.titleContainer}>
        <Image
          source={{ uri: avatarUrl }}
          style={[
            styles.avatar,
            { borderColor: theme.avatarBorder },
          ]}
        />
        <Text style={[styles.title, { color: theme.titleText }]}>
          {displayName}
        </Text>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardWrapper}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <View
          style={[
            styles.formWrapper,
            { backgroundColor: theme.profileBackground },
          ]}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={[styles.label, { color: theme.text }]}>First Name</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.inputBackground,
                  color: theme.inputText,
                },
              ]}
              value={firstName}
              onChangeText={setFirstName}
              editable={isEditing}
              placeholder="First Name"
              placeholderTextColor={theme.placeholder}
            />

            <Text style={[styles.label, { color: theme.text }]}>Last Name</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.inputBackground,
                  color: theme.inputText,
                },
              ]}
              value={lastName}
              onChangeText={setLastName}
              editable={isEditing}
              placeholder="Last Name"
              placeholderTextColor={theme.placeholder}
            />

            <Text style={[styles.label, { color: theme.text }]}>Gender</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.inputBackground,
                  color: theme.inputText,
                },
              ]}
              value={gender}
              onChangeText={setGender}
              editable={isEditing}
              placeholder="Gender"
              placeholderTextColor={theme.placeholder}
            />

            <Text style={[styles.label, { color: theme.text }]}>Email</Text>
            <TextInput
              style={[
                styles.input,
                styles.readonlyInput,
                {
                  backgroundColor: theme.inputBackground,
                  color: theme.inputText,
                },
              ]}
              value={email}
              editable={false}
              placeholderTextColor={theme.placeholder}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsEditing((prev) => !prev)}
            >
              <Text style={styles.buttonText}>
                {isEditing ? "Cancel" : "Edit Profile"}
              </Text>
            </TouchableOpacity>

            {isEditing && (
              <TouchableOpacity
                style={[styles.button, saving && styles.buttonDisabled]}
                onPress={saving ? undefined : handleSaveProfile}
              >
                <Text style={styles.buttonText}>
                  {saving ? "Saving..." : "Save Changes"}
                </Text>
              </TouchableOpacity>
            )}

            <View
              style={[
                styles.sectionDivider,
                { backgroundColor: theme.divider },
              ]}
            />

            <View style={styles.themeRow}>
              <Text style={[styles.label, { color: theme.text }]}>
                Dark Theme
              </Text>
              <Switch
                value={darkMode}
                onValueChange={toggleTheme}
                trackColor={{
                  false: theme.switchTrackOff,
                  true: colors.primary,
                }}
                thumbColor={darkMode ? colors.white : theme.switchThumbOff}
              />
            </View>

            <View
              style={[
                styles.sectionDivider,
                { backgroundColor: theme.divider },
              ]}
            />

            <TouchableOpacity
              onPress={() => setShowPasswordSection((prev) => !prev)}
              style={styles.passwordToggle}
            >
              <Text
                style={[
                  styles.passwordToggleText,
                  { color: theme.text },
                ]}
              >
                Change Password
              </Text>
              <Text style={[styles.passwordArrow, { color: theme.text }]}>
                {showPasswordSection ? "▲" : "▼"}
              </Text>
            </TouchableOpacity>

            {showPasswordSection && (
              <View
                style={[
                  styles.passwordBox,
                  { backgroundColor: theme.passwordBoxBackground },
                ]}
              >
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.inputBackground,
                      color: theme.inputText,
                    },
                  ]}
                  placeholder="Current Password"
                  secureTextEntry
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  placeholderTextColor={theme.placeholder}
                />

                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.inputBackground,
                      color: theme.inputText,
                    },
                  ]}
                  placeholder="New Password"
                  secureTextEntry
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholderTextColor={theme.placeholder}
                />

                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.inputBackground,
                      color: theme.inputText,
                    },
                  ]}
                  placeholder="Confirm New Password"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholderTextColor={theme.placeholder}
                />

                <TouchableOpacity
                  style={[
                    styles.button,
                    changingPassword && styles.buttonDisabled,
                  ]}
                  onPress={changingPassword ? undefined : handleChangePassword}
                >
                  <Text style={styles.buttonText}>
                    {changingPassword ? "Updating..." : "Update Password"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.deleteButton,
                { backgroundColor: theme.danger },
                deleting && styles.buttonDisabled,
              ]}
              onPress={deleting ? undefined : handleDeleteAccount}
            >
              <Text style={styles.deleteText}>
                {deleting ? "Deleting..." : "Delete Account"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  keyboardWrapper: {
    flex: 1,
    width: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    height: "28%",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 55,
    borderWidth: 2,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },


  formWrapper: {
    flex: 1,
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
    marginBottom: 10,
  },
  input: {
    marginBottom: 20,
    padding: 18,
    borderRadius: 7,
  },
  readonlyInput: {
    opacity: 0.6,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 18,
    alignItems: "center",
    marginTop: 40,
    width: 200,
    marginLeft: "auto",
    marginRight: "auto"
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
  },
  themeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
    paddingRight: 10,
  },
  sectionDivider: {
    height: 1,
    marginVertical: 20,
  },
  passwordToggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10
  },
  passwordToggleText: {
    fontSize: 18,
    fontWeight: "600",
  },
  passwordArrow: {
    fontSize: 16,
  },
  passwordBox: {
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
  },
  deleteButton: {
    borderRadius: 10,
    padding: 18,
    alignItems: "center",
    marginTop: 20,
    width: 200,
    marginLeft: "auto",
    marginRight: "auto"
  },
  deleteText: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
});