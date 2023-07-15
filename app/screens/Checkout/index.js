import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Text, ScrollView, Image } from "react-native";
import { TextInput, Button, Snackbar, RadioButton } from "react-native-paper";

import { useAppContext } from "../../components/context/AppContext";
import { ViewContainer } from "../../components/common";
import { CheckoutService, ProductService } from "../../services";
import { getCurrencyString } from "../../utils/formatCurrency";
import { Alert } from "react-native";

const PAYMENT_TYPE = {
  cash: "Tiền mặt",
  "E-wallet": "Ví điện tử",
  "Credit card": "Thẻ ngân hàng",
};

const CheckoutScreen = ({ navigation, route }) => {
  const {
    profile: { user, accessToken },
  } = useAppContext();
  const [productRequest, setProductRequest] = useState([]);
  const [productItems, setProductItems] = useState([]);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { paymentType: "cash" } });
  const [notifyConfig, setNotifyConfig] = useState({
    show: false,
    message: "",
    duration: 3000,
  });

  useEffect(() => {
    const { cartId } = route.params;
    ProductService.getItemsInCart(cartId, accessToken).then((res) =>
      setProductItems(res.data)
    );
    ProductService.getItemsInCart(cartId, accessToken, false).then((res) =>
      setProductRequest(res.data)
    );
  }, []);

  const onSubmit = async (data) => {
    const paymentTotal = productItems
      .map((i) => i.discountPrice * i.quantity)
      .reduce((total, current) => total + current, 0);
    const newInvoice = {
      cartId: route.params.cartId,
      address: data.address,
      discountAmount: 0,
      isPaid: false,
      note: data.note,
      orderStatus:
        data.paymentType === Object.keys(PAYMENT_TYPE)[0]
          ? "WAIT_CONFIRMED"
          : "PENDING",
      paymentAmount: productItems
        .map((i) => i.quantity)
        .reduce((total, curr) => total + curr, 0),
      paymentTotal: paymentTotal,
      paymentType: "cash",
      phone: data.phone,
      shipCost: 0,
      tax: 0,
      updateBy: user.name,
      userId: user.id,
      productUnitList: productRequest,
    };
    try {
      const res = await CheckoutService.getCheckout(newInvoice, accessToken);
      console.log("res", res);
      if (Number(res.status) === 200) {
        Alert.alert("THÔNG BÁO", "Đơn hàng đã thanh toán thành công!");
        navigation.navigate("Home");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ViewContainer>
        <ScrollView>
          <View style={{ rowGap: 5 }}>
            <Text
              style={{ textAlign: "center", fontWeight: "bold", fontSize: 16 }}
            >
              SẢN PHẨM TRONG GIỎ HÀNG
            </Text>
            {productItems.map((item) => {
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
                          {getCurrencyString(
                            item.discountPrice,
                            "vi-VN",
                            "VND"
                          )}
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
                    ></View>
                    <Text>Số lượng: {item.quantity}</Text>
                  </View>
                </View>
              );
            })}
            <Text style={{ fontWeight: "bold", fontSize: 16, color: "teal" }}>
              Tổng giá trị:{" "}
              {getCurrencyString(
                productItems
                  .map((i) => i.discountPrice * i.quantity)
                  .reduce((total, current) => total + current, 0),
                "vi-VN",
                "VND"
              )}
            </Text>
          </View>
          <View style={{ rowGap: 8 }}>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 16,
                marginTop: 20,
              }}
            >
              THÔNG TIN THANH TOÁN
            </Text>
            <View>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    mode="outlined"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    keyboardType="numeric"
                    value={value}
                    label="Số điện thoại"
                  />
                )}
                name="phone"
                rules={{ required: "Vui lòng cung cấp số điện thoại!" }}
              />
              {errors.phone && (
                <Text style={{ color: "red" }}>{errors.phone.message}</Text>
              )}
            </View>
            <View>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    mode="outlined"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    label="Địa chỉ nhận hàng"
                  />
                )}
                name="address"
                rules={{ required: "Vui lòng cung cấp địa chỉ nhận hàng" }}
              />
              {errors.address && (
                <Text style={{ color: "red" }}>{errors.address.message}</Text>
              )}
            </View>
            <View>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    mode="outlined"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    label="Ghi chú (cho người bán)"
                  />
                )}
                name="note"
              />
            </View>
            <View
              style={{
                backgroundColor: "#fff",
                borderWidth: 1,
                borderRadius: 5,
                padding: 10,
              }}
            >
              <Controller
                control={control}
                name="paymentType"
                render={({ field: { onChange, value } }) => {
                  return (
                    <View style={{ rowGap: 5 }}>
                      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                        Hình thức thanh toán
                      </Text>
                      {Object.keys(PAYMENT_TYPE).map((key) => (
                        <View
                          key={key}
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <RadioButton
                            value={key}
                            status={value === key ? "checked" : "unchecked"}
                            onPress={() => onChange(key)}
                            disabled={key !== "cash"}
                          />
                          <View style={{ flexDirection: "row", gap: 10 }}>
                            <Text
                              onPress={() => {
                                if (key === "cash") onChange(key);
                              }}
                            >
                              {PAYMENT_TYPE[key]}
                            </Text>
                            {key !== "cash" && (
                              <Text
                                style={{
                                  fontStyle: "italic",
                                  fontSize: 10,
                                }}
                              >
                                Chức năng này hiện đang được phát triển!
                              </Text>
                            )}
                          </View>
                        </View>
                      ))}
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
          }}
        >
          <Button
            mode="contained"
            buttonColor="#307c4a"
            textColor="#fff"
            style={{ borderRadius: 6, width: "70%", paddingVertical: 8 }}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            {isSubmitting ? "ĐANG XÁC THỰC THÔNG TIN" : "THANH TOÁN"}
          </Button>
          <Button
            mode="contained"
            buttonColor="#333"
            textColor="#fff"
            style={{ borderRadius: 6, width: "28%", paddingVertical: 8 }}
            onPress={() => navigation.navigate("Cart")}
          >
            TRỞ LẠI
          </Button>
        </View>
      </ViewContainer>
      <Snackbar
        visible={notifyConfig.show}
        onDismiss={() => setNotifyConfig((prev) => ({ ...prev, show: false }))}
        duration={notifyConfig.duration}
      >
        {notifyConfig.message}
      </Snackbar>
    </>
  );
};

export default CheckoutScreen;
