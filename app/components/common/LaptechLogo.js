import React from "react";
import { View, Image } from "react-native";

const LaptechLogo = ({ size = 150 }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        style={{ width: size, height: size }}
        source={require("../../assets/icons/Laptech.png")}
      />
    </View>
  );
};

export default LaptechLogo;
