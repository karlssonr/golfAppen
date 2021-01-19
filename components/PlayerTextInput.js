import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

const PlayerTextInput = () => {
  return (
    <View
      styles={{

        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: "blue",
        
      }}
    >
      <TextInput style={styles.textInput} />
      <TextInput style={styles.textInput} />
      <TextInput style={styles.textInput} />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "orange",
    flexDirection: "row",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    backgroundColor: "yellow",
    fontSize: 40,
    marginTop: 55,
    alignSelf: "center",
  },
  textView: {
    flexDirection: "row",
    backgroundColor: "red",
    alignItems: "flex-start",
  },
  text: {
    fontSize: 30,
    marginTop: 20,
  },
});

export default PlayerTextInput;
