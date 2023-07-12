import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";

const UpdatePasswordScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <View>
      <Text>Update</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default UpdatePasswordScreen;
