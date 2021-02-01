import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import PlayerTextInput from "../components/PlayerTextInput";
import { TextInput } from "react-native-gesture-handler";
import ButtonWithBackround from "../components/HomeScreenButton";
import DropDownPicker from "react-native-dropdown-picker";
import { Picker } from "@react-native-picker/picker";

const RegisterResultScreen = () => {
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(playersArray);

  let controller;

  const playersArray = [
    { label: "Robin", value: "Robin" },
    { label: "Stefan", value: "Stefan" },
    { label: "Ida", value: "Ida" },
    { label: "Hampus", value: "Hampus" },
    { label: "Mia", value: "Mia" },
    { label: "Jonas", value: "Jonas" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registrera Resultat</Text>

      <View style={styles.textView}>
        <Text
          style={{ ...styles.text, backgroundColor: "black", width: "50%" }}
        >
          Spelare
        </Text>
        <Text style={{ ...styles.text, backgroundColor: "black" }}>Poäng</Text>
        <Text style={{ ...styles.text, backgroundColor: "black" }}>Extra</Text>
      </View>
      <View style={{...styles.textInputView, zIndex: 5}}>
        <DropDownPicker
          items={playersArray}
          defaultValue={value}
          containerStyle={{ height: 50 }}
          style={{
            backgroundColor: "#fafafa",
            width: 180,
            marginLeft: 10,
            marginTop: 15,
            
          }}
          itemStyle={{ justifyContent: "flex-start" }}
          labelStyle={{
            fontSize: 14,
            textAlign: "left",
            color: "#000",
          }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) => console.log(item.label, item.value)}
        />

        {/* <View style={{ backgroundColor: 'blue' }}>

  
        </View> */}

        <TextInput 
        keyboardType='number-pad'
        style={{ ...styles.textInput }}></TextInput>
        <TextInput 
        keyboardType='number-pad'
        style={{ ...styles.textInput }}></TextInput>
      </View>

      <View style={{...styles.textInputView, zIndex: 4}}>
        <DropDownPicker
          items={playersArray}
          defaultValue={value}
          containerStyle={{ height: 50 }}
          style={{
            backgroundColor: "#fafafa",
            width: 180,
            marginLeft: 10,
            marginTop: 15,
            
          }}
          itemStyle={{ justifyContent: "flex-start" }}
          labelStyle={{
            fontSize: 14,
            textAlign: "left",
            color: "#000",
          }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) => console.log(item.label, item.value)}
        />
        <TextInput 
        keyboardType='number-pad'
        style={{ ...styles.textInput }}></TextInput>
        <TextInput 
        keyboardType='number-pad'
        style={{ ...styles.textInput }}></TextInput>
      </View>

      <View style={{...styles.textInputView, zIndex: 3}}>
        <DropDownPicker
          items={playersArray}
          defaultValue={value}
          containerStyle={{ height: 50 }}
          style={{
            backgroundColor: "#fafafa",
            width: 180,
            marginLeft: 10,
            marginTop: 15,
            
          }}
          itemStyle={{ justifyContent: "flex-start" }}
          labelStyle={{
            fontSize: 14,
            textAlign: "left",
            color: "#000",
          }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) => console.log(item.label, item.value)}
        />
        <TextInput 
        keyboardType='number-pad'
        style={{ ...styles.textInput }}></TextInput>
        <TextInput 
        keyboardType='number-pad'
        style={{ ...styles.textInput }}></TextInput>
      </View>

      <View style={{...styles.textInputView, zIndex: 2}}>
        <DropDownPicker
          items={playersArray}
          defaultValue={value}
          containerStyle={{ height: 50 }}
          style={{
            backgroundColor: "#fafafa",
            width: 180,
            marginLeft: 10,
            marginTop: 15,
            
          }}
          itemStyle={{ justifyContent: "flex-start" }}
          labelStyle={{
            fontSize: 14,
            textAlign: "left",
            color: "#000",
          }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) => console.log(item.label, item.value)}
        />
        <TextInput 
        keyboardType='number-pad'
        style={{ ...styles.textInput }}></TextInput>
        <TextInput 
        keyboardType='number-pad'
        style={{ ...styles.textInput }}></TextInput>
      </View>

      <View style={{ backgroundColor: 'white'}}/>

      <ButtonWithBackround
        color="#ff4500"
        text="Registrera"
        marginTop={20}
        width="40%"
        alignSelf="flex-end"
        marginRight={10}
        padding={5}
        backgroundColor='#ff4500'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  playerDropdown: {
    marginTop: 20,
    marginRight: 20,
  },

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
    color: "white",
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
    color: "white",
  },
  textInputView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default RegisterResultScreen;
