/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Splash from './Splash';
import { PlayerContext } from '../context/PlayerContext';
import Theme from '../theme/theme';

const Champs = () => {
  const champsData = [
    {
      year: 2020,
      name: 'Taesler',
    },
    {
      year: 2019,
      name: 'Murray',
    },
    {
      year: 2018,
      name: 'Jerselius',
    },
    {
      year: 2017,
      name: 'Jerselius',
    },
    {
      year: 2016,
      name: 'Holm',
    },
    {
      year: 2015,
      name: 'Swaffer',
    },
    {
      year: 2014,
      name: 'Doglia',
    },
  ];

  const ChampRow = ({ year, name }) => (
    <View style={{ ...styles.champRow }}>
      <Text style={{ ...styles.year, backgroundColor: null }}>{year}</Text>
      <Text style={{ ...styles.name, backgroundColor: null }}>{name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/pokal.png')}
        style={styles.imageBackgroundStyle}
      >
        <Text style={styles.header}>Champs</Text>
      </ImageBackground>

      <View style={styles.chartView}>
        {champsData && (
          <FlatList
            style={{ backgroundColor: Theme.colors.black }}
            data={champsData}
            renderItem={({ item, index }) => {
              return <ChampRow year={item.year} name={item.name} />;
            }}
            keyExtractor={(_, index) => index.toString()}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  KGHIOBox: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  container: {
    flex: 1,
    backgroundColor: Theme.colors.black,
    alignItems: 'center',
  },
  flatList: {
    backgroundColor: Theme.colors.white,
  },
  header: {
    color: Theme.colors.white,
    fontSize: Theme.fontSize.H1,
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginLeft: 20,
    fontFamily: Theme.fontFamily.fontFamilyHeader,
    marginTop: 120,
  },

  champRow: {
    backgroundColor: Theme.colors.black,
    padding: 5,
    // marginVertical: 1,
    // marginHorizontal: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  year: {
    fontSize: Theme.fontSize.H4,
    color: Theme.colors.orange,
    width: '30%',
    textAlign: 'right',
  },
  name: {
    fontSize: Theme.fontSize.H4,
    left: 10,
    width: '40%',

    color: 'white',
    fontFamily: Theme.fontFamilyText,
  },

  chartView: {
    backgroundColor: Theme.colors.grey,
    flexDirection: 'column',
    width: '100%',
    marginTop: 0,
  },

  kghio: {
    fontSize: 20,
    color: Theme.colors.white,
    marginTop: 20,
    fontFamily: Theme.fontFamilyText,
  },
  text: {
    color: Theme.colors.white,
    marginTop: 10,
    fontFamily: Theme.fontFamilyText,
  },

  imageBackgroundStyle: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    marginTop: -90,
  },
});

export default Champs;
