import React, { createContext, useState } from 'react';
import firebase from '../firebase';
import moment from 'moment';

export const PlayerContext = createContext();
const auth = firebase.auth();

export default function PlayerContextProvider({ children }) {
  const [loadingPlayerScore, setLoadingPlayerScore] = useState(false);
  const [getPlayerLoading, setGetPlayerLoading] = useState(false);

  const postGolfRound = (userID, points, extraPoints, date) => {
    firebase
      .firestore()
      .collection('players')
      .doc(userID)
      .collection('golfRounds')
      .doc()
      .set({
        points: points,
        extraPoints: extraPoints,
        date: date,
      })
      .then(() => {
        console.log('GolfRound Added');
        // alert('Golfrunda skapad');
      });
  };

  const postGolfGame = async (golfGameArray) => {
    let arrayCount = golfGameArray.length;

    console.log('GolfArray: ', golfGameArray.length);
    if (arrayCount === 3) {
      firebase
        .firestore()
        .collection('golfGames')
        .doc()
        .set({
          date: golfGameArray[0].date,
          playerOneName: golfGameArray[1].name,
          playerOnePoints: golfGameArray[1].points,
          playerOneExtraPoints: golfGameArray[1].extraPoints,
          playerOneUserID: golfGameArray[1].userID,

          playerTwoName: golfGameArray[2].name,
          playerTwoPoints: golfGameArray[2].points,
          playerTwoExtraPoints: golfGameArray[2].extraPoints,
          playerTwoUserID: golfGameArray[2].userID,
        })

        .then(() => console.log('posted golf game'));
    }

    if (arrayCount === 4) {
      firebase
        .firestore()
        .collection('golfGames')
        .doc()
        .set({
          date: golfGameArray[0].date,
          playerOneName: golfGameArray[1].name,
          playerOnePoints: golfGameArray[1].points,
          playerOneExtraPoints: golfGameArray[1].extraPoints,
          playerOneUserID: golfGameArray[1].userID,

          playerTwoName: golfGameArray[2].name,
          playerTwoPoints: golfGameArray[2].points,
          playerTwoExtraPoints: golfGameArray[2].extraPoints,
          playerTwoUserID: golfGameArray[2].userID,

          playerThreeName: golfGameArray[3].name,
          playerThreePoints: golfGameArray[3].points,
          playerThreeExtraPoints: golfGameArray[3].extraPoints,
          playerThreeUserID: golfGameArray[3].userID,
        })

        .then(() => console.log('posted golf game'));
    }

    if (arrayCount === 5) {
      firebase
        .firestore()
        .collection('golfGames')
        .doc()
        .set({
          date: golfGameArray[0].date,
          playerOneName: golfGameArray[1].name,
          playerOnePoints: golfGameArray[1].points,
          playerOneExtraPoints: golfGameArray[1].extraPoints,
          playerOneUserID: golfGameArray[1].userID,

          playerTwoName: golfGameArray[2].name,
          playerTwoPoints: golfGameArray[2].points,
          playerTwoExtraPoints: golfGameArray[2].extraPoints,
          playerTwoUserID: golfGameArray[2].userID,

          playerThreeName: golfGameArray[3].name,
          playerThreePoints: golfGameArray[3].points,
          playerThreeExtraPoints: golfGameArray[3].extraPoints,
          playerThreeUserID: golfGameArray[3].userID,

          playerFourName: golfGameArray[4].name,
          playerFourPoints: golfGameArray[4].points,
          playerFourExtraPoints: golfGameArray[4].extraPoints,
          playerFourUserID: golfGameArray[4].userID,
        })

        .then(() => console.log('posted golf game'));
    }
  };

  const getPlayerScore = async (userID) => {
    setLoadingPlayerScore(true);

    let snapshot = await firebase
      .firestore()
      .collection('players')
      .doc(userID)
      .collection('golfRounds')
      .get();

    let playerScore = [];

    if (snapshot) {
      snapshot.forEach((doc) => {
        playerScore.push({ ...doc.data() });
      });
    }

    setLoadingPlayerScore(false);
    return playerScore;
  };

  const getPlayers = async () => {
    setGetPlayerLoading(true);
    let snapshot = await firebase.firestore().collection('players').get();

    let players = [];

    if (snapshot) {
      snapshot.forEach((doc) => {
        players.push({ ...doc.data() });
      });
    }
    console.log('getPlayers');
    setGetPlayerLoading(false);
    return players;
  };

  return (
    <PlayerContext.Provider
      value={{
        postGolfRound,
        getPlayers,
        getPlayerScore,
        loadingPlayerScore,
        getPlayerLoading,
        postGolfGame,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
