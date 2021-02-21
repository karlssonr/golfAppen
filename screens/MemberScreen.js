import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import Splash from './Splash';
import { PlayerContext } from '../context/PlayerContext';
import Theme from '../theme/theme';

const Item = ({ name, phoneNumber, golfID }) => (
  <View style={styles.item}>
    <Text style={{ ...styles.name, backgroundColor: null }}>{name}</Text>

    <View style={{ flex: 1 }} />
    <View style={{ flex: 1 }} />
    <Text style={{ ...styles.phoneNumber, backgroundColor: null }}>
      {phoneNumber}
    </Text>

    <View style={{ flex: 1 }}></View>

    <Text style={{ ...styles.golfID, backgroundColor: null }}>{golfID}</Text>
  </View>
);

const MemberScreen = () => {
  const { getPlayers, getPlayerLoading } = useContext(PlayerContext);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPlayers().then(setPlayers);

    console.log('players: ', players);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/pokal.png')}
        style={styles.imageBackgroundStyle}
      >
        <Text style={styles.header}>Medlemmar</Text>
      </ImageBackground>

      <View style={styles.namePhoneIDView}>
        <Text style={styles.text}>Namn</Text>
        <View />

        <Text style={styles.text}>Tel</Text>
        <View />

        <Text style={{ ...styles.text }}>Golf ID</Text>
      </View>

      {getPlayerLoading && <Splash />}

      <View style={styles.chartView}>
        <FlatList
          data={players}
          renderItem={({ item }) => {
            console.log('item:   ', item);
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  homeView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'black',
  },
  header: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'center',
    marginTop: 180,
    fontFamily: Theme.fontFamilyHeader,
  },
  text: {
    color: 'white',
    fontFamily: Theme.fontFamilyText,
  },
  namePhoneIDView: {
    width: '100%',
    borderRadius: 2,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginTop: 0,
    borderColor: 'white',
    backgroundColor: 'grey',

    borderWidth: 1,
    alignSelf: 'center',
    fontFamily: Theme.fontFamilyText,
  },
  chartView: {
    backgroundColor: 'grey',
    flexDirection: 'column',
    width: '100%',
    marginTop: 0,

    // height: '40%',
  },
  item: {
    backgroundColor: 'black',
    padding: 1,
    marginVertical: 1,
    marginHorizontal: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 15,
    marginLeft: 10,
    color: 'white',
    fontFamily: Theme.fontFamilyText,
    width: 70,
  },
  phoneNumber: {
    fontSize: 15,
    //marginLeft: 40
    textAlign: 'right',
    color: 'white',
    fontFamily: Theme.fontFamilyText,
  },
  golfID: {
    fontSize: 15,
    //marginLeft: 40
    color: 'white',
    marginRight: 25,
    fontFamily: Theme.fontFamilyText,
  },

  kghio: {
    fontSize: 20,
    color: 'white',
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
