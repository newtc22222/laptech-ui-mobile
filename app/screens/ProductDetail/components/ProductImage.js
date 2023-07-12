import React from "react";
import { View, Image, useWindowDimensions, StyleSheet } from "react-native";

const ProductImage = ({ item }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={{ width: width - 20 }}>
      <Image source={{ uri: item.url }} style={[styles.image]} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    height: 200,
    resizeMode: "contain",
    backgroundColor: "#fff",
    marginVertical: 20,
  },
});

export default ProductImage;
