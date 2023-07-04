import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { ProductService } from "../../../../services";

const BrandGroup = ({ handlePress }) => {
  const [brandList, setBrandList] = useState();

  useEffect(() => {
    ProductService.getAllBrands().then((data) => setBrandList(data));
  }, []);

  return (
    <View>
      <Text>BrandGroup</Text>
    </View>
  );
};

export default BrandGroup;
