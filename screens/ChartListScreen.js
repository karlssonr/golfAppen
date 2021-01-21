import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";


const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Stefan Lund",
    points: "40",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Robin karlsson",
    points: "50",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Ida Lundgren",
    points: "60",
  },
];



const Item = ({ title, points }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    
    <View style={{ flex: 1 }}></View>

    <Text style={styles.points}>{points}</Text>

  </View>
);

const ChartListScreen = () => {


  const renderItem = ({ item }) => <Item title={item.title} points={item.points}/>;

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
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
    padding: 5,
    marginVertical: 1,
    marginHorizontal: 1,
    flexDirection: 'row',
    //alignItems: 'flex-start',
    //justifyContent: 'center'

  },
  title: {
    fontSize: 18,
    //marginLeft: 40
    color: 'white'
  },
  points: {
    fontSize: 18,
    //marginLeft: 40
    textAlign: 'right',
    color: 'orange'

  },
  chartView: {
      backgroundColor: 'white',
      flexDirection: 'column',
      width: '80%',
      marginTop: 30,
      height: '65%',

      

  }
});

export default ChartListScreen;
