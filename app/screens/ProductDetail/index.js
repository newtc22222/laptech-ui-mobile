import React, { useEffect, useState } from "react";
import {
  Alert,
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAppContext } from "../../components/context/AppContext";
import { Carousel, ViewContainer } from "../../components/common";
import ProductImage from "./components/ProductImage";
import { AuthService, ProductService, UserService } from "../../services";

import InformationBlock from "./components/InformationBlock";
import FeedbackBlock from "./components/FeedbackBlock";
import CommentBlock from "./components/CommentBlock";
import RecommendProduct from "./components/RecommendProduct";
import Specification from "./components/Specification";
import DescriptionModal from "./components/DescriptionModal";
import { PaperProvider } from "react-native-paper";

const ProductDetailScreen = ({ navigation, route }) => {
  const {
    profile: { user, accessToken, refreshToken },
    handleUpdateAccessToken,
  } = useAppContext();
  const [initProduct, setInitProduct] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [showSpecificationModal, setShowSpecificationModal] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);

  const handleProductPress = (newProductId) =>
    navigation.navigate("ProductDetail", { productId: newProductId });

  const handleAddToFavoritePress = async () => {
    const storage = await AsyncStorage.getItem("favorites");
    const currentFavList = !!storage ? JSON.parse(storage) : [];
    if (!currentFavList.includes(initProduct.product.id)) {
      currentFavList.push(initProduct.product.id);
      AsyncStorage.setItem("favorites", JSON.stringify(currentFavList));
    }
  };

  const handleAddToCartPress = async () => {
    setIsFetching(true);
    try {
      const res = await UserService.getCartOfUser(accessToken);
      const item = {
        cartId: res.data.id,
        discountPrice: initProduct.discountPrice,
        price: initProduct.product.listedPrice,
        productId: initProduct.product.id,
        quantity: 1,
        updateBy: user.name,
      };

      const cartRes = await ProductService.addItemToCart(item, accessToken);
      if (Number(cartRes.status) === 201) {
        Alert.alert(
          "CHỌN MUA SẢN PHẨM",
          "Thêm sản phẩm vào giỏ hàng thành công!"
        );
      }
    } catch (error) {
      console.log("error", error);
      if (error.includes("401")) {
        AuthService.refreshToken(refreshToken).then((res) =>
          handleUpdateAccessToken(res.data.accessToken)
        );
      }
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const { productId } = route.params;
    ProductService.getProductWithId(productId).then((res) =>
      setInitProduct(res.data)
    );
  }, [route.params]);

  if (!initProduct)
    return (
      <ViewContainer
        _style={{ justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color="teal" />
      </ViewContainer>
    );

  return (
    <PaperProvider>
      <ViewContainer>
        {!!initProduct.product.specifications && (
          <Specification
            visible={showSpecificationModal}
            onHide={() => setShowSpecificationModal(false)}
            specifications={initProduct.product.specifications}
          />
        )}
        <DescriptionModal
          visible={showDescriptionModal}
          onHide={() => setShowDescriptionModal(false)}
          descriptionDetail={initProduct.product.descriptionDetail}
        />
        <ScrollView>
          <Carousel
            data={initProduct.imageList}
            _renderItem={({ item }) => <ProductImage item={item} />}
          />
          <View style={{ rowGap: 10 }}>
            <InformationBlock initProduct={initProduct} />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: "teal",
                  borderRadius: 5,
                  paddingVertical: 10,
                  width: "49%",
                }}
                onPress={
                  !!initProduct.product.specifications
                    ? () => setShowSpecificationModal(true)
                    : () => {}
                }
              >
                <Text style={{ textAlign: "center", fontSize: 16 }}>
                  Thông số kỹ thuật
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: "teal",
                  borderRadius: 5,
                  paddingVertical: 10,
                  width: "49%",
                }}
                onPress={() => setShowDescriptionModal(true)}
              >
                <Text style={{ textAlign: "center", fontSize: 16 }}>
                  Mô tả sản phẩm
                </Text>
              </TouchableOpacity>
            </View>
            {/* Decription detail modal | popup */}
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: "crimson",
                  borderRadius: 5,
                  backgroundColor: "crimson",
                  paddingVertical: 10,
                  width: "20%",
                }}
                onPress={handleAddToFavoritePress}
              >
                <Text style={{ textAlign: "center" }}>
                  <Icon name="heart" size={24} color="white" />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor:
                    initProduct.product.quantityInStock === 0 || isFetching
                      ? "darkgray"
                      : "teal",
                  borderRadius: 5,
                  paddingVertical: 10,
                  width: "78%",
                  backgroundColor:
                    initProduct.product.quantityInStock === 0 || isFetching
                      ? "darkgray"
                      : "teal",
                }}
                onPress={handleAddToCartPress}
                disabled={
                  initProduct.product.quantityInStock === 0 || isFetching
                }
              >
                <Text
                  style={{ textAlign: "center", color: "#fff", fontSize: 16 }}
                >
                  {initProduct.product.quantityInStock === 0
                    ? "Sản phẩm hết hàng"
                    : "Chọn mua"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ paddingVertical: 25 }}>
            <Text
              style={{
                textTransform: "uppercase",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 16,
                marginBottom: 10,
              }}
            >
              Đánh giá sản phẩm
            </Text>
            <FeedbackBlock productId={initProduct.product.id} />
          </View>
          <View style={{ paddingBottom: 25 }}>
            <Text
              style={{
                textTransform: "uppercase",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 16,
                marginBottom: 10,
              }}
            >
              Thảo luận về sản phẩm
            </Text>
            <CommentBlock productId={initProduct.product.id} />
          </View>
          <RecommendProduct
            brandId={initProduct.product.brandId}
            handlePress={handleProductPress}
          />
        </ScrollView>
      </ViewContainer>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({});

export default ProductDetailScreen;
