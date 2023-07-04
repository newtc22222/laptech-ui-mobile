import React from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
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
      navigation.navigate("Product");
    }
  };

  const handleBrandPress = (brandId) => {
    navigation.navigate("Product");
  };

  const handleCategoryPress = (categoryId) => {
    navigation.navigate("Product");
  };

  const handleProductPress = (productId) => {
    navigation.navigate("Product");
  };

  return (
    <ViewContainer>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <SearchBar handleSearch={handleSearch} />
          <BannerSlide />
          {/* <CategorySelectBox /> */}
          <BrandGroup handlePress={handleBrandPress} />
        </View>
        <View>
          <Image
            source={{
              uri: "https://fptshop.com.vn/Uploads/Originals/2020/7/7/637297265802454422_C1.png",
            }}
            style={{ flex: 1 }}
          />
        </View>
        <ProductOnSales />
        <ProductRecommend />
        <ProductWasVisited />
        <ProductViewInf />
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
