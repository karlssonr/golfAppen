import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Platform } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ChartListScreen from '../screens/ChartListScreen';
import RegisterResultScreen from '../screens/RegisterResultScreen';
import MemberScreen from '../screens/MemberScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LatestGolfRoundsScreen from '../screens/LatestGolfRoundsScreen';
import MyGolfRoundsScreen from '../screens/MyGolfRoundsScreen';
import ChatRoom from '../chat/ChatRoom';
import CreateChatRoom from '../chat/CreateChatRoom';
import Messages from '../chat/Messages';
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
          // alignItems: 'center',
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
        })}
      />
      <Stack.Screen
        name="RegisterResultScreen"
        options={{ title: '' }}
        component={RegisterResultScreen}
      />
      <Stack.Screen
        name="ChartListScreen"
        component={ChartListScreen}
        options={{ title: '' }}
      />
      <Stack.Screen
        name="MemberScreen"
        component={MemberScreen}
        options={{ title: '' }}
      />
      <Stack.Screen
        name="LatestGolfRoundsScreen"
        component={LatestGolfRoundsScreen}
        options={({ navigation, route }) => ({
          title: '',
          headerTitleAlign: 'center',
          headerRight: () => (
            <Button
              backgroundColor={null}
              onPress={() => navigation.navigate('MyGolfRoundsScreen')}
              title="Mina rundor"
              color={Platform.OS === 'ios' ? Theme.orange : 'black'}
            />
          ),
        })}
      />

      <Stack.Screen
        name="MyGolfRoundsScreen"
        component={MyGolfRoundsScreen}
        options={{ title: 'Mina rundor' }}
      />

      <Stack.Screen
        name="CreateChatRoom"
        component={CreateChatRoom}
        options={{ title: 'Skapa chatt' }}
      />

      <Stack.Screen
        name="Messages"
        component={Messages}
        options={({ route }) => ({
          title: route.params.thread.name,
        })}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={({ navigation, route }) => ({
          title: '',
          headerTitleAlign: 'center',
          headerRight: () => (
            <Button
              backgroundColor={null}
              onPress={() => {
                navigation.navigate('CreateChatRoom');
              }}
              title="Skapa chatt"
              color={Platform.OS === 'ios' ? Theme.orange : 'black'}
            />
          ),
        })}
      />

      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={() => ({
          title: 'Profil',
          headerTitleAlign: 'center',
          headerRight: () => (
            <Button
              backgroundColor={null}
              onPress={() => {
                signOut();
              }}
              title="Logga ut"
              color={Platform.OS === 'ios' ? '#fff' : 'black'}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}
