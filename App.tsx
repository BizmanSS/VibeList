import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { auth } from "./services/firebase";
import { onAuthStateChanged } from "firebase/auth";

import Landing from "./screens/Landing";
import Signup from "./screens/Signup";
import ForgotPassword from "./screens/ForgotPassword";
import Home from "./screens/Home";
import Profile from "./screens/ProfileScreen";

export type Screen = "Landing" | "Signup" | "ForgotPassword" | "Home" | "Profile";

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>("Landing");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setUser(user);
        setCurrentScreen("Home");
      } else {
        setUser(null);
        setCurrentScreen("Landing");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) return null;

  const renderScreen = () => {
    if (user && currentScreen === "Home")
      return <Home onLogout={() => setCurrentScreen("Landing")} onNavigate={setCurrentScreen} />;

    switch (currentScreen) {
      case "Landing":
        return <Landing navigate={setCurrentScreen} />;
      case "Signup":
        return <Signup navigate={setCurrentScreen} />;
      case "ForgotPassword":
        return <ForgotPassword navigate={setCurrentScreen} />;
      case "Profile":
        return <Profile navigate={setCurrentScreen} />;
      default:
        return <Landing navigate={setCurrentScreen} />;
    }
  };

  return <NavigationContainer>{renderScreen()}</NavigationContainer>;
}