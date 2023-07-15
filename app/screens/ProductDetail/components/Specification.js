import React from "react";
import { ModalInfo } from "../../../components/common";
import { View, Text } from "react-native";

const Specification = ({ visible, onHide, specifications }) => {
  const specificationTable = JSON.parse(specifications);

  return (
    <ModalInfo visible={visible} onHide={onHide}>
      {specificationTable.map((item, index) => (
        <View key={index}>
          <Text>{item.attribute + ": " + item.value}</Text>
        </View>
      ))}
    </ModalInfo>
  );
};

export default Specification;
