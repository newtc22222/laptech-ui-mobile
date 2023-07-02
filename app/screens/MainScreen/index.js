import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Feather";

import CartScreen from "./Cart";
import HomeScreen from "./Home";
import ProductsScreen from "./Products";
import ProfileScreen from "./Profile";
import SettingScreen from "./Setting";

const Tab = createBottomTabNavigator();

const MainScreen = ({ navigation }) => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Trang chủ",
          headerShown: false,
          tabBarIcon: (props) => <Icon name="home" {...props} />,
        }}
      />
      <Tab.Screen
        name="Product"
        component={ProductsScreen}
        options={{
          title: "Sản phẩm",
          headerShown: false,
          tabBarIcon: (props) => <Icon name="search" {...props} />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: "Giỏ hàng",
          headerShown: false,
          tabBarIcon: (props) => <Icon name="shopping-cart" {...props} />,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          title: "Cài đặt",
          headerTitle: "Thiết lập ứng dụng",
          tabBarIcon: (props) => <Icon name="settings" {...props} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Tài khoản",
          headerTitle: "Thông tin tài khoản",
          tabBarIcon: (props) => <Icon name="meh" {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
