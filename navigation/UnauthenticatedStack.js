import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen"

const Stack = createStackNavigator();

export default function UnauthenticatedStack() {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerStyle: { backgroundColor: "black" },
        headerTintColor: "#ff4500",
      }}
    >
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ title: "KGHIO" }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ title: "Skapa Konto" }}
      />
      <Stack.Screen name="ForgotPasswordScreen" 
      component={ForgotPasswordScreen}
      options={{ title: "Glömt lösenord"}}/>
    </Stack.Navigator>
  );
}
