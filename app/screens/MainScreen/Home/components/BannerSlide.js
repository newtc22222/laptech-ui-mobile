import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ProductService } from "../../../../services";
import { Carousel } from "../../../../components/common";

const BannerSlide = () => {
  const [bannerList, setBannerList] = useState([]);

  useEffect(() => {
    ProductService.getAllBanners().then((res) => setBannerList(res.data));
  }, []);

  if (bannerList.length === 0) {
    return <View></View>;
  }
  return <Carousel data={bannerList} />;
};

export default BannerSlide;
