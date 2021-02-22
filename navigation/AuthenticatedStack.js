import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Platform } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ChartListScreen from '../screens/ChartListScreen';
import RegisterResultScreen from '../screens/RegisterResultScreen';
import MemberScreen from '../screens/MemberScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Theme from '../theme/theme';
import { AuthContext } from '../context/AuthContext';

const Stack = createStackNavigator();

export default function AuthenticatedStack() {
  const { user, signOut } = useContext(AuthContext);

  let userName = user.displayName;
  return (
    <Stack.Navigator
      initialRouteName="Home"
      // options={{ headerTitleAlign: 'center' }}
      screenOptions={{
        headerStyle: {
          backgroundColor: 'black',
          alignItems: 'center',
        },
        headerTintColor: Theme.orange,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          title: userName,
          headerTitleAlign: 'center',
          headerRight: () => (
            <Button
              backgroundColor={null}
              onPress={() => {
                console.log('profil');
                navigation.navigate('ProfileScreen');
              }}
              title="Profil"
              color={Platform.OS === 'ios' ? '#fff' : 'black'}
            />
          ),
          headerLeft: () => (
            <Button
              onPress={() => {
                signOut();
              }}
              title="Logga Ut"
              color={Platform.OS === 'ios' ? '#fff' : 'black'}
            />
          ),
        })}
      />
      <Stack.Screen
        name="RegisterResultScreen"
        options={{ title: 'Registrera Resultat' }}
        component={RegisterResultScreen}
      />
      <Stack.Screen
        name="ChartListScreen"
        component={ChartListScreen}
        options={{ title: 'Tabell' }}
      />
      <Stack.Screen
        name="MemberScreen"
        component={MemberScreen}
        options={{ title: 'Medlemmar' }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ title: 'Profil' }}
      />
    </Stack.Navigator>
  );
}
