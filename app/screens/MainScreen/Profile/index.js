import React from "react";
import classNames from "classnames";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";

import { ViewContainer } from "../../../components/common";
import { useAppContext } from "../../../components/context/AppContext";

import { GENDER_CALL, getTimeHello } from "../../../configs/constants";

const getTextHello = (username, gender) => {
  const currentTime = new Date().toTimeString();

  return classNames(
    "Chào",
    getTimeHello(currentTime.slice(0, 2)),
    !!gender ? GENDER_CALL[gender] : GENDER_CALL["MALE"],
    !!username ? username + "!" : "!"
  );
};

const ProfileScreen = ({ navigation }) => {
  const {
    profile: { user },
    handleLogout,
  } = useAppContext();

  return (
    <ViewContainer _style={{ marginTop: 40 }}>
      <View style={styles.helloView}>
        <Text style={styles.helloText}>
          {getTextHello(user?.name, user?.gender)}
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <Button
          mode="contained"
          style={styles.btnControl}
          uppercase
          contentStyle={styles.btnContent}
          icon={(props) => <Icon name="solution1" {...props} />}
          onPress={() => navigation.navigate("Information")}
        >
          Thông tin cá nhân
        </Button>
        <Button
          mode="contained"
          style={styles.btnControl}
          uppercase
          contentStyle={styles.btnContent}
          icon={(props) => <Icon name="key" {...props} />}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          Đổi mật khẩu
        </Button>
        <Button
          mode="contained"
          style={styles.btnControl}
          uppercase
          contentStyle={styles.btnContent}
          icon={(props) => <Icon name="tool" {...props} />}
          onPress={() => navigation.navigate("Setting")}
        >
          Thiết lập ứng dụng
        </Button>
        <Button
          mode="contained"
          style={styles.btnControl}
          uppercase
          contentStyle={styles.btnContent}
          icon={(props) => <Icon name="wallet" {...props} />}
          onPress={() => {}}
        >
          Phương thức thanh toán
        </Button>
        <Button
          mode="contained"
          style={[styles.btnControl, styles.btnLogout]}
          uppercase
          contentStyle={styles.btnContent}
          icon={(props) => <Icon name="logout" {...props} />}
          onPress={handleLogout}
        >
          Đăng xuất
        </Button>
      </View>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  helloView: {
    paddingLeft: 20,
    paddingVertical: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "teal",
    borderRadius: 10,
  },
  helloText: { fontSize: 20, color: "teal" },
  btnContainer: {
    flex: 1,
    backgroundColor: "#ccc",
    flexDirection: "column",
    rowGap: 3,
    marginBottom: 10,
  },
  btnControl: {
    backgroundColor: "teal",
    borderRadius: 0,
    paddingVertical: 10,
  },
  btnContent: {
    color: "#fff",
    alignSelf: "flex-start",
    gap: 10,
    fontSize: 14,
  },
  btnLogout: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default ProfileScreen;
