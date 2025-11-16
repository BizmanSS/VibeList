import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  Switch,
} from "react-native";
import { useEffect, useState } from "react";
import { global } from "../../styles/global";
import { colors } from "../../constants/colors";
import { auth, db } from "../../services/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
  signOut,
} from "firebase/auth";
import { useRouter } from "expo-router";

type ProfileData = {
  firstName?: string;
  lastName?: string;
  username?: string;
  gender?: string;
  email?: string;
};

export default function Profile() {
  const router = useRouter();

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  // profile fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");

  // edit state
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // change password state
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  // delete + theme state
  const [deleting, setDeleting] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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
          setUsername(data.username ?? "");
          setGender(data.gender ?? "");
          setEmail(data.email ?? user.email ?? "");
        } else {
          // fallback to auth info only
          setEmail(user.email ?? "");
        }
      } catch (err) {
        console.error("Error loading profile:", err);
        Alert.alert("Error", "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSaveProfile = async () => {
    if (!firstName || !lastName || !username || !gender) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    setSaving(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No authenticated user");

      // username uniqueness check if changed
      if (profile && username !== profile.username) {
        const q = query(
          collection(db, "users"),
          where("username", "==", username)
        );
        const snap = await getDocs(q);
        if (!snap.isEmpty) {
          Alert.alert("Error", "Username already taken");
          setSaving(false);
          return;
        }
      }

      await updateDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        username,
        gender,
      });

      const updated: ProfileData = {
        firstName,
        lastName,
        username,
        gender,
        email,
      };
      setProfile(updated);
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

      Alert.alert("Success", "Password changed");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordSection(false);
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
    Alert.alert(
      "Confirm Deletion",
      "Are you sure? This cannot be undone.",
      [
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
      ]
    );
  };

  if (loading) {
    return (
      <View style={[global.screen, styles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const displayName =
    firstName || lastName ? `${firstName} ${lastName}`.trim() : "Guest User";

  const usernameTag = username ? `@${username}` : "";

  const avatarUrl =
    "https://cdn-icons-png.flaticon.com/512/847/847969.png"; // keep your avatar

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        style={global.screen}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER: avatar + name + username */}
        <View style={styles.headerCenter}>
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          <Text style={styles.name}>{displayName}</Text>
          {!!usernameTag && (
            <Text style={styles.usernameTag}>{usernameTag}</Text>
          )}
        </View>

        {/* PROFILE INFO CARD */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Profile Info</Text>
            <Text
              style={styles.editLink}
              onPress={() => setIsEditing((prev) => !prev)}
            >
              {isEditing ? "Cancel" : "Edit"}
            </Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            editable={isEditing}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            editable={isEditing}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            editable={isEditing}
          />
          <TextInput
            style={styles.input}
            placeholder="Gender"
            value={gender}
            onChangeText={setGender}
            editable={isEditing}
          />
          <TextInput
            style={[styles.input, styles.readonlyInput]}
            value={email}
            editable={false}
          />

          {isEditing && (
            <Button
              title={saving ? "Saving..." : "Save Profile"}
              onPress={handleSaveProfile}
              disabled={saving}
            />
          )}
        </View>

        {/* CHANGE PASSWORD CARD */}
        <View style={styles.card}>
          <Text
            style={styles.cardTitle}
            onPress={() => setShowPasswordSection((prev) => !prev)}
          >
            Change Password {showPasswordSection ? "▲" : "▼"}
          </Text>

          {showPasswordSection && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Current Password"
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
              />
              <TextInput
                style={styles.input}
                placeholder="New Password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm New Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <Button
                title={changingPassword ? "Changing..." : "Update Password"}
                onPress={handleChangePassword}
                disabled={changingPassword}
              />
            </>
          )}
        </View>

        {/* THEME TOGGLE CARD */}
        <View style={styles.card}>
          <View style={styles.settingsRow}>
            <Text style={styles.settingLabel}>Dark Theme</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: "#bbb", true: colors.primary }}
              thumbColor={darkMode ? colors.white : "#f4f3f4"}
            />
          </View>
        </View>

        {/* LOGOUT + DELETE CARD */}
        <View style={styles.card}>
          <Button title="Logout" onPress={handleLogout} />
          <View style={{ height: 12 }} />
          <Button
            title={deleting ? "Deleting..." : "Delete Account"}
            color="#FF3B30"
            onPress={handleDeleteAccount}
            disabled={deleting}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 10,
    paddingBottom: 32,
  },

  headerCenter: {
    alignItems: "center",
    marginBottom: 24,
  },

  center: {
    alignItems: "center",
    justifyContent: "center",
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 999,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: colors.border,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
  },

  usernameTag: {
    marginTop: 4,
    fontSize: 14,
    color: colors.subtext,
  },

  card: {
    width: "100%",
    padding: 10,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },

  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },

  editLink: {
    fontSize: 14,
    color: colors.primary,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: colors.white,
    color: colors.text,
  },

  readonlyInput: {
    backgroundColor: "#f3f4f6",
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
