import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Text, StyleSheet } from "react-native";
import { Button, Snackbar, Tooltip, TextInput } from "react-native-paper";

import { ViewContainer, LaptechLogo } from "../../components/common";
import { AuthService } from "../../services";
import validateEmail from "../../utils/validateEmail";

const UpdatePasswordScreen = ({ navigation, route }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { token: "", newPassword: "", confirmPassword: "" },
  });

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
    const { message } = route.params;
    handleShowNotify(message);
  }, []);

  const onSubmit = async (data) => {
    if (data.newPassword === data.confirmPassword) {
      try {
        const res = await AuthService.resetPassword(
          data.token,
          data.newPassword
        );
        console.log(res);
        navigation.navigate("Login", {
          message: "Mật khẩu đã được cập nhật!",
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      handleShowNotify("Mật khẩu xác thực chưa trùng khớp!");
    }
  };

  return (
    <>
      <ViewContainer _style={styles.container}>
        <LaptechLogo />
        <View style={styles.formControl}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                label="Token xác thực"
              />
            )}
            name="token"
            rules={{ required: "Vui lòng cung cấp Token!" }}
          />
          {errors.token && (
            <Text style={{ color: "red" }}>{errors.token.message}</Text>
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
                label="Mật khẩu mới"
                secureTextEntry={!showPassword}
                right={
                  <TextInput.Icon
                    onPress={() => setShowPassword(!showPassword)}
                    icon={showPassword ? "eye" : "eye-off"}
                  />
                }
              />
            )}
            name="newPassword"
            rules={{ required: "Vui lòng cung cấp mật khẩu mới!" }}
          />
          {errors.newPassword && (
            <Text style={{ color: "red" }}>{errors.newPassword.message}</Text>
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
                label="Mật khẩu xác thực"
                secureTextEntry={!showPassword}
                right={
                  <TextInput.Icon
                    onPress={() => setShowPassword(!showPassword)}
                    icon={showPassword ? "eye" : "eye-off"}
                  />
                }
              />
            )}
            name="confirmPassword"
            rules={{ required: "Vui lòng cung cấp mật khẩu!" }}
          />
          {errors.confirmPassword && (
            <Text style={{ color: "red" }}>
              {errors.confirmPassword.message}
            </Text>
          )}
        </View>
        <Button
          mode="contained"
          buttonColor="#307c4a"
          textColor="#fff"
          style={{ borderRadius: 6 }}
          onPress={handleSubmit(onSubmit)}
        >
          GỬI THÔNG TIN
        </Button>
      </ViewContainer>
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
    marginTop: 10,
    textAlign: "center",
    color: "blue",
  },
});

export default UpdatePasswordScreen;
