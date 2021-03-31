import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

import Splash from './Splash';
import { PlayerContext } from '../context/PlayerContext';
import Theme from '../theme/theme';

const Item = ({ name, phoneNumber, golfID }) => (
  <View style={styles.item}>
    <Text style={{ ...styles.name, backgroundColor: null }}>{name}</Text>

    <Text style={{ ...styles.phoneNumber, backgroundColor: null }}>
      {phoneNumber}
    </Text>

    <Text style={{ ...styles.golfID, backgroundColor: null }}>{golfID}</Text>
  </View>
);

const MemberScreen = () => {
  const { getPlayers, getPlayerLoading } = useContext(PlayerContext);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    getPlayers().then(setPlayers);
  }, []);

  return (
    <ScrollView style={{ backgroundColor: 'black' }}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/golfBall.png')}
          style={styles.imageBackgroundStyle}
        >
          <Text style={styles.header}>Medlemmar</Text>
        </ImageBackground>

        <View style={styles.namePhoneIDView}>
          <Text style={{ ...styles.text, width: '37%' }}>Namn</Text>
          <View />

          <Text style={{ ...styles.text, width: '33%', textAlign: 'center' }}>
            Tel
          </Text>
          <View />

          <Text style={{ ...styles.text, width: '30%', textAlign: 'right' }}>
            Golf ID
          </Text>
        </View>

        {getPlayerLoading && <Splash />}

        <View style={styles.chartView}>
          <FlatList
            data={players}
            renderItem={({ item }) => {
              return (
                <Item
                  name={item.name}
                  phoneNumber={item.phoneNumber}
                  golfID={item.golfID}
                />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <Text style={styles.kghio}>KGHIO 2021</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.black,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  homeView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: Theme.colors.black,
  },
  header: {
    color: Theme.colors.white,
    fontSize: Theme.fontSize.H1,
    alignSelf: 'center',
    marginTop: 180,
    fontFamily: Theme.fontFamily.fontFamilyHeader,
  },
  text: {
    color: Theme.colors.white,
    fontFamily: Theme.fontFamilyText,
    fontSize: Theme.fontSize.caption,
  },
  namePhoneIDView: {
    width: '100%',
    borderRadius: 2,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginTop: 0,
    borderColor: Theme.colors.white,
    backgroundColor: Theme.colors.grey,
    borderWidth: 1,
    alignSelf: 'center',
    fontFamily: Theme.fontFamilyText,
  },
  chartView: {
    backgroundColor: Theme.colors.grey,
    flexDirection: 'column',
    width: '100%',
    marginTop: 0,
  },
  item: {
    backgroundColor: Theme.colors.black,
    padding: 1,
    marginVertical: 1,
    marginHorizontal: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: Theme.fontSize.caption,
    color: Theme.colors.white,
    fontFamily: Theme.fontFamilyText,
    width: '37%',
  },
  phoneNumber: {
    fontSize: Theme.fontSize.caption,
    width: '33%',
    textAlign: 'center',
    color: Theme.colors.white,
    fontFamily: Theme.fontFamilyText,
  },
  golfID: {
    fontSize: Theme.fontSize.caption,
    color: Theme.colors.white,
    width: '30%',
    textAlign: 'right',
    fontFamily: Theme.fontFamilyText,
  },

  kghio: {
    fontSize: 20,
    color: Theme.colors.white,
    marginTop: 40,
    fontFamily: Theme.fontFamilyText,
  },
  imageBackgroundStyle: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    marginTop: -120,
  },
});

export default MemberScreen;
