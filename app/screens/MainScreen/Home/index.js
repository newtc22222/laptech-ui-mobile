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
  SearchBar,
} from "./components";
import ViewContainer from "../../../components/common/ViewContainer";

const Home = ({ navigation }) => {
  const handleSearch = (keyword) => {
    if (!!keyword) {
      navigation.navigate("Product", { searchKey: keyword });
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
