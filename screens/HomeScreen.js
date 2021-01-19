import React from "react";
import { StyleSheet, Text, View } from "react-native";
import  ButtonWithBackround  from "../components/HomeScreenButton"

const HomeScreen = () => {
    

    return (
      <View style={styles.container}>
        <Text style={styles.header}>KGHIO 2021</Text>
        <View style={styles.homeView}>
          
        <ButtonWithBackround text='Registrera Resultat' color='orange' />
        <ButtonWithBackround text='Tabell' color='orange' />
        <ButtonWithBackround text='Statestik' color='red' />
        <ButtonWithBackround text='Medlemmar' color='orange' marginBottom={60}/>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    //alignItems: "center",
    justifyContent: 'flex-start',
  },
  homeView: {

    flex: 1,
    alignItems: "center",
    justifyContent: 'flex-end',
    backgroundColor: 'grey',
  },
  header: {
    color: 'white',
    fontSize: 60,
    alignSelf: 'center',
    marginBottom: 10
  }
});

export default HomeScreen;