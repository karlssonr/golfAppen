import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import Splash from './Splash';
import { PlayerContext } from '../context/PlayerContext';
import Theme from '../theme/theme';
import moment from 'moment';

const LatestGolfRoundsScreen = ({ navigation }) => {
  const { getGolfGames, getGolfGamesLoading } = useContext(PlayerContext);

  const [golfGames, setGolfGames] = useState([]);

  const getAndSetGolfGames = async () => {
    await getGolfGames().then(setGolfGames);
  };

  const sortGolfGamesArray = (golfGames) => {
    golfGames.sort(function (x, y) {
      console.log('x: ', x.date.date.seconds);
      console.log('y: ', y.date.date.seconds);
      return x.date.date.seconds - y.date.date.seconds;
    });
  };

  useEffect(() => {
    getAndSetGolfGames();
    sortGolfGamesArray(golfGames);
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
        {getGolfGamesLoading && <Splash />}
        {golfGames && (
          <FlatList
            style={{ marginBottom: 50 }}
            data={golfGames}
            renderItem={({ item, index }) => {
              // console.log('item: ', golfGames);
              let dateFromTimeStamp = item.date.date.toDate();

              let date = moment(dateFromTimeStamp).format('MMMM Do, YYYY');

              return (
                <View style={{ margin: 10 }}>
                  <View style={{}}>
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
                      {/* <Text style={{ ...styles.culumText, width: '5%' }}></Text> */}
                      <Text
                        style={{
                          ...styles.culumText,
                          width: '40%',
                          left: 10,
                        }}
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
                  {item.playerOne && (
                    <GolfRoundRow
                      name={item.playerOne.name}
                      points={item.playerOne.points}
                      extraPoints={item.playerOne.extraPoints}
                    />
                  )}

                  {item.playerTwo && (
                    <GolfRoundRow
                      name={item.playerTwo.name}
                      points={item.playerTwo.points}
                      extraPoints={item.playerTwo.extraPoints}
                    />
                  )}

                  {item.playerThree && (
                    <GolfRoundRow
                      name={item.playerThree.name}
                      points={item.playerThree.points}
                      extraPoints={item.playerThree.extraPoints}
                    />
                  )}
                  {item.playerFour && (
                    <GolfRoundRow
                      name={item.playerFour.name}
                      points={item.playerFour.points}
                      extraPoints={item.playerFour.extraPoints}
                    />
                  )}
                </View>
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

export default LatestGolfRoundsScreen;
