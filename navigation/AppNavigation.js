import { createStackNavigator } from "@react-navigation/stack";
import ChartListScreen from "../screens/ChartListScreen";
import HomeScreen from "../screens/HomeScreen";
import RegisterResultScreen from "../screens/RegisterResultScreen";
import MemberScreen from "../screens/MemberScreen";

const Stack = createStackNavigator();

const AppNavigation = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerStyle: { backgroundColor: "black" },
      headerTintColor: "#ff4500",
    }}
  >
    <Stack.Screen name="KGHIO" component={HomeScreen} />
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

export default AppNavigation;