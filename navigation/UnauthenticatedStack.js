import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';

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
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: "KGHIO"}}/>
    </Stack.Navigator>
  );
}
