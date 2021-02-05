import React, { createContext, useState, useEffect, useContext } from "react";
import firebase from "../firebase";
import { Alert } from "react-native";
import { AuthContext } from "./AuthContext";

export const PlayerContext = createContext();
const auth = firebase.auth();
const currentUser = auth.currentUser;

export default function PlayerContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  // const { currentUser } = useContext(AuthContext);

  const postGolfRound = (userID, points, extraPoints) => {
    console.log("postgolfround:", userID, points, extraPoints);
    // const userID = currentUser.uid

    firebase
      .firestore()
      .collection("players")
      .doc(userID)
      .collection("golfRounds")
      .doc()
      .set({ points: points, extraPoints: extraPoints })
      .then(() => {
        console.log("GolfRound Added");
        alert("Golfrounds added");
      });
  };

  const getPlayerScore = async (userID) => {
    let snapshot = await firebase
      .firestore()
      .collection("players")
      .doc(userID)
      .collection("golfRounds")
      .get();

    let playerScore = [];

    if (snapshot) {
      snapshot.forEach((doc) => {
        playerScore.push({ ...doc.data(), 
        name: userID.name
        });
      });
    }
    // console.log("playerScore:  ", playerScore);
    return playerScore;
  };

  const getPlayers = async () => {
    let snapshot = await firebase.firestore().collection("players").get();

    let players = [];

    if (snapshot) {
      snapshot.forEach((doc) => {
        players.push({ ...doc.data() });
      });
    }
    console.log("getPlayers");
    return players;
  };

  return (
    <PlayerContext.Provider value={{ postGolfRound, getPlayers , getPlayerScore}}>
      {children}
    </PlayerContext.Provider>
  );
}
