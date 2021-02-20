import React, { createContext, useState } from 'react';
import firebase from '../firebase';

export const PlayerContext = createContext();
const auth = firebase.auth();

export default function PlayerContextProvider({ children }) {
  const [loadingPlayerScore, setLoadingPlayerScore] = useState(false);
  const postGolfRound = (userID, points, extraPoints) => {
    firebase
      .firestore()
      .collection('players')
      .doc(userID)
      .collection('golfRounds')
      .doc()
      .set({ points: points, extraPoints: extraPoints })
      .then(() => {
        console.log('GolfRound Added');
        alert('Golfrounds added');
      });
  };

  const getPlayerScore = async (userID) => {
    setLoadingPlayerScore(true);
    // console.log('getplayerscore');
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
    // console.log('playerScore:  ', playerScore);
    setLoadingPlayerScore(false);
    return playerScore;
  };

  const getPlayers = async () => {
    let snapshot = await firebase.firestore().collection('players').get();

    let players = [];

    if (snapshot) {
      snapshot.forEach((doc) => {
        players.push({ ...doc.data() });
      });
    }
    console.log('getPlayers');
    return players;
  };

  return (
    <PlayerContext.Provider
      value={{ postGolfRound, getPlayers, getPlayerScore, loadingPlayerScore }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
