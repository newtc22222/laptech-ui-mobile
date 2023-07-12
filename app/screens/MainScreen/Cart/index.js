import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";

import { ViewContainer } from "../../../components/common";

import { useAppContext } from "../../../components/context/AppContext";
import { AuthService, ProductService, UserService } from "../../../services";
import { getCurrencyString } from "../../../utils/formatCurrency";

const CartScreen = ({ navigation }) => {
  const [initCart, setInitCart] = useState(null);
  const [itemInCart, setItemInCart] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const {
    profile: { user, accessToken, refreshToken },
    handleUpdateAccessToken,
  } = useAppContext();

  const handleFetchCart = () => {
    UserService.getCartOfUser(accessToken)
      .then((res) => setInitCart(res.data))
      .catch((error) => {
        console.error(error);
        const res = AuthService.refreshToken(refreshToken);
        handleUpdateAccessToken(res.accessToken);
      });
  };

  const handleFetchItems = () => {
    if (!!initCart) {
      ProductService.getItemsInCart(initCart.id, accessToken)
        .then((res) => setItemInCart(res.data))
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    handleFetchCart();
  }, []);

  useEffect(() => {
    handleFetchItems();
  }, [initCart]);

  const handleRefresh = () => {
    setTimeout(() => {
      handleFetchCart();
      setRefreshing(false);
    }, 3000);
  };

  const handleChangeQuantity = (item, newQuantity) => {
    const updateItem = {
      quantity: newQuantity,
      price: item.price,
      discountPrice: item.discountPrice,
      updateBy: user.name,
    };
    ProductService.updateItemOfCart(updateItem, item.id, accessToken)
      .then((res) => {
        if (Number(res.status) === 200) {
          Alert.alert("THÔNG BÁO", "Cập nhật thông tin giỏ hàng thành công!");
          handleFetchItems();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleRemoveFromCart = (itemId) => {
    ProductService.removeItemFromCart(itemId, user.name, accessToken)
      .then((res) => {
        if (Number(res.status) === 204) {
          Alert.alert(
            "THÔNG BÁO",
            "Loại bỏ sản phẩm khỏi giỏ hàng thành công!"
          );
          handleFetchItems();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <ViewContainer>
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          fontWeight: "bold",
          marginVertical: 10,
        }}
      >
        SẢN PHẨM TRONG GIỎ HÀNG
      </Text>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        contentContainerStyle={{
          rowGap: 5,
          alignSelf: "stretch",
          justifyContent: "space-between",
        }}
      >
        {itemInCart.length === 0 && <View></View>}
        {itemInCart.map((item) => {
          return (
            <View
              key={item.id}
              style={{
                flexDirection: "row",
                padding: 10,
                borderWidth: 1,
                borderColor: "teal",
                backgroundColor: "#fff",
                columnGap: 10,
              }}
            >
              <Image
                source={{ uri: item.imageRepresent }}
                style={{ height: 100, width: 100, resizeMode: "contain" }}
              />
              <View style={{ width: 260, rowGap: 5 }}>
                <Text numberOfLines={2} style={{ fontWeight: "bold" }}>
                  {item.product.name}
                </Text>
                {item.discountPrice < item.price ? (
                  <View style={{ flexDirection: "row", columnGap: 5 }}>
                    <Text style={{ fontWeight: "bold", color: "teal" }}>
                      {getCurrencyString(item.discountPrice, "vi-VN", "VND")}
                    </Text>
                    <Text style={{ textDecorationLine: "line-through" }}>
                      {getCurrencyString(item.price, "vi-VN", "VND")}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text style={{ fontWeight: "bold", color: "teal" }}>
                      {getCurrencyString(item.price, "vi-VN", "VND")}
                    </Text>
                  </View>
                )}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row", columnGap: 2 }}>
                    <TouchableOpacity
                      style={{
                        borderWidth: 1,
                        borderRadius: 0,
                        width: 40,
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() =>
                        handleChangeQuantity(item, item.quantity - 1)
                      }
                      disabled={item.quantity === 1}
                    >
                      <Icon name="minus" />
                    </TouchableOpacity>
                    <View
                      style={{
                        width: 40,
                        borderWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontSize: 18 }}>{item.quantity}</Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        borderWidth: 1,
                        borderRadius: 0,
                        width: 40,
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() =>
                        handleChangeQuantity(item, Number(item.quantity) + 1)
                      }
                      disabled={item.quantity === item.product.quantityInStock}
                    >
                      <Icon name="plus" />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderRadius: 0,
                      borderColor: "crimson",
                      width: 40,
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "crimson",
                    }}
                    onPress={() => handleRemoveFromCart(item.id)}
                  >
                    <Icon name="delete" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
        <Button
          mode="contained"
          style={{
            paddingVertical: 5,
            borderRadius: 5,
            backgroundColor: "teal",
            marginBottom: 10,
          }}
          labelStyle={{
            fontSize: 16,
            color: "#fff",
          }}
          uppercase
          onPress={() =>
            navigation.navigate("Checkout", { cartId: initCart.id })
          }
          disabled={itemInCart.length === 0}
        >
          {itemInCart.length === 0
            ? "Giỏ hàng hiện đang trống!"
            : "Thanh toán: " +
              getCurrencyString(
                itemInCart
                  .map((i) => i.discountPrice * i.quantity)
                  .reduce((total, current) => total + current, 0),
                "vi-VN",
                "VND"
              )}
        </Button>
      </ScrollView>
    </ViewContainer>
  );
};

export default CartScreen;
