import React from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const ProductCard = ({ product }) => {
  return (
    <View style={styles.itemContainer}>
      <Text>{product.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProductCard;
