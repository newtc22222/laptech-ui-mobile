import React from "react";
import { View, Text, ScrollView } from "react-native";

const ProductDetailScreen = ({ navigation, route }) => {
  const [recommendProducts, setRecommendProduct] = useState([]);

  const handleSaveProductPress = () => {};

  const handleProductPress = () => {};

  const handleChangeQuantity = (newQuantity) => {};
  const handleAddToCartPress = () => {};

  return (
    <View>
      <ScrollView>
        {/* Images Slide */}
        {/* Basic Information */}
        {/* Specifications */}
        {/* Decription detail modal | popup */}
        {/* Feedback */}
        {/* Comment */}
        {/* Btn add to cart | save | compare */}
        <Text>ProductDetailScreen</Text>
        {/* Recommend another product (same) */}
      </ScrollView>
    </View>
  );
};

export default ProductDetailScreen;
