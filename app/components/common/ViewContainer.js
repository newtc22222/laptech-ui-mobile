import React from "react";
import { View, StyleSheet } from "react-native";

const ViewContainer = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    paddingHorizontal: 10,
  },
});

export default ViewContainer;
