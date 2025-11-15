import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYCbTS6DWZluFirPHrex2eJ6hsXl3JP5w",
  authDomain: "vibelist-59e14.firebaseapp.com",
  projectId: "vibelist-59e14",
  storageBucket: "vibelist-59e14.firebasestorage.app",
  messagingSenderId: "354654311889",
  appId: "1:354654311889:web:fe64edb087714280ecbcf0"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore(app);

export { auth, db };