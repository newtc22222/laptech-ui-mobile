import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Text, StyleSheet } from "react-native";
import { Button, Snackbar, Tooltip, TextInput } from "react-native-paper";

import { ViewContainer, LaptechLogo } from "../../components/common";
import { AuthService } from "../../services";
import validateEmail from "../../utils/validateEmail";

const ForgotPasswordScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const onSubmit = async (data) => {
    try {
      const res = await AuthService.forgotPasswordScreen(data);
      console.log(res);
      navigation.navigate("UpdatePassword", {
        message: "Một token đã được gửi qua email của bạn!",
      });
    } catch (error) {
      handleShowNotify("Thông tin cung cấp không chính xác!");
    }
  };

  return (
    <>
      <ViewContainer>
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
            rules={{
              required: "Vui lòng cung cấp số điện thoại!",
              validate: (value) =>
                value.length >= 10 || "Số điện thoại chưa phù hợp!",
            }}
          />
          {errors.phone && (
            <Text style={{ color: "red" }}>{errors.phone.message}</Text>
          )}
        </View>
        <View style={styles.formControl}>
          <Controller
            control={control}
            rules={{
              validate: (value) => {
                if (value && !validateEmail(value))
                  return "Địa chỉ email chưa chính xác!";
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Tooltip title="This email will use to update new password if you forget!">
                <TextInput
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label="Email [Không bắt buộc]"
                />
              </Tooltip>
            )}
            name="email"
          />
          {errors.email && (
            <Text style={{ color: "red" }}>{errors.email.message}</Text>
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
        <View>
          <Text
            style={styles.textLink}
            onPress={() => navigation.navigate("Login")}
          >
            Trở lại?
          </Text>
        </View>
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
    color: "blue",
  },
});

export default ForgotPasswordScreen;
