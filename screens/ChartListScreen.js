import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import firebase from "../firebase";
import Splash from "./Splash";
import { PlayerContext } from "../context/PlayerContext";
import Theme from "../theme/Theme";

const Item = ({ title, points, position }) => (
  <View style={styles.item}>
    <Text style={styles.position}>{position}</Text>
    <Text style={styles.title}>{title}</Text>

    <View style={{ flex: 1 }}></View>

    <Text style={styles.points}>{points}</Text>
  </View>
);

const ChartListScreen = () => {
  const { getPlayers, getPlayerScore } = useContext(PlayerContext);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playerScore, setPlayerScore] = useState([]);

  const getEachPlayerScore = (players) => {
    let array = [];

    players.forEach((player) => {
      let score = getPlayerScore(player.userID);
      array.push({
        name: player.name,
        points: score.points,
        extraPoints: score.extraPoints
      });
    });

    console.log("array: ", array);

    return array;
  };

  useEffect(() => {
    getPlayers()
      .then(setPlayers)
      .then(getEachPlayerScore(players));

  }, []);

  const renderItem = ({ item }) => (
    <Item title={item.name} points={item.points} position={item.position} />
  );

  if (loading) {
    return <Splash />;
  }

  return (
    //  <ScrollView style={{ backgroundColor: 'black'}}>
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/greenball.png")}
        style={{
          width: "100%",
          height: undefined,
          aspectRatio: 1,
          marginTop: -90,
          // backgroundColor: 'white'
        }}
      >
        <Text style={styles.header}>Tabell</Text>
      </ImageBackground>

      <View style={styles.chartView}>
        <FlatList
          data={players}
          renderItem={renderItem}
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
    backgroundColor: "black",
    alignItems: "center",
  
  },
  flatList: {

    backgroundColor: "white",
  },
  header: {
    color: "white",
    fontSize: 50,
    alignSelf: "center",
    marginTop: 120,
    fontFamily: Theme.fontFamilyHeader,
  },

  item: {
    backgroundColor: "black",
    padding: 1,
    marginVertical: 1,
    marginHorizontal: 1,
    flexDirection: "row",

  },
  title: {
    fontSize: 15,
  
    color: "white",
    fontFamily: Theme.fontFamilyText,
  },
  points: {
    fontSize: 15,
 
    textAlign: "right",
    color: Theme.orange,
    fontFamily: Theme.fontFamilyText,
  },
  position: {
    fontSize: 15,

    color: "white",
    marginRight: 15,
    fontFamily: Theme.fontFamilyText,
  },
  chartView: {
    backgroundColor: "grey",
    flexDirection: "column",
    width: "100%",
    marginTop: 0,
    height: "45%",
  },

  kghio: {
    fontSize: 20,
    color: "white",
    marginTop: 20,
    fontFamily: Theme.fontFamilyText,
  },
  text: {
    color: "white",
    marginTop: 10,
    fontFamily: Theme.fontFamilyText,
  },
});

export default ChartListScreen;
