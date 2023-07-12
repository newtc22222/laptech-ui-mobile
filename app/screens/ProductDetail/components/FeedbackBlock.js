import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import { ProductService } from "../../../services";

const FeedbackBlock = ({ productId }) => {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    ProductService.getFeedbacksOfProduct(productId)
      .then((res) => setFeedbackList(res.data))
      .catch((err) => console.log(err));
  }, [productId]);

  if (feedbackList.length === 0)
    return (
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 16, textAlign: "center" }}>
          Chưa có đánh giá nào!
        </Text>
      </View>
    );

  return (
    <View style={{ rowGap: 8 }}>
      {feedbackList.map((feedback) => {
        const stars = [];
        for (let i = 1; i <= feedback.ratingPoint; i++) {
          stars.push(<Icon key={"star-" + i} name="star" color="orange" />);
        }
        for (let j = Number(feedback.ratingPoint) + 1; j <= 5; j++) {
          stars.push(<Icon key={"star-" + j} name="staro" color="orange" />);
        }
        return (
          <View
            key={feedback.id}
            style={{
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 10,
              paddingVertical: 5,
              backgroundColor: "#fff",
              rowGap: 5,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {feedback.username}
            </Text>
            <View style={{ flexDirection: "row" }}>{stars}</View>
            <Text>{feedback.content}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default FeedbackBlock;
