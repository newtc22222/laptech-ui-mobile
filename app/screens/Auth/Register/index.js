import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Button, TextInput, Tooltip, Snackbar } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import RNPickerSelect from "react-native-picker-select";
import RNDateTimePicker from "@react-native-community/datetimepicker";

import { AuthService } from "../../../services";

const GENDER_OPTIONS = [
  { label: "NAM", value: "MALE" },
  { label: "NỮ", value: "FEMALE" },
  { label: "KHÁC", value: "OTHER" },
];

const RegisterScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    try {
      console.log(data);
      const res = await AuthService.register();
      if (res.data.status === 201) {
        handleShowNotify("Tài khoản đã được tạo thành công!");
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error(error);
      handleShowNotify("Không thể tạo tài khoản!");
    }
  };

  return (
    <View style={styles.container}>
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
            const dateValue = value ? new Date(value) : new Date("2000-01-01");
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
              secureTextEntry
            />
          )}
          name="password"
          rules={{
            required: "Vui lòng cung cấp mật khẩu!",
            validate: (value) =>
              value.length < 8 && "Mật khẩu phải có ít nhất 8 ký tự!",
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

      <Snackbar
        visible={notifyConfig.show}
        onDismiss={() => setNotifyConfig((prev) => ({ ...prev, show: false }))}
        duration={notifyConfig.duration}
      >
        {notifyConfig.message}
      </Snackbar>
    </View>
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
