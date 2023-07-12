import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";

import { ProductCard } from "../../../components/common";
import { ProductService } from "../../../services";

const RecommendProduct = ({ brandId, handlePress }) => {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    ProductService.getProductOfBrand(brandId).then((res) =>
      setProductList(res.data)
    );
  }, []);

  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 16,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        SẢN PHẨM CÙNG THƯƠNG HIỆU
      </Text>
      <ScrollView horizontal>
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

export default RecommendProduct;
