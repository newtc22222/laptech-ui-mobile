import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, TextInput, Snackbar } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";

import { useAppContext } from "../../../components/context/AppContext";
import { AuthService } from "../../../services";
import LaptechLogo from "../../../components/common/LaptechLogo";

const LoginScreen = ({ navigation, route }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { handleLogin } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);
  const [notifyConfig, setNotifyConfig] = useState({
    show: false,
    message: "",
    duration: 3000,
  });

  const handleShowNotify = useCallback((message, duration = 3000) => {
    setNotifyConfig({
      show: true,
      message,
      duration,
    });
  }, []);

  useEffect(() => {
    if (route.params) {
      const { message } = route.params;
      if (!!message) {
        handleShowNotify(message);
      }
    }
  }, [route]);

  const onSubmit = async (data) => {
    try {
      const res = await AuthService.login(data.phone, data.password);
      const { user, accessToken, refreshToken, maxAgeToken } = res.data;
      handleLogin(user, accessToken, refreshToken, maxAgeToken);
    } catch (error) {
      handleShowNotify("Thông tin tài khoản chưa chính xác!");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <LaptechLogo />
        <View style={styles.formControl}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                keyboardType="numeric"
                value={value}
                label="Số điện thoại"
              />
            )}
            name="phone"
            rules={{ required: "Vui lòng cung cấp số điện thoại!" }}
          />
          {errors.phone && (
            <Text style={{ color: "red" }}>{errors.phone.message}</Text>
          )}
        </View>

        <View style={styles.formControl}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                label="Mật khẩu"
                secureTextEntry={!showPassword}
                right={
                  <TextInput.Icon
                    onPress={() => setShowPassword(!showPassword)}
                    icon={showPassword ? "eye" : "eye-off"}
                  />
                }
              />
            )}
            name="password"
            rules={{ required: "Vui lòng cung cấp mật khẩu!" }}
          />
          {errors.password && (
            <Text style={{ color: "red" }}>{errors.password.message}</Text>
          )}
        </View>

        <Button
          mode="contained"
          buttonColor="#307c4a"
          textColor="#fff"
          style={{ borderRadius: 6 }}
          onPress={handleSubmit(onSubmit)}
        >
          ĐĂNG NHẬP
        </Button>

        <View style={styles.moreOptions}>
          <Text style={{ marginRight: 7 }}>Chưa có tài khoản?</Text>
          <Text
            style={styles.textLink}
            onPress={() => navigation.navigate("Register")}
          >
            Đăng ký
          </Text>
        </View>

        <View style={styles.moreOptions}>
          <Text
            style={styles.textLink}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            Quên mật khẩu?
          </Text>
        </View>
      </View>
      <Snackbar
        visible={notifyConfig.show}
        onDismiss={() => setNotifyConfig((prev) => ({ ...prev, show: false }))}
        duration={notifyConfig.duration}
      >
        {notifyConfig.message}
      </Snackbar>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  formControl: {
    marginBottom: 10,
  },
  moreOptions: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  textLink: {
    color: "blue",
  },
});

export default LoginScreen;
