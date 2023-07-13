import React, { useState } from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import RNDateTimePicker from "@react-native-community/datetimepicker";

import { GENDER_OPTIONS } from "../../configs/constants";
import { ViewContainer } from "../../components/common";
import { useAppContext } from "../../components/context/AppContext";
import { AuthService, UserService } from "../../services";
import validateEmail from "../../utils/validateEmail";

const Information = ({ navigation }) => {
  const {
    profile: { user, accessToken, refreshToken },
    handleUpdateUser,
    handleUpdateAccessToken,
  } = useAppContext();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: user });

  const onSubmit = async (data) => {
    data.dateOfBirth =
      typeof data.dateOfBirth === "string"
        ? data.dateOfBirth
        : data.dateOfBirth.toJSON().slice(0, 10);
    const updateData = {
      name: data.name,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
      email: data.email,
      updateBy: data.name,
    };

    try {
      const res = await UserService.updateInformation(updateData, accessToken);
      if (res.status === 200) {
        handleUpdateUser({ ...user, ...data });
        Alert.alert("THÔNG BÁO", "Cập nhật thông tin thành công!");
        navigation.goBack();
      }
    } catch (err) {
      console.log(err);
      if (err.includes("401")) {
        AuthService.refreshToken(refreshToken).then((res) =>
          handleUpdateAccessToken(res.accessToken)
        );
      }
    }
  };

  return (
    <ViewContainer _style={{ rowGap: 10 }}>
      <Text>THÔNG TIN CÁ NHÂN</Text>
      <TextInput
        mode="outlined"
        keyboardType="numeric"
        value={user.phone}
        label="Số điện thoại"
        disabled
      />
      <View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              label="Họ và tên"
              disabled={!editMode}
            />
          )}
          name="name"
          rules={{ required: "Vui lòng cung cấp tên người dùng!" }}
        />
        {errors.name && (
          <Text style={{ color: "red" }}>{errors.name.message}</Text>
        )}
      </View>
      <View>
        <Controller
          control={control}
          render={({ field: { value, onChange } }) => (
            <>
              <Text>Giới tính</Text>
              <RNPickerSelect
                style={{
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
                }}
                disabled={!editMode}
                value={value}
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
      <View>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => {
            const dateValue = new Date(value);
            return (
              <>
                <Text>Ngày sinh</Text>
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  disabled={!editMode}
                >
                  <Text
                    style={{
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      marginTop: 2,
                      backgroundColor: "#fff",
                      borderWidth: 1,
                      borderColor: "#000",
                      borderRadius: 4,
                    }}
                  >
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
      <View>
        <Controller
          control={control}
          rules={{
            validate: (value) => {
              if (value && !validateEmail(value))
                return "Địa chỉ email chưa chính xác!";
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              label="Email [Không bắt buộc]"
              disabled={!editMode}
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text style={{ color: "red" }}>{errors.email.message}</Text>
        )}
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          mode="contained"
          onPress={editMode ? handleSubmit(onSubmit) : () => setEditMode(true)}
          style={{ width: "68%", backgroundColor: "teal", borderRadius: 5 }}
          labelStyle={{ fontSize: 16, paddingVertical: 5 }}
          disabled={isSubmitting}
        >
          {editMode ? "Lưu thông tin" : "Chỉnh sửa"}
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

export default Information;
