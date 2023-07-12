import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";

const ViewContainer = ({ children, _style }) => {
  return <View style={[styles.container, _style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: 10,
  },
});

export default ViewContainer;
