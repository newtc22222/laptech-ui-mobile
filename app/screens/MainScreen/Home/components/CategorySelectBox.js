import React, { useEffect } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { ProductService } from "../../../../services";

const CategorySelectBox = ({ handlePress }) => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const res = ProductService.getAllCategories();
    setCategoryList(res.data);
  });

  return (
    <View style={styles.categoryListContainer}>
      <Text style={styles.textIntro}>Danh mục sản phẩm</Text>
      <ScrollView horizontal>
        {categoryList.map((category) => (
          <TouchableHighlight
            key={category.id}
            onPress={() => handlePress(category.id)}
          >
            <View style={styles.categoryContainer}>
              <Image
                source={{ uri: category.image }}
                style={styles.categoryImage}
              />
              <Text>{category.name}</Text>
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryListContainer: {
    marginTop: 20,
    rowGap: 5,
  },
  categoryContainer: {
    flex: 1,
    width: 100,
    paddingHorizontal: 10,
  },
  categoryImage: {
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

export default CategorySelectBox;
