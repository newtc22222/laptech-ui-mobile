import React from "react";
import { Text, View } from "react-native";
import CartItem from "./CartItem";

const CartBox = ({ data = [] }) => {
  return (
    <View>
      {data.map((item) => (
        <CartItem item={item} />
      ))}
    </View>
  );
};

export default CartBox;
