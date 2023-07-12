import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import { getCurrencyString } from "../../utils/formatCurrency";

const ProductCard = ({ product, handlePress }) => {
  return (
    <TouchableOpacity onPress={() => handlePress(product.id)}>
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: product.imagesRepresentUrl[0] }}
          style={styles.itemImage}
        />
        {product.discountPrice < product.price ? (
          <View style={styles.itemPrice}>
            <Text style={styles.mainTextPrice}>
              {getCurrencyString(product.discountPrice, "vi-VN", "VND")}
            </Text>
            <Text style={styles.textPrice}>
              {getCurrencyString(product.price, "vi-VN", "VND")}
            </Text>
          </View>
        ) : (
          <Text style={styles.mainTextPrice}>
            {getCurrencyString(product.price, "vi-VN", "VND")}
          </Text>
        )}
        <View style={styles.itemNameContainer}>
          <Text numberOfLines={4} style={styles.itemName}>
            {product.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    width: 180,
    backgroundColor: "#fff",
  },
  itemImage: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  itemNameContainer: {
    height: 70,
    marginTop: 5,
    justifyContent: "flex-start",
    paddingHorizontal: 5,
  },
  itemName: {
    paddingHorizontal: 5,
    color: "blue",
    fontWeight: "bold",
  },
  itemPrice: {
    flex: 1,
    gap: 5,
  },
  mainTextPrice: {
    fontSize: 18,
    color: "green",
    fontWeight: "bold",
  },
  textPrice: {
    textDecorationLine: "line-through",
  },
});

export default ProductCard;
