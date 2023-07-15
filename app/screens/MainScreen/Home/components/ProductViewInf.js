import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { Button } from "react-native-paper";

import { ProductCard } from "../../../../components/common";
import { ProductService } from "../../../../services";

const SIZE = 10;

const ProductViewInf = ({ handlePress }) => {
  const [productList, setProductList] = useState([]);
  const [totalProductCount, setTotalProductCount] = useState(SIZE);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(true);

  const fetchProduct = async () => {
    setIsFetching(true);
    if (currentPage * SIZE <= totalProductCount) {
      const res = await ProductService.getAllProducts(true, currentPage, SIZE);
      if (currentPage === 1) setTotalProductCount(res.count);
      setProductList((prev) => [...prev, ...res.data]);
      setCurrentPage(currentPage + 1);
      setIsFetching(false);
    }
  };

  const handleViewMore = () => fetchProduct();

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <View style={styles.blockContainer}>
      <Text style={styles.textIntro}>Tất cả sản phẩm</Text>
      <View style={styles.productCardContainer}>
        {productList.map((product, index) => (
          <ProductCard
            key={product.id + index}
            product={product}
            handlePress={handlePress}
          />
        ))}
      </View>
      <Button
        mode="outlined"
        style={styles.btnViewMore}
        onPress={handleViewMore}
        loading={isFetching}
        disabled={
          currentPage * SIZE > totalProductCount ||
          productList.length === 0 ||
          isFetching
        }
      >
        Xem thêm
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  blockContainer: { marginTop: 10 },
  textIntro: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 5,
    textAlign: "center",
  },
  productCardContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    rowGap: 8,
  },
  btnViewMore: { marginVertical: 10, borderRadius: 5 },
});

export default ProductViewInf;
