import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Theme from '../theme/theme';

export default function Splash() {
  return (
    <View style={styles.container}>
      <Text>App Logo</Text>
      <ActivityIndicator animating={true} color={Theme.orange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
