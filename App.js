import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

export default function App() {
  const [count, setCount] = useState(0);

  const handlePress = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text>Click me</Text>
      </TouchableOpacity>
      <View>
        <Text>You clicked {count} times</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginBottom: 10,
  },
});
