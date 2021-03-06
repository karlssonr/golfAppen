/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Splash from './Splash';
import { PlayerContext } from '../context/PlayerContext';
import Theme from '../theme/theme';

const Item = ({ name, nickName, phoneNumber, golfID }) => (
  <View style={styles.item}>
    <Text style={{ ...styles.name, backgroundColor: null }}>{name}</Text>
    <Text style={{ ...styles.nickName, backgroundColor: null }}>
      {nickName}
    </Text>
    <Text style={{ ...styles.phoneNumber, backgroundColor: null }}>
      {phoneNumber}
    </Text>

    <Text style={{ ...styles.golfID, backgroundColor: null }}>{golfID}</Text>
  </View>
);

const MemberScreen = () => {
  const { getPlayers, getPlayerLoading } = useContext(PlayerContext);
  const [players, setPlayers] = useState([]);
  // const [playersSorted, setPlayersSorted] = useState([]);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    getPlayers().then(setPlayers);
  }, []);

  const renderFlatListHeader = () => {
    return (
      <View style={styles.namePhoneIDView}>
        <Text style={{ ...styles.text, width: '25%', backgroundColor: null }}>
          Name
        </Text>

        <Text style={{ ...styles.text, width: '25%', backgroundColor: null }}>
          Nickname
        </Text>
        <Text
          style={{
            ...styles.text,
            width: '25%',
            textAlign: 'left',
            backgroundColor: null,
          }}
        >
          Phone
        </Text>

        <Text
          style={{
            ...styles.text,
            width: '25%',
            textAlign: 'left',
            backgroundColor: null,
          }}
        >
          Golf ID
        </Text>
      </View>
    );
  };

  return (
    <ScrollView style={{ backgroundColor: 'black' }}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/Members.png')}
          style={styles.imageBackgroundStyle}
        >
          <Text style={styles.header}>Members</Text>
        </ImageBackground>

        {getPlayerLoading && <Splash />}

        <View style={styles.chartView}>
          <ScrollView
            contentContainerStyle={{ width: windowWidth + 200 }}
            horizontal
            alwaysBounceHorizontal
            style={{
              flexDirection: 'column',
              marginHorizontal: 0,
            }}
          >
            <FlatList
              data={players.sort((a, b) => a.name.localeCompare(b.name))}
              ListHeaderComponent={renderFlatListHeader}
              renderItem={({ item }) => {
                let nickName = '';
                if (item.nickName) {
                  nickName = item.nickName;
                }
                return (
                  <Item
                    name={item.name}
                    nickName={nickName}
                    phoneNumber={item.phoneNumber}
                    golfID={item.golfID}
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </ScrollView>
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
    alignSelf: 'flex-start',
    marginTop: 40,
    fontFamily: Theme.fontFamily.fontFamilyHeader,
    marginLeft: 20,
  },
  text: {
    color: Theme.colors.white,
    fontFamily: Theme.fontFamilyText,
    fontSize: Theme.fontSize.caption,
  },
  namePhoneIDView: {
    // height: '10%',
    width: '100%',
    borderRadius: 2,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginTop: 0,
    borderColor: Theme.colors.white,
    backgroundColor: Theme.colors.grey,
    borderWidth: 1,
    // alignSelf: 'center',
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
    width: '25%',
  },
  nickName: {
    fontSize: Theme.fontSize.caption,
    color: Theme.colors.orange,
    fontFamily: Theme.fontFamilyText,

    width: '25%',
  },
  phoneNumber: {
    fontSize: Theme.fontSize.caption,
    width: '25%',
    textAlign: 'left',
    color: Theme.colors.white,
    fontFamily: Theme.fontFamilyText,
  },
  golfID: {
    fontSize: Theme.fontSize.caption,
    color: Theme.colors.white,
    width: '25%',
    textAlign: 'left',
    fontFamily: Theme.fontFamilyText,
  },

  kghio: {
    fontSize: 20,
    color: Theme.colors.white,
    marginTop: 40,
    fontFamily: Theme.fontFamily.fontFamilyText,
  },
  imageBackgroundStyle: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.5,
    // marginTop: -120,
  },
});

export default MemberScreen;
