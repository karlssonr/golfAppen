import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ChartListScreen from "../screens/ChartListScreen";
import RegisterResultScreen from "../screens/RegisterResultScreen";
import MemberScreen from "../screens/MemberScreen";

const Stack = createStackNavigator();

export default function AuthenticatedStack() {
  return (
    <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerStyle: { backgroundColor: "black" },
      headerTintColor: "#ff4500",
    }}
  >
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen
      name="RegisterResultScreen"
      options={{ title: "Registrera Resultat" }}
      component={RegisterResultScreen}
    />
    <Stack.Screen
      name="ChartListScreen"
      component={ChartListScreen}
      options={{ title: "Tabell" }}
    />
    <Stack.Screen name="MemberScreen" component={MemberScreen} options={{ title: "Medlemmar" }} />
  </Stack.Navigator>
);
  
}
