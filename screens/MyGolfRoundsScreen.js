import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import Splash from './Splash';
import { PlayerContext } from '../context/PlayerContext';
import { AuthContext } from '../context/AuthContext';
import Theme from '../theme/theme';
import firebase from '../firebase';
import moment from 'moment';
import IconAndTextButton from '../components/IconAndTextButton';

const MyGolfRoundsScreen = () => {
  const { getPlayerScore, loadingPlayerScore, getPlayer } = useContext(
    PlayerContext
  );
  const { user } = useContext(AuthContext);

  const [golfGames, setGolfGames] = useState([]);

  const getAndSetGolfGames = async () => {
    await getPlayerScore(user.uid).then(setGolfGames);
    // await getPlayer(user.uid);
  };

  useEffect(() => {
    getAndSetGolfGames();
    console.log('userID: ', user.displayName);
  }, []);

  const GolfRoundRow = ({ name, points, extraPoints }) => (
    <View style={{ ...styles.golfRoundRow }}>
      <Text style={{ ...styles.player, backgroundColor: null }}>{name}</Text>

      <Text style={{ ...styles.score, backgroundColor: null }}>{points}</Text>

      <Text style={{ ...styles.extraPoints, backgroundColor: null }}>
        {extraPoints}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 30 }}>
        {loadingPlayerScore && <Splash />}
        {golfGames && (
          <FlatList
            style={{ marginBottom: 50 }}
            data={golfGames}
            renderItem={({ item, index }) => {
              let dateFromTimeStamp = item.date.toDate();

              let date = moment(dateFromTimeStamp).format('MMMM Do, YYYY');
              //   console.log(golfGames);

              //   console.log('item: ', item);

              return (
                <TouchableOpacity style={{ margin: 10, marginBottom: 40 }}>
                  <View
                    style={
                      {
                        // color: 'white',
                        // backgroundColor: 'red',
                        // width: '100%',
                      }
                    }
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        paddingHorizontal: 10,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: '#fff',
                        color: '#fff',
                        backgroundColor: 'green',
                        // width: '100%',
                        alignSelf: 'center',
                      }}
                    >
                      {date}
                    </Text>
                    <View style={styles.namePointsExtra}>
                      <Text
                        style={{ ...styles.culumText, width: '40%', left: 10 }}
                      >
                        Namn
                      </Text>

                      <Text
                        style={{
                          ...styles.culumText,
                          textAlign: 'center',
                          width: '15%',
                        }}
                      >
                        Poäng
                      </Text>

                      <Text
                        style={{
                          ...styles.culumText,
                          textAlign: 'right',
                          width: '35%',
                        }}
                      >
                        Extra
                      </Text>
                    </View>
                  </View>

                  <GolfRoundRow
                    name={user.displayName}
                    points={item.points}
                    extraPoints={item.extraPoints}
                  />
                </TouchableOpacity>
              );
            }}
            keyExtractor={(_, index) => index.toString()}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'stretch',
    // justifyContent: 'center',
  },
  golfRoundRow: {
    backgroundColor: Theme.black,
    padding: 1,
    marginVertical: 1,
    marginHorizontal: 1,
    flexDirection: 'row',
    // // justifyContent: 'center',
    // flex: 1,
    // width: '100%',
  },

  player: {
    fontSize: 15,
    left: 10,
    width: '40%',
    color: 'white',
    fontFamily: Theme.fontFamilyText,
  },
  score: {
    fontSize: 15,
    textAlign: 'center',
    color: Theme.orange,
    fontFamily: Theme.fontFamilyText,
    // marginLeft: 0,
    width: '15%',
    alignSelf: 'center',
  },
  extraPoints: {
    fontSize: 15,
    width: '35%',
    textAlign: 'right',
    color: 'white',
    // marginRight: 15,
    fontFamily: Theme.fontFamilyText,
    right: 10,
  },
  namePointsExtra: {
    width: '100%',
    borderRadius: 2,
    // justifyContent: 'space-evenly',
    flexDirection: 'row',
    // marginTop: 0,
    borderColor: 'white',
    backgroundColor: 'grey',

    borderWidth: 1,
    alignSelf: 'center',
    fontFamily: Theme.fontFamilyText,
  },
  culumText: {
    color: 'white',
    fontFamily: Theme.fontFamilyText,
  },
});

export default MyGolfRoundsScreen;
