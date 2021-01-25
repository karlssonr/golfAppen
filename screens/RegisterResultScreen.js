import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PlayerTextInput from "../components/PlayerTextInput";
import { TextInput } from "react-native-gesture-handler";
import ButtonWithBackround from "../components/HomeScreenButton";

const RegisterResultScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registrera Resultat</Text>
      <View style={styles.textView}>
        <Text style={{ ...styles.text, backgroundColor: "black", width: "50%" }}>
          Spelare
        </Text>
        <Text style={{ ...styles.text, backgroundColor: "black" }}>Poäng</Text>
        <Text style={{ ...styles.text, backgroundColor: "black" }}>Extra</Text>
      </View>
      <View style={styles.textInputView}>
        <TextInput style={{ ...styles.textInput, width: "50%" }}></TextInput>
        <TextInput style={{ ...styles.textInput }}></TextInput>
        <TextInput style={{ ...styles.textInput }}></TextInput>
      </View>

      <View style={styles.textInputView}>
        <TextInput style={{ ...styles.textInput, width: "50%" }}></TextInput>
        <TextInput style={{ ...styles.textInput }}></TextInput>
        <TextInput style={{ ...styles.textInput }}></TextInput>
      </View>

      <View style={styles.textInputView}>
        <TextInput style={{ ...styles.textInput, width: "50%" }}></TextInput>
        <TextInput style={{ ...styles.textInput }}></TextInput>
        <TextInput style={{ ...styles.textInput }}></TextInput>
      </View>

      <View style={styles.textInputView}>
        <TextInput style={{ ...styles.textInput, width: "50%" }}></TextInput>
        <TextInput style={{ ...styles.textInput }}></TextInput>
        <TextInput style={{ ...styles.textInput }}></TextInput>
      </View>

      <ButtonWithBackround
        color="#ff4500"
        text="Registrera"
        marginTop={20}
        width="40%"
        alignSelf="flex-end"
        marginRight={10}
        padding={5}

      />
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
  textInput: {
    height: 35,
    borderColor: "gray",
    borderWidth: 2,
    backgroundColor: "white",
    marginTop: 15,
    width: "20%",
  },
  header: {
    backgroundColor: "black",
    fontSize: 40,
    marginTop: 55,
    alignSelf: "center",
    color: 'white'
  },
  textView: {
    flexDirection: "row",
    backgroundColor: "black",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
  },
  text: {
    fontSize: 25,
    marginTop: 20,
    width: "20%",
    color: 'white'
  },
  textInputView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default RegisterResultScreen;
