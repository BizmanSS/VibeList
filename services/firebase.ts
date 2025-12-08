import { initializeApp } from "firebase/app";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, browserLocalPersistence, indexedDBLocalPersistence } from "firebase/auth";
import { Platform } from "react-native";

const extra = Constants.expoConfig?.extra;
if (!extra) throw new Error("Missing extra config!");

const firebaseConfig = {
  apiKey: extra.API_KEY,
  authDomain: extra.AUTH_DOMAIN,
  projectId: extra.PROJECT_ID,
  storageBucket: extra.STORAGE_BUCKET,
  messagingSenderId: extra.MESSAGING_SENDER_ID,
  appId: extra.APP_ID,
};

const app = initializeApp(firebaseConfig);

let auth;
if (Platform.OS === "web") {
  auth = initializeAuth(app, {
    persistence: browserLocalPersistence
  });
} else {

  try {
    const { getReactNativePersistence } = require("firebase/auth");
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });
  } catch (e) {
    console.warn("getReactNativePersistence not available, falling back to indexedDB or memory");
    auth = initializeAuth(app, {
      persistence: indexedDBLocalPersistence
    });
  }
}

const db = getFirestore(app);

export { auth, db };