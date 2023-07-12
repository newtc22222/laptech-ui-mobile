import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Checkbox } from "react-native-paper";

// const data = [
//     {
//         id: '',
//         label: '',
//         render: '',
//         disabled: true,
//     }
// ]

const CheckboxGroup = ({
  data = [],
  selectedItems,
  setSelectedItems,
  headerLabel,
}) => {
  //   const [selectedItems, setSelectedItems] = useState(data.map(item => item.id));

  const handleCheckboxToggle = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(
        selectedItems.filter((selectedItemId) => selectedItemId !== id)
      );
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <ScrollView>
      {headerLabel && <Text style={styles.headerLabel}>{headerLabel}</Text>}
      {data.map((item) => (
        <View key={item.id} style={styles.cardRow}>
          <Checkbox
            status={selectedItems.includes(item.id) ? "checked" : "unchecked"}
            onPress={() => handleCheckboxToggle(item.id)}
            disabled={item.disabled}
          />
          {item.render() || item.label}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerLabel: {
    fontWeight: "bold",
    fontSize: 14,
  },
  cardRow: {
    flex: 1,
    flexDirection: "row",
  },
});

export default CheckboxGroup;
