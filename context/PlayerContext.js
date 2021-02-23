import React, { createContext, useState } from 'react';
import firebase from '../firebase';

export const PlayerContext = createContext();
const auth = firebase.auth();

export default function PlayerContextProvider({ children }) {
  const [loadingPlayerScore, setLoadingPlayerScore] = useState(false);
  const [getPlayerLoading, setGetPlayerLoading] = useState(false);
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
        // alert('Golfrunda skapad');
      });
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
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
