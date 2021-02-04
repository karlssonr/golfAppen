import { StatusBar } from "expo-status-bar";
import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, ImageBackground, Button } from "react-native";
import PlayerTextInput from "../components/PlayerTextInput";
import { TextInput } from "react-native-gesture-handler";
import ButtonWithBackround from "../components/HomeScreenButton";
import DropDownPicker from "react-native-dropdown-picker";
import { Picker } from "@react-native-picker/picker";
import { PlayerContext } from "../context/PlayerContext";
import Theme from "../theme/Theme";
import firebase from "../firebase";
import Splash from "./Splash";

const RegisterResultScreen = () => {
  const [players, setPlayers] = useState([]);

  const { postGolfRound, getPlayers } = useContext(PlayerContext);

  // const [value, setValue] = useState(null);
  // const [items, setItems] = useState(players);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [playerOne, setPlayerOne] = useState({
    name: null,
    points: "",
    extraPoints: "",
    userID: ""
  });

  const [playerTwo, setPlayerTwo] = useState({
    name: null,
    points: "",
    extraPoints: "",
    userID: ""
  });

  const [playerThree, setPlayerThree] = useState({
    name: null,
    points: "",
    extraPoints: "",
    userID: ""
  });

  const [playerFour, setPlayerFour] = useState({
    name: null,
    points: "",
    extraPoints: "",
    userID: ""
  });

  const resetPlayerState = () => {
    setPlayerOne({ name: null, points: "", extraPoints: "", userID: "" });
    setPlayerTwo({ name: null, points: "", extraPoints: "" , userID: ""});
    setPlayerThree({ name: null, points: "", extraPoints: "" , userID: ""});
    setPlayerFour({ name: null, points: "", extraPoints: "" , userID: ""});
  };

  const submit = async () => {

    try {
      setError("");
      setLoading(true);

      let playersPlayed = 0;

      if (playerOne.name !== null) {
        playersPlayed++;
      }
      if (playerTwo.name !== null) {
        playersPlayed++;
      }
      if (playerThree.name !== null) {
        playersPlayed++;
      }
      if (playerFour.name !== null) {
        playersPlayed++;
      }

      if (playersPlayed > 1) {
        if (playerOne.name !== null) {

          console.log("USERID", playerOne.userID);

          postGolfRound(
            playerOne.userID,
            playerOne.points,
            playerOne.extraPoints
          );
        }
        if (playerTwo.name !== null) {
          postGolfRound(
            playerTwo.userID,
            playerTwo.points,
            playerTwo.extraPoints
          );
        }
        if (playerThree.name !== null) {
          postGolfRound(
            playerThree.userID,
            playerThree.points,
            playerThree.extraPoints
          );
        }
        if (playerFour.name !== null) {
          postGolfRound(
            playerFour.userID,
            playerFour.points,
            playerFour.extraPoints
          );
        }
      } else {
        alert("Minst 2 spelare måste rapporteras");
      }

      // resetPlayerState();

      console.log("Posting golf round");
    } catch (er) {
      setError("Failed to post golfround");
      console.log(er);
    }

    setLoading(false);
  };

  useEffect(() => {
    getPlayers().then(setPlayers);
  }, []);

  // console.log("players: ", players);

  const mapPlayersFromDB = (players) => {
    let array = [];

    players.forEach((player) => {
      array.push({
        label: player.name,
        value: player.name,
        userID: player.userID,
      });
    });

    // console.log("array: ", array);

    return array;
  };

  const playersArray = mapPlayersFromDB(players);

  if (loading) {
    return <Splash />;
  }

  console.log(playerOne);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/golfBall.png")}
        style={{
          width: "100%",
          height: undefined,
          aspectRatio: 1,
          // backgroundColor: 'white'
        }}
      >
      
        <Text style={styles.header}>Registrera Resultat</Text>

        <View style={styles.textView}>
          <Text style={{ ...styles.text, width: "50%" }}>Spelare</Text>
          <Text style={{ ...styles.text }}>Poäng</Text>
          <Text style={{ ...styles.text }}>Extra</Text>
        </View>
        <View style={{ ...styles.textInputView, zIndex: 5 }}>
          <DropDownPicker
            placeholder="Välj spelare"
            items={playersArray}
            defaultValue={playerOne.name}
            containerStyle={{ height: 50 }}
            style={styles.dropDownPickerStyle}
            itemStyle={{ justifyContent: "flex-start" }}
            labelStyle={styles.dropDownLabelStyle}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            onChangeItem={(item) => {
        
              setPlayerOne({ ...playerOne, name: item.value, userID: item.userID })
            }
              
            }
          />

          {/* <View style={{ backgroundColor: 'blue' }}>

  
        </View> */}

          <TextInput
            placeholder="Poäng"
            value={playerOne.points}
            onChangeText={(text) =>
              setPlayerOne({ ...playerOne, points: text })
            }
            keyboardType="number-pad"
            style={{ ...styles.textInput }}
          />

          <TextInput
            placeholder="Extra poäng"
            value={playerOne.extraPoints}
            onChangeText={(text) =>
              setPlayerOne({ ...playerOne, extraPoints: text })
            }
            keyboardType="number-pad"
            style={{ ...styles.textInput }}
          />
        </View>

        <View style={{ ...styles.textInputView, zIndex: 4 }}>
          <DropDownPicker
            placeholder="Välj spelare"
            items={playersArray}
            defaultValue={playerTwo.name}
            containerStyle={{ height: 50 }}
            style={styles.dropDownPickerStyle}
            itemStyle={{ justifyContent: "flex-start" }}
            labelStyle={styles.dropDownLabelStyle}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            onChangeItem={(item) =>
              setPlayerTwo({ ...playerTwo, name: item.value , userID: item.userID})
            }
          />
          <TextInput
            placeholder="Poäng"
            value={playerTwo.points}
            onChangeText={(text) =>
              setPlayerTwo({ ...playerTwo, points: text })
            }
            keyboardType="number-pad"
            style={{ ...styles.textInput }}
          ></TextInput>
          <TextInput
            placeholder="Extra poäng"
            value={playerTwo.extraPoints}
            onChangeText={(text) =>
              setPlayerTwo({ ...playerTwo, extraPoints: text })
            }
            keyboardType="number-pad"
            style={{ ...styles.textInput }}
          ></TextInput>
        </View>

        <View style={{ ...styles.textInputView, zIndex: 3 }}>
          <DropDownPicker
            placeholder="Välj spelare"
            items={playersArray}
            defaultValue={playerThree.name}
            containerStyle={{ height: 50 }}
            style={styles.dropDownPickerStyle}
            itemStyle={{ justifyContent: "flex-start" }}
            labelStyle={styles.dropDownLabelStyle}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            onChangeItem={(item) =>
              setPlayerThree({ ...playerThree, name: item.value , userID: item.userID})
            }
          />
          <TextInput
            placeholder="Poäng"
            value={playerThree.points}
            onChangeText={(text) =>
              setPlayerThree({ ...playerThree, points: text })
            }
            keyboardType="number-pad"
            style={{ ...styles.textInput }}
          ></TextInput>
          <TextInput
            placeholder="Extra poäng"
            value={playerThree.extraPoints}
            onChangeText={(text) =>
              setPlayerThree({ ...playerThree, extraPoints: text })
            }
            keyboardType="number-pad"
            style={{ ...styles.textInput }}
          ></TextInput>
        </View>

        <View style={{ ...styles.textInputView, zIndex: 2 }}>
          <DropDownPicker
            placeholder="Välj spelare"
            items={playersArray}
            defaultValue={playerFour.name}
            containerStyle={{ height: 50 }}
            style={styles.dropDownPickerStyle}
            itemStyle={{ justifyContent: "flex-start" }}
            labelStyle={styles.dropDownLabelStyle}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            onChangeItem={(item) =>
              setPlayerFour({ ...playerFour, name: item.value , userID: item.userID})
            }
          />
          <TextInput
            placeholder="Poäng"
            value={playerFour.points}
            onChangeText={(text) =>
              setPlayerFour({ ...playerFour, points: text })
            }
            keyboardType="number-pad"
            style={{ ...styles.textInput }}
          ></TextInput>
          <TextInput
            placeholder="Extra poäng"
            value={players.extraPoints}
            onChangeText={(text) =>
              setPlayerFour({ ...playerFour, extraPoints: text })
            }
            keyboardType="number-pad"
            style={{ ...styles.textInput }}
          ></TextInput>
        </View>
      </ImageBackground>

      {/* <View style={{ backgroundColor: "white" }} /> */}

      {/* <ButtonWithBackround
        color={Colors.orange}
        text="Registrera"
        marginTop={0}
        width={120}
        alignSelf="flex-end"
        marginRight={10}
        padding={5}
        // backgroundColor=
        onPress={submit}
        touchableOpacityHeight={70}
        touchableOpacityWidth="40%"
      /> */}
      <View style={{ marginTop: 100 }}>
        <Button
          title="Registrera resultat"
          onPress={submit}
          color={Theme.orange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  //   button: {
  // margin: 100
  //   },

  playerDropdown: {
    marginTop: 20,
    marginRight: 20,
  },

  dropDownPickerStyle: {
    backgroundColor: "#fafafa",
    width: 180,
    marginLeft: 10,
    marginTop: 15,
  },
  dropDownLabelStyle: {
    fontSize: 14,
    textAlign: "left",
    color: "#000",
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
    // backgroundColor: "black",
    fontSize: 40,
    marginTop: 55,
    alignSelf: "center",
    color: "white",
    fontFamily: Theme.fontFamilyHeader,
  },
  textView: {
    marginTop: 100,
    flexDirection: "row",
    // backgroundColor: "black",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
  },
  text: {
    fontSize: 25,
    marginTop: 20,
    width: "20%",
    color: "white",
    backgroundColor: undefined,
    fontFamily: Theme.fontFamilyText,
  },
  textInputView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default RegisterResultScreen;
