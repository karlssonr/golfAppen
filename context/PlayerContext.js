import React, { createContext, useState } from 'react';
import firebase from '../firebase';

export const PlayerContext = createContext();
const auth = firebase.auth();

export default function PlayerContextProvider({ children }) {
  const [loadingPlayerScore, setLoadingPlayerScore] = useState(false);
  const [getPlayerLoading, setGetPlayerLoading] = useState(false);
  const [getGolfGamesLoading, setGetGolfGamesLoading] = useState(false);

  const postGolfRound = (userID, points, extraPoints, date) => {
    let docID = date.seconds.toString();
    firebase
      .firestore()
      .collection('players')
      .doc(userID)
      .collection('golfRounds')
      .doc(docID)
      .set({
        points: points,
        extraPoints: extraPoints,
        date: date,
        docID: docID,
      })
      .then(() => {
        console.log('Round added');
      });
  };

  const postGolfGame = async (golfGameArray) => {
    let arrayCount = golfGameArray.length;

    let docID = golfGameArray[0].date.seconds.toString();

    if (arrayCount === 3) {
      firebase
        .firestore()
        .collection('golfGames')
        .doc(docID)
        .set({
          date: {
            date: golfGameArray[0].date,
          },
          playerOne: {
            name: golfGameArray[1].name,
            points: golfGameArray[1].points,
            extraPoints: golfGameArray[1].extraPoints,
            userID: golfGameArray[1].userID,
          },
          playerTwo: {
            name: golfGameArray[2].name,
            points: golfGameArray[2].points,
            extraPoints: golfGameArray[2].extraPoints,
            userID: golfGameArray[2].userID,
          },
        })

        .then(() => console.log('posted golf game'));
    }

    if (arrayCount === 4) {
      firebase
        .firestore()
        .collection('golfGames')
        .doc(docID)
        .set({
          date: {
            date: golfGameArray[0].date,
          },
          playerOne: {
            name: golfGameArray[1].name,
            points: golfGameArray[1].points,
            extraPoints: golfGameArray[1].extraPoints,
            userID: golfGameArray[1].userID,
          },
          playerTwo: {
            name: golfGameArray[2].name,
            points: golfGameArray[2].points,
            extraPoints: golfGameArray[2].extraPoints,
            userID: golfGameArray[2].userID,
          },
          playerThree: {
            name: golfGameArray[3].name,
            points: golfGameArray[3].points,
            extraPoints: golfGameArray[3].extraPoints,
            userID: golfGameArray[3].userID,
          },
        })

        .then(() => console.log('posted golf game'));
    }

    if (arrayCount === 5) {
      firebase
        .firestore()
        .collection('golfGames')
        .doc(docID)
        .set({
          date: {
            date: golfGameArray[0].date,
          },
          playerOne: {
            name: golfGameArray[1].name,
            points: golfGameArray[1].points,
            extraPoints: golfGameArray[1].extraPoints,
            userID: golfGameArray[1].userID,
          },
          playerTwo: {
            name: golfGameArray[2].name,
            points: golfGameArray[2].points,
            extraPoints: golfGameArray[2].extraPoints,
            userID: golfGameArray[2].userID,
          },
          playerThree: {
            name: golfGameArray[3].name,
            points: golfGameArray[3].points,
            extraPoints: golfGameArray[3].extraPoints,
            userID: golfGameArray[3].userID,
          },
          playerFour: {
            name: golfGameArray[4].name,
            points: golfGameArray[4].points,
            extraPoints: golfGameArray[4].extraPoints,
            userID: golfGameArray[4].userID,
          },
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

    setGetPlayerLoading(false);
    return players;
  };

  const getPlayer = async (userID) => {
    let snapshot = await firebase.firestore().collection('players').doc(userID);

    return snapshot;
  };

  // const upDateGolfGame = async(docID, userID, name, points, extraPoints, date) => {

  // }

  const updateGolfRound = async (
    docID,
    userID,
    name,
    points,
    extraPoints,
    date
  ) => {
    // console.log(' docid: ', docID);
    // console.log(' userid: ', userID);
    // console.log(' name: ', name);
    // console.log(' points: ', points);
    // console.log(' extrapoints: ', extraPoints);
    // console.log(' date: ', date);
    await firebase
      .firestore()
      .collection('players')
      .doc(userID)
      .collection('golfRounds')
      .doc(docID)
      .update({
        date: date,
        docID: docID,
        extraPoints: extraPoints,
        points: points,
      })
      .then(() => {
        console.log('golfround updated');
      });

    const getGolfGame = await firebase
      .firestore()
      .collection('golfGames')
      .doc(docID)
      .get();

    const golfGameRef = await firebase
      .firestore()
      .collection('golfGames')
      .doc(docID);

    const golfGame = getGolfGame.data();

    // console.log('1', golfGame.playerOne.userID);

    if (golfGame.playerOne.userID === userID) {
      golfGameRef.update({
        date: {
          date: date,
        },
        playerOne: {
          points: points,
          extraPoints: extraPoints,
          name: name,
          userID: userID,
        },
      });

      return;
    }
    if (golfGame.playerTwo.userID === userID) {
      golfGameRef.update({
        date: {
          date: date,
        },
        playerTwo: {
          points: points,
          extraPoints: extraPoints,
          name: name,
          userID: userID,
        },
      });

      return;
    }

    if (golfGame.playerThree) {
      if (golfGame.playerThree.userID === userID) {
        golfGameRef.update({
          date: {
            date: date,
          },
          playerThree: {
            points: points,
            extraPoints: extraPoints,
            name: name,
            userID: userID,
          },
        });

        return;
      }
    }

    if (golfGame.playerFour) {
      if (golfGame.playerFour.userID === userID) {
        golfGameRef.update({
          date: {
            date: date,
          },
          playerFour: {
            points: points,
            extraPoints: extraPoints,
            name: name,
            userID: userID,
          },
        });

        return;
      }
    }
  };

  const getGolfGames = async () => {
    setGetGolfGamesLoading(true);

    let snapshot = await firebase.firestore().collection('golfGames').get();

    let golfGames = [];
    let players = [];

    if (snapshot) {
      snapshot.forEach((doc) => {
        golfGames.push({ ...doc.data() });
      });
    }

    // console.log('array: ', golfGames);

    setGetGolfGamesLoading(false);
    return golfGames;
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
        getGolfGames,
        getGolfGamesLoading,
        getPlayer,
        updateGolfRound,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
