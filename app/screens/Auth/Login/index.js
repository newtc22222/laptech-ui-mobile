import React from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";

const LoginScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20 }}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 10,
              padding: 5,
            }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Số điện thoại"
          />
        )}
        name="phone"
        rules={{ required: "Vui lòng cung cấp số điện thoại!" }}
      />
      {errors.email && (
        <Text style={{ color: "red" }}>{errors.email.message}</Text>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 10,
              padding: 5,
            }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Mật khẩu"
            secureTextEntry
          />
        )}
        name="password"
        rules={{ required: "Vui lòng cung cấp mật khẩu!" }}
      />
      {errors.password && (
        <Text style={{ color: "red" }}>{errors.password.message}</Text>
      )}

      <Button
        style={styles.btnLogin}
        title="Đăng nhập"
        onPress={handleSubmit(onSubmit)}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Text style={{ marginRight: 10 }}>Chưa có tài khoản?</Text>
        <Text
          style={{ color: "blue" }}
          onPress={() => navigation.navigate("Register")}
        >
          Đăng ký
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Text
          style={{ color: "blue" }}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          Quên mật khẩu?
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  btnLogin: {
    backgroundColor: "#008e66",
  },
  textBtnLogin: {},
});

export default LoginScreen;
