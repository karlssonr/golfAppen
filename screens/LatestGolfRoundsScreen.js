/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import Splash from './Splash';
import { PlayerContext } from '../context/PlayerContext';
import Theme from '../theme/theme';
import moment from 'moment';

const LatestGolfRoundsScreen = () => {
  const { getGolfGames, getGolfGamesLoading } = useContext(PlayerContext);

  const [golfGames, setGolfGames] = useState([]);

  const [golfGamesFromDB, setGolfGamesFromDB] = useState([]);

  const Moment = require('moment');

  useEffect(() => {
    // getGolfGames();
    getAndSetGolfGames();
  }, []);

  useEffect(() => {
    // console.log(golfGamesFromDB);

    sortGolfGamesArray(golfGamesFromDB);
  }, [golfGamesFromDB]);

  const getAndSetGolfGames = async () => {
    await getGolfGames().then(setGolfGamesFromDB);
  };

  const sortGolfGamesArray = (golfGamesArray) => {
    let sortedArray = [];
    let arrayToSort = [];

    golfGamesArray.forEach((golfGame) => {
      let dateFromTimeStamp = golfGame.date.date.toDate();
      let date = moment(dateFromTimeStamp).format('YYYYMMDD');

      // console.log('golfGame: ', date);

      arrayToSort.push({
        ...golfGame,
        date: {
          date: date,
        },
      });
    });

    sortedArray = arrayToSort.sort(
      (a, b) =>
        new Moment(a.date.date).format('YYYYMMDD') -
        new Moment(b.date.date).format('YYYYMMDD')
    );
    sortedArray.reverse();
    setGolfGames(sortedArray);
  };

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
              let date = moment(item.date.date).format('MMMM Do, YYYY');

              // console.log('item: ', item.date.date);

              return (
                <View style={{ margin: 10 }}>
                  <View style={{}}>
                    <Text style={styles.date}>{date}</Text>
                    <View style={styles.namePointsExtra}>
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
  date: {
    fontSize: Theme.fontSize.largeCaption,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: null,
    color: Theme.colors.white,
    backgroundColor: null,

    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Theme.colors.black,
    alignItems: 'stretch',
  },
  golfRoundRow: {
    backgroundColor: Theme.colors.lightBlack,
    padding: 1,
    marginVertical: 1,
    marginHorizontal: 1,
    flexDirection: 'row',
  },

  player: {
    fontSize: Theme.fontSize.caption,
    left: 10,
    width: '40%',
    color: Theme.colors.white,
    fontFamily: Theme.fontFamilyText,
  },
  score: {
    fontSize: Theme.fontSize.caption,
    textAlign: 'center',
    color: Theme.colors.orange,
    fontFamily: Theme.fontFamilyText,

    width: '15%',
    alignSelf: 'center',
  },
  extraPoints: {
    fontSize: Theme.fontSize.caption,
    width: '35%',
    textAlign: 'right',
    color: Theme.colors.white,

    fontFamily: Theme.fontFamilyText,
    right: 10,
  },
  namePointsExtra: {
    width: '100%',
    borderRadius: 2,

    flexDirection: 'row',

    borderColor: Theme.colors.white,
    backgroundColor: Theme.colors.grey,

    borderWidth: 1,
    alignSelf: 'center',
    fontFamily: Theme.fontFamilyText,
  },
  culumText: {
    fontSize: Theme.fontSize.caption,
    color: Theme.colors.white,
    fontFamily: Theme.fontFamilyText,
  },
});

export default LatestGolfRoundsScreen;
