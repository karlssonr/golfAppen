import React, { useContext, useEffect, useState } from 'react';
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
import Stats from '../screens/Stats';
import Messages from '../chat/Messages';
import Theme from '../theme/theme';
import { AuthContext } from '../context/AuthContext';
import Champs from '../screens/Champs';
import firebase from '../firebase';
import { PlayerContext } from '../context/PlayerContext';

const Stack = createStackNavigator();

export default function AuthenticatedStack() {
  const { user, signOut } = useContext(AuthContext);
  const { getPlayer } = useContext(PlayerContext);

  const [userName, setUserName] = useState(user.displayName);

  useEffect(() => {
    const unsubscribeListener = firebase
      .firestore()
      .collection('players')
      .onSnapshot(
        (snapshot) => {
          if (snapshot) {
            setUserName(user.displayName);

            console.log('snapshot');
          }
          return;
        },
        (error) => {
          console.log('error', error);
        }
      );
    return () => unsubscribeListener();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: Theme.colors.black,
        },
        headerTintColor: Theme.colors.orange,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: userName,
          headerTitleAlign: 'center',
          headerRight: () => (
            <Button
              backgroundColor={null}
              onPress={() => {
                console.log('profil');
                navigation.navigate('ProfileScreen');
              }}
              title="Profile"
              color={
                Platform.OS === 'ios' ? Theme.colors.white : Theme.colors.black
              }
            />
          ),
        })}
      />
      <Stack.Screen
        name="RegisterResultScreen"
        options={{ title: '' }}
        component={RegisterResultScreen}
      />
      <Stack.Screen name="Stats" options={{ title: '' }} component={Stats} />
      <Stack.Screen name="Champs" options={{ title: '' }} component={Champs} />
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
        options={({ navigation }) => ({
          title: '',
          headerTitleAlign: 'center',
          headerRight: () => (
            <Button
              backgroundColor={null}
              onPress={() => navigation.navigate('MyGolfRoundsScreen')}
              title="My rounds"
              color={
                Platform.OS === 'ios' ? Theme.colors.orange : Theme.colors.black
              }
            />
          ),
        })}
      />

      <Stack.Screen
        name="MyGolfRoundsScreen"
        component={MyGolfRoundsScreen}
        options={{ title: 'My rounds' }}
      />

      <Stack.Screen
        name="CreateChatRoom"
        component={CreateChatRoom}
        options={{ title: 'Create chat' }}
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
        options={({ navigation }) => ({
          title: '',
          headerTitleAlign: 'center',
          headerRight: () => (
            <Button
              backgroundColor={null}
              onPress={() => {
                navigation.navigate('CreateChatRoom');
              }}
              title="Create chat"
              color={
                Platform.OS === 'ios' ? Theme.colors.orange : Theme.colors.black
              }
            />
          ),
        })}
      />

      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={() => ({
          title: 'Profile',
          headerTitleAlign: 'center',
          headerRight: () => (
            <Button
              backgroundColor={null}
              onPress={() => {
                signOut();
              }}
              title="Log out"
              color={
                Platform.OS === 'ios' ? Theme.colors.white : Theme.colors.black
              }
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}
