import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import {
  BannerSlide,
  CategorySelectBox,
  BrandGroup,
  ProductOnSales,
  ProductWasVisited,
  ProductRecommend,
  ProductViewInf,
} from "./components";
import { SearchBar, ViewContainer } from "../../../components/common";

const Home = ({ navigation }) => {
  const handleSearch = (searchKey) => {
    if (!!searchKey) {
      navigation.navigate("Product", { searchKey });
    }
  };

  const handleBrandPress = (brandId) => {
    navigation.navigate("Product", { brandId });
  };

  const handleCategoryPress = (categoryId) => {
    navigation.navigate("Product", { categoryId });
  };

  const handleProductPress = (productId) => {
    navigation.navigate("ProductDetail", { productId });
  };

  return (
    <ViewContainer>
      <ScrollView>
        <View style={styles.header}>
          <SearchBar handleSearch={handleSearch} />
          <BannerSlide />
          {/* <CategorySelectBox handleSearch={handleCategoryPress} /> */}
          <BrandGroup handlePress={handleBrandPress} />
        </View>
        <ProductOnSales handlePress={handleProductPress} />
        {/* <ProductRecommend handlePress={handleProductPress} />
        <ProductWasVisited handlePress={handleProductPress} /> */}
        <ProductViewInf handlePress={handleProductPress} />
      </ScrollView>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

export default Home;
