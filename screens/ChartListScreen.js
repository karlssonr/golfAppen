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

const Item = ({ positionNumber, name, totalScore, averageOfBest7Rounds }) => (
  <View style={{ ...styles.item }}>
    <Text style={{ ...styles.positionNumber, backgroundColor: null }}>
      {positionNumber}
    </Text>
    <Text style={{ ...styles.title, backgroundColor: null }}>{name}</Text>

    <Text style={{ ...styles.totalScore, backgroundColor: null }}>
      {totalScore}
    </Text>

    <Text style={{ ...styles.sevenBest, backgroundColor: null }}>
      {averageOfBest7Rounds}
    </Text>
  </View>
);

const ChartListScreen = () => {
  const { getPlayers, getPlayerScore, loadingPlayerScore } = useContext(
    PlayerContext
  );
  const [players, setPlayers] = useState([]);
  const [resultTable, setResultTable] = useState([]);

  const bubbleSort = (inputArr) => {
    let len = inputArr.length;
    let checked;
    do {
      checked = false;
      for (let i = 0; i < len; i++) {
        if (
          inputArr[i]?.averageOfBest7Rounds >
          inputArr[i + 1]?.averageOfBest7Rounds
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
      pointsAsInt = parseInt(scoreOfGolfroundOfPlayer.points);
      extraPointsAsInt = parseInt(scoreOfGolfroundOfPlayer.extraPoints);

      totalScore = pointsAsInt + extraPointsAsInt + totalScore;
    });

    return totalScore;
  };

  const assignResultsForEachPlayer = async (golfroundsOfPlayers) => {
    let totalScore = 0;
    let avrageScore = 0;
    let averageOfBest7Rounds = 0;
    let resulTableScore = [];

    golfroundsOfPlayers.forEach((golfroundsOfPlayer) => {
      totalScore = sumAllScores(golfroundsOfPlayer);
      avrageScore = calculateAverageScore(golfroundsOfPlayer);
      averageOfBest7Rounds = calcutaleAverageOfBest7Rounds(golfroundsOfPlayer);

      // console.log(' golfroundofplayer: ', golfroundsOfPlayer);

      resulTableScore.push({
        name: golfroundsOfPlayer.name,
        nickName: golfroundsOfPlayer.nickName,
        totalScore: totalScore,
        avrageScore: avrageScore,
        averageOfBest7Rounds: averageOfBest7Rounds.toFixed(2),
      });
    });

    //  resulTableScore.averageOfBest7Rounds.sort(getLowestNumber);
    // console.log('test:  ', resulTableScore[0].averageOfBest7Rounds);
    const sortedArray = bubbleSort(resulTableScore);
    // console.log(sortedArray);

    setResultTable(sortedArray);
  };

  const calcutaleAverageOfBest7Rounds = (golfroundsOfPlayer) => {
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

  const getEachPlayerScore = async (players) => {
    let array = [];

    for (const player of players) {
      let scores = await getPlayerScore(player.userID);

      array.push({
        name: player.name,
        nickName: player.nickName,
        scores: scores,
      });
    }
    // sconsole.log(array);
    return array;
  };

  const getAndSetPlayers = async () => {
    await getPlayers().then(setPlayers);
  };

  useEffect(() => {
    getAndSetPlayers();
  }, []);

  useEffect(() => {
    getEachPlayerScore(players).then((value) => {
      assignResultsForEachPlayer(value);
    });
  }, [players]);

  return (
    <ScrollView style={{ backgroundColor: 'black' }}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/pokal.png')}
          style={styles.imageBackgroundStyle}
        >
          <Text style={styles.header}>Tabell</Text>
        </ImageBackground>
        <View style={styles.namePhoneIDView}>
          <Text style={{ ...styles.culumText, width: '5%' }}></Text>
          <Text style={{ ...styles.culumText, width: '40%', left: 10 }}>
            Namn
          </Text>
          {/* <View style={{ flex: 1 }}></View> */}
          <Text
            style={{ ...styles.culumText, textAlign: 'center', width: '15%' }}
          >
            Total
          </Text>
          {/* <View style={{ flex: 1 }}></View> */}
          <Text
            style={{ ...styles.culumText, textAlign: 'right', width: '35%' }}
          >
            Medel av 7 bästa
          </Text>
        </View>

        <View style={styles.chartView}>
          {loadingPlayerScore && <Splash />}
          {resultTable && (
            <FlatList
              data={resultTable}
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
                    totalScore={item.totalScore}
                    averageOfBest7Rounds={item.averageOfBest7Rounds}
                  />
                );
              }}
              keyExtractor={(_, index) => index.toString()}
            />
          )}
        </View>
        <View
          style={{
            // backgroundColor: 'red',
            alignSelf: 'center',
            alignItems: 'center',
            marginTop: 50,
            marginBottom: 50,
          }}
        >
          <Text style={styles.text}>Vänd luren för detaljer</Text>
          <Text style={styles.kghio}>KGHIO 2021</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  flatList: {
    backgroundColor: 'white',
  },
  header: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'center',
    marginTop: 120,
    fontFamily: Theme.fontFamilyHeader,
  },

  item: {
    backgroundColor: 'black',
    padding: 1,
    marginVertical: 1,
    marginHorizontal: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  positionNumber: {
    fontSize: 15,
    color: 'white',
    width: '5%',
  },
  title: {
    fontSize: 15,
    left: 10,
    width: '40%',

    color: 'white',
    fontFamily: Theme.fontFamilyText,
  },
  totalScore: {
    fontSize: 15,

    textAlign: 'center',
    color: Theme.orange,
    fontFamily: Theme.fontFamilyText,
    marginLeft: 0,
    width: '15%',
  },
  sevenBest: {
    fontSize: 15,
    width: '35%',
    textAlign: 'right',

    color: 'white',
    // marginRight: 15,
    fontFamily: Theme.fontFamilyText,
  },
  chartView: {
    backgroundColor: 'grey',
    flexDirection: 'column',
    width: '100%',
    marginTop: 0,
    // height: '45%',
  },

  kghio: {
    fontSize: 20,
    color: 'white',
    marginTop: 20,
    fontFamily: Theme.fontFamilyText,
  },
  text: {
    color: 'white',
    marginTop: 10,
    fontFamily: Theme.fontFamilyText,
  },
  culumText: {
    color: 'white',
    fontFamily: Theme.fontFamilyText,
  },
  imageBackgroundStyle: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    marginTop: -90,
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
});

export default ChartListScreen;
