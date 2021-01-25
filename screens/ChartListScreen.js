import React , { useState ,useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import firebase from "../firebase";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Stefan Lund",
    points: "40",
    position: "1",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Robin karlsson",
    points: "50",
    position: "2",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Ida Lundgren",
    points: "60",
    position: "3",
  },
];

const Item = ({ title, points, position }) => (
  <View style={styles.item}>
    <Text style={styles.position}>{position}</Text>
    <Text style={styles.title}>{title}</Text>

    <View style={{ flex: 1 }}></View>

    <Text style={styles.points}>{points}</Text>
  </View>
);

const ChartListScreen = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

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
    });
    console.log(players);
  };

  useEffect(() => {
    getPlayers();
  
    return () => {
      getPlayers;
    }
  }, []);
  

  const renderItem = ({ item }) => (
    <Item title={item.title} points={item.points} position={item.position} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tabell</Text>

      <View style={styles.chartView}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <Text style={styles.text}>Vänd luren för detaljer</Text>
      <Text style={styles.kghio}>KGHIO 2021</Text>
    </View>
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
  },
  points: {
    fontSize: 18,
    //marginLeft: 40
    textAlign: "right",
    color: "#ff4500",
  },
  position: {
    fontSize: 18,
    //marginLeft: 40
    color: "white",
    marginRight: 15,
  },
  chartView: {
    backgroundColor: "grey",
    flexDirection: "column",
    width: "80%",
    marginTop: 30,
    height: "65%",
  },

  kghio: {
    fontSize: 20,
    color: "white",
    marginTop: 20,
  },
  text: {
    color: "white",
    marginTop: 10,
  },
});

export default ChartListScreen;
