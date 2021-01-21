import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChartListScreen from "./screens/ChartListScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterResultScreen from "./screens/RegisterResultScreen";

const test = () => {
  return <Text>Test</Text>;
};

const Stack = createStackNavigator();

const StackExample1 = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerStyle: { backgroundColor: "black" },
      headerTintColor: "orange",
    }}
  >
    <Stack.Screen name="KGHIO" component={HomeScreen} />
    <Stack.Screen
      name="RegisterResultScreen"
      component={RegisterResultScreen}
    />
    <Stack.Screen name="ChartListScreen" component={ChartListScreen} />
  </Stack.Navigator>
);

const StackExample = () => (
  <Stack.Navigator
    initialRouteName="KGHIO"
    screenOptions={{
      headerStyle: { backgroundColor: "orange" },
    }}
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: "First Screen",
        // headerStyle: styles.header,
        headerRight: () => (
          <Button
            title="Press me"
            onPress={() => console.log("Button was pressed")}
          />
        ),
        // headerTitle: <CustomHeader />,
      }}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <StackExample1 />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
