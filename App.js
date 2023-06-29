import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

import AppNavigator from "./app/navigation/AppNavigator";

export default function App() {
  const [count, setCount] = useState(0);

  const handlePress = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <>
      <StatusBar style="light" />
      <AppNavigator />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c9970",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  textInButton: {
    color: "#fff",
  },
});
