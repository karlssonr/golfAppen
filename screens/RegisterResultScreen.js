import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const RegisterResultScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registrera Resultat</Text>
      <View style={styles.textView}>
        <Text style={{...styles.text, marginLeft: 30}}>Spelare</Text>
        <Text style={{...styles.text, marginLeft: 60}}>Poäng</Text>
        <Text style={{...styles.text, marginLeft: 30}}>Extra</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: "#fff",
    //alignItems: "center",
    justifyContent: 'flex-start',
  },
  header: {
      backgroundColor: 'yellow',
      fontSize: 40,
      marginTop: 55,
      alignSelf: 'center'
  },
  textView: {
      flexDirection: 'row',
      backgroundColor: 'red',
      alignItems: 'flex-start'
    
  },
  text: {
      fontSize: 30,
      marginTop: 20,
      
  }
});

export default RegisterResultScreen
