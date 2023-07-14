import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import {
  ProductCard,
  SearchBar,
  ViewContainer,
} from "../../../components/common";
import { ProductService } from "../../../services";

const ProductsScreen = ({ navigation, route }) => {
  const [initProducts, setInitProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!!route.params) {
      const { params } = route;
      console.log("params", Object.keys(params));
      if (!!params.brandId) {
        ProductService.getProductOfBrand(params.brandId)
          .then((res) => setInitProducts(res.data))
          .finally(() => setIsFetching(false));
      } else if (!!params.categoryId) {
        ProductService.getProductOfCategory(params.categoryId)
          .then((res) => setInitProducts(res.data))
          .finally(() => setIsFetching(false));
      } else if (!!params.searchKey) {
        ProductService.filterProductByName(params.searchKey)
          .then((res) => setInitProducts(res.data))
          .finally(() => setIsFetching(false));
      }
    } else {
      ProductService.getAllProducts()
        .then((res) => setInitProducts(res.data))
        .finally(() => setIsFetching(false));
    }
  }, [route]);

  const handleSearch = (searchKey) => {
    setIsFetching(true);
    if (!!searchKey) {
      ProductService.filterProductByName(searchKey)
        .then((res) => setInitProducts(res.data))
        .finally(() => setIsFetching(false));
    }
  };

  const handleProductPress = (productId) => {
    navigation.navigate("ProductDetail", { productId });
  };

  return (
    <ViewContainer>
      <ScrollView contentContainerStyle={{ rowGap: 5 }}>
        <SearchBar handleSearch={handleSearch} disable={isFetching} />
        <View style={styles.productCardContainer}>
          {initProducts.length === 0 && (
            <Text style={{ textAlign: "center" }}>
              Không có sản phẩm nào phù hợp!
            </Text>
          )}
          {initProducts.map((product, index) => (
            <ProductCard
              key={product.id + index}
              product={product}
              handlePress={handleProductPress}
            />
          ))}
        </View>
      </ScrollView>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  productCardContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    rowGap: 8,
  },
});

export default ProductsScreen;
