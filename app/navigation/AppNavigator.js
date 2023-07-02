import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  ForgotPasswordScreen,
  LoginScreen,
  RegisterScreen,
  CheckoutScreen,
  InvoiceHistoryScreen,
  ProductDetailScreen,
  MainScreen,
} from "../screens";
import { useAppContext } from "../components/context/AppContext";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { profile } = useAppContext();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        {profile.maxAgeToken > Date.now() ? (
          <>
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen
              name="InvoiceHistory"
              component={InvoiceHistoryScreen}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetailScreen}
              initialParams={{ productId: null }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
