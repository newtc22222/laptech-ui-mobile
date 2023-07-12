import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Button, TextInput } from "react-native-paper";

import { useAppContext } from "../../../components/context/AppContext";
import { ProductService } from "../../../services";

const CommentBlock = ({ productId }) => {
  const {
    profile: { user },
  } = useAppContext();
  const [commentList, setCommentList] = useState([]);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const fetchComment = () => {
    ProductService.getCommentsOfProduct(productId)
      .then((res) => setCommentList(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchComment();
  }, [productId]);

  const onSubmit = async (data) => {
    const newComment = {
      ...data,
      productId,
      username: user.name,
      phone: user.phone,
      updateBy: user.name,
    };
    const res = await ProductService.createComment(newComment);
    if (Number(res.status) === 201) {
      fetchComment();
      reset();
      Alert.alert("Gửi thông tin thành công!");
    }
  };

  const onSubmitError = (error) => {
    console.log(error);
  };

  return (
    <View style={{ rowGap: 5 }}>
      {commentList.map((comment) => (
        <View
          key={comment.id}
          style={{
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: "#fff",
          }}
        >
          <View style={{ flexDirection: "row", columnGap: 2 }}>
            <Text style={{ fontWeight: "bold" }}>{comment.username}</Text>
            <Text> - </Text>
            <Text style={{ fontStyle: "italic" }}>{comment.phone}</Text>
          </View>
          <Text>{comment.content}</Text>
        </View>
      ))}
      {commentList.length === 0 && (
        <View>
          <Text
            style={{ fontWeight: "bold", fontSize: 16, textAlign: "center" }}
          >
            Chưa có đánh giá nào!
          </Text>
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "stretch",
        }}
      >
        <Controller
          control={control}
          name="content"
          rules={{ required: "required" }}
          render={({ field: { value, onBlur, onChange } }) => (
            <TextInput
              mode="outlined"
              style={{ width: "80%" }}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
        />
        <Button
          mode="contained"
          style={[
            { borderRadius: 0, justifyContent: "center", marginTop: 7 },
            Object.keys(errors).length > 0
              ? { backgroundColor: "red" }
              : { backgroundColor: "teal" },
          ]}
          onPress={handleSubmit(onSubmit, onSubmitError)}
          disabled={isSubmitting}
        >
          GỬI
        </Button>
      </View>
    </View>
  );
};

export default CommentBlock;
