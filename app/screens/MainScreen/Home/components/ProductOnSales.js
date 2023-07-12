import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { ProductCard } from "../../../../components/common";
import { ProductService } from "../../../../services";

const ProductOnSales = ({ handlePress }) => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    ProductService.getProductOnSale().then((res) => {
      setProductList(res.data);
    });
  }, []);

  if (productList.length === 0) return <View></View>;

  return (
    <View style={{ marginVertical: 20 }}>
      <Text
        style={{
          textTransform: "uppercase",
          fontStyle: "italic",
          textAlign: "center",
          color: "crimson",
          fontSize: 16,
          marginBottom: 10,
        }}
      >
        Sản phẩm đang hạ giá
      </Text>
      <ScrollView horizontal contentContainerStyle={{ gap: 5 }}>
        {productList.map((product, index) => (
          <ProductCard
            key={product.id + index}
            product={product}
            handlePress={handlePress}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ProductOnSales;
