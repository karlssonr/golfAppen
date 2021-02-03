import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import firebase from "../firebase";
import Splash from "./Splash";
import { PlayerContext } from "../context/PlayerContext";
import Theme from '../theme/Theme'

const Item = ({ title, points, position }) => (
  <View style={styles.item}>
    <Text style={styles.position}>{position}</Text>
    <Text style={styles.title}>{title}</Text>

    <View style={{ flex: 1 }}></View>

    <Text style={styles.points}>{points}</Text>
  </View>
);

const ChartListScreen = () => {
  // const { getPlayers } = useContext(PlayerContext);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  var users = [];

   var databaseRef = firebase.firestore().collection("players");

  // const getPlayers = () => {
  //   setLoading(true);
  //   databaseRef.onSnapshot((querySnapshot) => {
  //     const items = [];
  //     querySnapshot.forEach((doc) => {
  //       items.push(doc.data());
  //     });
  //     setPlayers(items);
  //     setLoading(false);

  //   });
  //   console.log(players);
  // };

  const getPlayers = () => {
    setLoading(true);
    databaseRef.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());
      setPlayers(items);
      setLoading(false);
      console.log("items: ",items);

    });
    console.log("players: ",players);
  };

  // const getPlayersFromDB = async () => {

  //   try {
  //     users = await getPlayers()
  //      setPlayers(users);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {

    getPlayers()
    // getPlayersFromDB();

    // console.log("users: ", users);

    return () => {
      getPlayers;
    };
  }, []);

  // useEffect(() => {

  //   setPlayers(users)
  //   console.log("users: ", users);

  //   return () => {

  //   }
  // }, [users])

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
            source={require('../assets/greenball.png')}
            style={{     width: '100%',
            height: undefined,
            aspectRatio: 1,
            // backgroundColor: 'white'
        }}>
<Text style={styles.header}>Tabell</Text>

      </ImageBackground>
    
      
      
      <View style={styles.chartView}>
        <FlatList
          data={players}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
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
    //justifyContent: "flex-start",
  },
  flatList: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "flex-end",
    backgroundColor: "white",
  },
  header: {
    color: "white",
    fontSize: 50,
    alignSelf: "center",
    marginTop: 40,
    fontFamily: Theme.fontFamilyHeader,
  },

  item: {
    backgroundColor: "black",
    padding: 1,
    marginVertical: 1,
    marginHorizontal: 1,
    flexDirection: "row",
    //alignItems: 'flex-start',
    //justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    //marginLeft: 40
    color: "white",
    fontFamily: Theme.fontFamilyText
  },
  points: {
    fontSize: 18,
    //marginLeft: 40
    textAlign: "right",
    color: Theme.orange,
    fontFamily: Theme.fontFamilyText
  },
  position: {
    fontSize: 18,
    //marginLeft: 40
    color: "white",
    marginRight: 15,
    fontFamily: Theme.fontFamilyText
  },
  chartView: {
     backgroundColor: "grey",
    flexDirection: "column",
    width: "100%",
    marginTop: -40,
    height: "40%",
  },

  kghio: {
    fontSize: 20,
    color: "white",
    marginTop: 20,
    fontFamily: Theme.fontFamilyText
  },
  text: {
    color: "white",
    marginTop: 10,
    fontFamily: Theme.fontFamilyText
  },
});

export default ChartListScreen;
