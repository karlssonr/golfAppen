import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Splash from './Splash';
import { PlayerContext } from '../context/PlayerContext';
import Theme from '../theme/theme';

const Item = ({ name, totalScore, averageOfBest7Rounds }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>

    <View style={{ flex: 1 }}></View>

    <Text style={styles.points}>{totalScore}</Text>
    <Text style={styles.position}>{averageOfBest7Rounds}</Text>
  </View>
);

const ChartListScreen = () => {
  const { getPlayers, getPlayerScore } = useContext(PlayerContext);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultTable, setResultTable] = useState([]);

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

      resulTableScore.push({
        name: golfroundsOfPlayer.name,
        totalScore: totalScore,
        avrageScore: avrageScore,
        averageOfBest7Rounds: averageOfBest7Rounds,
      });
    });

    setResultTable(resulTableScore);
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
        scores: scores,
      });
    }

    return array;
  };

  const getAndSetPlayers = async () => {
    await getPlayers().then(setPlayers);
  };

  useEffect(() => {
    setLoading(true);
    getAndSetPlayers();
  }, []);

  useEffect(() => {
    getEachPlayerScore(players).then((value) =>
      assignResultsForEachPlayer(value).then(setLoading(false))
    );
  }, [players]);

  if (loading) {
    return <Splash />;
  }

  return (
    //  <ScrollView style={{ backgroundColor: 'black'}}>
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/greenball.png')}
        style={styles.imageBackgroundStyle}
      >
        <Text style={styles.header}>Tabell</Text>
      </ImageBackground>

      <View style={styles.chartView}>
        <FlatList
          data={resultTable}
          renderItem={({ item }) => {
            return (
              <Item
                name={item.name}
                totalScore={item.totalScore}
                averageOfBest7Rounds={item.averageOfBest7Rounds}
              />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <Text style={styles.text}>Vänd luren för detaljer</Text>
      <Text style={styles.kghio}>KGHIO 2021</Text>
    </View>
    //  </ScrollView>
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
    fontSize: 50,
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
  },
  title: {
    fontSize: 15,

    color: 'white',
    fontFamily: Theme.fontFamilyText,
  },
  points: {
    fontSize: 15,

    textAlign: 'right',
    color: Theme.orange,
    fontFamily: Theme.fontFamilyText,
  },
  position: {
    fontSize: 15,

    color: 'white',
    marginRight: 15,
    fontFamily: Theme.fontFamilyText,
  },
  chartView: {
    backgroundColor: 'grey',
    flexDirection: 'column',
    width: '100%',
    marginTop: 0,
    height: '45%',
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
  imageBackgroundStyle: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    marginTop: -90,
  },
});

export default ChartListScreen;
