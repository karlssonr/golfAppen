import React, { createContext, useState, useEffect } from "react";
import firebase from "../firebase";
import { Alert } from "react-native";

export const PlayerContext = createContext();

export default function PlayerContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  const postGolfRound = (player, points, extraPoints) => {
    firebase
      .firestore()
      .collection("players")
      .doc(player)
      .collection("golfRounds")
      .doc()
      .set({ points: points, extraPoints: extraPoints })
      .then(() => {
        console.log("GolfRound Added");
        alert("Golfrounds added");
      });
  };

  const getPlayers = () => {
    var databaseRef = firebase.firestore().collection("players");
    var players = []

    databaseRef.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());

      players.push(items)

      console.log("items: ", items);
      console.log("players: ",players);
      return players;
    });
    
  };

  return (
    <PlayerContext.Provider value={{ postGolfRound , getPlayers}}>
      {children}
    </PlayerContext.Provider>
  );
}
