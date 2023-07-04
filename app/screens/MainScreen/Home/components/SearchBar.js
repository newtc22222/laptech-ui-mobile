import React, { useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";

const SearchBar = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <View>
      <TextInput
        placeholder="Tìm kiếm sản phẩm ..."
        mode="outlined"
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={() => handleSearch(searchText)}
        right={
          <TextInput.Icon
            icon="arrow-right"
            onPress={() => handleSearch(searchText)}
          />
        }
      />
    </View>
  );
};

export default SearchBar;
