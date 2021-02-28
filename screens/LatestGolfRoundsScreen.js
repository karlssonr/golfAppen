import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

import Splash from './Splash';
import { PlayerContext } from '../context/PlayerContext';
import Theme from '../theme/theme';

import CustomDatePicker from '../components/CustomDatePicker';

// const GolfRoundRow = ({ name, totalScore, averageOfBest7Rounds }) => (
//   <View style={{ ...styles.item }}>
//     <Text style={{ ...styles.title, backgroundColor: null }}>{name}</Text>

//     <Text style={{ ...styles.totalScore, backgroundColor: null }}>
//       {totalScore}
//     </Text>

//     <Text style={{ ...styles.sevenBest, backgroundColor: null }}>
//       {averageOfBest7Rounds}
//     </Text>
//   </View>
// );

const LatestGolfRoundsScreen = () => {
  return (
    <View style={{ marginHorizontal: 20, marginTop: 50 }}>
      <CustomDatePicker
        textStyle={{
          paddingVertical: 15,
          paddingHorizontal: 10,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        onDateChange={(value) => console.log('Date changed', value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: null,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default LatestGolfRoundsScreen;
