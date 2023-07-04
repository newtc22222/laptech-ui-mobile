import React, { Suspense, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { ProductService } from "../../../services";

const LazyProductCart = React.lazy(() =>
  import("../../../components/common/ProductCart")
);

const ProductsScreen = ({ navigation }) => {
  const [ininProducts, setInitProducts] = useState([]);

  useEffect(() => {
    const productList = ProductService.getAllProducts();
    setInitProducts(productList);
  }, []);

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
          <LazyProductCart product={product} />
        ))}
      </Suspense>
      <Text>ProductsScreen</Text>
    </View>
  );
};

export default ProductsScreen;
