import React, { useRef } from "react";
import {
  View,
  Image,
  ScrollView,
  Dimensions,
  Animated,
  PanResponder,
} from "react-native";

const Carousel = ({ data = [] }) => {
  const scrollRef = useRef(null);

  const screenWidth = Dimensions.get("window").width;

  // Initialize the scroll position animated value
  const scrollX = useRef(new Animated.Value(0)).current;

  // Set up the pan responder for touch gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        // Update the scroll position based on the gesture movement
        const offsetX = -gestureState.dx / screenWidth;
        scrollX.setValue(offsetX);
      },
      onPanResponderRelease: (_, gestureState) => {
        // Calculate the index of the active item based on the gesture end position
        const index = Math.round(-gestureState.dx / screenWidth);

        // Animate the scroll position to the active item
        Animated.spring(scrollX, {
          toValue: -index,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        {...panResponder.panHandlers}
      >
        {data.map((image, index) => (
          <View key={index} style={{ width: screenWidth, height: 200 }}>
            <Image source={{ uri: image.path }} style={{ flex: 1 }} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Carousel;
