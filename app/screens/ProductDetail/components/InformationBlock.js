import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { getCurrencyString } from "../../../utils/formatCurrency";

const InformationBlock = ({ initProduct }) => {
  return (
    <>
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
        {initProduct.product.name}
      </Text>
      <View>
        <Text>Thương hiệu: {initProduct.brandName}</Text>
        <Text>Danh mục: {initProduct.categoryName}</Text>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 2 }}>
        {initProduct.labelList.map((label) => (
          <Text
            key={label.id}
            style={{
              borderWidth: 1,
              borderRadius: 8,
              borderColor: "purple",
              padding: 5,
              color: "#fff",
              backgroundColor: "purple",
            }}
          >
            {label.title}
          </Text>
        ))}
      </View>
      {initProduct.discountPrice < initProduct.product.listedPrice ? (
        <View style={styles.itemPrice}>
          <Text style={styles.mainTextPrice}>
            {getCurrencyString(initProduct.discountPrice, "vi-VN", "VND")}
          </Text>
          <Text style={styles.textPrice}>
            {getCurrencyString(initProduct.product.listedPrice, "vi-VN", "VND")}
          </Text>
        </View>
      ) : (
        <Text style={styles.mainTextPrice}>
          {getCurrencyString(initProduct.product.listedPrice, "vi-VN", "VND")}
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  itemPrice: {
    flex: 1,
    gap: 5,
  },
  mainTextPrice: {
    fontSize: 20,
    color: "green",
    fontWeight: "bold",
  },
  textPrice: {
    textDecorationLine: "line-through",
  },
});

export default InformationBlock;
