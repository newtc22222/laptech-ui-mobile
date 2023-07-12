import React, { useState } from "react";
import { View, Text } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";

import { ViewContainer } from "../../components/common";
import { checkPasswordStrength } from "../../utils/validatePassword";
import { useAppContext } from "../../components/context/AppContext";
import { AuthService, UserService } from "../../services";
import { Alert } from "react-native";

const ChangePassword = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    profile: { accessToken, refreshToken },
    handleLogout,
  } = useAppContext();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.newPassword === data.oldPassword) {
      Alert.alert(
        "THÔNG BÁO",
        "Mật khẩu mới không được trùng với mật khẩu cũ!"
      );
      return;
    }
    if (data.newPassword !== data.confirmPassword) {
      Alert.alert("THÔNG BÁO", "Mật khẩu xác thực chưa chính xác!");
      return;
    }

    try {
      const res = await UserService.updatePassword(
        data.oldPassword,
        data.newPassword,
        accessToken
      );
      console.log(res);
      if (Number(res.status) === 200) {
        Alert.alert("THÔNG BÁO", "Đổi mật khẩu thành công!");
        handleLogout();
      }
    } catch (error) {
      if (String(error).includes("401")) {
        Alert.alert("THÔNG BÁO", "Mật khẩu cũ không chính xác!");
      }
    }
  };

  return (
    <ViewContainer _style={{ paddingVertical: 10, rowGap: 10 }}>
      <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>
        THAY ĐỔI MẬT KHẨU
      </Text>
      <View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              label="Mật khẩu cũ"
              secureTextEntry={!showPassword}
              right={
                <TextInput.Icon
                  onPress={() => setShowPassword(!showPassword)}
                  icon={showPassword ? "eye" : "eye-off"}
                />
              }
            />
          )}
          name="oldPassword"
          rules={{
            required: "Vui lòng cung cấp mật khẩu!",
          }}
        />
        {errors.oldPassword && (
          <Text style={{ color: "red" }}>{errors.oldPassword.message}</Text>
        )}
      </View>
      <View>
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
          rules={{
            required: "Vui lòng cung cấp mật khẩu!",
            validate: (value) =>
              checkPasswordStrength(value) > 1 ||
              "Mật khẩu phải có ít nhất 8 ký tự. Bao gồm số, chữ thường và chữ in hoa!",
          }}
        />
        {errors.newPassword && (
          <Text style={{ color: "red" }}>{errors.newPassword.message}</Text>
        )}
      </View>
      <View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              label="Xác nhận mật khẩu mới"
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
          rules={{
            required: "Vui lòng cung cấp mật khẩu!",
            validate: (value) =>
              checkPasswordStrength(value) > 1 ||
              "Mật khẩu phải có ít nhất 8 ký tự. Bao gồm số, chữ thường và chữ in hoa!",
          }}
        />
        {errors.confirmPassword && (
          <Text style={{ color: "red" }}>{errors.confirmPassword.message}</Text>
        )}
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={{ width: "68%", backgroundColor: "teal", borderRadius: 5 }}
          labelStyle={{ fontSize: 16, paddingVertical: 5 }}
          disabled={isSubmitting}
        >
          Đổi mật khẩu
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.goBack()}
          style={{ width: "30%", backgroundColor: "black", borderRadius: 5 }}
          labelStyle={{ fontSize: 16, paddingVertical: 5 }}
        >
          Trở lại
        </Button>
      </View>
    </ViewContainer>
  );
};

export default ChangePassword;
