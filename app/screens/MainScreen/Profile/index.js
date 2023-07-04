import React from "react";
import { View, Text, Button } from "react-native";
import { useAppContext } from "../../../components/context/AppContext";

const ProfileScreen = ({ navigation }) => {
  const { handleLogout } = useAppContext();

  return (
    <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20 }}>
      {/* Order history, Account, change pass, address */}
      <Button title="Đăng xuất" onPress={() => handleLogout()} />
    </View>
  );
};

export default ProfileScreen;
