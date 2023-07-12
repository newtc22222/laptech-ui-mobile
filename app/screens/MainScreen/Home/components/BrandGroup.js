import React, { useEffect, useState } from "react";
import {
  Text,
  ScrollView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { ProductService } from "../../../../services";

const BrandGroup = ({ handlePress }) => {
  const [brandList, setBrandList] = useState([]);

  useEffect(() => {
    ProductService.getAllBrands().then((res) => setBrandList(res.data));
  }, []);

  return (
    <View style={styles.brandListContainer}>
      <Text style={styles.textIntro}>Thương hiệu đồng hành</Text>
      <ScrollView horizontal>
        {brandList.map((brand) => (
          <TouchableOpacity
            key={brand.id}
            onPress={() => handlePress(brand.id)}
          >
            <View style={styles.brandContainer}>
              <Image source={{ uri: brand.logo }} style={styles.brandLogo} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  brandListContainer: {
    marginTop: 20,
  },
  brandContainer: {
    flex: 1,
    width: 100,
  },
  brandLogo: {
    height: 50,
    resizeMode: "center",
  },
  textIntro: {
    marginBottom: 10,
    color: "teal",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default BrandGroup;
