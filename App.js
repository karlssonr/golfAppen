import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import AppNavigation from './navigation/AppNavigation';
import AuthNavigation from './navigation/AuthNavigation';
import PlayerContextProvider from './context/PlayerContext';

import AuthContextProvider from './context/AuthContext';

export default function App() {
  return (
    <PlayerContextProvider>
      <AuthContextProvider>
        <AuthNavigation />
      </AuthContextProvider>
    </PlayerContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
