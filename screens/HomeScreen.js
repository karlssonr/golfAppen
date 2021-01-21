import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ButtonWithBackround from "../components/HomeScreenButton";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>KGHIO 2021</Text>
      <View style={styles.homeView}>
        <ButtonWithBackround
          text="Registrera Resultat"
          color="orange"
          width={300}
          onPress={() => {
            console.log("button was pressed");
            // navigation.setOptions({ title: 'Registrera Resultat'})
            navigation.navigate("RegisterResultScreen" , { title: 'Registrera Resultat'});
          }}
        />
        <ButtonWithBackround text="Tabell" color="orange" width={300} 
        onPress={() => navigation.navigate('ChartListScreen')}/>
        <ButtonWithBackround text="Statestik" color="red" width={300} />
        <ButtonWithBackround
          text="Medlemmar"
          color="orange"
          marginBottom={60}
          width={300}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    //alignItems: "center",
    justifyContent: "flex-start",
  },
  homeView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "grey",
  },
  header: {
    color: "white",
    fontSize: 60,
    alignSelf: "center",
    marginBottom: 10,
  },
});

export default HomeScreen;
