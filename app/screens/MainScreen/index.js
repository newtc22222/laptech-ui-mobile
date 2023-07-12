import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Feather";

import CartScreen from "./Cart";
import HomeScreen from "./Home";
import InvoicesScreen from "./Invoices";
import ProductsScreen from "./Products";
import ProfileScreen from "./Profile";

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
        name="Invoice"
        component={InvoicesScreen}
        options={{
          title: "Hóa đơn",
          headerTitle: "Lịch sử đặt hàng",
          tabBarIcon: (props) => <Icon name="shopping-bag" {...props} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Tài khoản",
          headerShown: false,
          tabBarIcon: (props) => <Icon name="meh" {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
