import React, { useRef } from "react";
import { View, FlatList, Animated, StyleSheet } from "react-native";

const Carousel = ({ data = [], _renderItem }) => {
  // const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  // const viewableItemsChanged = useRef(({ viewableItems }) => {
  //   setCurrentIndex(viewableItems[0].index);
  // }).current;
  const viewableItemsChanged = useRef().current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={_renderItem}
        horizontal
        showsHorizontalScrollIndicator
        pagingEnabled
        bounces={false}
        key={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        // scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Carousel;
