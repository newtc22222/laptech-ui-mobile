import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Button, TextInput, Tooltip, Snackbar } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import RNPickerSelect from "react-native-picker-select";
import RNDateTimePicker from "@react-native-community/datetimepicker";

import { GENDER_OPTIONS } from "../../configs/constants";
import LaptechLogo from "../../components/common/LaptechLogo";
import { AuthService } from "../../services";
import { checkPasswordStrength } from "../../utils/validatePassword";
import validateEmail from "../../utils/validateEmail";

const RegisterScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      dateOfBirth: "2000-01-01",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
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
    data.dateOfBirth =
      typeof data.dateOfBirth === "string"
        ? data.dateOfBirth
        : data.dateOfBirth.toJSON().slice(0, 10);
    try {
      const res = await AuthService.register(data);
      if (Number(res.status) === 201) {
        navigation.navigate("Login", {
          message: "Đăng ký tài khoản thành công!",
        });
      }
    } catch (error) {
      const errorStr = String(error);
      if (errorStr.includes("422")) {
        handleShowNotify("Số điện thoại đã được đăng ký!");
      } else if (errorStr.includes("500")) {
        handleShowNotify("Không thể tạo tài khoản!");
      }
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
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
                label="Họ và tên"
              />
            )}
            name="name"
            rules={{ required: "Vui lòng cung cấp tên người dùng!" }}
          />
          {errors.name && (
            <Text style={{ color: "red" }}>{errors.name.message}</Text>
          )}
        </View>
        <View style={styles.formControl}>
          <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <>
                <Text>Giới tính</Text>
                <RNPickerSelect
                  style={pickerSelectStyles}
                  onValueChange={onChange}
                  items={GENDER_OPTIONS}
                  itemKey="label"
                  placeholder={{ label: "Chọn thông tin", value: null }}
                />
              </>
            )}
            name="gender"
            rules={{ required: "Vui lòng cung cấp giới tính!" }}
          />
          {errors.gender && (
            <Text style={{ color: "red" }}>{errors.gender.message}</Text>
          )}
        </View>
        <View style={styles.formControl}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => {
              const dateValue = new Date(value);
              return (
                <>
                  <Text>Ngày sinh</Text>
                  <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <Text style={styles.textDatePicker}>
                      {dateValue.toLocaleDateString("en-GB")}
                    </Text>
                  </TouchableOpacity>
                  {showDatePicker && (
                    <RNDateTimePicker
                      mode="date"
                      display="default"
                      value={dateValue}
                      onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        onChange(selectedDate);
                      }}
                      onTouchCancel={() => setShowDatePicker(false)}
                    />
                  )}
                </>
              );
            }}
            name="dateOfBirth"
            rules={{ required: "Vui lòng cung cấp ngày sinh!" }}
          />
          {errors.dateOfBirth && (
            <Text style={{ color: "red" }}>{errors.dateOfBirth.message}</Text>
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
            rules={{
              required: "Vui lòng cung cấp mật khẩu!",
              validate: (value) =>
                checkPasswordStrength(value) > 1 ||
                "Mật khẩu phải có ít nhất 8 ký tự. Bao gồm số, chữ thường và chữ in hoa!",
            }}
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
          ĐĂNG KÝ
        </Button>

        <View style={styles.moreOptions}>
          <Text style={{ marginRight: 7 }}>Đã có tài khoản?</Text>
          <Text
            style={styles.textLink}
            onPress={() => navigation.navigate("Login")}
          >
            Đăng nhập
          </Text>
        </View>
      </ScrollView>
      <Snackbar
        visible={notifyConfig.show}
        onDismiss={() => setNotifyConfig((prev) => ({ ...prev, show: false }))}
        duration={notifyConfig.duration}
        action={null}
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
  textDatePicker: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 2,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 4,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 6,
    color: "black",
    paddingRight: 30,
    backgroundColor: "white",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 5,
    borderColor: "black",
    borderRadius: 6,
    color: "black",
    paddingRight: 30,
    backgroundColor: "white",
  },
};

export default RegisterScreen;
