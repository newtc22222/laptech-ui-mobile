import React, { Suspense, useCallback, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { ProductService } from "../../../services";

const LazyProductCard = React.lazy(() =>
  import("../../../components/common/ProductCard")
);

const ProductsScreen = ({ navigation, route }) => {
  const [ininProducts, setInitProducts] = useState([]);

  useEffect(() => {
    // ProductService.getAllProducts().then((res) => setInitProducts(res.data));
  }, []);

  const handleProductPress = (productId) => {
    navigation.navigate("ProductDetail", { params: productId });
  };

  return (
    <View>
      <Suspense
        fallback={
          <View>
            <Text>Wait...</Text>
          </View>
        }
      >
        {ininProducts.map((product) => (
          <LazyProductCard
            key={product.id}
            product={product}
            handlePress={handleProductPress}
          />
        ))}
      </Suspense>
    </View>
  );
};

export default ProductsScreen;
