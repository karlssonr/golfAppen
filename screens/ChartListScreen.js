/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable radix */
import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Dimensions,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Splash from './Splash';
import { PlayerContext } from '../context/PlayerContext';
import Theme from '../theme/theme';

const Item = ({
  positionNumber,
  name,
  totalOfBestSevenRounds,
  averageOfBest7Rounds,
  roundsPlayed,
  avrageScore,
}) => (
  <View style={{ ...styles.item }}>
    <Text style={{ ...styles.positionNumber, backgroundColor: null }}>
      {positionNumber}
    </Text>
    <Text style={{ ...styles.name, backgroundColor: null }}>{name}</Text>

    <Text style={{ ...styles.totalOfBestSevenRounds, backgroundColor: null }}>
      {totalOfBestSevenRounds}
    </Text>

    <Text style={{ ...styles.averageOfBest7Rounds, backgroundColor: null }}>
      {averageOfBest7Rounds}
    </Text>
    <Text style={{ ...styles.avrageScore, backgroundColor: null }}>
      {avrageScore}
    </Text>
    <Text style={{ ...styles.roundsPlayed, backgroundColor: null }}>
      {roundsPlayed}
    </Text>
  </View>
);

const ChartListScreen = () => {
  const { getPlayers, getPlayerScore, loadingPlayerScore } = useContext(
    PlayerContext
  );
  const [players, setPlayers] = useState([]);
  const [resultTable, setResultTable] = useState([]);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    getAndSetPlayers();
  }, []);

  useEffect(() => {
    getEachPlayerScore(players).then((value) => {
      assignResultsForEachPlayer(value);
    });
  }, [players]);

  const bubbleSort = (inputArr) => {
    let len = inputArr.length;
    let checked;
    // console.log('lenght', len);
    do {
      checked = false;
      for (let i = 0; i < len; i++) {
        if (
          inputArr[i]?.totalOfBestSevenRounds >
          inputArr[i + 1]?.totalOfBestSevenRounds
        ) {
          let tmp = inputArr[i];
          inputArr[i] = inputArr[i + 1];
          inputArr[i + 1] = tmp;

          checked = true;
        }
      }
    } while (checked);

    const reversed = inputArr.reverse();

    return reversed;
  };

  const sumAllScores = (golfroundsOfPlayer) => {
    let totalScore = 0;
    let pointsAsInt;
    let extraPointsAsInt;
    golfroundsOfPlayer.scores.forEach((scoreOfGolfroundOfPlayer) => {
      pointsAsInt = parseFloat(scoreOfGolfroundOfPlayer.points);
      extraPointsAsInt = parseFloat(scoreOfGolfroundOfPlayer.extraPoints);

      totalScore = pointsAsInt + extraPointsAsInt + totalScore;
    });

    return totalScore;
  };

  const assignResultsForEachPlayer = async (golfroundsOfPlayers) => {
    let roundsPlayed = -4;
    let totalScore = 0;
    let avrageScore = 0;
    let averageOfBest7Rounds = 0;
    let resulTableScore = [];
    let totalOfBestSevenRounds = 0;

    golfroundsOfPlayers.forEach((golfroundsOfPlayer) => {
      roundsPlayed = calculateRoundsPlayed(golfroundsOfPlayer);
      totalScore = sumAllScores(golfroundsOfPlayer);
      avrageScore = calculateAverageScore(golfroundsOfPlayer);
      averageOfBest7Rounds = calcutaleBestSevenRounds(golfroundsOfPlayer);
      totalOfBestSevenRounds = getBestSevenRoundsToltalScore(
        golfroundsOfPlayer
      );

      resulTableScore.push({
        name: golfroundsOfPlayer.name,
        nickName: golfroundsOfPlayer.nickName,
        totalScore: parseFloat(totalScore.toFixed(2)),
        avrageScore: parseFloat(avrageScore.toFixed(2)),
        averageOfBest7Rounds: parseFloat(averageOfBest7Rounds.toFixed(2)),
        totalOfBestSevenRounds: parseFloat(totalOfBestSevenRounds.toFixed(2)),
        roundsPlayed: roundsPlayed,
      });
    });

    const sortedArray = bubbleSort(resulTableScore);

    console.log('sortedArray: ', sortedArray);

    setResultTable(sortedArray);
  };

  const calculateRoundsPlayed = (golfroundsOfPlayer) => {
    let roundsPlayed = 0;

    golfroundsOfPlayer.scores.forEach(() => {
      roundsPlayed = roundsPlayed + 1;
    });

    return roundsPlayed;
  };

  const calcutaleBestSevenRounds = (golfroundsOfPlayer) => {
    let best7Rounds = [];

    let pointsAsInt;
    let extraPointsAsInt;
    let scoreOfRound;

    golfroundsOfPlayer.scores.forEach((scoreOfGolfroundOfPlayer) => {
      pointsAsInt = parseInt(scoreOfGolfroundOfPlayer.points);
      extraPointsAsInt = parseInt(scoreOfGolfroundOfPlayer.extraPoints);
      scoreOfRound = pointsAsInt + extraPointsAsInt;

      if (best7Rounds.length < 7) {
        best7Rounds.push(scoreOfRound);
      } else {
        best7Rounds.sort(getLowestNumber);

        if (best7Rounds[0] < scoreOfRound) {
          best7Rounds[0] = scoreOfRound;
        }
      }
    });

    return getAverageNumberOfArrayOfNumber(best7Rounds);
  };
  const getAverageNumberOfArrayOfNumber = (arrayOfNumbers) => {
    let sum = 0;

    arrayOfNumbers.forEach((number) => {
      sum = sum + number;
    });
    return sum / arrayOfNumbers.length;
  };

  const calculateBestOfSevenRoundsTotalScore = (arrayOfScores) => {
    let sum = 0;

    arrayOfScores.forEach((number) => {
      sum = sum + number;
    });

    return sum;
  };

  const getBestSevenRoundsToltalScore = (golfroundsOfPlayer) => {
    let best7Rounds = [];

    let pointsAsInt;
    let extraPointsAsInt;
    let scoreOfRound;

    golfroundsOfPlayer.scores.forEach((scoreOfGolfroundOfPlayer) => {
      pointsAsInt = parseFloat(scoreOfGolfroundOfPlayer.points);
      extraPointsAsInt = parseFloat(scoreOfGolfroundOfPlayer.extraPoints);
      scoreOfRound = pointsAsInt + extraPointsAsInt;

      if (best7Rounds.length < 7) {
        best7Rounds.push(scoreOfRound);
      } else {
        best7Rounds.sort(getLowestNumber);

        if (best7Rounds[0] < scoreOfRound) {
          best7Rounds[0] = scoreOfRound;
        }
      }
    });

    return calculateBestOfSevenRoundsTotalScore(best7Rounds);
  };

  const getLowestNumber = (number1, number2) => {
    if (number1 < number2) {
      return -1;
    }
    if (number1 > number2) {
      return 1;
    }

    return 0;
  };

  const calculateAverageScore = (golfroundsOfPlayer) => {
    let totalScore = sumAllScores(golfroundsOfPlayer);
    let numberOfGolfrounds = golfroundsOfPlayer.scores.length;

    return totalScore / numberOfGolfrounds;
  };

  const getEachPlayerScore = async (playersArray) => {
    let array = [];

    for (const player of playersArray) {
      let scores = await getPlayerScore(player.userID);

      array.push({
        name: player.name,
        nickName: player.nickName,
        scores: scores,
      });
    }

    return array;
  };

  const getAndSetPlayers = async () => {
    await getPlayers().then(setPlayers);
  };

  const renderFlatListHeader = () => {
    return (
      <View style={styles.namePhoneIDView}>
        <Text style={{ ...styles.culumText, width: '5%' }}></Text>
        <Text style={{ ...styles.culumText, width: '19%', left: 10 }}>
          Name
        </Text>

        <Text
          style={{ ...styles.culumText, textAlign: 'center', width: '19%' }}
        >
          Score
        </Text>

        <Text
          style={{ ...styles.culumText, textAlign: 'center', width: '19%' }}
        >
          Average
        </Text>
        <Text
          style={{ ...styles.culumText, textAlign: 'center', width: '19%' }}
        >
          Total Average
        </Text>
        <Text
          style={{ ...styles.culumText, textAlign: 'center', width: '19%' }}
        >
          Rounds Played
        </Text>
      </View>
    );
  };

  return (
    <ScrollView style={{ backgroundColor: Theme.colors.black }}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/TheRace.png')}
          style={styles.imageBackgroundStyle}
        >
          <Text style={styles.header}>
            the Race -{'\n'}Grandma´s {'\n'}Foot 2021
          </Text>
        </ImageBackground>

        <View style={styles.chartView}>
          {loadingPlayerScore && <Splash />}
          <ScrollView
            contentContainerStyle={{ width: windowWidth + 250 }}
            horizontal
            alwaysBounceHorizontal
            style={{
              flexDirection: 'column',
              marginHorizontal: 0,
            }}
          >
            {resultTable && (
              <FlatList
                data={resultTable}
                ListHeaderComponent={renderFlatListHeader}
                renderItem={({ item, index }) => {
                  let number = index + 1;
                  let positionNumber = number.toString();
                  let name = '';
                  if (item.nickName) {
                    name = item.nickName;
                  } else {
                    name = item.name;
                  }

                  return (
                    <Item
                      positionNumber={positionNumber}
                      name={name}
                      roundsPlayed={item.roundsPlayed}
                      avrageScore={item.avrageScore}
                      totalOfBestSevenRounds={item.totalOfBestSevenRounds}
                      averageOfBest7Rounds={item.averageOfBest7Rounds}
                    />
                  );
                }}
                keyExtractor={(_, index) => index.toString()}
              />
            )}
          </ScrollView>
        </View>

        <View style={styles.KGHIOBox}>
          {/* <Text style={styles.text}>Vänd luren för detaljer</Text> */}
          <Text style={styles.kghio}>KGHIO 2021</Text>
        </View>
      </View>
    </ScrollView>
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
    marginTop: 40,
    fontFamily: Theme.fontFamily.fontFamilyHeader,
    marginLeft: 20,
  },

  item: {
    backgroundColor: Theme.colors.black,
    padding: 1,
    marginVertical: 1,
    marginHorizontal: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  positionNumber: {
    fontSize: Theme.fontSize.caption,
    color: Theme.colors.white,
    width: '5%',
  },
  name: {
    fontSize: Theme.fontSize.caption,
    left: 10,
    width: '19%',

    color: Theme.colors.white,
    fontFamily: Theme.fontFamilyText,
  },
  avrageScore: {
    fontSize: Theme.fontSize.caption,
    width: '19%',
    textAlign: 'center',
    color: Theme.colors.white,
    fontFamily: Theme.fontFamilyText,
  },
  roundsPlayed: {
    fontSize: Theme.fontSize.caption,
    left: 10,
    width: '19%',
    textAlign: 'center',
    color: Theme.colors.white,
    fontFamily: Theme.fontFamilyText,
  },

  totalOfBestSevenRounds: {
    fontSize: Theme.fontSize.caption,

    textAlign: 'center',
    color: Theme.colors.orange,
    fontFamily: Theme.fontFamilyText,
    marginLeft: 0,
    width: '19%',
  },
  averageOfBest7Rounds: {
    fontSize: Theme.fontSize.caption,
    width: '19%',
    textAlign: 'center',

    color: Theme.colors.white,

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
  culumText: {
    color: Theme.colors.white,
    fontFamily: Theme.fontFamilyText,
    fontSize: Theme.fontSize.caption,
  },
  imageBackgroundStyle: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.5,
    // marginTop: -120,
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
});

export default ChartListScreen;
