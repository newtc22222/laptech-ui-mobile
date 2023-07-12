import React, { useEffect, useState } from "react";
import { View } from "react-native";

import BannerItem from "./BannerItem";
import { Carousel } from "../../../../../components/common";

import { ProductService } from "../../../../../services";

const BannerSlide = () => {
  const [bannerList, setBannerList] = useState([]);

  useEffect(() => {
    ProductService.getAllBanners().then((res) => setBannerList(res.data));
  }, []);

  if (bannerList.length === 0) {
    return <View></View>;
  }
  return (
    <Carousel
      data={bannerList}
      _renderItem={({ item }) => <BannerItem item={item} />}
    />
  );
};

export default BannerSlide;
