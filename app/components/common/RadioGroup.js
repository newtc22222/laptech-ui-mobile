import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { RadioButton } from "react-native-paper";

const RadioGroup = ({
  data = [],
  selectedItem,
  setSelectedItem,
  headerLabel,
}) => {
  const handleCheckboxToggle = (id) => {
    setSelectedItem(id);
  };

  return (
    <ScrollView>
      {headerLabel && <Text style={styles.headerLabel}>{headerLabel}</Text>}
      {data.map((item) => (
        <View style={styles.cardRow}>
          <RadioButton
            key={item.id}
            value={item.label}
            status={item.id === selectedItem ? "checked" : "unchecked"}
            onPress={() => handleCheckboxToggle(item.id)}
            disabled={item.disabled}
          />
          {item.render()}
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

export default RadioGroup;
