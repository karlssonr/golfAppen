import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Splash from './Splash';
import { PlayerContext } from '../context/PlayerContext';
import Theme from '../theme/Theme';

const sumAllScores = (golfroundsOfPlayer) => {
  // console.log('123', golfroundsOfPlayer);
  let totalScore = 0;
  let pointsAsInt;
  let extraPointsAsInt;
  golfroundsOfPlayer.scores.forEach((scoreOfGolfroundOfPlayer) => {
    pointsAsInt = parseInt(scoreOfGolfroundOfPlayer.points);
    extraPointsAsInt = parseInt(scoreOfGolfroundOfPlayer.extraPoints);

    totalScore = pointsAsInt + extraPointsAsInt + totalScore;
  });

  // console.log('TOTALSCORE: ', totalScore, 'NAME', golfroundsOfPlayer.name);
  return totalScore;
};

const assignResultsForEachPlayer = (golfroundsOfPlayers) => {
  let totalScore = 0;
  let avrageScore = 0;
  let averageOfBest7Rounds = 0;
  golfroundsOfPlayers.forEach((golfroundsOfPlayer) => {
    totalScore = sumAllScores(golfroundsOfPlayer);
    avrageScore = calculateAverageScore(golfroundsOfPlayer);
    averageOfBest7Rounds = calcutaleAverageOfBest7Rounds(golfroundsOfPlayer);

    setResultTable({
      name: golfroundsOfPlayer.name,
      totalScore: totalScore,
      avrageScore: avrageScore,
      averageOfBest7Rounds: averageOfBest7Rounds,
    });
    console.log(
      'TOTALSCORE: ',
      totalScore,
      'NAME',
      golfroundsOfPlayer.name,
      'avrageScore:',
      avrageScore,
      'averageOfBest7Rounds',
      averageOfBest7Rounds
    );
  });
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
      // console.log('best7rounds: ', best7Rounds);
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

  setGolfroundsOfPlayers(array);
  return array;
};
