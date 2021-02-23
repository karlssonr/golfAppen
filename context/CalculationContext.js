import React, { createContext, useState, useContext, useEffect } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import firebase from '../firebase';

export const CalculationContext = createContext();

export default function CalculationContextProvider({ children }) {
  const [players, setPlayers] = useState([]);
  const [resultTable, setResultTable] = useState([]);

  const { getPlayerScore, getPlayers } = useContext(PlayerContext);
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
        averageOfBest7Rounds: averageOfBest7Rounds.toFixed(2),
      });
    });

    setResultTable(resulTableScore);
    // return resulTableScore;
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

  const calculatePlayerScore = () => {
    getAndSetPlayers();
  };

  useEffect(() => {
    getEachPlayerScore(players).then((value) => {
      assignResultsForEachPlayer(value);
    });
  }, [players]);

  return (
    <CalculationContext.Provider
      value={{
        sumAllScores,
        assignResultsForEachPlayer,
        calcutaleAverageOfBest7Rounds,
        getAverageNumberOfArrayOfNumber,
        getLowestNumber,
        calculateAverageScore,
        getEachPlayerScore,
        calculatePlayerScore,
        resultTable,
      }}
    >
      {children}
    </CalculationContext.Provider>
  );
}
