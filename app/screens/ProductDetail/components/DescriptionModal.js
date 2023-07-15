import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { ModalInfo } from "../../../components/common";

const DescriptionModal = ({ visible, onHide, descriptionDetail }) => {
  const descriptionDetailTab = JSON.parse(descriptionDetail);
  const [tabSelect, setTabSelect] = useState(descriptionDetailTab[0].title);
  const tabNames = descriptionDetailTab.map((item) => item.title);
  return (
    <ModalInfo
      visible={visible}
      onHide={onHide}
      _containerStyle={{ borderRadius: 5 }}
    >
      <ScrollView>
        <ScrollView horizontal contentContainerStyle={styles.tabContainer}>
          {tabNames.map((tabName) => (
            <TouchableOpacity
              key={tabName}
              onPress={() => setTabSelect(tabName)}
              style={[
                styles.tabButton,
                tabName === tabSelect ? styles.tabButtonSelect : {},
              ]}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  tabName === tabSelect ? styles.tabButtonTextSelect : {},
                ]}
              >
                {tabName}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {descriptionDetailTab.map((item) => (
          <View key={item.id}>
            <Text>{item.content}</Text>
          </View>
        ))}
      </ScrollView>
    </ModalInfo>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    rowGap: 10,
  },
  tabContainer: {
    paddingVertical: 10,
  },
  tabButton: {
    width: 140,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "#ddd",
  },
  tabButtonSelect: {
    backgroundColor: "teal",
  },
  tabButtonText: {
    fontSize: 14,
    textAlign: "center",
    textTransform: "uppercase",
  },
  tabButtonTextSelect: {
    color: "#fff",
  },
});

export default DescriptionModal;
