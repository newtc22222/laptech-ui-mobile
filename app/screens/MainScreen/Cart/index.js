import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import { useAppContext } from "../../../components/context/AppContext";
import { ProductService, UserService } from "../../../services";
import { ScrollView } from "react-native-web";
import { Button } from "react-native-paper";

const CartScreen = ({ navigation }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [initCart, setInitCart] = useState({
    cart: {},
    items: [],
  });

  const { accessToken } = useAppContext();

  useEffect(() => {
    const cart = UserService.getCartOfUser(accessToken);
    setInitCart((prev) => ({ ...prev, cart: cart }));
  }, []);

  useEffect(() => {
    if (Object.keys(initCart.cart).length > 0) {
      const items = ProductService.getItemsInCart(
        initCart.cart.id,
        accessToken
      );
      setInitCart((prev) => ({ ...prev, items: items }));
    }
  }, [initCart]);

  const handleChangeQuantity = (newQuantity) => {};

  const handleRemoveFromCart = () => {};

  return (
    <View>
      <ScrollView>
        {initCart.items.map((item) => {
          return (
            <View>
              <Text>{item.name || "Test"}</Text>
            </View>
          );
        })}
        <Button onPress={() => navigation.navigate("Checkout")}>
          Thanh toán
        </Button>
      </ScrollView>
    </View>
  );
};

export default CartScreen;
